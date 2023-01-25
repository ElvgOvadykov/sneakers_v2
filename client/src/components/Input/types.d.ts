interface IInputProps {
	/** Подпись input */
	title?: React.ReactNode;

	/** Наименование input */
	name: string;

	/** Значение */
	value: string;

	/** Сообщение об ошибке */
	error?: string;

	placeholder?: string;

	/** Функция обработчик события изменения значения Input */
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

	/** Функция обработчик события потери фокуса */
	onBlur?: () => void;
}
