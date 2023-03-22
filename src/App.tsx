import { useState } from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Landing from './Landing';
import Game from './Game';
import Leaderboard from './Leaderboard';
import { Score } from './helpers/types';

function App() {
  const [name, setName] = useState('');
  const initialScores: Score[] = [];
  const [scores, setScores] = useState(initialScores);
  const navigate = useNavigate();

  const handleNameSubmit = (name: string) => {
    setName(name);
    navigate('/play');
  };

  const handleGameSubmit = (score: number) => {
    scores.push({ name, score });
    navigate('/leaderboard');
  };

  const handleNewGameSubmit = () => {
    setName('');
    navigate('/');
  };

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
