
const BusinessTypes = () => {
  const businessTypes = [
    "Home Services",
    "Medical Clinics",
    "Law Firms",
    "Property Management",
    "Construction",
    "Landscaping",
    "Hotels & Restaurants",
    "Realty Groups",
    "Gyms",
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-4">
          Built for businesses like yours
        </h2>
        <p className="text-xl md:text-2xl text-gray-600 text-center mb-12">
          Join other small businesses in your industry using Rosie.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {businessTypes.map((business, index) => (
            <div key={index} className="business-card">
              <h3 className="text-xl font-semibold text-rosie-darkPurple">{business}</h3>
            </div>
          ))}
        </div>
        
        <p className="text-xl text-center mt-12 text-rosie-darkPurple">
          And other small businesses that need to answer the phone...
        </p>
      </div>
    </section>
  );
};

export default BusinessTypes;
