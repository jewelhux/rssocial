import { format } from 'date-fns';
import { ru, enUS } from 'date-fns/locale';

const partText = (text: string) => {
  const first = text.slice(0, 5);
  const second = text.slice(-7);

  return `${first}...${second}`;
};

const formatDate = (date: Date, lang: string) => {
  const locale = lang === 'en' ? enUS : ru;
  const at = lang === 'en' ? ' at ' : ' в ';
  return format(date, 'PPP', { locale }) + at + format(new Date(), 'p', { locale });
};

export { partText, formatDate };
