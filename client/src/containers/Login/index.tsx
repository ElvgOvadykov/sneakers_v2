import React from "react";
import { Helmet } from "react-helmet";

import Input from "@components/Input";

import logoPng from "@images/logo.png"

import styles from "./index.module.scss";

function Login() {
	return (
		<div className={styles.root}>
			<Helmet>
				<title>Авторизация</title>
				<meta name="description" content="Description of Auth" />
			</Helmet>
			<form className={styles.loginForm}>
				<div className={styles.header}>
					<img alt="Logo" width={40} height={40} src={logoPng} />
					<div>
						<h3>React Sneakers</h3>
						<p>Магазин лучших кроссовок</p>
					</div>
				</div>
				<Input onChange={console.log} value="test" name="test" title="Login" />
				<Input onChange={console.log} value="test" name="test" title="Password" />
			</form>
		</div>
	);
}

export default Login;
