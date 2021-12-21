import React from 'react';
import { useAppDispatch, useAppSelector } from '../../state/hooks';
import './ModalEnd.scss';
import { changeModalEndVisibility } from '../../state/reducers/modalSlice';
import Button from '../Button/Button';
import { resetScore } from '../../state/reducers/gameSlice';

const ModalEnd = () => {
  const score = useAppSelector((reduxStore) => reduxStore.game.score);
  const modalEndIsOpen = useAppSelector((reduxStore) => reduxStore.modal.modalEnd);
  const dispatch = useAppDispatch();

  const changeModalVisibilityHandler = () => {
    dispatch(changeModalEndVisibility(false));
  };

  const resetScoreHandler = () => {
    dispatch(resetScore());
  };

  return (
    <div
      className={modalEndIsOpen ? 'modal active' : 'modal'}
    >

      <div className="modal__content">
        <p>
          {score.computer >= 3 ? (<span>Sorry, you lost.</span>) : (<span>Congratulations! You won!</span>)}
          <br />
          Want to try again?
        </p>
        <Button
          backgroundColor="teal"
          onClick={() => {
            changeModalVisibilityHandler();
            resetScoreHandler();
          }}
        >
          Yeah, sure
        </Button>
        <div className="credits">
          <span>Icon credits: https://github.com/JLChamberlain/RPSLS</span>
          <span>Character credits: http://www.cescgrane.com</span>
        </div>
      </div>
    </div>
  );
};

export default ModalEnd;
