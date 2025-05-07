
const Testimonials = () => {
  const testimonials = [
    {
      image: "/lovable-uploads/b4d33bbd-2e33-45bb-ba2f-0fbe65f0bd78.png",
      title: "Never miss another call or opportunity.",
      description: "Rosie is there anytime you're not around to answer calls."
    },
    {
      image: "/lovable-uploads/9dbbaf8d-f660-4b65-96a4-34691dbb3adf.png",
      title: "No more hangups on voicemail.",
      description: "No one leaves a voicemail anymore, but everyone will talk to Rosie."
    },
    {
      image: "/lovable-uploads/b9897370-78b6-4a76-98e5-43ebc0acc06d.png",
      title: "10x cheaper than an answering service.",
      description: "There's no need to spend a fortune on a human answering service."
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-16">
          Never miss an opportunity because you can't answer the phone.
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
              <img src={item.image} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-bold text-rosie-darkPurple mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
