import React, { Fragment, useState, CSSProperties } from "react";
import { Toast, ActivityIndicator } from "antd-mobile";
import { Map, Marker, MapProps } from "react-amap";
import Geolocation from "react-amap-plugin-custom-geolocation";
import PlaceSearch from "./PlaceSearch";

let geocoder = null;
const defaultMapWrapperHeight = 400;
const titleHeight = '.81rem';

export const geoCode = (address, callback) => {
  if (geocoder) {
    (geocoder as any).getLocation(address, callback);
  }
  // geocoder.getLocation(address, (status, result) => {
  //   console.log(address);
  //   console.log(status);
  //   console.log(result);
  //   if (status === 'complete' && result.geocodes.length) {
  //     return result.geocodes[0];
  //   }
  //   console.error('根据地址查询位置失败');
  //   return {};
  // });
};

function isLocationPosition(locationPosition, position) {
  const {
    longitude: locationLongitude,
    latitude: locationLatitude
  } = locationPosition;
  const { longitude, latitude } = position;
  return locationLongitude === longitude && locationLatitude === latitude;
}

export interface AMapProps {
  /** get position of Marker or center of map */
  getPosition?: ({ longitude, latitude }: {
    longitude: number,
    latitude: number,
  }) => void;
  /** AMap wrapper style */
  wrapperStyle?: CSSProperties;
  onClick?: (longitude: number, latitude: number) => void;
  /** get human-readable address */
  getFormattedAddress?: (formattedAddress: string) => void;
  onCreated?: (map: any) => void;
  mapProps?: MapProps;
}

export function AMap(props: AMapProps) {
  const {
    getPosition,
    wrapperStyle = {},
    onClick,
    getFormattedAddress,
    onCreated,
    mapProps,
  } = props;
  const [locationPosition, setLocationPosition] = useState({});
  const [formattedAddress, setFormattedAddress] = useState();
  const [position, setPosition] = useState();

  const handleCreatedMap = map => {
    if (onCreated) {
      onCreated(map);
    }
    if (!geocoder) {
      geocoder = new window.AMap.Geocoder({
        // city: '010', // 城市设为北京，默认：“全国”
        radius: 1000 // 范围，默认：500
      });
    }
  };

  const regeoCode = (longitude, latitude) => {
    if (geocoder) {
      (geocoder as any).getAddress([longitude, latitude], (status, result) => {
        const address = status === "complete" ? result.regeocode.formattedAddress : null;
        if (getFormattedAddress) {
          getFormattedAddress(address);
        }
        setFormattedAddress(address);
      });
    }
  };

  const plugins = ["Scale"];

  let renderFormattedAddress = "（请选择地址）";
  if (formattedAddress) {
    renderFormattedAddress = formattedAddress;
  }

  const { height } = wrapperStyle;
  const customProps = position ? {
    center: position,
  } : {};
  return (
    <Fragment>
      <p style={{ margin: '8px 0', fontSize: `${24 / 75}rem` }}>当前地址：{renderFormattedAddress}</p>
      <div
        style={
          Object.keys(wrapperStyle).length
            ? { ...wrapperStyle, height: height ? `calc(${height} - ${titleHeight})` : defaultMapWrapperHeight }
            : { height: defaultMapWrapperHeight }
        }
      >
        <Map
          amapkey="1460ee2529622747f8faacac3e860bd6"
          plugins={plugins as any}
          // center={position}
          events={{
            created: handleCreatedMap,
            click: event => {
              const { lnglat } = event;
              console.log(
                "click position:",
                `${lnglat.getLng()}, ${lnglat.getLat()}`
              );
              const _position = {
                longitude: lnglat.getLng(),
                latitude: lnglat.getLat(),
              }
              if (onClick) {
                onClick(lnglat.getLng(), lnglat.getLat());
              }
              if (getPosition) {
                getPosition(_position);
              }
              setPosition(_position);
              regeoCode(lnglat.getLng(), lnglat.getLat());
            }
          }}
          version="1.4.14&plugin=AMap.Geocoder,AMap.Autocomplete,AMap.PlaceSearch"
          zoom={13}
          loading={
            <ActivityIndicator toast />
          }
          {...customProps}
          {...mapProps}
        >
          {position && !isLocationPosition(locationPosition, position) ? (
            <Marker position={position} />
          ) : null}
          <Geolocation
            autoLocation
            enableHighAccuracy
            timeout={5000}
            buttonPosition="RB"
            events={{
              created: o => {
                window.AMap.event.addListener(o, "complete", result => {
                  const _position = {
                    longitude: result.position.lng,
                    latitude: result.position.lat,
                  }
                  setLocationPosition(_position);
                  if (getPosition) {
                    getPosition(_position);
                  }
                  setPosition(_position);
                  if (getFormattedAddress) {
                    getFormattedAddress(result.formattedAddress);
                  }
                  setFormattedAddress(result.formattedAddress);
                }); // 返回定位信息
                window.AMap.event.addListener(
                  o,
                  "error",
                  ({ info, message: msg }) => {
                    Toast.fail("定位失败");
                    console.error("定位失败", info, msg);
                  }
                ); // 返回定位出错信息
              }
            }}
          />
          <PlaceSearch
            onPlaceSelect={poi => {
              console.log("PlaceSearch poi", poi);
              const _position = {
                longitude: poi.location.lng,
                latitude: poi.location.lat,
              }
              if (getPosition) {
                getPosition(_position);
              }
              setPosition(_position);
              const address = `${poi.district}${poi.address}${poi.name}`
              if (getFormattedAddress) {
                getFormattedAddress(address);
              }
              setFormattedAddress(address);
            }}
          />
        </Map>
      </div>
    </Fragment>
  );
}

export default AMap;
