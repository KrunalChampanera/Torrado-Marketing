import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import API from "../services/api"
import InstagramSection from "../components/InstagramSection"
import PageHeader from "../components/PageHeader"

const S = {
  page: {
    background: "linear-gradient(160deg, #fef9f5 0%, #fff5f0 50%, #fdf0ff 100%)",
    minHeight: "100vh",
    fontFamily: "'Nunito Sans', sans-serif",
  },
  section: {
    padding: "72px 24px 96px",
    maxWidth: "1000px",
    margin: "0 auto",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "28px",
  },
  card: {
    background: "#fff",
    borderRadius: "26px",
    border: "1px solid rgba(232,97,58,0.08)",
    boxShadow: "0 8px 40px rgba(0,0,0,0.06)",
    padding: "44px 40px",
    position: "relative",
    overflow: "hidden",
  },
  cardAccent: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #e8613a, #f0a07a)",
    borderRadius: "26px 26px 0 0",
  },
  cardAccentBlue: {
    position: "absolute",
    top: 0, left: 0, right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #5b8dee, #8ab4f8)",
    borderRadius: "26px 26px 0 0",
  },
  eyebrow: (color) => ({
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "3px",
    textTransform: "uppercase",
    color: color || "#e8613a",
    marginBottom: "8px",
  }),
  cardTitle: {
    fontSize: "28px",
    fontWeight: "800",
    fontFamily: "'Lora', serif",
    color: "#1c1410",
    marginBottom: "32px",
    letterSpacing: "-0.4px",
    lineHeight: 1.2,
  },
  fieldWrap: {
    marginBottom: "16px",
    position: "relative",
  },
  label: {
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    color: "rgba(28,20,16,0.4)",
    marginBottom: "8px",
    display: "block",
  },
  inputWrap: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute",
    left: "16px",
    fontSize: "16px",
    pointerEvents: "none",
    zIndex: 1,
  },
  input: (focus) => ({
    width: "100%",
    padding: "14px 18px 14px 44px",
    borderRadius: "14px",
    border: `1.5px solid ${focus ? "#e8613a" : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#fffaf8" : "#fafafa",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(232,97,58,0.08)" : "none",
    transition: "all 0.25s ease",
  }),
  inputBlue: (focus) => ({
    width: "100%",
    padding: "14px 18px 14px 44px",
    borderRadius: "14px",
    border: `1.5px solid ${focus ? "#5b8dee" : "rgba(28,20,16,0.1)"}`,
    background: focus ? "#f8fbff" : "#fafafa",
    fontSize: "14px",
    fontFamily: "'Nunito Sans', sans-serif",
    color: "#1c1410",
    outline: "none",
    boxShadow: focus ? "0 0 0 3px rgba(91,141,238,0.1)" : "none",
    transition: "all 0.25s ease",
  }),
  forgotRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "8px 0 24px",
  },
  checkLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "13px",
    color: "rgba(28,20,16,0.5)",
    fontWeight: "600",
    cursor: "pointer",
  },
  checkbox: {
    width: "16px",
    height: "16px",
    accentColor: "#e8613a",
    cursor: "pointer",
  },
  forgotLink: {
    fontSize: "13px",
    fontWeight: "700",
    color: "#e8613a",
    textDecoration: "none",
  },
  btnOrange: (hov) => ({
    width: "100%",
    padding: "15px",
    borderRadius: "50px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg, #d4542e, #e8613a)"
      : "linear-gradient(135deg, #e8613a, #f0855e)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 14px 40px rgba(232,97,58,0.45)" : "0 6px 24px rgba(232,97,58,0.3)",
    transform: hov ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    marginTop: "8px",
  }),
  btnBlue: (hov) => ({
    width: "100%",
    padding: "15px",
    borderRadius: "50px",
    border: "none",
    background: hov
      ? "linear-gradient(135deg, #4070cc, #5b8dee)"
      : "linear-gradient(135deg, #5b8dee, #8ab4f8)",
    color: "#fff",
    fontSize: "13px",
    fontWeight: "800",
    letterSpacing: "1.5px",
    textTransform: "uppercase",
    cursor: "pointer",
    boxShadow: hov ? "0 14px 40px rgba(91,141,238,0.45)" : "0 6px 24px rgba(91,141,238,0.3)",
    transform: hov ? "translateY(-2px)" : "translateY(0)",
    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
    marginTop: "8px",
  }),
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "24px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(28,20,16,0.08)",
  },
  dividerText: {
    fontSize: "11px",
    fontWeight: "700",
    color: "rgba(28,20,16,0.3)",
    letterSpacing: "1px",
  },
  toast: (show, success) => ({
    position: "fixed",
    bottom: "32px",
    right: "32px",
    background: "#fff",
    border: `1px solid ${success ? "rgba(0,180,80,0.3)" : "rgba(232,97,58,0.3)"}`,
    borderRadius: "16px",
    padding: "16px 24px",
    color: success ? "#00a84f" : "#e8613a",
    fontWeight: "700",
    fontSize: "14px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    opacity: show ? 1 : 0,
    transform: show ? "translateY(0)" : "translateY(16px)",
    transition: "all 0.4s cubic-bezier(0.23,1,0.32,1)",
    pointerEvents: "none",
  }),
  benefitRow: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "28px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(28,20,16,0.06)",
  },
  benefitChip: {
    fontSize: "11px",
    fontWeight: "700",
    color: "rgba(28,20,16,0.45)",
    background: "rgba(28,20,16,0.04)",
    borderRadius: "50px",
    padding: "5px 12px",
    letterSpacing: "0.3px",
  },
}

const Field = ({ label, icon, type = "text", placeholder, value, onChange, variant = "orange" }) => {
  const [focus, setFocus] = useState(false)
  const inputStyle = variant === "blue" ? S.inputBlue(focus) : S.input(focus)
  return (
    <div style={S.fieldWrap}>
      <label style={S.label}>{label}</label>
      <div style={S.inputWrap}>
        <span style={S.inputIcon}>{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={inputStyle}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          required
        />
      </div>
    </div>
  )
}

const MyAccount = () => {
  const navigate = useNavigate()
  const [login, setLogin] = useState({ email: "", password: "" })
  const [register, setRegister] = useState({ name: "", email: "", password: "" })
  const [remember, setRemember] = useState(false)
  const [loginBtnHov, setLoginBtnHov] = useState(false)
  const [regBtnHov, setRegBtnHov] = useState(false)
  const [vis, setVis] = useState(false)
  const [toast, setToast] = useState({ show: false, msg: "", success: true })

  useEffect(() => {
    setTimeout(() => setVis(true), 60)
    const link = document.createElement("link")
    link.href = "https://fonts.googleapis.com/css2?family=Lora:wght@700;800&family=Nunito+Sans:wght@400;600;700;800&display=swap"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    const style = document.createElement("style")
    style.innerHTML = `@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}*{box-sizing:border-box}@media(max-width:700px){.auth-grid{grid-template-columns:1fr!important}}`
    document.head.appendChild(style)
  }, [])

  const showToast = (msg, success = true) => {
    setToast({ show: true, msg, success })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 3000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await API.post("/auth/login", login)
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      showToast("Welcome back! Redirecting…", true)
      setTimeout(() => navigate("/profile"), 1400)
    } catch (err) {
      showToast(err.response?.data?.message || "Login failed. Please try again.", false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await API.post("/auth/register", register)
      showToast("Account created! Please log in.", true)
      setRegister({ name: "", email: "", password: "" })
    } catch (err) {
      showToast(err.response?.data?.message || "Registration failed.", false)
    }
  }

  return (
    <>
      <div style={S.page}>
        <PageHeader title="My Account" breadcrumb="My Account" />

        <div style={S.successToast}>
          <div style={S.toast(toast.show, toast.success)}>
            {toast.success ? "✓" : "✕"} {toast.msg}
          </div>
        </div>

        <div style={{
          ...S.section,
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(28px)",
          transition: "all 0.7s cubic-bezier(0.23,1,0.32,1)",
        }}>
          <div className="auth-grid" style={S.grid}>

            {/* LOGIN */}
            <div style={{ ...S.card, animation: vis ? "fadeUp 0.6s ease 0.05s both" : "none" }}>
              <div style={S.cardAccent} />
              <div style={S.eyebrow()}>Welcome Back</div>
              <div style={S.cardTitle}>Log In</div>

              <form onSubmit={handleLogin}>
                <Field
                  label="Email Address"
                  icon="✉"
                  type="email"
                  placeholder="you@example.com"
                  value={login.email}
                  onChange={e => setLogin({ ...login, email: e.target.value })}
                />
                <Field
                  label="Password"
                  icon="🔒"
                  type="password"
                  placeholder="Enter your password"
                  value={login.password}
                  onChange={e => setLogin({ ...login, password: e.target.value })}
                />

                <div style={S.forgotRow}>
                  <label style={S.checkLabel}>
                    <input
                      type="checkbox"
                      style={S.checkbox}
                      checked={remember}
                      onChange={e => setRemember(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <a href="/forgot-password" style={S.forgotLink}>Forgot password?</a>
                </div>

                <button
                  type="submit"
                  style={S.btnOrange(loginBtnHov)}
                  onMouseEnter={() => setLoginBtnHov(true)}
                  onMouseLeave={() => setLoginBtnHov(false)}
                >
                  Login Now →
                </button>
              </form>

              <div style={S.benefitRow}>
                {["Secure Login", "Fast Checkout", "Order Tracking"].map(b => (
                  <span key={b} style={S.benefitChip}>{b}</span>
                ))}
              </div>
            </div>

            {/* REGISTER */}
            <div style={{ ...S.card, animation: vis ? "fadeUp 0.6s ease 0.15s both" : "none" }}>
              <div style={S.cardAccentBlue} />
              <div style={S.eyebrow("#5b8dee")}>New Here?</div>
              <div style={S.cardTitle}>Create Account</div>

              <form onSubmit={handleRegister}>
                <Field
                  label="Full Name"
                  icon="👤"
                  placeholder="Your full name"
                  value={register.name}
                  onChange={e => setRegister({ ...register, name: e.target.value })}
                  variant="blue"
                />
                <Field
                  label="Email Address"
                  icon="✉"
                  type="email"
                  placeholder="you@example.com"
                  value={register.email}
                  onChange={e => setRegister({ ...register, email: e.target.value })}
                  variant="blue"
                />
                <Field
                  label="Password"
                  icon="🔒"
                  type="password"
                  placeholder="Create a password"
                  value={register.password}
                  onChange={e => setRegister({ ...register, password: e.target.value })}
                  variant="blue"
                />

                <button
                  type="submit"
                  style={{ ...S.btnBlue(regBtnHov), marginTop: "24px" }}
                  onMouseEnter={() => setRegBtnHov(true)}
                  onMouseLeave={() => setRegBtnHov(false)}
                >
                  Register Now →
                </button>
              </form>

              <div style={S.benefitRow}>
                {["Free Account", "Wishlist", "Exclusive Offers"].map(b => (
                  <span key={b} style={{ ...S.benefitChip, color: "rgba(91,141,238,0.7)", background: "rgba(91,141,238,0.06)" }}>{b}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <InstagramSection />
    </>
  )
}

export default MyAccount