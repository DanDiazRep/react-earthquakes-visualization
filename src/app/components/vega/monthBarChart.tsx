import { useEffect, useState } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

import { MonthBarChartProps } from "../../types/types";

const MonthBarChart = ({ earthquakeData }: MonthBarChartProps) => {
  const defaultSpec = {
    width: 500,
    height: 300,
    data: { values: earthquakeData },
    mark: "bar",
    encoding: {
      y: {
        field: "month",
        type: "nominal",
        axis: {
          title: "Month",
          labelExpr:
            "['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][datum.value]",
        },
      },
      x: {
        aggregate: "count",
        type: "quantitative",
        axis: { title: "Number of earthquakes" },
      },
      tooltip: [{ aggregate: "count", title: "Number of earthquakes" }],
    },
  } as VisualizationSpec;

  const [chartSpec, setChartSpec] = useState(defaultSpec);

  useEffect(() => {
    const updatedChartSpec = {
      width: 500,
      height: 300,
      data: { values: earthquakeData },
      mark: "bar",
      encoding: {
        y: {
          field: "month",
          type: "nominal",
          axis: {
            title: "Months",
            labelExpr:
              "['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][datum.value]",
          },
        },
        x: {
          aggregate: "count",
          type: "quantitative",
          axis: { title: "Number of earthquakes" },
        },
        tooltip: [{ aggregate: "count", title: "Number of earthquakes" }],
      },
    } as VisualizationSpec;

    setChartSpec(updatedChartSpec);
  }, [earthquakeData]);
  return <VegaLite spec={chartSpec} />;
};

export default MonthBarChart;
