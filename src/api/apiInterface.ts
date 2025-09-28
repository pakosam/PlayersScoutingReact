export interface IPlayers {
  id: number;
  image?: string;
  name: string;
  surname: string;
  club: string;
  positions: string;
}

export interface IDeletePlayer {
  id: number;
}

export interface IAddPlayer {
  name: string;
  surname: string;
  birthdate: string;
  birthplace: string;
  height: number;
  foot: string;
  shirtNumber: number;
  positions: string;
  club: string;
}

export interface IPlayer {
  id: number;
  image?: string;
  name: string;
  surname: string;
  birthdate: string;
  birthplace: string;
  foot: string;
  positions: string;
  club: string;
}

export interface IRatings {
  id: number;
  attack: number;
  defense: number;
  tactics: number;
  technique: number;
  physicalStrength: number;
  mentalStrength: number;
  playerId: number;
}