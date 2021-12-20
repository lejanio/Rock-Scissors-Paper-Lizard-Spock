import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import paper from '../../assets/icons/Paper.svg';
import rock from '../../assets/icons/Rock.svg';
import scissors from '../../assets/icons/Scissors.svg';
import lizard from '../../assets/icons/Lizard.svg';
import spock from '../../assets/icons/Spock.svg';
import characterOne from '../../assets/chars/char_01.jpg';
import characterTwo from '../../assets/chars/char_02.jpg';
import characterThree from '../../assets/chars/char_03.jpg';
import characterFour from '../../assets/chars/char_04.jpg';
import characterFive from '../../assets/chars/char_05.jpg';
import { FilteredSymbolType } from '../../App';

type GameState = {
  characters:
    {
      id: number,
      name: string,
    image: string,
    }[],
  playerCharacter: {
    name: string,
    image: string,
  },
  score: {
    player: number,
    computer: number,
  },
  participantChoice: string,
  computerChoice:
    {
      name: string,
      image: string,
    }
  symbols: {
    name: string,
    image: string,
  }[],
  randomIndex: number,
}

const initialState: GameState = {
  characters: [
    {
      id: 1,
      name: 'Sam',
      image: characterOne,
    },
    {
      id: 2,
      name: 'Cory',
      image: characterTwo,
    },
    {
      id: 3,
      name: 'Slash',
      image: characterThree,
    },
    {
      id: 4,
      name: 'Buzz',
      image: characterFour,
    },
    {
      id: 5,
      name: 'Tim',
      image: characterFive,
    }],
  playerCharacter: {
    name: '',
    image: '',
  },
  score: {
    player: 0,
    computer: 0,
  },
  participantChoice: 'ParticipantTEStChoice',
  computerChoice: {
    name: '',
    image: '',
  },
  symbols: [{
    name: 'rock',
    image: rock,
  },
  {
    name: 'paper',
    image: paper,
  },
  {
    name: 'scissors',
    image: scissors,
  },
  {
    name: 'lizard',
    image: lizard,
  },
  {
    name: 'spock',
    image: spock,
  }],
  randomIndex: -1,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setPlayerCharacter: (state, action) => {
      state.playerCharacter = action.payload;
    },
    incrementPlayerScore: (state) => {
      state.score.player += 1;
    },
    incrementComputerScore: (state) => {
      state.score.computer += 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    generateRandomIndex: (state) => {
      const newRandomIndex = Math.floor(Math.random() * state.symbols.length);
      state.randomIndex = newRandomIndex;
    },
    setParticipantChoice: (state, action) => {
      state.participantChoice = action.payload;
    },
    setComputerChoice: (state, action) => {
      state.computerChoice = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { reducer } = gameSlice;
export const {
  setPlayerCharacter, incrementPlayerScore, incrementComputerScore, generateRandomIndex, setParticipantChoice, setComputerChoice,
} = gameSlice.actions;
