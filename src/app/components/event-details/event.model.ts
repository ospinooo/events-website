export class Event {
  id: number;
  title: string;
  description: string;

  constructor(title: string, description: string, id: number) {
    this.id = id;
    this.title = title;
    this.description = description;
  }
}
