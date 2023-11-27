"use client";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import sliderImg_1 from "@/images/slider/sliderImg_1.jpg";
import sliderImg_2 from "@/images/slider/sliderImg_2.jpg";
import sliderImg_3 from "@/images/slider/sliderImg_3.jpg";
import sliderImg_4 from "@/images/slider/sliderImg_4.jpg";

export default function Banner() {
  return (
    <div className="relative">
      <Carousel showStatus={false} autoPlay infiniteLoop showIndicators={false} showThumbs={false} interval={3000}>
        <div>
          <Image src={sliderImg_1} alt="" />
        </div>
        <div>
          <Image src={sliderImg_2} alt="" />
        </div>
        <div>
          <Image src={sliderImg_3} alt="" />
        </div>
        <div>
          <Image src={sliderImg_4} alt="" />
        </div>
      </Carousel>
      <div className="w-full h-40 bg-gradient-to-t from-gray-100 absolute bottom-0 z-20"></div>
    </div>
  );
}
