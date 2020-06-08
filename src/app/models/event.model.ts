import { Fee } from './fee.model';


export class Event {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  fees: Fee[];
  userId: number;
  date: string;
  lowestPrice: number;
  username: string;

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

  getCheapestPrice(): number {
    let min = Number.MAX_SAFE_INTEGER;
    this.fees.forEach(fee => {
      if (fee.price < min) {
        min = fee.price;
      }
    })
    return min;
  }

}


export function getCheapestPrice(event: Event): number {
  let min = Number.MAX_SAFE_INTEGER;
  event.fees.forEach(fee => {
    if (fee.price < min) {
      min = fee.price;
    }
  })
  return min;
}

export function getHighestPrice(event: Event): number {
  let max = 0;
  event.fees.forEach(fee => {
    if (fee.price > max) {
      max = fee.price;
    }
  })
  return max;
}
