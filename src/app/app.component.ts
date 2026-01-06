import { Component } from '@angular/core';
import { Player } from './models/player.model';
import { OpportunityEngineService } from './services/opportunity-engine.service';
import { ContributionCalculatorService } from './services/contribution-calculator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[OpportunityEngineService,ContributionCalculatorService]
})
export class AppComponent {

  step = 1;
  battingText = '';
  bowlingText = '';
  amount = 2000;
  players:Player[] = [];

  constructor(private opp:OpportunityEngineService,
              private calc:ContributionCalculatorService){}

  calculate(){
    const battingPlayers = this.parseBatting(this.battingText);
    const bowlingStats = this.parseBowling(this.bowlingText);
    const playerMap: { [name: string]: Player } = {};

    // Add batting players
    battingPlayers.forEach(p => {
      playerMap[p.name] = { ...p };
    });

    // Add or update with bowling stats
    bowlingStats.forEach(stat => {
      if (playerMap[stat.name]) {
        playerMap[stat.name].ballsBowled = stat.ballsBowled;
        playerMap[stat.name].wickets = stat.wickets;
        playerMap[stat.name].economy = stat.economy;
      } else {
        // Pure bowler
        playerMap[stat.name] = {
          name: stat.name,
          battingPosition: 12, // arbitrary high number
          ballsFaced: 0,
          runs: 0,
          strikeRate: 0,
          ballsBowled: stat.ballsBowled,
          wickets: stat.wickets,
          economy: stat.economy
        };
      }
    });

    this.players = Object.values(playerMap);
    this.players = this.opp.calculate(this.players);
    this.players = this.calc.calculate(this.players,this.amount);
    this.step = 2;
  }

  parseBatting(text: string): Player[] {
    const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
    const players:Player[]=[];
    let bat=false;
    for(const l of lines){
      if(l.startsWith('No Batsman')){bat=true; continue;}
      if(l.startsWith('Extras')) bat=false;
      if(bat && /^\d+\s/.test(l)){
        const p=l.split(/\s+/);
        let statusIndex = p.findIndex(s => ['c','b','not','run','lbw','st','hit','c&b','stumped','bowled','caught'].includes(s));
        if(statusIndex === -1) statusIndex = p.length - 6;
        const name = p.slice(1, statusIndex).join(' ').replace(/\((RHB|LHB|AMB)\)/g,'').trim();
        players.push({
          name: name,
          battingPosition:+p[0],
          ballsFaced:+p[p.length-5],
          runs:+p[p.length-6],
          strikeRate:+p[p.length-1],
          ballsBowled:0,
          wickets:0,
          economy:0
        });
      }
    }
    return players;
  }

  parseBowling(text: string): {name: string, ballsBowled: number, wickets: number, economy: number}[] {
    const lines = text.split('\n').map(l=>l.trim()).filter(Boolean);
    const stats: {name: string, ballsBowled: number, wickets: number, economy: number}[] = [];
    let bowl=false;
    for(const l of lines){
      if(l.startsWith('No Bowler')){bowl=true; continue;}
      if(bowl && /^\d+\s/.test(l)){
        const p=l.split(/\s+/);
        let nameEnd = 1;
        for(let i=1; i<p.length; i++){
          if(/^\d+(\.\d+)?$/.test(p[i])){ nameEnd = i; break; }
        }
        const name = p.slice(1, nameEnd).join(' ');
        const overs = p[nameEnd];
        const wickets = +p[nameEnd + 3];
        const eco = +p[p.length-1];
        const balls = this.toBalls(overs);
        stats.push({name, ballsBowled: balls, wickets, economy: eco});
      }
    }
    return stats;
  }

  toBalls(o:string):number{
    if(!o.includes('.')) return +o*6;
    const [x,y]=o.split('.');
    return +x*6+ +y;
  }
}