import React, { Component } from 'react'
import { IClock } from './ClockDesk';
type MyState = { item?: any, hourHandRef?: any, minuteHandRef?: any, secondHandRef?: any };
type MyProps = { item: any, remove: any };

interface IClockItemProps {
    item: IClock;
    remove: (id: number) => void;
}

export default class WorldClock extends React.Component<IClockItemProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            hourHandRef: React.createRef(),
            minuteHandRef: React.createRef(),
            secondHandRef: React.createRef()
        }

    }

    updateClock(hours: any, minutes: any, seconds: any) {

        var hourDegrees = hours * 30;
        var minuteDegrees = minutes * 6;
        var secondDegrees = seconds * 6;
        this.state.hourHandRef.current.transform = `rotate(${hourDegrees}deg)`
        this.state.minuteHandRef.current.transform = `rotate(${minuteDegrees}deg)`
        this.state.secondHandRef.current.transform = `rotate(${secondDegrees}deg)`

    }

    setClockWithCurrentTime(date: Date) {

        const date1 = new Date(date);
        var hours = ((date1.getHours() + 11) % 12 + 1);
        var minutes = date1.getMinutes();
        var seconds = date1.getSeconds();

        this.updateClock(hours, minutes, seconds);
    }

    componentDidMount(): void {
        console.log("New mount clock");
        this.setClockWithCurrentTime(this.props.item.date);
    }

    componentWillUnmount(): void {
        console.log("New disMount clock")

    }
    render() {

        return (
            <li className="clockItem">
                <h3 className='clockName'>{this.props.item.clockName}</h3>
                <div className="clockCont">
                    <div className="clock">
                        <div className="hour-hand" ref={this.state.hourHandRef}></div>
                        <div className="minute-hand" ref={this.state.minuteHandRef}></div>
                        <div className="second-hand" ref={this.state.secondHandRef}></div>
                    </div>
                </div>
                <button className='remove' onClick={() => { this.props.remove(this.props.item.id) }}>Удалить</button>
            </li>
        )
    }
}
