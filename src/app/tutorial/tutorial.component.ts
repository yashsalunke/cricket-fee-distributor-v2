import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './tutorial.component.html',
  styleUrl: './tutorial.component.css'
})
export class TutorialComponent {
  sampleBatting = `No Batsman Status R B M 4s 6s SR
1 Alex Johnson (RHB) c John Smith b Mark Johnson 29 19 23 4 1 152.63
2 Mike Davis (LHB) c Paul Williams b Tom Brown 1 3 5 0 0 33.33
3 Chris Wilson c&b Tom Brown 0 1 1 0 0 0.00
4 David Brown (c) (RHB) c John Smith b Richard Davis 1 3 5 0 0 33.33
5 James Miller (RHB) c †John Smith b Richard Davis 0 1 1 0 0 0.00
6 Robert Taylor (RHB) hit wkt b Charles Wilson 3 11 16 0 0 27.27
7 Kevin Anderson (RHB) c Edward Miller b Frank Taylor 7 5 7 1 0 140.00
8 Brian Thompson (RHB) c Richard Davis b George Anderson 5 5 5 1 0 100.00
9 Steven Garcia (RHB) b Henry Thompson 5 12 11 0 0 41.67
10 Daniel Martinez (RHB) c Ian Garcia b Paul Williams 10 9 11 1 0 111.11
11 Andrew Lee (RHB) not out 2 4 13 0 0 50.00
Extras: (wd 5, b 2) 7
Total: Overs 12.1, Wickets 10 70 (CRR: 5.75)`;

  sampleBowling = `No Bowler O M R W 0s 4s 6s WD NB Eco
1 James Miller 3 0 33 0 5 3 2 0 0 11.00
2 Mike Davis 2 0 25 0 1 2 1 2 0 12.50
3 David Brown (c) 2 0 18 2 4 2 0 3 0 9.00
4 Daniel Martinez 2 0 16 0 2 1 0 0 1 8.00
5 Robert Taylor 3 0 32 1 6 3 2 0 0 10.67
6 Brian Thompson 3 0 29 3 5 2 2 0 0 9.67
7 Kevin Anderson 1 0 12 0 1 0 0 1 0 12.00`;

  copyBatting() {
    navigator.clipboard.writeText(this.sampleBatting);
    alert('Batting stats copied to clipboard!');
  }

  copyBowling() {
    navigator.clipboard.writeText(this.sampleBowling);
    alert('Bowling stats copied to clipboard!');
  }
}
