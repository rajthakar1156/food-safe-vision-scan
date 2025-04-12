
import { Check, ShieldAlert, Microscope, Coffee } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const features = [
    {
      icon: ShieldAlert,
      title: "Chemical Detection",
      description: "Identify harmful chemicals and additives in packaged foods with our advanced scanning technology."
    },
    {
      icon: Microscope,
      title: "Detailed Analysis",
      description: "Get comprehensive analysis of ingredients with risk assessments and recommendations."
    },
    {
      icon: Coffee,
      title: "Easy to Use",
      description: "Simply scan the barcode or enter ingredients manually to get instant results."
    },
    {
      icon: Check,
      title: "Reliable Data",
      description: "Our database is regularly updated with the latest research on food additives and chemicals."
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">About FoodSafeScan</h2>
          <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
            We help consumers identify potentially harmful chemicals in packaged food products like chips and snacks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              At FoodSafeScan, we believe everyone has the right to know what's in their food. Our mission is to empower consumers with the knowledge to make healthier choices by providing transparent information about potentially harmful ingredients.
            </p>
            
            <h3 className="text-2xl font-bold mb-4">How It Works</h3>
            <ul className="space-y-3">
              <li className="flex">
                <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                <div>
                  <span className="font-medium">Scan the product barcode</span>
                  <p className="text-muted-foreground text-sm">Use your camera to scan the barcode on packaged food items.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                <div>
                  <span className="font-medium">Instant analysis</span>
                  <p className="text-muted-foreground text-sm">Our system quickly processes the ingredients against our database.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                <div>
                  <span className="font-medium">Review the results</span>
                  <p className="text-muted-foreground text-sm">Get detailed information about potentially harmful chemicals.</p>
                </div>
              </li>
              <li className="flex">
                <span className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                <div>
                  <span className="font-medium">Make informed choices</span>
                  <p className="text-muted-foreground text-sm">Use our recommendations to choose healthier alternatives.</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover">
                <CardContent className="p-6">
                  <div className="bg-primary/10 p-3 rounded-full w-fit mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-medium mb-2">{feature.title}</h4>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
