export class AppBaseModel {
    getUserName(): string {
        let loggedInUserDetails: any = sessionStorage.getItem('loggedInUser');
        let userName = JSON.parse(loggedInUserDetails).fullName;
        return userName;
    }
    constructor(
        public loggedInUserId?: string
    ) {
        this.loggedInUserId = this.getUserName();
    }
}