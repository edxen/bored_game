import { TPlayer } from "../reducers/initialStates";
import names from '../data/names.json';

export const colorsList = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'violet'];

export type TColorsList = typeof colorsList[number];

export const bgColors: Record<TColorsList, string> = {
  red: 'bg-red-300',
  blue: 'bg-blue-300',
  green: 'bg-green-300',
  yellow: 'bg-yellow-300',
  orange: 'bg-orange-300',
  purple: 'bg-purple-300',
  pink: 'bg-pink-300',
  violet: 'bg-violet-300'
};

const randomIndex = ({ min = 0, max }: { [key: string]: number; }) => Math.floor(Math.random() * max) - min;
const randomizeList = <T,>(list: T[]): T => list[randomIndex({ max: list.length })];

const defaultPlayer = (): TPlayer => {
  return {
    id: '',
    index: 0,
    name: randomizeList(names),
    color: randomizeList(colorsList),
    type: 'computer',
    path: 0,
    last_path: 0,
    roll: 0,
    skip: false,
    extra: false,
    action: {
      extra: false,
      exact: false,
      high: false,
      low: false
    }
  } as TPlayer;
};

const createPlayer = (customPlayer: Partial<TPlayer>): TPlayer => {
  const player: TPlayer = { ...defaultPlayer(), ...customPlayer };
  player.id = player.name.toLowerCase();
  player.color = bgColors[player.color];
  player.last_path = player.path;
  return player;
};

export const getUniquePlayer = (players: TPlayer[]): TPlayer => {
  const isUniquePlayer = (players: TPlayer[], newPlayer: TPlayer): boolean => {
    const isUniqueID = !players.some(player => player.id === newPlayer.id);
    const isUniqueColor = !players.some(player => player.color === newPlayer.color);
    return isUniqueID && isUniqueColor;
  };

  let newPlayer = createPlayer({});
  while (!isUniquePlayer(players, newPlayer)) newPlayer = createPlayer({});
  return newPlayer;
};

const defaultPlayers = (playersLength: number): TPlayer[] => {
  const players: TPlayer[] = [];

  while (players.length < playersLength) {
    const newPlayer = getUniquePlayer(players);
    players.push(newPlayer);
  }

  return players;
};

export default defaultPlayers;