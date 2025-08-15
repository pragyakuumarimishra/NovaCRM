export interface Candidate {
  name: string;
  score: number;
  stage: string;
  status: string;
}

export interface JobOpening {
  title: string;
  status: string;
  department: string;
  applicants: number;
}

export const jobOpenings: JobOpening[] = [
  { title: "Senior Frontend Engineer", status: "Open", department: "Engineering", applicants: 24 },
  { title: "Product Designer", status: "Open", department: "Product", applicants: 15 },
  { title: "Data Analyst", status: "Closed", department: "Data", applicants: 32 },
  { title: "HR Generalist", status: "Open", department: "People", applicants: 9 },
];

export const candidates: Candidate[] = [
  { name: "Anna Smith", score: 92, stage: "Offer", status: "Offer" },
  { name: "Brian Lee", score: 81, stage: "Interview", status: "Interview" },
  { name: "Carol Zhang", score: 75, stage: "Review", status: "Review" },
  { name: "David Brown", score: 88, stage: "Interview", status: "Interview" },
  { name: "Emma Wilson", score: 67, stage: "Initial", status: "Initial" },
];