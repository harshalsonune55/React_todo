import { createContext, useContext } from "react";

export const TodoContext = createContext();

export function useTodoContext() {
  return useContext(TodoContext);
}