export interface PredefinedQA {
  keywords: string[];
  question: string;
  response: string;
  suggestedFarms: string[];
  searchQuery?: string;
  isDemo: boolean;
}

export const predefinedQAs: PredefinedQA[] = [
  {
    keywords: ['strawberries', 'strawberry', 'party', 'weekend'],
    question: "I need fresh strawberries for a party this weekend",
    response: `Perfect timing! I found 3 excellent strawberry farms available for weekend pickup:

🍓 **Anders' Organic Farm** (7.2 km)
   • Fresh Strawberries: 45 SEK/kg (Organic)
   • Eco-impact: 2.1kg CO₂ saved vs supermarket
   • Rating: 4.8⭐ | Eco Score: 9/10
   • Weekend pickup: 8AM-6PM

🍓 **Lena's Heritage Farm** (12.1 km)  
   • Heritage Strawberries: 38 SEK/kg
   • Eco-impact: 2.8kg CO₂ saved vs supermarket
   • Rating: 4.6⭐ | Eco Score: 8/10
   • Weekend pickup: 9AM-5PM

🍓 **Sunrise Orchards** (5.8 km)
   • Premium Strawberries: 42 SEK/kg (Organic)
   • Eco-impact: 1.9kg CO₂ saved vs supermarket  
   • Rating: 4.7⭐ | Eco Score: 8/10
   • Weekend pickup: 7AM-7PM

All farms have confirmed fresh strawberries available for weekend pickup! Click on any farm pin to reserve your strawberries.`,
    suggestedFarms: ['anders-organic', 'lena-heritage', 'sunrise-orchards'],
    searchQuery: 'strawberries',
    isDemo: true
  },
  {
    keywords: ['organic', 'closest', 'near', 'nearby'],
    question: "Show me organic options near me",
    response: `Here are the top organic farms within 10km of Stockholm:

🌱 **Anders' Organic Farm** (7.2 km)
   • Organic Strawberries: 45 SEK/kg
   • Organic Spinach: 28 SEK/kg
   • Organic Tomatoes: 35 SEK/kg
   • Eco-impact: 2.1kg CO₂ saved vs supermarket
   • Rating: 4.8⭐ | Eco Score: 9/10

🌱 **Urban Farm Stockholm** (3.5 km)
   • Organic Microgreens: 65 SEK/100g
   • Organic Herbs: 22 SEK/bunch
   • Organic Lettuce: 18 SEK/head
   • Eco-impact: 1.2kg CO₂ saved vs supermarket
   • Rating: 4.7⭐ | Eco Score: 9/10

🌱 **Tomato Garden Farm** (9.8 km)
   • Organic Cherry Tomatoes: 42 SEK/kg
   • Organic Basil: 25 SEK/bunch
   • Organic Peppers: 38 SEK/kg
   • Eco-impact: 2.5kg CO₂ saved vs supermarket
   • Rating: 4.5⭐ | Eco Score: 8/10

All farms are certified organic with same-day pickup available!`,
    suggestedFarms: ['anders-organic', 'urban-farm', 'tomato-garden'],
    searchQuery: 'organic',
    isDemo: true
  },
  {
    keywords: ['delivery', 'today', 'available'],
    question: "What's available for delivery today?",
    response: `Great news! Here are farms offering same-day delivery:

🚚 **Green Valley Farm** (15.2 km)
   • Fresh Potatoes: 12 SEK/kg
   • Fresh Carrots: 15 SEK/kg  
   • Fresh Onions: 10 SEK/kg
   • Delivery: Free for orders over 200 SEK
   • Eco-impact: 3.2kg CO₂ saved vs supermarket
   • Rating: 4.4⭐ | Eco Score: 7/10

🚚 **Farm Fresh Direct** (8.7 km)
   • Mixed Vegetable Box: 180 SEK
   • Seasonal Fruit Box: 220 SEK
   • Herb Bundle: 45 SEK
   • Delivery: 2-hour window, 50 SEK fee
   • Eco-impact: 2.8kg CO₂ saved vs supermarket  
   • Rating: 4.6⭐ | Eco Score: 8/10

🚚 **Riverside Gardens** (11.3 km)
   • Fresh Spinach: 24 SEK/kg
   • Fresh Lettuce: 16 SEK/head
   • Cherry Tomatoes: 32 SEK/kg
   • Delivery: Free delivery before 6PM
   • Eco-impact: 2.9kg CO₂ saved vs supermarket
   • Rating: 4.3⭐ | Eco Score: 7/10

Order by 2PM for same-day delivery!`,
    suggestedFarms: ['green-valley', 'farm-fresh', 'riverside-gardens'],
    searchQuery: 'delivery today',
    isDemo: true
  },
  {
    keywords: ['budget', 'cheap', 'cheapest', 'affordable'],
    question: "Find me budget-friendly vegetables",
    response: `Here are the most affordable farms with excellent value:

💰 **Budget Fresh Farm** (13.4 km)
   • Bulk Potatoes: 8 SEK/kg (5kg minimum)
   • Bulk Carrots: 11 SEK/kg (3kg minimum)
   • Mixed Vegetable Box: 120 SEK (feeds family of 4)
   • Eco-impact: 3.1kg CO₂ saved vs supermarket
   • Rating: 4.2⭐ | Eco Score: 6/10

💰 **Community Garden Coop** (6.9 km)
   • Member prices available
   • Fresh Onions: 9 SEK/kg
   • Seasonal Greens: 14 SEK/kg
   • Root Vegetable Mix: 13 SEK/kg
   • Eco-impact: 2.3kg CO₂ saved vs supermarket
   • Rating: 4.5⭐ | Eco Score: 8/10

💰 **Farmer's Discount** (16.8 km)  
   • Imperfect Produce: 50% off regular prices
   • Bulk Buying Options: Save 20-30%
   • End-of-season Sales: Up to 40% off
   • Eco-impact: 4.1kg CO₂ saved vs supermarket
   • Rating: 4.1⭐ | Eco Score: 7/10

Best deals available with bulk purchases and membership discounts!`,
    suggestedFarms: ['budget-fresh', 'community-coop', 'farmers-discount'],
    searchQuery: 'budget vegetables',
    isDemo: true
  },
  {
    keywords: ['sustainable', 'eco', 'environment', 'carbon', 'local'],
    question: "I want to support local sustainable farms",
    response: `Fantastic! Here are our most sustainable local farms:

🌍 **EcoHarvest Collective** (4.1 km)
   • 100% renewable energy powered
   • Zero-waste farming practices
   • Rainwater irrigation system
   • Carbon negative operations
   • Eco-impact: 5.2kg CO₂ saved vs supermarket
   • Rating: 4.9⭐ | Eco Score: 10/10

🌍 **Regenerative Roots** (8.3 km)
   • Soil restoration techniques
   • Native pollinator sanctuary
   • Compost-only fertilization
   • Local seed varieties
   • Eco-impact: 4.8kg CO₂ saved vs supermarket
   • Rating: 4.7⭐ | Eco Score: 9/10

🌍 **Climate Positive Farm** (12.7 km)
   • Carbon sequestration farming
   • Solar-powered operations
   • Biodiversity conservation
   • Community supported agriculture
   • Eco-impact: 6.1kg CO₂ saved vs supermarket
   • Rating: 4.8⭐ | Eco Score: 10/10

These farms are certified carbon-negative and contribute to ecosystem restoration!`,
    suggestedFarms: ['eco-harvest', 'regenerative-roots', 'climate-positive'],
    searchQuery: 'sustainable local',
    isDemo: true
  },
  {
    keywords: ['herbs', 'cooking', 'fresh', 'basil', 'parsley'],
    question: "I need fresh herbs for cooking",
    response: `Perfect for your kitchen! Here are the best herb specialists:

🌿 **Herb Haven Nursery** (5.7 km)
   • Fresh Basil: 18 SEK/bunch
   • Italian Parsley: 15 SEK/bunch
   • Fresh Rosemary: 20 SEK/bunch
   • Chef's Herb Mix: 35 SEK/bundle
   • Eco-impact: 1.8kg CO₂ saved vs supermarket
   • Rating: 4.8⭐ | Eco Score: 8/10

🌿 **Urban Farm Stockholm** (3.5 km)
   • Microgreens Variety: 65 SEK/100g
   • Living Herb Pots: 45 SEK each
   • Culinary Herb Bundle: 28 SEK
   • Edible Flowers: 25 SEK/pack
   • Eco-impact: 1.2kg CO₂ saved vs supermarket
   • Rating: 4.7⭐ | Eco Score: 9/10

🌿 **Mediterranean Gardens** (9.2 km)
   • Organic Thyme: 22 SEK/bunch
   • Fresh Oregano: 19 SEK/bunch
   • Sage Leaves: 24 SEK/bunch
   • Herb Seasoning Mix: 40 SEK
   • Eco-impact: 2.7kg CO₂ saved vs supermarket
   • Rating: 4.6⭐ | Eco Score: 8/10

All herbs picked fresh this morning for maximum flavor!`,
    suggestedFarms: ['herb-haven', 'urban-farm', 'mediterranean-gardens'],
    searchQuery: 'fresh herbs',
    isDemo: true
  }
];