
import { Translations } from '@/types/language';
import { headerTranslations } from './translations/header';
import { alertTranslations } from './translations/alerts';
import { textInputTranslations } from './translations/textInput';
import { foundCharactersTranslations } from './translations/foundCharacters';
import { actionTranslations } from './translations/actions';
import { infoDialogTranslations } from './translations/infoDialog';
import { aboutTranslations } from './translations/about';
import { impressumTranslations } from './translations/impressum';
import { toastTranslations } from './translations/toast';
import { cookieTranslations } from './translations/cookies';
import { languageTranslations } from './translations/language';
import { promotionalTranslations } from './translations/promotional';

// Translations for all texts in the application
export const translations: Translations = {
  ...headerTranslations,
  ...alertTranslations,
  ...textInputTranslations,
  ...foundCharactersTranslations,
  ...actionTranslations,
  ...infoDialogTranslations,
  ...aboutTranslations,
  ...impressumTranslations,
  ...toastTranslations,
  ...cookieTranslations,
  ...languageTranslations,
  ...promotionalTranslations,
};
