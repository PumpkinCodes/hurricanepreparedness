import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Navigation, AlertCircle } from "lucide-react";

const evacuationZones = [
  {
    zone: "A",
    risk: "Extreme",
    description: "Coastal areas, barrier islands, mobile homes",
    evacuationOrder: "Mandatory - Evacuate Immediately",
    color: "emergency"
  },
  {
    zone: "B", 
    risk: "High",
    description: "Low-lying areas near coast, flood-prone regions",
    evacuationOrder: "Mandatory - Evacuate Now",
    color: "warning"
  },
  {
    zone: "C",
    risk: "Moderate",
    description: "Inland areas with some flood risk",
    evacuationOrder: "Voluntary - Consider Evacuation",
    color: "info"
  },
  {
    zone: "D",
    risk: "Low", 
    description: "Higher elevation inland areas",
    evacuationOrder: "Monitor Conditions",
    color: "success"
  }
];

const counties = [
  { name: "Miami-Dade", zones: ["A", "B", "C"], shelters: 45 },
  { name: "Broward", zones: ["A", "B", "C"], shelters: 32 },
  { name: "Palm Beach", zones: ["A", "B", "C", "D"], shelters: 28 },
  { name: "Monroe", zones: ["A", "B"], shelters: 12 },
  { name: "Collier", zones: ["A", "B", "C"], shelters: 18 },
  { name: "Lee", zones: ["A", "B", "C", "D"], shelters: 24 }
];

export const EvacuationZones = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-emergency" />
            Evacuation Zones Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {evacuationZones.map((zone) => (
              <div
                key={zone.zone}
                className={`p-4 rounded-lg border-2 ${
                  zone.color === 'emergency' ? 'border-emergency bg-emergency/5' :
                  zone.color === 'warning' ? 'border-warning bg-warning/5' :
                  zone.color === 'info' ? 'border-info bg-info/5' :
                  'border-success bg-success/5'
                }`}
              >
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold">Zone {zone.zone}</div>
                  <Badge 
                    variant={zone.color === 'emergency' ? 'destructive' : 'secondary'}
                    className="font-medium"
                  >
                    {zone.risk} Risk
                  </Badge>
                  <p className="text-xs text-muted-foreground">{zone.description}</p>
                  <p className="text-sm font-medium">{zone.evacuationOrder}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            County Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {counties.map((county) => (
              <div key={county.name} className="p-4 border rounded-lg space-y-3">
                <h3 className="font-semibold">{county.name} County</h3>
                <div className="flex flex-wrap gap-1">
                  {county.zones.map((zone) => (
                    <Badge key={zone} variant="outline" className="text-xs">
                      Zone {zone}
                    </Badge>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  {county.shelters} Emergency Shelters Available
                </p>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Navigation className="h-3 w-3 mr-1" />
                    Routes
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <MapPin className="h-3 w-3 mr-1" />
                    Shelters
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};