import React from 'react';
import LocaleSwitcher from '../header/locale-switcher/locale-switcher';
import Image from 'next/image';
import FacebookIcon from '../../../../public/Social Icons.png';
import LinkedIcon from '../../../../public/LinkedIn Icon.png';
import InstagramIcon from '../../../../public/Insta Icon.png';
import Link from 'next/link';

type CopyrightProps = {
  datenshutz: string;
  link:string
};

const CopyRightSection: React.FC<CopyrightProps> = ({ datenshutz, link }) => {
  return (
    <div className="flex py-4 mb-0 items-center justify-between border-t-3 border-secondary md:justify-between">
      <div className="hidden md:block">
        <LocaleSwitcher />
      </div>
      <div className="flex text-sm md:text-md mx-4 w-full md:space-x-4 px-0 text-white md:text-black md:mx-0 justify-between md:justify-center items-center">
        <Link href="/" className="uppercase underline text-green">
          {link}
        </Link>

        <Link href="/" className="uppercase underline text-green">
          AGB
        </Link>

        <Link href="/" className="uppercase underline text-green">
          {datenshutz}
        </Link>
      </div>
      <div className="hidden lg:visible lg:flex justify-between w-full sm:w-64">
        <Link href={'https://www.facebook.com/'} target='_blank'><Image src={FacebookIcon} alt="Facebook Icon" width="47" height="48" /></Link>
        <Link href={'https://www.instagram.com/'} target='_blank'><Image src={InstagramIcon} alt="Youtube Icon" width="47" height="48" /></Link>
        <Link href={'https://www.linkedin.com/'} target='_blank'><Image src={LinkedIcon} alt="LinkedIn Icon" width="47" height="48" /></Link>
      </div>
    </div>
  );
};

export default CopyRightSection;
