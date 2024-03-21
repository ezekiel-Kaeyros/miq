'use client';
import React, { useState } from 'react';
import AnimateClick from '../../animate-click/AnimateClick';
import Image from 'next/image';
import QuestionMarkIcon from '../../../../..//public/icons/questionMark.svg';
import CloseIcon from '../../../../..//public/icons/closeIcon.svg';
import MailIcon from '../../../../../public/icons/mailIcon.svg';
import FacebookIcon from '../../../../../public/icons/facebookIcon.svg';
import TwitterIcon from '../../../../../public/icons/twitterIcon.svg';
import Link from 'next/link';

const FAB = () => {
  const [toggle, setToggle] = useState<boolean>(false);

  return (
    <div className="relative lg:w-fit">
      <AnimateClick>
        <div
          onClick={() => setToggle((toggle) => !toggle)}
          className="w-12 relative h-12 z-30 p-4 bg-primaryColor flex items-center justify-center rounded-full"
        >
          <Image
            className="w-[80%]"
            src={toggle ? CloseIcon : QuestionMarkIcon}
            alt="Question mark icon"
          />
        </div>
      </AnimateClick>
      {/* Links */}
      {toggle && (
        <div className="">
          <Link
            target="_blank"
            href=""
            className="absolute w-fit transition-all ease-linear duration-200 -right-[2.5rem]  lg:top-12 lg:-left-16"
          >
            <Image src={MailIcon} alt="Mail icon" />
          </Link>
          <Link
            target="_blank"
            href=""
            className="absolute w-fit transition-all ease-linear duration-200 -top-1 -right-16 lg:-top-1 lg:-left-[5rem]"
          >
            <Image src={FacebookIcon} alt="Facebook icon" />
          </Link>
          <Link
            target="_blank"
            href=""
            className="absolute w-fit transition-all ease-linear duration-200 -top-12 -right-8 lg:-top-12 lg:-left-12"
          >
            <Image src={TwitterIcon} alt="Twitter icon" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default FAB;
