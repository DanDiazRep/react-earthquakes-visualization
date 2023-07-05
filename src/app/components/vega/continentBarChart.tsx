import { useEffect, useState } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

import { ContinentBarChartProps } from "../../types/types";

const ContinentBarChart = ({ earthquakeData }: ContinentBarChartProps) => {
  const defaultSpec = {
    width: 500,
    height: 300,
    data: { values: earthquakeData },
    mark: "bar",
    encoding: {
      y: {
        field: "continent",
        type: "nominal",
        axis: { title: "Continent" },
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
          field: "continent",
          type: "nominal",
          axis: { title: "Continent" },
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

export default ContinentBarChart;
