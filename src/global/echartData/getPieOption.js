export default (params, config) => {
  let pieData = config.series.map((item) => {
    return {
      name: item.name ? item.name : item.field_name,
      value: params[0][item.field_name],
    };
  });
  const total = pieData.reduce(function (pre, cur) {
    return pre + cur.value;
  }, 0);
  return {
    tooltip: {
      show: config.showTooltip ?? true,
      trigger: "item",
      backgroundColor: "rgba(50, 50, 50, 0.7)",
      borderColor: "rgba(51, 51, 51, 1)",
      borderWidth: 0,
      padding: [5, 5, 5, 5],
      textStyle: {
        color: "rgba(255, 255, 255, 1)",
      },
      formatter: (formatterParams) => {
        return `<div>
      <div style="font-size: 14px; font-weight: 600">${
        formatterParams.marker
      }${formatterParams.name}</div>
      <div style="font-size: 14px; margin: 6px"
      >占比：${((formatterParams.value * 100) / total).toFixed(2)}%</div>
      <div style="font-size: 14px; margin: 6px">数值： ${formatterParams.value.toLocaleString()}</div>
    </div>`;
      },
    },
    legend: {
      show: config.showLegend,
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
    series: [
      {
        type: "pie",
        radius: [config.radius[0] + "%", config.radius[1] + "%"],
        roseType: config.roseType,
        data: pieData,
        label: { show: config.showLabel },
      },
    ],
  };
};