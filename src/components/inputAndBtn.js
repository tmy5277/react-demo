import React from 'react';

function InputAndBtn(props) {
	let { placeholder, handleInputChange } = props
	return (
		<div className="app-time-input">
			<div>
				<input style={{ width: '250px', color: '#222' }} placeholder={placeholder} onBlur={handleInputChange}></input>
			</div>
			<div>
				{props.children}
			</div>
		</div>
	);
}

export default InputAndBtn;
