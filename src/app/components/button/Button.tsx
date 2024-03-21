'use client';

import { motion } from 'framer-motion';
import { VariantProps, cva } from 'class-variance-authority';
import React, { ButtonHTMLAttributes, FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/utils/utils';
import AnimateClick from '../animate-click/AnimateClick';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  icon?: any;
}

const buttonVariants = cva(
  'py-3.5 px-8 w-52 uppercase text-white font-medium  flex justify-center rounded-lg focus:outline-none focus:shadow-outline',

  {
    variants: {
      variant: {
        default: 'bg-black w-full text-white hover:bg-slate-800 mx-auto',
        primary: 'bg-primaryColor w-full hover:opacity-90 mx-auto',
        danger: 'bg-red-500 w-full text-white hover:bg-red-600 mx-auto',
        outline:
          'w-full mx-auto text-white border border-slate-300 hover:bg-primaryColor hover:text-white hover:border-primaryColor',
        disabled: 'bg-primaryColor opacity-30 w-full text-white mx-auto',
      },
    },

    defaultVariants: {
      variant: 'default',
    },
  }
);

const Button: FC<ButtonProps> = ({
  variant,
  className,
  href,
  icon,
  children,
  ...props
}) => {
  if (href) {
    return (
      <AnimateClick>
        {icon ? (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            <span className="mr-2">
              {icon ? <Image src={icon} alt={'Icon'} /> : ''}
            </span>
            {children}
          </Link>
        ) : (
          <Link
            href={href}
            className={cn(buttonVariants({ variant, className }))}
          >
            {children}
          </Link>
        )}
      </AnimateClick>
    );
  }
  return (
    <AnimateClick>
      <button {...props} className={cn(buttonVariants({ variant, className }))}>
        <div className="flex items-center">
          <span className="mr-2">
            {icon ? <Image src={icon} alt={'Icon'} /> : ''}
          </span>
          {children}
        </div>
      </button>
    </AnimateClick>
  );
};

export { Button, buttonVariants };
