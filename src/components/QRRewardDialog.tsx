import { useEffect } from "react";
import confetti from "canvas-confetti";
import QRCode from "react-qr-code";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rewardText?: string;
}

export function QRRewardDialog({ open, onOpenChange, rewardText = "10% off partner restaurants" }: Props) {
  useEffect(() => {
    if (!open) return;
    const end = Date.now() + 800;
    const colors = ["#1f8dd6", "#f2a93b", "#ffffff"]; // primary, accent, white

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, [open]);

  const handleSave = () => {
    toast({ title: "Saved to Wallet", description: "Your QR reward is saved for offline access." });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Congratulations!</DialogTitle>
          <DialogDescription>You've unlocked a reward for completing your reading journey.</DialogDescription>
        </DialogHeader>
        <div className="grid place-items-center gap-3 py-2">
          <div className="bg-white p-4 rounded-md border">
            <QRCode value={`malawi-tourism-reward:${rewardText}`} size={160} />
          </div>
          <p className="text-sm text-muted-foreground">{rewardText}</p>
        </div>
        <DialogFooter className="flex gap-2 sm:justify-end">
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Close</Button>
          <Button onClick={handleSave}>Save to Wallet</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
