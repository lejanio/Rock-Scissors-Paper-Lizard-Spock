import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const modalSlice = createSlice({
  name: 'modal',
  initialState: true,
  reducers: {
    changeModalVisibility: (state, { payload }: PayloadAction<boolean>) => payload,
  },
});

export const { reducer } = modalSlice;
export const { changeModalVisibility } = modalSlice.actions;
