'use client';
import { Button } from '@/app/components/button/Button';
import EmailField from '@/app/components/forms/email-field/EmailField';
import PasswordField from '@/app/components/forms/password-field/PasswordField';

import React, { FC, useEffect } from 'react';

import { useState, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import key from '../../../../../../../public/icons/Key.svg';
import personne from '../../../../../../../public/icons/Person.svg';
import eye from '../../../../../../../public/icons/Eye.svg';
import Image from 'next/image';

import AuthService from '@/services/authService';
import { usePathname, useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import { Result } from 'postcss';
import {
  removeRefreshToken,
  setRefreshToken,
  setUserCookies,
} from '@/cookies/cookies';
// import InputField from '@/app/components/forms/text-field/InputField';
import { AuthContext, AuthProvider } from '@/app/context/AuthContext';
import { useAuth } from '@/app/hooks/useAuth';
import { DecodeToken } from '../DecodeToken';
import InputField from './InputField';
import Link from 'next/link';
import InputField2 from '@/app/components/forms/text-field/InputField2';
// import { verify } from '@/app/api/utils/decode';

interface IFormInput {
  email: string;
  password: string;
}

type LoignProps = {
  lang: string;
  loginTranslation: {
    paragraph: string;
    login: string;
    signIn: string;
    email: string;
    password: string;
  };
};

const LoginForm = () => {
  const {
    register,
    watch,
    formState: { errors, isSubmitting, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormInput>({ mode: 'onChange' || 'onBlur' || 'onSubmit' });
  const { loginUser, user } = useAuth();
  // removeRefreshToken();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const pathname = usePathname();
  const { push } = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    const response = new AuthService()
      .login(data)
      .then((result) => {
        if (result.status === 201) {
          const user = DecodeToken(result.headers.authorization);

          user.then((result1) => {
            // let user1:UserDataType=result1

            if (typeof result1 == 'object') {
              // console.log('result', typeof result1);
              setUserCookies({
                ...result1,
                token: result.headers.authorization,
              });
              //  setRefreshToken(result.headers.authorization);
              toast.success(result.data.message);
              setIsLoading(false);
              window.location.href = '/en/dashboard';
            }
          });
        }
      })
      .catch((error) => {
        console.log('error', error);

        toast.error('Something went wrong, try again');
        setIsLoading(false);
      });
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Watching fields
  let email: string = watch('email');
  let password: string = watch('password');

  // This is to toggle password visibility.
  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  // console.log(user, 'ctx');
  useEffect(() => {
    if (user) {
      // console.log(user, 'user');
    }
  }, [user]);
  return (
    <div className="flex xl:items-center justify-center h-[100vh] mt-16 sm:mt-40 xl:mt-0">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full sm:w-[70%] xl:w-2/5 flex flex-col gap-y-20 h-1/2 px-8 xl:px-32">
        <div>
          <h1 className="font-bold text-[42px]">Login</h1>
          <p className="mt-5">
            Welcome back ! Please log in to access your account
          </p>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1 className="text-3xl sm:text-4xl mb-4"></h1>
            <div className="w-full ">
              <InputField2
                name="email"
                type="email"
                id="email"
                placeholder="Enter your username"
                img={personne}
                title=""
                props={register('email', {
                  required: true,
                  pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                })}
                isValid={errors.email ? true : false}
              />
            </div>
            <div className="w-full my-4 relative">
              <InputField2
                name="password"
                type={isPasswordVisible ? 'text' : 'password'}
                id="password"
                placeholder="Enter your password"
                img={key}
                isValid={errors.password ? true : false}
                props={{
                  ...register('password', {
                    required: 'size password is min 4 Length',
                    minLength: 4,
                  }),
                }}
              />
              <Image
                src={eye}
                alt="eye toggle"
                className="absolute top-1/4 right-6 cursor-pointer w-7"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              />
            </div>
            <div className="flex justify-end mr-4">
              <Link
                href="/reset-password"
                className="hover:text-primary border-b-1 hover:border-b-1 hover:border-primary"
              >
                Forgot Password?
              </Link>
            </div>
            <Button
              className="mt-7 rounded-lg text-sm sm:text-xl bg-primary"
              variant={!isValid || isLoading ? 'disabled' : 'primary'}
              type="submit"
              disabled={!isValid || isLoading ? true : false}
            >
              {isLoading ? (
                <div
                  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status"
                ></div>
              ) : (
                <h2>Login</h2>
              )}
            </Button>
          </form>
        </div>
      </div>
      <div className="w-3/5 h-full  items-center justify-center bg-primary hidden xl:flex"></div>
    </div>
  );
};

export default LoginForm;
