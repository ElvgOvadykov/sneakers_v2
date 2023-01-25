import React from "react";

import styles from "./index.module.scss";

function Input(props: IInputProps) {
	return (
		<React.Fragment>
			{props.title && (
				<label htmlFor={`input-${props.name}`} className={styles.label}>
					{props.title}
				</label>
			)}
			<input
				id={`input-${props.name}`}
				className={styles.root}
				type="text"
				onChange={props.onChange}
				placeholder={props.placeholder}
			/>
		</React.Fragment>
	);
}

export default Input;
