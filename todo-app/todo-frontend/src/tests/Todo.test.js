import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Todo from '../Todos/Todo' 


describe('Todo jsx component tests', () => {
    test('Todo rendering correctly', () => {

        const todo = {text: 'Testing todo', done: false}
        const deleteTodo = jest.fn();
        const completeTodo = jest.fn();
        render(<Todo todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />);

        const todoText = screen.getByText('Testing todo');
        expect(todoText).toBeInTheDocument();

        const todoDone = screen.getByText('This todo is not done');
        expect(todoText).toBeInTheDocument();        

    })
})