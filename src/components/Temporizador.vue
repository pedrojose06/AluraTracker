<template>
	<div class="is-flex is-align-items-center is-justify-content-space-between">
		<CronometroVue :tempoEmSegundos="tempoEmSegundos" />
		<BotaoTemporizadorVue
			@click="iniciar"
			nome="play"
			icone="fas fa-play"
		/>
		<BotaoTemporizadorVue
			@click="finalizar"
			nome="stop"
			icone="fas fa-stop"
		/>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent
	} from "vue";
	import CronometroVue from "./Cronometro.vue";
	import BotaoTemporizadorVue from "./BotaoTemporizador.vue";

	export default defineComponent({
		name: "TemporizadorVue",
		emits: ["AoTemporizadorFinalizado"],
		components: {
			CronometroVue,
			BotaoTemporizadorVue,
		},
		data() {
			return {
				tempoEmSegundos: 0,
				cronometro: 0,
				cronometroRodando: false,
			};
		},
		methods: {
			iniciar() {
				this.cronometroRodando = true;
				//começando a contagem
				//1s = 1000ms
				this.cronometro = setInterval(() => {
					this.tempoEmSegundos += 1;
				}, 1000);
			},
			finalizar() {
				this.cronometroRodando = false;
				clearInterval(this.cronometro);
				this.$emit("AoTemporizadorFinalizado", this.tempoEmSegundos);
				this.tempoEmSegundos = 0;
			},
		},
	});
</script>
