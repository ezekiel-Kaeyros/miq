'use client';

import Link from 'next/link';
import LoginForm from './components/form/LoginForm';
import Image from 'next/image';
import Logo from '../../../../../public/logo.png';

const login = () => {
  return (
    <div className="pt-0 h-screen bg-slate-300 flex flex-col items-center justify-center">
       <Link href="/">
        <Image width="150" src={Logo} alt="Logo" />
      </Link>
      <LoginForm />
    </div>
  );
};

export default login;
