import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import About from "@/pages/About";
import History from "@/pages/History";
import Villages from "@/pages/Villages";
import Culture from "@/pages/Culture";
import Places from "@/pages/Places";
import Education from "@/pages/Education";
import Sports from "@/pages/Sports";
import Developments from "@/pages/Developments";
import News from "@/pages/News";
import Gallery from "@/pages/Gallery";
import Contacts from "@/pages/Contacts";
import Faq from "@/pages/Faq";
import Sources from "@/pages/Sources";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

// Floating Back to Top Button
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="icon"
            className="h-12 w-12 rounded-full shadow-xl hover:shadow-2xl transition-all"
            onClick={scrollToTop}
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Router() {
  return (
    <main className="flex-1 flex flex-col">
      <Switch>
        <Route path="/" component={Home} />
        
        <Route path="/about" component={About} />
        <Route path="/history" component={History} />
        <Route path="/villages" component={Villages} />
        <Route path="/culture" component={Culture} />
        <Route path="/places" component={Places} />
        <Route path="/education" component={Education} />
        <Route path="/sports" component={Sports} />
        <Route path="/developments" component={Developments} />
        <Route path="/news" component={News} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/contacts" component={Contacts} />
        <Route path="/faq" component={Faq} />
        <Route path="/sources" component={Sources} />
        
        <Route component={NotFound} />
      </Switch>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="stadium-area-theme">
        <LanguageProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
                <Navigation />
                <Router />
                <Footer />
                <BackToTop />
              </div>
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
