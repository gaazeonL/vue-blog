import { CSSProperties, DefineComponent, StyleValue } from "vue";
import { InputAutoSize, FormItemRule } from "element-plus";
import { i18n_t } from "@utils/type";
interface gzFormItemRule extends FormItemRule {
  regular?: RegExp;
}

type selectValues = {
  value: any;
  title?: string | undefined;
  children?: selectValues | undefined;
}[];

export type formConfigItem = {
  type:
    | "Input"
    | "Password"
    | "TextArea"
    | "Checkbox"
    | "Radio"
    | "Select"
    | "DatePicker";
  key: string;
  label?: string;
  size?: "" | "default" | "small" | "large";
  prefix?: DefineComponent;
  suffix?: DefineComponent;
  rules?: gzFormItemRule[];
  placeholder?: string;
  inputOption?: {
    maxlength?: number;
    rows?: number;
    autosize?: InputAutoSize;
    showWordLimit?: boolean;
  };
  selectOption?: {
    multiple?: boolean;
    values?: selectValues;
    asyncValue?: (token: string) => Promise<{ label: any; value: any }[]>;
  };
  checkBoxValues?: { value: any; title?: string }[] | string | boolean;
  radioValues?: { value: any; title?: string }[];
};

export type formConfigType = {
  labelPosition?: "left" | "right" | "top";
  size?: "" | "default" | "small" | "large";
  style?:CSSProperties
  formItemStyle?: unknown;
  items: (t: i18n_t) => formConfigItem[];
};
