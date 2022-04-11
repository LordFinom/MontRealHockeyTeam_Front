<template>
<div class="main-container-home">
  <div class="wrapper">
    <div class="logo"></div>
    <div class="picker">
      <year-picker-component 
      :items="componentStore.years" 
      :current-year="componentStore.currentYear.toString()"
      @updateYear="updateYear">
      </year-picker-component>
    </div>
    <div class="players-list">
      <loader-component :shown="componentStore.loading" ></loader-component>
      <card-component :items="componentStore.team.players" 
      @addPlayer="addPlayer"
      @reload="getData"
      v-if="!componentStore.loading">
      </card-component>
    </div>
  </div>
  <div class="footer">
    <div class="inner-footer"></div>
  </div>
</div>
http://vps-6b3333e5.vps.ovh.net/
<!--MODAL-->
<modal-root-component :title="'ADD NEW PLAYER'"
:open="componentStore.openModal"
@close-modal="closeModal()"
>
<div class="player-form">
  <form class="submit-form" @submit="submitPlayer">
    <label for="name">Name</label>
    <input id="name" class="input-type" type="text" v-model="componentStore.playerToAdd.name">
    <label for="name">Lastname</label>
    <input type="text" v-model="componentStore.playerToAdd.lastName">
    <label for="name">Number</label>
    <input type="number" v-model="componentStore.playerToAdd.number">
    <label for="name">Position</label>
    <input type="text" v-model="componentStore.playerToAdd.position">
    <!-- Squared ONE -->
    <div class="squared-check">
      <input type="checkbox" 
      value="None" 
      id="squared" 
      name="check" v-model="componentStore.playerToAdd.isCaptain"/>
      <label for="squared">Captain</label>
    </div>
    <input type="submit" value="Submit">
  </form>
</div>
</modal-root-component>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
// COMPONENTS
import cardComponent from '@/components/cardComponent.vue';
import yearPickerComponent from '@/components/yearPickerComponent.vue';
import loaderComponent from '@/components/globals/loaderComponent.vue'
import modalRootComponent from '@/components/globals/modalRootComponent.vue'
// INTERFACES
import ITeam from '@/models/implements/ITeam'
import IPLayer from '@/models/implements/IPlayer'
// Services 
import teamService from '@/services/teamService'
import playerService from '@/services/playerService'

const componentStore = reactive({
  team: {} as ITeam,
  currentYear: 2021,
  years: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2020', '2021'],
  loading: true,
  openModal: false,
  playerToAdd: {} as IPLayer
})
// Get all data from API
async function getData () {
  const [teamResponse] = await Promise.all([
    teamService.getTeamByYearWithPlayers(componentStore.currentYear)
  ])
  componentStore.team = teamResponse.data
  componentStore.team.players.reverse()
  componentStore.loading = false
}
// Update roster by new currentYear
function updateYear (newYear:  string): void {
  componentStore.currentYear = parseInt(newYear)
  getData()
}
//  Adding new player
function addPlayer (): void { 
  componentStore.openModal = true;
}
function submitPlayer (event: Event): void { 
  event.preventDefault()
  let isValid = true
  //lastName
  isValid = componentStore.playerToAdd.lastName !== ''
  //Name
  isValid = componentStore.playerToAdd.name !== ''
  //number
  isValid = componentStore.playerToAdd.number !== 0
  //position
  isValid = componentStore.playerToAdd.position !== ''
  
  if(isValid){
    // Avoid reset page on submit
    componentStore.openModal = false;
    playerService.AddPlayerToTeamByYear(componentStore.currentYear, componentStore.playerToAdd).then(response => {
      getData()
    })
    
  } else {
    alert('All fields are required')
  }
}
// MODAL ACTION
function closeModal (): void {
  componentStore.openModal = false;
}
// Reset player
function resetPlayer () {
  componentStore.playerToAdd.id = 0
  componentStore.playerToAdd.name = ''
  componentStore.playerToAdd.lastName = ''
  componentStore.playerToAdd.number = 0,
  componentStore.playerToAdd.position = '',
  componentStore.playerToAdd.isCaptain = false
}
// LOADING COMPONENT
onMounted(() => {
  getData()
  resetPlayer()
})

</script>
<style lang="scss">
@import "~@/style/variables.scss";
.main-container-home{
    width: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(0,0,0,1) 0%, rgba(42,11,11,1) 100%);
    .wrapper{
      display: flex;
      flex-direction: column;
      .logo{
          width: 100%;
          background-image: url("~@/assets/banner-site.png");
          background-repeat: no-repeat;
          background-position-x: center;
          background-position-y: center;
          background-size:contain;
          height: 380px;
      }
      .players-list{
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        max-width: 1280px;
        margin: 0 auto;
        padding-bottom: 1em;
      }
    }

  }
  .player-form{
    display: flex;
    justify-content: center;
    .submit-form{
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

input[type=text], input[type=number], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
input[type=submit] {
  width: 100%;
  background-color: $SECONDARY-COLOR;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
label{
  font-family: 'Roboto', sans-serif !important;
}

// SQUARE CHECKBOX 
	[type=checkbox]:not(:checked),
	[type=checkbox]:checked {
		position: absolute;
		left: 0;
		opacity: 0.01;
	}
	[type=checkbox]:not(:checked) + label,
	[type=checkbox]:checked + label {
		position: relative;
		padding-left: 2.3em;
		font-size: 1.05em;
		line-height: 1.7;
		cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
	}

	/* checkbox aspect */
	[type=checkbox]:not(:checked) + label:before,
	[type=checkbox]:checked + label:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 1.4em;
		height: 1.4em;
		border: 1px solid #aaa;
		background: #FFF;
		border-radius: .2em;
		box-shadow: inset 0 1px 3px rgba(0,0,0, .1), 0 0 0 rgba(203, 34, 237, .2);
		-webkit-transition: all .275s;
				transition: all .275s;
	}
  /* checked mark aspect */
	[type="checkbox"]:not(:checked) + label:after,
	[type="checkbox"]:checked + label:after {
		content: '✕';
		position: absolute;
		top: .585em;
		left: .18em;
		font-size: 1.375em;
		color: $SECONDARY-COLOR;
		line-height: 0;
		-webkit-transition: all .2s;
				transition: all .2s;
	}

	/* checked mark aspect changes */
	[type="checkbox"]:not(:checked) + label:after {
		opacity: 0;
		-webkit-transform: scale(0) rotate(45deg);
				transform: scale(0) rotate(45deg);
	}

	[type="checkbox"]:checked + label:after {
		opacity: 1;
		-webkit-transform: scale(1) rotate(0);
				transform: scale(1) rotate(0);
	}

  .squared-check{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-content: center;
  }
  .footer{
    margin-top: 2em;
    display: flex;
    justify-content: center;
    .inner-footer{
      background-image: url("~@/assets/footer.png");
      background-repeat: no-repeat;
      background-position-x: center;
      background-position-y: center;
      background-size:cover;
      width: 100%;
      max-width: 1280px;
      height: 250px;
      border-top: 1em $SECONDARY-COLOR solid;
    }
  }
</style>
