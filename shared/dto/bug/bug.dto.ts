export interface CreateBugReportDTO {
  clientId: string;
  clientSecret: string;
  email: string;
  bugReport: string;
  reproductionSteps: string;
  occuredAt: string;
  phone?: string;
  contactMe: boolean;
}