import React from "react";
import "./RingDiagram.css"

interface IElement {
    name: string,
    percent: number,
    color: string
}

interface PropsRingDiagram {
    text?: string,
    underText?: string,
    elements: IElement[],
    default: IElement
}

const SHIFT_BY_RING = 25;

const RingDiagram = (props: PropsRingDiagram) => {
    let prevDashoffset: number = 0;

    const arrDashoffset = props.elements.map((element, i, arrElements) => {
        if (i === 0) {
            return SHIFT_BY_RING;
        }

        prevDashoffset += arrElements[i-1].percent;
        return SHIFT_BY_RING - prevDashoffset;
    });

    return (
        <figure className="RingDiagram">
            <div>
                <svg width="100%" height="100%" viewBox="0 0 42 42" className="RingDiagram__svg" aria-labelledby="beers-title beers-desc" role="img">
                    <circle 
                        className="RingDiagram__donut-ring" 
                        cx="21" cy="21" r="15.91549430918954" 
                        fill="transparent" stroke={props.default.color} 
                        strokeWidth="3" 
                        role="presentation"
                    >
                        <title>{props.default.name} ({props.default.percent}%)</title>
                    </circle>
                    
                    {
                        props.elements.map((element, i) => (
                            <circle
                                key={element.name}
                                className="RingDiagram__donut-segment" 
                                cx="21" cy="21" r="15.91549430918954" 
                                fill="transparent" stroke={element.color} 
                                strokeWidth="3" 
                                strokeDasharray={`${element.percent} ${100 - element.percent}`} 
                                strokeDashoffset={arrDashoffset[i]}
                            >
                                <title>{element.name} ({element.percent}%)</title>
                            </circle>
                        ))
                    }

                    <g className="RingDiagram__chart-text">
                        <text x="50%" y="50%" className="RingDiagram__chart-text-main">
                            {props.text}
                        </text>
                        <text x="50%" y="50%" className="RingDiagram__chart-text-under">
                            {props.underText}
                        </text>
                    </g>
                </svg>
            </div>
            <figcaption className="RingDiagram__key">
                <ul className="RingDiagram__figure-key-list" aria-hidden="true">
                    {
                        [props.default, ...props.elements].map(element => (
                            <li 
                                key={element.name}
                                className="RingDiagram__figure-key-list-item"
                            >
                                <span 
                                    className="RingDiagram__shape-circle"
                                    style={{backgroundColor: element.color}}
                                ></span> {element.name}
                            </li>
                        ))
                    }
                </ul>
            </figcaption>
        </figure>
    );
}

export default RingDiagram;
