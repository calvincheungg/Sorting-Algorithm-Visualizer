import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from './SortingAlgorithms';

const DEFAULT_ARRAY_SIZE = 100;
const DEFAULT_RANDOM_INT_MIN = 10;
const DEFAULT_RANDOM_INT_MAX = 500;
const DEFAULT_ANIMATION_SPEED_MS = 5;

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            animationSpeed: DEFAULT_ANIMATION_SPEED_MS,
            numOfBars: DEFAULT_ARRAY_SIZE,
            minSize: DEFAULT_RANDOM_INT_MIN,
            maxSize: DEFAULT_RANDOM_INT_MAX,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.generateArray();
    }

    generateArray() {
        const array = [];
        for(let i = 0; i < this.state.numOfBars; i++) {
            array.push(generateRandomInt(this.state.minSize, this.state.maxSize));
        }
        console.log(this.state.minSize);
        console.log(this.state.maxSize);
        console.log(array);
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
                }, i * this.state.animationSpeed);
            }
            else {
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = bars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * this.state.animationSpeed);
            }
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {array} = this.state;

        return (
            <div className="array-box">

                <form className = "user-form">
                    <label>
                        Animation Speed:
                        <input
                            type="number"
                            name="animationSpeed"
                            value={this.state.animationSpeed}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Number of Bars:
                        <input
                            type="number"
                            name="numOfBars"
                            value={this.state.numOfBars}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Minimum Bar Length:
                        <input
                            type="number"
                            name="minSize"
                            value={this.state.minSize}
                            onChange={this.handleChange} />
                    </label>
                    <label>
                        Maximum Bar Length:
                        <input
                            type="number"
                            name="maxSize"
                            value={this.state.maxSize}
                            onChange={this.handleChange} />
                    </label>
                </form>

                {array.map((value, index) => (
                    <div
                        // Set the height of the bar equal to the random int
                        className="array-bar"
                        key={index}
                        style={{height: `${value}px`}}>
                    </div>
                ))}
                <button
                    className = "buttons"
                    onClick={() => this.generateArray()}>Generate New Array
                </button>
                <button
                    className = "buttons"
                    onClick ={() => this.mergeSort()}>Merge Sort
                </button>
            </div>
        );
    }
}

function generateRandomInt(min, max) {
    // min and max inclusive
    return Math.floor(Math.random() * (max - min + 1) + min);
}