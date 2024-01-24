import { useMemo } from "react";
import useFormContext from "../hooks/useFormContext";

const ProgressBar = () => {
  const { page, title } = useFormContext();

  return useMemo(() => {
    console.log("red");
    const interval = 100 / Object.keys(title).length;

    const progress = ((page + 1) * interval).toFixed(2);

    const steps = Object.keys(title).map((step, i) => {
      return (
        <div className="barmarker" key={i}>
          Step{i + 1}
        </div>
      );
    });

    return (
      <section className="progress-container">
        <div className="barmarker-container">{steps}</div>
        <progress className="progress" max="100" value={progress}></progress>
      </section>
    );
  }, [page, title]);
};
export default ProgressBar;
