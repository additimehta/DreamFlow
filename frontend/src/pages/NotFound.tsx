
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-babyBlue/20 via-white to-babyPink/20">
      <div className="text-center dreamy-card max-w-md animate-fade-in">
        <div className="text-6xl mb-6 animate-float">✨</div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-babyPink to-babyBlue bg-clip-text text-transparent">Oops!</h1>
        <p className="text-xl text-foreground/80 mb-8">This page seems to have drifted away into dreamland</p>
        <Button className="dreamy-button" onClick={() => window.location.href = '/'}>
          <Home className="w-4 h-4 mr-2" /> Return to Home
        </Button>
      </div>
      <div className="fixed -z-10 top-0 left-0 w-[300px] h-[300px] bg-babyBlue/30 rounded-full blur-3xl" />
      <div className="fixed -z-10 bottom-0 right-0 w-[300px] h-[300px] bg-babyPink/30 rounded-full blur-3xl" />
    </div>
  );
};

export default NotFound;
