import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  patchState,
  withMethods
} from '@ngrx/signals';




export const OptionsStore = signalStore(
  { providedIn: 'root' },
  withState({
    colorfulSelectedOption: -1
  }),

  withMethods((store:any) => ({
    setColorfulSelecctedOption(colorfulSelecctedOption:number) {
      patchState(store, { colorfulSelectedOption: colorfulSelecctedOption });
    }
  }))
);
