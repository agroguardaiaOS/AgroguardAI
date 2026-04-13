import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Intelligence from "./pages/Intelligence";
import AgroMind from "./pages/AgroMind";
import AgroRobotics from "./pages/AgroRobotics";
import API from "./pages/API";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import About from "./pages/About";

/**
 * Main Router Component
 * Defines all application routes
 */
function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/intelligence" component={Intelligence} />
      <Route path="/agromind" component={AgroMind} />
      <Route path="/agrorobotics" component={AgroRobotics} />
      <Route path="/api" component={API} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

/**
 * Main App Component
 * Wraps the application with providers and theme context
 * 
 * Design System: Light theme with AgroGuardAI color palette
 * - Primary: Forest Green (#4caf50)
 * - Secondary: Tech Cyan (#00bcd4)
 * - Accent: Harvest Gold (#ff9800)
 */
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
