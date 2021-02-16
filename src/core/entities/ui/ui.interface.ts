export type ThemeTypes = "dark" | "light";

export interface ThemeInterface {
  // Background
  background: string;
  on_background: string;
  on_background_2: string;
  on_background_3: string;

  // Surface
  surface: string;
  on_surface: string;
  on_surface_2: string;
  on_surface_3: string;

  // Success
  success: string;
  on_success: string;

  // Error
  error: string;
  on_error: string;
}
