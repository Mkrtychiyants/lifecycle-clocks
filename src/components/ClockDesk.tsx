import React, { Component } from 'react'
import WorldClock from './WorldClock';
type MyState = { visible: boolean, nameRef: any, zoneRef: any, clocks: any };

export interface IClock {
    id: number,
    clockName: string,
    clockZone: string,
    active: boolean,
    date: Date,
}

export default class ClockDesk extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
            nameRef: React.createRef(),
            zoneRef: React.createRef(),
            clocks: [{
                id: 10,
                clockName: "moscow",
                clockZone: "0",
                active: true,
                date: Date.now()
            },
            {
                id: 11,
                clockName: "ny",
                clockZone: "1",
                active: true,
                date: Date.now()
            },
            {
                id: 11,
                clockName: "ny",
                clockZone: "1",
                active: true,
                date: Date.now()
            }
            ]
        }
    }
    clockStart = () => {
        const newClock: IClock = {
            id: Math.floor(Math.random() * 100),
            clockName: this.state.nameRef.current.value,
            clockZone: this.state.zoneRef.current.value,
            active: true,
            date: new Date()
        }
        // this.setState(prevState =>({
        //     ...prevState,   
        //     clocks: prevState.clocks.splice(1, 0, newClock),
        // }))
        // this.setState(prevState =>({     
        //     clocks: prevState.clocks.splice(1, 0, newClock),
        // }))
        // this.setState({
        //     clocks: this.state.clocks.splice(1, 0, newClock),
        // }
        this.setState({
                clocks: this.state.clocks.splice(1, 0, newClock),
            })
        // this.state.clocks.splice(1, 0, newClock);
        console.log( this.state.clocks)

    }
    clockEnd = () => {


    }
    componentDidMount(): void {
        console.log("New mount clockdesk");
       
    }
    render() {

        return (
            <div className="clockInputs">
                <input
                    id='clockName'
                    className='clockNameInput'
                    type="text"
                    ref={this.state.nameRef}
                />
                <label htmlFor="clockName" className='clockNameLable'>Название</label>
                <input
                    id='clockZone'
                    className='clockZoneInput'
                    type="text"
                    ref={this.state.zoneRef}
                />
                <label htmlFor="clockZone" className='clockZoneInput'>Временная зона</label>

                <button onClick={this.clockStart}>Добавить</button>
                {/* <ul className='clockList'>
                    {this.state.clocks.map((item: IClock) => (
                        <WorldClock
                            key={item.id}
                            item={item}
                            remove={this.clockEnd}
                        />
                    ))}
                </ul> */}
            </div>

        )
    }
}
