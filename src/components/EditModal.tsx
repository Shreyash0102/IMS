import React from 'react';
import { useDispatch } from 'react-redux';

interface EditModalProps {
  item: any;
  onClose: () => void;
}

const sanitizeInput = (input: string) => {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
};
  

const EditModal: React.FC<EditModalProps> = ({ item, onClose }) => {
  const [updatedItem, setUpdatedItem] = React.useState(item);
  const [errors, setErrors] = React.useState({} as any);
  const dispatch = useDispatch();

  const validateInputs = () => {
    const newErrors: any = {};

    if (!updatedItem.category.trim()) newErrors.category = 'Category is required.';
    if (updatedItem.price <= 0) newErrors.price = 'Price must be greater than 0.';
    if (updatedItem.quantity < 0) newErrors.quantity = 'Quantity cannot be negative.';
    if (updatedItem.value < 0) newErrors.value = 'Value cannot be negative.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if(name === 'price' || name === 'value'){
        setUpdatedItem({...updatedItem, [name]: `$${value}`})
    } else {
        setUpdatedItem({ ...updatedItem, [name]: sanitizeInput(value) });
    }
  };

  const handleSave = () => {
    if(validateInputs()){
        dispatch({ type: 'UPDATE_ITEM', payload: updatedItem });
        onClose();
    }
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
            {errors.category && <span className="error">{errors.category}</span>}
          </label>
          <label>
            Price:
            <input
              name="price"
              type="number"
              value={Number(updatedItem.price.substring(1))}
              onChange={handleChange}
            />
            {errors.price && <span className="error">{errors.price}</span>}
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
            {errors.quantity && <span className="error">{errors.quantity}</span>}
          </label>
          <label>
            Value:
            <input
              name="value"
              type="number"
              value={Number(updatedItem.value.substring(1))}
              onChange={handleChange}
            />
            {errors.value && <span className="error">{errors.value}</span>}
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