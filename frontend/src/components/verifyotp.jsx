import React, { useState, useEffect } from "react";

export default function VerifyOTP() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [seconds, setSeconds] = useState(0);
  const [resendDisabled, setResendDisabled] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= VERIFY OTP =================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    try {
      const res = await fetch("http://127.0.0.1:8000/api/verifyotp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: data.msg || "OTP verified successfully",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        handleError(data);
      }
    } catch {
      setMessage({ type: "error", text: "Server error" });
    }
  };

  // ================= RESEND OTP =================
  const handleResend = async () => {
    setMessage({ type: "", text: "" });

    if (!formData.email) {
      setMessage({ type: "error", text: "Please enter email first" });
      return;
    }

    setResendDisabled(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/resendotp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage({
          type: "success",
          text: data.msg || "OTP resent successfully",
        });

        startTimer();
      } else {
        handleError(data);
        setResendDisabled(false);
      }
    } catch {
      setMessage({ type: "error", text: "Failed to resend OTP" });
      setResendDisabled(false);
    }
  };

  // ================= TIMER =================
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

  // ================= ERROR HANDLER =================
  const handleError = (data) => {
    if (data.msg) return setMessage({ type: "error", text: data.msg });
    if (data.detail) return setMessage({ type: "error", text: data.detail });
    if (data.non_field_errors)
      return setMessage({ type: "error", text: data.non_field_errors[0] });
    if (data.email)
      return setMessage({ type: "error", text: data.email[0] });
    if (data.otp)
      return setMessage({ type: "error", text: data.otp[0] });

    setMessage({ type: "error", text: "Something went wrong" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-bold text-center mb-6">
          Verify OTP
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Enter OTP
            </label>
            <input
              type="text"
              name="otp"
              maxLength="6"
              value={formData.otp}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
            Verify OTP
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={resendDisabled}
            className="w-full border border-blue-500 text-blue-500 py-2 rounded-lg mt-2 disabled:opacity-50"
          >
            Resend OTP
          </button>

          {/* Timer */}
          {seconds > 0 && (
            <p className="text-sm text-gray-500 text-center">
              Resend available in {seconds}s
            </p>
          )}

          {seconds === 0 && resendDisabled === false && (
            <p className="text-sm text-gray-500 text-center">
              You can resend OTP now
            </p>
          )}

          {/* Messages */}
          {message.text && (
            <p
              className={`text-sm text-center mt-2 ${
                message.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}