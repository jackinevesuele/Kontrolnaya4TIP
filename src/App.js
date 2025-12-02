import React, { useState } from 'react';
import './App.css';

function App() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [guess, setGuess] = useState(50);
  const [steps, setSteps] = useState(1);
  const [finished, setFinished] = useState(false);
  const [message, setMessage] = useState('Загадайте число от 1 до 100, я попробую угадать');

  const handleResponse = (response) => {
    if (finished) return;

    if (response === 'equal') {
      setMessage(`Я угадал число ${guess} за ${steps} шагов!`);
      setFinished(true);
      return;
    }

    let newGuess;
    let newMessage;

    if (response === 'more') {
      const newMin = guess + 1;
      setMin(newMin);
      newGuess = Math.floor((newMin + max) / 2);
      newMessage = `Больше ${guess}. Мой новый вариант: ${newGuess}?`;
    } else if (response === 'less') {
      const newMax = guess - 1;
      setMax(newMax);
      newGuess = Math.floor((min + newMax) / 2);
      newMessage = `Меньше ${guess}. Мой новый вариант: ${newGuess}?`;
    }

    setGuess(newGuess);
    setSteps(steps + 1);
    setMessage(newMessage);
  };

  const restartGame = () => {
    setMin(1);
    setMax(100);
    setGuess(50);
    setSteps(1);
    setFinished(false);
    setMessage('Загадайте число от 1 до 100, я попробую угадать');
  };

  return (
    <div className="App">
      <h1>Игра: угадай ваше число</h1>
      <p className="message">{message}</p>
      {!finished && (
        <div>
          <button onClick={() => handleResponse('less')}>Меньше</button>
          <button onClick={() => handleResponse('equal')}>Угадал!</button>
          <button onClick={() => handleResponse('more')}>Больше</button>
        </div>
      )}
      {finished && <button onClick={restartGame}>Начать заново</button>}
      <p className="stats">Шаг: {steps}</p>
      <p className="stats">
        Диапазон: {min} - {max}
      </p>
    </div>
  );
}

export default App;
