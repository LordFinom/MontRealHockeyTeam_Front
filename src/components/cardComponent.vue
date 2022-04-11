<template>
    <div class="player-card" @click="addPlayer()">
      <div class="player-add">
        <span class="add-player">ADD PLAYER</span>
      </div>
    </div>
    <div class="player-card" 
    v-for="(player, index) in items" 
    :key="index">
      <div class="captain-badge" 
      v-bind:class="{ 'active' : player.isCaptain }" 
      @click="setPlayerCaptain(player.id)">
      <span class="tooltip">{{ componentStore.tooltipCaptain }}</span>
      </div>
      <div class="inner-card">
        <div class="name">
          <span class="inner-name">{{ player.name }} {{ player.lastName}}</span> </div>
        <div class="thumb"><img :src="getFileName(player)" alt=""></div>
        <div class="number">
          <span class="inner-number">{{ player.number}}</span>
          </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, PropType, reactive } from 'vue'
// INTERFACES
import ITeam from '@/models/implements/ITeam'
import IPlayer from '@/models/implements/IPlayer'
// Services 
import teamService from '@/services/teamService'
import playerService from '@/services/playerService'
// EVENTS
const emit = defineEmits(['addPlayer', 'reload'])

// PROPS
const props = defineProps({
  items: {
    type: Array as PropType<Array<IPlayer>>,
    required: true
  }
})
// VARS
const componentStore = reactive({
  tooltipCaptain: 'Set as captain',
  captainTooltipFlag: true
})
// Get avatar by name
function getFileName (player: IPlayer): string{
  const playerName = player.name.toUpperCase() + '_' + player.lastName.toUpperCase()
  let path : string = ''
  try {
    path = require(`@/assets/playersPictures/${playerName}.png`)
  } catch (error) {  // If avatar doesn't exist we use default image                          
    path = require(`@/assets/playersPictures/casual_avatar.png`) 
  }
  return path
}
function addPlayer () {
    emit('addPlayer')
}
function setPlayerCaptain(id: Number) :void {
  playerService.UpdatePlayerAsCaptain(id).then(response => {
      emit('reload')
  })
}

</script>
<style lang="scss">
@import "~@/style/variables.scss";
    .player-card{
        display: flex;
        flex-basis: 10%;
        padding: 1em;
        min-width: 120px;
        position:relative;
        .captain-badge{
          background-image: url("~@/assets/captain.svg");
          background-color: white;
          background-repeat: no-repeat;
          background-position: center;
          background-size: 90%;
          position: absolute;
          right: 0.5em;
          top: 1em;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          z-index: 3;
          border: 1px solid $GREY-COLOR-STRONG;
          opacity: 0.4;
          transition: all 0.3s ease-in-out;
          &:hover{
            background-color: $SECONDARY-COLOR;
            opacity: 1;
            cursor: pointer;
            background-image: url("~@/assets/captain-white.svg");
            border:none;
            transform: scale(1.2);
            .tooltip{
              display: flex!important;
            }
          }
        }
        .active{
          background-color: $SECONDARY-COLOR;
          opacity: 1;
          cursor: pointer;
          background-image: url("~@/assets/captain-white.svg");
          border:none;
          transform: scale(1.2);
        }
        .inner-card{
          background-image: url("~@/assets/card-back.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          position: relative;
          color: white;
          border-radius: 5px;
          margin-top: 1em;
          .thumb{
            flex: 1;
            position: relative;
            width: 100%;
            justify-content: center;
            img{
              position: absolute;
              bottom: 0em;
              left: -0.6em;
              height: 150%;
            }
          }
          .name{
            flex: 1;
            font-family: 'Raleway black', sans-serif;
            text-transform: uppercase;
            font: 900;
            font-size: 0.9em;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 0.5em;
            text-align: center;
            color: #15165B;
            position: relative;
            overflow: hidden;
              &::before{
                      content: "";
                      position: absolute;
                      width: 200px;
                      height: 200px;
                      background-color: white;
                      z-index: 1;
                      top: -151px;
                      left: 33px;
                      border-radius: 45%;
                      opacity: 0.8;
                      border: 1px solid rgba(207, 168, 67, 0.6);
              }
              &::after{
                      content: "";
                      position: absolute;
                      width: 200px;
                      height: 200px;
                      background-color: white;
                      z-index: 0;
                      top: -152px;
                      left: -110px;
                      border-radius: 45%;
                      opacity: 0.8;
                      border: 1px solid rgba(207, 168, 67, 0.6);
              }
            .inner-name{
              z-index: 2;
            }
          }
          .number{
            position: absolute;
            bottom: -0.4em;
            left: 0;
            font-family: 'Roboto', sans-serif;
            width: 100%;
            display: flex;
            justify-content: center;
            font-size: 1.2em;
            font-weight: bolder;
            .inner-number{
              z-index: 2;
            }
            &::before{
              content: "";
              z-index: 1;
              background-image: url("~@/assets/shield.svg");
              top: -21px;
              left: 0;
              width: 100%;
              height: 68px;
              background-position: center;
              background-repeat: no-repeat;
              background-size: 40%;
              position: absolute;
            }
          }
        }
        .player-add{
          background-image: url("~@/assets/card-back.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 100%;
          min-height: 150px;
          display: flex;
          flex-direction: column;
          position: relative;
          color: white;
          border-radius: 5px;
          margin-top: 1em;
          opacity: 0.8;
          &::before{
            content: "";
            min-height: 150px;
            position: absolute;
            width: 100%;
            background-image: url("~@/assets/add.svg");
            background-position: center;
            background-repeat: no-repeat;
            background-size: 40%;
          }
          &:hover{
            opacity: 1;
            cursor: pointer;
          }
          .add-player{
            position: absolute;
            top: 0.5em;
            left: 0;
            height: 30px;
            width: 100%;
            font-family: 'Raleway black', sans-serif;
            text-align: center;
            color: black;
            display: flex;
            justify-content: center;
          }
        }
    }
    .tooltip{
      display: none;
      position: absolute;
      top: 2.3em;
      left: -126%;
      background-color: $SECONDARY-COLOR;
      color: $MAIN-WHITE-COLOR;
      width: auto;
      height: auto;
      padding: 0.2em;
      white-space: nowrap;
      border-radius: 5px;
      font-family: 'Roboto', sans-serif;
      transition: all 0.3s ease-in-out;
      &::after{
        content: "";
          position: absolute;
          top: -40%;
          left: 50%;
          margin-left: -5px;
          border-width: 5px;
          border-style: solid;
          border-color: $SECONDARY-COLOR transparent transparent transparent;
          transform: rotate(180deg);
      }
    }
</style>
