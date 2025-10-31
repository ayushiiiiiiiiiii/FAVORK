import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, Video } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="text-center max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl font-heading font-bold gradient-text">
            Favork
          </h1>
          <p className="text-2xl font-medium text-foreground/80">
            No Ghosting. Just Secure, Creative Work.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
          <Button
            onClick={() => navigate("/auth?role=client")}
            size="lg"
            className="w-full sm:w-auto h-16 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 hover:scale-105"
          >
            <Briefcase className="mr-2 h-6 w-6" />
            Join as Client
          </Button>

          <Button
            onClick={() => navigate("/auth?role=freelancer")}
            size="lg"
            className="w-full sm:w-auto h-16 px-8 text-lg bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 transition-all duration-300 hover:scale-105"
          >
            <Video className="mr-2 h-6 w-6" />
            Join as Freelancer
          </Button>
        </div>

        <p className="text-sm text-muted-foreground mt-8">
          Work confidently. Get paid securely with Aptos blockchain. 🔒
        </p>

        <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border/50">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">300+</p>
            <p className="text-sm text-muted-foreground">Verified Video Editors</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-accent">₹3.5L+</p>
            <p className="text-sm text-muted-foreground">Secure Transactions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-primary">4.8/5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
