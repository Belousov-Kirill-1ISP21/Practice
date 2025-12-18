
let todos = [
  { id: 1, text: 'Изучить React', completed: true },
  { id: 2, text: 'Изучить React Query', completed: false },
  { id: 3, text: 'Создать ToDo приложение с React Query', completed: false },
  { id: 4, text: 'Реализовать оптимистичные обновления', completed: false },
  { id: 5, text: 'Добавить фильтрацию задач', completed: false },
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const todosAPI = {
  async getTodos() {
    await delay(500); 
    return [...todos];
  },

  async createTodo(text) {
    await delay(300);
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    todos.push(newTodo);
    return newTodo;
  },

  async updateTodo(id, updates) {
    await delay(300);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index] = { ...todos[index], ...updates };
      return todos[index];
    }
    throw new Error('Todo not found');
  },

  async deleteTodo(id) {
    await delay(300);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      const deletedTodo = todos[index];
      todos = todos.filter(todo => todo.id !== id);
      return deletedTodo;
    }
    throw new Error('Todo not found');
  },

  async toggleTodo(id) {
    await delay(300);
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index].completed = !todos[index].completed;
      return todos[index];
    }
    throw new Error('Todo not found');
  },
};