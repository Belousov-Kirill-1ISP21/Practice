import React from 'react';
import styles from '../../css/Redux/TodoItem.module.css';

export const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className={styles.checkbox}
      />
      <span className={styles.todoText}>{todo.text}</span>
      <button 
        onClick={() => onDelete(todo.id)}
        className={styles.deleteButton}
      >
        ×
      </button>
    </div>
  );
};