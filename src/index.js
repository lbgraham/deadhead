import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';

const title = 'Deadhead Jam';

ReactDOM.render(<App items={title} />, document.getElementById('app'));