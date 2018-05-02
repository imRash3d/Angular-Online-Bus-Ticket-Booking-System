import { Bus } from "./bus.model";
import { Seat } from "./seat.model";

export class Booking {
    $key:string
    location:string;
    bus:Bus;
    seat_book_User:SeatBook;
}

export interface SeatBook {
    $key:string;
    user_id:string;
    seats:Seat[];
}