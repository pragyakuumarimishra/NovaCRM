export interface Project {
  name: string;
  description: string;
  status: string;
  priority: string;
  progress: number;
  due: string;
  spend: number;
  budget: number;
  team: string[];
}

export const projects: Project[] = [
  {
    name: "Website Redesign",
    description: "Revamping corporate presence",
    status: "Active",
    priority: "High",
    progress: 68,
    due: "2025-09-10",
    spend: 42000,
    budget: 60000,
    team: ["A", "B", "C", "D"],
  },
  {
    name: "Mobile App MVP",
    description: "Initial MVP for iOS/Android",
    status: "On Hold",
    priority: "Medium",
    progress: 35,
    due: "2025-11-02",
    spend: 18000,
    budget: 50000,
    team: ["E", "F", "G"],
  },
  {
    name: "Data Migration",
    description: "Legacy system to cloud provider",
    status: "Active",
    priority: "High",
    progress: 82,
    due: "2025-08-30",
    spend: 51000,
    budget: 70000,
    team: ["H", "I", "J", "K", "L"],
  },
  {
    name: "Marketing Automation",
    description: "Integrate new automation flows",
    status: "Completed",
    priority: "Low",
    progress: 100,
    due: "2024-12-15",
    spend: 28000,
    budget: 35000,
    team: ["M", "N"],
  },
];