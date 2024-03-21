'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import LocaleSwitcher from '../locale-switcher/locale-switcher';
import Image from 'next/image';
import Logo from '../../../../../public/logo-full.png';
import { usePathname } from 'next/navigation';

type NavBarProps = {
  navigation: any;
  lang: string;
};

const NavBar: React.FC<NavBarProps> = ({ navigation, lang }) => {
  const [navbar, setNavbar] = useState<boolean>(false);

  const pathname = usePathname();

  const meldenPath = pathname.split('/').pop();
  /* Container 36 */

  return (
    <nav className="w-full relative  z-20 h-24 border-b-2 border-secondary md:border-none">
      <div className="justify-between  mx-auto  md:items-center md:flex md:mx-16 lg:mx-24 md:border-b-3 md:border-secondary ">
        <div className={`${navbar ? ' mt-4' : ''} flex  flex-col mt-4 md:mt-0`}>
          <div
            className={`flex ${
              navbar ? '' : ''
            } z-10 items-center justify-between py-3 h-24`}
          >
            <Link href="/">
              <Image width="261" src={Logo} alt="Logo" height="80" />
            </Link>
            <div className="md:hidden z-30 relative">
              <LocaleSwitcher />
            </div>
            <div className="md:hidden flex flex-col">
              <button
                className="p-2 text-gray-700 rounded-md outline-none "
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    viewBox="0 0 20 20"
                    fill="#000000"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg> /* Container 36 */
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke={meldenPath !== '/' ? `#005F6AFF` : '#ffffff'}
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Navigation Links mobile version*/}

          <nav
            className={`container ${
              navbar ? 'block' : 'hidden'
            } flex items-center  justify-between `}
          >
            <ul className="flex w-full shadow-md flex-col mb-8">
              <li className="bg-white border-secondary py-6 w-full border-b-[1px]">
                <Link className="uppercase px-4 " href={`/${lang}`}>
                  {navigation.home}
                </Link>
              </li>
              <li className="bg-white border-secondary border-b-[1px] py-6">
                <Link className="uppercase px-4" href={`/${lang}/about`}>
                  {navigation.about}
                </Link>
              </li>
              <li className="bg-white border-secondary border-b-[1px] py-6">
                <Link className="uppercase px-4 " href={`/${lang}/faqs`}>
                  FAQs
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div>
          {/* Horizontal or desktop navigation */}
          <nav
            className={`container opacity-0 md:opacity-100 md:block flex px-3 items-center justify-between `}
          >
            <ul className="flex gap-x-8">
              <li
                className={` ${
                  pathname === `/${lang}`
                    ? 'font-bold border-b-2 border-secondary'
                    : 'text-black'
                }`}
              >
                <Link href={`/${lang}`}>{navigation.home}</Link>
              </li>
              <li
                className={` ${
                  pathname === `/${lang}/about`
                    ? 'font-bold border-b-2 border-secondary'
                    : 'text-black'
                }`}
              >
                <Link href={`/${lang}/about`}>{navigation.about}</Link>
              </li>
              <li
                className={` ${
                  pathname === `/${lang}/faqs`
                    ? 'font-bold border-b-2 border-secondary'
                    : 'text-black'
                }`}
              >
                <Link href={`/${lang}/faqs`}>FAQs</Link>
              </li>
            </ul>
            {/* <LocaleSwitcher /> */}
          </nav>
        </div>
        <div className="opacity-0 md:opacity-100">
          {/* Language switcher */}

          <LocaleSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
