import { AuthFormShell } from "@/components/auth/AuthFormShell";
import { RegisterForm } from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthFormShell
      title="Spin up your archive"
      subtitle="Capture the wins, the fuck ups, and everything in between. This one’s for the messy parts of your story."
      mode="register"
    >
      <RegisterForm />
    </AuthFormShell>
  );
}

