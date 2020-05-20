export class Fee {
  id: number;
  price: number;
  title: string;
  description: string;
  eventId: number;

  constructor(price: number, title: string, description: string) {
    this.price = price;
    this.title = title;
    this.description = description;
  }
}
