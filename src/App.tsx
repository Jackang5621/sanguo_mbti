import { useState, lazy, Suspense } from 'react';
import Landing from './components/Landing';
import { characters, Character } from './data/characters';
import { questions } from './data/questions';

// Code splitting: Load Quiz and Result components only when they are needed
const Quiz = lazy(() => import('./components/Quiz'));
const Result = lazy(() => import('./components/Result'));

export default function App() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'result'>('landing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [resultCharacter, setResultCharacter] = useState<Character | null>(null);

  const startQuiz = () => {
    setStep('quiz');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    
    if (currentQuestionIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Calculate Result
      const resultMbti = calculateMBTI(newAnswers);
      setResultCharacter(characters[resultMbti]);
      setStep('result');
    }
  };

  const calculateMBTI = (answeredValues: string[]) => {
    const counts: Record<string, number> = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    answeredValues.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
    });

    const mbti = [
      counts['E'] > counts['I'] ? 'E' : 'I',
      counts['S'] > counts['N'] ? 'S' : 'N',
      counts['T'] > counts['F'] ? 'T' : 'F',
      counts['J'] > counts['P'] ? 'J' : 'P'
    ].join('');
    
    return mbti;
  };

  const restartQuiz = () => {
    setStep('landing');
    setResultCharacter(null);
  };

  return (
    <div className="min-h-screen flex flex-col font-serif">
      {/* Header Navigation */}
      <nav className="h-16 border-b border-[#1A1A1A]/10 px-10 flex items-center justify-between shrink-0">
        <div className="text-xs tracking-[0.3em] uppercase font-bold">Romance of the Three Kingdoms MBTI</div>
        <div className="flex space-x-8 text-xs tracking-widest uppercase">
          <span className={step === 'landing' ? 'border-b border-[#1A1A1A] pb-1' : 'opacity-40'}>01 / 测验开始</span>
          <span className={step === 'quiz' ? 'border-b border-[#1A1A1A] pb-1' : 'opacity-40'}>02 / 人格解析</span>
          <span className={step === 'result' ? 'border-b border-[#1A1A1A] pb-1' : 'opacity-40'}>03 / 历史对应</span>
        </div>
      </nav>

      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center text-[#C00000] text-xs tracking-[0.3em] uppercase font-bold">
          加载中 / Loading...
        </div>
      }>
        {step === 'landing' && <Landing onStart={startQuiz} />}
        {step === 'quiz' && <Quiz currentQuestionIndex={currentQuestionIndex} onAnswer={handleAnswer} />}
        {step === 'result' && resultCharacter && <Result character={resultCharacter} onRestart={restartQuiz} />}
      </Suspense>
    </div>
  );
}
