
export class FeeCreate {
  price: number;
  title: string;
  description: string;

  constructor(price: number, title: string, description: string) {
    this.price = price;
    this.title = title;
    this.description = description;
  }
}


export class EventCreate {
  title: string;
  subtitle: string;
  description: string;
  fees: FeeCreate[];
  date: string;

  constructor(title: string, subtitle: string, description: string, fees: FeeCreate[], date: string) {
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.fees = fees;
    this.date = date;
  }
}


