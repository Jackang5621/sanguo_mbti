import { motion } from "motion/react";
import { Character } from "../data/characters";
import { RotateCcw } from "lucide-react";

type ResultProps = {
  character: Character;
  onRestart: () => void;
};

export default function Result({ character, onRestart }: ResultProps) {
  return (
    <>
      <main className="flex-1 flex flex-col md:flex-row">
        {/* Left Column: Character Name & Type */}
        <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-[#1A1A1A]/10 p-8 md:p-12 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="text-[12px] uppercase tracking-[0.4em] mb-4 text-[#8B0000] font-bold">你的性格归宿</div>
            <h1 className="text-8xl md:text-[140px] leading-[0.9] font-black tracking-tighter">
              {character.name}
            </h1>
            <div className="flex items-center space-x-4 md:space-x-6 mt-6">
              <span className="text-3xl md:text-4xl italic font-light font-sans">{character.mbti}</span>
              <span className="h-px w-16 md:w-24 bg-[#1A1A1A]"></span>
              <span className="text-lg md:text-xl tracking-widest">{character.title}</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-md mt-12 md:mt-0"
          >
            <p className="text-xl md:text-2xl leading-relaxed mb-8 italic">
              “{character.quote}”
            </p>
            <p className="text-sm leading-loose opacity-70">
              {character.description}
            </p>
          </motion.div>
        </div>

        {/* Right Column: Details & Traits */}
        <div className="w-full md:w-1/2 bg-[#EBE7E0] p-8 md:p-12 flex flex-col justify-center items-center md:items-stretch">
          {/* Character Illustration Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[3/4] w-full max-w-[320px] bg-[#1A1A1A] mx-auto mb-12 relative flex items-center justify-center group overflow-hidden"
          >
            <div className="absolute inset-4 border border-white/20 z-20 pointer-events-none"></div>

            {/* Locally-rendered seal-style portrait (no external image requests) */}
            <div
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: [
                  'radial-gradient(circle at 30% 25%, rgba(192,0,0,0.55), transparent 55%)',
                  'radial-gradient(circle at 75% 80%, rgba(139,0,0,0.5), transparent 60%)',
                  'repeating-linear-gradient(135deg, rgba(255,255,255,0.04) 0 2px, transparent 2px 8px)',
                  'linear-gradient(180deg, #2a1515 0%, #1A1A1A 60%, #0c0606 100%)',
                ].join(', '),
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/20 to-transparent z-10"></div>

            <div className="flex flex-col items-center justify-center relative z-20">
              <div className="text-white text-[140px] md:text-[180px] leading-none font-black drop-shadow-xl">
                {character.name.charAt(0)}
              </div>
            </div>
            
            <div className="absolute bottom-8 left-8 text-white text-[10px] tracking-[0.5em] uppercase z-20">
              {character.mbti} / Trait System
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="grid grid-cols-2 gap-y-8 gap-x-12 px-2 md:px-8 w-full max-w-sm mx-auto md:max-w-none"
          >
            {character.traits.map((trait, idx) => (
              <div key={idx}>
                <div className="text-[10px] uppercase tracking-widest opacity-50 mb-2">特质 {idx + 1}</div>
                <div className="text-lg font-bold">{trait}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </main>

      {/* Footer Details */}
      <footer className="h-auto py-6 md:py-0 md:h-20 border-t border-[#1A1A1A]/10 px-6 md:px-10 flex flex-col md:flex-row items-center justify-between bg-white gap-6 md:gap-0">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12 text-center md:text-left">
          <div className="text-[10px] leading-tight">
            <span className="block opacity-40 uppercase mb-1">Character Profile</span>
            <span className="font-bold uppercase tracking-widest">{character.name}</span>
          </div>
        </div>
        <button
          onClick={onRestart}
          className="bg-[#C00000] text-white px-12 py-4 md:py-3 text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-black transition-colors"
        >
          重新测试 (Restart)
        </button>
      </footer>
    </>
  );
}
