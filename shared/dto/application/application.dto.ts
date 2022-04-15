export interface CreateApplicationDTO {
  name: string;
  supportTeam: string;
}

export interface ApplicationDTO extends CreateApplicationDTO {
  id: string;
  clientSecret: string;
}

export interface RefreshApplicationSecretDTO {
  id: string;
}