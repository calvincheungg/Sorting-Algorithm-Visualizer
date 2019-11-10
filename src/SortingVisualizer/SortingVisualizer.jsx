import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './SortingAlgorithms';

const ARRAY_SIZE = 100;
const RANDOM_INT_MIN = 10;
const RANDOM_INT_MAX = 500;
const ANIMATION_SPEED_MS = 3;

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
        for(let i = 0; i < ARRAY_SIZE; i++) {
            array.push(generateRandomInt(RANDOM_INT_MIN, RANDOM_INT_MAX));
        }
        this.setState({array});
    }

    mergeSort() {
        const animations = sortingAlgorithms.mergeSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const bars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const[barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = bars[barOneIndex].style;
                const barTwoStyle = bars[barTwoIndex].style;
                const color = i % 3 === 0 ? 'red' : 'lightblue';
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }
            else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
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