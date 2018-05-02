import { Injectable } from "@angular/core";
import { Journey } from "../models/journey.model";
import { HttpClient } from "@angular/common/http";
import { UserService } from "./user.service";
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class BookingService {

    journey_info= new BehaviorSubject('')
    cast= this.journey_info.asObservable();
    private USerId;
    private Root_Url = "https://bdbusticket.firebaseio.com/"
    constructor(
        private http: HttpClient,
        private UserService: UserService,
        private router: Router
    ) { }

    // userBooking(jourey:Journey) {
    //     this.http.post(this.Root_Url+'user_booking',jourey)
    // }

    async seatBooking(jourey: Journey, user) {
        let busID = jourey.bus.$key;
        let booking = new Object()
        let key = new Date(jourey.journey_route.date).getTime();
        await this.createUserID(user).subscribe(
            res => {
                booking = {
                    user_id: Object.values(res)[0],
                    seats: jourey.seats
                }
                this.chekBookingDate_BusInfo(key, jourey, booking, busID)
            });

    }





    private async createBookingDate(journey: Journey, key, booking, busID) {

        await this.create(journey, key, busID, booking)
        // await this.createBooking(booking, key,busID)

    }

    private async  create(journey: Journey, key, busID, booking) {
        let location = journey.journey_route.leaving_form + ' to ' + journey.journey_route.going_to;
        this.http.put(this.Root_Url + 'booking/' + key + '/' + busID + '.json', {

            bus: {
                location: location,
                name: journey.bus.name,
                coach_type: journey.bus.coach_type,
                nfareame: journey.bus.fare,
                time: journey.bus.time,
                seat: journey.bus.seat
            }
        })
            .subscribe(res => {
                this.createBooking(booking, key, busID);
            },
                error => console.log(error))
    }

    private CheckBusID(busID, key, booking, journey) {
        let busidArray = [];
        this.http.get(this.Root_Url + 'booking/' + key + '.json')
            .subscribe(res => {
                for (let key in res) {
                    busidArray.push(key)
                }
                if (busidArray.indexOf(String(busID)) > -1) {
                    this.createBooking(booking, key, busID);
                }
                else {
                    this.create(journey, key, busID, booking);
                }
            });
    }

    private async chekBookingDate_BusInfo(key, journey, booking, busID) {

        let keys = [];
        this.http.get(this.Root_Url + 'booking.json')
            .subscribe(
                res => {
                    for (let key in res) {
                        keys.push(key)
                    }
                    if (keys.indexOf(String(key)) > -1) {
                        this.CheckBusID(busID, key, booking, journey)
                    }
                    else {
                        this.createBookingDate(journey, key, booking, busID);
                    }
                }
            );
    }

    private createBooking(booking, key, busID) {
let tketID;
        this.http.post(this.Root_Url + 'booking/' + key + '/' + busID + '/seat_booking.json', booking)
            .subscribe(res => {
                for(let key in res){
                    tketID= res[key]
                }
                this.createPrintView(tketID);
            },
                err => console.log(err));

       
    }

    private createUserID(user) {
        localStorage.setItem("user",JSON.stringify(user))
        return this.UserService.createUser(user)

    }


    createPrintView (tketID){
        
        let journey= JSON.parse(localStorage.getItem("journey"));
        let user= JSON.parse(localStorage.getItem("user"));
        let Ticket= {
            ticketId:tketID,
            journey:journey,
            user:user
        }
        this.getJourneyInfo(Ticket);
        this.router.navigate(['print']);
    }

    getJourneyInfo(Ticket){
        this.journey_info.next(Ticket);
        localStorage.removeItem("journey");
        localStorage.removeItem("route");
        localStorage.removeItem("user");
    }


}



