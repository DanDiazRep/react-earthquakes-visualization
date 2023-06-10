import { useEffect, useState } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

import { DepthHistogramProps } from "../types";

const DepthHistogram = ({ earthquakeData }: DepthHistogramProps) => {
  const defaultSpec = {
    width: 500,
    height: 300,
    data: { values: earthquakeData },
    mark: "bar",
    encoding: {
      x: {
        field: "depth",
        bin: true,
        type: "quantitative",
        axis: { title: "Depth" },
      },
      y: { aggregate: "count", type: "quantitative" },
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
        x: {
          field: "depth",
          bin: true,
          type: "quantitative",
          axis: { title: "Depth (binned)" },
        },
        y: { aggregate: "count", type: "quantitative" },
        tooltip: [{ aggregate: "count", title: "Number of earthquakes" }],
      },
    } as VisualizationSpec;

    setChartSpec(updatedChartSpec);
  }, [earthquakeData]);
  return <VegaLite spec={chartSpec} />;
};

export default DepthHistogram;
