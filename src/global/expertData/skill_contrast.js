export default {
  params: [
    {
      level: "了解",
      self_count: 341,
      eva_count: 279,
    },
    {
      level: "熟悉",
      self_count: 186,
      eva_count: 217,
    },
    {
      level: "掌握",
      self_count: 155,
      eva_count: 186,
    },
    {
      level: "精通",
      self_count: 93,
      eva_count: 93,
    },
    {
      level: "专家",
      self_count: 31,
      eva_count: 31,
    },
  ],
  config: {
    xAxis: { name: "", type: "value", inverse: false, field_name: "level" },
    yAxis: { name: "测评次数" },
    height: 500,
    series: [
      { name: "自评", stack: false, field_name: "self_count" },
      { name: "测评", stack: false, field_name: "eva_count" },
    ],
    showGrid: true,
    showZoom: false,
    typeName: "柱状图",
    widthNum: 6,
    showLegend: true,
    showTooltip: true,
  },
};
