import IPlayer from "./IPlayer";


export default interface ITeam {
    id: Number;
    coach: String;
    year: Number;
    players: IPlayer [];
}