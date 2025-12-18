import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [
    { id: 1, text: 'Изучить React', completed: true },
    { id: 2, text: 'Изучить Redux Toolkit', completed: false },
    { id: 3, text: 'Создать ToDo приложение', completed: false },
  ],
  filter: 'all', 
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter(todo => !todo.completed);
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } = todoSlice.actions;
export default todoSlice.reducer;