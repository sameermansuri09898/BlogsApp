import React, { useState } from "react";

export default function Stepp() {
  const [step, setStep] = useState(1);

  const next = () => {
    if (step < 3) setStep(step + 1);
  };

  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  const progress = (step / 3) * 100;

  return (
    <div>
      {/* Progress Bar */}
      <div
        style={{
          width: "100%",
          height: "10px",
          background: "#ddd",
          marginBottom: "20px"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "green"
          }}
        />
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <span>{step > 1 ? "✅" : "1"} Name</span>
        <span>{step > 2 ? "✅" : "2"} Email</span>
        <span>{step > 3 ? "✅" : "3"} Profession</span>
      </div>

      {/* Form */}
      {step === 1 && <input placeholder="Enter Name" />}
      {step === 2 && <input placeholder="Enter Email" />}
      {step === 3 && <input placeholder="Enter Profession" />}

      <div style={{ marginTop: "20px" }}>
        {step > 1 && (
          <button onClick={back}>
            ⬅ Back
          </button>
        )}

        {step < 3 ? (
          <button onClick={next}>Next ➡</button>
        ) : (
          <button>Submit ✅</button>
        )}
      </div>
    </div>
  );
}