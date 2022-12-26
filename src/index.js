import React, { Fragment, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const Ref = useRef(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const [time, setTime] = useState('00:00')

  const startCountingDown = (remaining) => {
    if (remaining >= 0) {
      let sec = Math.floor(remaining % 60);
      let min = Math.floor(remaining / 60);
      setTime(
        (min < 10 ? `0${min}` : min) + ':' +
        (sec < 10 ? `0${sec}` : sec)
      )
    }
  }

  const startTimer = () => {
    let remaining = Math.floor(parseInt(minutes) * 60 + parseInt(seconds));
    let sec = Math.floor(remaining % 60);
    let min = Math.floor(remaining / 60);
    remaining -= 1;

    setTime(
      (min < 10 ? `0${min}` : min) + ':' +
      (sec < 10 ? `0${sec}` : sec)
    )

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startCountingDown(remaining);
      remaining-=1;
    }, 1000)
    Ref.current = id;
  }

  const resetTimer = () => {
    if (Ref.current) clearInterval(Ref.current);
    setTime('00:00');
  }

  /*
        TODO
    Pause/Resume
  */

  return (
    <Fragment>
      <label>
        Minutes
        <input type='number' value={minutes} onChange={(e) => setMinutes(e.target.value)} min='0' />
      </label>
      <label>
        Seconds
        <input type='number' value={seconds} onChange={(e) => setSeconds(e.target.value)} min='0' />
      </label>

      <button onClick={startTimer}>Start</button>
      <button>Pause/Resume</button>
      <button onClick={resetTimer}>Reset</button>

      <h1>{time}</h1>
    </Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
