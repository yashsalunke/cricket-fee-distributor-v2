export interface Player {
  name: string;
  battingPosition: number;
  ballsFaced: number;
  ballsBowled: number;
  runs: number;
  strikeRate: number;
  wickets: number;
  economy: number;
  opportunityScore?: number;
  finalPercent?: number;
  amount?: number;
}