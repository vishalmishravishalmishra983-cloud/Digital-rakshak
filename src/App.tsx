import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import NumberCheckerPage from "./pages/NumberCheckerPage";
import SmsAnalyzerPage from "./pages/SmsAnalyzerPage";
import ReportsPage from "./pages/ReportsPage";
import AboutPage from "./pages/AboutPage";
import CallSimulatorPage from "./pages/CallSimulatorPage";
import LinkCheckerPage from "./pages/LinkCheckerPage";
import FamilyLinkPage from "./pages/FamilyLinkPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/number-checker" element={<NumberCheckerPage />} />
          <Route path="/sms-analyzer" element={<SmsAnalyzerPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/call-simulator" element={<CallSimulatorPage />} />
          <Route path="/link-checker" element={<LinkCheckerPage />} />
          <Route path="/family-link" element={<FamilyLinkPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
