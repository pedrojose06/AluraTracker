<template>
	<main class="columns is-gapless is-multiline">
		<div class="column is-one-quarter">
			<BarraLateralVue />
		</div>
		<div class="column is-three-quarter">
			<FormularioVue />
			<div class="lista">
				<TarefaVue />
				<TarefaVue />
				<TarefaVue />
				<TarefaVue />
			</div>
		</div>
	</main>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import BarraLateralVue from './components/BarraLateral.vue';
	import FormularioVue from './components/Formulario.vue';
	import TarefaVue from './components/Tarefa.vue';


	export default defineComponent({
		name: 'App',
		components: {
			BarraLateralVue,
			FormularioVue,
			TarefaVue
		}
	});
</script>

<style lang="scss">
	.lista {
		padding: 1.25rem;
	}
</style>
