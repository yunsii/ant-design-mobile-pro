import React from "react";

export interface PlaceSearchProps {
  __map__?: any;
  onPlaceSelect?: (poi: any) => void;
  style?: React.CSSProperties;
}

export default class PlaceSearch extends React.Component<PlaceSearchProps> {
  constructor(props) {
    super(props);
    const { __map__: map } = props;
    if (!map) {
      throw new Error("PlaceSearch has to be a child of Map component");
    }
  }

  componentDidMount() {
    const { __map__: map, onPlaceSelect } = this.props;
    if (!map) return;

    const auto = new window.AMap.Autocomplete({
      input: "placeSearch"
    });
    // const placeSearch = new window.AMap.PlaceSearch({
    //   map
    // });  // 构造地点查询类
    function select(e) {
      // placeSearch.setCity(e.poi.adcode);
      // placeSearch.search(e.poi.name);  // 关键字查询查询
      map.setCenter(
        new window.AMap.LngLat(e.poi.location.lng, e.poi.location.lat)
      );
      if (onPlaceSelect) {
        onPlaceSelect(e.poi);
      }
    }
    window.AMap.event.addListener(auto, "select", select); // 注册监听，当选中某条记录时会触发
  }

  render() {
    const { style: customStyle } = this.props;
    const style = {
      position: "absolute",
      top: ".2rem",
      left: ".2rem",
      background: "#fff",
      width: '4.2rem',
      ...customStyle
    };

    return <input id="placeSearch" style={style as any} placeholder="搜索地址" />;
  }
}
