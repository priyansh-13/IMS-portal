import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import InstitutionalRegistryPage from "./pages/InstitutionalRegistryPage";
import InstitutionDetailsPage from "./pages/InstitutionDetailsPage";
import ContactDetailsPage from "./pages/ContactDetailsPage";
import ParentOrganizationPage from "./pages/ParentOrganizationPage";
import AffiliationApprovalPage from "./pages/AffiliationApprovalPage";
import CommitteesPage from "./pages/CommitteesPage";
import FinancialDetailsPage from "./pages/FinancialDetailsPage";
import CentresCampusesPage from "./pages/CentresCampusesPage";
import StudentSupportPage from "./pages/StudentSupportPage";
import RegulatoryInformationPage from "./pages/RegulatoryInformationPage";
import ProgrammeCoursePage from "./pages/ProgrammeCoursePage";
import ProgrammeSummaryPage from "./pages/ProgrammeSummaryPage";
import CourseCurriculumPage from "./pages/CourseCurriculumPage";
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
          <Route path="/institutional-registry/contact-details" element={<ContactDetailsPage />} />
          <Route path="/institutional-registry/parent-org" element={<ParentOrganizationPage />} />
          <Route path="/institutional-registry/affiliation" element={<AffiliationApprovalPage />} />
          <Route path="/institutional-registry/committees" element={<CommitteesPage />} />
          <Route path="/institutional-registry/financial" element={<FinancialDetailsPage />} />
          <Route path="/institutional-registry/centres" element={<CentresCampusesPage />} />
          <Route path="/institutional-registry/student-support" element={<StudentSupportPage />} />
          <Route path="/institutional-registry/regulatory" element={<RegulatoryInformationPage />} />
          <Route path="/programme-course" element={<ProgrammeCoursePage />} />
          <Route path="/programme-course/details" element={<ProgrammeCoursePage defaultView="details" />} />
          <Route path="/programme-course/summary" element={<ProgrammeSummaryPage />} />
          <Route path="/programme-course/curriculum" element={<CourseCurriculumPage />} />
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
