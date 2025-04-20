
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Article, AlertCircle } from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "Major Food Adulteration Ring Busted in Gujarat",
    date: "2025-04-18",
    category: "Food Safety",
    region: "Gujarat",
    summary: "Authorities uncover large-scale adulteration of edible oil and milk products in Ahmedabad.",
    type: "alert"
  },
  {
    id: 2,
    title: "New Food Safety Guidelines Implemented in Gujarat",
    date: "2025-04-15",
    category: "Regulation",
    region: "Gujarat",
    summary: "FSSAI introduces stricter quality control measures for packaged food products.",
    type: "update"
  },
  {
    id: 3,
    title: "Popular Snack Brand Under Scanner for Chemical Content",
    date: "2025-04-10",
    category: "Investigation",
    region: "Pan India",
    summary: "Food safety department investigates high levels of prohibited preservatives.",
    type: "warning"
  }
];

const NewsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredNews = activeFilter === "all" 
    ? newsData 
    : newsData.filter(news => news.region.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col items-center mb-10 text-center">
          <Badge variant="outline" className="mb-4">
            <AlertCircle className="w-4 h-4 mr-2" />
            Latest Updates
          </Badge>
          <h2 className="text-3xl font-bold mb-4">Food Safety News</h2>
          <p className="text-muted-foreground max-w-2xl">
            Stay informed about the latest food safety incidents, regulations, and investigations
            across India with special focus on Gujarat region.
          </p>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          {["All", "Gujarat", "Pan India"].map((region) => (
            <Button
              key={region}
              variant={activeFilter === region.toLowerCase() ? "default" : "outline"}
              onClick={() => setActiveFilter(region.toLowerCase())}
              className="min-w-[100px]"
            >
              {region}
            </Button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((news) => (
            <Card key={news.id} className="glass-card card-hover">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge 
                    variant={
                      news.type === "alert" 
                        ? "destructive" 
                        : news.type === "warning" 
                          ? "secondary" 
                          : "default"
                    }
                  >
                    {news.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{news.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{news.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{news.summary}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{news.region}</Badge>
                  <Button variant="ghost" className="text-primary">
                    <Article className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
