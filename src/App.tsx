import React from 'react';
import './App.css';
import {Provider} from "react-redux";
import store from "./bll/store";
import {BrowserRouter} from "react-router-dom";
import RoutesForApp from "./components/routes/RoutesForApp";
import Header from "./components/header/Header";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header/>
                    <RoutesForApp/>
                </div>
            </BrowserRouter>
        </Provider>

    );
}

export default App;
