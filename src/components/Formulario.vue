<template>
	<div class="box formulario">
		<div class="columns">
			<div
				class="column is-5"
				role="form"
				aria-label="Formulário Teste"
			>
				<input
					type="text"
					class="input"
					placeholder="Qual tarefa deseja iniciar?"
					v-model="descricao"
				/>
			</div>
			<div class="column is-3">
				<div class="select">
					<select v-model="idProjeto">
						<option value="">Selecione o projeto</option>
						<option
							:value="projeto.id"
							v-for="projeto in projetos"
							:key="projeto.id"
						>
						{{projeto.nome}}
						</option>
					</select>
				</div>
			</div>

			<div class="column">
				<TemporizadorVue @AoTemporizadorFinalizado="finalizarTarefa" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		computed,
		defineComponent,
		ref
	} from "vue";
	import TemporizadorVue from "./Temporizador.vue";
	import { useStore } from "vuex"

	import { key } from '@/store'

	export default defineComponent({
		name: "FormularioVue",
		emits: ['aoSalvarTarefa'],
		components: {
			TemporizadorVue,
		},
		setup(props, { emit }) {
			const store = useStore(key)

			const descricao = ref("")
			const idProjeto = ref("")
			const projetos = computed(() => store.state.projeto.projetos)


			const finalizarTarefa = (tempoDecorrido: number): void => {
				emit('aoSalvarTarefa', {
					duracaoSegundos: tempoDecorrido,
					descricao: descricao.value,
					projeto: projetos.value.find(proj => proj.id == idProjeto.value)
				}),
				descricao.value = ''
			}
			return {
				descricao,
				idProjeto,
				projetos,
				finalizarTarefa

			}
		}
	})
</script>
<style>
	.formulario {
		color: var(--texto-primario);
		background: var(--bg-primario);
	}
</style>