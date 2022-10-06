<template>
	<BoxVue>
		<div class="columns">
			<div class="column is-7">
				{{tarefa.descricao || 'Tarefa sem descrição'}}
			</div>
			<div class="column">
				<CronometroVue :tempoEmSegundos="tarefa.duracaoSegundos" />
			</div>
		</div>
	</BoxVue>
</template>

<script lang="ts">
	import {
		defineComponent,
		PropType
	} from "vue";
	import CronometroVue from './Cronometro.vue';
	import ITarefa from "../Interfaces/ITarefa";
	import BoxVue from "./Box.vue";

	export default defineComponent({
		name: 'TarefaVue',
		components: {
			CronometroVue,
			BoxVue
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