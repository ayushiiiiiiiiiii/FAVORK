import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Star, TrendingUp, DollarSign, Briefcase, LogOut } from "lucide-react";

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Freelancer");

  // ✅ Load freelancer name from localStorage
  useEffect(() => {
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName);
    } else {
      navigate("/"); // redirect to login/signup if not logged in
    }
  }, [navigate]);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("userName");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      {/* ✅ Updated Header */}
      <header className="border-b sticky top-0 z-10 bg-gray-300 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-heading font-bold text-black">Favork</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-black hover:bg-gray-400"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Card className="bg-gray-900 border border-gray-700 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-24 h-24 border-4 border-white">
                  <AvatarFallback className="bg-white text-black text-3xl font-bold">
                    {userName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      {/* ✅ Freelancer name shown dynamically */}
                      <h2 className="text-2xl font-heading font-bold text-white">
                        {userName}
                      </h2>
                      <p className="text-gray-400">Freelancer</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold">4.9</span>
                          <span className="text-sm text-gray-400">(87 reviews)</span>
                        </div>
                        <Badge className="bg-white text-black">Verified</Badge>
                      </div>
                    </div>
                    <Button variant="outline" className="text-white border-white">
                      Edit Profile
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-white border border-gray-600"
                    >
                      After Effects
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-white border border-gray-600"
                    >
                      Motion Design
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-white border border-gray-600"
                    >
                      2D Animation
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: "Total Earnings",
              icon: DollarSign,
              value: "₹1,24,500",
              sub: "+12% from last month",
            },
            {
              title: "Active Projects",
              icon: Briefcase,
              value: "5",
              sub: "2 pending approval",
            },
            {
              title: "Success Rate",
              icon: TrendingUp,
              value: "98%",
              sub: "87 completed jobs",
            },
          ].map(({ title, icon: Icon, value, sub }, i) => (
            <Card
              key={i}
              className="bg-gray-900 border border-gray-700 shadow-md"
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  {title}
                </CardTitle>
                <Icon className="w-4 h-4 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{value}</div>
                <p className="text-xs text-gray-500">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Projects */}
        <Card className="bg-gray-900 border border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-white">Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Instagram Reels Package",
                  client: "TechStartup Inc",
                  status: "In Progress",
                  amount: "₹15,000",
                },
                {
                  title: "YouTube Intro Animation",
                  client: "Gaming Channel",
                  status: "Awaiting Approval",
                  amount: "₹8,500",
                },
                {
                  title: "Product Demo Video",
                  client: "E-commerce Co",
                  status: "Completed",
                  amount: "₹12,000",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-800 border border-gray-700"
                >
                  <div>
                    <h4 className="font-semibold text-white">
                      {project.title}
                    </h4>
                    <p className="text-sm text-gray-400">{project.client}</p>
                  </div>
                  <div className="text-right">
                    <Badge
                      variant={
                        project.status === "Completed" ? "default" : "secondary"
                      }
                      className={`${
                        project.status === "Completed"
                          ? "bg-white text-black"
                          : "bg-gray-700 text-gray-300"
                      }`}
                    >
                      {project.status}
                    </Badge>
                    <p className="text-sm font-semibold mt-1 text-white">
                      {project.amount}
                    </p>
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
