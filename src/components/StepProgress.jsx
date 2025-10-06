// src/components/StepProgress.jsx
import "./StepProgress.css";

function StepProgress({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;
  const isComplete = progress >= 100;

  return (
    <div className="step-progress">
      <div className="step-header">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span>
          {Math.round(progress)}% {isComplete && "✅ Completado"}
        </span>
      </div>

      <div className="progress-bar">
        <div
          className={`progress-fill ${isComplete ? "complete" : ""}`}
          style={{ width: `${Math.min(progress, 100)}%` }}
        ></div>
      </div>
    </div>
  );
}

export default StepProgress;
