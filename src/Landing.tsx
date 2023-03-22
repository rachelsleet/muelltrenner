import { useState, ChangeEvent } from 'react';
import './App.css';

function Landing(props: { handleSubmit: Function }) {
  const [name, setName] = useState('');
  const handleClick = (event: any) => {
    props.handleSubmit(name);
  };

  const handleChange = (input: ChangeEvent<HTMLInputElement>) => {
    setName(input.target.value);
  };
  return (
    <div className="App">
      <h1>Enter Name:</h1>
      <input type="text" onChange={handleChange}></input>
      <button onClick={handleClick}>Play</button>
    </div>
  );
}

export default Landing;
