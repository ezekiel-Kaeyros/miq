import React, { useEffect, useState } from 'react';
import FormHeader from '../header/header';
import { FifthFormValues, FifthStepProps } from './FifthStep.d';
import RadioSingle from '../../radio/RadioSingle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFormContext } from '@/app/hooks/useFormContext';
import { FORM_ERRORS, LAST_STEP, NEXT_STEP } from '@/app/context/actions';
import { clearFormCookiesStep, getFormCookies, getFormStep, setFormCookies } from '@/cookies/cookies';
import { FOURTH_FORM, SIXTH_FORM } from '@/cookies/cookies.d';
import { useScrollOnTop } from '@/app/hooks/useScrollOnTop';
import AutoComplete from '../../auto-complete/AutoComplete';
import InputField from '../../text-field/InputField';

const FifthStep: React.FC<FifthStepProps> = ({ fifthStepTranslation, id }) => {
  const { dispatch, reportingPerson, isEditing, formErrors } = useFormContext();
  const [question] = useState<string>(fifthStepTranslation?.title);
  const [location, setLocation] = useState<string>('');
  const [searchedText, setSearchedText] = useState<string | undefined>(
    undefined
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FifthFormValues>();

  // Watching fields

  let locationOnline: string = watch('locationOnline');
  let stadtteil: string = watch('stadtteil');

  // Getting form cookies

  // Scroll on top
  useScrollOnTop();

  useEffect(() => {
    let formValues: {
      locationOnline: string;
      location: string;
      question: string;
      stadtteil: string;
    } = getFormCookies(FOURTH_FORM);

    if ( id === 'sixthForm') {
      formValues = getFormCookies(SIXTH_FORM);
    }
    console.log(formErrors, 'probleme');
    // dispatch({ type: FORM_ERRORS, payload: true });
    console.log(locationOnline, 'location');
    dispatch({ type: FORM_ERRORS, payload: true });

    // Validating fields

    // if (stadtteil && stadtteil.length>0 && stadtteil.length<3) {
    //    dispatch({ type: FORM_ERRORS, payload: true });

    // }
    //   if (stadtteil && stadtteil.length == 0 ) {
    //     dispatch({ type: FORM_ERRORS, payload: true });
    //   }

    if (!locationOnline && !formValues) {
      dispatch({ type: FORM_ERRORS, payload: true });
      console.log('bouyakaaa5');
    } else {
      if (locationOnline) {
        if (
          locationOnline &&
          locationOnline === fifthStepTranslation?.secondOption?.value
        ) {
          dispatch({ type: FORM_ERRORS, payload: true });

          if (location && location.length > 0) {
            dispatch({ type: FORM_ERRORS, payload: false });
            if (stadtteil && stadtteil.length == 0) {
              dispatch({ type: FORM_ERRORS, payload: true });
            }
            if (stadtteil && stadtteil.length > 0 && stadtteil.length < 4) {
              dispatch({ type: FORM_ERRORS, payload: true });
            }
            if (stadtteil && stadtteil.length > 3) {
              dispatch({ type: FORM_ERRORS, payload: false });
            }
          }
          if (
            !location &&
            formValues &&
            formValues.location &&
            formValues.location.length > 0
          ) {
            //  dispatch({ type: FORM_ERRORS, payload: true });
          }
        }
        if (
          locationOnline &&
          locationOnline === fifthStepTranslation?.firstOption?.value
        ) {
          dispatch({ type: FORM_ERRORS, payload: false });
        }
      } else {
        if (
          !location &&
          !stadtteil &&
          formValues &&
          formValues.stadtteil &&
          formValues.stadtteil.length > 0
        ) {
          dispatch({ type: FORM_ERRORS, payload: false });
        }
      }
      //   // else{
      //   //    if (
      //   //      formValues &&
      //   //      formValues.location &&
      //   //      formValues.location.length > 0

      //   //    ) {
      //   //      dispatch({ type: FORM_ERRORS, payload: false });
      //   //      console.log('good');

      //   //      if (!location && formValues.stadtteil && formValues.stadtteil.length > 0) {
      //   //       dispatch({ type: FORM_ERRORS, payload: true });
      //   //       console.log('weuttttt');
      //   //      }
      //   //    }
      //   // }
    }

    if (formValues && !locationOnline) {
      locationOnline !== formValues?.locationOnline &&
        setValue('locationOnline', formValues?.locationOnline);

      if (formValues.location && formValues.location.length > 0 && !location) {
        location !== formValues?.location && setLocation(formValues?.location);

        if (formValues.stadtteil && formValues.stadtteil.length > 0) {
          // console.log(formValues.stadtteil, 'stadtteil--------yes');
          stadtteil !== formValues?.stadtteil &&
            setValue('stadtteil', formValues.stadtteil);

          // dispatch({ type: FORM_ERRORS, payload: false });
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    location?.length,
    locationOnline,
    location,
    stadtteil,
    searchedText,
    formErrors,
  ]);

  // Triggered when submitting form
  // console.log(location, 'locationoui');

  const onSubmit: SubmitHandler<FifthFormValues> = (data) => {
    let step = getFormStep();

    let dataWithQuestion = { question, location, step, ...data };
    id === 'sixthForm'
      ? setFormCookies(dataWithQuestion, SIXTH_FORM)
      : setFormCookies(dataWithQuestion, FOURTH_FORM);

   dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
    // isEditing && reportingPerson === 'myself'
    //   ? dispatch({ type: LAST_STEP, payload: 11 })
    //   : dispatch({ type: NEXT_STEP, payload: 'DATA 1' });
  };

  // Autocomple functions

  const handleOnHover = (result: any) => {
    // the item hovered
    console.log(result);
  };

  const handleOnSelect = (item: any) => {
    // the item selected
    setLocation(item?.name);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  // Handle on search

  const handleOnSearch = (string: string, results: any) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    setSearchedText(string);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      id={id === 'sixthForm' ? 'sixthForm' : 'fourthForm'}
      className="lg:w-[35rem]"
    >
      <FormHeader
        title={fifthStepTranslation?.title}
        subTitle={fifthStepTranslation?.description}
      />
      <p className="text-sm -mt-12 mb-8">{fifthStepTranslation?.mandatory}</p>
      <div>
        <RadioSingle
          id={fifthStepTranslation?.firstOption?.id}
          label={fifthStepTranslation?.firstOption?.label}
          name="locationOnline"
          props={register('locationOnline', { required: true })}
          value={fifthStepTranslation?.firstOption?.value}
        />
      </div>
      <div className="flex flex-col ">
        <RadioSingle
          value={fifthStepTranslation?.secondOption?.value}
          id={fifthStepTranslation?.secondOption.id}
          label={fifthStepTranslation?.secondOption?.title}
          name="locationOnline"
          props={register('locationOnline')}
        />
        <div className="w-full pl-8 my-4">
          {locationOnline === fifthStepTranslation?.secondOption?.value && (
            <>
              <AutoComplete
                handleOnSearch={handleOnSearch}
                locationFromParent={location}
                handleOnSelect={handleOnSelect}
              />
              <div className="mt-4 mb-6">
                <InputField
                  props={register('stadtteil')}
                  name={fifthStepTranslation?.thirdOption?.name}
                  title={fifthStepTranslation?.thirdOption?.title}
                />
                <p className="text-sm mt-1 ml-4 text-red-600">
                  {errors?.stadtteil &&
                    fifthStepTranslation?.thirdOption?.minCharacters}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </form>
  );
};

export default FifthStep;
