interface Item {
    id: number;
    name: string;
    category: string;
    price: number;
    quantity: number;
    value: number;
    hidden?: boolean;
  }
  
  interface State {
    isAdmin: boolean;
    items: Item[];
    stats: {
      totalProducts: number;
      totalValue: number;
      totalOutOfStock: number;
      totalCategories: number;
    };
  }
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  const initialState: State = {
    isAdmin: true,
    items: [],
    stats: {
      totalProducts: 0,
      totalValue: 0,
      totalOutOfStock: 0,
      totalCategories: 0,
    },
  };

  const calculateStats = (items: any[]) => {
    const finalItems = items?.filter(item=>!item.hidden);
    const totalProducts = finalItems?.length;
    const totalValue = finalItems?.reduce((sum, item) => sum + Number(item.value.split('').slice(1).join('')), 0);
    const totalOutOfStock = finalItems?.filter((item) => item.quantity === 0).length;
    const totalCategories = new Set(finalItems?.map((item) => item.category)).size;
  
    return { totalProducts, totalValue, totalOutOfStock, totalCategories };
  };
  
  const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
      case 'TOGGLE_ADMIN':
        return { ...state, isAdmin: !state.isAdmin };
      case 'SET_ITEMS':
        return { ...state, items: action.payload, stats: calculateStats(action.payload) };
      case 'HIDE_ITEM': {
        const updatedItems = state.items.map((item) =>
            item.name === action.payload ? { ...item, hidden: !item.hidden } : item
        );
        return { ...state, items: updatedItems, stats: calculateStats(updatedItems)}
      }
      case 'DELETE_ITEM': {
        const updatedItems = state.items.filter((item) =>
            item.name !== action.payload
        );
        return { ...state, items: updatedItems, stats: calculateStats(updatedItems)}
      }
      case 'UPDATE_ITEM': {
        const updatedItems = state.items.map((item) =>
            item.name === action.payload.name ? { ...item, ...action.payload } : item
        );
        return {
          ...state,
          items: updatedItems,
          stats: calculateStats(updatedItems)
        };
      }
      default:
        return state;
    }
  };
  
  export default reducer;