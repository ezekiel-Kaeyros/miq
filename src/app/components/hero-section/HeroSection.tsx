'use client';

import React from 'react';
import HeroImage from '../../../../public/images/bgImage.png';
import SecondHeroImage from '../../../../public/images/secondImage.jpg';
import ThirdHeroImage from '../../../../public/images/thirdImage.jpg';
import Image from 'next/image';
import { Button } from '../button/Button';
import Carousel from '../carousel/Carousel';
import FAB from './fab/FAB';
import FAB2 from './fab/FAB2';
// import ResponsiveCarousel from '../ResponsiveCarousel/ResponsiveCarousel';
import ResponsiveCarousel from '../ResponsiveCarousel/ResponsiveCarousel';

type valuesHero = {
  title: string;
  description: string;
  buttonText: string;
  faqsButtonText: string;
  Carousel: Array<{
    id: number;
    header: string;
    paragraph: string;
    button: string;
    button2: string;
  }>;
};

type HersoSectionProps = {
  heroContent: valuesHero;
  lang: string;
};

const Slide = (
  title: string,
  description: string,
  buttonText: string,
  HeroImage: any,
  faqsButtonText?: string
) => {
  return (
    <>
      <Image
        src={HeroImage}
        className={` left-0 object-cover md:object-fill absolute  h-full md:w-full right-0 bottom-0 -z-20 md:absolute`}
        alt="Hero Image"
      />
      <div className="flex justify-center absolute pt-[0rem] mt-[9%] sm:pt-[3rem] md:mt-12 md:mx-16 lg:ml-24 md:pt-0 md:absolute z-40 mx-4 lg:pt-0 xl:pt-0 2xl:pt-12 text-primaryColor flex-col w-[66%]">
        <div
          className="bg-white p-4 rounded-lg text-xl sm:text-3xl
     2xl:text-5xl"
        >
          {title}
        </div>
        <div className="my-4 bg-white p-4 rounded-lg text-sm md:text-xl md:max-w-md xl:mt-8">
          {description}
        </div>
        <div className="flex items-center space-x-4">
          <Button
            href={`/melden`}
            className="ml-0 w-52 lg:mt-2 md:w-60 border-sky-600 text-md font-bold text-xl"
            variant="primary"
          >
            {buttonText.toUpperCase()}
          </Button>
          {faqsButtonText && (
            <Button
              href={`/faq`}
              className="ml-0 w-52 lg:mt-2 md:w-60 border-sky-600 text-md font-bold text-xl"
              variant="primary"
            >
              {faqsButtonText}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

const HeroSection: React.FC<HersoSectionProps> = ({ heroContent, lang }) => {
  const first = Slide(
    heroContent.title,
    heroContent.description,
    heroContent.buttonText,
    HeroImage
  );
  const second = Slide(
    heroContent.title,
    heroContent.description,
    heroContent.buttonText,
    SecondHeroImage,
    heroContent?.faqsButtonText
  );
  const third = Slide(
    heroContent.title,
    heroContent.description,
    heroContent.buttonText,
    ThirdHeroImage
  );

  const data = [first, second, third];

  return (
    // <div className="relative  w-full md:h-[70vh]  md:relative overflow-hidden h-[60vh] z-0 top-0 ">
    <div className="w-full overflow-hidden">
      <ResponsiveCarousel content={heroContent} lang={lang} />
      {/* // <div> */}
      {/* <Carousel content={data} /> */}
      {/* <div className="absolute z-20 right-[2rem]  md:right-[1rem] sm:right-[2rem] top-5 md:top-[1rem] sm:top-[2rem]">
        <FAB2 />
      </div>
      <div className="absolute z-20 right-[6rem]  md:right-[1rem] sm:right-[6rem] top-5 md:top-[5rem] sm:top-[2rem]">
        <FAB />
      </div> */}
    </div>
  );
};

export default HeroSection;
