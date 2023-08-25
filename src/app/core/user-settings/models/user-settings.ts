export type UserSettings = {
  currentLanguage: string;
  intervalReLoadDashboard: number;
  lastLoadDashboard: string | null;

}
export const KEYS = ['CURRENT_LANGUAGE','LOAD_INTERVAL','LAST_LOAD'];
export const DEFAULT_LANGUAGE = 'br';
export const FORMAT_DATE = "DD/MM/YYYY HH:mm:ss";