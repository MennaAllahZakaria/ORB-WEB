import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { OrbAuthProvider, useOrbAuth } from "./contexts/OrbAuthContext";
import AccessDenied from "./pages/AccessDenied";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";

/** Style reminder — ORB «دفتر المنارة»: the application frame is a clear RTL education operations workspace. */
function AdminGate() {
  const { ready, user, logout } = useOrbAuth();
  if (!ready) return <div className="min-h-screen bg-[#F6F9FC]" />;
  if (!user) return <LoginPage />;
  if (user.role !== "admin") return <AccessDenied onLogout={logout} />;
  return <Home />;
}

function Router() {
  return (
    <Switch>
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/"} component={AdminGate} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <OrbAuthProvider><Router /></OrbAuthProvider>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
