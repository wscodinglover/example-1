import React, { Component } from 'react';

import { Carousel } from 'antd-mobile';
import './index.less';

export default class CarouselView extends Component {
  render() {
    const pics = this.props.pics.slice(4,9)
    return (
        <Carousel
          className="my-carousel"
          autoplay
          infinite
          selectedIndex={0}
          swipeSpeed={35}
         
        >
          {pics.map((v,i) => (
            <a href="" key={i} className="c-list">
              <img
                src={v.room_src}
                alt=""
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                }}
              />
            </a>
          ))}
        </Carousel>
    );
  }
}