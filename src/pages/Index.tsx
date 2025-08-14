import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useNavigate } from "react-router-dom";
import { useSEO } from "@/hooks/use-seo";

const slides = [
  {
    title: "Discover top-rated hotels",
    desc: "See infrastructure and connectivity insights before you book.",
  },
  {
    title: "Access hospitality resources",
    desc: "Upskill with training and best-practice guides.",
  },
  {
    title: "Stay connected",
    desc: "Live updates, reviews, and alerts across Malawi.",
  },
];

const Index = () => {
  const navigate = useNavigate();
  useSEO({ title: "Welcome • Malawi Tourism App", description: "Onboard to discover hotels, training, marketing, and live updates in Malawi.", canonical: "/" });

  return (
    <div className="min-h-screen bg-background grid place-items-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center animate-fade-in">
          <h1 className="text-2xl font-semibold">Welcome to Malawi Tourism</h1>
          <p className="text-muted-foreground">Discover • Train • Connect</p>
        </div>

        <Card className="border-none shadow-[var(--shadow-elevate)]">
          <CardContent className="p-0">
            <div className="h-60 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/30 flex items-center justify-center">
              <Carousel className="w-full">
                <CarouselContent>
                  {slides.map((s, i) => (
                    <CarouselItem key={i} className="p-6">
                      <div className="text-center space-y-2">
                        <h2 className="text-xl font-semibold">{s.title}</h2>
                        <p className="text-sm text-muted-foreground">{s.desc}</p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            <div className="p-6 space-y-3">
              <Button className="w-full hover-scale" onClick={() => navigate("/login")}>Get Started</Button>
              <button className="w-full text-sm text-primary" onClick={() => navigate("/login")}>Already have an account? Login</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
