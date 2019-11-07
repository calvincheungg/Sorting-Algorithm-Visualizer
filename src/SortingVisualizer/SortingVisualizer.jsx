import React from 'react';
import './SortingVisualizer.css';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray() {
        const array = [];
        for(let i = 0; i < 100; i++) {
            array.push(generateRandomInt(10, 500));
        }
        this.setState({array});
    }

    mergeSort() {

    }
    render() {
        const {array} = this.state;

        return (
            <div className="array-box">
                {array.map((value, index) => (
                    <div
                        // Set the height of the bar equal to the random int
                        className="array-bar"
                        key={index}
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <button onClick={() => this.generateArray()}>Generate New Array</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
            </div>
        );
    }
}

function generateRandomInt(min, max) {
    // min and max inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}