import React, { useState } from "react";

const EyeIcon = ({ open }) =>
  open ? (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const features = [
  { icon: "✍️", text: "Publish & share your stories" },
  { icon: "💬", text: "Comment, like & connect" },
  { icon: "📚", text: "Curated reading lists" },
  { icon: "🌍", text: "Join a global community" },
];

function getStrength(pw) {
  if (!pw) return 0;
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  return score;
}

const strengthLabels = ["", "Weak", "Fair", "Good", "Strong"];
const strengthColors = ["", "#e05c5c", "#e8a84e", "#6aaa64", "#2ecc71"];

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const pwStrength = getStrength(formData.password);

  const validate = () => {
    const e = {};
    if (!formData.username.trim()) e.username = "Username is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) e.email = "Valid email required";
    if (!/^\d{10}$/.test(formData.mobile)) e.mobile = "Enter a valid 10-digit number";
    if (formData.password.length < 8) e.password = "Minimum 8 characters";
    if (formData.password !== formData.confirm_password) e.confirm_password = "Passwords do not match";
    return e;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        window.location.href = "/login";
      } else {
        setErrors(data);
      }
    } catch (err) {
      setErrors({ general: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .reg-root { font-family: 'DM Sans', sans-serif; }
        .display { font-family: 'Playfair Display', serif; }

        /* page load animation */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .anim { animation: fadeUp 0.55s ease both; }
        .d1  { animation-delay: 0.05s; }
        .d2  { animation-delay: 0.14s; }
        .d3  { animation-delay: 0.22s; }
        .d4  { animation-delay: 0.30s; }
        .d5  { animation-delay: 0.38s; }
        .d6  { animation-delay: 0.46s; }

        /* custom input focus ring */
        .field-input:focus {
          outline: none;
          border-color: #c9a96e !important;
          box-shadow: 0 0 0 3px rgba(201,169,110,0.15);
        }
        .field-input:hover:not(:focus) {
          border-color: #c4b49a;
        }
        .field-input.error-ring {
          border-color: #e05c5c !important;
        }
        .field-input.error-ring:focus {
          box-shadow: 0 0 0 3px rgba(224,92,92,0.12);
        }

        /* left panel decorative rings */
        .ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(201,169,110,0.2);
          pointer-events: none;
        }

        /* submit button */
        .submit-btn {
          background: #1a1208;
          transition: background 0.28s, transform 0.15s, box-shadow 0.28s;
        }
        .submit-btn:hover:not(:disabled) {
          background: #c9a96e;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(201,169,110,0.35);
        }
        .submit-btn:active { transform: scale(0.98); }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        /* strength bar segments */
        .seg { height: 3px; border-radius: 2px; flex:1; transition: background 0.3s; }

        /* eye toggle */
        .eye-btn { transition: color 0.2s; }
        .eye-btn:hover { color: #c9a96e; }

        /* scrollbar */
        .form-scroll::-webkit-scrollbar { width: 4px; }
        .form-scroll::-webkit-scrollbar-track { background: transparent; }
        .form-scroll::-webkit-scrollbar-thumb { background: #e2d7c4; border-radius: 2px; }
      `}</style>

      <div className="reg-root min-h-screen flex items-center justify-center bg-[#f2ede3] px-4 py-10">

        {/* CARD */}
        <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_24px_80px_rgba(26,18,8,0.14)] overflow-hidden grid grid-cols-1 md:grid-cols-[1fr_1.1fr]">

          {/* ── LEFT PANEL ── */}
          <div className="relative hidden md:flex flex-col justify-between p-10 bg-[#1a1208] overflow-hidden">

            {/* Decorative rings */}
            <span className="ring" style={{ width:320, height:320, top:-80, right:-100 }} />
            <span className="ring" style={{ width:200, height:200, top:60, right:-60 }} />
            <span className="ring" style={{ width:180, height:180, bottom:-60, left:-60 }} />

            {/* Brand */}
            <div className="relative z-10">
              <div className="flex items-center gap-2.5 mb-14">
                <div className="w-9 h-9 rounded-full bg-[#c9a96e] flex items-center justify-center">
                  <span className="display text-white text-base italic font-bold">P</span>
                </div>
                <span className="display text-white text-xl font-bold tracking-tight">
                  Prose<span className="text-[#c9a96e] italic">&</span>Page
                </span>
              </div>

              {/* Headline */}
              <h2 className="display text-[#f5edd8] text-3xl font-bold leading-[1.15] mb-4">
                Join a community of{" "}
                <span className="italic text-[#c9a96e]">curious</span>{" "}
                minds.
              </h2>
              <p className="text-[#a89070] text-sm leading-6 font-light mb-10 max-w-xs">
                Write fearlessly, read deeply, and connect with independent voices from every corner of the world.
              </p>

              {/* Feature list */}
              <ul className="space-y-4">
                {features.map((f) => (
                  <li key={f.text} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-[#c9a96e]/15 flex items-center justify-center text-sm">
                      {f.icon}
                    </span>
                    <span className="text-[#c9b88a] text-sm font-light">{f.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom quote */}
            <div className="relative z-10 mt-10 border-t border-[#c9a96e]/20 pt-6">
              <p className="display italic text-[#c9a96e]/70 text-sm leading-relaxed">
                "The more that you read, the more things you will know."
              </p>
              <p className="text-[#5a4530] text-xs mt-1 font-light">— Dr. Seuss</p>
            </div>
          </div>

          {/* ── RIGHT PANEL ── */}
          <div className="p-8 md:p-10 bg-[#faf8f3] overflow-y-auto form-scroll">

            {/* Mobile brand */}
            <div className="flex md:hidden items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-[#c9a96e] flex items-center justify-center">
                <span className="display text-white text-sm italic font-bold">P</span>
              </div>
              <span className="display text-[#1a1208] text-lg font-bold">
                Prose<span className="text-[#c9a96e] italic">&</span>Page
              </span>
            </div>

            {/* Heading */}
            <div className="anim d1 mb-7">
              <p className="text-xs text-[#c9a96e] tracking-[0.14em] uppercase font-medium mb-1.5">
                — Get Started
              </p>
              <h1 className="display text-[#1a1208] text-3xl font-bold leading-tight">
                Create your account
              </h1>
              <p className="text-[#8b7355] text-sm mt-1.5 font-light">
                Free forever. No credit card required.
              </p>
            </div>

            {/* General error */}
            {errors.general && (
              <div className="mb-5 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Username */}
              <div className="anim d2">
                <label className="block text-xs font-medium text-[#5a4530] mb-1.5 tracking-wide uppercase">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="e.g. john_doe"
                  required
                  className={`field-input w-full px-4 py-2.5 bg-white border rounded-xl text-[#1a1208] text-sm placeholder-[#c4b49a] transition-all duration-200 ${errors.username ? "error-ring" : "border-[#e2d7c4]"}`}
                />
                {errors.username && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="anim d2">
                <label className="block text-xs font-medium text-[#5a4530] mb-1.5 tracking-wide uppercase">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className={`field-input w-full px-4 py-2.5 bg-white border rounded-xl text-[#1a1208] text-sm placeholder-[#c4b49a] transition-all duration-200 ${errors.email ? "error-ring" : "border-[#e2d7c4]"}`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Mobile */}
              <div className="anim d3">
                <label className="block text-xs font-medium text-[#5a4530] mb-1.5 tracking-wide uppercase">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  required
                  className={`field-input w-full px-4 py-2.5 bg-white border rounded-xl text-[#1a1208] text-sm placeholder-[#c4b49a] transition-all duration-200 ${errors.mobile ? "error-ring" : "border-[#e2d7c4]"}`}
                />
                {errors.mobile && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.mobile}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="anim d4">
                <label className="block text-xs font-medium text-[#5a4530] mb-1.5 tracking-wide uppercase">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPw ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                    required
                    className={`field-input w-full px-4 py-2.5 pr-11 bg-white border rounded-xl text-[#1a1208] text-sm placeholder-[#c4b49a] transition-all duration-200 ${errors.password ? "error-ring" : "border-[#e2d7c4]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="eye-btn absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a89070]"
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </div>

                {/* Strength meter */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="seg"
                          style={{ background: i <= pwStrength ? strengthColors[pwStrength] : "#e2d7c4" }}
                        />
                      ))}
                    </div>
                    <p className="text-xs font-medium" style={{ color: strengthColors[pwStrength] }}>
                      {strengthLabels[pwStrength]}
                    </p>
                  </div>
                )}
                {errors.password && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.password}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="anim d5">
                <label className="block text-xs font-medium text-[#5a4530] mb-1.5 tracking-wide uppercase">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirm_password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    required
                    className={`field-input w-full px-4 py-2.5 pr-11 bg-white border rounded-xl text-[#1a1208] text-sm placeholder-[#c4b49a] transition-all duration-200 ${errors.confirm_password ? "error-ring" : formData.confirm_password && formData.password === formData.confirm_password ? "border-[#6aaa64]" : "border-[#e2d7c4]"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="eye-btn absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a89070]"
                  >
                    <EyeIcon open={showConfirm} />
                  </button>
                  {/* match checkmark */}
                  {formData.confirm_password && formData.password === formData.confirm_password && (
                    <span className="absolute right-10 top-1/2 -translate-y-1/2 text-green-500 text-sm">✓</span>
                  )}
                </div>
                {errors.confirm_password && (
                  <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                    <span>⚠</span> {errors.confirm_password}
                  </p>
                )}
              </div>

              {/* Terms note */}
              <p className="anim d5 text-xs text-[#a89070] leading-relaxed pt-1">
                By creating an account you agree to our{" "}
                <a href="#" className="text-[#c9a96e] hover:underline">Terms of Service</a>
                {" "}and{" "}
                <a href="#" className="text-[#c9a96e] hover:underline">Privacy Policy</a>.
              </p>

              {/* Submit */}
              <div className="anim d6 pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="submit-btn w-full text-[#f5edd8] py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2.5"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                      </svg>
                      Creating your account…
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </>
                  )}
                </button>
              </div>

              {/* Login link */}
              <p className="anim d6 text-xs text-center text-[#8b7355] pt-2">
                Already have an account?{" "}
                <a href="/login" className="text-[#c9a96e] font-medium hover:underline">
                  Sign in
                </a>
              </p>

            </form>
          </div>
        </div>
      </div>
    </>
  );
}