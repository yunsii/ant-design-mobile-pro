import React from 'react';

const FormContext = React.createContext<any>(null);
export const FormProvider = FormContext.Provider;
export const FormConsumer = FormContext.Consumer;
