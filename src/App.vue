<template>
	<main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
		<div class="column is-one-quarter">
			<BarraLateralVue @aoTemaAlterado="trocarTema" />
		</div>
		<div class="column is-three-quarter conteudo">
			<FormularioVue @aoSalvarTarefa="salvarTarefa" />
			<div class="lista">
				<TarefaVue
					v-for="(tarefa, index) in tarefas"
					:key="index"
					:tarefa="tarefa"
				/>
			<BoxVue v-if="listaVazia">
				<div> Você não está muito produtivo hoje ! :'( </div>
			</BoxVue>
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
	import BoxVue from './components/Box.vue';


	export default defineComponent({
		name: 'App',
		components: {
			BarraLateralVue,
			FormularioVue,
			TarefaVue,
			BoxVue,
		},
		data() {
			return {
				tarefas: [] as ITarefa[],
				modoEscuroAtivo: false
			}
		},
		computed:{
			listaVazia() : boolean{
				return this.tarefas.length === 0;
			}
		},
		methods: {
			salvarTarefa(tarefa: ITarefa) {
				this.tarefas.push(tarefa);
			},
			trocarTema(modoEscuroAtivo: boolean){
				this.modoEscuroAtivo = modoEscuroAtivo
			}
		}
	});
</script>

<style lang="scss">
	.lista {
		padding: 1.25rem;
	}
	main {
		--bg-primario:#fff;
		--texto-primario:#000;
	}
	main.modo-escuro{
		--bg-primario:#2b2d42;
		--texto-primario:#ddd;
	}
	.conteudo{
		background: var(--bg-primario);
		color: var(--texto-primario)
	}
</style>
