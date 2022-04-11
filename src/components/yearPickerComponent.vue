<template>
<div class="picker-wrap">
    <span class="first-item" @mousedown="scrollFirst"></span>
    <span class="previous" @mousedown="scrollLeft"></span>
    <div class="year-picker">
      <div class="inner-picker">
        <div class="year" 
        v-bind:class="{ 'active' : currentYear === prop }" 
        v-for="(prop, index) in items" 
        :key="index"
        @click="updateYear(prop)">
            {{ prop }}
        </div>
      </div>
    </div>
    <span class="next" @mousedown="scrollRight"></span>
    <span class="last-item" @mousedown="scrollLast"></span>
</div>

</template>

<script setup lang="ts">
import { defineComponent, onMounted, PropType, reactive, defineEmits } from 'vue'
// INTERFACES
import ITeam from '@/models/implements/ITeam'
import IPlayer from '@/models/implements/IPlayer'
// Services 
import teamService from '@/services/teamService'
import playerService from '@/services/playerService'
// EVENTS
const emit = defineEmits(['updateYear'])
// PROPS
const props = defineProps({
  items: {
    type: Array as PropType<Array<String>>,
    required: true
  },
  currentYear: {
    type: String,
    required: true
  }
})
// VARS
const componentStore = reactive({
  scrolling: false,
  actualScroll: 0
})
// SCROLLING ACTIONS
function scrollLeft() {
  scrolling('left')
}
function scrollRight() {
  scrolling('right')
}
function scrollFirst (){
  scrolling('first')
}
function scrollLast (){
  scrolling('last')
}
function scrolling(goal : string) {
    const content = document.querySelector(".inner-picker");
    if(content){
      switch (goal) {
        case 'left':
          componentStore.actualScroll -= 80
          if(componentStore.actualScroll < 0)
            scrolling('first')
          break;
        case 'right':
          componentStore.actualScroll += 80
          if(componentStore.actualScroll > content.scrollWidth - content.clientWidth)
            scrolling('last')
          break;
        case 'last':
          componentStore.actualScroll = content.scrollWidth - content.clientWidth
          break;
        case 'first':
          componentStore.actualScroll = 0
          break;
    }
    content.scroll({
      left: componentStore.actualScroll,
      behavior: 'smooth'
    })
  }
}
//change current year and players roster
function updateYear(newYear : String) {
    emit('updateYear', newYear)
}

// LOADING COMPONENT
onMounted(() => {
  scrollLast()
})

</script>
<style lang="scss">
.picker-wrap{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 100%;
  // NAVIGATION CONTAINER
  span{
    margin-right: 0.5em;
    margin-left: 0.5em;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: white 1px solid;
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: center;
    transition: all 0.3s ease-in-out;
    &:hover{
      background-color: #91453D;
      cursor: pointer;
      border: none;
    }
  }
  .year-picker{
    display: flex;
    width: 30%;
    flex-direction: row;
    height: 50px;
    overflow: hidden;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before{
      content: '';
      position: absolute;
      width: 30px;
      height: 50px;
      background: linear-gradient(90deg, rgba(42,11,11,1) 0%, rgba(40,10,10,0) 100%);
      left: 0;
      top: 0;
    }
    &::after{
      content: '';
      position: absolute;
      width: 30px;
      height: 50px;
      background: linear-gradient(-90deg, rgba(42,11,11,1) 0%, rgba(40,10,10,0) 100%);
      right: 0;
      top: 0;
    }
    .inner-picker{
      color: white;
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      &::-webkit-scrollbar{
        display: none;
      }
      .year{
        padding: 0.5em;
        border-radius: 5px;
        margin-right: 0.5em;
        font-family: 'Raleway black', sans-serif;
        font-weight: 400;
        border: 1px rgb(26, 25, 95, 0.4) solid;
        transition: all 0.3s ease-in-out;
        &:hover{
          border: 1px #91453D solid;
          cursor: pointer;
        }
      }
      .active{
        background-color: #91453D;
      }
    }
  }
}
// navigation 
.first-item{
  background-image: url("~@/assets/first_page.svg");
}
.next{
  background-image: url("~@/assets/right_arrow.svg");
}
.previous{
  background-image: url("~@/assets/left_arrow.svg");
}
.last-item{
  background-image: url("~@/assets/last_page.svg");
}
</style>
