<template>
	<BoxVue>
		<div class="columns clicavel" @click="tarefaClicada">
			<div class="column is-4">
				{{ tarefa.descricao || 'Tarefa sem descrição' }}
			</div>
			<div class="column is-3">
				{{ tarefa.projeto?.nome || 'N/D' }}
			</div>
			<div class="column">
				<CronometroVue :tempoEmSegundos="tarefa.duracaoSegundos" />
			</div>
		</div>
	</BoxVue>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	PropType,
} from "vue";
import CronometroVue from './Cronometro.vue';
import ITarefa from "../Interfaces/ITarefa";
import BoxVue from "./Box.vue";

export default defineComponent({
	name: 'TarefaVue',
	emits: ['aoTarefaClicada'],
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
	setup(props, { emit }) {
		const tarefaClicada = (): void => {
			emit('aoTarefaClicada', props.tarefa)
		}
		const tempoGasto = computed(() => {
			return new Date(props.tarefa.duracaoSegundos * 1000)
				.toISOString()
				.substr(11, 8)
		})
		return {
			tarefaClicada,
			tempoGasto
		}
	}

})
</script>
<style>
.clicavel:hover {
	cursor: pointer;
}
</style>