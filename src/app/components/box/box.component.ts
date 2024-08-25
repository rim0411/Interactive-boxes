import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Ibox } from '../../models/box.model';
import { OptionsStore } from '../../signalsStore/options.store';


@Component({
  selector: 'app-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './box.component.html',
  styleUrl: './box.component.css'
})
export class BoxComponent {
  @Input() boxValue!: Ibox
  @Input() optionSelected!:{ value: string, idBox: number }
  @Output() clickedBox = new EventEmitter<Ibox>()
  constructor() { }
  readonly store = inject(OptionsStore);
  chooseBox() {
    // store the value inject into the box in order to color the adequat value in options list
    if (localStorage.getItem("boxesValues")) {
      this.store.setColorfulSelectedOption(this.boxValue.optionSelected as number)
    }
    //emit a value to the parent component when we click on a box
    this.clickedBox.emit(this.boxValue)
  }
}
