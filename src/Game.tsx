import { useState, useEffect } from 'react';
import './App.css';
import { Bin, bins, Item } from './helpers/types';
// @ts-ignore
import data from './helpers/rawdata.csv';

const pickRandomItem = (data: Item[]) =>
  data[Math.round(Math.random() * (data.length - 1))];

const buildSentence = (item: String, bin: String) => {
  if (item.charAt(item.length - 1) === 's')
    return `${item} go in the ${bin} bin.`;
  return `${item} goes in the ${bin} bin.`;
};

function Game(props: { name: string; handleSubmit: Function }) {
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

    const newItem = pickRandomItem(data);
    setCurrentItem(newItem);
  };

  useEffect(() => {
    console.log(total);
    if (total === 10) {
      props.handleSubmit(score);
    }
  }, [total]);

  return (
    <div className="Game">
      <div>
        <h1>
          {props.name}'s Score: {score}/{total}
        </h1>
      </div>
      <h1>Pick the right bin:</h1>
      <h2>{currentItem?.item_eng}</h2>
      <div className="card">
        {bins.map((bin) => (
          <button key={bin} onClick={() => handleBinClick(bin)}>
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
          Learn more
        </a>
      </div>
    </div>
  );
}

export default Game;
