<template>
	<div class="box has-test-weight-bold">
		<div class="columns">
			<div class="column is-7">
				{{tarefa.descricao}}
			</div>
			<div class="column">
				<CronometroVue :tempoEmSegundos="tarefa.duracaoSegundos" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent,
		PropType
	} from "vue";
	import CronometroVue from './Cronometro.vue';
	import ITarefa from "../Interfaces/ITarefa";

	export default defineComponent({
		name: 'TarefaVue',
		components: {
			CronometroVue
		},
		props: {
			tarefa: {
				type: Object as PropType<ITarefa>,
				required: true,
			}
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