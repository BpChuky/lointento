import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated hearts background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <Heart
            key={i}
            className="absolute text-primary/10 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="max-w-2xl w-full bg-card/80 backdrop-blur-md rounded-3xl shadow-[var(--shadow-romantic)] p-8 md:p-12 text-center space-y-8 relative z-10 animate-fade-in">
        <div className="space-y-4">
          <Heart className="w-20 h-20 mx-auto text-primary animate-pulse-slow" fill="currentColor" />
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
            Yami
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Mi Negra
          </p>
        </div>

        <div className="space-y-4 text-foreground/80 leading-relaxed">
          <p className="text-lg">
            Sé que cometí errores y que todo nos termino lastimando.
          </p>
          <p className="text-lg">
            Me equivoque e inicie mal, Solo quiero pedirte perdon y que veas lo que siento por vos.
          </p>
          <p className="text-lg font-medium text-primary">
            Cada momento a tu lado ha sido especial, y quiero recordártelo.
          </p>
        </div>

        <Button
          onClick={() => navigate("/gallery")}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg px-8 py-6 rounded-full"
        >
          Nuestros Momentos
          <Heart className="ml-2 w-5 h-5" fill="currentColor" />
        </Button>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-100px) rotate(180deg);
            opacity: 0.3;
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Landing;
