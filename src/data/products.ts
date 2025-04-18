
export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'bouquet' | 'roses' | 'herbs' | 'vegetables';
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
};

export const products: Product[] = [
  {
    id: 1,
    name: "Hypericum Berries",
    price: 59.99,
    description: "A stunning arrangement of seasonal spring flowers, featuring tulips, daffodils, and hyacinths. Perfect for brightening any room.",
    image: "Hypericum.png",
    category: "bouquet",
    subheading: "Soft texture, rich color — what’s not to love?",
    featured: true,
    bestseller: true,
    inStock: true
  },
  {
    id: 2, name: "Gypso", price: 49.99, description: "A classic bouquet of premium red roses, symbolizing love and passion. Carefully arranged with greenery and baby's breath.", image: "gypso.png",
    category: "roses",
    bestseller: true,
    inStock: true

  },
  {
    id: 3, name: "Fireflash Roses", price: 24.99, description: "A set of three essential culinary herbs: basil, rosemary, and thyme. Grown organically at our farm.", image: "fireflash.png", category: "herbs",
    featured: true,
    inStock: true

  },
  {
    id: 4,
    name: "Farm Fresh Vegetables",
    price: 34.99,
    description: "A seasonal selection of our farm-fresh vegetables. May include tomatoes, lettuce, carrots, and peppers.",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "vegetables",
    inStock: true
  },
  {
    id: 5,
    name: "Premium White Roses",
    price: 64.99,
    description: "Elegant white roses, perfect for weddings, formal events, or as a luxurious gift. Each stem carefully selected for quality.",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "roses",
    inStock: true
  },
  {
    id: 6, name: "Marjoram", price: 39.99, description: "Bright and cheerful arrangement featuring sunflowers and complementary blooms. Brings the sunshine indoors!", image: "marjoram.png",
    category: "bouquet",
    featured: true,
    inStock: true

  },
  {
    id: 7,
    name: "Aromatic Mint Collection",
    price: 19.99,
    description: "Three varieties of fresh mint plants: peppermint, spearmint, and chocolate mint. Perfect for teas and cocktails.",
    image: "https://images.unsplash.com/photo-1599031628994-ce86358c84a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "herbs",
    inStock: true
  },
  {
    id: 8, name: "Lisianthus", price: 29.99, description: "A set of three heirloom tomato varieties, ready to plant in your garden. Produces flavorful, unique tomatoes.", image: "lisianthus.png",
    category: "bouquet",
    featured: true,
    inStock: true

  },
  {
    id: 9,
    name: "Luxury Rose Box",
    price: 129.99,
    description: "Premium preserved roses arranged in an elegant gift box. These specially treated roses will last for months.",
    image: "https://images.unsplash.com/photo-1551909496-d9d4a69d4acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "roses",
    inStock: true
  },
  {
    id: 10,
    name: "Sunflower",
    price: 79.99,
    description: "A grand arrangement perfect for special occasions. Features a designer selection of seasonal premium flowers.",
    image: "sunflower.png",
    category: "bouquet",
    bestseller: true,
    inStock: true
  },
  {
    id: 11,
    name: "Culinary Herb Sampler",
    price: 39.99,
    description: "An extensive collection of culinary herbs including parsley, sage, rosemary, thyme, oregano, and cilantro.",
    image: "https://images.unsplash.com/photo-1515704089429-fd06e6668458?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "herbs",
    inStock: true
  },
  {
    id: 12,
    name: "Gourmet Vegetable Selection",
    price: 49.99,
    description: "Premium vegetable assortment including specialty items like colored bell peppers, heirloom tomatoes, and purple carrots.",
    image: "https://images.unsplash.com/photo-1607305387299-a3d9611cd469?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "vegetables",
    inStock: true
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductById = (id: number) => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.featured);
};

export const getBestsellerProducts = () => {
  return products.filter(product => product.bestseller);
};
