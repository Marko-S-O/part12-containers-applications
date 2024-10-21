import React from 'react'

/* eslint-disable react/prop-types */
import Todo from './Todo'

// eslint-disable-next-line
const TodoList = ({ todos, deleteTodo, completeTodo }) => {

return (
    <>
      {todos.map(todo => {
        return <Todo key={todo.id} todo={todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />
      }).reduce((acc, cur) => [...acc, <hr key={cur.id + '-separator'} />, cur], [])}
    </>
  )
}

export default TodoList
