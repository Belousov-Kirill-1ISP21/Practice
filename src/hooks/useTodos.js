import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosAPI } from '../api/todos';

export const useTodos = (filter = 'all') => {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => todosAPI.getTodos(),
    select: (data) => {
      switch (filter) {
        case 'active':
          return data.filter(todo => !todo.completed);
        case 'completed':
          return data.filter(todo => todo.completed);
        default:
          return data;
      }
    },
  });
};

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (text) => todosAPI.createTodo(text),
    onMutate: async (text) => {
      await queryClient.cancelQueries(['todos']);
      
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old) => {
        const newTodo = {
          id: Date.now(),
          text,
          completed: false,
        };
        return [...old, newTodo];
      });

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }) => todosAPI.updateTodo(id, updates),
    onMutate: async ({ id, updates }) => {
      await queryClient.cancelQueries(['todos']);
      
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old) =>
        old.map(todo =>
          todo.id === id ? { ...todo, ...updates } : todo
        )
      );

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => todosAPI.deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['todos']);
      
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old) =>
        old.filter(todo => todo.id !== id)
      );

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => todosAPI.toggleTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries(['todos']);
      
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old) =>
        old.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );

      return { previousTodos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries(['todos']);
    },
  });
};

