import { Component, OnInit, EventEmitter, Output, Input,ViewEncapsulation } from '@angular/core';
import { NoteService } from 'src/app/service/noteservice/note.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-iconlist',
  templateUrl: './iconlist.component.html',
  styleUrls: ['./iconlist.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class IconlistComponent implements OnInit {
  @Input() doarchive: boolean;
  @Input() more;
  @Input() card: any


  @Output() color = new EventEmitter();
  @Output() archivedCard = new EventEmitter()
  @Output() unarchiveCard = new EventEmitter();
  @Output() trashCard = new EventEmitter();
  @Output() archivednoteCard = new EventEmitter();
  constructor(private noteService: NoteService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  doArchive(card) {
    // console.log(this.card, "cardddd")
    // console.log(card._id, "cardidddddddddd")
    if (card == undefined) {
      this.archivednoteCard.emit(true)
    }
    else {
      this.noteService.archiveNote({
        "archive": true,
        "noteID": [card._id]
      }).subscribe(data => {
        console.log(data, "archive data")
        this.cardArchive(card)
        this.snackBar.open("Note Archived", "Undo", { duration: 5000 })
      }), err => console.log(err)

    }
  }

  cardArchive(card) {
    this.archivedCard.emit(card)
  }
  doUnArchive(card) {
    this.noteService.archiveNote({
      "archive": false,
      "noteID": [card._id]
    }).subscribe(data => {
      this.notArchive(card)
    }), err => console.log(err)
  }
  notArchive(card) {
    this.unarchiveCard.emit(card)
  }

  deleteNote(card) {
    this.noteService.trashNote({
      "trash": true,
      "noteID": [card._id]
    }).subscribe(data => {
      console.log(data, "Delete data");
      this.deletCard(card)
      this.snackBar.open("Note Trashed", "Undo", { duration: 5000 })
    }), err => console.log(err);

  }

  deletCard(card) {
    this.trashCard.emit(card)
  }



  colorArray = [
    [
      { 'color': '#FFFFFF', 'name': 'White' },
      { 'color': '#E57373', 'name': 'Red' },
      { 'color': '#FBBC04', 'name': 'Orange' },
      { 'color': '#FFEB3B', 'name': 'Yellow' }],

    [
      { 'color': '#CCFF90', 'name': 'Green' },
      { 'color': '#84FFFF', 'name': 'Teal' },
      { 'color': '#B3E5FC', 'name': 'Blue' },
      { 'color': '#82B1FF', 'name': 'Darkblue' }],

    [
      { 'color': '#B388FF', 'name': 'Purple' },
      { 'color': '#E1BEE7', 'name': 'Pink' },
      { 'color': '#A1887F', 'name': 'Brown' },
      { 'color': '#E8EAED', 'name': 'Gray' }
    ]
  ]

  colorsEdit(color, card) {
    if (card == undefined) {
      this.color.emit(color)
    } else {
      card.color = color;
      this.updateColor(color, card)
    }
  }
  updateColor(color, card) {
    console.log("card......",card);
    console.log("color",card.color);
    this.noteService.updateColor({
      "color": color,
      "noteID": card._id
    }).subscribe(data => {
      console.log(data, "update color data")
    }), err => console.log(err)
  }

}