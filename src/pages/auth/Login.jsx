import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Eye, EyeOff, LogIn, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ROLE_LABELS } from '@/lib/constants';
import { mockUsers } from '@/lib/mockData';

const Login = () => {
  const navigate = useNavigate();
  const { login, switchRole } = useAuth();
  const { toast } = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quickLoginRole, setQuickLoginRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });

        // Navigate based on role
        const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (user) {
          navigateToRole(user.role);
        }
      } else {
        toast({
          title: 'Login Failed',
          description: 'Invalid email or password. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickLogin = () => {
    if (!quickLoginRole) return;

    switchRole(quickLoginRole);
    toast({
      title: 'Quick Login Successful',
      description: `Logged in as ${ROLE_LABELS[quickLoginRole]}`,
    });
    navigateToRole(quickLoginRole);
  };

  const navigateToRole = (role) => {
    const routes = {
      admin: '/admin/dashboard',
      hod: '/hod/dashboard',
      lab_incharge: '/lab-incharge/dashboard',
      ma: '/ma/dashboard',
      lab_to: '/lab-to/dashboard',
    };
    navigate(routes[role]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding & Background Image */}
      <div
        className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden"
        style={{ background: 'var(--gradient-hero)' }}
      >
        {/* Updated Background Image - University/Library Theme */}
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center mix-blend-overlay"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=1986&auto=format&fit=crop')"
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-12 text-white h-full">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 shadow-lg">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold tracking-wide">University of Jaffna</h1>
                <p className="text-white/80 font-medium">Faculty of Engineering</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <h2 className="text-4xl xl:text-5xl font-serif font-bold leading-tight mb-6 text-shadow-sm">
              Inventory Management System
            </h2>
            <p className="text-lg text-white/90 mb-10 leading-relaxed font-light">
              Streamlining laboratory equipment tracking and furniture management across all engineering departments.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
                <h4 className="font-bold text-3xl mb-1">6</h4>
                <p className="text-sm text-white/80 font-medium uppercase tracking-wider">Departments</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/10 hover:bg-white/15 transition-colors">
                <h4 className="font-bold text-3xl mb-1">1,161+</h4>
                <p className="text-sm text-white/80 font-medium uppercase tracking-wider">Items Tracked</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xs text-white/60 font-light"
          >
            © 2024 Faculty of Engineering, University of Jaffna. All Rights Reserved.
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[10%] w-[200px] h-[200px] bg-white/10 rounded-full blur-[80px]" />
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 xl:w-2/5 flex items-center justify-center p-8 bg-background relative">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md relative z-10"
        >
          <div className="text-center mb-8 lg:hidden">
            <div className="w-16 h-16 rounded-2xl bg-primary mx-auto flex items-center justify-center mb-4 shadow-lg">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-serif font-bold text-primary">FOE - University of Jaffna</h1>
            <p className="text-sm text-muted-foreground">Inventory Management System</p>
          </div>

          <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-2xl font-serif">Sign In</CardTitle>
              <CardDescription>
                Access your dashboard using your faculty credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@eng.jfn.ac.lk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-primary h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-primary pr-10 h-11"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 hover:bg-transparent text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full btn-primary-gradient h-11 text-base font-medium shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Authenticating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </span>
                  )}
                </Button>
              </form>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground font-medium">
                    Or Use Quick Login
                  </span>
                </div>
              </div>

              {/* Quick Login for Demo */}
              <div className="space-y-3 bg-muted/30 p-4 rounded-xl border border-border/50">
                <p className="text-xs text-center text-muted-foreground mb-2 font-medium">Select a role to simulate login:</p>
                <Select value={quickLoginRole} onValueChange={(v) => setQuickLoginRole(v)}>
                  <SelectTrigger className="bg-background border-border/60">
                    <SelectValue placeholder="Select User Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLE_LABELS).map(([role, label]) => (
                      <SelectItem key={role} value={role}>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="secondary"
                  className="w-full hover:bg-secondary/80"
                  onClick={handleQuickLogin}
                  disabled={!quickLoginRole}
                >
                  Enter as {quickLoginRole ? ROLE_LABELS[quickLoginRole] : 'Selected Role'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;