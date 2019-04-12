import { Component, OnInit } from '@angular/core';
import { NoteService } from "../../service/noteservice/note.service"
@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {


  card: any = []
  trashedCard = []
  trash = []
  more = 'trash'
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    // this.getTrashedCards()
  }

  layout ='row wrap'

  // getTrashedCards() {
  //   this.noteService.getNote().subscribe((data) => {
  //     this.card = data['data']
  //     for (let i = 0; i < this.card.length; i++) {
  //       if (this.card[i].trash) {
  //         console.log(" trash Entered");
  //         this.trashedCard.push(this.card[i])
  //         console.log("trashed notes", this.trashedCard);
  //       }

  //     }
  //   })

  // }
}
