import {configureStore} from '@reduxjs/toolkit';
import {bookSlice} from './features/books';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

export const store = configureStore({
  reducer: {
    book: bookSlice.reducer,
  },
});

// export const {addBook} = bookSlice.actions;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
