import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import LaMachinePage from "./pages/LaMachinePage.tsx";
import NotreEquipePage from "./pages/NotreEquipePage.tsx";
import ProcessusPage from "./pages/ProcessusPage.tsx";
import SpecificationsPage from "./pages/SpecificationsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/la-machine" element={<LaMachinePage />} />
          <Route path="/notre-equipe" element={<NotreEquipePage />} />
          <Route path="/processus" element={<ProcessusPage />} />
          <Route path="/specifications" element={<SpecificationsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
