import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface EmergencyAlertProps {
  type: "emergency" | "warning" | "watch" | "info";
  title: string;
  message: string;
  dismissible?: boolean;
}

const alertStyles = {
  emergency: "bg-emergency text-emergency-foreground border-emergency/20",
  warning: "bg-warning text-warning-foreground border-warning/20",
  watch: "bg-info text-info-foreground border-info/20", 
  info: "bg-muted text-muted-foreground border-border"
};

export const EmergencyAlert = ({ type, title, message, dismissible = false }: EmergencyAlertProps) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className={`w-full p-4 border-b-2 ${alertStyles[type]} transition-all duration-300`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <AlertTriangle className="h-5 w-5 animate-pulse" />
          <div>
            <h3 className="font-semibold text-sm md:text-base">{title}</h3>
            <p className="text-xs md:text-sm opacity-90">{message}</p>
          </div>
        </div>
        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsVisible(false)}
            className="h-8 w-8 hover:bg-black/10"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};