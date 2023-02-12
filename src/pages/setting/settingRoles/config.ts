import { h } from "vue";
import { ElLink, ElSpace, ElTag, ElNotification } from "element-plus";
import getTagColor from "@utils/getTagColor";
import {
  createRole,
  deleteRole,
  editRole,
  getRolesData,
  getRolesCount,
} from "@service/setting/roles";
import { getPermissionsData } from "@service/setting/permissions";

import { curdConfigType } from "@components/GzCurdPage/type";

const getCurdConfig: (curdPageRef: any) => curdConfigType<{
  id: number;
  role_name: string;
  permissions: { permission_id: number; key: string }[];
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
          key: "role_id",
          label: t("pages.setting.roles.selectForm.items.role_id.label"),
        },
        {
          type: "Input",
          key: "role_name",
          label: t("pages.setting.roles.selectForm.items.role_name.label"),
        },
        {
          type: "Select",
          key: "permission_ids",
          label: t("pages.setting.roles.selectForm.items.permission_ids.label"),
          selectOption: {
            multiple: true,
            asyncValue: async (token: string) => {
              const result: {
                label: any;
                value: any;
              }[] = [];
              const permissionsData = (await getPermissionsData({ token }))
                .message;
              permissionsData.forEach((data) => {
                result.push({
                  label: data.id,
                  value: data.id,
                });
              });
              return result;
            },
          },
        },
        {
          type: "Select",
          key: "permission_keys",
          label: t(
            "pages.setting.roles.selectForm.items.permission_keys.label"
          ),
          selectOption: {
            multiple: true,
            asyncValue: async (token: string) => {
              const result: {
                label: any;
                value: any;
              }[] = [];
              const permissionsData = (await getPermissionsData({ token }))
                .message;
              permissionsData.forEach((data) => {
                result.push({
                  label: data.key,
                  value: data.key,
                });
              });
              return result;
            },
          },
        },
      ],
      selectBtn: {
        title: "pages.setting.roles.selectForm.selectBtn",
      },
    },
    tableConfig: {
      name: "pages.setting.roles.table.name",
      selectService: getRolesData,
      countService: getRolesCount,
      tableHeadControl: {
        create: {
          title: "pages.setting.roles.table.tableHeadControl.createBtn",
          onClick: () => {
            const ref: any = curdPageRef.value?.createFormModalRef;
            ref[0].handleOpen();
          },
        },
      },
      columns: (t) => {
        return [
          {
            title: t("pages.setting.roles.table.columns.role_id.title"),
            dataIndex: "id",
            key: "id",
          },
          {
            title: t("pages.setting.roles.table.columns.role_name.title"),
            dataIndex: "role_name",
            key: "role_name",
          },
          {
            title: t("pages.setting.roles.table.columns.permissions_id.title"),
            key: "permissions_id",
            render(_: any, record, index: number) {
              return h(
                ElSpace,
                {},
                {
                  default() {
                    return record.permissions.map(
                      (permission: { key: string; permission_id: number }) => {
                        return h(
                          ElTag,
                          {
                            key: permission.permission_id,
                            color: getTagColor(permission.permission_id),
                          },
                          {
                            default() {
                              return h(
                                "span",
                                {
                                  style: {
                                    color: getTagColor(
                                      permission.permission_id,
                                      [
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
                                      ]
                                    ),
                                  },
                                },
                                permission.permission_id
                              );
                            },
                          }
                        );
                      }
                    );
                  },
                }
              );
            },
          },
          {
            title: t(
              "pages.setting.roles.table.columns.permissions_name.title"
            ),
            key: "permissions_name",
            render(_: any, record, index: number) {
              return h(
                ElSpace,
                {},
                {
                  default() {
                    return record.permissions.map(
                      (permission: { key: string; permission_id: number }) => {
                        return h(
                          ElTag,
                          {
                            key: permission.permission_id,
                            color: getTagColor(permission.permission_id),
                          },
                          {
                            default() {
                              return h(
                                "span",
                                {
                                  style: {
                                    color: getTagColor(
                                      permission.permission_id,
                                      [
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
                                      ]
                                    ),
                                  },
                                },
                                permission.key
                              );
                            },
                          }
                        );
                      }
                    );
                  },
                }
              );
            },
          },
          {
            title: t("pages.setting.roles.table.columns.action.title"),
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
                                role_id: record.id,
                              },
                              {
                                role_name: record.role_name,
                                permission_ids: record.permissions.map(
                                  (permission: any) => {
                                    return permission.permission_id;
                                  }
                                ),
                              }
                            );
                          },
                        },
                        {
                          default: () =>
                            t(
                              "pages.setting.roles.table.columns.action.render.edit"
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
                              role_id: record.id,
                            });
                          },
                        },
                        {
                          default: () =>
                            t(
                              "pages.setting.roles.table.columns.action.render.delete"
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
      expandable: {
        expandedRowRender: (record, t) => {
          return h(
            "div",
            {
              style: {
                padding: "20px",
              },
            },
            [
              h(
                "h4",
                {},
                t("pages.setting.roles.table.columns.permissions_id.title")
              ),
              h(
                ElSpace,
                { wrap: true },
                {
                  default() {
                    return record.permissions.map((permission) =>
                      h(
                        ElTag,
                        { color: getTagColor(permission.permission_id) },
                        {
                          default() {
                            return h(
                              "span",
                              {
                                style: {
                                  color: getTagColor(permission.permission_id, [
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
                              permission.permission_id
                            );
                          },
                        }
                      )
                    );
                  },
                }
              ),
              h(
                "h4",
                {},
                t("pages.setting.roles.table.columns.permissions_name.title")
              ),
              h(
                ElSpace,
                { wrap: true },
                {
                  default() {
                    return record.permissions.map((permission) =>
                      h(
                        ElTag,
                        { color: getTagColor(permission.permission_id) },
                        {
                          default() {
                            return h(
                              "span",
                              {
                                style: {
                                  color: getTagColor(permission.permission_id, [
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
                              permission.key
                            );
                          },
                        }
                      )
                    );
                  },
                }
              ),
            ]
          );
        },
      },
      createModelConfig: {
        dialogConfg: {
          title: "pages.setting.users.createModelConfig.dialogConfg.title",
        },
        service: createRole,
        formConfig: {
          items: (t) => [
            {
              type: "Input",
              key: "role_name",
              label: t(
                "pages.setting.roles.createModelConfig.items.role_name.label"
              ),
              // placeholder: t(
              //   "pages.setting.users.createModelConfig.items.user_name.placeholder"
              // ),
              rules: [
                {
                  required: true,
                  message: t(
                    "pages.setting.roles.createModelConfig.items.role_name.rules.0.message"
                  ),
                },
              ],
            },
            {
              type: "Select",
              key: "permission_keys",
              label: t(
                "pages.setting.roles.createModelConfig.items.permission_keys.label"
              ),
              // placeholder: t(
              //   "pages.setting.users.createModelConfig.items.role_id.placeholder"
              // ),
              selectOption: {
                multiple: true,
                asyncValue: async (token: string) => {
                  const result: {
                    label: any;
                    value: any;
                  }[] = [];
                  const permissionsData = (await getPermissionsData({ token }))
                    .message;
                  permissionsData.forEach((data) => {
                    result.push({
                      label: data.id + "." + data.key,
                      value: data.key,
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
          ElNotification({
            message: t(
              "pages.setting.roles.createModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
      deleteModelConfig: {
        service: deleteRole,
        formHeader: (t) => {
          return h(
            "h2",
            {},
            t("pages.setting.roles.deleteModelConfig.formHeader")
          );
        },
        formConfig: {
          items: (t) => [],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
          ElNotification({
            message: t(
              "pages.setting.roles.deleteModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
      editModelConfig: {
        service: editRole,
        formConfig: {
          items: (t) => [
            {
              type: "Input",
              key: "role_name",
              label: t(
                "pages.setting.roles.editModelConfig.items.role_name.label"
              ),
            },
            {
              type: "Select",
              key: "permission_ids",
              label: t(
                "pages.setting.roles.editModelConfig.items.permission_ids.label"
              ),
              selectOption: {
                multiple: true,
                asyncValue: async (token) => {
                  const result: {
                    label: any;
                    value: any;
                  }[] = [];
                  const permissionsData = (await getPermissionsData({ token }))
                    .message;
                  permissionsData.forEach((data) => {
                    result.push({
                      label: data.id + "." + data.key,
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
          ElNotification({
            message: t(
              "pages.setting.roles.editModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
    },
  };
};
export default getCurdConfig;
