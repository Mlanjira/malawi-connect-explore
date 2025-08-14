import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { QRRewardDialog } from "@/components/QRRewardDialog";

export default function ArticlesPage() {
  useSEO({ title: "Articles • Malawi Tourism App", description: "Track your reading journey and unlock rewards mid-vacation.", canonical: "/app/articles" });
  const [chapter1Done, setChapter1Done] = useState(false);
  const [midVacation, setMidVacation] = useState(false);
  const [rewardOpen, setRewardOpen] = useState(false);

  const progress = (chapter1Done ? 1 : 0) + (midVacation ? 1 : 0);
  const pct = (progress / 2) * 100;

  return (
    <div className="max-w-3xl mx-auto px-4 py-4 pb-20 md:pb-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Article journey</h1>
        <div className="flex items-center gap-2">
          <Switch id="mid" checked={midVacation} onCheckedChange={(v) => setMidVacation(Boolean(v))} />
          <Label htmlFor="mid">I'm mid-vacation</Label>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Progress</span>
              <span className="text-muted-foreground">{pct}%</span>
            </div>
            <Progress value={pct} />
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-md border">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Chapter 1: Welcome to Malawi</h3>
                  <p className="text-sm text-muted-foreground">Culture, safety, connectivity tips</p>
                </div>
                {!chapter1Done ? (
                  <Button onClick={() => setChapter1Done(true)}>Mark complete</Button>
                ) : (
                  <span className="text-sm text-primary">Completed</span>
                )}
              </div>
            </div>
            <div className="p-3 rounded-md border opacity-90">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Chapter 2: Mid-trip guide</h3>
                  <p className="text-sm text-muted-foreground">Hidden gems, events, and rewards</p>
                </div>
                {!midVacation ? (
                  <span className="text-sm text-muted-foreground">Unlocks mid-vacation</span>
                ) : (
                  <Button variant="secondary">Start</Button>
                )}
              </div>
            </div>
          </div>

          {chapter1Done && midVacation && (
            <div className="pt-2">
              <Button className="hover-scale" onClick={() => setRewardOpen(true)}>Unlock QR reward</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <QRRewardDialog open={rewardOpen} onOpenChange={setRewardOpen} rewardText="Lake Malawi dining voucher" />
    </div>
  );
}
