import { useState } from "react";
import { MagnitudeDepthSwitchProps } from "./types";
import ReactSwitch from "react-switch";

const MagnitudeDepthSwitch = ({}: MagnitudeDepthSwitchProps) => {
  const [depthToggleChecked, setDepthToggleChecked] = useState(false);

  const handleToggleChange = (nextChecked) => {
    setDepthToggleChecked(nextChecked);
    if (nextChecked === true) {
      // depth
      //setBubbleOption("Depth");
    } else {
      // magnitude
      // setBubbleOption("Magnitude");
    }
  };
  return (
    <div>
      <p>Choose what you want to visualize with the bubbles: </p>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <p>Magnitude</p>
        <div style={{ width: 20 }}></div>
        <ReactSwitch
          checked={depthToggleChecked}
          onChange={handleToggleChange}
          uncheckedIcon={false}
          checkedIcon={false}
          onColor="#0096FF"
          offColor="#0000FF"
        />
        <div style={{ width: 20 }}></div>
        <p>Depth</p>
      </div>
    </div>
  );
};

export default MagnitudeDepthSwitch;
