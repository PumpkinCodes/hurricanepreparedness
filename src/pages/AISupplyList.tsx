import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Sparkles, Download, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AISupplyList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedList, setGeneratedList] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    familySize: "",
    hasChildren: false,
    childrenAges: "",
    hasPets: false,
    petTypes: "",
    hasSpecialNeeds: false,
    specialNeeds: "",
    budgetRange: "moderate",
    storageSpace: "average",
    additionalInfo: ""
  });

  const generateSupplyList = async () => {
    setLoading(true);
    try {
      const prompt = `Create a personalized hurricane emergency supply list for a family with the following details:
      - Family size: ${formData.familySize} people
      - Children: ${formData.hasChildren ? `Yes, ages: ${formData.childrenAges}` : 'No'}
      - Pets: ${formData.hasPets ? `Yes, types: ${formData.petTypes}` : 'No'}
      - Special needs: ${formData.hasSpecialNeeds ? `Yes: ${formData.specialNeeds}` : 'No'}
      - Budget: ${formData.budgetRange}
      - Storage space: ${formData.storageSpace}
      - Additional info: ${formData.additionalInfo}

      Please provide a detailed supply list with specific quantities and considerations for this family. Format as a numbered list with clear categories.`;

      const { data, error } = await supabase.functions.invoke('generate-supply-list', {
        body: { prompt }
      });

      if (error) throw error;

      const supplies = data.generatedText
        .split('\n')
        .filter((line: string) => line.trim() && /^\d+\./.test(line.trim()))
        .map((line: string) => line.replace(/^\d+\.\s*/, '').trim());

      setGeneratedList(supplies);
      toast.success("Personalized supply list generated!");
    } catch (error) {
      console.error('Error generating supply list:', error);
      toast.error("Failed to generate supply list. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadList = () => {
    const listText = `PERSONALIZED HURRICANE SUPPLY LIST

Family Details:
- Size: ${formData.familySize} people
- Children: ${formData.hasChildren ? `Yes, ages: ${formData.childrenAges}` : 'No'}
- Pets: ${formData.hasPets ? `Yes, types: ${formData.petTypes}` : 'No'}
- Special needs: ${formData.hasSpecialNeeds ? formData.specialNeeds : 'None'}

Supply List:
${generatedList.map((item, index) => `${index + 1}. ${item}`).join('\n')}

Generated on: ${new Date().toLocaleDateString()}
Stay safe and stay prepared!`;

    const blob = new Blob([listText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Personalized_Hurricane_Supply_List.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => navigate('/')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Hub
            </Button>
            <h1 className="text-xl font-bold">AI-Powered Supply List Generator</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 max-w-4xl">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                Family Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="familySize">Family Size</Label>
                <Input
                  id="familySize"
                  type="number"
                  placeholder="Number of people"
                  value={formData.familySize}
                  onChange={(e) => setFormData(prev => ({...prev, familySize: e.target.value}))}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasChildren"
                  checked={formData.hasChildren}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, hasChildren: !!checked}))}
                />
                <Label htmlFor="hasChildren">I have children</Label>
              </div>

              {formData.hasChildren && (
                <div>
                  <Label htmlFor="childrenAges">Children's Ages</Label>
                  <Input
                    id="childrenAges"
                    placeholder="e.g., 2, 8, 15"
                    value={formData.childrenAges}
                    onChange={(e) => setFormData(prev => ({...prev, childrenAges: e.target.value}))}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPets"
                  checked={formData.hasPets}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, hasPets: !!checked}))}
                />
                <Label htmlFor="hasPets">I have pets</Label>
              </div>

              {formData.hasPets && (
                <div>
                  <Label htmlFor="petTypes">Pet Types & Sizes</Label>
                  <Input
                    id="petTypes"
                    placeholder="e.g., 2 medium dogs, 1 cat"
                    value={formData.petTypes}
                    onChange={(e) => setFormData(prev => ({...prev, petTypes: e.target.value}))}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasSpecialNeeds"
                  checked={formData.hasSpecialNeeds}
                  onCheckedChange={(checked) => setFormData(prev => ({...prev, hasSpecialNeeds: !!checked}))}
                />
                <Label htmlFor="hasSpecialNeeds">Special medical or dietary needs</Label>
              </div>

              {formData.hasSpecialNeeds && (
                <div>
                  <Label htmlFor="specialNeeds">Special Needs Details</Label>
                  <Textarea
                    id="specialNeeds"
                    placeholder="Describe medications, medical equipment, dietary restrictions, etc."
                    value={formData.specialNeeds}
                    onChange={(e) => setFormData(prev => ({...prev, specialNeeds: e.target.value}))}
                  />
                </div>
              )}

              <div>
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  placeholder="Any other considerations (allergies, specific concerns, etc.)"
                  value={formData.additionalInfo}
                  onChange={(e) => setFormData(prev => ({...prev, additionalInfo: e.target.value}))}
                />
              </div>

              <Button 
                onClick={generateSupplyList} 
                className="w-full" 
                disabled={loading || !formData.familySize}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate My Supply List
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Personalized Supply List</CardTitle>
            </CardHeader>
            <CardContent>
              {generatedList.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">
                  <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Fill out the form and click "Generate" to get your personalized supply list</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="max-h-96 overflow-y-auto space-y-2">
                    {generatedList.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-2 border rounded">
                        <Checkbox />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                  <Button onClick={downloadList} className="w-full" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download My List
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AISupplyList;