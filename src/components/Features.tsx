
import { MessageSquare, Play, Bell, Sparkles } from "lucide-react";

const Features = () => {
  return (
    <section className="bg-rosie-purple/10 py-16 md:py-24 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-rosie-darkPurple text-center mb-4">
          Why Rosie is right for your small business.
        </h2>
        <p className="text-xl text-gray-600 text-center mb-16">
          The power of the latest AI tech, working for you 24/7.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="feature-card">
            <Sparkles className="text-rosie-purple w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Amazing human-like AI to answer your phone</h3>
            <p className="text-gray-200">
              You'll outshine your competition with the most modern AI voice tech.
            </p>
          </div>

          <div className="feature-card">
            <Bell className="text-rosie-purple w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Get notified right away</h3>
            <p className="text-gray-200">
              Rosie will email and/or text you every time a new call comes in, so you can quickly decide how best to handle it.
            </p>
          </div>

          <div className="feature-card">
            <MessageSquare className="text-rosie-purple w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Custom message taking</h3>
            <p className="text-gray-200">
              You determine the most important information that your business needs in a message, and Rosie will make sure to get it from your callers.
            </p>
          </div>

          <div className="feature-card">
            <Play className="text-rosie-purple w-12 h-12 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Recordings, transcripts, call management</h3>
            <p className="text-gray-200">
              Every call is recorded and transcribed for you in your inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
