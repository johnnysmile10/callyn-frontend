
const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Train Rosie on your business.",
      description: "Use your Google Business profile, website address or simple business information to get started.",
      image: "/lovable-uploads/b982e5a3-f2a8-4454-ba90-a92fe4242873.png"
    },
    {
      number: "2",
      title: "Confirm Rosie has things right.",
      description: "Rosie will be trained on your specific business information. Make adjustments, add questions you want asked when taking a message, and more.",
      image: "/lovable-uploads/62ea189c-696d-4629-a154-b6c91f973291.png"
    },
    {
      number: "3",
      title: "Forward your calls to Rosie",
      description: "No need to change your existing business number. Just forward calls to Rosie when you want her to answer.",
      image: "/lovable-uploads/3bd3d4c6-823e-4f57-b317-2611f91689af.png"
    },
    {
      number: "4",
      title: "Rosie answers your calls and takes messages.",
      description: "When a call comes in, Rosie will answer the call, answer questions, and take a message according to your needs. You'll then be notified by email and/or text, and every call recording and transcript is saved in your calls inbox.",
      image: "/lovable-uploads/c1bf6c33-6c5c-4279-a6b1-53004666eb3c.png"
    }
  ];

  return (
    <section className="bg-white py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-4">
          How it Works
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          Powerful, yet super easy to set up and get started in minutes.
        </p>

        <div className="space-y-16">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className={`w-1/2 ${index % 2 !== 0 ? 'order-2' : ''}`}>
                <div className="bg-rosie-lightPurple p-2 rounded-lg inline-block mb-4">
                  <span className="font-bold text-rosie-purple">STEP {step.number}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-rosie-darkPurple mb-4">
                  {step.title}
                </h3>
                <p className="text-lg text-gray-600">
                  {step.description}
                </p>
              </div>
              <div className={`w-1/2 ${index % 2 !== 0 ? 'order-1' : ''}`}>
                <img
                  src={step.image}
                  alt={`Step ${step.number}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
