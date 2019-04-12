import { Component, OnInit } from '@angular/core';
import{Router}from '@angular/router'
import { FormControl,FormGroupDirective, NgForm, Validators  } from '@angular/forms';
import{ErrorStateMatcher}from'@angular/material/core';
import { MatSnackBar } from '@angular/material';
import{HttpService} from "../../service/http/http.service"
 import{UserService} from "../../service/userservice/userservices.service"

export class MyErrorStateMatcher implements  ErrorStateMatcher{
  isErrorState(control :FormControl |null,form:FormGroupDirective|NgForm|null):boolean{
    const isSubmitted=form&&form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched|| isSubmitted));

  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private snackBar: MatSnackBar,public userService:UserService) { }
message='';
  ngOnInit() {
  }
  hide=true;
  firstname=new FormControl('',[Validators.required])
  lastname=new FormControl('',[Validators.required])
  emailFormControl=new FormControl('',[Validators.required,Validators.email]);
   password=new FormControl('',[Validators.required])
   confirmpassword=new FormControl('',[Validators.required])

   register(){
    try {
    
    var model={
      firstname:this.firstname.value,
      lastname:this.lastname.value,
      email:this.emailFormControl.value,
      password:this.password.value,
      confirmpassword:this.confirmpassword.value
    }
    console.log("-----------------",model);
    if (this.password.value !=this.confirmpassword.value){
       this.message = "Password did not match..!"
      console.log(this.message)
    }
    else{ 
    this.userService.register(model).subscribe(data=>{
      console.log("----In subscribe----",data);
      this.snackBar.open("Registration Successfull....!","ok",{duration:5000});
      this.router.navigate(['login'])
    },err=>{
      console.log("Err",err);
      this.snackBar.open("Registration Failed...!","ok",{duration:5000});
    } )
    
  }
    } catch (error) {
      console.log(error);
      
    }
  }
  login(){
    this.router.navigate(['login']);
  }
   matcher = new MyErrorStateMatcher();
}
