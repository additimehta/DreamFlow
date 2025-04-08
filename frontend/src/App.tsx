
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import TimerPage from "./pages/TimerPage";
import CalendarPage from "./pages/CalendarPage";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Layout>
                <HomePage />
              </Layout>
            } />
            <Route path="/login" element={
              <Layout>
                <LoginPage />
              </Layout>
            } />
            <Route path="/signup" element={
              <Layout>
                <SignupPage />
              </Layout>
            } />
            <Route path="/timer" element={
              <Layout>
                <ProtectedRoute>
                  <TimerPage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/calendar" element={
              <Layout>
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="/projects" element={
              <Layout>
                <ProtectedRoute>
                  <ProjectsPage />
                </ProtectedRoute>
              </Layout>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
