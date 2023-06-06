import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { onMount, Component } from "solid-js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

const PieChart: Component<{ name: string, data: any[] }> = (props) => {
  const tag = props.name;
  const chart_data = props.data;

  onMount(() => {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create(tag, am4charts.PieChart);

    chart.data = chart_data;

    var pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "amount";
    pieSeries.dataFields.category = "name";
    pieSeries.innerRadius = am4core.percent(50);
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    var rgm = new am4core.LinearGradientModifier();
    rgm.brightnesses.push(0, -0.4);
    pieSeries.slices.template.fillModifier = rgm;

    var rgm2 = new am4core.LinearGradientModifier();
    rgm2.brightnesses.push(0, -0.4);

    pieSeries.slices.template.strokeModifier = rgm2;
    pieSeries.slices.template.strokeOpacity = 1;
    pieSeries.slices.template.strokeWidth = 1;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "bottom";
    pieSeries.labels.template.text = "{category}: {value.value}";
    pieSeries.slices.template.tooltipText = "{category}: {value.value}";
    chart.legend.valueLabels.template.text = "{value.value}";
  });

  return (
    <>
      <div id={tag} style={{ height: "500px", width: "100%" }}></div>
    </>
  );
};

export default PieChart;
