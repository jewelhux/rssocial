import { useSnackbar } from 'notistack';
import type { VariantType, WithSnackbarProps } from 'notistack';
import i18n from '../../locales/i18cfg';

let useSnackbarRef: WithSnackbarProps;
export const SnackbarUtilsConfigurator: React.FC = () => {
  useSnackbarRef = useSnackbar();
  return null;
};

export const snack = {
  success(msg: string | string[]) {
    this.toast(msg, 'success');
  },
  warning(msg: string | string[]) {
    this.toast(msg, 'warning');
  },
  info(msg: string | string[]) {
    this.toast(msg, 'info');
  },
  error(msg: string | string[]) {
    this.toast(msg, 'error');
  },
  toast(data: string | string[], variant: VariantType = 'default') {
    const messages = typeof data === 'string' ? [data] : data;
    const translated = messages.map((msg) => (i18n.exists(msg) ? i18n.t(msg) : msg)).join(' ');
    useSnackbarRef.enqueueSnackbar(translated, { variant });
  }
};
