import Api from './apiService'
import ITeam from '@/models/implements/ITeam'

class TeamService {
  async getTeamByYearWithPlayers (year: Number) {
    return Api.get<ITeam>('api/Team/'+ year)
  }
  async getAllTeams () {
    return Api.get<ITeam[]>('api/Team/')
  }
}

export default new TeamService()
