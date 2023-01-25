import React from "react";
import { Helmet } from "react-helmet";

import Input from "@components/Input";
import LogoHeader from "@components/LogoHeader";

import styles from "./index.module.scss";

function Login() {
	return (
		<div className={styles.root}>
			<Helmet>
				<title>Авторизация</title>
				<meta name="description" content="Description of Auth" />
			</Helmet>
			<form className={styles.loginForm}>
				<div className={styles.logoWrapper}>
					<LogoHeader />
				</div>
				<Input onChange={console.log} value="test" name="test" title="Login" />
				<Input onChange={console.log} value="test" name="test" title="Password" />
			</form>
		</div>
	);
}

export default Login;
