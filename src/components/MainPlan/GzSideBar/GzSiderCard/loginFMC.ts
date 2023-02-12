import { Store } from "vuex";
import { formConfigType } from "@components/GzForm/type";
import { loginService } from "@service/login";
import modelFormConfig from "@components/GzModelForm/type";
import { i18n_t } from "@utils/type";
const getConfig = (store: Store<any>, t: i18n_t) => {
  const formConfig: formConfigType = {
    style:{minWidth:"375px"},
    size: "large",
    labelPosition: "right",
    items: (t) => [
      {
        type: "Input",
        key: "userName",
        label: t("sider.loginModelForm.items.userName.label"),
        placeholder: t("sider.loginModelForm.items.userName.placeholder"),
        rules: [
          {
            required: true,
            message: t("sider.loginModelForm.items.userName.rules.0"),
            trigger: "blur",
          },
          {
            regular: /^[a-zA-Z0-9]{5,10}$/,
            message: t("sider.loginModelForm.items.userName.rules.1"),
            trigger: "blur",
          },
        ],
        inputOption: {
          maxlength: 30,
        },
      },
      {
        type: "Password",
        key: "password",
        label: t("sider.loginModelForm.items.password.label"),
        placeholder: t("sider.loginModelForm.items.password.placeholder"),
        rules: [
          {
            required: true,
            message: t("sider.loginModelForm.items.password.rules.0"),
            trigger: "blur",
          },
          {
            regular: /^[a-zA-Z0-9]{6,12}$/,
            message: t("sider.loginModelForm.items.password.rules.1"),
            trigger: "blur",
          },
        ],
      },
    ],
  };
  const onServiceFullfilled = (result: any) => {
    store.commit("modelSystem/changeToken", "Bearer " + result.message.token);
  };
  const config: modelFormConfig = {
    dialogConfg: {
      title: "sider.loginModelForm.title",
      okBtnText: "sider.loginModelForm.okBtnText",
    },
    formConfig,
    service: loginService,
    onServiceFullfilled,
  };
  return config;
};

export default getConfig;
