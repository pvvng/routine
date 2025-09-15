import { AuthGoogle, AuthKakao } from "@/components/AuthButtons";

export default function LoginPage() {
  return (
    <div className="space-y-3 p-20">
      <AuthKakao />
      <AuthGoogle />
    </div>
  );
}
