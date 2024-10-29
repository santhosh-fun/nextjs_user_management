import { IconType } from "react-icons";

export interface ManagementCard {
  title: string;
  description: string;
  iconUrl: string;
  route: string;
  fallbackIcon: IconType;
}
