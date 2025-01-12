import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: JSX.Element;
}

const Card: React.FC<CardProps> = ({ title, value, icon }) => (
  <div className="card">
    <span className="icon">{icon}</span>
    <div className='card-header'>
        <h3>{title}</h3>
        <p>{value}</p>
    </div>
    
  </div>
);

export default Card;
