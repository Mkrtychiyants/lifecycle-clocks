import React, { Component } from 'react'
import { IClock } from './ClockDesk';
type MyState = { item?: any, hourHandRef?: any, minuteHandRef?: any, secondHandRef?: any, timeout?: any };
type MyProps = { item: any, remove: any };

interface IClockItemProps {
    item: IClock;
    remove: (id: number) => void;
}

export default class WorldClock extends React.Component<IClockItemProps, MyState> {
    constructor(props: any) {
        super(props);
    }
    timeInt = 0;
    hourHandRef = React.createRef<HTMLDivElement>();
    minuteHandRef = React.createRef<HTMLDivElement>();
    secondHandRef = React.createRef<HTMLDivElement>();

    updateClock(hours: any, minutes: any, seconds: any) {

        var hourDegrees = hours * 30;
        var minuteDegrees = minutes * 6;
        var secondDegrees = seconds * 6;


        if (this.hourHandRef.current != undefined) {
            this.hourHandRef.current.style.transform = `rotate(${hourDegrees}deg)`
        }
        if (this.minuteHandRef.current != undefined) {
            this.minuteHandRef.current.style.transform = `rotate(${minuteDegrees}deg)`
        }
        if (this.secondHandRef.current != undefined) {
            this.secondHandRef.current.style.transform = `rotate(${secondDegrees}deg)`
        }
    }

    setClockWithCurrentTime(date: Date) {

        const date1 = new Date(date);
         const time2 = new Date(Date.now());
        var hours = ((date1.getHours() + 11) % 12 + 1);
        var minutes = date1.getMinutes();
        var seconds = date1.getSeconds()+ time2.getSeconds();

        this.updateClock(hours, minutes, seconds);
    }

    componentDidMount(): void {
        console.log("New mount clock");
        const time = new Date(this.props.item.date)
        const timeZoneOff =  Number(this.props?.item?.clockZone); 
        const tzDifference = timeZoneOff * 60 + time.getTimezoneOffset();
        const offsetTime = new Date(time.getTime() + tzDifference * 60 * 1000);
        this.setClockWithCurrentTime(offsetTime);

        this.timeInt = window.setInterval(() => { this.setClockWithCurrentTime( offsetTime) }, 1000)
    }

    componentWillUnmount(): void {
        console.log("New disMount clock")
        window.clearInterval(this.timeInt)
    }
    render() {

        return (
            <li className="clockItem">
                <h3 className='clockName'>{this.props.item.clockName}</h3>
                <div className="clockCont">
                    <div className="clock">
                        <div className="hour-hand" ref={this.hourHandRef}></div>
                        <div className="minute-hand" ref={this.minuteHandRef}></div>
                        <div className="second-hand" ref={this.secondHandRef}></div>
                    </div>
                </div>
                <button className='remove' onClick={() => { this.props.remove(this.props.item.id) }}>Удалить</button>
            </li>
        )
    }
}
