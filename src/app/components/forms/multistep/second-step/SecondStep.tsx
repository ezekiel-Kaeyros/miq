import { DatePicker } from 'antd';
import 'dayjs/locale/de';
import locale from 'antd/es/date-picker/locale/de_DE';
import React, { useEffect, useState } from 'react';
import InputField from '../../text-field/InputField';
import SelectField from '../../select-field/SelectField';
import TextArea from '../../text-area/TextArea';
import Checkbox from '../../checkbox/Checkbox';
import dayjs from 'dayjs';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  SecondFormValues,
  SecondFormValuesFromCookies,
  SecondStepProps,
} from './secondStep.d';
import {
  andere,
  haveYouReportedData,
  haveYouReportedDataYes,
  manifestation,
  myself,
  onBehalf,
  organization,
  otherForm,
  otherFormYes,
} from './secondFormData';
import { useFormContext } from '@/app/hooks/useFormContext';
import DescriptionHintBox from './DescriptionHintBox';
import {
  clearFormCookies,
  getFormCookies,
  getFormStep,
  setFormCookies,
} from '@/cookies/cookies';
import { SECOND_FORM } from '@/cookies/cookies.d';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import AutoComplete from '../../auto-complete/AutoComplete';
import CaptchaCheckbox from '@/app/components/captcha/captcha-checkbox/CaptchaCheckbox';
import { verifyCaptchaAction } from '@/app/components/captcha/Captcha';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import RadioGroup from '../../radio/RadioGroup';

const { RangePicker } = DatePicker;

const dateFormat = 'DD-MM-YYYY';

const SecondStep: React.FC<SecondStepProps> = ({ secondStepTranslation }) => {
  const [question1] = useState<string>(secondStepTranslation.title4);

  const [question2] = useState<string>(
    secondStepTranslation.manifestationTitle
  );

  const [question3] = useState<string>(secondStepTranslation.otherFormTitle);

  const [question4] = useState<string>(secondStepTranslation.title1);

  const [date, setDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<any>();
  const { dispatch, reportingPerson, isEditing } = useFormContext();
  const [location, setLocation] = useState<string>('');
  const [captchLoading, setCaptchaLoading] = useState<boolean>(true);
  const [verified, setVerified] = useState<any>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SecondFormValues>();

  let happenedOverALongPeriodOfTime: string = watch(
    'happenedOverALongPeriodOfTime'
  );

  let happenedOnline: string = watch('happenedOnline');
  let otherFormOfDisc: string = watch('otherFormOfDisc');
  let otherFormOfDiscYes: string = watch('otherFormOfDiscYes');
  let haveYouReported: string = watch('haveYouReported');
  let haveYouReportedYes: string = watch('haveYouReportedYes');
  let manifestationOfDiscrimination: string = watch(
    'manifestationOfDiscrimination'
  );
  let manifestationOfDiscriminationFreeField: string = watch(
    'manifestationOfDiscriminationFreeField'
  );
  let haveYouReportedYesFreeField: string = watch(
    'haveYouReportedYesFreeField'
  ); //used

  const description: string = watch('description');

  let captcha: string = watch('captcha');

  console.log(captcha, 'ooooooooo');

  useEffect(() => {
    let formValues: SecondFormValuesFromCookies = getFormCookies(SECOND_FORM);

    // Form Validation.
    dispatch({ type: FORM_ERRORS, payload: false });

    if (formValues && !description) {
      formValues?.description !== description &&
        setValue('description', formValues?.description);

      formValues?.haveYouReported !== haveYouReported &&
        setValue('haveYouReported', formValues?.haveYouReported);

      formValues?.haveYouReportedYes !== haveYouReportedYes &&
        setValue('haveYouReportedYes', formValues?.haveYouReportedYes);

      formValues?.haveYouReportedYesFreeField !== haveYouReportedYesFreeField &&
        setValue(
          'haveYouReportedYesFreeField',
          formValues?.haveYouReportedYesFreeField
        );

      formValues?.otherFormOfDisc !== otherFormOfDisc &&
        setValue('otherFormOfDisc', formValues?.otherFormOfDisc);

      formValues?.otherFormOfDiscYes !== otherFormOfDiscYes &&
        setValue('otherFormOfDisc', formValues?.otherFormOfDiscYes);

      formValues?.manifestationOfDiscrimination !==
        manifestationOfDiscrimination &&
        setValue(
          'manifestationOfDiscrimination',
          formValues?.manifestationOfDiscrimination
        );

      formValues?.manifestationOfDiscriminationFreeField !==
        manifestationOfDiscriminationFreeField &&
        setValue(
          'manifestationOfDiscriminationFreeField',
          formValues?.manifestationOfDiscriminationFreeField
        );
    }
  }, [
    haveYouReported,
    haveYouReportedYes,
    otherFormOfDisc,
    manifestationOfDiscrimination,
    manifestationOfDiscriminationFreeField,
    description,
    otherFormOfDiscYes,
    haveYouReportedYesFreeField,
    captcha,
  ]);

  // Handle captcha
  const handleCaptcha = async () => {
    // Captcha verification
    // if the component is not mounted yet
    if (!executeRecaptcha) {
      return;
    }
    // receive a token

    try {
      const token = await executeRecaptcha('onSubmit');

      // validate the token via the server action we've created previously

      const verified = await verifyCaptchaAction(token);

      verified && setVerified(verified);

      setCaptchaLoading(false);
    } catch (error) {
      console.log(error);
      setCaptchaLoading(false);
    }
  };

  captcha && handleCaptcha();
  // On range picker change

  function onDateRangeChange(date: any, dateString: any) {
    setDateRange(date);
  }

  function disabledDate(current: any) {
    // Disable dates after today
    return current && current.isAfter(dayjs().endOf('day'));
  }
  function onChange(date: any, dateString: any) {
    setDate(date);
  }
  // Autocomplete selected location

  const handleOnSelect = (item: any) => {
    // the item selected
    setLocation(item?.name);
  };
  // Triggered when submitting form
  const onSubmit: SubmitHandler<SecondFormValues> = (data) => {
    let step = getFormStep();
    let dataWithQuestion = {
      question1,
      question2,
      question3,
      question4,
      step,
      ...data,
    };
    setFormCookies(dataWithQuestion, SECOND_FORM);
    console.log(dataWithQuestion, 'this is my data whith questions');

    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 10 })
    //   :
    dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // clearFormCookies();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id="secondForm"
      className="w-auto h-full mx-auto"
    >
      <h1 className="text-2xl font-bold text-center mb-6 [word-spacing:10px] tracking-widest">
        {secondStepTranslation.headerTit}
      </h1>

      {/* This is my text area field */}
      <div className="py-4 flex lg:space-x-16 lg:flex-row flex-col">
        <div className="xl:w-[45%]">
          <TextArea
            title={secondStepTranslation.title4}
            // props={register('description')}options[0].label
            props={register('description', {
              required: true,
              minLength: 50,
            })}
            name="description"
            placeholder={secondStepTranslation.textAreaPlaceHolder}
          />
          <p className="mb-5">
            {errors?.description && (
              <span className="text-sm text-red-600 font-bold">
                {secondStepTranslation.validaton}
              </span>
            )}
          </p>
          <p className="mt-2">
            <span className="text-red-500 mr-2 text-sm">*</span>
            {secondStepTranslation.title2}
          </p>
        </div>

        <div className="">
          {reportingPerson === 'organization' ? (
            <DescriptionHintBox
              data={secondStepTranslation.organization}
              // data={organization}
              title={secondStepTranslation.title5}
            />
          ) : reportingPerson === 'onBehalf' ? (
            <DescriptionHintBox
              data={secondStepTranslation.onBehalf}
              // data={onBehalf}
              title={secondStepTranslation.title5}
            />
          ) : reportingPerson === 'andere' ? (
            <DescriptionHintBox
              data={secondStepTranslation.andere}
              // data={andere}
              title={secondStepTranslation.title5}
            />
          ) : (
            <DescriptionHintBox
              data={secondStepTranslation.myself}
              // data={myself}
              title={secondStepTranslation.title5}
            />
          )}
        </div>
      </div>

      {/* Form Grid */}
      <div className="flex mt-6 lg:space-x-16 justify-between w-full flex-col lg:flex-row">
        {/*Left Column wrapper */}
        <div className="w-full">
          <div className="flex items-start justify-center flex-col relative">
            <RadioGroup
              options={secondStepTranslation.manifestationOption}
              title={secondStepTranslation.manifestationTitle}
              props={register('manifestationOfDiscrimination')}
            />

            {manifestationOfDiscrimination ===
              secondStepTranslation.manifestationOption[4].label && (
              <div className=" xl:absolute top-[140px] right-[150px] w-1/2">
                <InputField
                  name="manifestationOfDiscriminationFreeField"
                  // props={register('manifestationOfDiscriminationFreeField')}
                  props={register('manifestationOfDiscriminationFreeField', {
                    required: true,
                    minLength: 3,
                  })}
                />
                <p className="mb-5">
                  {errors?.manifestationOfDiscriminationFreeField && (
                    <span className="text-sm text-red-600 font-bold">
                      {secondStepTranslation.validaton03}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/*Right Column wrapper */}
        <div className="w-full">
          {/*Right Column */}
          <div className="lg:py-6 relative flex items-start justify-center flex-col">
            <RadioGroup
              options={secondStepTranslation.otherFormOption}
              title={secondStepTranslation.otherFormTitle}
              props={register('otherFormOfDisc')}
            />

            {otherFormOfDisc ===
              secondStepTranslation.otherFormOption[8].label && (
              <div className="xl:absolute top-[280px] right-[157px] w-1/2">
                <div className="pt-3">
                  <InputField
                    // name="otherFormOfDiscFreeField"
                    // props={register('otherFormOfDiscFreeField')}
                    name="otherFormOfDiscYes"
                    // props={register('otherFormOfDisc')}
                    props={register('otherFormOfDiscYes', {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  <p className="mb-5">
                    {errors?.otherFormOfDiscYes && (
                      <span className="text-sm text-red-600 font-bold">
                        {secondStepTranslation.validaton03}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="">
        <div className="relative">
          <RadioGroup
            title={secondStepTranslation.title1}
            options={secondStepTranslation.haveYouReportedOption}
            props={register('haveYouReported')}
          />
          <div className="xl:absolute top-[96px] left-[520px]">
            {haveYouReported ===
              secondStepTranslation.haveYouReportedOption[3].label && (
              <div className="w-full ">
                <div className="pt-3">
                  {/* // props={register('otherFormOfDiscFreeField')} */}
                  <InputField
                    name="haveYouReportedYes"
                    props={register('haveYouReportedYes', {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  <p className="mb-5">
                    {errors?.haveYouReportedYes && (
                      <span className="text-sm text-red-600 font-bold">
                        {secondStepTranslation.validaton03}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="xl:absolute top-[135px] left-[180px]">
            {haveYouReported ===
              secondStepTranslation.haveYouReportedOption[4].label && (
              <div className="w-full ">
                <div className="pt-3">
                  <InputField
                    name="haveYouReportedYesFreeField"
                    props={register('haveYouReportedYesFreeField', {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  <p className="mb-5">
                    {errors?.haveYouReportedYesFreeField && (
                      <span className="text-sm text-red-600 font-bold">
                        {secondStepTranslation.validaton03}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Only displays when we are reporting on behalf of a person */}

      {reportingPerson === 'onBehalf' && (
        <div>
          <Checkbox
            props={register('agreementForReportingOnBehalf')}
            value={secondStepTranslation.reportingPerson}
            id="agreement"
            name="agreement"
            label={secondStepTranslation.reportingPerson}
          />
        </div>
      )}

      {/* Captcha temporary */}
      <div className="mt-16">
        <CaptchaCheckbox
          id="captcha"
          loading={captchLoading}
          checked={captcha ? true : false}
          name="captcha"
          props={register('captcha', { required: true })}
          value="captcha"
          label={secondStepTranslation.captcha}
        />
        <p className="mb-5">
          {errors?.captcha && (
            <span className="text-sm text-red-600 font-bold">
              {secondStepTranslation.captChaRequired}
            </span>
          )}
        </p>
      </div>
    </form>
  );
};

export default SecondStep;
