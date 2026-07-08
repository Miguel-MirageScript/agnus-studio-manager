import type { ReactNode } from "react";
import type { ThemeKey } from "@/lib/store";
import { cn } from "@/lib/utils";

export interface ThemeCard {
  root: string;
  imageWrap: string;
  title: string;
  price: string;
  button: string;
  buttonIcon: string;
  body?: string;
  imgClass?: string;
  overlay?: ReactNode;
  frame?: ReactNode;
  autoWidthButton?: boolean;
  disableHoverLift?: boolean;
}

export interface ThemeMeta {
  key: ThemeKey;
  label: string;
  hint: string;
  swatch: string;
}

// ============================================================================
// META (para o seletor no admin)
// ============================================================================
export const THEMES_META: ThemeMeta[] = [
  { key: "minimalist-luxury", label: "Luxo Minimalista", hint: "Bordas douradas finas, serifada elegante, muito respiro", swatch: "linear-gradient(135deg,#faf8f3,#b79766)" },
  { key: "neo-brutalism", label: "Neo-Brutalismo", hint: "Bordas pretas 4px, cores vibrantes, sombras duras", swatch: "linear-gradient(135deg,#FFF200,#000)" },
  { key: "cyberpunk", label: "Cyberpunk", hint: "Dark, neon ciano/magenta, glitch, monospace", swatch: "linear-gradient(135deg,#22d3ee,#e879f9)" },
  { key: "vintage-polaroid", label: "Polaroid Vintage", hint: "Moldura branca, fita adesiva, escrita à mão", swatch: "linear-gradient(135deg,#fdfaf1,#f6e8b1)" },
  { key: "y2k", label: "Y2K Aesthetic", hint: "Cromado, bolhas, holográfico", swatch: "linear-gradient(135deg,#c0c0c0,#ff9ff3)" },
  { key: "swiss-grid", label: "Swiss Grid", hint: "Grid estrito, Helvetica gigante, zero borda", swatch: "linear-gradient(135deg,#ffffff,#0a0a0a)" },
  { key: "grunge-street", label: "Grunge Street", hint: "Bordas rasgadas, fita, tipografia áspera", swatch: "linear-gradient(135deg,#1a1a1a,#8b0000)" },
  { key: "glassmorphism", label: "Glassmorphism", hint: "Blur extremo, translúcido, esferas de luz", swatch: "linear-gradient(135deg,rgba(255,255,255,0.6),rgba(150,200,255,0.4))" },
  { key: "arcade-8bit", label: "Arcade 8-Bit", hint: "Pixel art, fonte retro chunky, cores CRT", swatch: "linear-gradient(135deg,#00ff88,#ff00ff)" },
  { key: "high-fashion", label: "High Fashion", hint: "Editorial de revista, drop cap, assimetria", swatch: "linear-gradient(135deg,#fafafa,#c9bfa3)" },
  { key: "tactical-techwear", label: "Tactical Techwear", hint: "Stencil militar, verde oliva, barcode", swatch: "linear-gradient(135deg,#3d4a2f,#1a1a1a)" },
  { key: "neumorphism", label: "Neumorfismo", hint: "Extrusão plástica soft, monocromático", swatch: "linear-gradient(135deg,#e6e7ee,#c5c6cc)" },
  { key: "holographic-foil", label: "Foil Holográfico", hint: "Shimmer animado em tudo", swatch: "linear-gradient(135deg,#ff00cc,#00ffee,#ffee00)" },
  { key: "kraft-paper", label: "Papel Kraft", hint: "Papelão cru, marrom, carimbos", swatch: "linear-gradient(135deg,#c9a678,#7a5230)" },
  { key: "caution-industrial", label: "Caution Industrial", hint: "Listras amarelo/preto de perigo", swatch: "linear-gradient(135deg,#FFEB00,#000)" },
  { key: "acid-wash", label: "Acid Wash", hint: "Gradientes líquidos psicodélicos", swatch: "linear-gradient(135deg,#ff00aa,#00ffcc,#aa00ff)" },
  { key: "blueprint", label: "Blueprint", hint: "Azul técnico, monospace branco, linhas", swatch: "linear-gradient(135deg,#0d3b66,#ffffff)" },
  { key: "pop-art", label: "Pop Art", hint: "Halftone, balões de fala, cores primárias", swatch: "linear-gradient(135deg,#ff0055,#ffee00)" },
  { key: "dark-elegance", label: "Dark Elegance", hint: "Preto puro, acentos prata sutis", swatch: "linear-gradient(135deg,#000000,#c0c0c0)" },
  { key: "vaporwave", label: "Vaporwave", hint: "Pôr-do-sol gradiente, grid, serif 90s", swatch: "linear-gradient(135deg,#ff71ce,#01cdfe,#b967ff)" },
];

// ============================================================================
// CARDS — visual do container do produto
// ============================================================================
export const THEME_CARDS: Record<ThemeKey, ThemeCard> = {
  "minimalist-luxury": {
    root: "bg-white rounded-none border border-[color:var(--gold)]/40 shadow-[0_1px_0_0_rgba(183,151,102,0.4)]",
    imageWrap: "bg-[#faf8f3]",
    title: "font-display italic text-xl text-neutral-900",
    price: "font-serif text-sm text-[color:var(--gold)] tracking-widest",
    button: "border border-[color:var(--gold)] bg-transparent text-neutral-900 rounded-none px-6 py-3 font-serif tracking-[0.35em] uppercase text-[10px] hover:bg-[color:var(--gold)] hover:text-white transition",
    buttonIcon: "bg-[color:var(--gold)] text-white rounded-none w-6 h-6",
    body: "px-6 py-6",
  },
  "neo-brutalism": {
    root: "bg-[#FFF200] border-[4px] border-black rounded-none shadow-[8px_8px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all",
    imageWrap: "bg-white border-b-[4px] border-black",
    title: "font-black text-lg uppercase tracking-tight text-black",
    price: "font-mono font-black text-lg text-black",
    button: "border-[3px] border-black bg-white text-black rounded-none px-4 py-3 shadow-[4px_4px_0_0_#000] hover:shadow-[1px_1px_0_0_#000] hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-[#00FF88] transition-all font-black uppercase tracking-widest text-xs",
    buttonIcon: "bg-black text-[#00FF88] rounded-none border-2 border-black w-8 h-8",
    disableHoverLift: true,
  },
  cyberpunk: {
    root: "bg-[#05010e] border border-fuchsia-500/60 rounded-lg overflow-hidden relative shadow-[0_0_25px_rgba(217,70,239,0.35)] hover:shadow-[0_0_40px_rgba(217,70,239,0.7)] transition-shadow",
    imageWrap: "bg-gradient-to-br from-[#1a0530] to-[#050510] border-b border-cyan-400/40",
    title: "font-mono font-bold uppercase tracking-[0.2em] text-sm text-cyan-300 [text-shadow:0_0_6px_#22d3ee]",
    price: "font-mono font-bold text-sm text-fuchsia-300 [text-shadow:0_0_6px_#e879f9]",
    button: "border border-cyan-400 bg-transparent text-cyan-300 rounded-md px-4 py-3 font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-cyan-400 hover:text-black hover-glitch [text-shadow:0_0_4px_currentColor] transition-colors",
    buttonIcon: "bg-fuchsia-500 text-black rounded-md w-7 h-7 [box-shadow:0_0_10px_#e879f9]",
    imgClass: "opacity-95 saturate-[1.15]",
    overlay: (
      <>
        <span className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-cyan-400/0 via-cyan-400/70 to-cyan-400/0" aria-hidden />
        <span className="absolute top-0 right-0 h-full w-[2px] bg-gradient-to-b from-fuchsia-500/0 via-fuchsia-500/70 to-fuchsia-500/0" aria-hidden />
      </>
    ),
  },
  "vintage-polaroid": {
    root: "bg-[#fdfaf1] rounded-none pt-4 px-4 pb-12 shadow-[0_10px_25px_-8px_rgba(0,0,0,0.35)] relative border border-neutral-200",
    imageWrap: "bg-neutral-100 rounded-none border border-black/5",
    title: "font-script text-2xl text-neutral-800 leading-none",
    price: "font-mono text-sm text-neutral-600",
    button: "border border-neutral-900/70 bg-white text-neutral-900 rounded-none px-4 py-3 font-sans text-[11px] tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-colors",
    buttonIcon: "bg-[#25D366] text-white rounded-none w-7 h-7",
    body: "pt-6 pb-2",
    overlay: (
      <span
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-[#f6e8b1]/85 rotate-[-3deg] shadow-sm border border-[#e2ce7d]/60 z-20"
        aria-hidden
      />
    ),
  },
  y2k: {
    root: "rounded-3xl border-[3px] border-transparent p-[3px] bg-[linear-gradient(135deg,#c0c0c0,#f0f0f0,#a0a0a0,#e6e6ff,#c0c0c0)] shadow-[0_10px_25px_rgba(120,120,180,0.35)]",
    imageWrap: "bg-gradient-to-br from-sky-100 via-white to-pink-100 rounded-t-2xl",
    title: "font-sans font-black uppercase italic text-lg text-[#3d3d90] [text-shadow:1px_1px_0_#fff]",
    price: "font-mono text-sm text-fuchsia-500",
    button: "bg-[linear-gradient(180deg,#ff9ff3_0%,#f368e0_100%)] text-white rounded-full px-5 py-3 font-black uppercase tracking-widest text-[11px] border-2 border-white shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_10px_rgba(243,104,224,0.5)] hover:brightness-110 transition",
    buttonIcon: "bg-white text-fuchsia-500 rounded-full w-6 h-6",
  },
  "swiss-grid": {
    root: "bg-white rounded-none border-0 shadow-none",
    imageWrap: "bg-[#e8ecff] rounded-none",
    title: "font-sans font-bold text-2xl uppercase tracking-tight text-black leading-none",
    price: "font-mono text-base text-neutral-500",
    button: "border-b-2 border-black bg-transparent text-black rounded-none px-0 py-3 font-sans uppercase tracking-[0.3em] text-[11px] font-bold hover:tracking-[0.4em] transition-all",
    buttonIcon: "bg-black text-white rounded-none w-6 h-6",
    body: "py-5 items-start",
    autoWidthButton: true,
    frame: (
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(0deg, transparent 24px, #0044ff 25px), linear-gradient(90deg, transparent 24px, #0044ff 25px)",
        backgroundSize: "25px 25px",
      }} aria-hidden />
    ),
  },
  "grunge-street": {
    root: "bg-[#1a1a1a] rounded-none border-[3px] border-black relative shadow-[0_6px_20px_rgba(0,0,0,0.6)]",
    imageWrap: "bg-[#111] border-b-[3px] border-black relative",
    title: "font-black uppercase tracking-tight text-lg text-[#e5e0d5] [text-shadow:2px_2px_0_#000,-1px_-1px_0_#8b0000]",
    price: "font-mono text-sm text-neutral-400",
    button: "border-[3px] border-neutral-200 bg-transparent text-neutral-100 rounded-none px-4 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-neutral-200 hover:text-black transition",
    buttonIcon: "bg-neutral-200 text-black rounded-none w-6 h-6",
    imgClass: "contrast-125 saturate-75",
    frame: (
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-60"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22><filter id=%22n%22><feTurbulence baseFrequency=%220.9%22 numOctaves=%222%22 seed=%223%22/><feColorMatrix values=%220 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0 0.05  0 0 0 0.6 0%22/></filter><rect width=%22200%22 height=%22200%22 filter=%22url(%23n)%22/></svg>')",
        }}
        aria-hidden
      />
    ),
  },
  glassmorphism: {
    root: "bg-white/20 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_rgba(255,255,255,0.15),0_20px_40px_rgba(0,0,0,0.12)] hover:bg-white/30 transition-all relative overflow-hidden",
    imageWrap: "bg-white/10 rounded-t-3xl border-b border-white/30",
    title: "font-display italic text-lg text-neutral-900 drop-shadow-sm",
    price: "font-mono text-sm text-neutral-700",
    button: "border border-white/60 bg-white/30 text-neutral-900 rounded-full px-5 py-3 backdrop-blur-md font-bold uppercase tracking-widest text-[11px] hover:bg-white/50 transition-colors",
    buttonIcon: "bg-neutral-900 text-white rounded-full w-7 h-7",
    frame: (
      <>
        <span className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-cyan-300/40 blur-2xl pointer-events-none" aria-hidden />
        <span className="absolute -bottom-8 -right-8 w-24 h-24 rounded-full bg-fuchsia-300/40 blur-2xl pointer-events-none" aria-hidden />
      </>
    ),
  },
  "arcade-8bit": {
    root: "bg-[#0a0a2a] rounded-none border-0 relative",
    imageWrap: "bg-black border-4 border-[#00ff88]",
    title: "font-mono uppercase tracking-widest text-sm text-[#00ff88] [text-shadow:2px_2px_0_#ff00ff]",
    price: "font-mono text-sm text-[#ffee00]",
    button: "bg-[#ff00ff] text-white rounded-none px-4 py-3 font-mono uppercase tracking-widest text-[11px] font-black border-4 border-[#00ff88] hover:bg-[#00ff88] hover:text-black hover:border-[#ff00ff] transition-colors",
    buttonIcon: "bg-[#ffee00] text-black rounded-none w-6 h-6 border-2 border-black",
    imgClass: "pixelated",
    frame: (
      <div className="absolute inset-0 pointer-events-none border-4 border-[#00ff88]" style={{
        clipPath: "polygon(0 4px, 4px 4px, 4px 0, calc(100% - 4px) 0, calc(100% - 4px) 4px, 100% 4px, 100% calc(100% - 4px), calc(100% - 4px) calc(100% - 4px), calc(100% - 4px) 100%, 4px 100%, 4px calc(100% - 4px), 0 calc(100% - 4px))",
      }} aria-hidden />
    ),
  },
  "high-fashion": {
    root: "bg-[#fafafa] rounded-none border-t-[6px] border-black relative shadow-none",
    imageWrap: "bg-white",
    title: "font-display text-3xl leading-none text-black tracking-tight",
    price: "font-serif italic text-sm text-neutral-500 mt-2",
    button: "bg-transparent text-black rounded-none px-0 py-2 font-serif italic tracking-wide text-sm hover:text-[color:var(--gold)] transition underline underline-offset-8 decoration-[color:var(--gold)]",
    buttonIcon: "bg-black text-white rounded-full w-6 h-6",
    body: "px-6 py-6 items-start",
    autoWidthButton: true,
  },
  "tactical-techwear": {
    root: "bg-[#2a2f22] rounded-none border border-[#5a6a3f] relative",
    imageWrap: "bg-[#1a1f14] border-b border-[#5a6a3f]",
    title: "font-mono uppercase tracking-[0.25em] text-sm text-[#c4d47a] font-black",
    price: "font-mono text-sm text-[#a4b06a]",
    button: "border border-[#c4d47a] bg-transparent text-[#c4d47a] rounded-none px-4 py-3 font-mono uppercase tracking-[0.3em] text-[10px] hover:bg-[#c4d47a] hover:text-black transition",
    buttonIcon: "bg-[#c4d47a] text-black rounded-none w-6 h-6",
    frame: (
      <>
        <span className="absolute top-1 left-1 h-2 w-2 border-t border-l border-[#c4d47a]" aria-hidden />
        <span className="absolute top-1 right-1 h-2 w-2 border-t border-r border-[#c4d47a]" aria-hidden />
        <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-[#c4d47a]" aria-hidden />
        <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-[#c4d47a]" aria-hidden />
      </>
    ),
  },
  neumorphism: {
    root: "bg-[#e6e7ee] rounded-3xl shadow-[10px_10px_20px_#c5c6cc,-10px_-10px_20px_#ffffff]",
    imageWrap: "bg-[#e6e7ee] rounded-t-3xl shadow-[inset_6px_6px_12px_#c5c6cc,inset_-6px_-6px_12px_#ffffff]",
    title: "font-sans font-semibold text-base text-neutral-700",
    price: "font-mono text-sm text-neutral-500",
    button: "bg-[#e6e7ee] text-neutral-800 rounded-full px-4 py-3 text-[11px] tracking-widest uppercase font-bold shadow-[5px_5px_10px_#c5c6cc,-5px_-5px_10px_#ffffff] hover:shadow-[inset_3px_3px_6px_#c5c6cc,inset_-3px_-3px_6px_#ffffff] transition-all",
    buttonIcon: "bg-[#e6e7ee] text-emerald-600 rounded-full w-6 h-6 shadow-[inset_2px_2px_4px_#c5c6cc,inset_-2px_-2px_4px_#ffffff]",
  },
  "holographic-foil": {
    root: "rounded-2xl overflow-hidden border-2 border-white/80 bg-holo animate-holo shadow-[0_10px_30px_rgba(255,0,204,0.4)]",
    imageWrap: "bg-white/60 backdrop-blur-sm",
    title: "font-black uppercase tracking-tight text-lg text-white mix-blend-difference",
    price: "font-mono text-sm text-white mix-blend-difference",
    button: "bg-white/85 backdrop-blur text-black rounded-full px-5 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-white transition",
    buttonIcon: "bg-black text-white rounded-full w-6 h-6",
  },
  "kraft-paper": {
    root: "bg-kraft rounded-none border-y-[3px] border-neutral-900/60 relative",
    imageWrap: "bg-white/70 border-b-[3px] border-neutral-900/40 border-dashed",
    title: "font-mono uppercase tracking-widest text-sm text-neutral-900 font-black",
    price: "font-mono text-xs text-neutral-800",
    button: "border-2 border-dashed border-neutral-900 bg-transparent text-neutral-900 rounded-none px-4 py-3 font-mono uppercase tracking-widest text-[10px] hover:bg-neutral-900 hover:text-[#c9a678] transition",
    buttonIcon: "bg-neutral-900 text-[#c9a678] rounded-none w-6 h-6",
  },
  "caution-industrial": {
    root: "bg-black rounded-none border-y-[6px] border-transparent relative",
    imageWrap: "bg-white relative",
    title: "font-black uppercase tracking-widest text-lg text-[#FFEB00] [text-shadow:2px_2px_0_#000]",
    price: "font-mono text-sm text-white",
    button: "bg-[#FFEB00] text-black rounded-none px-4 py-3 font-black uppercase tracking-widest text-[11px] border-2 border-black hover:bg-black hover:text-[#FFEB00] hover:border-[#FFEB00] transition",
    buttonIcon: "bg-black text-[#FFEB00] rounded-none w-6 h-6 border border-[#FFEB00]",
    frame: (
      <>
        <div className="absolute top-0 inset-x-0 h-2" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFEB00 0 12px,#000 12px 24px)" }} aria-hidden />
        <div className="absolute bottom-0 inset-x-0 h-2" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFEB00 0 12px,#000 12px 24px)" }} aria-hidden />
      </>
    ),
  },
  "acid-wash": {
    root: "rounded-3xl overflow-hidden relative border-0 shadow-[0_15px_40px_rgba(170,0,255,0.35)]",
    imageWrap: "relative",
    title: "font-display italic text-xl text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.5)]",
    price: "font-mono text-sm text-[#ffee00] [text-shadow:0_0_8px_#ff00cc]",
    button: "bg-white/90 backdrop-blur text-black rounded-full px-5 py-3 font-black uppercase tracking-widest text-[11px] hover:bg-white transition",
    buttonIcon: "bg-gradient-to-br from-fuchsia-500 to-cyan-400 text-white rounded-full w-6 h-6",
    frame: (
      <div className="absolute inset-0 pointer-events-none -z-0 animate-holo" style={{
        background: "conic-gradient(from 0deg,#ff00aa,#00ffcc,#aa00ff,#ffee00,#ff00aa)",
        filter: "blur(30px)",
        opacity: 0.6,
      }} aria-hidden />
    ),
  },
  blueprint: {
    root: "bg-[#0d3b66] border border-white/40 rounded-md bg-grid relative",
    imageWrap: "bg-[#124a80] border-b border-white/30",
    title: "font-mono uppercase tracking-widest text-sm text-white",
    price: "font-mono text-xs text-cyan-200",
    button: "border border-white/70 bg-transparent text-white rounded-none px-4 py-3 font-mono uppercase tracking-[0.25em] text-[10px] hover:bg-white hover:text-[#0d3b66] transition",
    buttonIcon: "bg-white text-[#0d3b66] rounded-none w-6 h-6",
    imgClass: "opacity-90",
    frame: (
      <>
        <span className="absolute top-1 left-1 text-white/50 font-mono text-[8px] tracking-widest">01</span>
        <span className="absolute bottom-1 right-1 text-white/50 font-mono text-[8px] tracking-widest">A/93</span>
      </>
    ),
  },
  "pop-art": {
    root: "bg-[#ffee00] rounded-none border-[3px] border-black relative shadow-[6px_6px_0_0_#ff0055]",
    imageWrap: "bg-white border-b-[3px] border-black relative overflow-hidden",
    title: "font-black uppercase tracking-tight text-xl text-black [text-shadow:2px_2px_0_#ff0055]",
    price: "font-mono font-black text-lg text-[#ff0055]",
    button: "bg-[#ff0055] text-white rounded-full px-5 py-3 font-black uppercase tracking-widest text-[11px] border-[3px] border-black hover:bg-black hover:text-[#ffee00] transition",
    buttonIcon: "bg-white text-black rounded-full w-6 h-6 border-2 border-black",
    frame: (
      <div className="absolute inset-0 pointer-events-none opacity-25" style={{
        backgroundImage: "radial-gradient(circle,#000 20%,transparent 21%)",
        backgroundSize: "8px 8px",
      }} aria-hidden />
    ),
  },
  "dark-elegance": {
    root: "bg-black rounded-none border border-[#c0c0c0]/30 relative",
    imageWrap: "bg-[#0a0a0a] border-b border-[#c0c0c0]/20",
    title: "font-display italic text-xl text-[#e5e5e5]",
    price: "font-serif text-sm text-[#c0c0c0] tracking-widest",
    button: "border border-[#c0c0c0]/70 bg-transparent text-[#e5e5e5] rounded-none px-5 py-3 font-serif tracking-[0.35em] uppercase text-[10px] hover:bg-[#c0c0c0] hover:text-black transition",
    buttonIcon: "bg-[#c0c0c0] text-black rounded-none w-6 h-6",
  },
  vaporwave: {
    root: "rounded-xl relative overflow-hidden border border-pink-300/60 shadow-[0_0_30px_rgba(236,72,153,0.4)]",
    imageWrap: "bg-gradient-to-b from-[#ff71ce] via-[#b967ff] to-[#01cdfe] border-b border-pink-400/40",
    title: "font-display italic text-xl text-white [text-shadow:0_0_10px_#ff71ce]",
    price: "font-mono text-sm text-[#01cdfe] [text-shadow:0_0_8px_#01cdfe]",
    button: "bg-gradient-to-r from-[#ff71ce] to-[#01cdfe] text-white rounded-md px-4 py-3 font-mono uppercase tracking-[0.25em] text-[10px] font-black hover:brightness-125 transition",
    buttonIcon: "bg-white text-[#b967ff] rounded-md w-6 h-6",
    frame: (
      <div className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none opacity-60" style={{
        background: "repeating-linear-gradient(0deg, transparent 0 14px, rgba(255,113,206,0.5) 14px 15px), repeating-linear-gradient(90deg, transparent 0 14px, rgba(1,205,254,0.4) 14px 15px)",
        maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
      }} aria-hidden />
    ),
  },
};

// ============================================================================
// CATEGORY HEADINGS
// ============================================================================
export function renderCategoryHeading(theme: ThemeKey, name: string, className?: string) {
  const trimmed = name.trim();
  const c = (extra: string) => cn(extra, className);

  switch (theme) {
    case "minimalist-luxury":
      return (
        <h2 className={c("font-display italic text-4xl md:text-5xl text-neutral-900")}>
          <span className="text-[color:var(--gold)]">—</span> {trimmed}
        </h2>
      );
    case "neo-brutalism":
      return (
        <div className={c("inline-block bg-[#FFF200] border-[4px] border-black px-5 py-2 shadow-[6px_6px_0_0_#000] -rotate-1")}>
          <h2 className="font-black uppercase text-3xl md:text-4xl text-black tracking-tight">{trimmed}</h2>
        </div>
      );
    case "cyberpunk":
      return (
        <div className={c("relative inline-block")}>
          <h2 className="font-mono font-black uppercase text-3xl md:text-4xl text-cyan-300 [text-shadow:0_0_10px_#22d3ee,0_0_25px_#22d3ee]">{trimmed}</h2>
          <h2 aria-hidden className="absolute inset-0 font-mono font-black uppercase text-3xl md:text-4xl text-fuchsia-500 mix-blend-screen translate-x-[3px] opacity-70 animate-neon">{trimmed}</h2>
        </div>
      );
    case "vintage-polaroid":
      return (
        <h2 className={c("font-script text-5xl md:text-6xl text-neutral-800 -rotate-2 inline-block")}>{trimmed}</h2>
      );
    case "y2k":
      return (
        <h2 className={c("font-sans font-black italic uppercase text-4xl md:text-6xl text-transparent bg-clip-text")} style={{
          backgroundImage: "linear-gradient(180deg,#e6e6ff,#c0c0c0 45%,#8080a0 60%,#e6e6ff)",
          WebkitTextStroke: "1px #6060a0",
        }}>{trimmed}</h2>
      );
    case "swiss-grid":
      return (
        <h2 className={c("font-sans font-black uppercase tracking-tighter text-5xl md:text-7xl text-black leading-none")}>{trimmed}<span className="text-[#0044ff]">.</span></h2>
      );
    case "grunge-street":
      return (
        <div className={c("inline-block relative")}>
          <h2 className="font-black uppercase text-4xl md:text-5xl text-[#e5e0d5] [text-shadow:3px_3px_0_#000,-2px_-2px_0_#8b0000]">{trimmed}</h2>
          <span className="absolute -top-2 -right-6 rotate-12 bg-[#8b0000] text-white font-mono text-[8px] px-2 py-0.5 uppercase tracking-widest">XXX</span>
        </div>
      );
    case "glassmorphism":
      return (
        <h2 className={c("font-display italic text-4xl md:text-5xl text-neutral-900 backdrop-blur-lg bg-white/30 inline-block px-6 py-2 rounded-2xl border border-white/50")}>{trimmed}</h2>
      );
    case "arcade-8bit":
      return (
        <h2 className={c("font-mono font-black uppercase tracking-widest text-2xl md:text-3xl text-[#00ff88] bg-black inline-block px-4 py-3 border-4 border-[#ff00ff] [text-shadow:2px_2px_0_#ff00ff]")}>{"> "}{trimmed}</h2>
      );
    case "high-fashion": {
      const first = trimmed.charAt(0);
      const rest = trimmed.slice(1);
      return (
        <h2 className={c("font-display text-5xl md:text-7xl leading-none text-black")}>
          <span className="italic text-[color:var(--gold)]">{first}</span>{rest}
        </h2>
      );
    }
    case "tactical-techwear":
      return (
        <h2 className={c("font-mono font-black uppercase tracking-[0.4em] text-2xl md:text-3xl text-[#c4d47a] bg-[#2a2f22] inline-block px-4 py-2 border border-[#c4d47a]")}>[{trimmed}]</h2>
      );
    case "neumorphism":
      return (
        <h2 className={c("font-sans font-bold text-3xl md:text-4xl text-neutral-700 bg-[#e6e7ee] inline-block px-6 py-3 rounded-full shadow-[8px_8px_16px_#c5c6cc,-8px_-8px_16px_#ffffff]")}>{trimmed}</h2>
      );
    case "holographic-foil":
      return (
        <h2 className={c("font-black uppercase text-4xl md:text-6xl bg-clip-text text-transparent bg-holo animate-holo")}>{trimmed}</h2>
      );
    case "kraft-paper":
      return (
        <div className={c("inline-block border-2 border-neutral-900 border-dashed px-4 py-2 bg-kraft -rotate-1")}>
          <h2 className="font-mono font-black uppercase tracking-widest text-2xl text-neutral-900">{trimmed}</h2>
        </div>
      );
    case "caution-industrial":
      return (
        <div className={c("relative inline-block")}>
          <div className="py-3 px-2 -rotate-1 border-y-4 border-black" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFEB00 0 20px,#000 20px 40px)" }}>
            <div className="bg-[#FFEB00] px-4 py-1.5 border-y-2 border-black">
              <h2 className="font-black uppercase tracking-widest text-2xl md:text-3xl text-black">⚠ {trimmed}</h2>
            </div>
          </div>
        </div>
      );
    case "acid-wash":
      return (
        <h2 className={c("font-display italic text-5xl md:text-7xl bg-clip-text text-transparent animate-holo")} style={{
          backgroundImage: "conic-gradient(from 0deg,#ff00aa,#00ffcc,#aa00ff,#ffee00,#ff00aa)",
        }}>{trimmed}</h2>
      );
    case "blueprint":
      return (
        <h2 className={c("font-mono uppercase text-2xl md:text-3xl text-white tracking-widest inline-flex items-center gap-3")}>
          <span className="text-cyan-300">┌</span>{trimmed}<span className="text-cyan-300">┐</span>
        </h2>
      );
    case "pop-art":
      return (
        <div className={c("relative inline-block")}>
          <h2 className="font-black uppercase text-4xl md:text-6xl text-[#ff0055] [text-shadow:4px_4px_0_#000,6px_6px_0_#ffee00]">POW! {trimmed}</h2>
        </div>
      );
    case "dark-elegance":
      return (
        <h2 className={c("font-display italic text-4xl md:text-5xl text-[#e5e5e5]")}>
          <span className="text-[#c0c0c0] mr-3">◆</span>{trimmed}
        </h2>
      );
    case "vaporwave":
      return (
        <h2 className={c("font-display italic text-5xl md:text-7xl bg-clip-text text-transparent [text-shadow:none]")} style={{
          backgroundImage: "linear-gradient(180deg,#ff71ce 0%,#b967ff 50%,#01cdfe 100%)",
        }}>{trimmed}</h2>
      );
  }
}

// ============================================================================
// HANGTAGS — etiqueta que aparece sobre a imagem do produto
// ============================================================================
export function renderHangtag(theme: ThemeKey, label: string) {
  if (!label) return null;
  const upper = label;

  switch (theme) {
    case "minimalist-luxury":
      return (
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-white/95 border border-[color:var(--gold)] px-3 py-1.5 shadow-sm">
            <span className="font-serif text-[9px] tracking-[0.3em] uppercase text-neutral-900">{upper}</span>
          </div>
        </div>
      );
    case "neo-brutalism":
      return (
        <div className="absolute top-3 -left-2 z-20">
          <div className="bg-[#ff0055] text-white border-[3px] border-black px-3 py-1.5 shadow-[4px_4px_0_0_#000] -rotate-3">
            <span className="font-black text-[10px] uppercase tracking-widest">{upper}</span>
          </div>
        </div>
      );
    case "cyberpunk":
      return (
        <div className="absolute top-4 right-4 z-20">
          <div className="bg-black/85 border border-fuchsia-400 rounded-sm px-3 py-1.5" style={{ boxShadow: "0 0 8px #f0f, inset 0 0 6px rgba(255,0,255,0.3)" }}>
            <span className="font-mono text-[9px] font-black tracking-[0.3em] uppercase text-cyan-300 animate-neon">{upper}</span>
          </div>
        </div>
      );
    case "vintage-polaroid":
      return (
        <div className="absolute bottom-4 right-4 z-20 rotate-[-4deg]">
          <div className="bg-white border border-neutral-300 px-3 py-1 shadow-md">
            <span className="font-script text-lg text-neutral-800 leading-none">{upper}</span>
          </div>
        </div>
      );
    case "y2k":
      return (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative overflow-hidden bg-holo animate-holo rounded-full px-4 py-1.5 shadow-[0_4px_20px_rgba(255,0,204,0.5)] ring-2 ring-white/80">
            <span className="relative font-black text-[9px] tracking-widest uppercase text-white mix-blend-difference">{upper}</span>
          </div>
        </div>
      );
    case "swiss-grid":
      return (
        <div className="absolute top-3 left-3 z-20">
          <span className="font-sans font-black text-[10px] uppercase tracking-widest text-[#0044ff] bg-white px-2 py-1 border-l-2 border-[#0044ff]">{upper}</span>
        </div>
      );
    case "grunge-street":
      return (
        <div className="absolute top-6 -left-3 z-20 rotate-[-8deg]">
          <div className="bg-neutral-100 px-4 py-1 border-y-2 border-neutral-900" style={{ boxShadow: "0 2px 6px rgba(0,0,0,0.4)" }}>
            <span className="font-black text-[10px] uppercase tracking-widest text-neutral-900" style={{ textShadow: "1px 1px 0 #8b0000" }}>{upper}</span>
          </div>
        </div>
      );
    case "glassmorphism":
      return (
        <div className="absolute top-4 left-4 z-20">
          <div className="rounded-full px-3 py-1.5 backdrop-blur-xl border border-white/70 bg-white/30 shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-900">{upper}</span>
          </div>
        </div>
      );
    case "arcade-8bit":
      return (
        <div className="absolute top-2 right-2 z-20">
          <div className="bg-[#ffee00] border-2 border-black px-2 py-1">
            <span className="font-mono font-black text-[10px] uppercase text-black tracking-widest">★{upper}</span>
          </div>
        </div>
      );
    case "high-fashion":
      return (
        <div className="absolute bottom-4 left-4 z-20 rotate-[-90deg] origin-bottom-left translate-y-[-1rem]">
          <span className="font-serif italic text-[10px] tracking-[0.4em] uppercase text-black">— {upper}</span>
        </div>
      );
    case "tactical-techwear":
      return (
        <div className="absolute top-3 right-3 z-20">
          <div className="bg-black border border-[#c4d47a] px-2 py-1 flex items-center gap-1.5">
            <div className="h-3 w-6 bg-barcode" />
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#c4d47a] font-black">{upper}</span>
          </div>
        </div>
      );
    case "neumorphism":
      return (
        <div className="absolute top-4 right-4 z-20">
          <div className="rounded-full px-3 py-1.5 bg-[#e6e7ee] shadow-[4px_4px_8px_#c5c6cc,-4px_-4px_8px_#ffffff]">
            <span className="font-sans font-bold text-[9px] uppercase tracking-widest text-neutral-700">{upper}</span>
          </div>
        </div>
      );
    case "holographic-foil":
      return (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative rounded-full h-14 w-14 flex items-center justify-center overflow-hidden bg-holo animate-holo border-2 border-white/80 shadow-[0_6px_20px_rgba(255,0,255,0.5)]">
            <div className="absolute inset-1 rounded-full border border-white/60" />
            <span className="relative text-center text-[7px] font-black uppercase tracking-[0.15em] leading-tight text-white mix-blend-difference px-1">AUTH<br />{upper}</span>
          </div>
        </div>
      );
    case "kraft-paper":
      return (
        <div className="absolute top-3 right-3 z-20 flex flex-col items-center">
          <span className="block h-4 w-px bg-neutral-700" />
          <div className="bg-kraft px-3 py-1.5 border border-neutral-800 shadow-md" style={{ clipPath: "polygon(50% 0,100% 20%,100% 100%,0 100%,0 20%)" }}>
            <span className="absolute top-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-neutral-900 border border-neutral-700" />
            <p className="pt-2 text-[8px] font-black tracking-[0.2em] uppercase text-neutral-900 font-mono">{upper}</p>
          </div>
        </div>
      );
    case "caution-industrial":
      return (
        <div className="absolute top-4 -left-2 z-20 -rotate-6">
          <div className="border-y-2 border-black py-1" style={{ backgroundImage: "repeating-linear-gradient(45deg,#FFEB00 0 8px,#000 8px 16px)" }}>
            <div className="bg-[#FFEB00] border-y border-black px-3 py-0.5">
              <span className="font-black text-[10px] uppercase tracking-widest text-black">⚠ {upper}</span>
            </div>
          </div>
        </div>
      );
    case "acid-wash":
      return (
        <div className="absolute top-4 right-4 z-20">
          <div className="rounded-full px-4 py-1.5 animate-holo" style={{
            background: "conic-gradient(from 0deg,#ff00aa,#00ffcc,#aa00ff,#ffee00)",
            boxShadow: "0 4px 20px rgba(255,0,170,0.5)",
          }}>
            <span className="font-black text-[9px] uppercase tracking-widest text-white mix-blend-difference">{upper}</span>
          </div>
        </div>
      );
    case "blueprint":
      return (
        <div className="absolute bottom-3 left-3 z-20">
          <div className="border border-white/70 bg-[#0d3b66] px-2 py-1 flex items-center gap-2">
            <span className="font-mono text-[8px] text-cyan-300">SPEC</span>
            <span className="font-mono text-[9px] font-black uppercase text-white tracking-widest">{upper}</span>
          </div>
        </div>
      );
    case "pop-art":
      return (
        <div className="absolute top-3 right-3 z-20">
          <div className="relative bg-white border-[3px] border-black rounded-[50%_50%_50%_10%] px-4 py-2 shadow-[3px_3px_0_0_#000]">
            <span className="font-black text-[11px] uppercase text-black">{upper}!</span>
          </div>
        </div>
      );
    case "dark-elegance":
      return (
        <div className="absolute bottom-4 left-4 z-20">
          <div className="bg-black border border-[#c0c0c0]/60 px-3 py-1">
            <span className="font-serif italic text-[9px] tracking-[0.35em] uppercase text-[#c0c0c0]">{upper}</span>
          </div>
        </div>
      );
    case "vaporwave":
      return (
        <div className="absolute top-4 left-4 z-20">
          <div className="rounded-md px-3 py-1.5 bg-gradient-to-r from-[#ff71ce] via-[#b967ff] to-[#01cdfe] border border-white/60 shadow-[0_0_15px_rgba(255,113,206,0.6)]">
            <span className="font-mono font-black text-[9px] uppercase tracking-widest text-white [text-shadow:0_0_6px_#000]">{upper}</span>
          </div>
        </div>
      );
  }
}
