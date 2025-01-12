import React from 'react';
import { useDispatch } from 'react-redux';

interface EditModalProps {
  item: any;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ item, onClose }) => {
  const [updatedItem, setUpdatedItem] = React.useState(item);
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'price' || name === 'value'){
        setUpdatedItem({...updatedItem, [name]: `$${value}`})
    } else {
        setUpdatedItem({ ...updatedItem, [name]: value });
    }
  };

  const handleSave = () => {
    dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Item</h2>
        {item.name}
        <div className="modal-row">
          <label>
            Category:
            <input
              name="category"
              value={updatedItem.category}
              onChange={handleChange}
            />
          </label>
          <label>
            Price:
            <input
              name="price"
              type="number"
              value={updatedItem.price}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modal-row">
          <label>
            Quantity:
            <input
              name="quantity"
              type="number"
              value={updatedItem.quantity}
              onChange={handleChange}
            />
          </label>
          <label>
            Value:
            <input
              name="value"
              type="number"
              value={updatedItem.value}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="modal-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;