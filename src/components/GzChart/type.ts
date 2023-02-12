import { ECBasicOption } from "echarts/types/dist/shared";
export type charConfig = {
  title?: string;
  description?: string;
  extra?: {
    close?: boolean;
    collapse?: boolean;
    zoom?: boolean;
  };
  chartStyle?: {
    width?: string;
    height?: string;
  };
  chartOption: ECBasicOption;
};
