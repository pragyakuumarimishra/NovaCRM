export interface Employee {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  role: string;
  dept: string;
  status: string;
  joined: string;
  salary: number;
}

export const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Alice Johnson",
    avatar: "A",
    email: "alice@novacrm.com",
    phone: "+1 555 300 0101",
    role: "Project Manager",
    dept: "Projects",
    status: "Active",
    joined: "2023-05-14",
    salary: 92000,
  },
  {
    id: "EMP-002",
    name: "Bob Lee",
    avatar: "B",
    email: "bob@novacrm.com",
    phone: "+1 555 300 0102",
    role: "Developer",
    dept: "Engineering",
    status: "Active",
    joined: "2022-11-10",
    salary: 105000,
  },
  {
    id: "EMP-003",
    name: "Carla Diaz",
    avatar: "C",
    email: "carla@novacrm.com",
    phone: "+1 555 300 0103",
    role: "Designer",
    dept: "Product",
    status: "On Leave",
    joined: "2024-02-22",
    salary: 78000,
  },
  {
    id: "EMP-004",
    name: "David Kim",
    avatar: "D",
    email: "david@novacrm.com",
    phone: "+1 555 300 0104",
    role: "HR Lead",
    dept: "People",
    status: "Active",
    joined: "2023-08-01",
    salary: 89000,
  },
  {
    id: "EMP-005",
    name: "Eva Chen",
    avatar: "E",
    email: "eva@novacrm.com",
    phone: "+1 555 300 0105",
    role: "Data Analyst",
    dept: "Data",
    status: "Active",
    joined: "2024-01-15",
    salary: 82000,
  }
];