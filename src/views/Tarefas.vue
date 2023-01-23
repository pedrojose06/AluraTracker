<template>
	<FormularioVue @aoSalvarTarefa="salvarTarefa" />
	<div class="lista">
		<BoxVue v-if="listaVazia">
			<div> Você não está muito produtivo hoje ! :'( </div>
		</BoxVue>
		<div class="control has-icons-left has-icons-right pb-2">
			<input class="input" type="email" placeholder="Digite para filtrar" v-model="filtro">
			<span class="icon is-small is-left">
				<i class="fas fa-search"></i>

			</span>

		</div>
		<TarefaVue v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa"
			@aoTarefaClicada="selecionarTarefa" />

		<ModalVue :mostrar="tarefaSelecionada != null">
			<template v-slot:cabecalho>
				<p class="modal-card-title">Editanto uma tarefa</p>
				<button @click="fecharModal" class="delete" aria-label="close"></button>
			</template>
			<template v-slot:corpo>
				<div class="field">
					<label for="descricaoTarefa" class="label">
						Descrição da tarefa
					</label>
					<input type="text" class="input" v-model="tarefaSelecionada.descricao" id="descricaoTarefa">
				</div>
			</template>
			<template v-slot:rodape>
				<button @click="alterarTarefa" class="button is-success">Salvar alterações</button>
				<button @click="fecharModal" class="button">Cancel</button>
			</template>
		</ModalVue>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import FormularioVue from '../components/Formulario.vue';
import TarefaVue from '../components/Tarefa.vue';
import BoxVue from '../components/Box.vue';
import ModalVue from '../components/ModalVue.vue';
import { useStore } from '@/store';
import { ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_PROJETOS, OBTER_TAREFAS } from '@/store/tipos-acoes';
import ITarefa from '@/Interfaces/ITarefa';


export default defineComponent({
	name: 'App',
	components: {
		FormularioVue,
		TarefaVue,
		BoxVue,
		ModalVue,
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
		},
	},
	computed: {
		listaVazia(): boolean {
			return this.tarefas.length == 0;
		},
	},
	setup() {
		const store = useStore()

		store.dispatch(OBTER_TAREFAS)
		store.dispatch(OBTER_PROJETOS)

		const filtro = ref('')
		// const tarefas = computed(() =>
		// 	store.state.tarefas.filter(
		// 		(t) => !filtro.value || t.descricao.includes(filtro.value)
		// 		)
		// 	);
		watchEffect(() => {
			store.dispatch(OBTER_TAREFAS, filtro.value)
		}
		)

		return {
			tarefas: computed(() => store.state.tarefa.tarefas),
			store,
			filtro,

		}
	}
});
</script>