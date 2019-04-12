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
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  message = ''
  constructor(private httpService: HttpService, private router: Router, private snackBar: MatSnackBar, public userService: UserService) { }

  ngOnInit() {
  }
  password = new FormControl('', [Validators.required])
  confirmpassword = new FormControl('', [Validators.required])


  login() {
    try {
      var model = {
        password: this.password.value,
        confirmpassword: this.confirmpassword.value
      }

      if (this.password.value != this.confirmpassword.value) {
        this.message = "Password did not match..!"
        console.log(this.message)
      }
      else {
        this.httpService.encodedPostForm('resetPassword/token', model).subscribe(data => {
          this.snackBar.open("Password reset was successfull..!", "ok", { duration: 5000 })

          this.router.navigate(['login'])
        }, err => {
          this.snackBar.open("Password reset was unsuccessfull..!", "ok", { duration: 5000 })
        })
      }
    } catch (error) {
      console.log(error);

    }

  }

}
