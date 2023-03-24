import { MouseEventHandler } from 'react';
import './App.css';
import { Score } from './helpers/types';

function Leaderboard(props: {
  scores: Score[];
  handleSubmit: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="App">
      <h1>Top Mülltrenners</h1>
      <div>
        <table>
          <tbody>
            <tr>
              <th>Ranking</th>
              <th>Name</th>
              <th>Score</th>
            </tr>

            {props.scores
              .sort((a, b) => b.correct - a.correct)
              .map((score, i) => (
                <tr key={i + score.name}>
                  <td>{i + 1}</td>
                  <td>{score.name}</td>
                  <td>
                    {score.correct}/{score.total}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button onClick={props.handleSubmit}>Play again!</button>
    </div>
  );
}

export default Leaderboard;
