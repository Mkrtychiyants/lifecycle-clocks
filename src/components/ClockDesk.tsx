import React, { Component, createRef } from 'react'
import WorldClock from './WorldClock';
type MyState = { visible: boolean, clocks: any };

export interface IClock {
    id: number,
    clockName?: string,
    clockZone?: number,
    active: boolean,
    date: Date,
}

export default class ClockDesk extends React.Component<{}, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            visible: false,
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
                clockZone: 8,
                active: true,
                date: Date.now()
            },
            ]
        }
    }
    nameRef = React.createRef<HTMLInputElement>();
    zoneRef = React.createRef<HTMLInputElement>();

    clockStart = () => {

        this.setState({
            visible: false,
            clocks: [...this.state.clocks,

            {
                id: Math.floor(Math.random() * 100),
                clockName: this.nameRef?.current?.value,
                clockZone: this.zoneRef?.current?.value,
                active: true,
                date: new Date(Date.now())
            }

            ]
        })

        console.log(this.state.clocks)

    }
    clockEnd = (id: number): void => {
        this.setState({
            clocks: this.state.clocks.filter((item: any) => item.id !== id),
        });

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
                    ref={this.nameRef}
                />
                <label htmlFor="clockName" className='clockNameLable'>Название</label>
                <input
                    id='clockZone'
                    className='clockZoneInput'
                    type="text"
                    ref={this.zoneRef}
                />
                <label htmlFor="clockZone" className='clockZoneInput'>Временная зона</label>

                <button onClick={this.clockStart}>Добавить</button>
                <ul className='clockList'>
                    {this.state.clocks.map((item: IClock) => (
                        <WorldClock
                            key={item.id}
                            item={item}
                            remove={() => this.clockEnd(item.id)}
                        />
                    ))}
                </ul>
            </div>

        )
    }
}
