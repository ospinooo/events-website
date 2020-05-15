import { Fee } from './fee.model';


export class Event {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fees: Fee[];
  userId: number;

  constructor(title: string, description: string, id: number) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
