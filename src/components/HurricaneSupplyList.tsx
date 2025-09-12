import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Package, Droplets, Zap, Heart } from "lucide-react";

const supplyCategories = [
  {
    icon: Droplets,
    title: "Water & Food",
    items: [
      "1 gallon of water per person per day (3-7 day supply)",
      "Non-perishable food (3-7 day supply)",
      "Manual can opener",
      "Baby food and formula (if needed)",
      "Pet food and water"
    ]
  },
  {
    icon: Zap,
    title: "Power & Communication",
    items: [
      "Battery-powered or hand crank radio",
      "Flashlight and extra batteries",
      "Cell phone chargers and power banks",
      "Emergency whistle",
      "Local area maps"
    ]
  },
  {
    icon: Heart,
    title: "Medical & Safety",
    items: [
      "First aid kit",
      "Prescription medications (7-day supply)",
      "Emergency blanket",
      "Fire extinguisher",
      "Matches in waterproof container"
    ]
  },
  {
    icon: Package,
    title: "Personal Items",
    items: [
      "Important documents in waterproof bag",
      "Cash and credit cards",
      "Change of clothing and sturdy shoes",
      "Personal hygiene items",
      "Emergency contact information"
    ]
  }
];

export const HurricaneSupplyList = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  
  const totalItems = supplyCategories.reduce((sum, category) => sum + category.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = (checkedCount / totalItems) * 100;

  const handleCheck = (item: string, checked: boolean) => {
    setCheckedItems(prev => ({ ...prev, [item]: checked }));
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Hurricane Supply Kit Progress
          </CardTitle>
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              {checkedCount} of {totalItems} items prepared ({Math.round(progress)}% complete)
            </p>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {supplyCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <category.icon className="h-5 w-5 text-primary" />
                {category.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {category.items.map((item, index) => {
                  const isChecked = checkedItems[item] || false;
                  return (
                    <div key={index} className="flex items-start space-x-3">
                      <Checkbox
                        id={`${category.title}-${index}`}
                        checked={isChecked}
                        onCheckedChange={(checked) => handleCheck(item, checked as boolean)}
                        className="mt-0.5"
                      />
                      <label
                        htmlFor={`${category.title}-${index}`}
                        className={`text-sm leading-relaxed cursor-pointer ${
                          isChecked ? 'line-through text-muted-foreground' : ''
                        }`}
                      >
                        {item}
                      </label>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};