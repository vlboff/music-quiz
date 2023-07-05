export interface IPlayer {
  name: string;
  points: number;
}

export interface ISection {
  name: string;
}

export enum ID {
  player = 'player',
  section = 'section'
}