import { useState } from 'react';
import { RFRForm } from '~/App/RFRForm';
import { RFRFormValues } from '~/App/RFRTypes';
import { RFRPdfRender } from '~/App/RFRPdfRender';

export function App() {
  const [step, setStep] = useState<'form' | 'pdfRender'>('form');
  const [formValues, setFormValues] = useState<RFRFormValues | null>(null);
  const [phoneFormatted, setPhoneFormatted] = useState('');

  return (
    <div className={'relative w-full min-h-screen mx-auto bg-[#FFFFFF]'}>
      {step === 'form' && (
        <RFRForm
          onSubmit={(data, phoneFormatted) => {
            setFormValues(data);
            setStep('pdfRender');
            setPhoneFormatted(phoneFormatted);
          }}
        />
      )}
      {step === 'pdfRender' && formValues && (
        <RFRPdfRender
          formValues={formValues}
          phoneFormatted={phoneFormatted}
          onGoToBack={() => {
            setFormValues(null);
            setPhoneFormatted('');
            setStep('form');
          }}
        />
      )}
    </div>
  );
}
