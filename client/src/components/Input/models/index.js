import { modelOne } from './modelOne';
import { modelTwo } from './modelTwo';
import { modelThree } from './modelThree';
import { modelFour } from './modelFour';
import { modelFive } from './modelFive';
import { modelSix } from './modelSix';

export const models = {
  modelOne: modelOne, // Everything else
  modelTwo: modelTwo, // Vietnamese
  modelThree: modelThree, // Chinese
  modelFour: modelFour, // Korean
  modelFive: modelFive, // Braille
  modelSix: modelSix, // Morse
};

export * from './checkerModels';
