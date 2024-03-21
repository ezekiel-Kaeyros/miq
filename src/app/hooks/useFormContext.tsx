import { useContext } from 'react';
import { FormContext } from '../context/FormContext';

export const useFormContext = () => {
  const { state, dispatch } = useContext(FormContext);
  let step = state.step;
  let formData = state.formData;
  let formErrors: boolean = state?.formErrors;
  let reportingPerson: 'myself' | 'andere' | 'onBehalf' | 'organization' =
    state?.reportingPerson;

  let isEditing: boolean = state?.isEditing;
  return { step, formData, dispatch, formErrors, reportingPerson, isEditing };
};
