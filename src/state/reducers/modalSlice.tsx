import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ModalsState = {
  modalStart: boolean,
  modalEnd: boolean,
}

const initialState: ModalsState = {
  modalStart: true,
  modalEnd: false,
};

export const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    changeModalStartVisibility: (state, { payload }: PayloadAction<boolean>) => {
      state.modalStart = payload;
    },
    changeModalEndVisibility: (state, { payload }: PayloadAction<boolean>) => {
      state.modalEnd = payload;
    },
  },
});

export const { reducer } = modalSlice;
export const { changeModalStartVisibility, changeModalEndVisibility } = modalSlice.actions;
