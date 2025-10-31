import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Lock, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

const EscrowPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [status, setStatus] = useState<"setup" | "locked" | "approved">("setup");
  const [projectName, setProjectName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleDeposit = () => {
    if (!projectName || !amount || !description) {
      toast.error("Please fill in all fields");
      return;
    }
    
    toast.success("Funds deposited to escrow successfully! 🔒");
    setStatus("locked");
  };

  const handleApprove = () => {
    toast.success("Payment released! 🎉", {
      description: "Transaction completed via Aptos blockchain",
    });
    setStatus("approved");
    
    setTimeout(() => {
      navigate(`/review/${id}`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <header className="glass-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl font-heading font-bold gradient-text">Favork Escrow</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  placeholder="e.g., Instagram Reels Editing"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  disabled={status !== "setup"}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the project requirements..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  disabled={status !== "setup"}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Total Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="15000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={status !== "setup"}
                />
              </div>

              <div className="pt-2">
                <p className="text-sm text-muted-foreground">
                  Freelancer: <span className="font-semibold text-foreground">Riya Sharma</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Rate: <span className="font-semibold text-foreground">₹1,200/hr</span>
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-accent/50 border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {status === "setup" && <Lock className="w-5 h-5 text-accent" />}
                {status === "locked" && <Clock className="w-5 h-5 text-accent" />}
                {status === "approved" && <CheckCircle className="w-5 h-5 text-green-500" />}
                Escrow Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {status === "setup" && (
                <>
                  <div className="text-center py-8">
                    <Lock className="w-16 h-16 mx-auto text-accent mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
                    <p className="text-sm text-muted-foreground">
                      Your funds will be held safely in escrow until you approve the completed work
                    </p>
                  </div>
                  <Button 
                    onClick={handleDeposit}
                    className="w-full h-12 bg-gradient-to-r from-accent to-accent/80 text-lg"
                  >
                    Deposit to Escrow 🔒
                  </Button>
                </>
              )}

              {status === "locked" && (
                <>
                  <div className="space-y-4">
                    <Badge className="w-full justify-center py-2 bg-accent">
                      Funds Locked in Escrow 🔒
                    </Badge>
                    
                    <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Transaction ID:</span>
                        <span className="font-mono">APT-{Date.now().toString().slice(-8)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Amount:</span>
                        <span className="font-semibold">₹{amount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Date:</span>
                        <span>{new Date().toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Status:</span>
                        <Badge variant="secondary">Awaiting Approval</Badge>
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <Clock className="w-12 h-12 mx-auto text-accent mb-2 animate-pulse" />
                      <p className="text-sm text-muted-foreground">
                        Waiting for freelancer to complete work...
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={handleApprove}
                    className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 text-lg"
                  >
                    Approve Work & Release Payment ✅
                  </Button>
                </>
              )}

              {status === "approved" && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Payment Released!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Transaction completed securely via Aptos blockchain
                  </p>
                  <div className="text-4xl mb-4">🎉</div>
                  <p className="text-sm font-semibold">
                    Redirecting to feedback page...
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold text-sm mb-2">How Escrow Works</h4>
                <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                  <li>Deposit funds to secure escrow</li>
                  <li>Freelancer completes the work</li>
                  <li>Review and approve the work</li>
                  <li>Payment automatically released</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default EscrowPayment;
