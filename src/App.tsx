import React from 'react';
import './App.css';
import Login from "./components/login/login";
import {Provider} from "react-redux";
import store from "./bll/store";
import {BrowserRouter} from "react-router-dom";

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Login/>

                </div>
            </BrowserRouter>
        </Provider>

    );
}

export default App;
