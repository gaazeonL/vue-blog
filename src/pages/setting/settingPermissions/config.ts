import { h } from "vue";
import { ElLink, ElNotification, ElSpace, ElTag } from "element-plus";
import getTagColor from "@utils/getTagColor";

import { curdConfigType } from "@components/GzCurdPage/type";
import {
  getPermissionsData,
  createPermission,
  deletePermission,
  editPermission,
  getPermissionCount,
} from "@service/setting/permissions";

const getCurdConfig: (curdPageRef: any) => curdConfigType<{
  id: number;
  type: number;
  key: string;
  label: string | null;
  component: string | null;
  icon: string | null;
  vue_icon: string | null;
  parent: number | null;
  url: number | null;
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
          key: "permission_id",
          label: t(
            "pages.setting.permissions.selectForm.items.permission_id.label"
          ),
        },
        {
          type: "Input",
          key: "type",
          label: t(
            "pages.setting.permissions.createModelConfig.items.type.label"
          ),
          // placeholder: t(
          //   "pages.setting.users.createModelConfig.items.user_name.placeholder"
          // ),
        },
        {
          type: "Input",
          key: "key",
          label: t(
            "pages.setting.permissions.createModelConfig.items.key.label"
          ),
          // placeholder: t(
          //   "pages.setting.users.createModelConfig.items.password.placeholder"
          // ),
        },
        {
          type: "Input",
          key: "icon",
          label: t(
            "pages.setting.permissions.createModelConfig.items.icon.label"
          ),
        },
        {
          type: "Input",
          key: "vue_icon",
          label: t(
            "pages.setting.permissions.createModelConfig.items.vue_icon.label"
          ),
        },
        {
          type: "Input",
          key: "url",
          label: t(
            "pages.setting.permissions.createModelConfig.items.url.label"
          ),
        },
        {
          type: "Input",
          key: "label",
          label: t(
            "pages.setting.permissions.createModelConfig.items.label.label"
          ),
        },
        {
          type: "Input",
          key: "component",
          label: t(
            "pages.setting.permissions.createModelConfig.items.component.label"
          ),
        },
        {
          type: "Input",
          key: "parent",
          label: t(
            "pages.setting.permissions.createModelConfig.items.parent.label"
          ),
        },
      ],
      selectBtn: {
        title: "pages.setting.permissions.selectForm.selectBtn",
      },
    },
    tableConfig: {
      name: "pages.setting.permissions.table.name",
      selectService: getPermissionsData,
      countService: getPermissionCount,
      tableHeadControl: {
        create: {
          title: "pages.setting.permissions.table.tableHeadControl.createBtn",
          onClick: () => {
            const ref: any = curdPageRef.value?.createFormModalRef;
            ref[0].handleOpen();
          },
        },
        batchDeletion: {
          title:
            "pages.setting.permissions.table.tableHeadControl.batchDeletionBtn",
          onClick: () => {
            const ref: any = curdPageRef.value?.batchDeletionFormModalRef;
            const permission_ids: any[] = [];
            curdPageRef.value?.multipleSelection.forEach((item: any) => {
              permission_ids.push(item.id);
            });
            ref[0].handleOpen({
              permission_ids,
            });
          },
        },
      },
      columns: (t) => {
        return [
          {
            title: t(
              "pages.setting.permissions.table.columns.permission_id.title"
            ),
            dataIndex: "id",
            key: "id",
          },
          {
            title: t("pages.setting.permissions.table.columns.type.title"),
            key: "type",
            render(_, record) {
              return h(
                ElTag,
                {
                  color: getTagColor(record.type, [
                    "#ff85c0",
                    "#95de64",
                    "#69b1ff",
                    "#ffc53d",
                    "#36cfc9",
                  ]),
                },
                {
                  default() {
                    return h(
                      "span",
                      { style: { color: "white" } },
                      record.type
                    );
                  },
                }
              );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.key.title"),
            key: "key",
            render(_, record) {
              return h(
                ElTag,
                {
                  color: "#108ee9",
                },
                {
                  default() {
                    return h("span", { style: { color: "white" } }, record.key);
                  },
                }
              );
            },
            width: 180,
          },
          {
            title: t("pages.setting.permissions.table.columns.icon.title"),
            key: "icon",
            render(_, record) {
              return record.icon
                ? h(
                    ElTag,
                    {
                      color: "#3b5999",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "white" } },
                          record.icon?.toString()
                        );
                      },
                    }
                  )
                : h(
                    ElTag,
                    {
                      color: "whitesmoke",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "black" } },
                          JSON.stringify(record.icon)
                        );
                      },
                    }
                  );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.vue_icon.title"),
            key: "vue_icon",
            render(_, record) {
              return record.icon
                ? h(
                    ElTag,
                    {
                      color: "#3b5999",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "white" } },
                          record.vue_icon?.toString()
                        );
                      },
                    }
                  )
                : h(
                    ElTag,
                    {
                      color: "whitesmoke",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "black" } },
                          JSON.stringify(record.vue_icon)
                        );
                      },
                    }
                  );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.url.title"),
            key: "url",
            render(_, record) {
              return record.url
                ? h(
                    ElTag,
                    {
                      color: "#55acee",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "white" } },
                          record.url?.toString()
                        );
                      },
                    }
                  )
                : h(
                    ElTag,
                    {
                      color: "whitesmoke",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "black" } },
                          JSON.stringify(record.url)
                        );
                      },
                    }
                  );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.label.title"),
            key: "label",
            render(_, record) {
              return record.label
                ? h(
                    ElTag,
                    {
                      color: "#38ce74",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "white" } },
                          record.label?.toString()
                        );
                      },
                    }
                  )
                : h(
                    ElTag,
                    {
                      color: "whitesmoke",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "black" } },
                          JSON.stringify(record.label)
                        );
                      },
                    }
                  );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.component.title"),
            key: "component",
            render(_, record) {
              return record.component
                ? h(
                    ElTag,
                    {
                      color: "#7e38ce",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "white" } },
                          record.component?.toString()
                        );
                      },
                    }
                  )
                : h(
                    ElTag,
                    {
                      color: "whitesmoke",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "black" } },
                          JSON.stringify(record.component)
                        );
                      },
                    }
                  );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.parent.title"),
            key: "parent",
            render(_, record) {
              return record.parent || record.parent === 0
                ? h(
                    ElTag,
                    {
                      color: getTagColor(record.parent),
                    },
                    {
                      default() {
                        return h(
                          "span",
                          {
                            style: {
                              color: getTagColor(Number(record.parent), [
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
                          record.parent?.toString()
                        );
                      },
                    }
                  )
                : h(
                    ElTag,
                    {
                      color: "whitesmoke",
                    },
                    {
                      default() {
                        return h(
                          "span",
                          { style: { color: "black" } },
                          JSON.stringify(record.parent)
                        );
                      },
                    }
                  );
            },
          },
          {
            title: t("pages.setting.permissions.table.columns.action.title"),
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
                                id: record.id,
                              },
                              {
                                type: record.type,
                                key: record.key,
                                icon: record.icon,
                                vue_icon: record.vue_icon,
                                url: record.url,
                                label: record.label,
                                component: record.component,
                                parent: record.parent,
                              }
                            );
                          },
                        },
                        {
                          default: () =>
                            t(
                              "pages.setting.permissions.table.columns.action.render.edit"
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
                              permission_ids: [record.id],
                            });
                          },
                        },
                        {
                          default: () =>
                            t(
                              "pages.setting.permissions.table.columns.action.render.delete"
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
        // dialogConfg: {
        //   title: "pages.setting.users.createModelConfig.dialogConfg.title",
        // },
        service: createPermission,
        formConfig: {
          items: (t) => [
            {
              type: "Input",
              key: "type",
              label: t(
                "pages.setting.permissions.createModelConfig.items.type.label"
              ),
              // placeholder: t(
              //   "pages.setting.users.createModelConfig.items.user_name.placeholder"
              // ),
              rules: [
                {
                  required: true,
                  message: "",
                },
              ],
            },
            {
              type: "Input",
              key: "key",
              label: t(
                "pages.setting.permissions.createModelConfig.items.key.label"
              ),
              // placeholder: t(
              //   "pages.setting.users.createModelConfig.items.password.placeholder"
              // ),
              rules: [
                {
                  required: true,
                  message: "",
                },
              ],
            },
            {
              type: "Input",
              key: "icon",
              label: t(
                "pages.setting.permissions.createModelConfig.items.icon.label"
              ),
            },
            {
              type: "Input",
              key: "vue_icon",
              label: t(
                "pages.setting.permissions.createModelConfig.items.vue_icon.label"
              ),
            },
            {
              type: "Input",
              key: "url",
              label: t(
                "pages.setting.permissions.createModelConfig.items.url.label"
              ),
            },
            {
              type: "Input",
              key: "label",
              label: t(
                "pages.setting.permissions.createModelConfig.items.label.label"
              ),
            },
            {
              type: "Input",
              key: "component",
              label: t(
                "pages.setting.permissions.createModelConfig.items.component.label"
              ),
            },
            {
              type: "Input",
              key: "parent",
              label: t(
                "pages.setting.permissions.createModelConfig.items.parent.label"
              ),
            },
          ],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
          ElNotification({
            message: t(
              "pages.setting.permissions.createModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
      batchDeletionModelConfig: {
        // dialogConfg: {
        //   title:
        //     "pages.setting.users.batchDeletionModelConfig.dialogConfg.title",
        // },
        service: deletePermission,
        formHeader: (t) => {
          return h(
            "h2",
            {},
            t("pages.setting.permissions.batchDeletionModelConfig.formHeader")
          );
        },
        formConfig: {
          items: (t) => [],
        },
        onServiceFullfilled(_, t) {
          const ref: any = curdPageRef.value;
          ref.flushTable();
          ref.multipleSelection = [];
          ElNotification({
            message: t(
              "pages.setting.permissions.batchDeletionModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
      deleteModelConfig: {
        service: deletePermission,
        formHeader: (t) => {
          return h(
            "h2",
            {},
            t("pages.setting.permissions.deleteModelConfig.formHeader")
          );
        },
        formConfig: {
          items: (t) => [],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
          ElNotification({
            message: t(
              "pages.setting.permissions.deleteModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
      editModelConfig: {
        service: editPermission,
        formConfig: {
          items: (t) => [
            {
              type: "Input",
              key: "type",
              label: t(
                "pages.setting.permissions.createModelConfig.items.type.label"
              ),
              // placeholder: t(
              //   "pages.setting.users.createModelConfig.items.user_name.placeholder"
              // ),
              rules: [
                {
                  required: true,
                  message: "",
                },
              ],
            },
            {
              type: "Input",
              key: "key",
              label: t(
                "pages.setting.permissions.createModelConfig.items.key.label"
              ),
              // placeholder: t(
              //   "pages.setting.users.createModelConfig.items.password.placeholder"
              // ),
              rules: [
                {
                  required: true,
                  message: "",
                },
              ],
            },
            {
              type: "Input",
              key: "icon",
              label: t(
                "pages.setting.permissions.createModelConfig.items.icon.label"
              ),
            },
            {
              type: "Input",
              key: "vue_icon",
              label: t(
                "pages.setting.permissions.createModelConfig.items.vue_icon.label"
              ),
            },
            {
              type: "Input",
              key: "url",
              label: t(
                "pages.setting.permissions.createModelConfig.items.url.label"
              ),
            },
            {
              type: "Input",
              key: "label",
              label: t(
                "pages.setting.permissions.createModelConfig.items.label.label"
              ),
            },
            {
              type: "Input",
              key: "component",
              label: t(
                "pages.setting.permissions.createModelConfig.items.component.label"
              ),
            },
            {
              type: "Input",
              key: "parent",
              label: t(
                "pages.setting.permissions.createModelConfig.items.parent.label"
              ),
            },
          ],
        },
        onServiceFullfilled(_, t) {
          curdPageRef.value?.flushTable();
          ElNotification({
            message: t(
              "pages.setting.permissions.editModelConfig.onServiceFullfilled.message"
            ),
            type: "success",
          });
        },
      },
    },
  };
};
export default getCurdConfig;
