
export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: number;
  tags: string[];
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Sustainable Farming Practices That Make a Difference",
    slug: "sustainable-farming-practices",
    excerpt: "Discover how Kranian Farms is leading the way in sustainable farming, with innovative methods that protect the environment while producing premium crops.",
    content: `
      <p>At Kranian Farms, sustainability isn't just a buzzword—it's at the core of everything we do. From our water conservation efforts to our organic pest management solutions, we're committed to farming methods that protect and nurture the environment.</p>
      
      <h2>Water Conservation</h2>
      <p>Water is one of our most precious resources, especially in agriculture. Our drip irrigation systems reduce water usage by up to 60% compared to traditional methods, delivering water directly to plant roots where it's needed most. We've also implemented rainwater harvesting systems across our facilities, collecting and storing rainwater for use during drier periods.</p>
      
      <h2>Organic Pest Management</h2>
      <p>Chemical pesticides can harm beneficial insects, contaminate soil and water, and leave residues on produce. That's why we've developed an integrated pest management system that uses natural predators, companion planting, and other organic methods to keep pests at bay without resorting to harmful chemicals.</p>
      
      <h2>Soil Health Initiatives</h2>
      <p>Healthy soil is the foundation of successful farming. Our composting program converts plant waste into nutrient-rich material that enhances soil structure and fertility. We practice crop rotation to prevent soil depletion and reduce disease pressure, ensuring our land remains productive for generations to come.</p>
      
      <h2>Looking to the Future</h2>
      <p>As we continue to grow, we're constantly researching and implementing new sustainable practices. From solar-powered facilities to biodegradable packaging, we're committed to reducing our environmental footprint while delivering the exceptional produce our customers expect.</p>
      
      <p>By choosing Kranian Farms products, you're not just getting the freshest, highest-quality produce—you're supporting a business that puts the planet first. And that's a choice we can all feel good about.</p>
    `,
    image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad",
    author: {
      name: "Rachel Muturi",
      avatar: "/placeholder.svg"
    },
    date: "May 2, 2023",
    readTime: 6,
    tags: ["sustainability", "organic farming", "environment"],
    category: "Farming Practices"
  },
  {
    id: 2,
    title: "The Journey of Our Roses: From Seed to Bouquet",
    slug: "roses-seed-to-bouquet",
    excerpt: "Follow the fascinating journey of our premium roses, from careful seed selection to the moment they arrive at your doorstep.",
    content: `
      <p>Have you ever wondered about the journey a rose takes before it becomes part of a beautiful bouquet in your home? At Kranian Farms, each rose has a story that begins long before it blooms.</p>
      
      <h2>Selection and Breeding</h2>
      <p>Our journey begins with careful selection of rose varieties known for their beauty, fragrance, and longevity. Our horticulturists work year-round to breed roses that not only look stunning but can withstand the challenges of shipping while maintaining their freshness.</p>
      
      <h2>Nurturing Growth</h2>
      <p>Once planted, our roses receive the perfect balance of sunlight, water, and nutrients. Our greenhouse environment is carefully monitored to maintain ideal growing conditions, with temperatures adjusted to encourage robust growth and vibrant colors.</p>
      
      <h2>Harvesting at Peak Perfection</h2>
      <p>Timing is everything when it comes to harvesting roses. Our experienced team knows exactly when each variety should be cut to ensure it reaches you at the perfect stage of bloom. Roses are harvested in the early morning when they're most hydrated and placed immediately in temperature-controlled water to preserve freshness.</p>
      
      <h2>The Cold Chain</h2>
      <p>After harvesting, our roses enter what we call "the cold chain"—a continuous system of refrigeration that maintains the perfect temperature from our farm to your doorstep. This crucial step dramatically extends the life of each bloom, ensuring they arrive looking just as beautiful as when they were cut.</p>
      
      <h2>Craftsmanship in Arrangement</h2>
      <p>Our floral designers are artists who understand how to combine different varieties, colors, and complementary blooms to create arrangements that take your breath away. Each bouquet is hand-tied with care, reflecting both traditional techniques and contemporary design principles.</p>
      
      <p>From the moment a rose is planted to the day it brightens your home, every step in its journey is guided by our commitment to quality and beauty. That's the Kranian Farms difference—and it's why our roses make every occasion special.</p>
    `,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7",
    author: {
      name: "Brian Senelwa",
      avatar: "/placeholder.svg"
    },
    date: "April 15, 2023",
    readTime: 7,
    tags: ["roses", "floriculture", "bouquets"],
    category: "Flower Production"
  },
  {
    id: 3,
    title: "Seasonal Guide: What Vegetables to Plant in Kenya By Month",
    slug: "seasonal-planting-guide-kenya",
    excerpt: "Make the most of Kenya's growing seasons with our comprehensive month-by-month planting guide for vegetables and herbs.",
    content: `
      <p>Kenya's diverse climate creates unique opportunities for growing a variety of vegetables year-round. This seasonal guide will help both commercial farmers and home gardeners maximize their harvests by planting the right crops at the right time.</p>
      
      <h2>January-February (Dry Season)</h2>
      <p>These hot, dry months are ideal for crops that can withstand higher temperatures and require less water:</p>
      <ul>
        <li><strong>Sweet Potatoes:</strong> Drought-resistant and thrives in warm weather</li>
        <li><strong>Amaranth:</strong> Heat-tolerant leafy vegetable rich in nutrients</li>
        <li><strong>Okra:</strong> Produces well in hot conditions</li>
        <li><strong>Eggplant:</strong> Enjoys the warmth and can be harvested for months</li>
      </ul>
      
      <h2>March-May (Long Rains)</h2>
      <p>As the rains arrive, it's time to plant vegetables that benefit from consistent moisture:</p>
      <ul>
        <li><strong>Kale and Collards:</strong> The backbone of Kenyan cuisine</li>
        <li><strong>Tomatoes:</strong> Plant early in this season for best results</li>
        <li><strong>Beans:</strong> Both bush and climbing varieties do well</li>
        <li><strong>Spinach:</strong> Thrives with good rainfall</li>
        <li><strong>Carrots:</strong> Ideal planting time for sweet, crunchy carrots</li>
      </ul>
      
      <h2>June-September (Cool Dry Season)</h2>
      <p>These cooler months are perfect for crops that prefer mild temperatures:</p>
      <ul>
        <li><strong>Cabbage:</strong> Develops sweetness in cooler weather</li>
        <li><strong>Broccoli:</strong> Produces tight heads in moderate temperatures</li>
        <li><strong>Cauliflower:</strong> Similar to broccoli, enjoys the cooler season</li>
        <li><strong>Swiss Chard:</strong> Provides continuous harvests throughout this period</li>
      </ul>
      
      <h2>October-December (Short Rains)</h2>
      <p>Take advantage of the shorter rainy season with these crops:</p>
      <ul>
        <li><strong>Green Peas:</strong> Perfect time for sweet, tender peas</li>
        <li><strong>Cucumber:</strong> Quick-growing crop that loves moderate moisture</li>
        <li><strong>Zucchini:</strong> Produces abundantly with consistent water</li>
        <li><strong>Lettuce:</strong> Various varieties thrive before the heat returns</li>
      </ul>
      
      <h2>Year-Round Options</h2>
      <p>Some crops can be planted successfully throughout the year, especially with proper planning:</p>
      <ul>
        <li><strong>Herbs:</strong> Basil, rosemary, and mint adapt well to most conditions</li>
        <li><strong>Spring Onions:</strong> Quick-growing and versatile</li>
        <li><strong>Chili Peppers:</strong> Productive in most seasons with adequate care</li>
      </ul>
      
      <p>Remember that microclimates within Kenya can vary significantly. Coastal regions, highlands, and areas near Lake Victoria each have their own unique growing conditions that may alter these general guidelines. Happy planting!</p>
    `,
    image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",
    author: {
      name: "Rachel Muturi",
      avatar: "/placeholder.svg"
    },
    date: "March 18, 2023",
    readTime: 8,
    tags: ["seasonal planting", "vegetables", "farming tips"],
    category: "Growing Guides"
  },
  {
    id: 4,
    title: "Export Excellence: How Kenyan Produce is Winning Global Markets",
    slug: "kenyan-produce-global-markets",
    excerpt: "Learn about the growing success of Kenyan agricultural exports and how farms like ours are meeting international standards.",
    content: `
      <p>Kenya's agricultural exports have seen remarkable growth in recent years, with our fresh produce finding its way to dinner tables across Europe, the Middle East, and beyond. At Kranian Farms, we're proud to be part of this success story, contributing to Kenya's reputation as a source of premium agricultural products.</p>
      
      <h2>Meeting Global Standards</h2>
      <p>Success in export markets demands adherence to strict international standards. Our farm has invested heavily in certification programs including GlobalG.A.P., ensuring our products meet the highest standards for food safety, environmental impact, and worker welfare. These certifications aren't just documents on a wall—they represent our commitment to excellence at every step of the production process.</p>
      
      <h2>Cold Chain Management</h2>
      <p>The journey from our fields to international markets presents unique challenges, particularly for delicate products like flowers and berries. We've developed a sophisticated cold chain management system that maintains optimal temperatures from harvest through shipping, preserving freshness and extending shelf life. Our state-of-the-art cooling facilities and refrigerated transport ensure products arrive at their destination in perfect condition.</p>
      
      <h2>Strategic Partnerships</h2>
      <p>Building relationships with reliable partners has been crucial to our export success. We work closely with specialized logistics companies, international distributors, and retail chains to create seamless supply chains. These partnerships have opened doors to new markets and allowed us to respond quickly to changing consumer preferences across different regions.</p>
      
      <h2>Focus on Premium Varieties</h2>
      <p>Not all produce varieties travel well or meet the expectations of international consumers. Through extensive research and testing, we've identified varieties that not only survive the journey but arrive looking and tasting exceptional. Our premium roses, for example, are selected specifically for their ability to maintain their appearance and fragrance during shipping to European markets.</p>
      
      <h2>Adapting to Market Demands</h2>
      <p>Different markets have different preferences, and flexibility is key to export success. We continually adapt our product mix and packaging based on feedback from specific markets. For instance, our herbs exported to the Middle East are packaged differently from those sent to European supermarkets, reflecting different culinary traditions and consumer habits.</p>
      
      <p>As global demand for high-quality, sustainably produced food continues to grow, Kenyan farms like ours are well-positioned to meet the challenge. Through continued innovation and a steadfast commitment to quality, we're helping to ensure that "Product of Kenya" remains a mark of excellence recognized around the world.</p>
    `,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e",
    author: {
      name: "Brian Senelwa",
      avatar: "/placeholder.svg"
    },
    date: "February 7, 2023",
    readTime: 6,
    tags: ["exports", "international trade", "quality standards"],
    category: "Market Insights"
  },
  {
    id: 5,
    title: "Beyond Beautiful: The Health Benefits of Flowers in Your Home",
    slug: "health-benefits-flowers",
    excerpt: "Discover how adding fresh flowers to your living space can boost your mood, reduce stress, and even improve your physical health.",
    content: `
      <p>We all know that a vase of fresh flowers brightens up a room and brings a touch of natural beauty to our homes. But did you know that having flowers around can actually benefit your health in measurable ways? Research has revealed numerous physical and psychological benefits to keeping fresh blooms in your living space.</p>
      
      <h2>Mood Enhancement</h2>
      <p>Studies from Rutgers University found that flowers trigger happy emotions and heighten feelings of life satisfaction. Participants in the research reported feeling less depressed, anxious, and agitated when fresh flowers were present in their homes. The effect was almost immediate and continued to boost mood for days afterward. Even a single bloom can make a difference, though more abundant arrangements tend to create stronger positive reactions.</p>
      
      <h2>Stress Reduction</h2>
      <p>Research published in the Journal of Physiological Anthropology found that interacting with indoor plants—including flowers—can reduce both psychological and physiological stress. Study participants who handled flowers experienced a notable decrease in heart rate and blood pressure levels compared to those performing other tasks. The calming effect of flowers makes them perfect additions to workspaces and areas where you unwind after a busy day.</p>
      
      <h2>Air Purification</h2>
      <p>While not as efficient as some leafy houseplants, certain flowers can help improve indoor air quality by filtering out volatile organic compounds (VOCs). Chrysanthemums, for example, are known for their air-purifying abilities and can help remove benzene, formaldehyde, and other common indoor pollutants. Cleaner air means easier breathing and potential reductions in headaches and allergic reactions.</p>
      
      <h2>Memory and Concentration</h2>
      <p>The presence of flowers and plants in work environments has been linked to improved concentration, memory retention, and productivity. A study at Texas A&M found that workers demonstrated higher levels of innovative thinking and problem-solving when flowers were present in their workspace. For students, keeping fresh flowers in study areas may help improve academic performance.</p>
      
      <h2>Faster Recovery</h2>
      <p>Hospital patients with flowers in their rooms have been shown to have faster recovery rates than those without. A famous study by researcher Roger Ulrich found that patients with garden views recovered faster than those facing brick walls. Bringing flowers to someone who's ill isn't just a kind gesture—it may actually help them heal more quickly by reducing stress and creating a more positive environment.</p>
      
      <h2>Better Sleep</h2>
      <p>Certain flowers, like lavender and jasmine, release scents that have been proven to lower heart rate and blood pressure, helping people fall asleep more easily and enjoy deeper, more restful sleep. Keeping these flowers in your bedroom might be nature's answer to sleep troubles.</p>
      
      <p>So the next time you place a bouquet of Kranian Farms flowers in your home, remember you're doing more than just decorating—you're making an investment in your wellbeing. From stress reduction to mood enhancement, the benefits of fresh flowers make them a simple yet powerful tool for improving your quality of life. Beauty with benefits—that's something we can all appreciate.</p>
    `,
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321",
    author: {
      name: "Rachel Muturi",
      avatar: "/placeholder.svg"
    },
    date: "January 23, 2023",
    readTime: 5,
    tags: ["health benefits", "flowers", "wellbeing"],
    category: "Lifestyle"
  },
];

export const getRecentBlogPosts = (count: number = 3) => {
  return blogPosts.slice(0, count);
};

export const getBlogPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug);
};

export const getBlogPostById = (id: number) => {
  return blogPosts.find(post => post.id === id);
};

export const getRelatedPosts = (currentPostId: number, count: number = 3) => {
  const currentPost = getBlogPostById(currentPostId);
  if (!currentPost) return [];
  
  return blogPosts
    .filter(post => post.id !== currentPostId && 
              (post.category === currentPost.category || 
               post.tags.some(tag => currentPost.tags.includes(tag))))
    .slice(0, count);
};
