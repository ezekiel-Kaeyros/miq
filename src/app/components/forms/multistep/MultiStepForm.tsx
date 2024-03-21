'use client';
import React from 'react';
import Stepper from '../stepper/Stepper';
import { useFormContext } from '@/app/hooks/useFormContext';
import FirstStep from './first-step/FirstStep';
import SecondStep from './second-step/SecondStep';
import ThirdStep from './third-step/ThirdStep';
import FourthStep from './fourth-step/FourthStep';
import { Button } from '../../button/Button';
import { NEXT_STEP, PREV_STEP, SUBMIT_FORM } from '@/app/context/actions';
import { getFormStep } from '@/cookies/cookies';

type MultiStepFormValuesProps = {
  stepper: {
    firstStep: any;
    secondStep: any;
    thirdStep: any;
    // fourthStep: any;
  };
  formFields: any;
  button: any;
};

type MultiStepFormProps = {
  lang: any;
  formTranslation: MultiStepFormValuesProps;
};

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  formTranslation,
  lang,
}) => {
  const { step, dispatch, reportingPerson, formErrors } = useFormContext();
  let stepFromCookies = getFormStep();

  return (
    <div>
      <Stepper stepperTranslation={formTranslation.stepper} />
      <div>
        {step == 1 ? (
          <FirstStep firstStepTranslation={formTranslation.stepper.firstStep} />
        ) : step === 2 ? (
          <SecondStep
            secondStepTranslation={formTranslation.stepper.secondStep}
          />
        ) : step === 3 ? (
          <ThirdStep thirdStepTranslation={formTranslation.stepper.thirdStep} />
        ) : step === 4 ? (
          <FourthStep
            fourthStepTranslation={formTranslation.stepper.thirdStep}
            lang={lang}
          />
        ) : null}
      </div>

      {/* {step !== 3 && ( */}
      {step !== 4 && (
        <div className="flex w-full  space-x-0 md:space-x-16 md:space-y-0 space-y-4 mt-16 lg:mt-16 flex-col md:flex-row md:justify-center items-center">
          {step === 2 || step === 3 ? (
            <Button
              variant="primary"
              className="w-[18rem]"
              onClick={() => dispatch({ type: PREV_STEP })}
            >
              {formTranslation.button.prev}
            </Button>
          ) : (
            ''
          )}
          {step === 3 ? (
            <Button
              className="w-[18rem]"
              variant="primary"
              form={`${
                stepFromCookies === 1
                  ? 'firstForm'
                  : stepFromCookies === 2
                    ? 'secondForm'
                    : stepFromCookies === 3
                      ? 'fourthForm'
                      : null
              }`}
            >
              {formTranslation.button.submit}
            </Button>
          ) : (
            <Button
              form={`${
                stepFromCookies === 1
                  ? 'firstForm'
                  : stepFromCookies === 2
                    ? 'secondForm'
                    : stepFromCookies === 3
                      ? 'fourthForm'
                      : null
              }`}
              disabled={formErrors && true}
              variant={`${formErrors ? 'disabled' : 'primary'}`}
              className="w-[18rem] mx-auto"
            >
              {formTranslation.button.next}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
