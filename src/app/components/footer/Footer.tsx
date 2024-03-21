import Link from 'next/link';
import React from 'react';
import CopyRightSection from './CopyRightSection';
import Image from 'next/image';
import Logo from '../../../../public/logo-2.png';
import PlanLogo from '../../../../public/planLogo.svg';
import FacebookIcon from '../../../../public/Social Icons.png';
import LinkedIcon from '../../../../public/LinkedIn Icon.png';
import InstagramIcon from '../../../../public/Insta Icon.png';
import MinisteriumLogo from '../../../../public/images/ministerium.png';

type FooterValues = {
  datenschutz: any;
  link:string;
};

type FooterProps = {
  footer: FooterValues;
};

const Footer: React.FC<FooterProps> = ({ footer }) => {
  return (
    <div className="mx-auto flex border-t-2  z-10  lg:border-top-0 lg:border-none  lg:relative w-full px-2 md:px-16 xl:px-24 bottom-0 flex-col lg:text-gray-800">
      <div>
        <div className="flex w-full  py-8  lg:flex lg:mt-0 flex-row-reverse lg:flex-row justify-between">
          <Link href={'/'} className="w-fit hidden lg:block">
            <Image src={Logo} alt="Logo" width="150" />
            <Image src={PlanLogo} alt="Logo" width="150" className='mb-[-13%] mt-[16%]' />
          </Link>

          <Link href={'/'} className="w-fit block h-fit lg:hidden">
            <Image className="w-32" src={Logo} alt="Logo" />
          </Link>
          <div className="w-full lg:w-fit  text-black mb-2">
            <h1 className="lg:hidden uppercase border-secondary border-b-[0.8px] mb-2 w-fit">
              Folge uns
            </h1>
            <div className="flex lg:hidden justify-between w-fit space-x-4 mb-4">
              <Link href={'https://www.facebook.com/'} target='_blank'><Image src={FacebookIcon} className="w-8" alt="Facebook Icon" /></Link>
              <Link href={'https://www.instagram.com/'} target='_blank'><Image src={InstagramIcon} className="w-8" alt="Youtube Icon" /></Link>
              <Link href={'https://www.linkedin.com/'} target='_blank'><Image src={LinkedIcon} className="w-8" alt="LinkedIn Icon" /></Link>
            </div>

            <div className="hidden lg:block w-fit">
              <Link href={'/'}>
                <Image
                  className="w-72 lg:w-96"
                  src={MinisteriumLogo}
                  alt="Ministerium Logo" />
              </Link>
            </div>
          </div>
        </div>
        <div className="px-auto lg:justify-start  lg:px-0 pb-4 sm:block lg:hidden flex justify-center w-full ">
          <Link href={'/'}>
            <Image
              className="w-72 md:w-96 lg:w-full"
              src={MinisteriumLogo}
              alt="Ministerium Logo" />
          </Link>
        </div>
      </div>

      <CopyRightSection datenshutz={footer?.datenschutz} link={footer.link}/>
    </div>
  );
};

export default Footer;
