import React, { useState, useEffect } from "react";

export default function VerifyOTP() {
  const [step, setStep] = useState(1); // 👈 MAIN FEATURE
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [seconds, setSeconds] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= SEND EMAIL (STEP 1 → STEP 2)
  const sendOTP = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/resendotp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(2); // 👈 MOVE TO OTP STEP
        startTimer();
        setMessage({ type: "success", text: "OTP sent successfully" });
      } else {
        setMessage({ type: "error", text: data.msg || "Error" });
      }
    } catch {
      setMessage({ type: "error", text: "Server error" });
    }
  };

  // ================= VERIFY OTP
  const verifyOTP = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://127.0.0.1:8000/api/verifyotp/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStep(3); // 👈 SUCCESS SCREEN
        setMessage({ type: "success", text: "Verified Successfully" });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        setMessage({ type: "error", text: data.msg || "Invalid OTP" });
      }
    } catch {
      setMessage({ type: "error", text: "Server error" });
    }
  };

  // ================= TIMER
  const startTimer = () => {
    setSeconds(60);
    setResendDisabled(true);
  };

  useEffect(() => {
    if (seconds === 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">

        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <form onSubmit={sendOTP} className="space-y-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />

            <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
              Send OTP
            </button>
          </form>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <form onSubmit={verifyOTP} className="space-y-4">

            <p className="text-sm text-gray-500 text-center">
              OTP sent to <b>{formData.email}</b>
            </p>

            <input
              type="text"
              name="otp"
              value={formData.otp}
              onChange={handleChange}
              placeholder="Enter OTP"
              maxLength={6}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500"
              required
            />

            <button className="w-full bg-green-600 text-white py-2 rounded-lg">
              Verify OTP
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-blue-600 text-sm"
            >
              Change Email
            </button>

            {/* Timer */}
            {seconds > 0 ? (
              <p className="text-center text-sm text-gray-500">
                Resend in {seconds}s
              </p>
            ) : (
              <button
                type="button"
                disabled={resendDisabled}
                onClick={sendOTP}
                className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg"
              >
                Resend OTP
              </button>
            )}
          </form>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <div className="text-center">
            <h3 className="text-green-600 font-bold text-xl">
              OTP Verified ✅
            </h3>
          </div>
        )}

        {/* MESSAGE */}
        {message.text && (
          <p
            className={`text-sm text-center mt-4 ${
              message.type === "success"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
}