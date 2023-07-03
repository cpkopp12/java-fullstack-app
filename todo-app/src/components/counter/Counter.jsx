import { useState } from 'react';

import './counter.css';
import CounterButton from './CounterButton';

export default function Counter() {
    const [count, setCount] = useState(0);

    function incrementCounterParentFunction(by) {
        setCount(count + by);
    }

    function decrementCounterParentFunction(by) {
        setCount(count - by);
    }

    function resetCounter() {
        setCount(0);
    }

    return (
        <>
            <span className="counter">{count}</span>
            <CounterButton incrementParentFunction={incrementCounterParentFunction} decrementParentFunction={decrementCounterParentFunction} />
            <CounterButton by={2} incrementParentFunction={incrementCounterParentFunction} decrementParentFunction={decrementCounterParentFunction} />
            <CounterButton by={5} incrementParentFunction={incrementCounterParentFunction} decrementParentFunction={decrementCounterParentFunction} />
            <button className="resetButton" onClick={resetCounter}>reset</button>
        </>
    )
}
