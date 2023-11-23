import { Theme } from '~generated/themes';

export function setTheme(theme: Theme) {
  document.documentElement.setAttribute('data-echoes-theme', theme);
}
