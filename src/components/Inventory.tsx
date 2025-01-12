import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPencil, BsEye, BsTrash } from 'react-icons/bs';
import EditModal from './EditModal';

const Inventory: React.FC = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: any) => state.items) || [];
  const isAdmin = useSelector((state: any) => state.isAdmin);
  const [editItem, setEditItem] = React.useState<any | null>(null);

  React.useEffect(() => {
    fetch('https://dev-0tf0hinghgjl39z.api.raw-labs.com/inventory')
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: 'SET_ITEMS', payload: data });
      });
  }, []);

  const handleEdit = (item: any) => setEditItem(item);

  return (
    <div className="inventory">
      {editItem && (
        <EditModal
          item={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
      {items?.length === 0 ? (
        <p className="empty-message">No items available in the inventory.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: any) => (
              <tr key={item.id} style={{color: `${item.hidden? 'grey': 'white'}`}}>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.quantity}</td>
                <td>{item.value}</td>
                <td>
                  <button disabled={!isAdmin} onClick={() => handleEdit(item)}><BsPencil color={isAdmin? 'green': 'grey'} /></button>
                  <button disabled={!isAdmin} onClick={() => dispatch({type: 'HIDE_ITEM', payload: item.name})}><BsEye color={isAdmin? 'purple': 'grey'} /></button>
                  <button disabled={!isAdmin} onClick={() => dispatch({type: 'DELETE_ITEM', payload: item.name})}><BsTrash color={isAdmin? 'red ': 'grey'}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Inventory;