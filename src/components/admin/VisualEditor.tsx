import { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

type EditMode = "header" | "hero" | "grid" | "footer" | null;

export function VisualEditor() {
  const [editing, setEditing] = useState<EditMode>(null);

  return (
    <div className="pb-24">
      {/* CABEÇALHO DO EDITOR (Apenas informativo) */}
      <header className="mb-6">
        <h1 className="font-display text-2xl md:text-3xl text-foreground">Editor Visual — AGNUS.93</h1>
        <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
          <Icon icon="ph:hand-tap-duotone" className="w-4 h-4 text-[color:var(--gold)]" />
          Toque em qualquer elemento do site abaixo para editá-lo.
        </p>
      </header>

      {/* O SITE REAL RENDERIZADO DENTRO DO EDITOR */}
      <div className="w-full max-w-md mx-auto bg-white border border-black/10 rounded-[2rem] overflow-hidden shadow-2xl relative">
        
        {/* Barra de Status do "Celular" Simulado */}
        <div className="bg-black text-white text-[9px] uppercase tracking-[0.2em] p-2 text-center flex justify-center items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
          </span>
          Live Preview
        </div>

        <div className="bg-[oklch(0.97_0.005_85)] overflow-y-auto h-[70vh] relative scrollbar-hide">
          
          {/* 1. HEADER (CABEÇALHO) */}
          <div 
            onClick={() => setEditing("header")}
            className="relative group cursor-pointer hover:bg-black/5 transition-colors border-2 border-transparent hover:border-[color:var(--gold)] border-dashed"
          >
            <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded flex items-center gap-1 z-10 shadow-lg">
              <Icon icon="ph:pencil-simple" /> Editar
            </div>
            <header className="py-6 px-6 flex justify-between items-center pointer-events-none">
              <div className="text-xl tracking-[0.3em] font-serif text-[color:var(--gold)]">A G N U S . <sup className="text-[8px]">1993</sup></div>
              <Icon icon="ph:list" className="w-6 h-6 text-black/60" />
            </header>
          </div>

          {/* 2. HERO (LOOKBOOK LOOP) */}
          <div 
            onClick={() => setEditing("hero")}
            className="relative group cursor-pointer hover:bg-black/5 transition-colors border-2 border-transparent hover:border-[color:var(--gold)] border-dashed"
          >
            <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded flex items-center gap-1 z-10 shadow-lg">
              <Icon icon="ph:pencil-simple" /> Editar
            </div>
            <div className="bg-[#D9D1C7] h-[350px] w-full flex flex-col items-center justify-center relative pointer-events-none overflow-hidden">
               {/* Simulação da imagem/vídeo */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
               <h1 className="font-display text-5xl tracking-tighter text-black/90 z-10 drop-shadow-sm">LOOKBOOK.</h1>
               <p className="absolute bottom-6 font-mono text-xs tracking-widest text-black/80 font-semibold z-10">AGNUS. 1993</p>
            </div>
          </div>

          {/* 3. CATÁLOGO DE PRODUTOS (GRID) */}
          <div 
            onClick={() => setEditing("grid")}
            className="relative group cursor-pointer hover:bg-black/5 transition-colors border-2 border-transparent hover:border-[color:var(--gold)] border-dashed p-4"
          >
            <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded flex items-center gap-1 z-10 shadow-lg">
              <Icon icon="ph:pencil-simple" /> Editar
            </div>
            
            <div className="grid grid-cols-2 gap-4 pointer-events-none mt-2">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-black/5">
                <div className="aspect-[4/5] w-full bg-neutral-900 rounded-lg mb-3 flex items-center justify-center text-white/30 text-[10px] tracking-widest uppercase">Preta</div>
                <div className="flex justify-center mb-2"><span className="text-[8px] font-bold tracking-widest border border-green-200 bg-green-50 text-green-700 px-2 py-0.5 rounded-full">PRONTA ENTREGA</span></div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black mt-1">Oversized Tee</p>
                <p className="text-[10px] text-muted-foreground">$28.00</p>
              </div>
              
              <div className="bg-white p-3 rounded-xl shadow-sm border border-black/5">
                <div className="aspect-[4/5] w-full bg-neutral-100 rounded-lg mb-3 flex items-center justify-center text-black/30 text-[10px] tracking-widest uppercase">Branca</div>
                <div className="flex justify-center mb-2"><span className="text-[8px] font-bold tracking-widest border border-red-200 bg-red-50 text-red-700 px-2 py-0.5 rounded-full">LIMITADO</span></div>
                <p className="text-[9px] font-bold uppercase tracking-widest text-black mt-1">Classic Tee</p>
                <p className="text-[10px] text-muted-foreground">$26.00</p>
              </div>
            </div>
          </div>

          {/* 4. FOOTER (RODAPÉ) */}
          <div 
            onClick={() => setEditing("footer")}
            className="relative group cursor-pointer hover:bg-black/5 transition-colors border-2 border-transparent hover:border-[color:var(--gold)] border-dashed"
          >
            <div className="absolute top-2 right-2 bg-black text-white text-[9px] font-bold px-2 py-1 tracking-widest uppercase rounded flex items-center gap-1 z-10 shadow-lg">
              <Icon icon="ph:pencil-simple" /> Editar
            </div>
            <footer className="py-12 px-6 border-t border-black/10 flex flex-col items-center gap-4 pointer-events-none">
              <div className="flex gap-4">
                <Icon icon="ph:instagram-logo" className="w-5 h-5 text-black/60" />
                <Icon icon="ph:whatsapp-logo" className="w-5 h-5 text-black/60" />
              </div>
              <div className="text-[10px] tracking-brand text-black/40 uppercase">© 2026 AGNUS.1993</div>
            </footer>
          </div>
        </div>
      </div>

      {/* MODAL DE EDIÇÃO (Aparece ao tocar em uma seção) */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-0 backdrop-blur-sm transition-all" onClick={() => setEditing(null)}>
          <div className="bg-white w-full max-w-md rounded-t-[2rem] p-6 pb-12 animate-in slide-in-from-bottom-10 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-black/10 rounded-full mx-auto mb-6"></div>
            
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-display text-xl flex items-center gap-2">
                <Icon icon="ph:sliders-horizontal-duotone" className="text-[color:var(--gold)]" />
                Editando: {editing.toUpperCase()}
              </h3>
              <button onClick={() => setEditing(null)} className="p-2 bg-black/5 rounded-full text-black/60 hover:text-black"><Icon icon="ph:x" className="w-4 h-4" /></button>
            </div>

            <div className="space-y-4">
              {editing === 'header' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2">Mensagem de Anúncio (Topo)</label>
                  <input type="text" placeholder="Ex: Frete Grátis" className="w-full border border-black/15 rounded-xl p-4 text-sm focus:border-black outline-none" />
                </div>
              )}
              
              {editing === 'hero' && (
                <>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2">Título do Banner</label>
                    <input type="text" defaultValue="LOOKBOOK." className="w-full border border-black/15 rounded-xl p-4 text-sm focus:border-black outline-none font-display" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2">Link do Vídeo / GIF</label>
                    <input type="text" placeholder="https://..." className="w-full border border-black/15 rounded-xl p-4 text-sm focus:border-black outline-none" />
                  </div>
                </>
              )}

              {editing === 'grid' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2">Estilo do Cartão</label>
                  <select className="w-full border border-black/15 rounded-xl p-4 text-sm focus:border-black outline-none bg-white">
                    <option>Cartão Branco com Borda</option>
                    <option>Fundo Transparente (Minimalista)</option>
                  </select>
                </div>
              )}

              {editing === 'footer' && (
                <div>
                  <label className="block text-[10px] uppercase tracking-widest font-bold text-black/60 mb-2">Link do Instagram</label>
                  <input type="text" defaultValue="https://instagram.com/agnus.1993" className="w-full border border-black/15 rounded-xl p-4 text-sm focus:border-black outline-none" />
                </div>
              )}
            </div>

            <button onClick={() => setEditing(null)} className="w-full mt-8 bg-black text-white text-[10px] font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg hover:bg-[color:var(--gold)] transition-colors">
              Salvar Alterações
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
