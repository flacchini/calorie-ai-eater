import React, { useState, useRef } from "react";
import { toast } from "sonner";
import { Camera, X, Upload, PanelRight, CircleCheck, Loader2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodEntry, saveFoodEntry, formatDate, calculateHealthScore } from "@/utils/foodDataUtils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import RunwareImageAnalysis from "./RunwareImageAnalysis";

const mockAnalyzeImage = async (imageFile: File): Promise<{ 
  foodName: string, 
  calories: number, 
  protein: number, 
  carbs: number, 
  fat: number 
}> => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  return {
    foodName: "Salat mit Hähnchen",
    calories: 350,
    protein: 25,
    carbs: 15,
    fat: 20
  };
};

const FoodImageAnalysis: React.FC = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ 
    foodName: string, 
    calories: number, 
    protein: number, 
    carbs: number, 
    fat: number 
  } | null>(null);
  const [notes, setNotes] = useState("");
  const [useAI, setUseAI] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const startCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast.error("Kamera wird von deinem Browser nicht unterstützt");
        return;
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Zugriff auf die Kamera fehlgeschlagen");
    }
  };
  
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };
  
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0);
        
        const imageUrl = canvasRef.current.toDataURL('image/png');
        setCapturedImage(imageUrl);
        
        canvasRef.current.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "captured-food.png", { type: "image/png" });
            setSelectedFile(file);
          }
        });
        
        stopCamera();
      }
    }
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setCapturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const resetCapture = () => {
    setCapturedImage(null);
    setSelectedFile(null);
    setAnalysisResult(null);
    setUseAI(false);
  };
  
  const analyzeImage = async () => {
    if (!selectedFile) {
      toast.error("Bitte zuerst ein Bild aufnehmen oder hochladen");
      return;
    }
    
    setIsAnalyzing(true);
    
    try {
      const result = await mockAnalyzeImage(selectedFile);
      setAnalysisResult(result);
      toast.success("Analyse abgeschlossen!");
    } catch (error) {
      console.error("Error analyzing image:", error);
      toast.error("Fehler bei der Analyse des Bildes");
    } finally {
      setIsAnalyzing(false);
    }
  };
  
  const handleAIAnalysisComplete = (result: any) => {
    setAnalysisResult(result);
  };
  
  const saveAnalysisResult = () => {
    if (!analysisResult) return;
    
    const foodEntry: FoodEntry = {
      id: uuidv4(),
      name: analysisResult.foodName,
      date: formatDate(new Date()),
      calories: analysisResult.calories,
      protein: analysisResult.protein,
      carbs: analysisResult.carbs,
      fat: analysisResult.fat,
      healthScore: calculateHealthScore(
        analysisResult.protein,
        analysisResult.carbs,
        analysisResult.fat
      ),
      notes: notes
    };
    
    saveFoodEntry(foodEntry);
    toast.success("Eintrag gespeichert!");
    
    resetCapture();
    setNotes("");
  };
  
  React.useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="w-full max-w-lg mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Essen per Foto analysieren</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!capturedImage ? (
            <div className="space-y-4">
              <div className="camera-container">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-center gap-2">
                <Button onClick={startCamera} className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Kamera starten
                </Button>
                <Button onClick={captureImage} variant="secondary" className="flex items-center gap-2">
                  <Camera className="h-4 w-4" />
                  Foto aufnehmen
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-muted-foreground">oder</p>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-2 flex items-center gap-2 mx-auto"
                >
                  <Upload className="h-4 w-4" />
                  Foto hochladen
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured food"
                  className="w-full rounded-md object-cover"
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={resetCapture}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {!analysisResult ? (
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Button
                      className="flex-1 flex items-center justify-center gap-2"
                      onClick={() => setUseAI(true)}
                    >
                      <PanelRight className="h-4 w-4" />
                      KI-Analyse
                    </Button>
                    
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      variant="secondary"
                      className="flex-1 flex items-center justify-center gap-2"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Analysiere...
                        </>
                      ) : (
                        <>
                          <PanelRight className="h-4 w-4" />
                          Einfache Analyse
                        </>
                      )}
                    </Button>
                  </div>
                  
                  {useAI && (
                    <RunwareImageAnalysis 
                      imageUrl={capturedImage} 
                      onAnalysisComplete={handleAIAnalysisComplete}
                    />
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-secondary p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{analysisResult.foodName}</p>
                      <CircleCheck className="h-5 w-5 text-primary" />
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <p className="font-semibold text-nutrition-calories">{analysisResult.calories}</p>
                        <p className="text-xs text-muted-foreground">kcal</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <p className="font-semibold text-nutrition-protein">{analysisResult.protein}g</p>
                        <p className="text-xs text-muted-foreground">Eiweiß</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <p className="font-semibold text-nutrition-carbs">{analysisResult.carbs}g</p>
                        <p className="text-xs text-muted-foreground">Kohlenh.</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <p className="font-semibold text-nutrition-fat">{analysisResult.fat}g</p>
                        <p className="text-xs text-muted-foreground">Fett</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notizen</Label>
                    <Textarea
                      id="notes"
                      placeholder="Optional: Weitere Infos oder Anmerkungen"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    onClick={saveAnalysisResult}
                    className="w-full"
                  >
                    Eintrag speichern
                  </Button>
                </div>
              )}
            </div>
          )}
          
          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};

export default FoodImageAnalysis;
