import { motion } from 'framer-motion';
import { Calendar, MapPin, Award, TrendingUp, Leaf, Truck, Users, Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockUser, mockAchievements, mockSustainabilityData } from '@/data/userData';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Profile = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
    },
  };

  const badgeVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
    },
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
    },
  };

  const pieData = [
    { name: 'Traditional Shopping', value: mockSustainabilityData.totalImpact.traditionalVsSustainable.traditional, color: '#ef4444' },
    { name: 'ROOTED Shopping', value: mockSustainabilityData.totalImpact.traditionalVsSustainable.sustainable, color: '#10b981' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="inline-block mb-6"
          >
            <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20 shadow-2xl">
              <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-primary/60 text-primary-foreground">
                {mockUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent mb-2">
            {mockUser.name}
          </h1>
          <p className="text-muted-foreground text-lg mb-2">{mockUser.email}</p>
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Member since {new Date(mockUser.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          {[
            { label: 'Total Orders', value: mockUser.totalOrders, icon: Target, color: 'text-blue-500' },
            { label: 'CO₂ Saved', value: `${mockUser.co2Saved}kg`, icon: Leaf, color: 'text-green-500' },
            { label: 'Farms Supported', value: mockUser.farmsSupported, icon: Users, color: 'text-purple-500' },
            { label: 'KM Avoided', value: `${mockUser.kmAvoided}km`, icon: Truck, color: 'text-orange-500' },
          ].map((stat, index) => (
            <motion.div key={index} variants={cardVariants}>
              <Card className="text-center bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Main Dashboard */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    CO₂ Savings Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={mockSustainabilityData.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Line 
                          type="monotone" 
                          dataKey="co2Saved" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={3}
                          dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Monthly Impact Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockSustainabilityData.monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }} 
                        />
                        <Bar dataKey="co2Saved" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>Traditional vs Sustainable Shopping</CardTitle>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={chartVariants}
                    initial="hidden"
                    animate="visible"
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}kg CO₂`}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Achievements & Reports */}
          <div className="space-y-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAchievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        variants={badgeVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${
                          achievement.earned 
                            ? 'bg-primary/10 border-primary/20' 
                            : 'bg-muted/50 border-border/50 opacity-60'
                        }`}
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">{achievement.description}</div>
                          {achievement.earned && achievement.earnedDate && (
                            <div className="text-xs text-muted-foreground mt-1">
                              Earned: {new Date(achievement.earnedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                        <Badge 
                          variant={achievement.earned ? "default" : "secondary"}
                          className={
                            achievement.level === 'platinum' ? 'bg-slate-500' :
                            achievement.level === 'gold' ? 'bg-yellow-500' :
                            achievement.level === 'silver' ? 'bg-gray-400' :
                            'bg-amber-600'
                          }
                        >
                          {achievement.level}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
                <CardHeader>
                  <CardTitle>This Week's Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>CO₂ Savings Goal</span>
                        <span>18.5kg / 20kg</span>
                      </div>
                      <Progress value={92.5} className="h-2" />
                    </div>
                    
                    <div className="text-center p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20">
                      <div className="text-2xl font-bold text-green-600">🌱</div>
                      <div className="text-sm font-semibold">Eco Warrior Status</div>
                      <div className="text-xs text-muted-foreground">
                        You've saved enough CO₂ to neutralize a 74km car trip! 😎
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">3</div>
                        <div className="text-xs text-muted-foreground">Orders This Week</div>
                      </div>
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <div className="text-lg font-bold text-primary">110km</div>
                        <div className="text-xs text-muted-foreground">Transport Avoided</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;