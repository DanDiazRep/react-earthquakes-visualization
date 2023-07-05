import { useEffect, useState } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

import { MagDepthScatterProps } from "../../types/types";

const MagDepthScatter = ({ earthquakeData }: MagDepthScatterProps) => {
  const defaultSpec = {
    mark: "point",
    data: { values: earthquakeData },
    encoding: {
      x: {
        field: "magnitude",
        type: "quantitative",
        scale: { domain: [0, 11] },
        axis: { title: "Magnitude" },
      },
      y: {
        field: "depth",
        type: "quantitative",
        scale: { domain: [-2, 700] },
        axis: { title: "Depth" },
      },
    },
  } as VisualizationSpec;

  const [chartSpec, setChartSpec] = useState(defaultSpec);

  useEffect(() => {
    const updatedChartSpec = {
      width: 500,
      height: 300,
      mark: "point",
      data: { values: earthquakeData },
      encoding: {
        x: {
          field: "magnitude",
          type: "quantitative",
          scale: { domain: [0, 11] },
          axis: { title: "Magnitude" },
        },
        y: {
          field: "depth",
          type: "quantitative",
          scale: { domain: [-2, 700] },
          axis: { title: "Depth" },
        },
      },
    } as VisualizationSpec;

    setChartSpec(updatedChartSpec);
  }, [earthquakeData]);
  return <VegaLite spec={chartSpec} />;
};

export default MagDepthScatter;
