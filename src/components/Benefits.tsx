
import { BellRing, MessageSquare, Play, Sparkles } from "lucide-react";

const Benefits = () => {
  return (
    <section className="bg-rosie-background py-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature 1 */}
          <div className="bg-rosie-deepPurple rounded-2xl p-10 text-white">
            <div className="mb-6">
              <Sparkles className="w-12 h-12 text-rosie-purple" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Amazing human-like AI to answer your phone
            </h3>
            <p className="text-lg text-gray-300">
              You'll outshine your competition with the most modern AI voice tech.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-rosie-deepPurple rounded-2xl p-10 text-white">
            <div className="mb-6">
              <BellRing className="w-12 h-12 text-rosie-purple" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Get notified right away
            </h3>
            <p className="text-lg text-gray-300">
              Rosie will email and/or text you every time a new call comes in, so you can quickly decide how best to handle it.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-rosie-deepPurple rounded-2xl p-10 text-white">
            <div className="mb-6">
              <MessageSquare className="w-12 h-12 text-rosie-purple" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Custom message taking
            </h3>
            <p className="text-lg text-gray-300">
              You determine the most important information that your business needs in a message, and Rosie will make sure to get it from your callers.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-rosie-deepPurple rounded-2xl p-10 text-white">
            <div className="mb-6">
              <Play className="w-12 h-12 text-rosie-purple" />
            </div>
            <h3 className="text-3xl font-bold mb-4">
              Recordings, transcripts, call management
            </h3>
            <p className="text-lg text-gray-300">
              Every call is recorded and transcribed for you in your inbox.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
