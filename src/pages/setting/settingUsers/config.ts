import { h } from "vue";
import { ElLink, ElSpace, ElTag } from "element-plus";
import {
  createUser,
  getUsersData,
  deleteUsers,
  deleteUser,
  editUser,
  getUsersCount,
} from "@service/setting/users";
import getTagColor from "@utils/getTagColor";
import { getRolesData } from "@service/setting/roles";
import { curdConfigType } from "@components/GzCurdPage/type";

const getCurdConfig: (curdPageRef: any) => curdConfigType<{
  id: number;
  role_id: number;
  avatar_url: string | null;
  role_name: string;
  user_name: string;
}> = (curdPageRef) => {
  return {
    formConfig: {
      size: "large",
      formItemStyle: {
        width: "80%",
      },
      items: (t) => [
        {
          type: "Input",
          key: "user_id",
          label: t("pages.setting.users.selectForm.items.user_id.label"),
        },
        {
          type: "Input",
          key: "user_name",
          label: t("pages.setting.users.selectForm.items.user_name.label"),
        },
        {
          type: "Select",
          key: "role_id",
          label: t("pages.setting.users.selectForm.items.role_id.label"),
          selectOption: {
            asyncValue: async (token) => {
              const result: {
                label: any;
                value: any;
              }[] = [];
              const rolesData = (await getRolesData({ token })).message;
              rolesData.forEach((data) => {
                result.push({
                  label: data.id + "." + data.role_name,
                  value: data.id,
                });
              });
              return result;
            },
          },
        },
      ],
      selectBtn: {
        title: "pages.setting.users.selectForm.selectBtn",
      },
    },
    tableConfig: {
      name: "pages.setting.users.table.name",
      selectService: getUsersData,
      countService: getUsersCount,
      tableHeadControl: {
        create: {
          title: "pages.setting.users.table.tableHeadControl.createBtn",
          onClick: () => {
            const ref: any = curdPageRef.value?.createFormModalRef;
            ref[0].handleOpen();
          },
        },
        batchDeletion: {
          title: "pages.setting.users.table.tableHeadControl.batchDeletionBtn",
          onClick: () => {
            const ref: any = curdPageRef.value?.batchDeletionFormModalRef;
            const user_ids: any[] = [];
            curdPageRef.value?.multipleSelection.forEach((item: any) => {
              user_ids.push(item.id);
            });
            ref[0].handleOpen({
              user_ids,
            });
          },
        },
      },
      columns: (t) => {
        return [
          {
            title: "ID",
            dataIndex: "id",
            key: "id",
          },
          {
            title: t("pages.setting.users.table.columns.user_name.title"),
            dataIndex: "user_name",
            key: "user_name",
          },
          {
            title: t("pages.setting.users.table.columns.avatar_url.title"),
            dataIndex: "avatar_url",
            key: "avatar_url",
            render(_: any, record, index: number) {
              if (record.avatar_url) {
                return record.avatar_url;
              } else {
                return h(
                  ElTag,
                  { color: "#108ee9" },
                  {
                    default: () =>
                      h(
                        "span",
                        { style: { color: "white" } },
                        t(
                          "pages.setting.users.table.columns.avatar_url.render.tips"
                        )
                      ),
                  }
                );
              }
            },
          },
          {
            title: t("pages.setting.users.table.columns.role_id.title"),
            dataIndex: "role_id",
            key: "role_id",
            render(_, record, index) {
              return h(
                ElTag,
                { color: getTagColor(record.role_id) },
                {
                  default: () => {
                    return h(
                      "span",
                      {
                        style: {
                          color: getTagColor(record.role_id, [
                            "#c41d7f",
                            "#389e0d",
                            "#531dab",
                            "#cf1322",
                            "#7cb305",
                            "#1d39c4",
                            "#d4380d",
                            "#08979c",
                            "#d48806",
                            "#0958d9",
                            "#d46b08",
                          ]),
                        },
                      },
                      record.role_id
                    );
                  },
                }
              );
            },
          },
          {
            title: t("pages.setting.users.table.columns.role_name.title"),
            dataIndex: "role_name",
            key: "role_name",
            render(_: any, record, index) {
              return h(
                ElTag,
                { color: getTagColor(record.role_id) },
                {
                  default: () => {
                    return h(
                      "span",
                      {
                        style: {
                          color: getTagColor(record.role_id, [
                            "#c41d7f",
                            "#389e0d",
                            "#531dab",
                            "#cf1322",
                            "#7cb305",
                            "#1d39c4",
                            "#d4380d",
                            "#08979c",
                            "#d48806",
                            "#0958d9",
                            "#d46b08",
                          ]),
                        },
                      },
                      record.role_name
                    );
                  },
                }
              );
            },
          },
          {
            title: t("pages.setting.users.table.columns.action.title"),
            key: "action",
            render(_: any, record, index: number) {
              return h(
                ElSpace,
                {},
                {
                  default: () => [
                    [
                      h(
                        ElLink,
                        {
                          type: "primary",
                          underline: false,
                          onClick() {
                            const ref: any =
                              curdPageRef.value?.editFormModalRef;
                            ref[0].handleOpen(
                              {
                                user_name: record.user_name,
                              },
                              {
                                role_id: record.role_id,
                              }
                            );
                          },
                        },
                        {
                          default: () =>
                            t(
                              "pages.setting.users.table.columns.action.render.edit"
                            ),
                        }
                      ),
                      h(
                        ElLink,
                        {
                          type: "primary",
                          underline: false,
                          onClick() {
                            const ref: any =
                              curdPageRef.value?.deleteFormModalRef;
                            ref[0].handleOpen({
                              user_name: record.user_name,
                            });
                          },
                        },
                        {
                          default: () =>
                            t(
                              "pages.setting.users.table.columns.action.render.delete"
                            ),
                        }
                      ),
                    ],
                  ],
                }
              );
            },
          },
        ];
      },
      createModelConfig: {
        dialogConfg: {
          title: "pages.setting.users.createModelConfig.dialogConfg.title",
        },
        service: createUser,
        formConfig: {
          items: (t) => [
            {
              type: "Input",
              key: "user_name",
              label: t(
                "pages.setting.users.createModelConfig.items.user_name.label"
              ),
              placeholder: t(
                "pages.setting.users.createModelConfig.items.user_name.placeholder"
              ),
              rules: [
                {
                  regular: /^[a-zA-Z0-9]{5,10}$/,
                  message: t(
                    "pages.setting.users.createModelConfig.items.user_name.rules.0.message"
                  ),
                },
                {
                  required: true,
                  message: "",
                },
              ],
            },
            {
              type: "Input",
              key: "password",
              label: t(
                "pages.setting.users.createModelConfig.items.password.label"
              ),
              placeholder: t(
                "pages.setting.users.createModelConfig.items.password.placeholder"
              ),
              rules: [
                {
                  regular: /^[a-zA-Z0-9]{6,12}$/,
                  message: t(
                    "pages.setting.users.createModelConfig.items.password.rules.0.message"
                  ),
                },
                {
                  required: true,
                  message: "",
                },
              ],
            },
            {
              type: "Select",
              key: "role_id",
              label: t(
                "pages.setting.users.createModelConfig.items.role_id.label"
              ),
              placeholder: t(
                "pages.setting.users.createModelConfig.items.role_id.placeholder"
              ),
              selectOption: {
                asyncValue: async (token: string) => {
                  const result: {
                    label: any;
                    value: any;
                  }[] = [];
                  const rolesData = (await getRolesData({ token })).message;
                  rolesData.forEach((data) => {
                    result.push({
                      label: data.id + "." + data.role_name,
                      value: data.id,
                    });
                  });
                  return result;
                },
              },
            },
          ],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
        },
      },
      batchDeletionModelConfig: {
        dialogConfg: {
          title:
            "pages.setting.users.batchDeletionModelConfig.dialogConfg.title",
        },
        service: deleteUsers,
        formHeader: (t) => {
          return h(
            "h2",
            {},
            t("pages.setting.users.batchDeletionModelConfig.formHeader")
          );
        },
        formConfig: {
          items: (t) => [],
        },
        onServiceFullfilled(_, t) {
          const ref: any = curdPageRef.value;
          ref.flushTable();
          ref.multipleSelection = [];
        },
      },
      deleteModelConfig: {
        service: deleteUser,
        formHeader: (t) => {
          return h(
            "h2",
            {},
            t("pages.setting.users.deleteModelConfig.formHeader")
          );
        },
        formConfig: {
          items: (t) => [],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
        },
      },
      editModelConfig: {
        service: editUser,
        formConfig: {
          items: (t) => [
            {
              type: "Input",
              key: "password",
              label: t(
                "pages.setting.users.editModelConfig.items.password.label"
              ),
            },
            {
              type: "Select",
              key: "role_id",
              label: t(
                "pages.setting.users.editModelConfig.items.role_id.label"
              ),
              selectOption: {
                asyncValue: async (token) => {
                  const result: {
                    label: any;
                    value: any;
                  }[] = [];
                  const rolesData = (await getRolesData({ token })).message;
                  rolesData.forEach((data) => {
                    result.push({
                      label: data.id + "." + data.role_name,
                      value: data.id,
                    });
                  });
                  return result;
                },
              },
            },
          ],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
        },
      },
    },
  };
};
export default getCurdConfig;
