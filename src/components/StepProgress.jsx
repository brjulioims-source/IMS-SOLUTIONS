// src/components/StepProgress.jsx
import "./StepProgress.css";

function StepProgress({ currentStep, totalSteps }) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="step-progress">
      <div className="step-header">
        <span>Paso {currentStep} de {totalSteps}</span>
        <span>{Math.round(progress)}% completado</span>
      </div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default StepProgress;
