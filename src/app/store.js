import { configureStore } from '@reduxjs/toolkit';
import todoReducer from "../features/todo/todoSlice.js";
import { timetodoReducer } from '../features/todo/todoSlice';
import { datetodoReducer } from '../features/todo/todoSlice.js';

export const store = configureStore({
    reducer: {
    tasktodo:todoReducer,
    timetodo: timetodoReducer,
    datetodo:datetodoReducer,
  }
  });