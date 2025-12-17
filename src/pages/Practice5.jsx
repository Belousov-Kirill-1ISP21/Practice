import styles from '../css/Pages/Practice5Style.module.css';
import { Header } from '../components/Header';
import { useState } from 'react';
import { TodoList } from '../components/Redux/TodoList';
import { TodoFilter } from '../components/Redux/TodoFilter';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, setFilter, clearCompleted } from '../redux/todoSlice';

export const Practice5 = (props) => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  
  const todos = useSelector(state => state.todos.todos);
  const filter = useSelector(state => state.todos.filter);
  
  const handleAddTodo = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue.trim()));
      setInputValue('');
    }
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };
  
  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id));
  };
  
  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };
  
  const handleFilterChange = (filterType) => {
    dispatch(setFilter(filterType));
  };
  
  const handleClearCompleted = () => {
    dispatch(clearCompleted());
  };
  
  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });
  
  return (
    <div className={styles.wrapper}>
      <Header/>
      
      <div className={styles.container}>
        <div className={styles.todoApp}>
          <h1 className={styles.title}>ToDo List</h1>
          <p className={styles.subtitle}>С использованием Redux Toolkit</p>
          
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Добавить новую задачу..."
              className={styles.input}
            />
            <button
              onClick={handleAddTodo}
              className={styles.addButton}
              disabled={!inputValue.trim()}
            >
              Добавить
            </button>
          </div>
          
          <TodoList
            todos={filteredTodos}
            onToggleTodo={handleToggleTodo}
            onDeleteTodo={handleDeleteTodo}
          />
          
          <TodoFilter
            currentFilter={filter}
            onFilterChange={handleFilterChange}
            todos={todos}
            onClearCompleted={handleClearCompleted}
          />
          
          <div className={styles.stats}>
            <p>Всего задач: {todos.length}</p>
            <p>Осталось выполнить: {todos.filter(t => !t.completed).length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};