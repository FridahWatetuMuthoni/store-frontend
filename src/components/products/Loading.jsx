import { ProgressCircleRing, ProgressCircleRoot } from "../ui/progress-circle";

function Loading() {
  return (
    <ProgressCircleRoot
      value={null}
      size="lg"
      marginBottom={"200px"}
      marginTop={"100px"}
    >
      <ProgressCircleRing cap="round" />
    </ProgressCircleRoot>
  );
}

export default Loading;
