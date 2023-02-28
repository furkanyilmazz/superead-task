import {PayloadAction, createSlice} from '@reduxjs/toolkit';

export interface Book {
  id: number;
  name: string;
  category: string;
  dateCreated: Date;
  dateCompleted: Date;
  description: string;
  lastRead: string;
}

export interface BookState {
  books: Book[];
}

export const initialState: BookState = {
  books: [],
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<Book>) => {
      state.books.push({
        id: state.books.length,
        name: action.payload.name,
        category: action.payload.category,
        dateCreated: action.payload.dateCreated,
        dateCompleted: action.payload.dateCompleted,
        description: action.payload.description,
        lastRead: action.payload.lastRead,
      });
    },
    deleteBook: (state, action: PayloadAction<Book>) => {
      state.books.splice(action.payload.id, 1);
    },
    updateBook: (state, action: PayloadAction<Book>) => {
      state.books.map(book => {
        if (book.id === action.payload.id) {
          book.name = action.payload.name;
          book.category = action.payload.category;
          book.dateCreated = action.payload.dateCreated;
          book.dateCompleted = action.payload.dateCompleted;
          book.description = action.payload.description;
          book.lastRead = action.payload.lastRead;
        }
      });
    },
  },
});

export const {addBook, deleteBook, updateBook} = bookSlice.actions;

export default bookSlice.reducer;
