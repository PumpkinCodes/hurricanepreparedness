import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  MapPin, 
  Package, 
  Phone,
  Wind,
  Shield
} from "lucide-react";

const Index = () => {
  const evacuationZones = [
    { zone: "A", risk: "Extreme", description: "Coastal areas", color: "bg-red-100 border-red-500 text-red-800" },
    { zone: "B", risk: "High", description: "Near coast", color: "bg-orange-100 border-orange-500 text-orange-800" },
    { zone: "C", risk: "Moderate", description: "Inland areas", color: "bg-yellow-100 border-yellow-500 text-yellow-800" },
  ];

  const essentialSupplies = [
    "Water (1 gallon per person per day for 3-7 days)",
    "Non-perishable food (3-7 day supply)",
    "Flashlight and extra batteries",
    "Battery-powered or hand crank radio",
    "First aid kit",
    "Prescription medications (7-day supply)",
    "Important documents in waterproof bag",
    "Cash and credit cards",
    "Phone chargers and power banks",
    "Emergency blanket",
    "Manual can opener",
    "Matches in waterproof container",
    "Personal hygiene items",
    "Change of clothing",
    "Emergency whistle",
    "Fire extinguisher",
    "Baby food and formula (if needed)",
    "Pet food and water (if needed)"
  ];

  const downloadChecklist = () => {
    const checklistText = `FLORIDA HURRICANE EMERGENCY SUPPLY CHECKLIST

Essential Items for Hurricane Preparedness:

${essentialSupplies.map((item, index) => `${index + 1}. ${item}`).join('\n')}

IMPORTANT REMINDERS:
- Store supplies in waterproof containers
- Keep emergency kit easily accessible
- Update expired items regularly
- Have a family emergency plan
- Know your evacuation zone

Emergency Contacts:
- Emergency Services: 911
- Florida Emergency Management: 1-800-342-3557
- Red Cross Shelters: 1-800-733-2767

For more information visit: www.floridadisaster.org

Stay safe and stay prepared!`;

    const blob = new Blob([checklistText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Florida_Hurricane_Emergency_Checklist.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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
            <div className="grid gap-2">
              {essentialSupplies.map((item, index) => (
                <div key={index} className="flex items-center gap-3 p-2 border rounded">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
            <Button onClick={downloadChecklist} className="w-full mt-4" variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Download Complete Checklist
            </Button>
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