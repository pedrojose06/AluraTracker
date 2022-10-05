<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <CronometroVue :tempoEmSegundos="tempoEmSegundos" />
        <button class="button" @click="iniciar" :disabled="cronometroRodando">
            <span class="icon">
                <i class="fas fa-play"></i>
            </span>
            <span>play</span>
        </button>
        <button class="button" @click="finalizar" :disabled="!cronometroRodando">
            <span class="icon">
                <i class="fas fa-stop"></i>
            </span>
            <span>stop</span>
        </button>
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CronometroVue from './Cronometro.vue'

export default defineComponent({
    name: 'TemporizadorVue',
    components: {
        CronometroVue,
    },
    data() {
        return {
            tempoEmSegundos: 0,
            cronometro: 0,
            cronometroRodando: false,
        }
    },
    methods: {
        iniciar() {
            this.cronometroRodando = true;
            //começando a contagem
            //1s = 1000ms
            this.cronometro = setInterval(() => {
                this.tempoEmSegundos += 1;
            }, 1000)
        },
        finalizar() {
            this.cronometroRodando = false;
            clearInterval(this.cronometro)
        }
    },

});
</script>
