import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Upload, Check } from "lucide-react";

const FreelancerOnboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState([1200]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills = ["Premiere Pro", "After Effects", "Color Grading", "YouTube Shorts", "Reels Editing", "Motion Graphics"];

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleComplete = () => {
    if (!bio || selectedSkills.length === 0) {
      toast.error("Please complete all fields");
      return;
    }
    
    toast.success("Your Favork profile is live! Start getting hired.", {
      duration: 3000,
    });
    
    setTimeout(() => {
      navigate("/freelancer/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass-card">
        <CardHeader>
          <CardTitle className="text-3xl font-heading gradient-text">
            Create Your Profile
          </CardTitle>
          <CardDescription>
            Step {step} of 3 - Let's showcase your creative talent
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Upload className="w-12 h-12 text-white" />
                  </div>
                  <Button size="sm" className="absolute bottom-0 right-0 rounded-full">
                    Upload
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Short Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Tell clients about your experience and style..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>
              
              <Button onClick={() => setStep(2)} className="w-full bg-gradient-to-r from-accent to-accent/80">
                Next Step
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Select Your Skills</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkills.includes(skill) ? "default" : "outline"}
                      className="cursor-pointer px-4 py-2 text-sm hover:scale-105 transition-transform"
                      onClick={() => toggleSkill(skill)}
                    >
                      {selectedSkills.includes(skill) && <Check className="w-4 h-4 mr-1" />}
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Portfolio Thumbnails</Label>
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <Upload className="w-8 h-8 text-primary" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1 bg-gradient-to-r from-accent to-accent/80">
                  Next Step
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <Label>Hourly Rate: ₹{hourlyRate[0]}/hr</Label>
                <Slider
                  value={hourlyRate}
                  onValueChange={setHourlyRate}
                  min={500}
                  max={2000}
                  step={100}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>₹500/hr</span>
                  <span>₹2000/hr</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20">
                    <div className="text-center">
                      <div className="font-semibold">Beginner</div>
                      <div className="text-xs text-muted-foreground">0-2 years</div>
                    </div>
                  </Button>
                  <Button variant="default" className="h-20 bg-gradient-to-r from-primary to-primary/80">
                    <div className="text-center">
                      <div className="font-semibold">Professional</div>
                      <div className="text-xs">2+ years</div>
                    </div>
                  </Button>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Back
                </Button>
                <Button onClick={handleComplete} className="flex-1 bg-gradient-to-r from-accent to-accent/80">
                  Complete Profile
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FreelancerOnboarding;
