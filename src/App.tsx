
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Impressum from "./pages/Impressum";
import RemoveInvisibleCharacters from "./pages/RemoveInvisibleCharacters";
import CleanChatgptText from "./pages/CleanChatgptText";
import UnicodeCleaner from "./pages/UnicodeCleaner";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/remove-invisible-characters" element={<RemoveInvisibleCharacters />} />
            <Route path="/clean-chatgpt-text" element={<CleanChatgptText />} />
            <Route path="/unicode-cleaner" element={<UnicodeCleaner />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
