import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import confetti from "canvas-confetti";
import { useCreateResponse } from "@/hooks/use-responses";
import { useToast } from "@/hooks/use-toast";
import { FloatingHearts } from "@/components/FloatingHearts";

export default function Proposal() {
  const [noBtnPosition, setNoBtnPosition] = useState({ x: 0, y: 0 });
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasHoveredNo, setHasHoveredNo] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const createResponse = useCreateResponse();

  const handleNoHover = () => {
    if (!containerRef.current) return;
    
    setHasHoveredNo(true);
    
    const containerRect = containerRef.current.getBoundingClientRect();
    const btnWidth = 100; // approx width
    const btnHeight = 50; // approx height
    
    // Calculate safe bounds within the container
    const maxX = containerRect.width / 2 - btnWidth;
    const maxY = containerRect.height / 2 - btnHeight;
    const minX = -maxX;
    const minY = -maxY;

    const newX = Math.random() * (maxX - minX) + minX;
    const newY = Math.random() * (maxY - minY) + minY;

    setNoBtnPosition({ x: newX, y: newY });
  };

  const handleYesClick = () => {
    triggerSuccess("YES");
  };

  const handleNoClick = () => {
    toast({
      title: "Wait a minute...",
      description: "Whoops, I guess it's opposite day! That counts as a YES! 😉",
      duration: 3000,
    });
    triggerSuccess("YES - Opposite Day");
  };

  const triggerSuccess = (answer: string) => {
    createResponse.mutate({ name: "Khushi", answer });
    setIsSuccess(true);
    
    // Fire confetti
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ff69b4', '#ff1493', '#ff0000']
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ff69b4', '#ff1493', '#ff0000']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden p-4"
    >
      <FloatingHearts />
      
      <div className="z-10 w-full max-w-2xl text-center">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-12"
            >
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                <div className="text-6xl md:text-8xl mb-6 animate-pulse">
                  💖
                </div>
                <h1 className="text-5xl md:text-7xl font-display text-primary drop-shadow-sm leading-tight">
                  Khushi...
                </h1>
                <h2 className="text-3xl md:text-5xl font-handwriting text-foreground mt-4">
                  Will you be my Valentine?
                </h2>
              </motion.div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-8 relative w-full h-40">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleYesClick}
                  className="
                    px-12 py-6 rounded-full text-3xl font-bold text-white
                    bg-gradient-to-r from-primary to-accent
                    shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/50
                    transition-all duration-300 heart-beat z-20
                  "
                >
                  YES!
                </motion.button>

                <motion.button
                  animate={hasHoveredNo ? { x: noBtnPosition.x, y: noBtnPosition.y } : {}}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  onMouseEnter={handleNoHover}
                  onClick={handleNoClick}
                  className="
                    px-6 py-3 rounded-full text-lg font-medium text-muted-foreground
                    bg-white/80 border-2 border-muted
                    hover:bg-muted/50 transition-colors cursor-pointer
                    absolute md:static
                  "
                  style={{ position: hasHoveredNo ? 'absolute' : 'relative' }}
                >
                  no
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center gap-8 bg-white/60 backdrop-blur-sm p-12 rounded-[3rem] shadow-xl border border-white/50"
            >
              <motion.div 
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                className="text-8xl md:text-9xl filter drop-shadow-md"
              >
                🥰
              </motion.div>
              
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-display text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  Yay!!!
                </h1>
                <p className="text-2xl md:text-4xl font-handwriting text-foreground">
                  I knew you'd say yes! 💖
                </p>
              </div>

              <div className="flex gap-4 mt-8">
                <Heart className="text-primary w-12 h-12 fill-primary animate-bounce" style={{ animationDelay: "0s" }} />
                <Heart className="text-accent w-12 h-12 fill-accent animate-bounce" style={{ animationDelay: "0.1s" }} />
                <Heart className="text-primary w-12 h-12 fill-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
              
              <p className="text-muted-foreground text-sm font-body mt-4">
                (Screenshot this and send it to me!)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none z-[-1] opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-10 right-10 w-32 h-32 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-32 h-32 bg-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
}
