import React from 'react';
import { TodoItem } from './TodoItem';
import styles from '../../css/Redux/TodoList.module.css';

export const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <div className={styles.empty}>Нет задач</div>;
  }

  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};