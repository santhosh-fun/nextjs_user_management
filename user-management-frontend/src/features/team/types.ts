// Define types for the props and team data
export default interface Organization {
  id: number;
  name: string;
}

export default interface TeamData {
  name: string;
  description: string;
  organizationId: string;
}
