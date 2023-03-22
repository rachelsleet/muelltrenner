import { MouseEventHandler } from 'react';
import './App.css';
import { Score } from './helpers/types';

function Leaderboard(props: {
  scores: Score[];
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="App">
      <h1>Scores</h1>
      {props.scores
        .sort((a, b) => b.correct - a.correct)
        .map((score) => (
          <p key={score.name}>
            {score.name} : {score.correct}/{score.total}
          </p>
        ))}
      <button onClick={props.handleSubmit}>Play again</button>
    </div>
  );
}

export default Leaderboard;
