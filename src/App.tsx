import { useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Landing';
import Game from './Game';
import Leaderboard from './Leaderboard';
import { Score } from './helpers/types';
import { fetchScores, postScore } from './helpers/api';
import { GAME_LENGTH } from './helpers/constants';

function App() {
  const [name, setName] = useState('');
  const [scores, setScores] = useState<Score[]>([]);
  const navigate = useNavigate();

  const handleNameSubmit = (name: string) => {
    setName(name);
    navigate('/play');
  };

  const handleGameSubmit = async (score: number) => {
    if (name !== '') {
      setScores((scores) => [
        ...scores,
        { name, correct: score, total: GAME_LENGTH }
      ]);
      await postScore({ name, correct: score + '', total: GAME_LENGTH + '' });
    }
    navigate('/leaderboard');
  };

  const handleNewGameSubmit = () => {
    setName('');
    navigate('/');
  };

  const loadScores = async () => {
    const scores = await fetchScores();
    setScores(scores);
  };

  useEffect(() => {
    loadScores();
  }, []);

  return (
    <div>
      <Routes>
        <Route
          index
          element={
            <Landing suggestedName={name} handleSubmit={handleNameSubmit} />
          }
        />
        <Route path="play" element={<Game handleSubmit={handleGameSubmit} />} />
        <Route
          path="leaderboard"
          element={
            <Leaderboard scores={scores} handleSubmit={handleNewGameSubmit} />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
