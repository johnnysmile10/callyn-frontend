
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Volume2, Play, Pause, Search, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

interface Voice {
  id: string;
  name: string;
  gender: string;
  accent: string;
  age: string;
  industry: string[];
  personality: string[];
  description: string;
  sampleText: string;
}

const EXPANDED_VOICE_LIBRARY: Voice[] = [
  // Professional Business Voices
  {
    id: "9BWtsMINqrJLrRacOk9x",
    name: "Aria",
    gender: "Female",
    accent: "American",
    age: "30s",
    industry: ["Technology", "Healthcare", "Finance"],
    personality: ["Professional", "Confident", "Approachable"],
    description: "Clear, professional voice perfect for B2B sales and consultative selling",
    sampleText: "Hello, this is Aria calling from your trusted business solutions partner."
  },
  {
    id: "CwhRBWXzGAHq8TQ4Fs17",
    name: "Roger",
    gender: "Male",
    accent: "American",
    age: "40s",
    industry: ["Real Estate", "Insurance", "Automotive"],
    personality: ["Authoritative", "Trustworthy", "Experienced"],
    description: "Mature, authoritative voice that builds trust and credibility",
    sampleText: "Good morning, this is Roger. I'm calling about an important opportunity for your business."
  },
  {
    id: "EXAVITQu4vr4xnSDxMaL",
    name: "Sarah",
    gender: "Female",
    accent: "British",
    age: "20s",
    industry: ["Education", "Wellness", "Retail"],
    personality: ["Friendly", "Enthusiastic", "Engaging"],
    description: "Warm, engaging voice with British accent perfect for customer service",
    sampleText: "Hi there! This is Sarah calling with some exciting news about your account."
  },
  {
    id: "FGY2WhTYpPnrIDTdsKH5",
    name: "Laura",
    gender: "Female",
    accent: "American",
    age: "35s",
    industry: ["Healthcare", "Non-profit", "Government"],
    personality: ["Caring", "Professional", "Reassuring"],
    description: "Compassionate, professional voice ideal for sensitive conversations",
    sampleText: "Hello, this is Laura. I'm reaching out to discuss how we can support your needs."
  },
  {
    id: "IKne3meq5aSn9XLyUdCD",
    name: "Charlie",
    gender: "Male",
    accent: "American",
    age: "25s",
    industry: ["Technology", "Startups", "Digital Marketing"],
    personality: ["Energetic", "Modern", "Innovative"],
    description: "Young, energetic voice perfect for tech and startup outreach",
    sampleText: "Hey! This is Charlie from the future of digital solutions. Got a minute?"
  },
  // New diverse voices
  {
    id: "diverse_voice_1",
    name: "Maria",
    gender: "Female",
    accent: "Spanish",
    age: "30s",
    industry: ["Healthcare", "Education", "Community Services"],
    personality: ["Warm", "Bilingual", "Cultural"],
    description: "Bilingual Spanish-English voice perfect for diverse communities",
    sampleText: "Hola, this is Maria calling about an important opportunity for your family."
  },
  {
    id: "diverse_voice_2",
    name: "James",
    gender: "Male",
    accent: "Southern American",
    age: "45s",
    industry: ["Agriculture", "Construction", "Small Business"],
    personality: ["Trustworthy", "Down-to-earth", "Genuine"],
    description: "Authentic Southern voice that connects with rural and small-town communities",
    sampleText: "Good afternoon, this is James. I'm calling to talk about something that could really help your business."
  },
  {
    id: "diverse_voice_3",
    name: "Aisha",
    gender: "Female",
    accent: "African American",
    age: "28s",
    industry: ["Social Services", "Education", "Community Outreach"],
    personality: ["Empowering", "Authentic", "Community-focused"],
    description: "Strong, authentic voice that resonates with diverse urban communities",
    sampleText: "Hello, this is Aisha calling about a program that's making a real difference in our community."
  },
  {
    id: "diverse_voice_4",
    name: "David",
    gender: "Male",
    accent: "New York",
    age: "38s",
    industry: ["Finance", "Real Estate", "Business Services"],
    personality: ["Direct", "Fast-paced", "Results-oriented"],
    description: "Fast-paced New York voice perfect for high-energy sales environments",
    sampleText: "David here. I've got something that's going to save you time and money. Interested?"
  },
  {
    id: "diverse_voice_5",
    name: "Emily",
    gender: "Female",
    accent: "Canadian",
    age: "32s",
    industry: ["Healthcare", "Government", "Customer Service"],
    personality: ["Polite", "Professional", "Helpful"],
    description: "Polite Canadian voice with excellent clarity for customer-focused roles",
    sampleText: "Hi there, this is Emily calling to help you with an important update about your service."
  }
];

interface ExpandedVoiceLibraryProps {
  selectedVoice?: string;
  onVoiceSelect: (voiceId: string) => void;
  showTestingFeatures?: boolean;
}

const ExpandedVoiceLibrary = ({ 
  selectedVoice, 
  onVoiceSelect, 
  showTestingFeatures = true 
}: ExpandedVoiceLibraryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genderFilter, setGenderFilter] = useState("all");
  const [industryFilter, setIndustryFilter] = useState("all");
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const filteredVoices = EXPANDED_VOICE_LIBRARY.filter(voice => {
    const matchesSearch = voice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voice.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         voice.accent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGender = genderFilter === "all" || voice.gender.toLowerCase() === genderFilter;
    const matchesIndustry = industryFilter === "all" || voice.industry.includes(industryFilter);
    
    return matchesSearch && matchesGender && matchesIndustry;
  });

  const handlePlaySample = (voiceId: string) => {
    if (playingVoice === voiceId) {
      setPlayingVoice(null);
      toast({
        title: "Sample Stopped",
        description: "Voice sample playback stopped.",
      });
    } else {
      setPlayingVoice(voiceId);
      toast({
        title: "Playing Sample",
        description: "Voice sample is now playing.",
      });
      // Simulate audio ending after 3 seconds
      setTimeout(() => setPlayingVoice(null), 3000);
    }
  };

  const uniqueIndustries = Array.from(
    new Set(EXPANDED_VOICE_LIBRARY.flatMap(voice => voice.industry))
  ).sort();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-blue-600" />
            Voice Library
          </CardTitle>
          <CardDescription>
            Choose from our diverse collection of professional voices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Search Voices</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name, accent, or description"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={genderFilter} onValueChange={setGenderFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All genders" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genders</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Industry</Label>
              <Select value={industryFilter} onValueChange={setIndustryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  {uniqueIndustries.map(industry => (
                    <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Voice Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredVoices.map((voice) => (
              <Card 
                key={voice.id} 
                className={`cursor-pointer transition-all ${
                  selectedVoice === voice.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'hover:shadow-md'
                }`}
                onClick={() => onVoiceSelect(voice.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-lg">{voice.name}</h4>
                      <p className="text-sm text-gray-600">{voice.accent} • {voice.age}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{voice.gender}</Badge>
                      {selectedVoice === voice.id && (
                        <Badge className="bg-blue-600">Selected</Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3">{voice.description}</p>

                  <div className="space-y-2 mb-3">
                    <div>
                      <span className="text-xs font-medium text-gray-500">Industries:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {voice.industry.slice(0, 2).map(industry => (
                          <Badge key={industry} variant="secondary" className="text-xs">
                            {industry}
                          </Badge>
                        ))}
                        {voice.industry.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{voice.industry.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-xs font-medium text-gray-500">Personality:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {voice.personality.map(trait => (
                          <Badge key={trait} variant="outline" className="text-xs">
                            {trait}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {showTestingFeatures && (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-600 italic">"{voice.sampleText}"</p>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlaySample(voice.id);
                        }}
                        className="w-full flex items-center gap-2"
                      >
                        {playingVoice === voice.id ? (
                          <>
                            <Pause className="h-4 w-4" />
                            Stop Sample
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4" />
                            Play Sample
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredVoices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Filter className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No voices match your current filters.</p>
              <p className="text-sm">Try adjusting your search criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpandedVoiceLibrary;
