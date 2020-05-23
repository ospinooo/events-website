import { Fee } from './fee.model';


export class Event {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fees: Fee[];
  userId: number;

  constructor(title: string, subtitle: string, description: string, id?: number, userId?: number, fees?: Fee[]) {
    this.id = id;
    this.subtitle = subtitle;
    this.title = title;
    this.description = description;
    this.fees = fees;
    this.userId = userId;
  }

  setFees(fees: Fee[]) {
    this.fees = fees;
  }
}
