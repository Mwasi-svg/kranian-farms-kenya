export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: 'summer-flowers' | 'premium-roses' | 'spray-roses' | 'vegetables' | 'fruits' | 'intermediate-roses' | 'herbs'| 'roses';
  featured?: boolean;
  bestseller?: boolean;
  inStock: boolean;
  subheading?: string; // Added optional subheading property
};

export const products: Product[] = [
  {
    id: 1,
    name: "Hypericum Berries",
    price: 59.99,
    description: "A stunning arrangement of seasonal spring flowers, featuring tulips, daffodils, and hyacinths. Perfect for brightening any room.",
    image: "Hypericum.png",
    category: "summer-flowers",
    featured: true,
    inStock: true,
    subheading: "Soft texture, rich color — what’s not to love?",
  },
  {
    id: 2, name: "Gypso", price: 49.99, description: "A classic bouquet of premium red roses, symbolizing love and passion. Carefully arranged with greenery and baby's breath.", image: "gypso.png",
    category: "roses",
    inStock: true, featured: true, bestseller: true
  },
  {
    id: 10, name: "Sunflower", price: 79.99, description: "A grand arrangement perfect for special occasions. Features a designer selection of seasonal premium flowers.", image: "sunflower.png",
    category: "summer-flowers",
    inStock: true, bestseller: true, featured: true
  },
  {
    id: 99,
    name: "Basil",
    price: 39.99,
    description: "Fresh basil",
    image: "basil.png",
    category: "herbs",
    inStock: true,
  },
   {
    id: 11, name: "Chives", price: 39.99, description: "Fresh chives", image: "chives.png", category: "herbs", inStock: true
  },
  {
    id: 102,  name: "Marjoram", price: 39.99, description: "Fresh marjoram",  image: "marjoram.png", category: "herbs", inStock: true,
  },
  { id: 103, name: "Mint", price: 39.99, description: "Fresh mint", image: "mint.png", category: "herbs", inStock: true },
  { id: 104, name: "Oregano", price: 39.99, description: "Fresh oregano", image: "oregano.png", category: "herbs", inStock: true },
  { id: 105, name: "Rosemary", price: 39.99, description: "Fresh rosemary", image: "rosemary.png", category: "herbs", inStock: true },
  { id: 106, name: "Sage", price: 39.99, description: "Fresh sage", image: "sage.png", category: "herbs", inStock: true },
  { id: 107, name: "Tarragon", price: 39.99, description: "Fresh tarragon", image: "tarragon.png", category: "herbs", inStock: true },
  { id: 108, name: "Thyme", price: 39.99, description: "Fresh thyme", image: "thyme.png", category: "herbs", inStock: true },

  {id: 12, name: "Bupleurum", price: 30, description: "filler", image: "BUPLEURUM.png", category: "summer-flowers", inStock: true},
  {id: 13, name: "Ammi", price: 30, description: "filler", image: "AMMI_VISNAGA.png", category: "summer-flowers", inStock: true,},
  {id: 14, name: "Delphinium", price: 30, description: "filler", image: "DELPHINIUM.png", category: "summer-flowers", inStock: true},
  {id: 15, name: "Agapanthus", price: 30, description: "filler", image: "AGAPANTHUS.png", category: "summer-flowers", inStock: true},
  {id: 16, name: "Arabicum", price: 30, description: "filler", image: "ARABICUM.png", category: "summer-flowers", inStock: true},
  {id: 17, name: "Alstroemeria", price: 30, description: "filler", image: "ALSTROEMERIA.png", category: "summer-flowers", inStock: true},
  {id: 18, name: "Chrysanthemums", price: 30, description: "filler", image: "CHRYSANTHEMUMS.png", category: "summer-flowers", inStock: true},
  {id: 19, name: "Mathiola", price: 30, description: "filler", image: "MATTHIOLA.png", category: "summer-flowers", inStock: true},
  {id: 20, name: "Craspedia", price: 30, description: "filler", image: "CRASPEDIA.png", category: "summer-flowers", inStock: true},
  {id: 21, name: "Eryngium", price: 30, description: "filler", image: "ERYNGIUM.png", category: "summer-flowers", inStock: true, bestseller: true},
  {id: 22, name: "Eucalyptus", price: 30, description: "filler", image: "EUCALYPTUS.png", category: "summer-flowers", inStock: true},
  {id: 23, name: "Monstera Leaves", price: 30, description: "filler", image: "MONSTERA_LEAVES.png", category: "summer-flowers", inStock: true},
  {id: 24, name: "Leather Ferns", price: 30, description: "filler", image: "LEATHER_FERNS.png", category: "summer-flowers", inStock: true},
  {id: 25, name: "Limonium", price: 30, description: "filler", image: "LIMONIUM.png", category: "summer-flowers", inStock: true},
  {id: 26, name: "Lisianthus", price: 30, description: "filler", image: "LISIANTHUS.png", category: "summer-flowers", inStock: true},
  {id: 27, name: "Hypericum", price: 30, description: "filler", image: "HYPERICUM_BERRIES.png", category: "summer-flowers", inStock: true},
  {id: 28, name: "Orienal Lillies", price: 30, description: "filler", image: "ORIENTAL_LILLIES.png", category: "summer-flowers", inStock: true},
  {id: 29, name: "Ornis", price: 30, description: "filler", image: "ORNIS.png", category: "summer-flowers", inStock: true},
  {id: 30, name: "Ruscus", price: 30, description: "filler", image: "RUSCUS.png", category: "summer-flowers", inStock: true},
  {id: 31, name: "Scabiosa", price: 30, description: "filler", image: "SCABIOSA.png", category: "summer-flowers", inStock: true},
  {id: 32, name: "Statice", price: 30, description: "filler", image: "STATICE.png", category: "summer-flowers", inStock: true},

  {id: 42, name: "Alison", price: 30, description: "filler", image: "ALISON.png", category: "premium-roses", inStock: true},
  {id: 51, name: "Jumilia", price: 30, description: "filler", image: "JUMILIA.png", category: "premium-roses", inStock: true},
  {id: 52, name: "Lampion", price: 30, description: "filler", image: "LAMPION.png", category: "premium-roses", inStock: true},
  {id: 53, name: "Moon Walker", price: 30, description: "filler", image: "MOON_WALKER.png", category: "premium-roses", inStock: true},
  {id: 54, name: "Orange Crush", price: 30, description: "filler", image: "ORANGE_CRUSH.png", category: "premium-roses", inStock: true},
  {id: 55, name: "Pink Rhodos", price: 30, description: "filler", image: "RHODOS.png", category: "premium-roses", inStock: true},
  {id: 56, name: "Proud", price: 30, description: "filler", image: "PROUD_ROSE.png", category: "premium-roses", inStock: true},
  {id: 57, name: "Revival", price: 30, description: "filler", image: "REVIVAL.png", category: "premium-roses", inStock: true},
  {id: 58, name: "Rhodos", price: 30, description: "filler", image: "RHODOS.png", category: "premium-roses", inStock: true},
  {id: 59, name: "Shangai Lady", price: 30, description: "filler", image: "SHANGAI_LADY.png", category: "premium-roses", inStock: true},
  {id: 60, name: "Babe", price: 30, description: "filler", image: "babe.png", category: "spray-roses", inStock: true},
  {id: 61, name: "Dinara", price: 30, description: "filler", image: "dinara.png", category: "spray-roses", inStock: true},
  {id: 63, name: "Fireworks", price: 30, description: "filler", image: "firework.png", category: "spray-roses", inStock: true},
  {id: 64, name: "Marisa", price: 30, description: "filler", image: "marisa.png", category: "spray-roses", inStock: true},
  {id: 65, name: "Mirabel", price: 30, description: "filler", image: "mirabel.png", category: "spray-roses", inStock: true},
  {id: 66, name: "Miss Bombastic", price: 30, description: "filler", image: "missbombastic.png", category: "spray-roses", inStock: true},
  {id: 67, name: "Reflex", price: 30, description: "filler", image: "reflex.png", category: "spray-roses", inStock: true, featured: true},
  {id: 68, name: "Snowflake", price: 30, description: "filler", image: "snowflake.png", category: "spray-roses", inStock: true},
  {id: 69, name: "Aqua", price: 30, description: "filler", image: "aqua.png", category: "intermediate-roses", inStock: true},
  {id: 70, name: "Athena", price: 30, description: "filler", image: "ATHENA.png", category: "intermediate-roses", inStock: true},
  {id: 71, name: "Bellerose", price: 30, description: "filler", image: "bellerose.png", category: "intermediate-roses", inStock: true},
  {id: 72, name: "Bingo Cerise", price: 30, description: "filler", image: "bingocerise.png", category: "intermediate-roses", inStock: true},
  {id: 73, name: "Burgundy", price: 30, description: "filler", image: "BURGUNDY.png", category: "intermediate-roses", inStock: true},
  {id: 74, name: "High and Sparkling", price: 30, description: "filler", image: "highandsparkling.png", category: "intermediate-roses", inStock: true},
  {id: 75, name: "Julishka", price: 30, description: "filler", image: "julishka.png", category: "intermediate-roses", inStock: true},
  {id: 76, name: "Labelle", price: 30, description: "filler", image: "labelle.png", category: "intermediate-roses", inStock: true},
  {id: 77, name: "Madam Cerise", price: 30, description: "filler", image: "madamcerise.png", category: "intermediate-roses", inStock: true},
  {id: 78, name: "Madam Pink", price: 30, description: "filler", image: "madampink.png", category: "intermediate-roses", inStock: true},
  {id: 79, name: "Madam Red", price: 30, description: "filler", image: "MADAM_RED.png", category: "intermediate-roses", inStock: true},
  {id: 80, name: "Marina", price: 30, description: "filler", image: "marina.png", category: "intermediate-roses", inStock: true},
  {id: 81, name: "Moonwalk", price: 30, description: "filler", image: "moonwalk.png", category: "intermediate-roses", inStock: true},
  {id: 82, name: "Pink Ace", price: 30, description: "filler", image: "pinkace.png", category: "intermediate-roses", inStock: true},

  {id: 84, name: "French Beans", price: 30, description: "filler", image: "frenchbeans.png", category: "vegetables", inStock: true},
  {id: 85, name: "Sugar Snaps", price: 30, description: "filler", image: "sugarsnaps.png", category: "vegetables", inStock: true},
  {id: 86, name: "Snow Peas", price: 30, description: "filler", image: "snowpeas.png", category: "vegetables", inStock: true},
  {id: 87, name: "Sweet Potatoes", price: 30, description: "filler", image: "sweetpotato.png", category: "vegetables", inStock: true},
  {id: 88, name: "Baby Carrots", price: 30, description: "filler", image: "babycarrots.png", category: "vegetables", inStock: true},
  {id: 89, name: "Baby Corn", price: 30, description: "filler", image: "babycorn.png", category: "vegetables", inStock: true},
  {id: 90, name: "Passion Fruit", price: 30, description: "filler", image: "passion.png", category: "fruits", inStock: true},
  {id: 91, name: "Pineapples", price: 30, description: "filler", image: "pineapple.png", category: "fruits", inStock: true},
  {id: 92, name: "Avocados", price: 30, description: "filler", image: "avocado.png", category: "fruits", inStock: true},
  {id: 93, name: "Mangoes", price: 30, description: "filler", image: "mango.png", category: "fruits", inStock: true, featured: true, bestseller: true},
  {id: 94, name: "Cavendish Bananas (export)", price: 30, description: "filler", image: "banana.png", category: "fruits", inStock: true},
  {id: 95, name: "Apples (import)", price: 30, description: "filler", image: "apples.png", category: "fruits", inStock: true},
  {id: 96, name: "Strawberries (import)", price: 30, description: "filler", image: "strawberry.png", category: "fruits", inStock: true},
  {id: 97, name: "Grapes (import)", price: 30, description: "filler", image: "grapes.png", category: "fruits", inStock: true},
  {id: 98, name: "Oranges (import)", price: 30, description: "filler", image: "oranges.png", category: "fruits", inStock: true},
  {
    id: 3,
    name: "Fireflash Roses",
    price: 24.99,
    description: "A vibrant bouquet of spray roses, perfect for adding a pop of color. Each stem is carefully selected for its beauty and freshness.",
    image: "fireflash.png",
    category: "spray-roses",
    inStock: true,
  },
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
