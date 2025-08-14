import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyProfessional from "./pages/VerifyProfessional";
import AppShell from "./components/layout/AppShell";
import HotelsPage from "./pages/app/Hotels";
import ArticlesPage from "./pages/app/Articles";
import TrainingPage from "./pages/app/Training";
import MarketingPage from "./pages/app/Marketing";
import UpdatesPage from "./pages/app/Updates";
import SettingsPage from "./pages/app/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<VerifyProfessional />} />

          <Route path="/app" element={<AppShell />}>
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="articles" element={<ArticlesPage />} />
            <Route path="training" element={<TrainingPage />} />
            <Route path="marketing" element={<MarketingPage />} />
            <Route path="updates" element={<UpdatesPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
