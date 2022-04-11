import IPlayer from '@/models/implements/IPlayer'
import Api from './apiService'

class PlayerService {
  async AddPlayerToTeamByYear (year: Number, player: IPlayer) {
    return Api.post('api/team/'+year, { 
      number: player.number,
      name: player.name,
      lastName: player.lastName,
      position: player.position,
      isCaptain: player.isCaptain
    })
  }
  async UpdatePlayerAsCaptain (id: Number) {
    return Api.put('api/player/'+id+'/captain')
  }

}

export default new PlayerService()
