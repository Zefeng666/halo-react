// import React from 'react';
// import ReactDOM from 'react-dom';
import React from './haloJs';

const ReactDOM = React;

let element = <div>
  <h1> halo-react </h1>
  <p> 手写react </p>
  <a href="http://www.baidu.com">跳转</a>
</div>

ReactDOM.render(element, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
