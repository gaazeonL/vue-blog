import { Ref } from "vue";
import fetchService from "@utils/fetchService";
export const loginService = async (options: {
  userName: string;
  password: string;
  loading?:Ref<boolean>
}) => {
  return await fetchService({
    url: import.meta.env.VITE_SERVER + "/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_name: options.userName,
      password: options.password,
    }),
    loading:options.loading,
    successMessage: "登录成功",
    errorResult: {
      code: -1,
      message: {
        avatar_url: null,
        role_id: -1,
        role_name: "",
        token: "",
        user_id: -1,
        user_name: "",
      },
    },
  });
};
