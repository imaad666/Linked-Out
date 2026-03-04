import { AuthFormShell } from "@/components/auth/AuthFormShell";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthFormShell
      title="Enter your archive"
      subtitle="Log back into the place where your wins, fuck ups, and weird milestones actually belong."
      mode="login"
    >
      <LoginForm />
    </AuthFormShell>
  );
}

