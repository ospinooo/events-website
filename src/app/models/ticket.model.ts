import { Fee } from './fee.model';

export interface Ticket {
  id: number;
  fee: Fee;
  confirmed: boolean;
  userId: number;
  assistantName: string;
  assistantId: string;
}
