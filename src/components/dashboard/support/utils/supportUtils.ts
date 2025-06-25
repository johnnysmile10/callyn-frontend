
export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'critical': return 'text-red-600';
    case 'high': return 'text-orange-600';
    case 'medium': return 'text-yellow-600';
    case 'low': return 'text-green-600';
    default: return 'text-gray-600';
  }
};

export const validateFile = (file: File) => {
  // Check file size (5MB limit)
  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: "Please select a file smaller than 5MB." };
  }
  
  // Check file type
  if (!file.type.startsWith('image/')) {
    return { isValid: false, error: "Please select an image file (PNG, JPG, etc.)." };
  }
  
  return { isValid: true, error: null };
};
