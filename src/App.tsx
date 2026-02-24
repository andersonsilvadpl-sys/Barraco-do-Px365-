import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Beer, 
  Frown, 
  Smile, 
  Zap, 
  PartyPopper, 
  Coffee, 
  Flame, 
  ChevronRight, 
  Award, 
  History, 
  MessageCircle,
  ShoppingCart,
  MapPin,
  Trophy
} from 'lucide-react';

// --- Types ---
type Mood = 'sad' | 'happy' | 'tired' | 'celebrating' | 'relaxing' | 'stressed';

interface Recommendation {
  mood: string;
  suggestion: string;
  brands: string[];
  phrase: string;
  icon: React.ReactNode;
}

// --- Constants ---
const RECOMMENDATIONS: Record<Mood, Recommendation> = {
  sad: {
    mood: "Dia Triste",
    suggestion: "1 torre de 2L pra chamar os amigos ou 2 long necks pra começar leve",
    brands: ["Brahma", "Skol"],
    phrase: "Tristeza não resiste a chopp gelado.",
    icon: <Frown className="w-12 h-12 text-blue-400" />
  },
  happy: {
    mood: "Dia Alegre",
    suggestion: "Torre 2L + petisco ou Combo comemoração",
    brands: ["Heineken", "Stella Artois"],
    phrase: "Hoje a conta é dividida, mas a alegria é multiplicada!",
    icon: <Smile className="w-12 h-12 text-yellow-400" />
  },
  tired: {
    mood: "Dia Cansativo",
    suggestion: "1 puro malte trincando ou 2 latas pra relaxar",
    brands: ["Budweiser", "Antarctica"],
    phrase: "Você trabalhou. Agora é sua vez de descansar.",
    icon: <Zap className="w-12 h-12 text-orange-400" />
  },
  celebrating: {
    mood: "Dia de Comemoração",
    suggestion: "Balde de Long Neck ou Torre de 3L",
    brands: ["Corona", "Eisenbahn"],
    phrase: "Brinde ao que passou e ao que está por vir!",
    icon: <PartyPopper className="w-12 h-12 text-pink-400" />
  },
  relaxing: {
    mood: "Só Relaxar",
    suggestion: "Chopp de Vinho ou Weiss gelada",
    brands: ["Colorado", "Petra"],
    phrase: "O tempo para quando o copo está cheio.",
    icon: <Coffee className="w-12 h-12 text-green-400" />
  },
  stressed: {
    mood: "Estressado Demais",
    suggestion: "IPA amarga pra equilibrar ou 3 chopps rápidos",
    brands: ["Lagunitas", "Baden Baden"],
    phrase: "Amargor só na cerveja, na vida a gente relaxa.",
    icon: <Flame className="w-12 h-12 text-red-500" />
  }
};

// --- Components ---

const BeerTowerAnimation = () => (
  <div className="relative w-32 h-64 mx-auto mb-8">
    {/* Base */}
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-8 bg-zinc-800 rounded-t-lg border-t border-zinc-600" />
    {/* Glass Container */}
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-16 h-48 bg-white/10 rounded-full border border-white/20 overflow-hidden">
      {/* Beer Liquid */}
      <motion.div 
        initial={{ height: 0 }}
        animate={{ height: '85%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-0 w-full bg-gradient-to-t from-beer-yellow to-beer-neon"
      >
        {/* Bubbles */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: -200, opacity: [0, 1, 0] }}
            transition={{ 
              duration: 1.5 + Math.random(), 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{ left: `${Math.random() * 100}%` }}
          />
        ))}
      </motion.div>
      {/* Foam */}
      <motion.div 
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute top-[15%] w-full h-4 bg-white/90 blur-[2px]" 
      />
    </div>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<'splash' | 'mood' | 'result' | 'order' | 'loyalty'>('splash');
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [points, setPoints] = useState(7);

  const handleMoodSelect = (mood: Mood) => {
    setSelectedMood(mood);
    setScreen('result');
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent("Bora pro PX365 que hoje é dia de torre! 🍺");
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative overflow-hidden">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-beer-yellow rounded-full flex items-center justify-center">
            <Beer className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">Barraco do PX365</h1>
            <div className="flex items-center gap-1 text-[10px] text-beer-yellow">
              <MapPin className="w-3 h-3" />
              <span>Rua da Resenha, 365</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end">
            <span className="text-[10px] opacity-60 uppercase tracking-wider">Ranking</span>
            <div className="flex items-center gap-1 text-beer-yellow">
              <Trophy className="w-3 h-3" />
              <span className="text-xs font-bold">#1</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col p-6 relative z-10">
        <AnimatePresence mode="wait">
          {screen === 'splash' && (
            <motion.div 
              key="splash"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex-1 flex flex-col items-center justify-center text-center"
            >
              <BeerTowerAnimation />
              <h2 className="text-4xl font-black mb-2 neon-text italic">PX Mood Beer</h2>
              <p className="text-beer-neon font-medium mb-12 italic">"Sentiu, escolheu, gelou!"</p>
              
              <button 
                onClick={() => setScreen('mood')}
                className="group relative px-8 py-4 bg-beer-yellow text-black font-black rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  COMO VOCÊ TÁ HOJE?
                  <ChevronRight className="w-5 h-5" />
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
            </motion.div>
          )}

          {screen === 'mood' && (
            <motion.div 
              key="mood"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="flex-1 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Qual o clima de hoje?</h3>
              <div className="grid grid-cols-2 gap-4">
                {(Object.keys(RECOMMENDATIONS) as Mood[]).map((moodKey) => (
                  <button
                    key={moodKey}
                    onClick={() => handleMoodSelect(moodKey)}
                    className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-beer-yellow transition-all flex flex-col items-center gap-3 group"
                  >
                    <div className="group-hover:scale-110 transition-transform">
                      {RECOMMENDATIONS[moodKey].icon}
                    </div>
                    <span className="font-medium text-sm">{RECOMMENDATIONS[moodKey].mood}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'result' && selectedMood && (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex-1 flex flex-col items-center text-center py-8"
            >
              <div className="mb-6 p-6 rounded-full bg-beer-yellow/10 border border-beer-yellow/30">
                {RECOMMENDATIONS[selectedMood].icon}
              </div>
              <h3 className="text-3xl font-black mb-4 text-beer-yellow italic">{RECOMMENDATIONS[selectedMood].mood}</h3>
              
              <div className="wood-panel p-6 rounded-3xl border border-white/10 mb-8 w-full">
                <p className="text-lg font-medium mb-4 leading-relaxed">
                  {RECOMMENDATIONS[selectedMood].suggestion}
                </p>
                <div className="flex justify-center gap-4 mb-6">
                  {RECOMMENDATIONS[selectedMood].brands.map(brand => (
                    <span key={brand} className="px-4 py-1 rounded-full bg-white/10 text-xs font-bold border border-white/20">
                      {brand}
                    </span>
                  ))}
                </div>
                <p className="text-sm italic opacity-70">
                  "{RECOMMENDATIONS[selectedMood].phrase}"
                </p>
              </div>

              <div className="flex flex-col gap-3 w-full">
                <button 
                  onClick={() => setScreen('order')}
                  className="w-full py-4 bg-beer-yellow text-black font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-beer-yellow/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  PEDIR AGORA
                </button>
                <button 
                  onClick={() => setScreen('mood')}
                  className="w-full py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10"
                >
                  MUDAR O HUMOR
                </button>
              </div>
            </motion.div>
          )}

          {screen === 'order' && (
            <motion.div 
              key="order"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-8 text-center">Como quer receber?</h3>
              <div className="space-y-4">
                {[
                  { id: 'counter', label: 'Retirar no Balcão', icon: <Beer className="w-6 h-6" /> },
                  { id: 'cashier', label: 'Pagar no Caixa', icon: <ShoppingCart className="w-6 h-6" /> },
                  { id: 'points', label: 'Acumular Pontos', icon: <Award className="w-6 h-6" /> }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setScreen('loyalty')}
                    className="w-full p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-all"
                  >
                    <div className="p-3 rounded-xl bg-beer-yellow/20 text-beer-yellow">
                      {option.icon}
                    </div>
                    <span className="text-lg font-bold">{option.label}</span>
                    <ChevronRight className="ml-auto w-5 h-5 opacity-40" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {screen === 'loyalty' && (
            <motion.div 
              key="loyalty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center text-center"
            >
              <div className="w-24 h-24 bg-beer-yellow rounded-full flex items-center justify-center mb-6 shadow-xl shadow-beer-yellow/20">
                <Award className="w-12 h-12 text-black" />
              </div>
              <h3 className="text-2xl font-black mb-2">Seu Cartão Fidelidade</h3>
              <p className="text-sm opacity-60 mb-8">A cada 10 cervejas, ganhe 1 grátis!</p>

              <div className="grid grid-cols-5 gap-3 mb-8">
                {[...Array(10)].map((_, i) => (
                  <div 
                    key={i}
                    className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-all ${
                      i < points 
                        ? 'bg-beer-yellow border-beer-yellow text-black' 
                        : 'bg-white/5 border-white/10 text-white/20'
                    }`}
                  >
                    <Beer className="w-6 h-6" />
                  </div>
                ))}
              </div>

              <div className="wood-panel p-6 rounded-3xl border border-white/10 w-full mb-8">
                <p className="text-sm font-bold mb-1">Faltam apenas</p>
                <p className="text-4xl font-black text-beer-yellow">{10 - points}</p>
                <p className="text-sm opacity-60">cervejas para sua recompensa!</p>
              </div>

              <button 
                onClick={() => setScreen('splash')}
                className="w-full py-4 bg-beer-yellow text-black font-black rounded-2xl"
              >
                VOLTAR AO INÍCIO
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-black/60 backdrop-blur-xl border-t border-white/10 z-10">
        <div className="flex justify-around items-center mb-4">
          <button className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity">
            <History className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-tighter">Histórico</span>
          </button>
          <button 
            onClick={() => setScreen('loyalty')}
            className="flex flex-col items-center gap-1 text-beer-yellow"
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-tighter">Pontos</span>
          </button>
          <button 
            onClick={shareOnWhatsApp}
            className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
          >
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] uppercase font-bold tracking-tighter">Resenha</span>
          </button>
        </div>
        <div className="bg-beer-yellow/10 rounded-xl p-3 border border-beer-yellow/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-beer-yellow" />
            <span className="text-xs font-bold">PROMO DO DIA:</span>
          </div>
          <span className="text-xs font-black italic">Torre 2L + Batata = R$ 49,90</span>
        </div>
      </footer>
    </div>
  );
}
