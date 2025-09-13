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
    keywords: ['available', 'right now', 'today', 'what vegetables', 'what can I get'],
    question: "What vegetables are available right now?",
    response: `This week's seasonal picks include fresh spring vegetables from nearby farms:

🥕 **Fresh Asparagus** - Peak season right now
🥕 **Baby Carrots** - Sweet and tender, just harvested
🥕 **Spring Onions** - Crisp and flavorful
🥕 **Rhubarb** - Perfect for spring cooking

These are all in season locally and available for same-day pickup from our partner farms!`,
    suggestedFarms: ['resta-gard', 'spring-harvest', 'seasonal-greens'],
    searchQuery: 'seasonal vegetables',
    isDemo: true
  },
  {
    keywords: ['fruits', 'what fruits', 'fruit today', 'order fruit'],
    question: "What fruits can I order today?",
    response: `Right now we have these seasonal fruits from local orchards:

🍎 **Crisp Apples** - Stored from last harvest, still fresh
🍓 **Strawberries** - Early season berries now available  
🫐 **Gooseberries** - Tart and fresh for summer
🟣 **Early Plums** - Just coming into season

All harvested within the past few days from farms within 25km!`,
    suggestedFarms: ['orchard-fresh', 'berry-fields', 'fruit-growers'],
    searchQuery: 'seasonal fruits',
    isDemo: true
  },
  {
    keywords: ['cherry tomatoes', 'cherry tomato', 'small tomatoes'],
    question: "I want cherry tomatoes",
    response: `I understand — cherry tomatoes aren't in season locally yet (they'll be ready in July-August). 

Can I show you **sweet peppers** and **radishes** as alternatives for your salads? They're crisp, colorful, and perfect for the same dishes!

Both are freshly harvested and available from nearby farms right now.`,
    suggestedFarms: ['resta-gard', 'pepper-patch', 'crisp-vegetables'],
    searchQuery: 'peppers radishes',
    isDemo: true
  },
  {
    keywords: ['mangoes', 'mango', 'tropical fruit'],
    question: "Do you have mangoes?",
    response: `Mangoes aren't grown locally here in Sweden, but I can suggest some delicious local alternatives:

🍐 **Juicy Pears** - Sweet and refreshing
🍓 **Fresh Strawberries** - In season now

Both are from a farm just 20km away and much fresher than imported tropical fruits. Would you like to see those farms on the map?`,
    suggestedFarms: ['local-orchards', 'berry-fresh', 'pear-grove'],
    searchQuery: 'pears strawberries',
    isDemo: true
  },
  {
    keywords: ['ok', 'yes', 'sure', 'alternatives', 'peppers radishes'],
    question: "Ok, show me the alternatives",
    response: `Great! Here are some fresh **sweet peppers** and **radishes** from **Resta Gård**, harvested recently:

🌶️ **Sweet Bell Peppers** - 32 SEK/kg
🔴 **Fresh Radishes** - 18 SEK/kg
📍 **Resta Gård** (8.5 km) - Organic certified
⭐ Rating: 4.7 | Eco Score: 8/10
🕐 Pickup available today 8AM-7PM

Perfect for salads and fresh eating! Both picked this morning.`,
    suggestedFarms: ['resta-gard'],
    searchQuery: 'peppers radishes resta',
    isDemo: true
  },
  {
    keywords: ['free-range eggs', 'eggs', 'fresh eggs', 'free range'],
    question: "Do you have free-range eggs available?",
    response: `Yes! Several partner farms have **fresh free-range eggs** laid within the last two days:

🥚 **Resta Gård** - Free-range eggs: 45 SEK/dozen
🥚 **Happy Hens Farm** - Organic free-range: 52 SEK/dozen  
🥚 **Countryside Poultry** - Pasture-raised: 48 SEK/dozen

All hens roam freely on grass pastures and are fed natural diets. Eggs collected fresh daily!`,
    suggestedFarms: ['resta-gard', 'happy-hens', 'countryside-poultry'],
    searchQuery: 'free-range eggs',
    isDemo: true
  },
  {
    keywords: ['fresh herbs', 'herbs', 'basil', 'dill', 'parsley'],
    question: "I also need fresh herbs",
    response: `Absolutely — this week we have these herbs in season:

🌿 **Fresh Basil** - 22 SEK/bunch
🌿 **Dill** - 18 SEK/bunch  
🌿 **Parsley** - 16 SEK/bunch

Should I combine them with your egg order into one basket? It would save on pickup/delivery costs!`,
    suggestedFarms: ['herb-gardens', 'resta-gard', 'fresh-greens'],
    searchQuery: 'herbs basil dill parsley',
    isDemo: true
  },
  {
    keywords: ['yes please', 'combine', 'one basket', 'together'],
    question: "Yes please, combine them",
    response: `Done! I've added **free-range eggs** and a **mixed herb bundle** to your basket:

🛒 **Your Basket:**
• Free-range eggs (1 dozen) - 45 SEK
• Fresh herb bundle (basil, dill, parsley) - 50 SEK
• **Total: 95 SEK**

📍 Available for pickup at **Resta Gård** today 8AM-7PM
🚚 Or delivery available for 30 SEK

You can check out whenever you're ready!`,
    suggestedFarms: ['resta-gard'],
    searchQuery: 'eggs herbs basket',
    isDemo: true
  },
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