import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.scss';
import { useAppSelector, useAppDispatch } from './state/hooks';
import {
  generateRandomIndex,
  setComputerChoice,
  setParticipantChoice,
  incrementPlayerScore,
  incrementComputerScore,
  incrementGamesPlayedCounter,
} from './state/reducers/gameSlice';
import ModalStart from './components/Modals/ModalStart';
import Button from './components/Button/Button';
import pcPicture from './assets/pc.png';
import { changeModalEndVisibility } from './state/reducers/modalSlice';
import ModalEnd from './components/Modals/ModalEnd';

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
  const modalStartIsOpen = useAppSelector((reduxState) => reduxState.modal.modalStart);
  const chosenCharacter = useAppSelector((reduxStore) => reduxStore.game.playerCharacter);
  const gamesPlayed = useAppSelector((reduxStore) => reduxStore.game.gamesPlayedCounter);
  const modalEndIsOpen = useAppSelector((reduxStore) => reduxStore.modal.modalEnd);

  const [radioInputValue, setRadioInputValue] = useState('');
  const [activeSymbolClass, setActiveSymbolClass] = useState<boolean>();

  const filteredSymbol = symbols.filter((item, index) => index === randomIndex);

  const dispatch = useAppDispatch();

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

  const setGamesPlayed = () => {
    dispatch(incrementGamesPlayedCounter());
  };

  const setModalEndVisible = (value: boolean) => {
    dispatch(changeModalEndVisibility(value));
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
  }, [pcChoice]);

  useEffect(() => {
    if (score.player >= 3 || score.computer >= 3) {
      setModalEndVisible(true);
    }
  }, [score]);

  const playGame = () => {
    generateIndex();
    setPlayerChoice(radioInputValue);
    setGamesPlayed();
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
            <div className="competitor-section">
              <div className="hero-section">
                <div className="character-image--cropper">
                  <img src={chosenCharacter.image} alt={chosenCharacter.name} className="chosen-character-image" />
                </div>
                <div className="hero-section--name">{chosenCharacter.name}</div>
              </div>
              <div className="pc-section">
                <div className="character-image--cropper">
                  <img src={pcPicture} alt="pc" className="pc-image" />
                </div>
                <div className="pc-section--name">
                  Hal
                </div>
              </div>
            </div>
          </div>
          <div className="symbols">
            {pcChoice === undefined ? (
              <div
                className="pc-choice-container"
              />
            ) : (
              <div
                key={pcChoice.name}
                className="pc-choice-container"
              >
                <img src={pcChoice.image} alt="{item}" className="chosen-symbol chosen-symbol--pc" />
              </div>
            )}
          </div>
          <div className="symbols">
            {symbols.map((item) => (
              <div
                key={item.name}
                // @ts-ignore
                checked={activeSymbolClass}
                value={radioInputValue}
                onChange={(e:ChangeEvent<HTMLInputElement>) => {
                  setRadioInputValue(e.target.value);
                  setActiveSymbolClass(e.target.checked);
                }}
              >
                <div>
                  <label>
                    <input type="radio" name="symbol" value={item.name} className="radio" />
                    <div className="symbol-container">
                      <img src={item.image} alt="{item}" className={(item.name === radioInputValue && activeSymbolClass) ? 'chosen-symbol chosen-symbol--active' : 'chosen-symbol'} />
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          backgroundColor="#C3073F"
          onClick={() => {
            playGame();
          }}
        >
          Battle!
        </Button>
        {modalStartIsOpen && (<ModalStart />)}
        {modalEndIsOpen && (<ModalEnd />)}
      </div>
    </div>
  );
};

export default App;
