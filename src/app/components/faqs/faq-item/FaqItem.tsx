'use client';
import React, { useState } from 'react';
import DownIcon from '../../../../../public/icons/DownIcon.svg';
import Image from 'next/image';

type FaqItemProps = {
  id: number;
  title?: string;
  activeItemId: number | undefined;
  content: string;
  toggle: boolean;
  handleClickItem: (id: number) => void;
};

const FaqItem: React.FC<FaqItemProps> = ({
  title,
  content,
  toggle,
  handleClickItem,
  activeItemId,
  id,
}) => {
  return (
    <div
      onClick={() => handleClickItem(id)}
      className={`border ${
        activeItemId === id ? 'xl:bg-gray-100' : 'bg-white'
      } cursor-pointer z-40 py-6 rounded-xl  text-black border-gray`}
    >
      <div className="text-md flex items-center px-4  justify-between">
        <div className="uppercase w-11/12 xl:w-full xl:flex xl:items-center font-bold">
          <span className="hidden xl:mr-4 xl:block xl:w-5 xl:h-5 bg-primaryColor xl:rounded-full"></span>
          <div className="text-sm xl:text-base">{title}</div>
        </div>
        <div>
          <Image
            className={`${
              toggle && activeItemId === id && 'rotate-180 xl:rotate-0'
            } xl:-rotate-90`}
            src={DownIcon}
            alt="Down Icon"
          />
        </div>
      </div>
      {toggle && activeItemId === id && (
        <div className="my-4 xl:hidden transition-all animate ease-in-out delay-100 duration-300 border-t-2 px-4 pt-6 ">
          {content}
        </div>
      )}
    </div>
  );
};

export default FaqItem;
