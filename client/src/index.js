import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

ReactDOM.render(
  <HashRouter>
  <App />
  </HashRouter>,
  document.getElementById('root')
);
