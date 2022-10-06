<template>
	<main class="columns is-gapless is-multiline">
		<div class="column is-one-quarter">
			<BarraLateralVue />
		</div>
		<div class="column is-three-quarter">
			<FormularioVue @aoSalvarTarefa="salvarTarefa" />
			<div class="lista">
				<TarefaVue
					v-for="(tarefa, index) in tarefas"
					:key="index"
					:tarefa="tarefa"
				/>
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import BarraLateralVue from './components/BarraLateral.vue';
	import FormularioVue from './components/Formulario.vue';
	import TarefaVue from './components/Tarefa.vue';
	import ITarefa from './Interfaces/ITarefa';


	export default defineComponent({
		name: 'App',
		components: {
			BarraLateralVue,
			FormularioVue,
			TarefaVue
		},
		data() {
			return {
				tarefas: [] as ITarefa[]
			}
		},
		methods: {
			salvarTarefa(tarefa: ITarefa) {
				this.tarefas.push(tarefa);
			}
		}
	});
</script>

<style lang="scss">
	.lista {
		padding: 1.25rem;
	}
</style>
