export type FirstStepProps = {
  firstStepTranslation: {
    title1: string;
    title2: string;
    title3: string;
    title4: string;
    title5: string;
    title6: string;
    title7: string;
    title8: string;
    title9: string;
    title10: string;
    title11: string;
    title12: string;
    title13: string;
    validation: string;
    default1: string;
    default1: string;
    desc: string;
    identityOpt: Arr<{
      id: string;
      label: string;
    }>;
    genderDataOpt: Arr<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: string;
    }>;
    employeesNumbOpt: Arr<{
      id: string;
      label: string;
    }>;
    ageRangeOpt: Arr<{
      id: string;
      label: string;
    }>;
    typeOfOrg: Array<{
      iD: string;
      id: string;
      name: string;
      label: string;
      value: string;
      checked: boolean;
    }>;
    happenedOnline: Arr<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: string;
    }>;
    periodOfTime: Arr<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: string;
    }>;
  };
};

export type FirstFormValues = {
  periodOfTime: string;
  happenedOnline: string;
  happenedOnlineFreeField: string;
  happenedOnlineFreeField: string;
  PeriodOfTimeFreeField: string;
  identity: string;
  gender: string;
  genderFreeField: string;
  numberOfEmployees: string;
  typeOfOrganizationFreeField: string;
  typeOfOrganization: string[];
  age: string;
  // identityData: string;
  dateStart: any;
  dateEnd: any;
  date: any;
  employeeAge: string;
  reportingAge: string;
  identificationData: string;
};

export type FirstFormValuesFromCookies = {
  periodOfTime: string;
  happenedOnline: string;
  identity: string;

  questionAge: string;

  questionGender: string;

  questionTypeOfOrganization: string;

  questionNumberOfEmployees: string;

  genderFreeField: string;
  typeOfOrganization: string[];
  numberOfEmployees: string;
  typeOfOrganizationFreeField: string;

  step: number;

  age: string;
  gender: string;
  data: string;
  identityData: any;
  dateStart: any;
  dateEnd: any;
  date: any;
  dateRange: any[];
  location: any;
  employeAge: string;
  reportingAge: string;
  identificationData: string;
};
