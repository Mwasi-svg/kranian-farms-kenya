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
    title: "🌸 Color, Commerce & Collaboration: Kranian Farms at IFTEX 2025",
    slug: "sustainable-farming-future-agriculture",
    excerpt: "Discover how sustainable farming practices are revolutionizing agriculture and creating a better future for our planet.",
    content: `
      <p>At the 12th International Floriculture Trade Expo (IFTEX) held at the Visa Oshwal Centre, Kranian Farms took center stage among 189 exhibitors from 18 countries, contributing to a record-breaking three-day event.</p>
      
      <h2>A Stunning Showcase</h2>
      <p>Kranian Farms displayed a vibrant selection: Ammi visnaga, Delphiniums, Agapanthus, Gypsophila, Matthiola, Craspedia, and Eryngiums. These blooms captured attention, highlighting Kranian’s versatility and commitment to both beauty and quality</p>
      
      <h2>Fostering Global Connections</h2>
      <p>Kranian engaged in productive B2B conversations, forging new relationships and strengthening its foothold in international markets.</p>
    `,
    image: "/instagram4.jpg",
    date: "June 5, 2025",
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
    image: "/instagram6.png",
    date: "March 10, 2025",
    readTime: "4 min read",
    category: "Quality",
    tags: ["Quality", "Fresh", "Direct", "Promise"],
    author: {
      name: "Brian Senelwa",
      avatar: "/brian.png"
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
    title: "From Kenyan Soil to Global Tables: A Day on Kranian Farms",
    slug: "benefits-organic-honey",
    excerpt: "Nestled in the fertile highlands of Kenya’s Rift Valley and Western regions, Kranian Farms is where vibrant tropical produce begins.",
    content: `
      <p>Kranian Farms is where vibrant tropical produce begins its journey to dinner tables around the world. </p>
      
      <h2>Kenya’s Bounty: Fruits with a Story</h2>
      <ul>
        <li><strong>Cavendish Bananas:</strong> Grown without synthetic fertilizers, with natural ripening on the plant.</li>
        <li><strong>Hass & Fuerte Avocados:</strong> High oil content, creamy texture—perfect for export markets in Europe and the Middle East.</li>
        <li><strong>Passion Fruits & Mangos:</strong> Rich in flavor, especially the Kenti and Apple mango varieties that mature between November and March.

</li>
        <li><strong>Pineapples:</strong> Grown on open-air ridges using mulching and composting to boost sweetness naturally.

</li>
      </ul>
      
      <h2>The Export Journey</h2>
      <p>From farm to freight, here’s what happens behind the scenes:

</p>
      
      <ul>
        <li><strong>Sorting & Grading:</strong> Each produce is hand-sorted based on client specifications.</li>
        <li><strong>Post-Harvest Handling:</strong> Eco-friendly cleaning, cold chain storage, and zero-residue packaging are implemented.</li>
        <li><strong>Documentation:</strong> Shipping records are meticulously logged.</li>
        <li><strong>Logistics:</strong>  In partnership with licensed freight handlers, produce is shipped via air to markets within 24–72 hours.</li>
      </ul>
      
      
      <p>With a clear mission and strong partnerships, the farm aims to continue being a model for regenerative agriculture and equitable growth in Africa.</p>
    `,
    image: "/instagram5.jpg",
    date: "February 28, 2024",
    readTime: "4 min read",
    category: "Products",
    tags: ["Honey", "Organic", "Health", "Natural"],
    author: {
      name: "Brian Senelwa",
      avatar: "/brian.png"
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

export function getRelatedPosts(currentPostId: number, limit: number = 3): BlogPost[] {
  const currentPost = blogPosts.find(post => post.id === currentPostId);
  if (!currentPost) return [];

  // Find posts with similar tags or same category
  const relatedPosts = blogPosts
    .filter(post => post.id !== currentPostId)
    .map(post => {
      let score = 0;
      
      // Same category gets higher score
      if (post.category === currentPost.category) {
        score += 3;
      }
      
      // Shared tags get points
      const sharedTags = post.tags.filter(tag => 
        currentPost.tags.includes(tag)
      );
      score += sharedTags.length;
      
      return { post, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);

  // If we don't have enough related posts, fill with recent posts
  if (relatedPosts.length < limit) {
    const recentPosts = getRecentBlogPosts(limit)
      .filter(post => 
        post.id !== currentPostId && 
        !relatedPosts.some(rp => rp.id === post.id)
      );
    
    relatedPosts.push(...recentPosts.slice(0, limit - relatedPosts.length));
  }

  return relatedPosts;
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
