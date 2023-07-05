import { useState } from "react";
import { MagnitudeDepthSwitchProps } from "../types/types";
import ReactSwitch from "react-switch";

const MagnitudeDepthSwitch = (props: MagnitudeDepthSwitchProps) => {
  const [depthToggleChecked, setDepthToggleChecked] = useState(false);

  const handleToggleChange = (nextChecked: boolean | ((prevState: boolean) => boolean)) => {
    setDepthToggleChecked(nextChecked);
    if (nextChecked === true) {
      // depth
      props.onChange("Depth");
    } else {
      // magnitude
      props.onChange("Magnitude");
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
          marginTop: 30,
        }}
      >
        <p>Choose what you want to visualize with the bubbles: </p>
        <div style={{ width: 20 }}></div>
        <p>Magnitude</p>
        <div style={{ width: 20 }}></div>
        <ReactSwitch
          checked={depthToggleChecked}
          onChange={handleToggleChange}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#808080"
          offColor="#808080"
        />
        <div style={{ width: 20 }}></div>
        <p>Depth</p>
      </div>
    </div>
  );
};

export default MagnitudeDepthSwitch;
