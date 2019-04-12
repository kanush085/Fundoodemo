import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router'
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpService } from "../../service/http/http.service"
import { UserService } from "../../service/userservice/userservices.service";
import { MatSnackBar } from '@angular/material';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));

  }
}

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  constructor(private httpService: HttpService, private router: Router, public userService: UserService, private snackBar: MatSnackBar, ) { }

  ngOnInit() {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email])

  login() {
    try {
      var model = {
        email: this.emailFormControl.value
      }
      console.log(model);
      this.userService.forgotPassword(model).subscribe(data => {
        console.log(data);
        this.snackBar.open("ResetLink sent to mail is successfull..!", "ok", { duration: 5000 })
         this.router.navigate(['login'])
      }, err => {
        console.log('error',err);
        this.snackBar.open("ResetLink sent to mail is unsuccessfull..!", "ok", { duration: 5000 })
      })

    } catch (error) {
      console.log(error);
    }
  }
  signin(){
    this.router.navigate(['login'])
  }
  matcher = new MyErrorStateMatcher();
}
