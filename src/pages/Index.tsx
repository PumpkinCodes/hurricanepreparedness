import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  MapPin, 
  Package, 
  Phone,
  Wind,
  Shield,
  Sparkles
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  const evacuationZones = [
    { zone: "A", risk: "Extreme", description: "Coastal areas", color: "bg-red-100 border-red-500 text-red-800" },
    { zone: "B", risk: "High", description: "Near coast", color: "bg-orange-100 border-orange-500 text-orange-800" },
    { zone: "C", risk: "Moderate", description: "Inland areas", color: "bg-yellow-100 border-yellow-500 text-yellow-800" },
  ];

  

  return (
    <div className="min-h-screen bg-background">
      {/* Emergency Info */}
      <div className="bg-primary text-primary-foreground p-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          <span className="font-semibold">Florida Hurricane Preparedness Center - Stay Ready, Stay Safe</span>
        </div>
      </div>

      {/* Header */}
      <header className="border-b p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Florida Hurricane Hub</h1>
            </div>
            <Button variant="emergency">
              <Phone className="h-4 w-4 mr-2" />
              Emergency: 911
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 space-y-6">
        
        {/* Storm Tracking Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wind className="h-5 w-5" />
              Current Storm Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <p className="text-lg text-muted-foreground">No active hurricane threats at this time</p>
              <p className="text-sm text-muted-foreground mt-2">Monitor conditions regularly during hurricane season (June 1 - November 30)</p>
              <Button className="mt-4" variant="outline">
                View Current Conditions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Evacuation Zones */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Know Your Evacuation Zone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {evacuationZones.map((zone) => (
                <div key={zone.zone} className={`p-4 rounded-lg border-2 ${zone.color}`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold">Zone {zone.zone}</span>
                      <p className="font-semibold">{zone.description}</p>
                    </div>
                    <Badge variant={zone.zone === 'A' || zone.zone === 'B' ? 'destructive' : 'secondary'}>
                      {zone.risk} Risk
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <Button className="flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                Find My Zone
              </Button>
              <Button variant="outline" className="flex-1">
                Find Shelters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Supply Kit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Emergency Supply Kit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-6">
              <p className="text-lg mb-4">Get a supply list tailored to your family's specific needs</p>
              <p className="text-sm text-muted-foreground mb-6">Our AI will create a personalized checklist based on your family size, pets, and other requirements</p>
              <Button 
                onClick={() => navigate('/ai-supply-list')} 
                className="w-full" 
                variant="default"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Create My Personalized Supply List
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Emergency Contacts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Emergency Services</span>
                <Button size="sm" variant="emergency">Call 911</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Florida Emergency Management</span>
                <Button size="sm" variant="outline">1-800-342-3557</Button>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <span>Red Cross Shelters</span>
                <Button size="sm" variant="outline">1-800-733-2767</Button>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Index;