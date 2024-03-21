'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  dotsVariants,
  slideVariants,
  slidersVariants,
} from './slideAnimationVariants';
import LeftArrow from './icons/LeftArrow';
import RIghtArrow from './icons/RIghtArrow';
import { Carousel } from 'react-responsive-carousel';
import { responsive } from './items';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import thirdimage from '../../../../public/images/thirdImage.jpg';
import Image from 'next/image';

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 1, itemsToScroll: 2 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

type breakPoints = [{ width: number; itemToShow: number }];

type CarouselProps = {
  content: any;
};

const Slider: React.FC<CarouselProps> = ({ content }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<string>('');

  const handleNext = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === content.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection('left');

    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? content.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
  };

  const elastic = responsive;

  return (
    <div>
      <div className="w-full relative top-0  left-0 right-0 bottom-0  md:h-[70vh]  md:relative overflow-hidden h-[60vh">
        {/* <Carousel
          showArrows={true}
          autoPlay={true}
          showIndicators={true}
          infiniteLoop={true}
          dynamicHeight={false}
          className=""
        >
          {elastic.map((item) => (
            <div key={item.id} className="">
              <div className="w-full h-full p-1 m-auto object-position">
                <Image
                  src={item.imageUrl}
                  alt="slides"
                  // width={300}
                  // height={300}
                  className="object-fit"
                />
              </div>
              <div className="">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </Carousel> */}
        <div className="carousel-content  h-full w-full">
          <AnimatePresence>
            {/* Putting content here */}

            <motion.div
              className="pt-1/2 md:pt-1/2 relative w-full h-full"
              key={currentIndex}
              initial={direction === 'right' ? 'hiddenRight' : 'hiddenLeft'}
              animate="visible"
              exit="exit"
              variants={slideVariants}
            >
              {content[currentIndex]}
            </motion.div>
          </AnimatePresence>

          {/* End content here */}
          <div className="flex absolute w-full top-1/2 -translate-y-1/2 z-10  my-auto  justify-between px-4">
            <motion.div
              variants={slidersVariants}
              /* whileHover="hover" */
              className="left hidden md:block cursor-pointer"
              onClick={handlePrevious}
            >
              {/* Left arrow */}
              <LeftArrow />
            </motion.div>
            <motion.div
              variants={slidersVariants}
              className="right hidden md:block cursor-pointer"
              onClick={handleNext}
            >
              {/* Right arrow */}
              <RIghtArrow />
            </motion.div>
          </div>
        </div>
        <div className="flex left-1/2 absolute  md:top-[35rem] h-fit -translate-x-1/2 items-center md:bottom-4 justify-between mx-auto w-24 ">
          {content.map((_: any, index: any) => (
            <motion.div
              key={index}
              className={` w-4 h-4 flex justify-center items-center rounded-full border border-black bg-primaryColor ${
                currentIndex === index ? 'active' : ''
              }`}
              onClick={() => handleDotClick(index)}
              initial="initial"
              animate={currentIndex === index ? 'animate' : ''}
              whileHover="hover"
              variants={dotsVariants}
            >
              {currentIndex === index && (
                <span className="w-2 rounded-full h-2 bg-white"></span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Slider;
