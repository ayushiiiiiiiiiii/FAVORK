import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, TrendingUp, DollarSign, Briefcase, LogOut } from "lucide-react";

const FreelancerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="glass-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold gradient-text">Favork</h1>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-primary">
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-3xl">
                    RS
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-heading font-bold">Riya Sharma</h2>
                      <p className="text-muted-foreground">Motion Graphics Specialist</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">4.9</span>
                          <span className="text-sm text-muted-foreground">(87 reviews)</span>
                        </div>
                        <Badge className="bg-accent">Verified</Badge>
                      </div>
                    </div>
                    <Button variant="outline">Edit Profile</Button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge variant="secondary">After Effects</Badge>
                    <Badge variant="secondary">Motion Design</Badge>
                    <Badge variant="secondary">2D Animation</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹1,24,500</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <Briefcase className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 pending approval</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98%</div>
              <p className="text-xs text-muted-foreground">87 completed jobs</p>
            </CardContent>
          </Card>
        </div>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Instagram Reels Package", client: "TechStartup Inc", status: "In Progress", amount: "₹15,000" },
                { title: "YouTube Intro Animation", client: "Gaming Channel", status: "Awaiting Approval", amount: "₹8,500" },
                { title: "Product Demo Video", client: "E-commerce Co", status: "Completed", amount: "₹12,000" },
              ].map((project, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50">
                  <div>
                    <h4 className="font-semibold">{project.title}</h4>
                    <p className="text-sm text-muted-foreground">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={project.status === "Completed" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                    <p className="text-sm font-semibold mt-1">{project.amount}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default FreelancerDashboard;
