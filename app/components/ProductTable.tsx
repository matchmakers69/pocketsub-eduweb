"use client";

const basketArray = [
  {
    id: "772cf6b1-1da3-4030-b360-4a159e1a51fe",
    name: "Rear shifter",
    price: 75.0,
    currency: "GBP",
    category: "Parts",
  },
  {
    id: "113cad72-fc18-424a-87b6-fd75683798dd",
    name: "Front shifter",
    price: 35.0,
    currency: "GBP",
    category: "Parts",
  },
  {
    id: "01c79cac-5404-4998-a12c-fd2ba79bfd1d",
    name: "Chain",
    price: 30.0,
    currency: "GBP",
    category: "Parts",
  },
  {
    id: "fbda81c6-8d5f-4056-a57c-93a0cf6aca0a",
    name: "Googles",
    price: 100.0,
    currency: "USD",
    category: "Clothes",
  },
  {
    id: "55e826bb-9be2-46c0-8008-4508547f0d18",
    name: "Gloves",
    price: 40.0,
    currency: "USD",
    category: "Clothes",
  },
  {
    id: "977277cf-e4eb-4580-874f-9a8cac3b1218",
    name: "Boots",
    price: 120.0,
    currency: "GBP",
    category: "Clothes",
  },
  {
    id: "61c9e3dc-8758-404c-8e5f-b6b363ef1212",
    name: "Saddle",
    price: 200.0,
    currency: "EUR",
    category: "Parts",
  },
  {
    id: "6cac1486-dbbc-4994-a82c-6739e3a90494",
    name: "Service",
    price: 200.0,
    currency: "EUR",
    category: "Repairs",
  },
];

import React, { useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: string;
}

const ProductTable: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(basketArray);
  const [isAscending, setIsAscending] = useState<boolean>(true);

  const handleSort = () => {
    const sortedProducts = [...products].sort((a, b) => {
      return isAscending ? a.price - b.price : b.price - a.price;
    });

    setProducts(sortedProducts);
    setIsAscending(!isAscending);
  };

  return (
    <div>
      <button onClick={handleSort}>
        Sort by Price {isAscending ? "↑" : "↓"}
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Currency</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price.toFixed(2)}</td>
              <td>{product.currency}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
