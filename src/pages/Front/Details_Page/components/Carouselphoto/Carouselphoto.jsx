import React from "react"
import { Carousel,Image } from 'antd';
export default function Carouselphoto (){

    const contentStyle = {
        height: '430px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };

    const [dotPosition, setDotPosition] = React.useState('right');

    const photo = {
        img: [
            'https://findaservice-1316943030.cos.ap-nanjing.myqcloud.com/photo1.png',
            'https://findaservice-1316943030.cos.ap-nanjing.myqcloud.com/photo4.png',
            'https://findaservice-1316943030.cos.ap-nanjing.myqcloud.com/photo3.png',
            'https://findaservice-1316943030.cos.ap-nanjing.myqcloud.com/photo4.png',
        ]
    }

    return (
        <div>
            <Carousel dotPosition={dotPosition} autoplay>
                <div>
                <h3 style={contentStyle}><img src={photo.img[0]} alt="" /></h3>
                </div>
                <div>
                <h3 style={contentStyle}><img src={photo.img[1]} alt="" /></h3>
                </div>
                <div>
                <h3 style={contentStyle}><img src={photo.img[2]} alt="" /></h3>
                </div>
                <div>
                <h3 style={contentStyle}><img src={photo.img[3]} alt="" /></h3>
                </div>
            </Carousel>
        </div>
    )
}