import { date2Str } from "@/lib/utils";

type CampaignStatus = 'scheduled' | 'in-progress' | 'ended';
type CampaignEndedReason = 'campaign.scheduled.ended-by-user'
    | 'campaign.in-progress.ended-by-user'
    | 'campaign.ended.success';

function getStatus(status: CampaignStatus, reason: CampaignEndedReason) {
    switch (status) {
        case 'scheduled':
        case 'in-progress':
            return 'active';
        case 'ended':
            return reason === 'campaign.ended.success' ? 'completed' : 'paused';
        default:
            return 'active';
    }
}

export function mapApiCampaignToCampaign({ leadCount, totalLead }) {
    return function (data: any) {
        return {
            id: data.id,
            name: data.name,
            status: getStatus(data.status, data.endedReason),
            leadList: data.customers.length,
            totalLeads: totalLead,
            contacted: data.callsCounterEnded,
            progress: Math.floor(data.callsCounterEnded / data.customers.length * 100),
            startDate: date2Str(new Date(data.timestamp)),
            updateDate: data.updatedAt,
            callsPerHour: 0,
            agent: data.assistant.name,
            outcomes: {
                interested: 0,
                notInterested: 0,
                callbacks: 0,
                noAnswer: 0
            }
        }
    }
}