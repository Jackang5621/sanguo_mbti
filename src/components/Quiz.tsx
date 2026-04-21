import { motion, AnimatePresence } from "motion/react";
import { questions, Option } from "../data/questions";

type QuizProps = {
  currentQuestionIndex: number;
  onAnswer: (value: string) => void;
};

export default function Quiz({ currentQuestionIndex, onAnswer }: QuizProps) {
  const currentQ = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  return (
    <div className="flex-1 flex flex-col p-6 w-full max-w-4xl mx-auto items-center justify-center">
      
      {/* Progress Bar Container */}
      <div className="w-full max-w-2xl mb-16">
        <div className="flex justify-between items-center text-[10px] tracking-widest uppercase opacity-50 font-bold mb-4">
          <span>Question 0{currentQuestionIndex + 1}</span>
          <span>{progress.toFixed(0)}% Complete</span>
        </div>
        <div className="h-px w-full bg-[#1A1A1A]/10 relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-[#1A1A1A]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="w-full max-w-2xl relative min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col"
          >
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-16 leading-tight">
              {currentQ.text}
            </h2>

            <div className="flex flex-col gap-4 w-full">
              {currentQ.options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ backgroundColor: '#1A1A1A', color: 'white' }}
                  onClick={() => onAnswer(option.value)}
                  className="w-full text-left p-6 border border-[#1A1A1A]/10 bg-transparent transition-colors duration-200 text-lg md:text-xl group"
                >
                  <div className="flex items-start">
                    <span className="font-sans text-xs tracking-widest uppercase opacity-40 group-hover:opacity-100 mr-6 mt-1">
                      {index === 0 ? 'Opt. A' : 'Opt. B'}
                    </span>
                    <span className="leading-relaxed">
                      {option.text}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
