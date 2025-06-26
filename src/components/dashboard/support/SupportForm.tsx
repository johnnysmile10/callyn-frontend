
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HeadphonesIcon, Upload, CheckCircle, AlertCircle } from "lucide-react";
import { useSupportForm } from "./hooks/useSupportForm";
import { getPriorityColor } from "./utils/supportUtils";
import SupportHeader from "./SupportHeader";

const SupportForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    selectedFile,
    priority,
    onSubmit,
    handleFileChange,
    handleCategoryChange,
    handlePriorityChange
  } = useSupportForm();

  return (
    <div className="space-y-6">
      <SupportHeader />

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Need help? Report bugs, request features, or share feedback with our development team.
          We typically respond within 24 hours.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HeadphonesIcon className="h-5 w-5 text-blue-600" />
            Submit a Support Request
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <Label htmlFor="title">Issue Title *</Label>
              <Input
                id="title"
                placeholder="Brief description of your issue or request"
                {...register("title", { 
                  required: "Please provide a title for your request" 
                })}
                className={errors.title ? "border-red-500" : ""}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            {/* Issue Category Field */}
            <div className="space-y-2">
              <Label htmlFor="category">Issue Category *</Label>
              <Select onValueChange={handleCategoryChange}>
                <SelectTrigger className={errors.category ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select issue category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bug-report">Bug Report</SelectItem>
                  <SelectItem value="feature-request">Feature Request</SelectItem>
                  <SelectItem value="technical-support">Technical Support</SelectItem>
                  <SelectItem value="account-billing">Account & Billing</SelectItem>
                  <SelectItem value="general-inquiry">General Inquiry</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Please describe your issue in detail. Include steps to reproduce if reporting a bug, or specific requirements if requesting a feature."
                rows={6}
                {...register("description", { 
                  required: "Please provide a detailed description",
                  minLength: { value: 20, message: "Please provide at least 20 characters" }
                })}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Priority Field */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority *</Label>
              <Select onValueChange={handlePriorityChange}>
                <SelectTrigger className={errors.priority ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      Low - General question or minor issue
                    </span>
                  </SelectItem>
                  <SelectItem value="medium">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Medium - Feature request or moderate issue
                    </span>
                  </SelectItem>
                  <SelectItem value="high">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      High - Important bug or urgent request
                    </span>
                  </SelectItem>
                  <SelectItem value="critical">
                    <span className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      Critical - System down or blocking issue
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-sm text-red-500">{errors.priority.message}</p>
              )}
              {priority && (
                <p className={`text-sm ${getPriorityColor(priority)}`}>
                  Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </p>
              )}
            </div>

            {/* Screenshot Upload */}
            <div className="space-y-2">
              <Label htmlFor="screenshot">Screenshot (Optional)</Label>
              <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400 transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Upload className="h-8 w-8 text-gray-400" />
                  <div className="text-center">
                    <p className="text-sm text-gray-600">
                      {selectedFile ? selectedFile.name : "Click to upload a screenshot"}
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
              {selectedFile && (
                <div className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  File selected: {selectedFile.name}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="min-w-[140px] bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Request"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportForm;
