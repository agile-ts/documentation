import { ThemeInterface } from '../core/entities/ui/ui.interface';

declare module 'styled-components' {
  interface DefaultTheme extends ThemeInterface {}
}
