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
        .sort((a, b) => a.score - b.score)
        .map((score) => (
          <p key={score.name}>
            {score.name} : {score.score}/10
          </p>
        ))}
      <button onClick={props.handleSubmit}>Play again</button>
    </div>
  );
}

export default Leaderboard;
