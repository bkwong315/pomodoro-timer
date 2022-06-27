import {createRoot} from "react-dom/client";
import React from "react";
import Timer from "./timer.js";
import './style.css';

class App extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1 className="text-center">Pomodoro Timer</h1>
                <Timer />
            </div>
        );
    }
}

createRoot(document.getElementById("root")).render(<App />);