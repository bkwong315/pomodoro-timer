import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            timeRemaining: 0,
            workTime: 0,
            shortBreakTime: 0,
            longBreakTime: 0,
        }

        this.toggleTimerOptions = this.toggleTimerOptions.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }

    componentDidMount() {
        this.setState({
            interval: setInterval(() => {
                this.setState( prevState => {
                    timeRemaining: prevState.timeRemaining - 1
                },this.updateDisplay)
            }, 1000)
        })
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

    toggleTimerOptions() {
        let inputContainer = $(".input-container");

        if(inputContainer.css("visibility") == "visible") {
            inputContainer.css("visibility", "hidden");
        }
        else {
            inputContainer.css("visibility", "visible");
        }
    
    }

    setTimer() {
        let pomodoroInput = $(".pomodoro-input");
        let shortBreakInput = $(".short-break-input");
        let longBreakInput = $(".long-break-input");

        this.setState({
            timeRemaining: pomodoroInput.val()*60,
            workTime: pomodoroInput.val()*60,
            shortBreakTime: shortBreakInput.val()*60,
            longBreakTime: longBreakInput.val()*60
        }, this.updateDisplay);

        this.toggleTimerOptions();
        
    }

    updateDisplay() {
        let display = $(".timer-display");

        display.html(`${this.state.timeRemaining/60}:${this.state.timeRemaining % 60}`);
    }

    render() {
        return (
            <div>
                <h1 className="timer-display text-center display-1">00:00</h1>
                <div className="input-container container d-flex flex-row justify-content-center">
                    <input className="pomodoro-input" type="text" placeholder="Pomodoro Duration (min)"></input>
                    <input className="short-break-input" type="text" placeholder="Short Break Duration (min)"></input>
                    <input className="long-break-input" type="text" placeholder="Long Break Duration (min)"></input>
                    <button className="btn btn-primary save-edits-btn" onClick={this.setTimer}>Save</button>
                </div>
                 
                <div className="container d-flex flex-row justify-content-center">
                    <div className="col-md-1">
                        <button className="btn btn-primary" id="toggle-btn" onClick={this.toggleTimer}>Start</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={this.resetTimer}>Reset</button>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={this.toggleTimerOptions}>Edit</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Timer;