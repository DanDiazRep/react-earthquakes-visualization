import { LegendBubbleProps } from "./types";

const LegendBubble = (props: LegendBubbleProps) => {
  return (
    <div style={{ width: 90 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="40" height="40" viewBox="8 8 24 24">
          <circle cx="20" cy="20" r="8" fill={props.color} />
        </svg>
      </div>

      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
        }}
      >
        {props.value}
      </p>
    </div>
  );
};

export default LegendBubble;
