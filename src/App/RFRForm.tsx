import { FormEvent, useRef, useState } from 'react';
import { RFRPhoneInput } from './RFRPhoneInput';
import sfImg from '~/assets/SF.jpg';
import { RFRFormValues } from '~/App/RFRTypes';

interface RFRFormProps {
  onSubmit: (data: RFRFormValues, phoneFormatted: string) => void;
}

const validate = (values: RFRFormValues) => {
  const isNameError = !values.name.trim();
  const isPhoneError = !values.phone.trim();
  const isConfirmError = !values.isConfirm;

  const isError = isNameError || isPhoneError || isConfirmError;

  return { isNameError, isPhoneError, isConfirmError, isError };
};

export const RFRForm = ({ onSubmit }: RFRFormProps) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isConfirm, setIsConfirm] = useState(false);
  const [isFormCheck, setIsFormCheck] = useState(false);
  const phoneFormatted = useRef<string>('');

  const { isConfirmError, isPhoneError, isNameError } = validate({ name, phone, isConfirm });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormCheck(true);
    const { isError } = validate({ name, phone, isConfirm });
    if (isError) {
      return;
    }
    onSubmit({ name, phone, isConfirm }, phoneFormatted.current);
  };

  return (
    <form onSubmit={handleSubmit}>
      <img src={sfImg} alt="" />
      <div className="p-10">
        <div className="font-bold text-[18px] text-center sm:text-[32px]">
          Скачайте именной пригласительный сертификат!
        </div>
        <div className="mt-6 text-[14px] text-center">
          Для этого заполните два поля - имя и номер телефона. На сертификате будет отображаться ваше имя и телефон.
          Отправляйте приглашение вашим друзьям и получайте занятия в подарок.
        </div>
        <input
          type="text"
          className="border border-[#AAAAAA] rounded-[100px] px-4 h-12 outline-none block mt-6 w-full"
          placeholder={'Введите имя'}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {isFormCheck && isNameError && <div className="text-[14px] text-red-600">нужно указать имя!</div>}
        <RFRPhoneInput
          value={phone}
          onChange={(phone, currentPhoneFormatted) => {
            setPhone(phone);
            phoneFormatted.current = currentPhoneFormatted;
          }}
          className={'border border-[#AAAAAA] rounded-[100px] px-4 h-12 outline-none block mt-6 w-full'}
        />
        {isFormCheck && isPhoneError && <div className="text-[14px] text-red-600">нужно указать телефон!</div>}
        <div className="mt-6 flex">
          <input
            type="checkbox"
            className="mr-2 size-10 cursor-pointer"
            checked={isConfirm}
            onChange={(e) => {
              setIsConfirm(e.target.checked);
            }}
          />
          <div className="text-[14px]">
            Отправляя форму, вы соглашаетесь с офертой и даёте согласие на обработку ваших персональных данных
          </div>
        </div>
        {isFormCheck && isConfirmError && <div className="text-[14px] text-red-600">нужно принять условия!</div>}
        <button className="bg-[#8e62e5] text-[#FFFFFF] mt-6 min-h-12 rounded-[100px] px-4 w-full" type="submit">
          Создать пригласительный сертификат
        </button>

      </div>
    </form>
  );
};
