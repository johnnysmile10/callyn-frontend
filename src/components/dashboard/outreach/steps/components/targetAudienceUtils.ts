
export const renderTargetAudience = (audience: any): string => {
  if (typeof audience === 'string') {
    return audience;
  }
  if (audience && typeof audience === 'object') {
    // Handle new simplified structure
    if (audience.description) {
      return audience.description;
    }
    // Legacy support for old structure
    const parts = [];
    if (audience.industry?.length) parts.push(`${audience.industry.join(', ')} industry`);
    if (audience.jobTitles?.length) parts.push(`${audience.jobTitles.join(', ')} roles`);
    if (audience.companySize?.length) parts.push(`${audience.companySize.join(', ')} companies`);
    return parts.length > 0 ? parts.join(', ') : 'General business audience';
  }
  return "Business owners in tech industry";
};
