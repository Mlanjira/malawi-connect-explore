import { useEffect, useMemo, useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";

const courses = [
  { id: "c1", type: "video", title: "Guest experience 101", progress: 40 },
  { id: "c2", type: "article", title: "Food safety basics", progress: 0 },
  { id: "c3", type: "video", title: "Front desk efficiency", progress: 75 },
  { id: "c4", type: "article", title: "Sustainable practices", progress: 20 },
];

export default function TrainingPage() {
  useSEO({ title: "Training • Malawi Tourism App", description: "Professional training hub for hospitality teams.", canonical: "/app/training" });
  const navigate = useNavigate();
  const [tab, setTab] = useState("all");
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerified(localStorage.getItem("proVerified") === "true");
  }, []);

  const filtered = useMemo(() => {
    return courses.filter((c) => (tab === "all" ? true : c.type === tab));
  }, [tab]);

  if (!verified) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8 text-center space-y-4">
        <h1 className="text-xl font-semibold">Verification required</h1>
        <p className="text-muted-foreground">Please verify your hospitality professional status to access the Training Hub.</p>
        <Button onClick={() => navigate("/verify")}>Verify now</Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-4 pb-20 md:pb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Training Hub</h1>
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="video">Videos</TabsTrigger>
            <TabsTrigger value="article">Articles</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Card key={c.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4 space-y-3">
              <div className="h-28 rounded-md bg-gradient-to-br from-primary/10 via-secondary/20 to-accent/10" />
              <h3 className="font-medium">{c.title}</h3>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span className="text-muted-foreground">{c.progress}%</span>
                </div>
                <Progress value={c.progress} />
              </div>
              <Button variant={c.progress ? "secondary" : "default"}>{c.progress ? "Continue" : "Start"}</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
