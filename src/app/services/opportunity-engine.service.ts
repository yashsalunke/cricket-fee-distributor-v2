import { Player } from '../models/player.model';

export class OpportunityEngineService {
  calculate(players: Player[]): Player[] {
    const totalBat = players.reduce(
      (s,p)=>s+p.ballsFaced*this.posWeight(p.battingPosition),0);
    const totalBowl = players.reduce((s,p)=>s+p.ballsBowled,0);

    players.forEach(p=>{
      const bat = totalBat ? (p.ballsFaced*this.posWeight(p.battingPosition))/totalBat : 0;
      const bowl = totalBowl ? p.ballsBowled/totalBowl : 0;
      p.opportunityScore = bat*0.5 + bowl*0.5;
    });
    return players;
  }

  private posWeight(pos:number):number{
    if(pos<=2) return 1;
    if(pos<=4) return 0.9;
    if(pos<=6) return 0.8;
    if(pos<=8) return 0.65;
    return 0.5;
  }
}