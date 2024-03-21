import React, { useEffect, useState } from 'react';
import SelectField from '../../select-field/SelectField';
import RadioGroup from '../../radio/RadioGroup';
import AutoComplete from '../../auto-complete/AutoComplete';

import {
  FirstFormValues,
  FirstFormValuesFromCookies,
  FirstStepProps,
} from './firstStep.d';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import InputField from '../../text-field/InputField';
import { useFormContext } from '@/app/hooks/useFormContext';
import {
  FORM_ERRORS,
  LAST_STEP,
  NEXT_STEP,
  REPORTING_PERSON,
} from '@/app/context/actions';
import Checkbox from '../../checkbox/Checkbox';
import { getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FIRST_FORM } from '@/cookies/cookies.d';
import dayjs, { Dayjs } from 'dayjs';
import { DatePicker, DatePickerProps } from 'antd';
import locale from 'antd/es/date-picker/locale/de_DE';
import moment from 'moment';

const { RangePicker } = DatePicker;

const dateFormat = 'DD-MM-YYYY';

interface Option {
  value: string;
  label: string;
}

const FirstStep: React.FC<FirstStepProps> = ({ firstStepTranslation }) => {
  const [question1] = useState<string>(firstStepTranslation.title13);
  const [question2, setQuestion2] = useState<string>(
    firstStepTranslation.title2
  );
  const [question3, setQuestion3] = useState<string>(
    firstStepTranslation.title3
  );
  const [question4, setQuestion4] = useState<string>(
    firstStepTranslation.title8
  );
  const [question5, setQuestion5] = useState<string>(
    firstStepTranslation.title10
  );
  const [dateStart, setDateStart] = useState<any>();
  const [dateEnd, setDateEnd] = useState<any>();
  const [selectedOption, setSelectedOption] = useState(null);

  const [date, setDate] = useState<Date>(new Date());
  const [valueDate, setValueDate] = useState<Dayjs | null>(dayjs());
  const [currentDateStart, setCurrentDateStart] = useState<any>();
  const [currentDateEnd, setCurrentDateEnd] = useState<any>();
  const [selectedtDateStart, setSelectedtDateStart] = useState<any>();
  const [identityData, setIdentityData] = useState<any>();
  const [employeAge, setEmployeAge] = useState<string>();
  const [reportingAge, setReportingAge] = useState<string>();
  const [location, setLocation] = useState<string>('');

  const { dispatch, reportingPerson, isEditing } = useFormContext();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FirstFormValues>();

  let periodOfTime: string = watch('periodOfTime');
  let identity: string = watch('identity');

  let gender: string = watch('gender');
  let age: string = watch('age');
  let genderFreeField: string = watch('genderFreeField');
  let typeOfOrganization: string[] = watch('typeOfOrganization');
  let numberOfEmployees: string = watch('numberOfEmployees');
  let typeOfOrganizationFreeField: string = watch(
    'typeOfOrganizationFreeField'
  );
  let happenedOnlineFreeField: string = watch('happenedOnlineFreeField');
  let PeriodOfTimeFreeField: string = watch('PeriodOfTimeFreeField');
  let happenedOnline: string = watch('happenedOnline');

  // On range picker change
  const onChangeDateStart: DatePickerProps['onChange'] = (
    date: any,
    dateString
  ) => {
    const currentDate = moment(); // Current date
    const selectedDate = moment(date);
    setCurrentDateStart(currentDate);
    setSelectedtDateStart(selectedDate);
    setDateStart(date);
  };

  const onChangeDateEnd: DatePickerProps['onChange'] = (
    date: any,
    dateString
  ) => {
    const currentDate = moment(); // Current date
    const selectedDate = moment(date);
    setCurrentDateEnd(currentDate);
    setDateEnd(date);
  };

  function disabledDate(current: any) {
    // Disable dates after today
    return current && current.isAfter(dayjs().endOf('day'));
  }

  function onChange(date: any, dateString: any) {
    setDate(date);
  }

  // Handle default date value
  let formValues = getFormCookies(FIRST_FORM);

  useEffect(() => {
    // Getting the exact questions
    // Getting form cookies
    let formValues: FirstFormValuesFromCookies = getFormCookies(FIRST_FORM);

    if (reportingPerson === 'onBehalf') {
      setQuestion2(firstStepTranslation.title4);
      setQuestion3(firstStepTranslation.title6);
    } else if (reportingPerson === 'organization') {
      setQuestion2(firstStepTranslation.title5);
      setQuestion3(firstStepTranslation.title7);
    } else if (reportingPerson === 'andere') {
      setQuestion2(firstStepTranslation.title2);
      setQuestion3(firstStepTranslation.title3);
      setQuestion4(firstStepTranslation.title8);
      setQuestion5(firstStepTranslation.title10);
    }

    // Form Validation for first step.
    dispatch({ type: FORM_ERRORS, payload: false });
    if (
      (reportingPerson === 'andere' ||
        reportingPerson === 'myself' ||
        reportingPerson === 'onBehalf') &&
      !gender
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else if (
      (reportingPerson === 'organization' &&
        typeOfOrganization?.length === 0) ||
      (reportingPerson === 'organization' && !typeOfOrganization) ||
      (reportingPerson === 'organization' &&
        typeOfOrganization === undefined) ||
      (reportingPerson === 'organization' &&
        typeOfOrganization &&
        typeOfOrganization?.includes(firstStepTranslation.typeOfOrg[6].label) &&
        typeOfOrganizationFreeField?.length < 3)
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else if (
      ((periodOfTime !== null || periodOfTime !== undefined) &&
        periodOfTime === firstStepTranslation.periodOfTime[0].label &&
        selectedtDateStart === undefined) ||
      ((periodOfTime !== null || periodOfTime !== undefined) &&
        periodOfTime === firstStepTranslation.periodOfTime[0].label &&
        currentDateEnd === undefined)
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    } else if (
      happenedOnline &&
      happenedOnline === firstStepTranslation.happenedOnline[1].label &&
      handleOnSelect.length === 0
    ) {
      dispatch({ type: FORM_ERRORS, payload: true });
    }

    // Setting the values from the cookies
    if (formValues && !gender) {
      formValues?.periodOfTime !== periodOfTime &&
        setValue('periodOfTime', formValues?.periodOfTime);
      formValues?.happenedOnline !== happenedOnline &&
        setValue('happenedOnline', formValues?.happenedOnline);
      formValues?.gender !== gender && setValue('gender', formValues?.gender);
      formValues?.genderFreeField !== genderFreeField &&
        setValue('genderFreeField', formValues?.genderFreeField);
      formValues?.age !== age && setValue('age', formValues?.age);
      formValues?.numberOfEmployees !== numberOfEmployees &&
        setValue('numberOfEmployees', formValues?.numberOfEmployees);
      formValues?.typeOfOrganization !== typeOfOrganization &&
        setValue('typeOfOrganization', formValues?.typeOfOrganization);
      formValues?.typeOfOrganizationFreeField !== typeOfOrganizationFreeField &&
        setValue(
          'typeOfOrganizationFreeField',
          formValues?.typeOfOrganizationFreeField
        );
      formValues?.date && setValueDate(dayjs(formValues?.date));
      formValues?.dateRange && setDateStart(formValues?.dateRange[0]);
      formValues?.dateRange && setDateEnd(formValues?.dateRange[1]);
      formValues?.identificationData &&
        setIdentityData(formValues?.identificationData);
      formValues?.employeAge && setEmployeAge(formValues?.employeAge);
      formValues?.reportingAge && setReportingAge(formValues?.reportingAge);
      formValues?.location && setLocation(formValues?.location);
    }

    console.log(formValues?.dateRange, 'dateRange');
    console.log(
      formValues?.identificationData,
      'this is my form values idedtitydata'
    );
    console.log(formValues?.gender, 'this is my gender');
  }, [
    identity,
    age,
    gender,
    happenedOnline,
    periodOfTime,
    genderFreeField,
    typeOfOrganization,
    happenedOnlineFreeField,
    PeriodOfTimeFreeField,
    typeOfOrganizationFreeField,
    reportingPerson,
    identityData,
    dateStart,
    dateEnd,
    currentDateStart,
    selectedtDateStart,
    currentDateEnd,
    location,
    employeAge,
    reportingAge,
  ]);

  // Triggered when submitting form
  const onSubmit: SubmitHandler<FirstFormValues> = (data) => {
    let step = getFormStep();
    let identificationData = identityData;
    let dateRange = [dateStart, dateEnd];
    let incidentDate = date;
    // console.log(data, 'this is my data');

    let dataWithQuestion = {
      question1,
      question2,
      question3,
      question4,
      question5,
      step,
      ...data,
      identificationData,
      dateRange,
      incidentDate,
      dateStart,
      location,
      employeAge,
      reportingAge,
    };
    setFormCookies(dataWithQuestion, FIRST_FORM);
    // console.log(dataWithQuestion, 'this is my incident date');

    isEditing && reportingPerson === 'myself'
      ? dispatch({ type: LAST_STEP, payload: 10 })
      : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  const handleIdentityData = (label: string) => {
    // Handle the data received from the child component
    setIdentityData(label);
    dispatch({
      type: REPORTING_PERSON,
      payload:
        label === firstStepTranslation.identityOpt[0].label
          ? 'myself'
          : label === firstStepTranslation.identityOpt[1].label
            ? 'andere'
            : label === firstStepTranslation.identityOpt[2].label
              ? 'onBehalf'
              : label === firstStepTranslation.identityOpt[3].label
                ? 'organization'
                : '',
    });
  };

  const handleNumberOfEmployees = (label: string) => {
    setReportingAge(label);
  };

  const handleAgeRangeOpt = (label: string) => {
    setEmployeAge(label);
  };

  // Autocomplete selected location
  const handleOnSelect = (item: any) => {
    // the item selected
    setLocation(item?.name);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="firstForm">
      <div className="w-full relative h-auto p-x-6 sm:p-0">
        <h1 className="text-2xl font-bold text-center mb-6 [word-spacing:10px] tracking-widest">
          {firstStepTranslation?.title12}
        </h1>

        <div className="flex relative md:space-x-16 xl:space-x-24 md:items-start md:flex-row flex-col gap-y-10 justify-between items-center w-full">
          {/* Right Column */}
          <div className=" w-full flex items-start justify-between flex-col">
            <div className="w-[60%]">
              <SelectField
                title={firstStepTranslation.title13}
                options={firstStepTranslation.identityOpt}
                handleSelect={handleIdentityData}
                name={identityData}
                setCurrentInputValue={setIdentityData}
              />
            </div>
            {reportingPerson === 'onBehalf' && (
              <div className="text-sm rounded-lg mt-4">
                {firstStepTranslation.desc}
              </div>
            )}
          </div>

          {/* This section changes when it is an organization */}
          {reportingPerson === 'organization' ? (
            <div className="w-full relative">
              <h1 className="font-bold">{firstStepTranslation.title5}</h1>
              <div className="w-full my-2  flex items-start justify-center flex-col">
                {firstStepTranslation.typeOfOrg?.map((element) => (
                  <Checkbox
                    key={element?.iD}
                    name={element?.name}
                    props={register('typeOfOrganization')}
                    value={element?.value}
                    label={element?.value}
                    id={element?.id}
                  />
                ))}
              </div>
              {typeOfOrganization &&
                typeOfOrganization?.includes(
                  firstStepTranslation.typeOfOrg[6].value
                ) && (
                  <div className="w-full ml-4">
                    <InputField
                      name="typeOfOrganizationFreeField"
                      // props={register('typeOfOrganizationFreeField')}
                      props={register('typeOfOrganizationFreeField', {
                        required: true,
                        minLength: 3,
                      })}
                    />
                    <p className="mb-5">
                      {errors?.typeOfOrganizationFreeField && (
                        <span className="text-sm text-red-600 font-bold">
                          {firstStepTranslation?.validation}
                        </span>
                      )}
                    </p>
                  </div>
                )}
            </div>
          ) : (
            <div className="w-full relative">
              <div className="w-full flex items-start justify-center flex-col">
                <RadioGroup
                  title={
                    reportingPerson === 'onBehalf'
                      ? firstStepTranslation.title4
                      : firstStepTranslation.title2
                  }
                  // name={'gender'}
                  options={firstStepTranslation.genderDataOpt}
                  props={register('gender')}
                />
              </div>
              {gender === firstStepTranslation.genderDataOpt[4]?.label && (
                <div className=" xl:absolute top-[138px] right-32 w-1/2">
                  <InputField
                    error={errors?.genderFreeField ? true : false}
                    name="genderFreeField"
                    props={register('genderFreeField', {
                      required: true,
                      minLength: 3,
                    })}
                  />
                  <p className="mb-5">
                    {errors?.genderFreeField && (
                      <span className="text-sm text-red-600 font-bold">
                        {firstStepTranslation?.validation}
                      </span>
                    )}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* This section changes when it is an organization */}
        <div className="w-full sm:flex xl:space-x-24 mt-5 items-center justify-center">
          <div className="w-full">
            {reportingPerson === 'organization' ? (
              // <div className="my-10 md:absolute md:top-32 md:max-w-xl flex items-start justify-center flex-col w-1/2">
              <div className="my-4 sm:flex items-start justify-center flex-col w-[65%]">
                <SelectField
                  title={firstStepTranslation.title7}
                  options={firstStepTranslation.employeesNumbOpt}
                  handleSelect={handleNumberOfEmployees}
                  // props={register('employeeAge')}
                  name={reportingAge}
                  setCurrentInputValue={setReportingAge}
                />
              </div>
            ) : (
              <div className="my-4 sm:flex items-start justify-center flex-col w-1/2">
                <SelectField
                  title={
                    reportingPerson === 'onBehalf'
                      ? firstStepTranslation.title6
                      : firstStepTranslation.title3
                  }
                  // props={register('age')}
                  name={employeAge}
                  options={firstStepTranslation.ageRangeOpt}
                  handleSelect={handleAgeRangeOpt}
                  setCurrentInputValue={setEmployeAge}
                />
              </div>
            )}
          </div>

          <div className="w-full">
            <RadioGroup
              title={firstStepTranslation.title8}
              options={firstStepTranslation.periodOfTime}
              props={register('periodOfTime')}
            />
            {periodOfTime === firstStepTranslation.periodOfTime[1].label && (
              <div className="w-[60%]">
                <h1 className="font-bold text-gray-900">
                  {firstStepTranslation.title9}
                </h1>
                <DatePicker
                  format={dateFormat}
                  locale={locale}
                  disabledDate={disabledDate}
                  className=" appearance-none border rounded-cs w-full py-3 px-3 leading-tight border-gray-300  focus:outline-none focus:border-primaryColor focus:bg-white text-gray-700 pr-16 font-mono"
                  onChange={onChange}
                  defaultValue={
                    formValues?.dateState
                      ? dayjs(formValues?.dateState)
                      : dayjs(new Date())
                  }
                />
              </div>
            )}

            {periodOfTime === firstStepTranslation.periodOfTime[0].label && (
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full items-center">
                <div className="flex flex-col md:flex-col w-full text-sm md:mb-0 md:items-start">
                  <div className="mr-4 mb-2 md:mb-0 lg:text-xl">
                    <h1>von</h1>
                  </div>
                  <DatePicker
                    className="w-full py-3 focus:border-primaryColor focus:border"
                    disabledDate={disabledDate}
                    defaultValue={dayjs(dateStart)}
                    onChange={onChangeDateStart}
                    format={dateFormat}
                  />
                </div>
                <div className="flex flex-col md:flex-col text-sm md:mb-0 md:items-start w-full">
                  <div className="mr-5 mb-2 md:mb-0 md:mr-4 lg:text-xl">
                    <h1>Bis</h1>
                  </div>
                  <DatePicker
                    disabledDate={(current) => {
                      // Your logic to disable specific dates
                      return (
                        current && (current < dateStart || current > dateEnd)
                      );
                    }}
                    className="w-full py-3"
                    defaultValue={dayjs(dateEnd)}
                    onChange={onChangeDateEnd}
                    format={dateFormat}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10">
          <div className="w-[40%]">
            <RadioGroup
              title={firstStepTranslation.title10}
              options={firstStepTranslation.happenedOnline}
              props={register('happenedOnline')}
            />
            {happenedOnline ===
              firstStepTranslation.happenedOnline[1].label && (
              <div className="w-full">
                <h1 className="font-bold text-gray-900">
                  {firstStepTranslation.title8}
                </h1>
                <AutoComplete handleOnSelect={handleOnSelect} />
                <p className="mb-5">
                  {errors?.happenedOnlineFreeField && (
                    <span className="text-sm text-red-600 font-bold">
                      {firstStepTranslation?.validation}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default FirstStep;
