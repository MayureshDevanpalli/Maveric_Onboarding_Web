import { ProgressSpinner } from "primereact/progressspinner";

const progressSpinnerStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const FullPageSpinner = () => {
  return (
    <div style={progressSpinnerStyle}>
      <ProgressSpinner animationDuration="0.5s" />
    </div>
  );
};

export default FullPageSpinner;
