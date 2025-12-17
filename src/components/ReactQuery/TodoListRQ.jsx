import React from 'react';
import { TodoItemRQ } from './TodoItemRQ';
import styles from '../../css/ReactQuery/TodoListRQ.module.css';

export const TodoListRQ = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return <div className={styles.empty}>Нет задач</div>;
  }

  return (
    <div className={styles.todoList}>
      {todos.map(todo => (
        <TodoItemRQ
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
};