import { Component, EventEmitter, Input, Output } from '@angular/core';

import { CommonModule } from '@angular/common';
import { Ioption } from '../../models/option.model';
@Component({
  selector: 'app-option-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css'
})
export class OptionSelectorComponent {
  @Input() option: Ioption = { value: 0, color: '',idBox:0 };
  @Output() injectValueIntoBox = new EventEmitter<Ioption>();

  
// emitting an event to inject option selected into the selected box
  addValueToBox() {
    this.injectValueIntoBox.emit(this.option)
  }
}
