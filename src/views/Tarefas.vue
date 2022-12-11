<template>
	<FormularioVue @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<BoxVue v-if="listaVazia">
			<div> Você não está muito produtivo hoje ! :'( </div>
		</BoxVue>
		<TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
			@aoTarefaClicada="selecionarTarefa" />
		<div class="modal" :class="{ 'is-active': tarefaSelecionada }" v-if="tarefaSelecionada">
			<div class="modal-background"></div>
			<div class="modal-card">
				<header class="modal-card-head">
					<p class="modal-card-title">Editanto uma tarefa</p>
					<button @click="fecharModal" class="delete" aria-label="close"></button>
				</header>
				<section class="modal-card-body">
					<div class="field">
						<label for="descricaoTarefa" class="label">
							Descrição da tarefa
						</label>
						<input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa">
					</div>
				</section>
				<footer class="modal-card-foot">
					<button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
					<button @click="fecharModal" class="button">Cancel</button>
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
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipos-acoes';
import { computed } from '@vue/reactivity';
import ITarefa from '@/Interfaces/ITarefa';


export default defineComponent({
	name: 'App',
	components: {
		FormularioVue,
		TarefaVue,
		BoxVue,
	},
	data() {
		return {
			tarefaSelecionada: null as ITarefa | null
		}
	},
	methods: {
		salvarTarefa(tarefa: ITarefa): void {
			this.store.dispatch(CADASTRAR_TAREFA, tarefa);
		},
		selecionarTarefa(tarefa: ITarefa) {
			this.tarefaSelecionada = tarefa
		},
		fecharModal() {
			this.tarefaSelecionada = null
		},
		alterarTarefa() {
			this.store.dispatch(ALTERAR_TAREFA, this.tarefaSelecionada)
				.then(() => this.fecharModal())
		}
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