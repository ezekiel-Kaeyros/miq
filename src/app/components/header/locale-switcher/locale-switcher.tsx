'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { i18n } from '@/i18n.config';
import { useState } from 'react';
import Image from 'next/image';
import DownIcon from '../../../../../public/icons/downIcon.svg';
import AnimateClick from '../../animate-click/AnimateClick';
import polygon from '../../../../../public/icons/Polygon 2.svg';
import { clearFormCookies } from '@/cookies/cookies';

export default function LocaleSwitcher() {
  const [toggle, setToggle] = useState<boolean>(false);
  const pathName = usePathname();
  const selectedLanguage: any = pathName.split('/')[1];
  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/';
    const segments = pathName.split('/');
    segments[1] = locale;
    clearFormCookies();
    return segments.join('/');
  };

  return (
    <div className="flex z-50 flex-col relative items-center">
      <div className="flex z-50 ">
        <AnimateClick>
          <div
            onClick={() => setToggle(!toggle)}
            className="flex gap-x-2 p-1 border-[1.5px] border-gray-400 rounded-xl items-center justify-center w-16 h-8"
          >
            {i18n.locales.map((locale) => {
              return selectedLanguage == 'en'
                ? locale.toUpperCase()[1]
                : locale.toUpperCase()[0];
            })}
            <Image className="w-3" src={polygon} alt="down icon" />
          </div>
        </AnimateClick>
      </div>
      {toggle ? (
        <ul className="flex absolute rounded-md px-3 w-16 py-1 top-8 z-40 right-0  h-fit bg-white shadow-lg flex-col gap-x-3">
          {i18n.locales.map((locale) => {
            return (
              <li key={locale}>
                <Link href={redirectedPathName(locale)} className="py-2">
                  {locale === 'en' ? (
                    <div
                      onClick={() => setToggle(false)}
                      className="flex items-center w-6 my-2 mr-2"
                    >
                      {locale.toUpperCase()}
                    </div>
                  ) : (
                    <div
                      onClick={() => setToggle(false)}
                      className="flex items-center w-6 my-2 mr-2"
                    >
                      {locale.toUpperCase()}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}
