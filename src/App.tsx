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
  const initialScores: Score[] = [];
  const [scores, setScores] = useState(initialScores);
  const navigate = useNavigate();

  const handleNameSubmit = (name: string) => {
    setName(name);
    navigate('/play');
  };

  const handleGameSubmit = async (score: number) => {
    setScores((scores) => [
      ...scores,
      { name, correct: score, total: GAME_LENGTH }
    ]);
    await postScore({ name, correct: score + '', total: GAME_LENGTH + '' });
    navigate('/leaderboard');
  };

  const handleNewGameSubmit = () => {
    setName('');
    navigate('/');
  };

  useEffect(() => {
    const dataFetch = async () => {
      const scores = await fetchScores();
      setScores(scores);
    };
    dataFetch();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route index element={<Landing handleSubmit={handleNameSubmit} />} />
        <Route
          path="play"
          element={<Game name={name} handleSubmit={handleGameSubmit} />}
        />
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
