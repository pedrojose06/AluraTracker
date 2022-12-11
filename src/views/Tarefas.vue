<template>
	<FormularioVue @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<BoxVue v-if="listaVazia">
			<div> Você não está muito produtivo hoje ! :'( </div>
		</BoxVue>
		<TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
		<div class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Modal title</p>
					<button class="delete" aria-label="close"></button>
				</header>
				<section class="modal-card-body">
					<!-- Content ... -->
				</section>
				<footer class="modal-card-foot">
					<button class="button is-success">Save changes</button>
					<button class="button">Cancel</button>
				</footer>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import FormularioVue from '../components/Formulario.vue';
import TarefaVue from '../components/Tarefa.vue';
import BoxVue from '../components/Box.vue';
import { useStore } from '@/store';
import { CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipos-acoes';
import { computed } from '@vue/reactivity';
import ITarefa from '@/Interfaces/ITarefa';


export default defineComponent({
	name: 'App',
	components: {
		FormularioVue,
		TarefaVue,
		BoxVue,
	},
	methods: {
		salvarTarefa(tarefa: ITarefa): void {
			this.store.dispatch(CADASTRAR_TAREFA, tarefa);
		},
	},
	computed: {
		listaVazia(): boolean {
			return this.tarefas.length === 0;
		}
	},
	setup() {
		const store = useStore()
		store.dispatch(OBTER_TAREFAS)
		store.dispatch(OBTER_PROJETOS)
		return {
			tarefas: computed(() => store.state.tarefas),
			store
		}
	}
});
</script>