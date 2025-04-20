
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { newsData } from '@/components/NewsSection';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const news = newsData.find(item => item.id === Number(id));

  if (!news) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-2xl font-bold">News not found</h1>
        <Button onClick={() => navigate('/')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <Button onClick={() => navigate('/')} className="mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Button>
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-start mb-4">
            <Badge variant={
              news.type === "alert" 
                ? "destructive" 
                : news.type === "warning" 
                  ? "secondary" 
                  : "default"
            }>
              {news.category}
            </Badge>
            <span className="text-sm text-muted-foreground">{news.date}</span>
          </div>
          <CardTitle className="text-3xl mb-4">{news.title}</CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Badge variant="outline">{news.region}</Badge>
            <span>•</span>
            <span>{news.source}</span>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed mb-6">{news.summary}</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-xl mb-2">Key Points:</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Investigation Details: Comprehensive analysis of the incident and its implications</li>
                <li>Preventive Measures: Steps taken by authorities to address the situation</li>
                <li>Consumer Advisory: Guidelines and precautions for the public</li>
                <li>Future Actions: Planned interventions and policy changes</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-xl mb-2">Related Information:</h3>
              <p className="text-muted-foreground">
                This incident is part of ongoing efforts by food safety authorities to ensure consumer protection
                and maintain high standards in food quality across the region. Regular monitoring and swift action
                against violations demonstrate the commitment to public health and safety.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsDetail;
