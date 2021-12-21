import React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import './ModalStart.scss';
import { changeModalStartVisibility } from '../../state/reducers/modalSlice';
import { setPlayerCharacter } from '../../state/reducers/gameSlice';

export type CharacterType = {
  name: string,
  image: string,
}

const ModalStart = () => {
  const modalIsOpen = useAppSelector((reduxStore) => reduxStore.modal.modalStart);
  const gameCharacters = useAppSelector((reduxStore) => reduxStore.game.characters);
  const chosenCharacter = useAppSelector((reduxStore) => reduxStore.game.playerCharacter);
  const dispatch = useAppDispatch();

  const closeModalHandler = () => {
    dispatch(changeModalStartVisibility(false));
  };

  const setCharacter = (value: CharacterType) => {
    dispatch(setPlayerCharacter(value));
  };

  return (
    <div
      className={modalIsOpen ? 'modal active' : 'modal'}
    >
      <div className="modal__content-one">
        <h1 className="heading">
          <span className="heading--introduction">
            Hello and welcome to the game of
            {' '}
          </span>
          <div>Rock, Paper, Scissors, Lizard, Spock</div>

        </h1>
      </div>
      <div
        className="modal__content-two"
      >
        <section className="paragraph">
          The rules are simple:
          <br />
          <br />
          <p className="paragraph__item">
            scissors cuts paper, paper covers rock, rock crushes lizard,
            lizard poisons Spock, Spock smashes scissors, scissors decapitates lizard,
            lizard eats paper, paper disproves Spock, Spock vaporizes rock,
            and as it always has, rock crushes scissors.
          </p>
          <br />
          But you don&#39;t have to memorize them - if you win, we&#39;ll tell you.
        </section>
      </div>
      <div className="modal__content-three">
        <p>
          Please, choose your character to start the game.
        </p>
        <span className="character--container">
          {gameCharacters.map((item) => (
            <span
              key={item.id}
              className="character"
              onClick={() => {
                setCharacter(item);
                closeModalHandler();
              }}
            >
              <img src={item.image} alt={item.name} className="character-image" />
              <span>{item.name}</span>
            </span>
          ))}
        </span>
      </div>
    </div>
  );
};

export default ModalStart;
