import { Bus } from "./bus.model";
import { Seat } from "./seat.model";
import { Journey_Route } from "./route.model";

export class Journey {
    bus:Bus;
    seats:seat[];
    fare:number;
    journey_route:Journey_Route
}

export interface seat {
    seat:string
}