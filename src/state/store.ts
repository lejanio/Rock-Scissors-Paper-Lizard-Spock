import { configureStore } from '@reduxjs/toolkit';
import { reducer as gameReducer } from './reducers/gameSlice';
import { reducer as modalReducer } from './reducers/modalSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
