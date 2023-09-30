interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
    image: string;
  };
  creationAt: string;
  updatedAt: string;
}

export default Product;
