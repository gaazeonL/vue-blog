import { charConfig } from "@components/GzChart/type";
import { i18n_t } from "@utils/type";
export function getTreeChartConfig(t: i18n_t, data: any) {
  const config: charConfig = {
    title: t("pages.aboutMe.personal_TS_overview.TS_Diagram.title"),
    description: t("pages.aboutMe.personal_TS_overview.TS_Diagram.title"),
    extra: {
      collapse: true,
      close: true,
    },
    chartStyle: {
      width: "800px",
      height: "450px",
    },
    chartOption: {
      tooltip: {},
      series: [
        {
          type: "tree",
          data: [data],
          left: "10%",
          symbolSize: 10,
          label: {
            position: "left",
            verticalAlign: "middle",
            align: "right",
            fontSize: 10,
          },
          leaves: {
            label: {
              position: "right",
              verticalAlign: "middle",
              align: "left",
            },
          },
          emphasis: {
            focus: "descendant",
          },
          expandAndCollapse: true,
          animationDuration: 550,
          animationDurationUpdate: 750,
        },
      ],
    },
  };
  return config;
}
export const getBaseChartConfig = function (t: i18n_t, data: any) {
  const baseData = data.children?.find((item: any) => {
    return item.name === "base";
  });
  const config: charConfig = {
    title: t("pages.aboutMe.personal_TS_details.basicTechnologyDiagram.title"),
    description: t(
      "pages.aboutMe.personal_TS_details.basicTechnologyDiagram.description"
    ),
    chartOption: baseData
      ? {
          tooltip: {},
          xAxis: {
            type: "category",
            data: baseData.children?.map((item: any) => {
              return item.name;
            }),
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              data: baseData.children?.map((item: any) => {
                return item.value;
              }),
              type: "bar",
            },
          ],
        }
      : {
          chartOption: {},
        },
  };
  return config;
};

export const getExpandChartConfig = function (t: i18n_t, data: any) {
  const expandData = data.children?.find((item: any) => {
    return item.name === "expand";
  });
  const config: charConfig = {
    title: t(
      "pages.aboutMe.personal_TS_details.advancedTechnologyDiagram.title"
    ),
    description: t(
      "pages.aboutMe.personal_TS_details.advancedTechnologyDiagram.description"
    ),
    chartOption: expandData
      ? {
          tooltip: {},
          legend: {
            bottom: "5%",
          },
          series: [
            {
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 30,
                  fontWeight: "bold",
                },
              },
              data: expandData.children,
            },
          ],
        }
      : {
          chartOption: {},
        },
  };
  return config;
};
export const getVueChartConfig = function (t: i18n_t, data: any) {
  const vueData = data.children?.find((item: any) => {
    return item.name === "vue";
  });
  const config: charConfig = {
    title: t("pages.aboutMe.personal_TS_details.vueTechnologyDiagram.title"),
    description: t(
      "pages.aboutMe.personal_TS_details.vueTechnologyDiagram.description"
    ),
    chartOption: vueData
      ? {
          legend: {
            bottom: "5%",
          },
          series: [
            {
              type: "pie",
              radius: ["10%", "50%"],
              center: ["50%", "50%"],
              roseType: "area",
              itemStyle: {
                borderRadius: 8,
              },
              data: vueData.children,
            },
          ],
        }
      : {
          chartOption: {},
        },
  };
  return config;
};
export const getReactChartConfig = function (t: i18n_t, data: any) {
  const reactData = data.children?.find((item: any) => {
    return item.name === "react";
  });
  const config: charConfig = {
    title: t("pages.aboutMe.personal_TS_details.vueTechnologyDiagram.title"),
    description: t(
      "pages.aboutMe.personal_TS_details.vueTechnologyDiagram.description"
    ),
    chartOption: reactData
      ? {
          polar: {
            radius: [30, "80%"],
          },
          angleAxis: {
            max: 100,
            startAngle: 75,
          },
          radiusAxis: {
            type: "category",
            data: reactData.children?.map((item:any) => {
              return item.name;
            }),
          },
          tooltip: {},
          series: {
            type: "bar",
            data: reactData.children,
            coordinateSystem: "polar",
            label: {
              show: true,
              position: "middle",
              formatter: "{b}: {c}",
            },
          },
        }
      : {
          chartOption: {},
        },
  };
  return config;
};
