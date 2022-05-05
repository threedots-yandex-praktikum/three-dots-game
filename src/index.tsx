import React from 'react';
import ReactDOM from 'react-dom';
import { Root } from 'components/Root/Root';
import { startServiceWorker } from 'modules/sw/startServiceWorker';

startServiceWorker();
ReactDOM.render(<Root />, document.getElementById('root'));


