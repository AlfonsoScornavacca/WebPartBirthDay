import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IBirthdayProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
  webURL: string;
}
export interface IBirthdayProps {
  description: string;
  webURL:string;
}