
import { Button } from "@/components/ui/button";

const BusinessTypes = () => {
  const benefits = [
    {
      title: "Callyn handles calls nonstop so you don't have to.",
      image: "/public/lovable-uploads/c2329e29-7931-48f4-9056-5285843bd0e2.png"
    },
    {
      title: "Exact script — tailored to your niche, every time.",
      image: "/public/lovable-uploads/e406c4cd-746b-489d-b782-0d0a3e03f8a2.png"
    },
    {
      title: "Calls, responses and follow-ups — all in one sheet.",
      image: "/public/lovable-uploads/4458412b-a7ea-41e0-ab42-deccb671a378.png"
    }
  ];

  const quotes = [
    {
      quote: "We're a small team — we can't call everyone. = Callyn",
      image: "/public/lovable-uploads/7ef44233-156c-4bad-a3b0-c950117e25ba.png"
    },
    {
      quote: "I need to say the right thing. = Callyn speaks your exact",
      image: "/public/lovable-uploads/65c3cf06-4fad-4084-b4a9-7dcebbbbff2b.png"
    },
    {
      quote: "I don't have a system — everything scattered. = Callyn tracks",
      image: "/public/lovable-uploads/8e4741bc-292a-4295-ac6e-2d99371c88e2.png"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {benefits.map((item, index) => (
            <div key={index} className="relative h-96 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {quotes.map((item, index) => (
            <div key={index} className="relative h-96 overflow-hidden">
              <img 
                src={item.image} 
                alt="Person" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <h3 className="text-2xl font-bold text-white">{item.quote}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-12 rounded-lg shadow-xl text-center mb-12">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold text-blue-700 mb-12">
              Callyn Pricing Plans (Cold Callers & Small Businesses)
            </h2>
            
            <img 
              src="/public/lovable-uploads/1633a9ec-d2dc-4f50-9630-5214c7dea06c.png" 
              alt="Callyn Pricing" 
              className="w-full max-w-4xl mb-12"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                Sales Plan = Perfect for sales, closer, appointment setter, and more
              </h3>
              <Button className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg">
                Check it out
              </Button>
            </div>
            
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-bold text-blue-700 mb-4">
                Business Plan = Perfect for inbound and outbound call system
              </h3>
              <Button className="rounded-full bg-blue-700 hover:bg-blue-800 text-white px-8 py-6 text-lg">
                Check it out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BusinessTypes;
