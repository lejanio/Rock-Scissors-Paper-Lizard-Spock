import React, { ChangeEvent, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { useAppSelector, useAppDispatch } from './state/hooks';
import {
  generateRandomIndex, setComputerChoice, setParticipantChoice, incrementPlayerScore, incrementComputerScore,
} from './state/reducers/gameSlice';
import { changeModalVisibility } from './state/reducers/modalSlice';
import ModalStart from './Modal/ModalStart';

export type FilteredSymbolType = {
  name: string,
  image: string,
}

const App = () => {
  const symbols = useAppSelector((reduxState) => reduxState.game.symbols);
  const randomIndex = useAppSelector((reduxState) => reduxState.game.randomIndex);
  const score = useAppSelector((reduxState) => reduxState.game.score);
  const participantChoice = useAppSelector((reduxState) => reduxState.game.participantChoice);
  const pcChoice = useAppSelector((reduxState) => reduxState.game.computerChoice);
  const modalIsOpen = useAppSelector((reduxState) => reduxState.modal);
  const chosenCharacter = useAppSelector((reduxStore) => reduxStore.game.playerCharacter);

  const [radioInputValue, setRadioInputValue] = useState('');

  const filteredSymbol = symbols.filter((item, index) => index === randomIndex);

  const dispatch = useAppDispatch();

  console.log('chosenCharacter', chosenCharacter);

  const generateIndex = () => {
    dispatch(generateRandomIndex());
  };

  const setPlayerChoice = (value: string) => {
    dispatch(setParticipantChoice(value));
  };

  const setPCChoice = (value: FilteredSymbolType) => {
    dispatch(setComputerChoice(value));
  };

  const increasePlayerScore = () => {
    dispatch(incrementPlayerScore());
  };

  const increaseComputerScore = () => {
    dispatch(incrementComputerScore());
  };

  useEffect(() => {
    setPCChoice(filteredSymbol[0]);
  }, [randomIndex]);

  useEffect(() => {
    if (pcChoice !== undefined && participantChoice !== undefined) {
      if (participantChoice === pcChoice.name) {
        console.log('it\'s a tie');
      } else if (participantChoice === 'scissors' && (pcChoice.name === 'paper' || pcChoice.name === 'lizard')) {
        increasePlayerScore();
      } else if (participantChoice === 'paper' && (pcChoice.name === 'rock' || pcChoice.name === 'spock')) {
        increasePlayerScore();
      } else if (
        participantChoice === 'rock' && (pcChoice.name === 'scissors' || pcChoice.name === 'lizard')) {
        increasePlayerScore();
      } else if (
        participantChoice === 'lizard' && (pcChoice.name === 'paper' || pcChoice.name === 'spock')) {
        increasePlayerScore();
      } else if (
        participantChoice === 'spock' && (pcChoice.name === 'rock' || pcChoice.name === 'scissors')) {
        increasePlayerScore();
      } else if (!participantChoice || !pcChoice.name) {
        console.log('');
      } else {
        increaseComputerScore();
      }
    }
  }, [participantChoice]);

  const playGame = () => {
    generateIndex();
    setPlayerChoice(radioInputValue);
    setRadioInputValue(radioInputValue);
  };

  return (
    <div className="App">
      <div className="App-container">
        <div>
          <div>

            <div className="header">
              <div className="score">
                <div>
                  Player score:
                  {' '}
                  {score.player}
                </div>
                <div>
                  Computer score:
                  {' '}
                  {score.computer}
                </div>
              </div>
            </div>
            <div className="hero-section">
              <div className="character-image--cropper">
                <img src={chosenCharacter.image} alt={chosenCharacter.name} className="chosen-character-image" />
              </div>
              <div className="hero-section--name">{chosenCharacter.name}</div>
            </div>

          </div>
          <br />
          <br />

          <div className="symbols">
            {pcChoice !== undefined && (
            <div
              key={pcChoice.name}
            >
              <img src={pcChoice.image} alt="{item}" height="125px" className="chosen-symbol" />
            </div>
            )}
          </div>
          <div className="symbols">
            {symbols.map((item) => (
              <div
                key={item.name}
                // @ts-ignore
                value={radioInputValue}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  setRadioInputValue(e.target.value);
                }}
                onClick={playGame}
              >
                <div>
                  <label>
                    <input type="radio" name="symbol" value={item.name} className="radio" />
                    <div className="symbol-container">
                      <img src={item.image} alt="{item}" className="chosenSymbol" />
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
          {score.player >= 3 && (
            <div>You wins! Congrats!</div>
          )}
          {score.computer >= 3 && (
            <div>You loses!</div>
          )}
        </div>
        {/* <button onClick={playGame}> Click me </button> */}
        {modalIsOpen && (<ModalStart />)}
      </div>
    </div>
  );
};

export default App;
