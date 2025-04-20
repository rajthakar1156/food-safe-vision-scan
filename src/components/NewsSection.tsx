
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle, Link } from "lucide-react";

const newsData = [
  {
    id: 1,
    title: "Major Food Adulteration Ring Busted in Gujarat",
    date: "2025-04-18",
    category: "Food Safety",
    region: "Gujarat",
    summary: "Authorities uncover large-scale adulteration of edible oil and milk products in Ahmedabad. The operation led to the seizure of over 5,000 liters of adulterated oil and 2,000 liters of synthetic milk.",
    source: "Gujarat Food Safety Department",
    type: "alert"
  },
  {
    id: 2,
    title: "New Food Safety Guidelines Implemented in Gujarat",
    date: "2025-04-15",
    category: "Regulation",
    region: "Gujarat",
    summary: "FSSAI introduces stricter quality control measures for packaged food products across Gujarat state. New regulations require additional testing for pesticide residues and heavy metals.",
    source: "FSSAI Gujarat",
    type: "update"
  },
  {
    id: 3,
    title: "Popular Snack Brand Under Scanner for Chemical Content",
    date: "2025-04-10",
    category: "Investigation",
    region: "Pan India",
    summary: "Food safety department investigates high levels of prohibited preservatives in a leading snack brand. Laboratory tests confirm presence of sodium benzoate beyond permissible limits.",
    source: "National Food Safety Authority",
    type: "warning"
  },
  {
    id: 4,
    title: "Antimicrobial Residues Found in Milk Samples Across Surat",
    date: "2025-04-09",
    category: "Investigation",
    region: "Gujarat",
    summary: "Recent tests reveal alarming levels of antibiotic residues in milk samples collected from local dairies in Surat. Experts warn about potential health hazards including antimicrobial resistance.",
    source: "Surat Municipal Corporation",
    type: "alert"
  },
  {
    id: 5,
    title: "Vadodara Restaurant Chain Fined for Hygiene Violations",
    date: "2025-04-08",
    category: "Enforcement",
    region: "Gujarat",
    summary: "Popular restaurant chain in Vadodara faces penalties after surprise inspections uncover multiple food safety and hygiene violations including improper storage and cross-contamination issues.",
    source: "Vadodara Municipal Corporation",
    type: "warning"
  },
  {
    id: 6,
    title: "Pesticide Residues Detected in Vegetable Markets of Rajkot",
    date: "2025-04-06",
    category: "Food Safety",
    region: "Gujarat",
    summary: "Random sampling of vegetables from Rajkot markets shows excessive pesticide residues, particularly in leafy greens. Officials have issued warnings to suppliers and implemented stricter testing protocols.",
    source: "Gujarat Agricultural Department",
    type: "alert"
  },
  {
    id: 7,
    title: "National Campaign Against Food Coloring Adulterants Launched",
    date: "2025-04-05",
    category: "Regulation",
    region: "Pan India",
    summary: "Health Ministry initiates nationwide campaign against harmful food colorants. Special focus on sweets and beverages that commonly use synthetic colors linked to health issues.",
    source: "Ministry of Health and Family Welfare",
    type: "update"
  },
  {
    id: 8,
    title: "Artificially Ripened Fruits Seized in Ahmedabad Markets",
    date: "2025-04-04",
    category: "Enforcement",
    region: "Gujarat",
    summary: "Food safety officials confiscate over 500 kg of chemically ripened fruits from wholesale markets. Calcium carbide, a banned ripening agent with carcinogenic properties, was found being used extensively.",
    source: "Ahmedabad Municipal Corporation",
    type: "warning"
  },
  {
    id: 9,
    title: "New Mobile Testing Labs Deployed Across Gujarat",
    date: "2025-04-03",
    category: "Initiative",
    region: "Gujarat",
    summary: "Gujarat government launches fleet of mobile food testing laboratories to enhance on-spot detection of adulterants. These labs can test milk, oil, spices and other essential food items within minutes.",
    source: "Gujarat Health Department",
    type: "update"
  },
  {
    id: 10,
    title: "Counterfeit Branded Spices Manufacturing Unit Busted",
    date: "2025-04-02",
    category: "Enforcement",
    region: "Gujarat",
    summary: "Authorities raid illegal facility in Jamnagar producing fake branded spices. Tests reveal harmful fillers including sawdust and industrial dyes being used as additives.",
    source: "Gujarat Police",
    type: "alert"
  },
  {
    id: 11,
    title: "Study Reveals High Levels of Heavy Metals in Rice Samples",
    date: "2025-04-01",
    category: "Research",
    region: "Pan India",
    summary: "Research conducted by ICMR shows concerning levels of arsenic, lead and mercury in rice samples from certain regions. Experts recommend thorough washing and diverse grain consumption.",
    source: "Indian Council of Medical Research",
    type: "warning"
  },
  {
    id: 12,
    title: "Gandhidham Fish Markets Under Scrutiny for Formalin Use",
    date: "2025-03-30",
    category: "Investigation",
    region: "Gujarat",
    summary: "Investigators discover formaldehyde (formalin) being used as a preservative in fish markets of Gandhidham. The chemical, known to cause cancer, was being used to extend shelf life of seafood products.",
    source: "Coastal Zone Management Authority",
    type: "alert"
  },
  {
    id: 13,
    title: "FSSAI Revises Standards for Infant Food Products",
    date: "2025-03-28",
    category: "Regulation",
    region: "Pan India",
    summary: "Food authority implements stricter standards for baby food products across India. New regulations limit sugar content and mandate additional nutritional requirements.",
    source: "FSSAI Headquarters",
    type: "update"
  },
  {
    id: 14,
    title: "Melamine Contamination Found in Dairy Products",
    date: "2025-03-26",
    category: "Food Safety",
    region: "Gujarat",
    summary: "Testing reveals melamine adulteration in several dairy products in Mehsana. The industrial chemical, added to falsely boost protein content readings, can cause kidney damage and failure.",
    source: "Gujarat Dairy Federation",
    type: "alert"
  },
  {
    id: 15,
    title: "E-commerce Platforms to Require Food Safety Certificates",
    date: "2025-03-25",
    category: "Regulation",
    region: "Pan India",
    summary: "New directive requires all food products sold online to display valid FSSAI certification and complete ingredient lists. E-commerce platforms given 60 days to ensure compliance.",
    source: "Ministry of Commerce",
    type: "update"
  },
  {
    id: 16,
    title: "Harmful Preservatives Detected in Street Food Samples",
    date: "2025-03-24",
    category: "Investigation",
    region: "Gujarat",
    summary: "Random testing of street food in Surat reveals widespread use of prohibited preservatives including sodium metabisulphite and potassium bromate. Vendors association pledges to implement self-regulation.",
    source: "Surat Food Safety Department",
    type: "warning"
  },
  {
    id: 17,
    title: "Subsidized Food Testing Kits for Consumer Awareness",
    date: "2025-03-22",
    category: "Initiative",
    region: "Gujarat",
    summary: "Gujarat government announces subsidized distribution of home food testing kits that can detect common adulterants in milk, spices, oils and more. The initiative aims to empower consumers with self-testing capabilities.",
    source: "Gujarat Consumer Affairs Department",
    type: "update"
  },
  {
    id: 18,
    title: "Organic Food Certification Fraud Uncovered",
    date: "2025-03-20",
    category: "Investigation",
    region: "Pan India",
    summary: "Investigation reveals several brands falsely claiming organic certification. Products labeled 'organic' found to contain pesticide residues and synthetic fertilizers upon laboratory testing.",
    source: "Agricultural and Processed Food Products Export Development Authority",
    type: "alert"
  },
  {
    id: 19,
    title: "New App Launched to Report Food Safety Violations",
    date: "2025-03-18",
    category: "Technology",
    region: "Gujarat",
    summary: "Gujarat Food Safety Department launches mobile application allowing citizens to report food safety violations with photo evidence. The app includes features to track complaint resolution and access food safety ratings.",
    source: "Gujarat IT Department",
    type: "update"
  },
  {
    id: 20,
    title: "School Canteen Safety Standards Upgraded",
    date: "2025-03-15",
    category: "Regulation",
    region: "Gujarat",
    summary: "New guidelines issued for school canteens across Gujarat mandate regular food quality checks, ban on certain food colors, and implementation of hygiene training for food handlers. Compliance deadline set for June 2025.",
    source: "Gujarat Education Department",
    type: "update"
  }
];

const NewsSection = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [visibleNews, setVisibleNews] = useState<number>(6);

  const filteredNews = activeFilter === "all" 
    ? newsData 
    : newsData.filter(news => news.region.toLowerCase() === activeFilter.toLowerCase());

  const loadMore = () => {
    setVisibleNews(prev => Math.min(prev + 6, filteredNews.length));
  };

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
          {filteredNews.slice(0, visibleNews).map((news) => (
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
                <p className="text-muted-foreground mb-4 line-clamp-3">{news.summary}</p>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">Source:</span> {news.source}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline">{news.region}</Badge>
                    <Button variant="ghost" className="text-primary">
                      <FileText className="w-4 h-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {visibleNews < filteredNews.length && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadMore} variant="outline" className="px-8">
              Load More News
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsSection;
