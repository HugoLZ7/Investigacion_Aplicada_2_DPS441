export const addTodo = (todos, text) => {
  return [...todos, { id: Date.now().toString(), text }];
};

export const removeTodo = (todos, id) => {
  return todos.filter(todo => todo.id !== id);
};