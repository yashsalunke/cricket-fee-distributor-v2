import { Player } from '../models/player.model';

export class ContributionCalculatorService {
  calculate(players: Player[], amount:number):Player[]{
    if(players.length === 0) return players;
    const sum = players.reduce((s,p)=>s+(p.opportunityScore||0),0);

    players.forEach(p=>{
      let pct = ((p.opportunityScore||0)/sum)*100;
      pct -= this.reward(p);
      pct = Math.max(3, Math.min(15, pct));
      p.finalPercent = pct;
    });

    const totalPct = players.reduce((s,p)=>s+(p.finalPercent||0),0);
    players[0].finalPercent! += (100-totalPct);

    // Clamp final percentages to 3-15
    players.forEach(p => {
      p.finalPercent = Math.max(3, Math.min(15, p.finalPercent!));
    });

    // Normalize to ensure sum is 100
    const clampedTotal = players.reduce((s,p)=>s+(p.finalPercent||0),0);
    const factor = 100 / clampedTotal;
    players.forEach(p => {
      p.finalPercent! *= factor;
    });

    // Final clamp to ensure no percentage exceeds 15%
    players.forEach(p => {
      p.finalPercent = Math.max(3, Math.min(15, p.finalPercent!));
    });

    players.forEach(p=>{
      p.amount = (p.finalPercent!/100)*amount;
    });
    return players;
  }

  private reward(p:Player):number{
    let r=0;
    if(p.strikeRate>180) r+=2;
    else if(p.strikeRate>150) r+=1;
    if(p.runs>=30) r+=1;
    if(p.economy>0 && p.economy<6) r+=1;
    if(p.wickets>=2) r+=1;
    if(p.wickets>=3) r+=2;
    return r;
  }
}