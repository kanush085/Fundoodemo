import { Component, OnInit } from '@angular/core';
import { NoteService } from "../../service/noteservice/note.service"
import{DataService} from "../../service/dataservice/data.service"
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit {

  constructor(private noteService: NoteService,private data: DataService) { }
  cards: any[]=[]
  Allcards: any[]=[]
  addnote: any
  message:string;
  grid=''
  ngOnInit() {
    this.getCards()
    this.data.currentMessage.subscribe(message=>{
      console.log(message);
   if(message){
    this.grid='row wrap'

   }else{
     this.grid='column'
   }
    })
  }

  getCards() {
    this.noteService.getNote().subscribe(data => {
      console.log("getcards", data);
      var carddata = data['data']
      this.cards=[];
      for (let i = 0; i < carddata.length; i++) {
        if(!carddata[i].archive && !carddata[i].trash)     
     this.cards.push(carddata[i])
  
      }
      console.log("array cards",this.cards);
      
      this.cards = this.cards.reverse();
    })
  }

  recieveMessage($event) {
    // this.addnote = $event;
    // console.log(this.addnote, "......addnote")
    // this.Allcards.push(this.addnote);
    this.ngOnInit();
  }

//   gridChange(){
//     console.log(this.grid);
    
// if(this.grid=='column'){
//   this.grid='row wrap'
// }else{
//   this.grid='column'
// }



  

}
