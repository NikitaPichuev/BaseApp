import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Flame, Share2, RotateCcw, Zap, Trophy, WalletCards, Skull, TrendingUp } from 'lucide-react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const CARDS = [
  {
    ticker: 'BALD2',
    name: 'Bald Again',
    signal: 'CTO alive, Base replies under every post',
    risk: 82,
    correct: 'ape',
    tag: 'meme',
  },
  {
    ticker: 'SAFE',
    name: 'Audit Enjoyer',
    signal: '18-page litepaper, no memes, founder says "utility"',
    risk: 31,
    correct: 'fade',
    tag: 'normie',
  },
  {
    ticker: 'WARP',
    name: 'Warpcast Casino',
    signal: 'Every holder can roast the next buyer on-chain',
    risk: 74,
    correct: 'ape',
    tag: 'social',
  },
  {
    ticker: 'GRANT',
    name: 'Base Grant Farmer',
    signal: 'Team promises future rewards, asks for $3 entry now',
    risk: 91,
    correct: 'fade',
    tag: 'red flag',
  },
  {
    ticker: 'BLUE',
    name: 'Blue Button',
    signal: 'One tap, instant score, clean mobile loop',
    risk: 58,
    correct: 'ape',
    tag: 'simple',
  },
  {
    ticker: 'ROAD',
    name: 'Roadmap Maxi',
    signal: 'Q4: token. Q1: game. Q2: users. No prototype.',
    risk: 88,
    correct: 'fade',
    tag: 'paper',
  },
  {
    ticker: 'FOMO',
    name: 'Last Click Wins',
    signal: 'Pot resets every 60 seconds, public leaderboard',
    risk: 77,
    correct: 'ape',
    tag: 'viral',
  },
  {
    ticker: 'DAO',
    name: 'Committee Quest',
    signal: 'Players vote 3 days before anything happens',
    risk: 42,
    correct: 'fade',
    tag: 'slow',
  },
];

const ROASTS = [
  'NGMI. Ты зафейдил сигнал и купил тишину.',
  'Слишком аккуратно. Так не рождаются скрины.',
  'Рука дрогнула, депозит заплакал.',
  'Base видит всё. Даже этот мисклик.',
];

const FLEX = [
  'Chad read. Screenshot-worthy.',
  'Чистый инстинкт. Лента должна это увидеть.',
  'Ты нажал как человек, который видел три цикла.',
  'LFG. Очко в копилку социальной доминации.',
];

function shuffleDeck() {
  return [...CARDS].sort(() => Math.random() - 0.5);
}

function App() {
  const [deck, setDeck] = useState(() => shuffleDeck());
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [feedback, setFeedback] = useState('Свайпай или жми: APE, если веришь в сигнал. FADE, если пахнет сливом.');
  const [motion, setMotion] = useState('');
  const [dragX, setDragX] = useState(0);
  const [best, setBest] = useState(() => Number(localStorage.getItem('apeBest') || 0));
  const startX = useRef(null);

  const current = deck[index];
  const finished = lives <= 0 || index >= deck.length;

  const rank = useMemo(() => {
    if (score >= 7) return 'On-chain menace';
    if (score >= 5) return 'Base Chad';
    if (score >= 3) return 'Careful degen';
    return 'Fresh wallet';
  }, [score]);

  useEffect(() => {
    if (score > best) {
      localStorage.setItem('apeBest', String(score));
      setBest(score);
    }
  }, [score, best]);

  function resolve(choice) {
    if (!current || finished) return;
    const hit = choice === current.correct;
    setMotion(choice === 'ape' ? 'throw-right' : 'throw-left');

    window.setTimeout(() => {
      setScore((value) => value + (hit ? 1 : 0));
      setStreak((value) => (hit ? value + 1 : 0));
      setLives((value) => (hit ? value : value - 1));
      const pool = hit ? FLEX : ROASTS;
      setFeedback(pool[Math.floor(Math.random() * pool.length)]);
      setIndex((value) => value + 1);
      setDragX(0);
      setMotion('');
    }, 220);
  }

  function resetGame() {
    setDeck(shuffleDeck());
    setIndex(0);
    setScore(0);
    setStreak(0);
    setLives(3);
    setFeedback('Новая попытка. Быстро читай сигнал и принимай сторону.');
    setDragX(0);
    setMotion('');
  }

  async function shareResult() {
    const text = `I scored ${score}/${CARDS.length} in Ape or Fade on Base. Rank: ${rank}.`;
    if (navigator.share) {
      await navigator.share({ title: 'Ape or Fade', text });
      return;
    }
    await navigator.clipboard.writeText(text);
    setFeedback('Результат скопирован. Можно кидать в Telegram или X.');
  }

  function onPointerDown(event) {
    startX.current = event.clientX;
  }

  function onPointerMove(event) {
    if (startX.current === null || finished) return;
    setDragX(Math.max(-110, Math.min(110, event.clientX - startX.current)));
  }

  function onPointerUp() {
    if (startX.current === null || finished) return;
    if (dragX > 55) resolve('ape');
    else if (dragX < -55) resolve('fade');
    else setDragX(0);
    startX.current = null;
  }

  return (
    <main className="app-shell">
      <section className="topbar" aria-label="Статус игры">
        <div>
          <span className="eyebrow">Base mini-game MVP</span>
          <h1>Ape or Fade</h1>
        </div>
        <button className="icon-button" onClick={resetGame} aria-label="Начать заново" title="Начать заново">
          <RotateCcw size={20} />
        </button>
      </section>

      <section className="stats-grid" aria-label="Очки">
        <div className="stat">
          <Trophy size={18} />
          <span>{score}</span>
          <small>score</small>
        </div>
        <div className="stat">
          <Flame size={18} />
          <span>{streak}</span>
          <small>streak</small>
        </div>
        <div className="stat">
          <Skull size={18} />
          <span>{lives}</span>
          <small>lives</small>
        </div>
        <div className="stat">
          <WalletCards size={18} />
          <span>{best}</span>
          <small>best</small>
        </div>
      </section>

      <section className={`arena ${motion}`} aria-live="polite">
        {!finished && current ? (
          <article
            className="token-card"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            style={{
              transform: `translateX(${dragX}px) rotate(${dragX / 12}deg)`,
            }}
          >
            <div className="card-head">
              <div className="coin-mark">{current.ticker.slice(0, 2)}</div>
              <div>
                <span className="tag">{current.tag}</span>
                <h2>${current.ticker}</h2>
              </div>
            </div>
            <p className="token-name">{current.name}</p>
            <p className="signal">{current.signal}</p>
            <div className="risk-row">
              <span>Risk heat</span>
              <strong>{current.risk}%</strong>
            </div>
            <div className="meter">
              <span style={{ width: `${current.risk}%` }} />
            </div>
          </article>
        ) : (
          <article className="result-panel">
            <Zap size={34} />
            <h2>{rank}</h2>
            <p>Результат: {score}/{CARDS.length}. Лучший: {best}.</p>
            <div className="result-actions">
              <button onClick={shareResult}>
                <Share2 size={18} />
                Share
              </button>
              <button onClick={resetGame}>
                <RotateCcw size={18} />
                Retry
              </button>
            </div>
          </article>
        )}
      </section>

      <section className="decision-row" aria-label="Выбор">
        <button className="fade-button" disabled={finished} onClick={() => resolve('fade')}>
          FADE
        </button>
        <button className="ape-button" disabled={finished} onClick={() => resolve('ape')}>
          APE
        </button>
      </section>

      <section className="feed">
        <TrendingUp size={18} />
        <p>{feedback}</p>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
