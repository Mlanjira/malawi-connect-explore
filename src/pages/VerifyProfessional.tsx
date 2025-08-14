import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSEO } from "@/hooks/use-seo";
import { toast } from "@/hooks/use-toast";

export default function VerifyProfessional() {
  useSEO({ title: "Verify Professional • Malawi Tourism App", description: "Verify your professional status to access the Training Hub.", canonical: "/verify" });
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  const onVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim().length < 4) {
      toast({ title: "Invalid code", description: "Please enter the 4+ digit verification code." });
      return;
    }
    localStorage.setItem("proVerified", "true");
    toast({ title: "Verified", description: "You now have access to the Training Hub." });
    navigate("/app/training");
  };

  return (
    <div className="min-h-screen grid place-items-center px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 space-y-4">
          <div>
            <h1 className="text-xl font-semibold">Professional verification</h1>
            <p className="text-sm text-muted-foreground">Enter the code sent to your email</p>
          </div>
          <form className="space-y-4" onSubmit={onVerify}>
            <div className="space-y-2">
              <Label htmlFor="code">Verification code</Label>
              <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} placeholder="1234" />
            </div>
            <Button type="submit" className="w-full">Verify and continue</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
