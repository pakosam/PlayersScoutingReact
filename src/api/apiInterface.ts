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

export interface IUpdatePlayer {
  id: number
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
  height: number;
  foot: string;
  shirtNumber: number
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

export interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface IStats {
  id: number;
  season: string;
  club: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  playerId: number;
}

export interface IAddStats {
  season: string;
  club: string;
  matchesPlayed: number;
  goals: number;
  assists: number;
  fullName: string;
}