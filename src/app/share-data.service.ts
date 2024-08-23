import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {
colorfulselectedOption:BehaviorSubject<number>=new BehaviorSubject(-1)
  constructor() { }
  setColorfulSelectedOption(option:number|null){
    this.colorfulselectedOption.next(option as number)
  }
  getColorfulSelectedOption(){
    return this.colorfulselectedOption.asObservable()
  }
}

