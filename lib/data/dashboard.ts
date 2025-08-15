export interface KPI {
  title: string;
  value: string;
  delta: string;
  type: string;
  subtitle: string;
}

export interface TeamMember {
  name: string;
  avatar: string;
  email: string;
  role: string;
  dept: string;
  status: string;
}

export const kpis: KPI[] = [
  { title: "Payrolls Cost", value: "$120,400", delta: "+4.2%", type: "positive", subtitle: "This month" },
  { title: "Total Expense", value: "$550,800", delta: "-1.8%", type: "negative", subtitle: "All departments" },
  { title: "Active Projects", value: "21", delta: "+3", type: "positive", subtitle: "Currently running" },
  { title: "Team Members", value: "132", delta: "+6", type: "positive", subtitle: "Total employees" },
];

export const salesData = [
  { month: "Jan", sales: 4200 },
  { month: "Feb", sales: 3800 },
  { month: "Mar", sales: 5100 },
  { month: "Apr", sales: 4600 },
  { month: "May", sales: 5800 },
  { month: "Jun", sales: 6200 },
];

export const teamDirectory: TeamMember[] = [
  { name: "Alice Johnson", avatar: "A", email: "alice@novacrm.com", role: "Project Manager", dept: "Projects", status: "Active" },
  { name: "Bob Lee", avatar: "B", email: "bob@novacrm.com", role: "Developer", dept: "Engineering", status: "Active" },
  { name: "Carla Diaz", avatar: "C", email: "carla@novacrm.com", role: "Designer", dept: "Product", status: "On Leave" },
  { name: "David Kim", avatar: "D", email: "david@novacrm.com", role: "HR Lead", dept: "People", status: "Active" },
];