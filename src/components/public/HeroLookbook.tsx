import { useStore } from "@/lib/store";
import { motion } from "framer-motion";

export function HeroLookbook() {
  const title = useStore((s) => s.settings.heroTitle);
  const heroImage = useStore((s) => s.settings.heroImage);
  const heroTextColor = useStore((s) => s.settings.heroTextColor);

  // Limpa o texto e divide em um array de letras (para animar uma a uma)
  const cleanTitle = title.replace(/\.$/, "");
  const letters = Array.from(cleanTitle);

  // Configuração do "Maestro" que controla o atraso entre as letras
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Tempo de espera entre cada letra (0.1s)
        delayChildren: 0.2,   // Tempo para iniciar a animação toda
      },
    },
  };

  // Configuração individual de cada letra (surgindo de baixo com leve desfoque)
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
        
        {/* Imagem com Efeito Ken Burns (Zoom lento contínuo substituindo o vídeo) */}
        <motion.img
          src={heroImage}
          alt="AGNUS.1993 Lookbook"
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

        {/* Suave gradiente para melhorar legibilidade da tipografia */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

        {/* Container do Texto Animado */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
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
                {/* Preserva espaços em branco entre palavras se você digitar frases compostas */}
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}

            {/* Ponto Final Dourado com entrada em cascata e pulso contínuo posterior */}
            <motion.span variants={letterVariants} className="inline-block">
              <motion.span
                className="text-[color:var(--gold)] inline-block"
                animate={{
                  opacity: [1, 0.4, 1],
                  textShadow: [
                    "0px 0px 0px rgba(183,151,102,0)",
                    "0px 0px 20px rgba(183,151,102,0.6)",
                    "0px 0px 0px rgba(183,151,102,0)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.5, // Só começa a pulsar depois que a palavra terminou de surgir
                }}
              >
                .
              </motion.span>
            </motion.span>
            
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
