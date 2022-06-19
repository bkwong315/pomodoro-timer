import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeRemaining: 0
        }

        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.editTimer = this.editTimer.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }

    toggleTimer() {
        let btn = $("#toggle-btn");

        if(btn.html() == "Start") {
            btn.html("Stop");
        }
        else {
            btn.html("Start");
        }
    }

    resetTimer() {
        alert("Reset!");
    }

    editTimer() {
        alert("Edit!");
    }

    setTimer() {
        
    }

    render() {
        return (
            <div>
                <h1 className="timer-display text-center display-1">00:00:00</h1>
                <div class="container d-flex flex-row justify-content-center">
                    <input className="text-center d-print-inline-block" type="text" placeholder="00"></input>:
                    <input className="text-center d-print-inline-block" type="text" placeholder="00"></input>:
                    <input className="text-center d-print-inline-block" type="text" placeholder="00"></input>
                </div>
                 
                <div className="container d-flex flex-row justify-content-center">
                    <div className="col-md-1">
                        <button className="btn btn-primary" id="toggle-btn" onClick={this.toggleTimer}>Start</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={this.resetTimer}>Reset</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={this.editTimer}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;