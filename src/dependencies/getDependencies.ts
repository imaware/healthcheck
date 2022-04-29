/* eslint-disable prettier/prettier */
import { fhir } from './fhir';
import { service } from './service';

const imawarePartnerApi = 'imaware-partner-api';
const partnerApi = 'partner-api';
const labApi = 'lab-api';
const trackingApi = 'order-tracking-api';
const resultsApi = 'imaware-result-intepretation-api';
const emailApi = 'imaware-email-service';
const pdfApi = 'pdf-generator-api';

export const getDependencies = (apiName: string): Function[] => {
  const serviceDependencies: { [key: string]: Function[] } = {
    [imawarePartnerApi]: [fhir, () => service(apiName, process.env.ORDER_TRACKING_URI)],
    [partnerApi]: [fhir, () => service(apiName, process.env.ORDER_TRACKING_URI)],
    [labApi]: [fhir, () => service(apiName, process.env.ORDER_TRACKING_URI)],
    [trackingApi]: [fhir, () => service(apiName, process.env.RESULTS_API_URI), () => service(apiName, process.env.EMAIL_API_URI)],
    [resultsApi]: [fhir],
    [emailApi]: [fhir],
    [pdfApi]: [fhir],
  };

  return serviceDependencies[apiName];
};
