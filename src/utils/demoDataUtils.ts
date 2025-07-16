
import { OutreachData } from '@/components/dashboard/outreach/types';

export const createDemoOutreachData = (): OutreachData => {
  return {
    targetAudience: {
      description: 'Small to medium-sized SaaS companies (10-200 employees) in the Technology industry, targeting CEOs, CTOs, and Founders in the United States and Canada who are looking to scale their development teams.'
    },
    leadManagement: {
      leadList: [
        {
          id: '1',
          name: 'John Smith',
          company: 'TechCorp Inc',
          email: 'john@techcorp.com',
          phone: '+1-555-0123',
          title: 'CEO',
          status: 'new'
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          company: 'InnovateLab',
          email: 'sarah@innovatelab.com',
          phone: '+1-555-0124',
          title: 'CTO',
          status: 'new'
        }
      ],
      leadSources: []
    },
    script: {
      greeting: 'Hi, this is your AI assistant calling about...',
      mainPitch: 'I wanted to discuss how our solution can help your business...',
      objectionHandling: ['I understand your concerns, let me address that...'],
      closingStatement: 'Would you be interested in scheduling a brief call to learn more?',
      tone: 'professional',
      language: 'English'
    },
    callScheduling: {
      operatingHours: {
        monday: { start: '09:00', end: '17:00', enabled: true },
        tuesday: { start: '09:00', end: '17:00', enabled: true },
        wednesday: { start: '09:00', end: '17:00', enabled: true },
        thursday: { start: '09:00', end: '17:00', enabled: true },
        friday: { start: '09:00', end: '17:00', enabled: true },
        saturday: { start: '09:00', end: '17:00', enabled: false },
        sunday: { start: '09:00', end: '17:00', enabled: false }
      },
      timezone: 'America/New_York',
      bufferTime: 5,
      retryDelay: 10,
      weekendCalling: false
    }
  };
};

export const initializeDemoData = (updateProgressState: (updates: any) => void, setOutreachData: (data: OutreachData) => void) => {
  const demoData = createDemoOutreachData();
  setOutreachData(demoData);

  // Mark progress state as having leads and campaigns
  updateProgressState({
    hasLeads: true,
    hasCampaigns: true
  });
};
