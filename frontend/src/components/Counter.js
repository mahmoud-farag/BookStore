import React, { useState } from 'react';



const Counter = ()=>{
    const [count, setCount] = useState();

       console.log('init count');
        console.log(count);
    return (

        <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
    )
}


export default Counter;