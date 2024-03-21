import React, { useRef, useEffect, useState, useCallback, FC } from 'react';
// import { items } from './items';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Button } from '../button/Button';
// import { Button } from 'antd';
import LeftArrow from '../carousel/icons/LeftArrow';
import RIghtArrow from '../carousel/icons/RIghtArrow';
import Link from 'next/link';
import thirdImage from '../../../../public/images/thirdImage.jpg';
import bg from '../../../../public/images/bgImage.png';
import ministerium from '../../../../public/images/secondImage.jpg';
import dot from '../../../../public/icons/dot-single-svgrepo-1.svg';

const getSpeedForSlide = (slide) => {
  switch (slide) {
    case 0:
      return 5000;
    case 1:
      return 8000;
    case 3:
      return 5000;
    default:
      return 5000;
  }
};

const ResponsiveCarousel = ({ content, lang }) => {
  const slider = useRef();
  const [speed, setSpeed] = useState(5000); // setting the default state
  const [currentSlide, setCurrentSlide] = useState(0);
  const handleAfterChange = useCallback((slide) => {
    setSpeed(getSpeedForSlide(slide));
  }, []);

  const settings = {
    customPaging: function (i) {
      return <div className="custom-dot pointer" style={{}}></div>;
    },
    dotsClass: 'custom-dots',
    autoplay: true,
    dots: true,
  };

  const images = [
    { id: 1, image: bg },
    { id: 2, image: ministerium },
    { id: 3, image: thirdImage },
  ];

  const CarouselItems = content.Carousel?.map((item, index) => {
    return { ...item, ...images[index] };
  });

  // console.log(CarouselItems, 'this is my carousel content');

  return (
    <div className="m-auto relative">
      <div className="">
        <div>
          <Slider
            ref={slider}
            {...settings}
            afterChange={(current) => {
              setCurrentSlide(current);
              handleAfterChange;
            }}
            autoplaySpeed={speed}
          >
            {CarouselItems?.map(
              ({ image, id, header, button, button2, paragraph }) => {
                return (
                  <div className="bg-white text-black rounded-xl" key={id}>
                    <div className=" flex justify-center items-center w-full relative">
                      <Image
                        src={image}
                        alt={button}
                        className="w-full h-[300px] sm:h-[450px] lg:h-[500px] xl:h-[700px] object-cover object-center z-[1]"
                      />
                      <div className="absolute top-[10%] w-full h-full z-[2]">
                        <div className="ml-[8%] w-[90%] lg:w-[57%] text-[#005f6a] space-y-5 xl:space-y-12">
                          <div className="bg-white w-[85%] text-[10px] sm:text-[18px] lg:text-3xl font-bold px-2 py-1 rounded-md text-[#005f6a] [word-spacing:5px] tracking-widest">
                            <h1 className="max-w-full flex flex-wrap">
                              {header}
                            </h1>
                          </div>
                          <div className="bg-white w-[60%] xl:w-[40%] px-5 py-3 rounded-md text-[#005f6a] [word-spacing:5px] tracking-widest text-[8px] sm:text-[15px] lg:text-xl">
                            <p className="max-w-full flex flex-wrap">
                              {paragraph}
                            </p>
                          </div>
                          <div className="cursor-pointer flex gap-x-5">
                            <Link href={`${lang}/melden`}>
                              <Button className="bg-[#005f6a] hover:bg-[#005f6a] hover:opacity-[0.8] cursor-pointer text-white text-[8px] sm:text-[13px] lg:text-xl">
                                {button}
                              </Button>
                            </Link>
                            <Link href={`${lang}/faqs`}>
                              {currentSlide === 1 && (
                                <Button className="bg-[#005f6a] hover:bg-[#005f6a] hover:opacity-[0.8] cursor-pointer text-white text-[8px] sm:text-[13px] lg:text-xl">
                                  {button2}
                                </Button>
                              )}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </Slider>
        </div>
        <div className="absolute w-full top-[40%] h-20 hidden lg:block">
          <div
            className={
              currentSlide === 0
                ? 'flex items-center w-full h-full pl-5'
                : 'flex justify-between items-center w-full h-full px-5'
            }
          >
            {currentSlide !== 0 ? (
              <div
                onClick={() => slider?.current?.slickPrev()}
                className={'cursor-pointer h-full'}
              >
                <LeftArrow />
              </div>
            ) : null}

            {currentSlide !== 2 ? (
              <div
                onClick={() => slider?.current?.slickNext()}
                className={
                  currentSlide === 0
                    ? 'cursor-pointer flex items-center justify-end w-full px-5'
                    : 'cursor-pointer'
                }
              >
                <div>
                  <RIghtArrow />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveCarousel;
