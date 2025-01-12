import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsBoxSeam, BsCash, BsXCircle, BsFolder } from 'react-icons/bs';
import Card from './Card';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const stats = useSelector((state: any) => state.stats);

  return (
    <div className="header">
      <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
        <label className="toggle-wrapper">
            <input
                type="checkbox"
                checked={isAdmin}
                onChange={() => dispatch({ type: 'TOGGLE_ADMIN' })}
                className="toggle-checkbox"
            />
            <span className="toggle-switch"></span>
            <span className="toggle-label">{isAdmin ? 'Admin' : 'User'}</span>
        </label>
      </div>
      <h2 style={{marginTop: '40px'}}>Inventory Stats</h2>
      <div className="stats">
        <Card title="Total Products" value={stats.totalProducts} icon={<BsBoxSeam color='white' />} />
        <Card title="Total Value" value={`$${stats.totalValue}`} icon={<BsCash color='white' />} />
        <Card title="Out of Stock" value={stats.totalOutOfStock} icon={<BsXCircle color='white' />} />
        <Card title="Total Categories" value={stats.totalCategories} icon={<BsFolder color='white' />} />
      </div>
      
    </div>
  );
};

export default Header;
