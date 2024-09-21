import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppService{    
    readonly getUserURL = `${environment.apiUrl}getUsers`;
    constructor(private http: HttpClient) {

    }

    getUserByLoggedInId(userId: string) {
        let userLogged = {loggedInUser: userId}
       return this.http.post(this.getUserURL, userLogged, {observe: 'response'});
    }

    getUserDetails() {
        let loggedInUserDetails: any = sessionStorage.getItem('loggedInUser');
        let loggedInUser = JSON.parse(loggedInUserDetails);
        return loggedInUser
    }
}