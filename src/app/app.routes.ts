import { Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { TutorialComponent } from './tutorial/tutorial.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
  { path: '', component: CalculatorComponent },
  { path: 'tutorial', component: TutorialComponent },
  { path: 'details', component: DetailsComponent }
];