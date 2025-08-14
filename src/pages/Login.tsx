import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useSEO } from "@/hooks/use-seo";
import { toast } from "@/hooks/use-toast";

export default function Login() {
  useSEO({ title: "Login • Malawi Tourism App", description: "Sign in to access hotels, training, marketing, and updates.", canonical: "/login" });
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPro, setIsPro] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email, isPro }));
    if (isPro) {
      toast({ title: "Welcome, Hospitality Professional", description: "Please verify to access the Training Hub." });
      navigate("/verify");
    } else {
      navigate("/app/hotels");
    }
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-xl font-semibold">Sign in</h1>
            <p className="text-sm text-muted-foreground">Welcome back to Malawi Tourism</p>
          </div>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="pro" checked={isPro} onCheckedChange={(v) => setIsPro(Boolean(v))} />
              <Label htmlFor="pro">I am a hospitality professional</Label>
            </div>
            <Button type="submit" className="w-full">Sign in</Button>
          </form>
          <p className="text-sm text-muted-foreground">
            Don’t have an account? <Link to="/signup" className="text-primary">Create account</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
