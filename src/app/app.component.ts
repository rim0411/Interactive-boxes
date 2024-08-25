import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { OptionSelectorComponent } from './components/option-selector/option-selector.component';
import { Ibox } from './models/box.model';
import { Ioption } from './models/option.model';
import { CommonModule } from '@angular/common';
import { ShareDataService } from './share-data.service';
import { BoxComponent } from './components/box/box.component';
import { IHistoricalBoxValue } from './models/historicalBoxValue.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BoxComponent, OptionSelectorComponent, CommonModule],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './app.component.css'
})
export class AppComponent {
  boxes: Ibox[] = []
  optionSelections: Ioption[] = []
  isOptionsSelectionsOpened = false;
  selectedBoxId!: number;
  savedValuesIntoBoxes: IHistoricalBoxValue[] = [];
  sumOfFilledBoxesValue = 0;
  constructor(private shareDataService: ShareDataService) { }
  private cd = inject(ChangeDetectorRef)
  ngOnInit() {
    this.inializeOptionsList();
    this.inializeBoxesList();
  }
  inializeOptionsList() {
    for (let i = 1; i <= 20; i++) {
      this.optionSelections.push({ value: i * 2 + 1, color: 'grey' })
    }
  }
  inializeBoxesList() {
    for (let i = 1; i <= 10; i++) {
      this.boxes.push({ id: i, color: 'grey', optionSelected: null, value: 3 * i + 6, histoticalOptionSelected: [] })
    }
    // getting the values inside boxes after filling them and refresh the page
    if (localStorage.getItem("boxesValues")) {
      let historicalBoxesValues = JSON.parse(localStorage.getItem("boxesValues") as string)
      historicalBoxesValues.forEach((element: IHistoricalBoxValue) => {
        this.boxes[element.id].optionSelected = element.value
        this.boxes[element.id].value = element.boxValue
        this.boxes[element.id].histoticalOptionSelected = element.historicalValues
      });
    }
    // getting the sum of values after refreshing the page
    if (localStorage.getItem("boxesSum")) {
      this.sumOfFilledBoxesValue = +(localStorage.getItem("boxesSum") as string)
    }
  }
  doSomeActionsOnBox(boxSelected: Ibox) {
    // open options container
    this.isOptionsSelectionsOpened = true
    // color the next box with green color
    this.boxes[boxSelected.id - 1].color = 'green'
    // saving the id of selected box
    this.selectedBoxId = boxSelected.id
    // after refreshing page color the other options not injected into the box with intial color white
    this.optionSelections.filter(option => option.value !== this.boxes[this.selectedBoxId - 1].optionSelected).map(option => option.color = 'white')
    // after refreshing page color the other boxes  with intial color grey
    this.boxes.filter(box => box.id !== boxSelected.id).map(box => box.color = 'grey')
    //In option selections component and after refreshing page color the option injected into the box with red 
    this.shareDataService.getColorfulSelectedOption().subscribe(optionSavedIntoBox => {
      this.optionSelections.map(optionSelected => optionSelected.value === optionSavedIntoBox ? optionSelected.color = 'red' : optionSelected.color = 'white')

    })
    this.cd.markForCheck();
  }

  addvalueToSelectedBox(option: Ioption) {
    // filling the box with the value choosed from options
    this.boxes[this.selectedBoxId - 1].optionSelected = option.value
    //saving the different values trying to be injected into box 
    this.boxes[this.selectedBoxId - 1].histoticalOptionSelected.push(option.value)
    // color the current box with grey
    this.boxes[this.selectedBoxId - 1].color = 'grey'
    // color the next box with green 
    //but the last box dosent have a next box so that's why i add a condition
    if (this.selectedBoxId != 10) {
      this.boxes[this.selectedBoxId].color = 'green'
    }
    // after refreshing color the other options not injected into the box with initial color
    this.optionSelections.filter(option => option.value !== this.boxes[this.selectedBoxId - 1].optionSelected).map(option => option.color = 'white')

    // change the value of the box if a option has been inject one then a time 
    if (this.boxes[this.selectedBoxId - 1].histoticalOptionSelected.length > 1) {
      this.boxes[this.selectedBoxId - 1].value = this.boxes[this.selectedBoxId - 1].value + 6
    }
    this.storingDataIntoLocalStorage(option);
    this.cd.markForCheck();
  }
  storingDataIntoLocalStorage(option: Ioption) {
    // calculating the sum of values and storing it localstorage 
    this.sumOfFilledBoxesValue = this.sumOfFilledBoxesValue + this.boxes[this.selectedBoxId - 1].value;
    localStorage.setItem("boxesSum", JSON.stringify(this.sumOfFilledBoxesValue));
    // storing the values inject  into localstorage to get them after refreshing the page
    this.savedValuesIntoBoxes.push({ id: this.selectedBoxId - 1, value: option.value, boxValue: this.boxes[this.selectedBoxId - 1].value, historicalValues: this.boxes[this.selectedBoxId - 1].histoticalOptionSelected })
    localStorage.setItem("boxesValues", localStorage.getItem("boxesValues") ? JSON.stringify([...JSON.parse(localStorage.getItem("boxesValues") as string), ...this.savedValuesIntoBoxes]) : JSON.stringify(this.savedValuesIntoBoxes));
  }
  refreshBoxes() {
    // clear list of values and sum stored into localstorage
    localStorage.clear();
    // clear values into boxes
    this.boxes.map(box => box.optionSelected = null);
    // clear colors of options
    this.optionSelections.map(box => box.color = 'white');
    // reinitialize the sum to 0
    this.sumOfFilledBoxesValue = 0;
    // setting the color of subject behavior to null because it persists 
    this.shareDataService.setColorfulSelectedOption(-1)
  }
}
