'use client'
import Image from "next/image";
import CookieConsent from "../banners/CookieConsent";
import Footer from "../footer/Footer";
import News from "../news/News";
import Header from "../header/header";
import SinglePageLayout from "../layout/SinglePageLayout";
import img1 from '../../../../public/images/VERWEISBERATUNG Illu Image.svg';
import { useEffect, useRef } from "react";

const About: React.FC<{ page: any, lang: any }> = ({ page, lang }) => {
  const editorRef = useRef<null | HTMLDivElement>(null);
 
    useEffect(() => {
      if (editorRef.current) {
        editorRef.current.scrollIntoView({ behavior: 'smooth' });
      }
     
    }, []);
  return (
    <div>
 
      <div className="">
        <SinglePageLayout
            lang={lang}
            buttonTitle={page.home?.heroSection?.buttonText}
          >
        <div className="md:w-9/12 px-4 md:px-0  md:ml-[12%] lg:mt-14 mt-4">
          <h1 className="lg:text-4xl md:text-3xl text-2xl mb-3 w-auto md:w-5/12">
            {page.about.block1.title1}
          </h1>
          <p ref={editorRef} className="lg:text-xl sm:text-base text-sm md:w-8/12 w-auto">
            {page.about.block1.p}
          </p>
        </div>
        <div
          className="w-[100vw] md:pl-[12%]  pl-4  md:flex py-5 md:py-0 my-14 bg-[#EDECF3] box-border pr-2 block"
        >
          <div className="md:w-auto w-full md:ml-8 lg:ml-14 md:mb-0 mb-8 md:pr-3 	">
            <Image
              src={img1}
              alt=""
              className="md:h-full   w-[100%] md:w-auto object-contain	 "
            />
          </div>
          <div className="md:w-8/12 w-full md:py-5 md:ml-11">
            <p className="mb-3 sm:text-2xl text-xl md:text-3xl md:mt-[8%] ">
              {page.about.block2.title}
            </p>
            <p className="lg:text-xl sm:text-base text-sm w-full lg:w-7/12">
              {page.about.block2.p}
            </p>
          </div>
        </div>
        <div></div>

        <News newsTranslation={page.about} />
        </SinglePageLayout>
      </div>
      <div className="mt-32 lg:mt-[6rem]">
        <Footer lang={lang} footer={page.footer} />
      </div>
      <CookieConsent
        lang={lang}
        cookieConsentTranslation={page?.cookiesConsent}
      />
    </div>
  );
}
export default About