import { defaultCountries, usePhoneInput, parseCountry, FlagImage } from 'react-international-phone';
import clsx from 'clsx';

interface RFRPhoneInputProps {
  value: string;
  onChange: (value: string, valueformatted: string) => void;
  className: string;
}

export const RFRPhoneInput = ({ value, onChange, className }: RFRPhoneInputProps) => {
  const { inputValue, handlePhoneValueChange, inputRef, country, setCountry, phone } = usePhoneInput({
    defaultCountry: 'ru',
    value,
    countries: defaultCountries,
    onChange: (data) => {
      onChange(data.phone, inputRef.current?.value ?? '');
    },
  });

  return (
    <input
      ref={inputRef}
      value={inputValue}
      onChange={handlePhoneValueChange}
      className={clsx('', className && className)}
      placeholder={'введите номер телефона'}
    />
  );
};
