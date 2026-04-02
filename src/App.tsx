import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InstitutionalRegistryPage from "./pages/InstitutionalRegistryPage";
import InstitutionDetailsPage from "./pages/InstitutionDetailsPage";
import ProgrammeCoursePage from "./pages/ProgrammeCoursePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/institutional-registry" element={<InstitutionalRegistryPage />} />
          <Route path="/institutional-registry/institution-details" element={<InstitutionDetailsPage />} />
          <Route path="/programme-course" element={<ProgrammeCoursePage />} />
          {/* Placeholder routes for other modules */}
          <Route path="/student-info" element={<DashboardPage />} />
          <Route path="/faculty-hr" element={<DashboardPage />} />
          <Route path="/infrastructure" element={<DashboardPage />} />
          <Route path="/quality-assurance" element={<DashboardPage />} />
          <Route path="/abc-ncrf" element={<DashboardPage />} />
          <Route path="/innovation" element={<DashboardPage />} />
          <Route path="/research" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
