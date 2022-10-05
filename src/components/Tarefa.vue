<template>
	<div class="box has-test-weight-bold">
		<div class="columns">
			<div class="column is-7">
				Descricao da tarefa
			</div>
			<div class="column">
				<CronometroVue :tempoEmSegundos="tempoEmSegundos" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent
	} from "vue";
	import CronometroVue from './Cronometro.vue';

	export default defineComponent({
		name: 'TarefaVue',
		components: {
			CronometroVue
		},
		data() {
			return {
				tempoEmSegundos: 15
			}
		}

	})
</script>

<style scoped>
	.box {
		background: #faf0ca;
	}
</style>