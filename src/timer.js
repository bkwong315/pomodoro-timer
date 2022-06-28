import React from "react";

class Timer extends React.Component {
    constructor(props) {
        super(props);

        /*
        * Time related state values are stored in seconds but the input
        * is in minutes. So 1500/60 = 25 minutes.
        * pomodoroInterval stores the amt of pomodoros completed before
        * long break. The count is 0 indexed so it will be 0, 1, 2, 3.
        */
        this.state = {
            timeRemaining: 1500,
            workTime: 1500,
            shortBreakTime: 300,
            longBreakTime: 900,
            intervalID: 0,
            pomodoroInterval: 4,
            pomoCount: 0,
            onBreak: false
        }

        this.toggleTimerOptions = this.toggleTimerOptions.bind(this);
        this.createInterval = this.createInterval.bind(this);
        this.updateDisplay = this.updateDisplay.bind(this);
        this.updateTimer = this.updateTimer.bind(this);
        this.toggleTimer = this.toggleTimer.bind(this);
        this.changeTimer = this.changeTimer.bind(this);
        this.resetTimer = this.resetTimer.bind(this);
        this.setTimer = this.setTimer.bind(this);
    }

    componentDidMount() {
        this.updateDisplay();
    }

    createInterval() {
        this.setState({
            intervalID: setInterval(() => {
                this.setState( prevState => {
                    return {
                        timeRemaining: prevState.timeRemaining - 1
                    }
                }, this.updateTimer)
            }, 1000)
        })
    }

    toggleTimer() {
        let btn = $("#toggle-btn");

        if(btn.html() == "Start") {
            this.createInterval();
            btn.html("Stop");
        }
        else {
            clearInterval(this.state.intervalID);
            btn.html("Start");
        }

        
    }

    resetTimer() {
        clearInterval(this.state.intervalID);
        this.setTimer();
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
        clearInterval(this.state.intervalID);

        let workTimeInput = $(".work-time-input");
        let shortBreakInput = $(".short-break-input");
        let longBreakInput = $(".long-break-input");
        let pomodoroIntervalInput = $(".pomodoro-interval-input");

        let inputValues = {
            workTimeValue: !isNaN(parseFloat(workTimeInput.val().trim())) ? parseFloat(workTimeInput.val().trim())*60 : this.state.workTime,
            shortBreakValue: !isNaN(parseFloat(shortBreakInput.val().trim()))? parseFloat(shortBreakInput.val().trim())*60 : this.state.shortBreakTime,
            longBreakValue: !isNaN(parseFloat(longBreakInput.val().trim())) ? parseFloat(longBreakInput.val().trim())*60 : this.state.longBreakTime,
            pomodoroIntervalValue: !isNaN(parseInt(pomodoroIntervalInput.val().trim())) ? parseInt(pomodoroIntervalInput.val().trim()) : this.state.pomodoroInterval
        }

        this.setState({
            timeRemaining: inputValues.workTimeValue,
            workTime: inputValues.workTimeValue,
            shortBreakTime: inputValues.shortBreakValue,
            longBreakTime: inputValues.longBreakValue,
            pomodoroInterval: inputValues.pomodoroIntervalValue
        }, this.updateDisplay);

        this.toggleTimerOptions();
    }

    updateTimer() {
        if(this.state.timeRemaining <= 0) {
            this.toggleTimer();

            if(!this.state.onBreak) {
                let remainingTime = this.state.shortBreakTime;
                let newPomoCount = this.state.pomoCount + 1;
                let newOnBreak = true;

                if(newPomoCount == this.state.pomodoroInterval) {
                    remainingTime = this.state.longBreakTime;
                    newPomoCount = 0;
                }

                this.setState({
                    timeRemaining: remainingTime,
                    pomoCount: newPomoCount,
                    onBreak: newOnBreak
                }, this.updateDisplay);
            }
            else {
                this.setState({
                    timeRemaining: this.state.workTime,
                    onBreak: false
                }, this.updateDisplay);
            }
        }

        this.updateDisplay();
    }

    updateDisplay() {
        let display = $(".timer-display");
        let remainingMinInt = 0
        let remainingSecInt = 0;

        if(this.state.timeRemaining / 60 >= 0) {
            remainingMinInt = Math.floor(this.state.timeRemaining/60);
            remainingSecInt = this.state.timeRemaining % 60;
        }

        let remainingMinStr = remainingMinInt.toString().length < 2 ? "0" + remainingMinInt.toString() : remainingMinInt.toString();
        let remainingSecStr = remainingSecInt.toString().length < 2 ? "0" + remainingSecInt.toString() : remainingSecInt.toString();

        display.html(`${remainingMinStr}:${remainingSecStr}`);
    }

    changeTimer(timerType) {
        clearInterval(this.state.intervalID);
        $("#toggle-btn").html("Start");

        if(timerType == "work") {
            this.setState({
                timeRemaining: this.state.workTime,
                onBreak: false
            }, this.updateDisplay);
        }
        else {
            let remainingTime = 0;

            if(timerType == "short") {
                remainingTime = this.state.shortBreakTime;
            }
            else if(timerType == "long") {
                remainingTime = this.state.longBreakTime;
            }

            this.setState({
                timeRemaining: remainingTime,
                onBreak: true
            }, this.updateDisplay);
        }
        
    }

    render() {
        return (
            <div>
                <div className="timer-selector container d-flex flex-row justify-content-center">
                    <div className="work-time-selector task-selector  text-center px-4" onClick={() => {this.changeTimer("work")}}>Work Time</div>
                    <div className="short-break-selector task-selector text-center px-4" onClick={() => {this.changeTimer("short")}}>Short Break</div>
                    <div className="long-break-selector task-selector text-center px-4" onClick={() => {this.changeTimer("long")}}>Long Break</div>
                </div>
                <h1 className="timer-display text-center display-1">00:00</h1>
                <div className="input-container container d-flex flex-row justify-content-center">
                    <div className="container d-flex flex-column">
                        <span>Work Time Duration:</span>
                        <input className="work-time-input" type="text" placeholder="minutes"></input>
                    </div>
                    <div className="container d-flex flex-column">
                        <span>Short Break Duration:</span>
                        <input className="short-break-input" type="text" placeholder="minutes"></input>
                    </div>
                    <div className="container d-flex flex-column">
                        <span>Long Break Duration:</span>
                        <input className="long-break-input" type="text" placeholder="minutes"></input>
                    </div> 
                    <div className="container d-flex flex-column">
                        <span>Long Break Interval:</span>
                        <input className="pomodoro-interval-input" type="text" placeholder="iterations"></input>
                    </div>
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