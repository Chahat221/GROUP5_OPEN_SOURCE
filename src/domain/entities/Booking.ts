export interface Booking {
  id: string;
  userId: string;
  service: string;
  date: string;
  startTime: string;
  endTime: string;
  status: "pending" | "approved" | "rejected";
}