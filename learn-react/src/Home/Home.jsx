import "./Home.css"
import { useState } from "react";

function Home() {
    const [counter, setCount] = useState(0)
    const addOneCount = () => {
        setCount(counter + 1)
    }
    return (
        <>
            <h1>Counter: {counter}</h1>
            <div id="button-container">
                <button id="counter-button" onClick={addOneCount}>add one count</button>
            </div>
        </>
    );
}

export default Home;