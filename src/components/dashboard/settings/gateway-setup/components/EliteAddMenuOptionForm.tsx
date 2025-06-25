
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EliteGatewayMenuOption } from "../types/eliteGatewayTypes";
import { useEliteFormData } from "./hooks/useEliteFormData";
import EliteFormHeader from "./EliteFormHeader";
import BasicSetupTab from "./BasicSetupTab";
import LanguagesTab from "./LanguagesTab";
import VoiceTagsTab from "./VoiceTagsTab";
import AILearningTab from "./AILearningTab";
import FormActions from "./FormActions";

interface EliteAddMenuOptionFormProps {
  onAdd: (option: EliteGatewayMenuOption) => void;
  onCancel: () => void;
}

const EliteAddMenuOptionForm = ({ onAdd, onCancel }: EliteAddMenuOptionFormProps) => {
  const {
    formData,
    languages,
    voiceTags,
    updateFormField,
    addLanguage,
    updateLanguage,
    removeLanguage,
    addVoiceTag,
    updateVoiceTag,
    removeVoiceTag,
    createMenuOption,
    isFormValid
  } = useEliteFormData();

  const handleSubmit = () => {
    const newOption = createMenuOption();
    onAdd(newOption);
  };

  return (
    <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
      <EliteFormHeader />
      <CardContent className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Setup</TabsTrigger>
            <TabsTrigger value="languages">Languages</TabsTrigger>
            <TabsTrigger value="voice">Voice Tags</TabsTrigger>
            <TabsTrigger value="ai">AI Learning</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <BasicSetupTab 
              formData={formData} 
              onFieldChange={updateFormField} 
            />
          </TabsContent>

          <TabsContent value="languages" className="space-y-4">
            <LanguagesTab
              enableMultiLanguage={formData.enableMultiLanguage}
              languages={languages}
              onToggleMultiLanguage={(enabled) => updateFormField('enableMultiLanguage', enabled)}
              onAddLanguage={addLanguage}
              onUpdateLanguage={updateLanguage}
              onRemoveLanguage={removeLanguage}
            />
          </TabsContent>

          <TabsContent value="voice" className="space-y-4">
            <VoiceTagsTab
              enableVoiceTags={formData.enableVoiceTags}
              voiceTags={voiceTags}
              onToggleVoiceTags={(enabled) => updateFormField('enableVoiceTags', enabled)}
              onAddVoiceTag={addVoiceTag}
              onUpdateVoiceTag={updateVoiceTag}
              onRemoveVoiceTag={removeVoiceTag}
            />
          </TabsContent>

          <TabsContent value="ai" className="space-y-4">
            <AILearningTab
              enableAILearning={formData.enableAILearning}
              onToggleAILearning={(enabled) => updateFormField('enableAILearning', enabled)}
            />
          </TabsContent>
        </Tabs>

        <FormActions
          onSubmit={handleSubmit}
          onCancel={onCancel}
          isFormValid={isFormValid}
        />
      </CardContent>
    </Card>
  );
};

export default EliteAddMenuOptionForm;
