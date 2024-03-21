import React from 'react';
import Image from 'next/image';
import CompletedIcon from '../../../../../../public/icons/completed.svg';
// import EditBlock from './EditBlock';
import { clearFormCookies, getFormCookies } from '@/cookies/cookies';
import { FIRST_FORM, SECOND_FORM } from '@/cookies/cookies.d';
import Email from '@/app/components/carousel/icons/email';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/app/components/button/Button';

type FourthStepProps = {
  fourthStepTranslation: {
    title1: string;
    title2: string;
  };
  lang: string;
};

/* let firstForm: { question: string; step: number; identity: string } =
getFormCookies(FIRST_FORM); */

const FourthStep: React.FC<FourthStepProps> = ({
  fourthStepTranslation,
  lang,
}) => {
  const { push } = useRouter();

  const redirectHome = () => {
    clearFormCookies();
    push(`/`);
  };

  return (
    <div>
      <div className="py-4 flex space-y-8 flex-col items-center justify-center">
        <h1 className="font-bold text-xl sm:text-4xl">WIR DANKEN DIR !</h1>
        <Image
          src={CompletedIcon}
          alt="Completed icon"
          className="w-10 sm:w-auto"
        />
        <h1 className="font-bold text-[16px] sm:text-xl">
          DEINE ANFRAGE WIRD BEARBEITET
        </h1>
        <div
          className="border border-gray-500 
        rounded-md w-full xl:w-[50%] p-5 sm:p-10"
        >
          <p className="font-bold text-center mb-6 [word-spacing:10px] tracking-widest text-[12px] sm:text-xl">
            ALLS DU WEITERE FRAGEN BEZÜGLICH EINER VERWEISBERATUNG HAST, SCHREIB
            UNS GERNE AN UND WIR WERDEN UNS SCHNELLSTMÖGLICH BEI DIR PER MAIL
            MELDENALLS DU WEITERE FRAGEN BEZÜGLICH EINER VERWEISBERATUNG HAST,
            SCHREIB UNS GERNE AN UND WIR WERDEN UNS SCHNELLSTMÖGLICH BEI DIR PER
            MAIL MELDEN
          </p>
          <div>
            <div className="flex justify-center items-center gap-x-2">
              <Email />
              <p
                className="hover:border-b hover:border-b-[blue] cursor-pointer"
                onClick={redirectHome}
              >
                Click Here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FourthStep;
