import React from 'react';
import { Carousel } from 'antd-mobile';
import Image from '@/components/Image';

const imgHeight = "56vw";

export default (props: {
  images: string[];
}) => {
  const {
    images,
  } = props;

  console.log(images);
  const renderImage = (src) => (
    <Image src={src} style={{ height: imgHeight }} />
  )

  return (
    <div>
      {images.length === 1 ? (
        renderImage(images[0])
      ) : (
          <Carousel>
            {images.map((item) => (
              renderImage(item)
            ))}
          </Carousel>
        )}
    </div>
  )
}
