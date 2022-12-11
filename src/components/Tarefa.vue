<template>
	<BoxVue>
		<div class="columns clicavel" @click="tarefaClicada">
			<div class="column is-4">
				{{tarefa.descricao || 'Tarefa sem descrição'}}
			</div>
			<div class="column is-3">
				{{tarefa.projeto?.nome || 'N/D'}}
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
		methods:{
			tarefaClicada() : void{
				this.$emit('aoTarefaClicada', this.tarefa )
			}
		},
		data() {
			return {
				tempoEmSegundos: 15
			}
		}

	})
</script>
<style>
.clicavel:hover{
	cursor: pointer;
}
</style>