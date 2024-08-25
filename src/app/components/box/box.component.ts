import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Ibox } from '../../models/box.model';
import { ShareDataService } from '../../share-data.service';


@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  @Input() boxValue!: Ibox
  @Input() optionSelected!: { value: string, idBox: number }
  @Output() boxClicked = new EventEmitter<Ibox>()
  constructor(private shareDataService: ShareDataService) { }
  chooseBox() {
    // store the value inject into the box in order to color the adequat value in options list
    if (localStorage.getItem("boxesValues")) {
      this.shareDataService.setColorfulSelectedOption(this.boxValue.optionSelected)
    }
    //emit a value to the parent component when we click on a box
    this.boxClicked.emit(this.boxValue)
  }
}
