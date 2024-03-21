export type SecondStepProps = {
  secondStepTranslation: {
    step2: string;
    date: string;
    location: string;
    dateCheckbox: string;
    manifestationTitle: string;
    checkLab1: string;
    otherFormTitle: string;
    title1: string;
    title2: string;
    title4: string;
    validaton: string;
    validaton03: string;
    textAreaPlaceHolder: string;
    title3: string;
    title5: string;
    reportingPerson: string;
    captcha: string;
    captChaRequired: string;
    colognePlaceHolder: string;
    manifestationother: string;
    manifestationName: string;
    headerTit: string;
    manifestationOption: Arr<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: string;
    }>;
    otherFormYesOption: Arr<{}>;
    otherFormOption: Arr<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: string;
    }>;
    haveYouReportedOption: Arr<{
      id: string;
      name: string;
      label: string;
      value: string;
      checked: string;
    }>;
    haveYouReportedDataYesOption: Arr<{}>;
    onBehalf: Arr<{}>;
    myself: Arr<{}>;
    andere: Arr<{}>;
    organization: Arr<{}>;
  };
};

export type SecondFormValues = {
  date: any;
  dateRange: any;
  happenedOverALongPeriodOfTime: string;
  location: string;
  happenedOnline: string;
  manifestationOfDiscrimination: string;
  manifestationOfDiscriminationFreeField: string;
  otherFormOfDisc: string;
  otherFormOfDiscFreeField: string;
  otherFormOfDiscYes: string;
  haveYouReported: string;
  haveYouReportedYes: string;
  haveYouReportedYesFreeField: string;
  description: string;
  agreementForReportingOnBehalf: string;
  captcha: string;
};

export type SecondFormValuesFromCookies = {
  date: any;
  dateRange: any;
  happenedOverALongPeriodOfTime: string;
  location: string;
  happenedOnline: string;
  manifestationOfDiscrimination: string;
  manifestationOfDiscriminationFreeField: string;
  otherFormOfDisc: string;
  otherFormOfDiscFreeField: string;
  otherFormOfDiscYes: string;
  haveYouReported: string;
  haveYouReportedYes: string;
  haveYouReportedYesFreeField: string;
  description: string;
  agreementForReportingOnBehalf: string;
  captcha: string;
  step: number;
};
