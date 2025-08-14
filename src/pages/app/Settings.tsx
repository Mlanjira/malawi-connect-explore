import { useEffect, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  useSEO({ title: "Settings • Malawi Tourism App", description: "Manage profile, preferences, language, notifications, and modes.", canonical: "/app/settings" });

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [lang, setLang] = useState("en");
  const [notify, setNotify] = useState(true);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsPro(Boolean(user.isPro));
  }, []);

  const save = () => {
    localStorage.setItem("preferences", JSON.stringify({ name, lang, notify, isPro }));
    localStorage.setItem("user", JSON.stringify({ ...(JSON.parse(localStorage.getItem("user") || "{}")), isPro }));
    toast({ title: "Saved", description: "Your preferences have been updated." });
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-4 pb-20 md:pb-8">
      <h1 className="text-xl font-semibold mb-4">Settings & Profile</h1>
      <Card className="mb-4">
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{name ? name[0] : "M"}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{name || "Malawi Traveler"}</p>
              <p className="text-sm text-muted-foreground">Tap to edit your profile</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Display name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
          </div>

          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={lang} onValueChange={setLang}>
              <SelectTrigger><SelectValue placeholder="Choose language" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="ny">Chichewa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications</p>
              <p className="text-sm text-muted-foreground">Get alerts and important updates</p>
            </div>
            <Switch checked={notify} onCheckedChange={(v) => setNotify(Boolean(v))} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Hospitality mode</p>
              <p className="text-sm text-muted-foreground">Access professional tools</p>
            </div>
            <Switch checked={isPro} onCheckedChange={(v) => setIsPro(Boolean(v))} />
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={save}>Save changes</Button>
            <Button variant="secondary" onClick={logout}>Logout</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
