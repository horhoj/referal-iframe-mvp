import { Document, Page, Text, View, StyleSheet, Font, pdf, Image, Link, PDFViewer } from '@react-pdf/renderer';
import { useState } from 'react';
import { Simulate } from 'react-dom/test-utils';
import { RFRFormValues } from '~/App/RFRTypes';
import certTemplateImg from '~/assets/certTemplateImg.png';

import circeRoundedRegular from '~/assets/fonts/CirceRounded-Regular.ttf';
import error = Simulate.error;

interface RFRPdfRenderProps {
  formValues: RFRFormValues;
  phoneFormatted: string;
  onGoToBack: () => void;
}

Font.register({
  family: 'circeRoundedRegular',
  fontWeight: 'normal',
  src: circeRoundedRegular,
});

export const RFRPdfRender = ({ formValues, phoneFormatted, onGoToBack }: RFRPdfRenderProps) => {
  const [isLoding, setIsLoding] = useState(false);
  const acpCreateAndDownloadPDF = async () => {
    try {
      setIsLoding(true);
      const blob = await pdf(
        <PDFLayout
          name={formValues.name}
          phoneFormatted={phoneFormatted}
          phone={formValues.phone}
          isLinkEnabled={true}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Сертификат Sirius Future.pdf`;
      a.click();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoding(false);
    }
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <div className={'relative overflow-auto w-full'}>
        <img src={certTemplateImg} alt="" className="min-w-[400px] max-w-[400px]" />
        <div className="absolute top-[35px] left-[16px] text-[7px]">
          Вас пригласил(а) {formValues.name.toUpperCase()}
        </div>
        <div className="absolute top-[45px] left-[16px] text-[7px]">{phoneFormatted}</div>
      </div>
      <button
        className="bg-[#8e62e5] text-[#FFFFFF] mt-6 min-h-12 rounded-[100px] px-4 w-full"
        onClick={acpCreateAndDownloadPDF}
        disabled={isLoding}
      >
        {isLoding ? 'Создаем сертификат...' : 'Скачать сертификат'}
      </button>
      <button
        className="bg-[#8e62e5] text-[#FFFFFF] mt-6 min-h-12 rounded-[100px] px-4 w-full"
        onClick={onGoToBack}
        disabled={isLoding}
      >
        Повторить ввод данных
      </button>
    </div>
  );
};

const transliterateName = (name: string) => {
  const charMap: Record<string, string> = {
    А: 'A',
    Б: 'B',
    В: 'V',
    Г: 'G',
    Д: 'D',
    Е: 'E',
    Ё: 'E',
    Ж: 'Zh',
    З: 'Z',
    И: 'I',
    Й: 'Y',
    К: 'K',
    Л: 'L',
    М: 'M',
    Н: 'N',
    О: 'O',
    П: 'P',
    Р: 'R',
    С: 'S',
    Т: 'T',
    У: 'U',
    Ф: 'F',
    Х: 'Kh',
    Ц: 'Ts',
    Ч: 'Ch',
    Ш: 'Sh',
    Щ: 'Shch',
    Ъ: '',
    Ы: 'Y',
    Ь: '',
    Э: 'E',
    Ю: 'Yu',
    Я: 'Ya',
    а: 'a',
    б: 'b',
    в: 'v',
    г: 'g',
    д: 'd',
    е: 'e',
    ё: 'e',
    ж: 'zh',
    з: 'z',
    и: 'i',
    й: 'y',
    к: 'k',
    л: 'l',
    м: 'm',
    н: 'n',
    о: 'o',
    п: 'p',
    р: 'r',
    с: 's',
    т: 't',
    у: 'u',
    ф: 'f',
    х: 'kh',
    ц: 'ts',
    ч: 'ch',
    ш: 'sh',
    щ: 'shch',
    ъ: '',
    ы: 'y',
    ь: '',
    э: 'e',
    ю: 'yu',
    я: 'ya',
  };

  return name
    .split('')
    .map((char) => charMap[char] || char)
    .join('')
    .replace(/\s/g, '');
};

const makeLink = (name: string, phone: string) => {
  const nameTransliterated = transliterateName(name);

  return `https://siriusfuture.ru/refferal-program-friends?utm_source=referal&utm_medium=sertificat&utm_campaign=${phone}(${nameTransliterated})&utm_content=free_lesson`;
};

const PDFLayout = ({
  name,
  phoneFormatted,
  phone,
  isLinkEnabled,
}: {
  name: string;
  phone: string;
  phoneFormatted: string;
  isLinkEnabled: boolean;
}) => {
  return (
    <Document>
      <Page style={{ position: 'relative', backgroundColor: '#FFFFFF' }} orientation={'landscape'}>
        {isLinkEnabled && (
          <Link href={makeLink(name, phone)} style={{ position: 'absolute', width: '100%', height: '100%' }} />
        )}
        <Text
          style={{
            position: 'absolute',
            top: 95,
            fontFamily: 'circeRoundedRegular',
            left: 32,
            color: '#323232',
            opacity: 0.9,
          }}
        >
          Вас пригласил(а) {name.toUpperCase()}
        </Text>

        <Text
          style={{
            position: 'absolute',
            top: 120,
            fontFamily: 'circeRoundedRegular',
            left: 32,
            color: '#323232',
            opacity: 0.9,
          }}
        >
          {phoneFormatted}
        </Text>
        <Image
          src={certTemplateImg}
          style={{ position: 'absolute', zIndex: -1, top: 0, width: '100%', height: '100%' }}
        />
      </Page>
    </Document>
  );
};
