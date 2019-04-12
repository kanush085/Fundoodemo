import { Component, OnInit } from '@angular/core';
import { NoteService } from "../../service/noteservice/note.service"
@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {


  card: any = []
  archivedCard = []
  archive = []
  more = 'archive'
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    // this.getArchivedCards()
  }

  layout='row wrap'
  // getArchivedCards() {
  //   this.noteService.getNote().subscribe((data) => {
  //     this.card = data['data']
  //    
  //     for (let i = 0; i < this.card.length; i++) {
  //       if (this.card[i].archive) {
  //         console.log("Entered");
  //         this.archivedCard.push(this.card[i])
  //         console.log("archivedcard notes", this.archivedCard);
  //       }
  //     }
  //   }), err => {
  //     console.log(err)
  //   }
  // }
}
