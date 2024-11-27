export interface ReportFile {
    id: string;
    filename: string;
    path: string;
    createdAt: Date;
}

export interface Report {
  id: string;
  senderName: string;
  senderAge: number;
  message: string;
  institutionId: string;
  files: ReportFile[];
  createdAt: Date;
  updatedAt: Date;
}
