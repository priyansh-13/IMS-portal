import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

function generateCaptcha() {
  return Math.random().toString(36).substring(2, 8);
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-primary-foreground/20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full border border-primary-foreground/20" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full border border-primary-foreground/20 translate-x-1/3 translate-y-1/3" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary-foreground/10 rounded-full"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              top: "20%",
              left: "-5%",
            }}
          />
        ))}
      </div>

      <div className="bg-card rounded-2xl shadow-2xl p-10 w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-6">
            <img src="/images/ONOD-logo.png" alt="ONOD Logo" className="h-16 w-auto object-contain" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-foreground text-center mb-6">Sign In</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">User ID/AISHE Code</label>
            <Input value={userId} onChange={e => setUserId(e.target.value)} className="bg-background" />
          </div>

          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Password</label>
            <Input type="password" value={password} onChange={e => setPassword(e.target.value)} className="bg-background" />
          </div>

          <div>
            <label className="text-sm font-medium text-primary mb-1.5 block">Captcha</label>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 border border-border rounded-lg font-mono text-lg font-bold text-foreground bg-muted tracking-widest select-none">
                {captcha}
              </div>
              <Input
                placeholder="Enter captcha"
                value={captchaInput}
                onChange={e => setCaptchaInput(e.target.value)}
                className="bg-background flex-1"
              />
              <button
                type="button"
                onClick={() => setCaptcha(generateCaptcha())}
                className="p-2 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <RefreshCw className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <label htmlFor="remember" className="text-sm text-primary cursor-pointer">Remember Me</label>
            </div>
            <button type="button" className="text-sm text-foreground font-medium hover:underline">
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Sign In
          </button>

          <p className="text-center text-sm text-primary">
            Don't have an account?{" "}
            <button type="button" className="font-medium hover:underline">Click here to sign up.</button>
          </p>
        </form>
      </div>
    </div>
  );
}
