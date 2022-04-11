<template>
<transition name="modal">
<div class="main-modal-component" v-if="props.open">
    <div class="inner-modal">
        <div class="modal-header">
            <div class="title">{{ props.title }}</div>
            <div class="close" @click="closeModal"><i class="cross"></i></div>
        </div>
        <div class="modal-body">
            <slot></slot>
        </div>
        <div class="modal-footer"></div>
    </div>
</div>
</transition>

</template>

<script lang="ts" setup>
import { onMounted, defineProps, reactive, defineEmits } from 'vue'
// Interface
// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  open: {
    type: Boolean,
    required: true
  }
})
// Vars
const componentStore = reactive({
})
const emit = defineEmits(['closeModal'])

// Actions
function closeModal () {
  emit('closeModal')
}

// LifeCycle
// eslint-disable-next-line @typescript-eslint/no-empty-function
onMounted(() => {
})
</script>
<style lang="scss">
@import "~@/style/variables.scss";
// transition
.modal-enter-active {
  animation: fade-in .3s ease-in-out;
}
.modal-leave-active {
  animation: fade-in .3s reverse ease-in-out;
}

@keyframes fade-in {
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
// Main code
.main-modal-component{
    position: fixed;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,0.3);
    top: 0;
    left: 0;
    z-index: 999;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Roboto', sans-serif;
    .inner-modal{
        background-color: $MAIN-WHITE-COLOR;
        width: 40%;
        min-height: 50px;
        display: flex;
        flex-direction: column;
        padding: 2em;
        border-radius: 10px;
        .modal-header{
            width: 100%;
            height: 50px;
            display: flex;
            flex-direction: row;
            .title{
                display: flex;
                flex:1;
                justify-content: flex-start;
                align-items: center;
                font-size: 1.5em;
                font-weight: 600;
                color: $SECONDARY-COLOR;
            }
            .close{
                display: flex;
                flex: 1;
                justify-content: flex-end;
                align-items: center;
                i{
                    background-image: url("~@/assets/close.svg");
                    width: 40px;
                    height: 40px;
                    display: flex;
                    background-repeat: no-repeat;
                    background-size: 80%;
                    background-position: center;
                    transition: all 0.3s ease-in-out;
                }
                &:hover{
                    cursor: pointer;
                    i{
                        transform:scale(1.1) rotate(90deg);
                    }
                }
            }
        }
    }
}
  @media only screen and (max-width: 991px) {
    .inner-modal{
      width: 90%!important;
    }
  }
</style>
