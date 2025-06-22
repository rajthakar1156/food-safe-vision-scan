
import { useState } from "react";
import { ChevronRight, Upload, Scan, BarChart3, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface StorylineGuideProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const StorylineGuide = ({ currentStep, onStepChange }: StorylineGuideProps) => {
  const steps = [
    {
      id: 1,
      icon: Upload,
      title: "Upload Food Image",
      description: "Take a photo or upload an image of packaged food products",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      icon: Scan,
      title: "AI Analysis",
      description: "Our AI analyzes ingredients, preservatives, and safety ratings",
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 3,
      icon: BarChart3,
      title: "View Results",
      description: "Get detailed analysis with safety scores and recommendations",
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 4,
      icon: CheckCircle,
      title: "Make Informed Choices",
      description: "Use insights to make healthier food choices",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">Follow these simple steps to analyze your food products</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card 
              key={step.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                currentStep >= step.id 
                  ? 'bg-white shadow-lg border-2 border-purple-200' 
                  : 'bg-gray-50 opacity-60'
              }`}
              onClick={() => onStepChange(step.id)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto mb-4`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{step.description}</p>
                <div className="flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">{step.id}</span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-5 h-5 text-gray-400 ml-2" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            onClick={() => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 text-lg"
          >
            Start Your Food Analysis Journey
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StorylineGuide;
