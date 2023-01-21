import React from "react";
import SearchSvg from "@images/search.svg";
import styles from "./MainPage.module.css";

function MainPage() {
	return (
		<div className={styles.root}>
			<div className={styles.header}>
				<h1>Все кроссовки</h1>
				<div className={styles.searchBlock}>
					<img src={SearchSvg} alt="Search" />
					<input type="text" placeholder={"Поиск..."} className={styles.searchInput} />
				</div>
			</div>

			{/* <div className={styles.sneakersList}>
				{props.sneakers.map((item) => (
					<SneakersCard cartItem={item} />
				))}
			</div> */}
		</div>
	);
}

export default MainPage;
