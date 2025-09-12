import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Wind, Droplets, Eye, MapPin, Clock } from "lucide-react";

// Mock weather data - in real app would come from weather API
const currentStorm = {
  name: "Hurricane Milton",
  category: 3,
  location: "25.5°N, 80.1°W",
  maxWinds: 125,
  movement: "NNW at 12 mph",
  pressure: 945,
  status: "Active",
  landfall: "Expected: Tuesday 6 AM EST",
  distance: "145 miles SE of Miami"
};

const watches = [
  { type: "Hurricane Warning", area: "Miami-Dade, Broward Counties", color: "emergency" },
  { type: "Hurricane Watch", area: "Palm Beach, Martin Counties", color: "warning" },
  { type: "Tropical Storm Warning", area: "Monroe County (Keys)", color: "info" }
];

export const WeatherWidget = () => {
  const getCategoryColor = (category: number) => {
    if (category >= 3) return "emergency";
    if (category >= 1) return "warning";
    return "info";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-primary" />
              Current Storm Tracking
            </div>
            <Badge variant={getCategoryColor(currentStorm.category) as any}>
              Category {currentStorm.category}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold">{currentStorm.name}</h3>
            <p className="text-muted-foreground">{currentStorm.distance}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-1">
              <Wind className="h-4 w-4 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Max Winds</p>
              <p className="font-semibold">{currentStorm.maxWinds} mph</p>
            </div>
            <div className="text-center space-y-1">
              <Eye className="h-4 w-4 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Pressure</p>
              <p className="font-semibold">{currentStorm.pressure} mb</p>
            </div>
            <div className="text-center space-y-1">
              <MapPin className="h-4 w-4 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold text-xs">{currentStorm.location}</p>
            </div>
            <div className="text-center space-y-1">
              <Wind className="h-4 w-4 mx-auto text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Movement</p>
              <p className="font-semibold text-xs">{currentStorm.movement}</p>
            </div>
          </div>

          <div className="bg-muted p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-warning" />
              <span className="font-semibold text-sm">Projected Landfall</span>
            </div>
            <p className="text-sm">{currentStorm.landfall}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Active Watches & Warnings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {watches.map((watch, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <Badge 
                  variant={watch.color === 'emergency' ? 'destructive' : 'secondary'}
                  className="mb-1"
                >
                  {watch.type}
                </Badge>
                <p className="text-sm text-muted-foreground">{watch.area}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Active Now</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};