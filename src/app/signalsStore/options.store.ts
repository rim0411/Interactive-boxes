
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
  withMethods((store: any) => ({
    setColorfulSelectedOption(colorfulSelecctedOption: number) {
      patchState(store, { colorfulSelectedOption: colorfulSelecctedOption });
    }
  }))
);
