import { Injectable } from '@angular/core';
import {HttpService} from "./services/http.service";
import {AccountService} from "./services/account.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private httpService: HttpService) {

  }

}
