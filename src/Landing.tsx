import { useState, ChangeEvent } from 'react';
import bin from './assets/bin.png';
import './App.css';

function Landing(props: { suggestedName: string; handleSubmit: Function }) {
  const [name, setName] = useState(props.suggestedName);
  const handleClick = (event: any) => {
    props.handleSubmit(name);
  };

  const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
    setName(input.target.value);
  };
  return (
    <div>
      <img src={bin} />
      <h2>Welcome to Mülltrenner</h2>
      <p>
        A rubbish-sorting game to educate and test your knowledge of recycling
        guidelines in Berlin.
      </p>
      <p>Enter Name:</p>
      <input type="text" onChange={handleChange}></input>
      <div>
        <button onClick={handleClick}>Play</button>
        <button onClick={handleClick}>Skip</button>
      </div>
    </div>
  );
}

export default Landing;
