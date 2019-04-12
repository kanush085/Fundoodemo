import { Component, OnInit, Input } from '@angular/core';
import { NoteService } from "../../service/noteservice/note.service"
import{DataService} from "../../service/dataservice/data.service"
export interface DialogData {
  array: [];
}

@Component({
  selector: 'app-displaynote',
  templateUrl: './displaynote.component.html',
  styleUrls: ['./displaynote.component.scss']
})
export class DisplaynoteComponent implements OnInit {
  @Input() cards;
  @Input() archived
  @Input() more: string;
  @Input() trash
  message:string;
  view;
  grid = {
    listView: this.view,
    gridView: !this.view
  }
  constructor(private noteService: NoteService,private data: DataService) { }
  ngOnInit() {
    this.data.currentMessage.subscribe(message=>{
      console.log('message from service ',message);
      this.view=message;
      this.grid.listView=!this.view;
      this.grid.gridView=this.view; 
    })
  }

  archive(array) {
    let ind = this.cards.indexOf(array);
    this.cards.splice(ind, 1);
  }

  unarchived($event) {
    this.archive($event);
  }

  deleteForever(array) {
    this.noteService.deleteNote({
      "noteID": [array._id]
    }).subscribe(data => {
      let ind = this.cards.indexOf(array)
      this.cards.splice(ind, 1)
    })
  }
  restore(array) {
    this.noteService.trashNote({
      "trash": false,
      "noteID": [array._id]
    }).subscribe(data => {
      let ind = this.cards.indexOf(array)
      this.cards.splice(ind, 1)
    })
  }
  trashcard($event) {
    let ind = this.cards.indexOf($event)
    this.cards.splice(ind, 1)
  }



  color($event){
    
  }
}
