import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions/todoList'

const AddTodo = ({ dispatch }) => {
	let input

	return (
		<div style={{color: '#222'}}>
			<form onSubmit={e => {
				e.preventDefault()
				if (!input.value.trim()) {
					return
				}
				dispatch(addTodo(input.value))
				input.value = ''
			}}>
				<input ref={el => input = el}/>
				<button type="submit">
					Add Todo
        </button>
			</form>
		</div>
	)
}

export default connect()(AddTodo)