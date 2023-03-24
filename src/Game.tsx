import { useState, useEffect } from 'react';
import './Game.css';
import { Bin, bins, Item } from './helpers/types';
// @ts-ignore
import data from './helpers/rawdata.csv';
import { GAME_LENGTH } from './helpers/constants';

const pickRandomItem = (data: Item[]) =>
  data[Math.round(Math.random() * (data.length - 1))];

const buildSentence = (item: String, bin: String) => {
  if (item.charAt(item.length - 1) === 's')
    return `${item} go in the ${bin} bin.`;
  return `${item} goes in the ${bin} bin.`;
};

function Game(props: { handleSubmit: Function }) {
  const [currentItem, setCurrentItem] = useState(pickRandomItem(data));
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [lastResultMessage, setLastResultMessage] = useState('');

  const handleBinClick = (binType: Bin) => {
    setTotal((total) => total + 1);
    if (currentItem.bin_eng.toLowerCase() === binType) {
      setScore((count) => count + 1);
      setLastResultMessage(
        `Correct! ${buildSentence(currentItem.item_eng, currentItem.bin_eng)}`
      );
    } else {
      setLastResultMessage(
        `Not quite. ${buildSentence(currentItem.item_eng, currentItem.bin_eng)}`
      );
    }
  };

  useEffect(() => {
    if (total === GAME_LENGTH) {
      props.handleSubmit(score);
    } else {
      const newItem = pickRandomItem(data);
      setCurrentItem(newItem);
    }
  }, [total]);

  return (
    <div className="Game">
      <div>
        <h2>
          Score: {score}/{GAME_LENGTH}
        </h2>
      </div>
      <h1>Pick the right bin:</h1>
      <h2>{currentItem?.item_eng}</h2>
      <div className="card">
        {bins.map((bin) => (
          <button key={bin} onClick={() => handleBinClick(bin)} className={bin}>
            {bin}
          </button>
        ))}
        <p>{lastResultMessage}</p>
      </div>
      <div className="card">
        <a
          href="https://www.bsr.de/die-berliner-stadtreinigung-in-englischer-sprache-26142.php"
          target="_blank"
        >
          Learn more about recycling in Berlin!
        </a>
      </div>
    </div>
  );
}

export default Game;
