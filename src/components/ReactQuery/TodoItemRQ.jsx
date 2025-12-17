import React, { useState } from 'react';
import styles from '../../css/ReactQuery/TodoItemRQ.module.css';

export const TodoItemRQ = ({ todo, onToggle, onDelete }) => {
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