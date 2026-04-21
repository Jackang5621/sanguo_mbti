import { motion } from "motion/react";

type LandingProps = {
  onStart: () => void;
};

export default function Landing({ onStart }: LandingProps) {
  return (
    <div className="flex-1 flex flex-col w-full relative overflow-hidden">
      {/* Ink-wash warlord backdrop (CSS-only, no external assets) */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundColor: '#1A1A1A',
          backgroundImage: [
            'radial-gradient(ellipse 60% 45% at 20% 15%, rgba(192,0,0,0.35), transparent 70%)',
            'radial-gradient(ellipse 55% 50% at 85% 80%, rgba(139,0,0,0.45), transparent 70%)',
            'radial-gradient(ellipse 80% 40% at 50% 100%, rgba(0,0,0,0.9), transparent 75%)',
            'repeating-linear-gradient(115deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 9px)',
            'linear-gradient(180deg, #2a1a1a 0%, #1A1A1A 55%, #0f0a0a 100%)',
          ].join(', '),
          filter: 'contrast(115%) brightness(0.75)',
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#F7F3EE] via-[#F7F3EE]/80 to-transparent" />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#C00000]/10 to-transparent mix-blend-multiply" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <div className="text-[12px] uppercase tracking-[0.4em] mb-6 opacity-60 font-bold bg-[#1A1A1A] text-[#F7F3EE] px-4 py-1">
            Personality Test / Romance of the Three Kingdoms
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter text-[#1A1A1A] drop-shadow-lg">
            三国人格测试
          </h1>
          <h2 className="text-2xl md:text-3xl mb-12 italic opacity-90 text-[#C00000] font-bold">
            “群雄逐鹿，谁与争锋？”
          </h2>
          
          <p className="text-base md:text-lg leading-relaxed opacity-80 max-w-xl mx-auto mb-16 text-[#1A1A1A] font-medium bg-[#F7F3EE]/60 p-6 backdrop-blur-sm border border-[#1A1A1A]/10">
            在这波澜壮阔的乱世之中，隐藏着与你灵魂共鸣的本命英雄。<br />
            12道深度的场景抉择，揭开你底层心理偏好的MBTI密码，<br />
            在群雄逐鹿的战场上，寻找你的前世之影。
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStart}
            className="bg-[#C00000] text-white px-16 py-5 text-[14px] tracking-[0.3em] uppercase font-bold hover:bg-[#1A1A1A] transition-all duration-300 shadow-2xl"
          >
            入局测试 (START)
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
