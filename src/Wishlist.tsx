import * as React from 'react';

interface WishlistItem {
  id: string;
  text: string;
}

interface Props {
  title: string;
  items: WishlistItem[];
  addItem: (text: string) => void;
  deleteItem: (id: string) => void;
}

export const Wishlist = ({ title, items, addItem, deleteItem }: Props) => {
  const renderCount = React.useRef(0);
  renderCount.current++;
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input') as HTMLInputElement;
    const text = input.value;
    input.value = '';
    if (text.length > 0) {
      addItem(text);
    }
  };
  return (
    <div style={{ padding: '1rem', border: 'solid 1px rgba(0,0,0,.2)' }}>
      <h3>{title}</h3>
      <ul>
        {items.map(item => (
          <WishlistItem
            key={item.id}
            item={item}
            deleteItem={deleteItem}
          />
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Add item" />
      </form>
      <p>Rendered {renderCount.current}</p>
    </div>
  );
};

Wishlist.displayName = "Wishlist";

export const WishlistItem = ({ item: { text, id }, deleteItem }: { item: WishlistItem, deleteItem: (id: string) => void }) => {
  return (<li>
    {text} <button onClick={() => deleteItem(id)}>Remove</button>
  </li>);
};
WishlistItem.displayName = "WishlistItem";