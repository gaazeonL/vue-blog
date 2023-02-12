import { Ref } from "vue";
import { ElNotification } from "element-plus";
/**fetch的封装
 *
 * @param options 配置选项
 */
export default async function fetchService<
  T extends {
    code: number;
    message: any;
  }
>(options: {
  url: string;
  method?: string;
  headers?: HeadersInit;
  body?: BodyInit;
  loading?: Ref<boolean>;
  successMessage?: string;
  errorResult: T;
}) {
  // options.setLoading && options.setLoading(true);
  options.loading && (options.loading.value = true);
  try {
    const result: T = await (
      await fetch(options.url, {
        method: options.method ? options.method : "GET",
        headers: options.headers,
        body: options.body,
      })
    ).json();
    if (typeof result.message === "string") {
      // notification.error({
      //   message: "错误代码：" + result.code,
      //   description: result.message,
      // });
      ElNotification({
        title: "错误代码：" + result.code,
        message: result.message,
        type: "error",
      });
    } else if (result.message && typeof result.message !== "string") {
      options.successMessage &&
        // notification.success({
        //   message: options.successMessage,
        // });
        ElNotification({
          message: options.successMessage,
          type: "success",
        });
    }
    // options.setLoading && options.setLoading(false);
    options.loading && (options.loading.value = false);
    return result;
  } catch {
    // notification.error({
    //   message: "网络连接错误或服务器错误",
    // });
    ElNotification({
      message: "网络连接错误或服务器错误",
      type: "error",
    });
    // options.setLoading && options.setLoading(false);
    options.loading && (options.loading.value = false);
    return options.errorResult;
  }
}
