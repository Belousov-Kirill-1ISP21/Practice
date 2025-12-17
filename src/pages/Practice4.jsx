import styles from '../css/Pages/Practice4Style.module.css';
import { Header } from '../components/Header';
import { useState } from 'react';
import { TodoListRQ } from '../components/ReactQuery/TodoListRQ';
import { TodoFilterRQ } from '../components/ReactQuery/TodoFilterRQ';
import { useTodos, useCreateTodo, useToggleTodo, useDeleteTodo } from '../hooks/useTodos';

export const Practice4 = () => {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  
  const { 
    data: todos = [], 
    isLoading, 
    error, 
    refetch,
    isRefetching 
  } = useTodos(filter);

  const createMutation = useCreateTodo();
  const toggleMutation = useToggleTodo();
  const deleteMutation = useDeleteTodo();

  const handleAddTodo = () => {
    if (inputValue.trim() && !createMutation.isLoading) {
      createMutation.mutate(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleToggleTodo = (id) => {
    toggleMutation.mutate(id);
  };

  const handleDeleteTodo = (id) => {
    deleteMutation.mutate(id);
  };

  const handleFilterChange = (filterType) => {
    setFilter(filterType);
  };

  const handleClearCompleted = () => {
    todos.forEach(todo => {
      if (todo.completed) {
        deleteMutation.mutate(todo.id);
      }
    });
  };

  if (isLoading) {
    return (
      <div className={styles.wrapper}>
        <Header/>
        <div className={styles.container}>
          <div className={styles.todoApp}>
            <div className={styles.loading}>Загрузка задач...</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.wrapper}>
        <Header/>
        <div className={styles.container}>
          <div className={styles.todoApp}>
            <div className={styles.error}>
              Ошибка загрузки: {error.message}
              <button onClick={refetch} className={styles.retryButton}>
                Повторить
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header/>
      
      <div className={styles.container}>
        <div className={styles.todoApp}>
          <h1 className={styles.title}>ToDo List</h1>
          <p className={styles.subtitle}>С использованием React Query</p>
          
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Добавить новую задачу..."
              className={styles.input}
              disabled={createMutation.isLoading}
            />
            <button
              onClick={handleAddTodo}
              className={styles.addButton}
              disabled={!inputValue.trim() || createMutation.isLoading}
            >
              {createMutation.isLoading ? 'Добавление...' : 'Добавить'}
            </button>
          </div>
          
          {createMutation.isError && (
            <div className={styles.errorMessage}>
              Ошибка добавления: {createMutation.error.message}
            </div>
          )}
          
          <TodoListRQ
            todos={todos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
          
          <TodoFilterRQ
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            todos={todos}
            onClearCompleted={handleClearCompleted}
          />
          
          <div className={styles.stats}>
            <p>Всего задач: {todos.length}</p>
            <p>Осталось выполнить: {todos.filter(t => !t.completed).length}</p>
            {isRefetching && <p className={styles.refreshing}>Автообновление...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};