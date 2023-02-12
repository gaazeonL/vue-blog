import { Language } from "element-plus/es/locale";
export type menuData = {
  id: number;
  type: number;
  key: string;
  vue_icon?: string | null;
  icon?: string | null;
  url?: string | null;
  label?: string | null;
  component?: string | null;
  children?: menuData[];
  parent?: number | null;
};

export type systemModuleState = {
  globalControl: {
    token: string;
    theme: boolean;
    isMoveMode: boolean;
    isShort: boolean;
    language: string | null;
    languagePack?: Language|null;
    keyPath: string[];
  };
  siderBarControl: {
    isCollapse: boolean;
  };
  menuControl: {
    width: number;
    height: number;
    data: menuData[];
  };
};
