export default (params, config) => {
  return {
    tooltip: {
      show: config.showTooltip ?? true,
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      backgroundColor: "rgba(50, 50, 50, 0.7)",
      borderColor: "rgba(51, 51, 51, 1)",
      borderWidth: 0,
      padding: [5, 5, 5, 5],
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
      },
    },
    legend: {
      show: config.showLegend ?? true,
      type: "scroll",
      top: "auto",
      bottom: "auto",
      left: "center",
      right: "auto",
      width: "auto",
      height: "auto",
      orient: "horizontal",
      align: "auto",
      padding: [5, 5, 5, 5],
      itemGap: 25,
      itemWidth: 15,
      itemHeight: 15,
      icon: "circle",
    },
    dataZoom: [
      {
        show: config.showZoom ?? false,
        type: "slider",
        xAxisIndex: 0,
        filterMode: "filter",
      },
    ],
    grid: {
      show: config.showGrid ?? true,
      top: 75,
      bottom: 30,
      left: "6%",
      right: "10%",
      width: "auto",
      height: "auto",
      borderWidth: 1,
      containLabel: true,
    },
    xAxis: {
      show: true,
      type: "category",
      name: config.xAxis ? config.xAxis.name : "",
      nameLocation: "end",
      nameRotate: 0,
      inverse: config.xAxis ? config.xAxis.inverse : false,
      boundaryGap: true,
      axisLabel: {
        rotate: 30,
      },
      data: params.map((data) => {
        return data[config.xAxis.field_name] ?? "";
      }),
    },
    yAxis: {
      show: true,
      type: "value",
      name: config.yAxis ? config.yAxis.name : "",
      nameLocation: "end",
      nameGap: 15,
      nameRotate: 0,
      inverse: false,
    },
    series: config.series.map((serie) => {
      return {
        name: serie.name,
        stack: serie.stack ?? "",
        type: serie.type ?? "bar",
        data: params.map((data) => {
          return data[serie.field_name];
        }),
      };
    }),
    // toolbox: {
    //   right: 10,
    //   feature: {
    //     magicType: {
    //       type: ["line", "bar", "stack"],
    //     },
    //     dataZoom: {
    //       show: true,
    //     },
    //     restore: {
    //       show: true,
    //     },
    //     dataView: {},
    //     saveAsImage: {},
    //   },
    // },
  };
};