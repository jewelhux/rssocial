import { format } from 'date-fns';
import ru from 'date-fns/locale/ru';

const partText = (text: string) => {
  const first = text.slice(0, 5);
  const second = text.slice(-7);

  return `${first}...${second}`;
};

const CURRENT_DATE = format(new Date(), 'PPP', { locale: ru });
const CURRENT_TIME = format(new Date(), 'p', { locale: ru });

export { partText, CURRENT_DATE, CURRENT_TIME };
