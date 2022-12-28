import React, { Fragment, useState, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const App = () => {
  const Ref = useRef(null);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  
  const [timer, setTimer] = useState({
    remaining: 0,
    paused: false,
    display: '00:00'
  })

  // Handle timer counting down
  const startCountingDown = (rem) => {
    if (rem >= 0) {
      let sec = Math.floor(rem % 60);
      let min = Math.floor(rem / 60);

      setTimer(previousTimer => {
        return {
          ...previousTimer,
          remaining: rem,
          display:
            (min < 10 ? `0${min}` : min)
            + ':' +
            (sec < 10 ? `0${sec}` : sec)
        }
      })
    }
    else {
      if (Ref.current) clearInterval(Ref.current);
    }
  }

  // Starting timer on start button click
  const startTimer = () => {
    let remaining = timer.remaining ? timer.remaining : Math.floor(parseInt(minutes) * 60 + parseInt(seconds));
    let sec = Math.floor(remaining % 60);
    let min = Math.floor(remaining / 60);

    setTimer(previousTimer => {
      return {
        ...previousTimer,
        remaining: remaining,
        display:
          (min < 10 ? `0${min}` : min)
          + ':' +
          (sec < 10 ? `0${sec}` : sec)
      }
    })

    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      remaining -= 1;
      startCountingDown(remaining);
      setTimer(previousTimer => {
        return {
          ...previousTimer,
          remaining: remaining
        }
      })
    }, 1000)
    Ref.current = id;
  }

  // Restets timer
  const resetTimer = () => {
    if (Ref.current) clearInterval(Ref.current);
    setTimer(previousTimer => {
      return {
        ...previousTimer,
        remaining: 0,
        paused: false,
        display: '00:00'
      }
    })
  }

  // Pause/Resume timer
  const pauseTimer = () => {
    if(timer.paused) {
      setTimer(previousTimer => {
        return {
          ...previousTimer,
          paused: false
        }
      })

      startTimer();
    }
    else {
      if (Ref.current) clearInterval(Ref.current);
      setTimer(previousTimer => {
        return {
          ...previousTimer,
          paused: true
        }
      })
    }
  }

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
      <button onClick={pauseTimer}>Pause/Resume</button>
      <button onClick={resetTimer}>Reset</button>

      <h1>{timer.display}</h1>
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
