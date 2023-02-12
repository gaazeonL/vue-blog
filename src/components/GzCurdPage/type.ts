import { VNode } from "vue";
import { formConfigType } from "@components/GzForm/type";
import modelFormConfig from "@components/GzModelForm/type";
import { i18n_t } from "@utils/type";
export type curdConfigType<Record = any> = {
  formConfig: { selectBtn?: { title: string } } & formConfigType;
  tableConfig: {
    [X: string]: any;
    name: string;
    selectService: (...args: any) => Promise<any>;
    countService: (...args: any) => Promise<any>;
    columns: (t: i18n_t) => {
      title: string;
      key: string;
      dataIndex?: string;
      render?: (result: any, record: Record, index: number) => VNode | string;
    }[];
    expandable?: {
      expandedRowRender: (record: Record, t: i18n_t) => VNode;
    };
    tableHeadControl?: {
      create?: {
        title?: string;
        onClick?: (...args: any) => any;
      };
      batchDeletion?: {
        title?: string;
        onClick?: (...args: any) => any;
      };
    };
    createModelConfig?: modelFormConfig;
    batchDeletionModelConfig?: modelFormConfig;
    deleteModelConfig?: modelFormConfig;
    editModelConfig?: modelFormConfig;
  };
};
