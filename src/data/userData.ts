export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  co2Saved: number;
  farmsSupported: number;
  kmAvoided: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  level: 'bronze' | 'silver' | 'gold' | 'platinum';
}

export interface SustainabilityData {
  weeklyData: Array<{
    week: string;
    co2Saved: number;
    kmAvoided: number;
    ordersPlaced: number;
  }>;
  monthlyData: Array<{
    month: string;
    co2Saved: number;
    kmAvoided: number;
    ordersPlaced: number;
    amountSpent: number;
  }>;
  totalImpact: {
    co2Saved: number;
    kmAvoided: number;
    farmsSupported: number;
    traditionalVsSustainable: {
      traditional: number;
      sustainable: number;
    };
  };
}

export const mockUser: UserProfile = {
  id: '1',
  name: 'Emma Lindqvist',
  email: 'emma.lindqvist@email.com',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
  joinDate: '2024-03-15',
  totalOrders: 47,
  totalSpent: 2850,
  co2Saved: 125.8,
  farmsSupported: 8,
  kmAvoided: 1240,
};

export const mockAchievements: Achievement[] = [
  {
    id: '1',
    title: 'CO₂ Saver',
    description: 'Saved over 100kg of CO₂ emissions',
    icon: '🌱',
    earned: true,
    earnedDate: '2024-08-15',
    level: 'gold',
  },
  {
    id: '2',
    title: 'Local Hero',
    description: 'Supported 5+ local farms',
    icon: '🏆',
    earned: true,
    earnedDate: '2024-07-22',
    level: 'silver',
  },
  {
    id: '3',
    title: 'Eco Warrior',
    description: 'Made 25+ organic purchases',
    icon: '♻️',
    earned: true,
    earnedDate: '2024-06-10',
    level: 'gold',
  },
  {
    id: '4',
    title: 'Transport Saver',
    description: 'Avoided 1000km of transport',
    icon: '🚛',
    earned: true,
    earnedDate: '2024-09-01',
    level: 'platinum',
  },
  {
    id: '5',
    title: 'Sustainability Champion',
    description: 'Reached 150kg CO₂ savings',
    icon: '👑',
    earned: false,
    level: 'platinum',
  },
];

export const mockSustainabilityData: SustainabilityData = {
  weeklyData: [
    { week: 'Week 1', co2Saved: 12.5, kmAvoided: 95, ordersPlaced: 3 },
    { week: 'Week 2', co2Saved: 18.2, kmAvoided: 125, ordersPlaced: 4 },
    { week: 'Week 3', co2Saved: 15.8, kmAvoided: 110, ordersPlaced: 3 },
    { week: 'Week 4', co2Saved: 22.1, kmAvoided: 140, ordersPlaced: 5 },
  ],
  monthlyData: [
    { month: 'Jan', co2Saved: 45.2, kmAvoided: 340, ordersPlaced: 12, amountSpent: 680 },
    { month: 'Feb', co2Saved: 38.9, kmAvoided: 290, ordersPlaced: 10, amountSpent: 580 },
    { month: 'Mar', co2Saved: 52.1, kmAvoided: 380, ordersPlaced: 14, amountSpent: 720 },
    { month: 'Apr', co2Saved: 41.8, kmAvoided: 315, ordersPlaced: 11, amountSpent: 620 },
  ],
  totalImpact: {
    co2Saved: 125.8,
    kmAvoided: 1240,
    farmsSupported: 8,
    traditionalVsSustainable: {
      traditional: 245.6,
      sustainable: 125.8,
    },
  },
};