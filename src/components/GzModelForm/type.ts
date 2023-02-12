import { VNode } from "vue";
import { formConfigType } from "@components/GzForm/type";
import { i18n_t } from "@utils/type";
type modelFormConfig = {
  formConfig: formConfigType;
  formHeader?: (t: i18n_t) => VNode;
  dialogConfg?: {
    title?: string;
    okBtnText?: string;
    cancelBtnText?: string;
  };
  service: (...args: any) => Promise<any>;
  onServiceFullfilled?: (result: any, t: i18n_t) => any;
  onServiceRejected?: (result: any, t: i18n_t) => any;
};
export default modelFormConfig;
