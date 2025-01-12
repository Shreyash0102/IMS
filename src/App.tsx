import React from 'react';
import Header from './components/Header';
import Inventory from './components/Inventory';

const App: React.FC = () => {
  return (
    <div className="app" style={{ backgroundColor: 'black', color: 'white' }}>
      <Header />
      <Inventory />
    </div>
  );
};

export default App;