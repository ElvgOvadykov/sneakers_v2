import React from "react";

import logoPng from "@images/logo.png"

import styles from "./index.module.scss";

function LogoHeader() {
	return (
		<div className={styles.root}>
			<img alt="Logo" width={40} height={40} src={logoPng} />
			<div>
				<h3>React Sneakers</h3>
				<p>Магазин лучших кроссовок</p>
			</div>
		</div>
	);
}

export default LogoHeader;
