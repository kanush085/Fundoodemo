import { Injectable } from '@angular/core';
import { HttpService } from "../http/http.service";
@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpService) { }
  result: boolean = true;


  getNote() {
    return this.http.getHttp('getNotes');
  }
  archiveNote(data) {
    return this.http.put('isArchived', data)
  }

  trashNote(data) {
    return this.http.put('isTrashed', data)
  }

  deleteNote(data) {
    return this.http.postJSON('deleteNote', data)
  }

  updateColor(data) {
    return this.http.put('updateColor', data)
  }


}
