import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('minhon_cart');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('minhon_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, size: string) => {
    setItems((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id && item.size === size
      );
      
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...current, { product, size, quantity: 1 }];
    });
  };

  const removeItem = (productId: string, size: string) => {
    setItems((current) => current.filter(
      (item) => !(item.product.id === productId && item.size === size)
    ));
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity < 1) {
      removeItem(productId, size);
      return;
    }
    
    setItems((current) =>
      current.map((item) =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  };
}
