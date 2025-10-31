import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Video } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto space-y-12">
        <div className="glass-card p-12 space-y-8 hover-lift">
          <div className="space-y-4">
            <h1 className="text-7xl font-heading font-bold gradient-text animate-in fade-in duration-700">
              Favork
            </h1>
            <p className="text-2xl font-medium text-foreground/80 animate-in fade-in duration-700 delay-150">
              No Ghosting. Just Secure, Creative Work.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12 animate-in fade-in duration-700 delay-300">
            <Button
              onClick={() => navigate("/auth?role=client")}
              size="lg"
              className="w-full sm:w-auto h-16 px-10 text-lg bg-primary hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-primary/50"
            >
              <Briefcase className="mr-2 h-6 w-6" />
              Join as Client
            </Button>

            <Button
              onClick={() => navigate("/auth?role=freelancer")}
              size="lg"
              className="w-full sm:w-auto h-16 px-10 text-lg bg-accent hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-accent/50"
            >
              <Video className="mr-2 h-6 w-6" />
              Join as Freelancer
            </Button>
          </div>

          <p className="text-base text-muted-foreground mt-8 animate-in fade-in duration-700 delay-500">
            Work confidently. Get paid securely with Aptos blockchain. 🔒
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in duration-700 delay-700">
          <div className="glass-card p-6 text-center hover-lift">
            <p className="text-4xl font-bold text-primary mb-2">300+</p>
            <p className="text-sm text-muted-foreground">Verified Video Editors</p>
          </div>
          <div className="glass-card p-6 text-center hover-lift">
            <p className="text-4xl font-bold text-accent mb-2">₹3.5L+</p>
            <p className="text-sm text-muted-foreground">Secure Transactions</p>
          </div>
          <div className="glass-card p-6 text-center hover-lift">
            <p className="text-4xl font-bold text-primary mb-2">4.8/5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
