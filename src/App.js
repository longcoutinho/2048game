import React from 'react';
import ReactDOM  from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.scss';
import Home from './component/Home';
import Game from './component/Game';


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={< Home />}></Route>
        <Route path='/game' element={< Game />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;


