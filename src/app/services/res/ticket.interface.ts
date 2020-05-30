import { Ticket } from 'src/app/models/ticket.model';
import { Pageable, Sort2 } from './events.interface';

export interface PageableTicket {
  content: Ticket[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  size: number;
  number: number;
  first: boolean;
  numberOfElements: number;
  sort: Sort2;
  empty: boolean;
}

