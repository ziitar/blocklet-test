import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import './app.css';
import Home from './pages/home';
import Detail from './pages/detail';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

const WrappedApp = App;

export default () => {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <Router basename={basename}>
      <WrappedApp />
    </Router>
  );
};
