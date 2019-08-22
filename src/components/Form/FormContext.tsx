import React from 'react';

const FormContext = React.createContext<any>(null);
export default FormContext;
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;
