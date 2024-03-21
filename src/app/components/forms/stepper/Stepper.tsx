'use client';
import { PREV_STEP } from '@/app/context/actions';
import { useFormContext } from '@/app/hooks/useFormContext';
import React from 'react';
import FirstStep from '../multistep/first-step/FirstStep';

type StepperValueProps = {
  firstStep: {
    title1: string;
  };
  secondStep: {
    step2: string;
  };
  thirdStep: {
    step3: string;
    step4: string;
  };
};

type StepperProps = {
  stepperTranslation: StepperValueProps;
};

const Stepper: React.FC<StepperProps> = ({ stepperTranslation }) => {
  const { step, dispatch } = useFormContext();
  return (
    <div className="flex flex-col mb-16 justify-between  items-start h-48 xl:h-0 xl:flex-row xl:flex xl:justify-between xl:items-center">
      <div
        onClick={() => step === 2 && dispatch({ type: PREV_STEP })}
        className="flex flex-col justify-center cursor-pointer xl:items-center xl:gap-y-2  px-[2px] "
      >
        <div
          className={`w-6 h-6 flex justify-center items-center ${
            step === 1 || step === 2 || step === 3 || step === 4
              ? 'bg-primaryColor'
              : ''
          }  text-white rounded-full `}
        >
          1
        </div>
        <div className="text-center">{stepperTranslation.firstStep.title1}</div>
      </div>
      <div className="bg-gray-200 xl:rotate-0 rotate-90 h-1 -ml-4 md:ml-0 w-12 xl:w-64 md:w-8"></div>{' '}
      <div
        className="flex xl:flex-col items-center xl:gap-y-2 cursor-pointer"
        onClick={() => step === 3 && dispatch({ type: PREV_STEP })}
      >
        <div
          className={`w-6 h-6 flex justify-center items-center ${
            step === 2 || step === 3 || step === 4
              ? 'bg-primaryColor'
              : 'bg-neutral-yellow '
          }  text-white rounded-full`}
        >
          2
        </div>
        <div className="ml-2 xl:text-center">
          {stepperTranslation.secondStep.step2}
        </div>
      </div>
      <div className="bg-gray-200 xl:rotate-0 rotate-90 h-1 -ml-4 md:ml-0 w-12 xl:w-64 md:w-8"></div>{' '}
      <div className="flex xl:flex-col xl:gap-y-2 items-center">
        <div
          className={`w-6 h-6 flex justify-center items-center ${
            step === 3 || step === 4 ? 'bg-primaryColor' : 'bg-neutral-yellow '
          }  text-white rounded-full`}
        >
          3
        </div>
        <div className="ml-2 xl:text-center xl:p-4">
          {stepperTranslation.thirdStep.step3}
        </div>
      </div>
      <div className="bg-gray-200 xl:rotate-0 rotate-90 h-1 -ml-4 md:ml-0 w-12 xl:w-64 md:w-8"></div>
      <div className="flex xl:flex-col xl:gap-y-2 items-center">
        <div
          className={`w-6 h-6 flex justify-center items-center ${
            step === 4 ? 'bg-primaryColor' : 'bg-neutral-yellow'
          }  text-white rounded-full`}
        >
          4
        </div>
        <div className="ml-2 xl:text-center">
          {stepperTranslation.thirdStep.step4}
        </div>
      </div>
    </div>
  );
};

export default Stepper;
