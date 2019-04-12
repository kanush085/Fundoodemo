import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from "../../service/http/http.service";
import { FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";

@Component({
  selector: 'app-takenote',
  templateUrl: './takenote.component.html',
  styleUrls: ['./takenote.component.scss']
})
export class TakenoteComponent implements OnInit {
  isArchive: boolean = false
  flag = true;
  reqbody: any
  bgcolor: any = "#FFFFFF";
  constructor(private httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
  @Output() addingNote = new EventEmitter()
  noteTitle = new FormControl("", [Validators.required, Validators.required]);
  noteContent = new FormControl("", [Validators.required, Validators.required]);



  addNote() {
    this.flag = !this.flag;
    if ((this.noteTitle.value == null || this.noteTitle.value == '') && (this.noteContent.value == null || this.noteContent.value == '')) {
      this.bgcolor="#FFFFFF"
      return
    }
    else {
      this.reqbody = {
        userId: localStorage.getItem('userid'),
        title: this.noteTitle.value,
        description: this.noteContent.value,
        reminder: "",
        pinned: false,
        archive: this.isArchive,
        color: this.bgcolor,
        trash: false,
        image: ""

      };
      this.httpService.postJSON("createNote", this.reqbody).subscribe(data => {
        console.log(data);
        this.addingNote.emit(data['message'])
        this.noteTitle.reset()
        this.noteContent.reset()
        this.bgcolor="#FFFFFF"
      }),
        err => {
          console.log(err);
        };
    }
  }
  archive($event) {
    this.isArchive = $event
    this.addNote()
  }
  reverseFlag() {
    this.flag = !this.flag;
  }
  changeColor($event) {
    this.bgcolor = $event
  }
}

