import React from "react";
import MainPage from "@containers/MainPage";
import Login from "@containers/Login";

function App() {
	const isAuthorized = false;

	if (!isAuthorized) {
		return <Login />;
	}

	return <div className="App">{/* <MainPage /> */}</div>;
}

export default App;
