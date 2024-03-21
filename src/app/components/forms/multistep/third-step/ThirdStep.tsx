import React, { use, useEffect, useState } from 'react';
import Image from 'next/image';
import CompletedIcon from '../../../../../../public/icons/completed.svg';
import EditBlock from './EditBlock';
import {
  clearFormCookies,
  getFormCookies,
  getFormStep,
} from '@/cookies/cookies';
import { FIRST_FORM, SECOND_FORM } from '@/cookies/cookies.d';
import { useFormContext } from '@/app/hooks/useFormContext';
import { SubmitHandler, useForm } from 'react-hook-form';
import { THIRD_FORM } from '@/cookies/cookies.d';
// import { LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { ThirdFromValues } from './thirdStep';
import { identityData } from '../first-step/firstFormData';
import { organization } from '../second-step/secondFormData';

type ThirdStepProps = {
  thirdStepTranslation: {
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    headerTit: string;
  };
};

const ThirdStep: React.FC<ThirdStepProps> = ({ thirdStepTranslation }) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<ThirdFromValues>();

  let secondForm: {
    step: number;
    question: string;
    otherFormOfDisc: string;
    haveYouReported: string;
    manifestationOfDiscrimination: string;
    description: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
  } = getFormCookies(SECOND_FORM);

  let firstForm: {
    periodOfTime: string;
    step: number;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    gender: string;
    age: string;
    genderFreeField: string;
    typeOfOrganization: string[];
    numberOfEmployees: string;
    typeOfOrganizationFreeField: string;
    happenedOnlineFreeField: string;
    PeriodOfTimeFreeField: string;
    happenedOnline: string;
    identity: string;
    identificationData: string;
    dateRange: any;
    incidentDate: any;
    dateStart: any;
    location: any;
    employeeAge: string;
    reportingAge: string;
  } = getFormCookies(FIRST_FORM);

  const { dispatch, reportingPerson, isEditing } = useFormContext();

  const onSubmit: SubmitHandler<any> = (data) => {
    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    clearFormCookies();
  };

  useEffect(() => {}, [firstForm, secondForm]);
  console.log(identityData, 'this is my identityData');
  console.log(reportingPerson, 'thi is my reporting person');
  // console.log(firstForm?.typeOfOrganization, 'this is my typeOfOrganization');

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="fourthForm">
      {/* // <div onClick={handleSubmitBtn} id="fourthForm"> */}
      <div className="p-4 sm:px-10 xl:px-60">
        <div>
          <h1 className="text-2xl font-bold text-center mb-6 [word-spacing:10px] tracking-widest">
            {thirdStepTranslation?.title3}
          </h1>
          <h2 className="font-bold mb-6 [word-spacing:10px] tracking-widest">
            {thirdStepTranslation?.title4}
          </h2>
        </div>
        {/* This is for first form */}
        <div className="mt-10 grid grid-cols-2 gap-x-20">
          <EditBlock
            step={firstForm?.step}
            question={firstForm?.question1}
            answer={firstForm?.identificationData}
          />
          <EditBlock
            step={firstForm?.step}
            question={firstForm?.question2}
            answer={
              reportingPerson === 'organization'
                ? firstForm?.typeOfOrganization
                : firstForm?.gender
            }
          />
          <EditBlock
            step={firstForm?.step}
            question={firstForm?.question3}
            answer={
              reportingPerson === 'organization'
                ? firstForm?.employeeAge
                : firstForm?.reportingAge
            }
          />
          <EditBlock
            step={firstForm?.step}
            question={firstForm?.question4}
            answer={
              firstForm && firstForm?.dateRange?.includes('undefined')
                ? firstForm?.dateRange
                : firstForm?.incidentDate
            }
          />
          <EditBlock
            step={firstForm?.step}
            question={firstForm?.question5}
            answer={
              firstForm?.location
                ? [firstForm?.happenedOnline, firstForm?.location]
                : firstForm?.happenedOnline
            }
          />
        </div>

        {/* This is for my second Form */}
        <div>
          <h1 className="text-2xl font-bold mt-20 [word-spacing:10px] tracking-widest">
            {thirdStepTranslation?.headerTit}
          </h1>
          <div className="">
            <div className=" xl:w-full ">
              <EditBlock
                step={secondForm?.step}
                question={secondForm?.question1}
                answer={secondForm?.description}
              />
            </div>
            <div className="grid grid-cols-2 mt-10 gap-x-20">
              <EditBlock
                step={secondForm?.step}
                question={secondForm?.question2}
                answer={secondForm?.manifestationOfDiscrimination}
              />
              <EditBlock
                step={secondForm?.step}
                question={secondForm?.question3}
                answer={secondForm?.otherFormOfDisc}
              />
              <EditBlock
                step={secondForm?.step}
                question={secondForm?.question4}
                answer={secondForm?.haveYouReported}
              />
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
    </form>
  );
};

export default ThirdStep;
