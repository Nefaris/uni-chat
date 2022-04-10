export interface Message {
  id: string;
  content: string;
  timestamp: number;
  user: {
    id: number;
    username: string;
  };
}
