export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    avatar: string;
  };
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sustainable Farming: The Future of Agriculture",
    slug: "sustainable-farming-future-agriculture",
    excerpt: "Discover how sustainable farming practices are revolutionizing agriculture and creating a better future for our planet.",
    content: `
      <p>Sustainable farming is more than just a trend—it's a necessity for our planet's future. At Kranian Farms, we've embraced practices that not only yield exceptional produce but also protect and nurture our environment.</p>
      
      <h2>What is Sustainable Farming?</h2>
      <p>Sustainable farming involves using methods that protect the environment, public health, human communities, and animal welfare. It's about finding the balance between growing food and preserving the earth for future generations.</p>
      
      <h2>Our Sustainable Practices</h2>
      <ul>
        <li><strong>Crop Rotation:</strong> We rotate crops to maintain soil health and reduce pest buildup naturally.</li>
        <li><strong>Water Conservation:</strong> Our drip irrigation systems minimize water waste while ensuring crops receive adequate hydration.</li>
        <li><strong>Organic Pest Control:</strong> We use beneficial insects and organic methods to control pests without harmful chemicals.</li>
        <li><strong>Composting:</strong> Our composting program turns organic waste into nutrient-rich soil amendments.</li>
      </ul>
      
      <h2>The Benefits</h2>
      <p>Sustainable farming doesn't just benefit the environment—it produces healthier, more nutritious food. Our customers consistently tell us they can taste the difference in our organically grown fruits and vegetables.</p>
      
      <p>By choosing sustainable produce, you're not just making a healthy choice for your family—you're supporting a farming system that will continue to provide for generations to come.</p>
    `,
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 15, 2024",
    readTime: "5 min read",
    category: "Sustainability",
    tags: ["Sustainability", "Organic", "Environment", "Future"],
    author: {
      name: "Rachel Muturi",
      avatar: "/rachel.png"
    }
  },
  {
    id: 2,
    title: "From Farm to Table: Our Quality Promise",
    slug: "farm-to-table-quality-promise",
    excerpt: "Learn about our commitment to delivering the freshest produce directly from our farms to your table.",
    content: `
      <p>At Kranian Farms, the journey from farm to table is more than just logistics—it's a promise of quality, freshness, and care in every step of the process.</p>
      
      <h2>Our Quality Standards</h2>
      <p>We maintain the highest standards from seed to harvest:</p>
      
      <ul>
        <li><strong>Premium Seeds:</strong> We source only the finest seeds from trusted suppliers.</li>
        <li><strong>Optimal Growing Conditions:</strong> Our farmers monitor soil, water, and weather conditions daily.</li>
        <li><strong>Harvest at Peak Ripeness:</strong> We pick our produce at the perfect moment for maximum flavor and nutrition.</li>
        <li><strong>Immediate Processing:</strong> Fresh produce is processed and packaged within hours of harvest.</li>
      </ul>
      
      <h2>Cold Chain Management</h2>
      <p>Maintaining the cold chain is crucial for preserving freshness. Our state-of-the-art refrigeration systems ensure your produce arrives as fresh as the moment it was harvested.</p>
      
      <h2>Direct Relationships</h2>
      <p>By working directly with our customers, we eliminate unnecessary middlemen and ensure you receive the freshest produce at the best prices. This direct relationship also allows us to respond quickly to your feedback and preferences.</p>
      
      <p>When you choose Kranian Farms, you're choosing a partner committed to bringing you the very best nature has to offer.</p>
    `,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 10, 2024",
    readTime: "4 min read",
    category: "Quality",
    tags: ["Quality", "Fresh", "Direct", "Promise"],
    author: {
      name: "Rachel Muturi",
      avatar: "/rachel.png"
    }
  },
  {
    id: 3,
    title: "Seasonal Eating: Why It Matters",
    slug: "seasonal-eating-why-it-matters",
    excerpt: "Explore the benefits of eating seasonally and how it can improve your health while supporting local agriculture.",
    content: `
      <p>Eating seasonally means consuming fruits and vegetables that are naturally harvested during specific times of the year in your local area. This ancient practice is gaining renewed attention as people discover its numerous benefits.</p>
      
      <h2>Health Benefits of Seasonal Eating</h2>
      <ul>
        <li><strong>Peak Nutrition:</strong> Seasonal produce is harvested at its nutritional peak, providing maximum vitamins and minerals.</li>
        <li><strong>Better Taste:</strong> Fruits and vegetables taste better when they're in season and haven't traveled long distances.</li>
        <li><strong>Variety in Diet:</strong> Seasonal eating naturally encourages dietary diversity throughout the year.</li>
        <li><strong>Cost Effective:</strong> In-season produce is typically more affordable due to local abundance.</li>
      </ul>
      
      <h2>Environmental Impact</h2>
      <p>Choosing seasonal produce reduces the environmental footprint of your food. Local, seasonal crops require less transportation, packaging, and artificial preservation, leading to lower carbon emissions.</p>
      
      <h2>Our Seasonal Calendar</h2>
      <p>At Kranian Farms, we provide our customers with a seasonal calendar that highlights what's fresh each month. This helps you plan meals around the freshest, most nutritious options available.</p>
      
      <h3>Spring (March-May)</h3>
      <p>Fresh greens, asparagus, strawberries, and herbs</p>
      
      <h3>Summer (June-August)</h3>
      <p>Tomatoes, peppers, zucchini, berries, and stone fruits</p>
      
      <h3>Fall (September-November)</h3>
      <p>Apples, pumpkins, squash, and root vegetables</p>
      
      <h3>Winter (December-February)</h3>
      <p>Citrus fruits, stored apples, and preserved vegetables</p>
      
      <p>By aligning your eating habits with nature's rhythm, you'll discover new flavors, support your local ecosystem, and enjoy the freshest food possible.</p>
    `,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "March 5, 2024",
    readTime: "6 min read",
    category: "Health",
    tags: ["Seasonal", "Health", "Nutrition", "Local"],
    author: {
      name: "Rachel Muturi",
      avatar: "/rachel.png"
    }
  },
  {
    id: 4,
    title: "The Benefits of Organic Honey",
    slug: "benefits-organic-honey",
    excerpt: "Discover the amazing health benefits and uses of our pure, organic honey straight from our apiaries.",
    content: `
      <p>Pure, organic honey is one of nature's most perfect foods. At Kranian Farms, our honey comes from carefully tended beehives where our bees forage on diverse, pesticide-free flowers and plants.</p>
      
      <h2>What Makes Our Honey Special</h2>
      <ul>
        <li><strong>Raw and Unprocessed:</strong> Our honey is never heated or filtered, preserving all natural enzymes and nutrients.</li>
        <li><strong>Single Origin:</strong> Each batch comes from specific locations, giving unique flavor profiles.</li>
        <li><strong>Sustainably Harvested:</strong> We take only what the bees can spare, ensuring healthy hive populations.</li>
        <li><strong>No Additives:</strong> Pure honey with nothing added or removed.</li>
      </ul>
      
      <h2>Health Benefits</h2>
      <p>Organic honey offers numerous health advantages:</p>
      
      <ul>
        <li><strong>Antioxidant Properties:</strong> Rich in phenolic compounds that fight free radicals.</li>
        <li><strong>Antimicrobial Effects:</strong> Natural antibacterial and antifungal properties.</li>
        <li><strong>Digestive Health:</strong> Contains prebiotics that support gut health.</li>
        <li><strong>Wound Healing:</strong> Topical application can help heal minor cuts and burns.</li>
        <li><strong>Cough Relief:</strong> A natural remedy for soothing throat irritation.</li>
      </ul>
      
      <h2>Culinary Uses</h2>
      <p>Beyond its health benefits, our honey is a versatile ingredient:</p>
      <ul>
        <li>Natural sweetener for beverages and baked goods</li>
        <li>Glaze for roasted vegetables and meats</li>
        <li>Addition to salad dressings and marinades</li>
        <li>Spread for bread and crackers</li>
        <li>Ingredient in homemade beauty treatments</li>
      </ul>
      
      <p>When you choose Kranian Farms honey, you're not just getting a superior product—you're supporting sustainable beekeeping practices that help protect these vital pollinators.</p>
    `,
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "February 28, 2024",
    readTime: "4 min read",
    category: "Products",
    tags: ["Honey", "Organic", "Health", "Natural"],
    author: {
      name: "Rachel Muturi",
      avatar: "/rachel.png"
    }
  },
  {
    id: 5,
    title: "Growing Your Own Herb Garden",
    slug: "growing-herb-garden",
    excerpt: "A beginner's guide to starting your own herb garden with tips and tricks from our experienced farmers.",
    content: `
      <p>Growing your own herbs is one of the most rewarding gardening experiences. Fresh herbs not only enhance your cooking but also provide natural remedies and beautiful fragrances for your home.</p>
      
      <h2>Getting Started</h2>
      <p>Starting an herb garden is easier than you might think. Here's what you need to know:</p>
      
      <h3>Choose Your Location</h3>
      <ul>
        <li><strong>Sunlight:</strong> Most herbs need 6-8 hours of direct sunlight daily</li>
        <li><strong>Drainage:</strong> Ensure good drainage to prevent root rot</li>
        <li><strong>Accessibility:</strong> Plant herbs where you can easily harvest them for cooking</li>
      </ul>
      
      <h3>Essential Herbs for Beginners</h3>
      <ul>
        <li><strong>Basil:</strong> Perfect for Italian dishes and easy to grow</li>
        <li><strong>Rosemary:</strong> Hardy perennial that's great with roasted meats</li>
        <li><strong>Thyme:</strong> Low-maintenance and adds flavor to many dishes</li>
        <li><strong>Parsley:</strong> Fast-growing and versatile for cooking</li>
        <li><strong>Mint:</strong> Grows vigorously (plant in containers to control spread)</li>
      </ul>
      
      <h2>Planting Tips</h2>
      <ul>
        <li>Start with seedlings for faster results</li>
        <li>Space plants according to their mature size</li>
        <li>Use quality potting soil for container gardens</li>
        <li>Water regularly but don't overwater</li>
      </ul>
      
      <h2>Harvesting and Storage</h2>
      <p>The key to a productive herb garden is regular harvesting:</p>
      <ul>
        <li>Harvest in the morning after dew has dried</li>
        <li>Cut stems just above a leaf pair to encourage growth</li>
        <li>Don't harvest more than 1/3 of the plant at once</li>
        <li>Dry herbs in small bundles or freeze in ice cube trays with oil</li>
      </ul>
      
      <h2>Common Problems and Solutions</h2>
      <ul>
        <li><strong>Pests:</strong> Use companion planting with marigolds to deter insects</li>
        <li><strong>Disease:</strong> Ensure good air circulation and avoid overwatering</li>
        <li><strong>Poor Growth:</strong> Check soil pH and nutrient levels</li>
      </ul>
      
      <p>At Kranian Farms, we offer high-quality herb seedlings and seeds to help you start your garden. Visit us for expert advice and premium plants that will thrive in your garden.</p>
    `,
    image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    date: "February 20, 2024",
    readTime: "7 min read",
    category: "Gardening",
    tags: ["Herbs", "Gardening", "DIY", "Tips"],
    author: {
      name: "Rachel Muturi",
      avatar: "/rachel.png"
    }
  }
];

export function getRecentBlogPosts(limit: number = 5): BlogPost[] {
  return blogPosts
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.category.toLowerCase() === category.toLowerCase()
  );
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export function searchBlogPosts(query: string): BlogPost[] {
  const lowerQuery = query.toLowerCase();
  return blogPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery) ||
    post.content.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllCategories(): { name: string; count: number }[] {
  const categories = blogPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(categories).map(([name, count]) => ({ name, count }));
}

export function getAllTags(): { name: string; count: number }[] {
  const tags = blogPosts.reduce((acc, post) => {
    post.tags.forEach(tag => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(tags)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
