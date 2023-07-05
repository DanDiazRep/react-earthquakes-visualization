import { useEffect, useState } from "react";
import { VegaLite, VisualizationSpec } from "react-vega";

import { ContinentHeatmapProps } from "../../types/types";

const ContinentHeatmap = ({ earthquakeData }: ContinentHeatmapProps) => {
  const defaultSpec = {
    data: {
      values: earthquakeData.filter(
        (d) => d.continent !== "" && d.continent !== "Other"
      ),
    },
    mark: "rect",
    encoding: {
      x: { field: "year", type: "nominal", title: "Year" },
      y: { field: "continent", type: "nominal", title: "Continent" },
      color: {
        aggregate: "count",
        type: "quantitative",
        title: "Number of Earthquakes",
        scale: { domain: [0, 200] },
      },
      tooltip: [
        { field: "year", title: "Year" },
        { field: "continent", title: "Continent" },
        { aggregate: "count", title: "Count" },
      ],
    },
  } as VisualizationSpec;

  const [chartSpec, setChartSpec] = useState(defaultSpec);

  useEffect(() => {
    const updatedChartSpec = {
      data: {
        values: earthquakeData.filter(
          (d) => d.continent !== "" && d.continent !== "Other"
        ),
      },
      mark: "rect",
      encoding: {
        x: { field: "year", type: "nominal", title: "Year" },
        y: { field: "continent", type: "nominal", title: "Continent" },
        color: {
          aggregate: "count",
          type: "quantitative",
          title: "Number of Earthquakes",
          scale: { domain: [0, 200] },
        },
        tooltip: [
          { field: "year", title: "Year" },
          { field: "continent", title: "Continent" },
          { aggregate: "count", title: "Count" },
        ],
      },
    } as VisualizationSpec;

    setChartSpec(updatedChartSpec);
  }, [earthquakeData]);
  return <VegaLite spec={chartSpec} />;
};

export default ContinentHeatmap;
