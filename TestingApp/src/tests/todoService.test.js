import { addTodo, removeTodo } from '../services/todoService';

describe('Todo Service', () => {

  test('agrega un todo', () => {
    const result = addTodo([], 'Estudiar testing');
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Estudiar testing');
  });

  test('elimina un todo', () => {
    const todos = [{ id: '1', text: 'Test' }];
    const result = removeTodo(todos, '1');

    expect(result.length).toBe(0);
  });

});