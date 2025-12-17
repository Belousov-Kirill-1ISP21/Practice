import React from 'react';
import styles from '../../css/Redux/TodoFilter.module.css';

export const TodoFilter = ({ currentFilter, onFilterChange, todos, onClearCompleted }) => {
  const activeCount = todos.filter(todo => !todo.completed).length;
  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className={styles.filterContainer}>
      <div className={styles.counts}>
        <span>Активных: {activeCount}</span>
        <span>Выполненных: {completedCount}</span>
      </div>
      
      <div className={styles.filterButtons}>
        <button
          className={`${styles.filterButton} ${currentFilter === 'all' ? styles.active : ''}`}
          onClick={() => onFilterChange('all')}
        >
          Все
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'active' ? styles.active : ''}`}
          onClick={() => onFilterChange('active')}
        >
          Активные
        </button>
        <button
          className={`${styles.filterButton} ${currentFilter === 'completed' ? styles.active : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          Выполненные
        </button>
      </div>
      
      <button
        onClick={onClearCompleted}
        className={styles.clearButton}
        disabled={completedCount === 0}
      >
        Удалить выполненные
      </button>
    </div>
  );
};