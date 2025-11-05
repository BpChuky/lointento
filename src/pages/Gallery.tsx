import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Heart, Home, Play, Pause } from "lucide-react";

// Aquí puedes reemplazar estas URLs con tus propias fotos
const photos = [
  {
    url: "/images/1.jpg",
    caption: "Desde el primer día",
  },
  {
    url: "/images/2.jpg",
    caption: "Jugando a aprender",
  },
  {
    url: "/images/3.jpg",
    caption: "Donde sea y como sea",
  },
  {
    url: "/images/4-1.jpg",
    caption: "Sin miedo a hacer cosas nuevas",
  },
  {
    url: "/images/5.jpg",
    caption: "Siempre listos para el show",
  },
  {
    url: "/images/6.jpg",
    caption: "Aunque peleemos por cocinar",
  },
  {
    url: "/images/7.jpg",
    caption: "Abrazados bajo el sol",
  },
  {
    url: "/images/8.jpg",
    caption: "Comiendo y disfrutando a cada momento",
  },
  {
    url: "/images/8a9d5552e38b7c24cf8dd37a412ecc29.jpg",
    caption: "Podemos ser lindos y tiernos",
  },
  {
    url: "/images/9.jpg",
    caption: "Pero siempre sonriendo",
  },
  {
    url: "/images/10.jpg",
    caption: "PERO SIEMPRE JUNTOS",
  },
];

const Gallery = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prevPhoto();
      if (e.key === "ArrowRight") nextPhoto();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);
  useEffect(() => {
  const audio = audioRef.current;

  if (audio) {
    // Quita mute y trata de reproducir
    audio.muted = false;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      console.log("🎵 Autoplay bloqueado, esperando interacción del usuario...");

      // Si el navegador lo bloquea, reproducir al primer clic o toque
      const startMusic = () => {
        audio.play();
        setIsPlaying(true);
        window.removeEventListener("click", startMusic);
        window.removeEventListener("touchstart", startMusic);
      };

      window.addEventListener("click", startMusic);
      window.addEventListener("touchstart", startMusic);
    });
  }
  audio.volume = 0;
let fadeIn = setInterval(() => {
  if (audio.volume < 1) {
    audio.volume = Math.min(audio.volume + 0.05, 1);
  } else {
    clearInterval(fadeIn);
  }
}, 200);
}, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex flex-col">
      {/* Header */}
      <div className="p-4 md:p-6 flex justify-between items-center bg-card/50 backdrop-blur-sm border-b border-border/50">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="hover:bg-secondary/50"
        >
          <Home className="w-5 h-5 mr-2" />
          Volver
        </Button>
        
        <Button
          variant="ghost"
          onClick={toggleMusic}
          className="hover:bg-secondary/50"
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Pausar Música
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Reproducir Música
            </>
          )}
        </Button>
      </div>

      {/* Final message */}
      <div className="p-6 md:p-8 text-center bg-card/50 backdrop-blur-sm border-t border-border/50">
        <Heart className="w-8 h-8 mx-auto mb-4 text-primary" fill="currentColor" />
        <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto">
          Perdóname por lastimarte. Cada foto es un recuerdo de lo que significas para mí.
          <span className="block mt-2 text-primary font-medium">Te amo ❤️</span>
        </p>
      </div>

      {/* Gallery */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8">
        <div className="max-w-5xl w-full">
          <div className="relative aspect-video md:aspect-[16/10] bg-card/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-[var(--shadow-romantic)] animate-fade-in">
            {/* Photo */}
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].caption}
              className="w-full h-full object-cover transition-opacity duration-500"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <p className="text-white text-xl md:text-3xl font-light text-center drop-shadow-lg">
                {photos[currentIndex].caption}
              </p>
            </div>

            {/* Navigation arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 w-12 h-12 md:w-16 md:h-16 rounded-full"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-0 w-12 h-12 md:w-16 md:h-16 rounded-full"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </Button>

            {/* Hearts decoration */}
            <Heart
              className="absolute top-4 right-4 text-primary animate-pulse-slow w-8 h-8"
              fill="currentColor"
            />
          </div>

          {/* Progress indicators */}
          <div className="flex justify-center gap-2 mt-6">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "w-8 bg-primary"
                    : "w-2 bg-primary/30 hover:bg-primary/50"
                }`}
              />
            ))}
          </div>

          {/* Counter */}
          <p className="text-center mt-4 text-muted-foreground">
            {currentIndex + 1} de {photos.length}
          </p>
        </div>
      </div>

      

      {/* Audio element - Reemplaza esta URL con tu canción favorita */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        muted
        src="/music/Contra viento y marea- Las Pastillas del Abuelo (Acústico) con letra - Cyntia Gelvez.mp3"
      />

      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
  {[...Array(50)].map((_, i) => (
    <Heart
      key={i}
      className="absolute text-pink-400 opacity-20 animate-floating-heart"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 5}s`,
        transform: `scale(${Math.random() * 0.5 + 0.5})`,
      }}
      fill="currentColor"
    />
  ))}
</div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
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
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
            @keyframes floating-heart {
    0% {
      transform: translateY(100vh) scale(0.5);
      opacity: 0;
    }
    25% { opacity: 1; }
    100% {
      transform: translateY(-10vh) scale(1);
      opacity: 0;
    }
  }
  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }
  .animate-pulse-slow {
    animation: pulse-slow 3s ease-in-out infinite;
  }
  .animate-floating-heart {
    animation: floating-heart 8s ease-in-out infinite;
  }

      `}
      </style>
    </div>
  );
};

export default Gallery;
