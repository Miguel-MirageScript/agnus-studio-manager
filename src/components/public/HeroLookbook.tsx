import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

export function HeroLookbook() {
  const title = useStore((s) => s.settings.heroTitle);
  const heroImage = useStore((s) => s.settings.heroImage);
  const heroTextColor = useStore((s) => s.settings.heroTextColor);

  // Lê exatamente o que você digitou no painel (sem adicionar pontos forçados)
  const letters = Array.from(title);

  // Controle do tempo da animação de entrada (mais lento e dramático)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, // Aumentado de 0.1 para 0.25 segundos por letra
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 14,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-[oklch(0.96_0.005_85)]">
      <div className="relative aspect-[16/10] md:aspect-[21/9] w-full overflow-hidden bg-black">
        
        <motion.img
          src={heroImage}
          alt="Banner Principal"
          className="h-full w-full object-cover object-top opacity-90"
          width={1600}
          height={900}
          initial={{ scale: 1 }}
          animate={{ scale: 1.12 }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          {/* Este motion.div cuida do pulso (respiração) da palavra inteira */}
          <motion.div
            animate={{
              opacity: [1, 0.7, 1],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3, // Começa a pulsar apenas depois que as letras terminarem de entrar
            }}
          >
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="font-display text-[13vw] md:text-[9vw] leading-none font-bold tracking-tighter drop-shadow-2xl flex"
              style={{ color: heroTextColor }}
            >
              {letters.map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
