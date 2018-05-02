import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class UserService {
    private Root_Url = "https://bdbusticket.firebaseio.com/"
    constructor(
        private http:HttpClient
    ){}

    createUser(user){
      return   this.http.post(this.Root_Url+'users.json',user)
    }
}