import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private service: HttpService) { }

  login(body: any) {
    return this.service.postUser(body, "login");
  }

  register(body:any){
    return this.service.postUser(body,"register")
  }
  forgotPassword(body:any){
    return this.service.postUser(body,"forgotpassword")
  }
  // resetpassword(body:any){
  //   return this.service.postUser(body,"resetpassword")
  // }
}
