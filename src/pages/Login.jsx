import { useNavigate } from "react-router-dom";
import { http } from "../http";
import { setToken, setUser } from "../auth";

export default function Login() {
  const nav = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const email = f.get("email");
    const password = f.get("password");
    const { data } = await http.post("/api/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    nav("/", { replace: true });
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "64px auto" }}>
      <h2>تسجيل الدخول</h2>
      <input name="email" type="email" placeholder="البريد" required />
      <input name="password" type="password" placeholder="كلمة المرور" required />
      <button type="submit">دخول</button>
    </form>
  );
}