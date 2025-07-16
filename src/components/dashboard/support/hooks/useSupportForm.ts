
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { SupportFormData } from "../types/supportTypes";
import { validateFile } from "../utils/supportUtils";
import ApiService from "@/context/services/apiService";

export const useSupportForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
    trigger
  } = useForm<SupportFormData>();

  const priority = watch("priority");

  const onSubmit = async (data: SupportFormData) => {
    setIsSubmitting(true);

    // Simulate API call
    try {
      await ApiService.post('/support', { title: data.title, content: data.description, category: data.category, priority: data.priority })

      setIsSubmitted(true);
      reset();
      setSelectedFile(null);

      toast({
        title: "Support Request Submitted",
        description: "Thank you for your feedback! Our team will review your request and get back to you soon.",
      });

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validation = validateFile(file);

      if (!validation.isValid) {
        toast({
          title: validation.error?.includes("size") ? "File too large" : "Invalid file type",
          description: validation.error,
          variant: "destructive",
        });
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleCategoryChange = (value: string) => {
    setValue("category", value);
    trigger("category");
  };

  const handlePriorityChange = (value: string) => {
    setValue("priority", value);
    trigger("priority");
  };

  const resetForm = () => {
    setIsSubmitted(false);
  };

  // Register form validation rules
  const categoryRegister = register("category", { required: "Please select an issue category" });
  const priorityRegister = register("priority", { required: "Please select a priority level" });

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    isSubmitted,
    selectedFile,
    priority,
    onSubmit,
    handleFileChange,
    handleCategoryChange,
    handlePriorityChange,
    resetForm,
    categoryRegister,
    priorityRegister
  };
};
