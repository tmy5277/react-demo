import React from 'react'
import { connect } from 'react-redux'
import { toggleTodo } from '../redux/actions/index'

const mapStateToProps = state => ({
  todos: state.todos
})

const mapDispatchToProps = dispatch => ({
  toggleTodo: id => dispatch(toggleTodo(id))
})

const Todo = ({ onClick, completed, text }) => (
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none',
      color: 'white'
    }}
  >
    {text}
  </li>
)

const TodoList = ({ todos, toggleTodo }) => {
  return (
    <ul>
      {todos.todos.map(todo => (
        <Todo key={todo.id} {...todo} onClick={() => toggleTodo(todo.id)} />
      ))}
    </ul>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList)
