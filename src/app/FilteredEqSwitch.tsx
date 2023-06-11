import { useState } from "react";
import { FilteredEqSwitch } from "./types";
import ReactSwitch from "react-switch";

const FilteredEqSwitch = (props: FilteredEqSwitch) => {
  const [depthToggleChecked, setDepthToggleChecked] = useState(true);

  const handleToggleChange = (nextChecked) => {
    setDepthToggleChecked(nextChecked);
    if (nextChecked === true) {
      // depth
      props.onChange("enabled");
    } else {
      // magnitude
      props.onChange("disabled");
    }
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          marginLeft: 30,
          marginTop: 5,
        }}
      >
        <p>Show filtered earthquakes: </p>
        <div style={{ width: 20 }}></div>

        <ReactSwitch
          checked={depthToggleChecked}
          onChange={handleToggleChange}
          uncheckedIcon={false}
          checkedIcon={false}
        />
      </div>
    </div>
  );
};

export default FilteredEqSwitch;
