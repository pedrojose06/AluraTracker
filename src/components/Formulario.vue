<template>
	<div class="box formulario">
		<div class="columns">
			<div
				class="column is-8"
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

			<div class="column">
				<TemporizadorVue @AoTemporizadorFinalizado="finalizarTarefa" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
	import {
		defineComponent
	} from "vue";
	import TemporizadorVue from "./Temporizador.vue";

	export default defineComponent({
		name: "FormularioVue",
		emits: ['aoSalvarTarefa'],
		components: {
			TemporizadorVue,
		},
		data() {
			return {
				descricao: ''
			}
		},
		methods: {
			finalizarTarefa(tempoDecorrido: number): void {
				this.$emit('aoSalvarTarefa', {
					duracaoSegundos: tempoDecorrido,
					descricao: this.descricao,
				})
				this.descricao = ''
			}
		}
	})
</script>
<style>
.formulario {
	color:var(--texto-primario);
	background: var(--bg-primario);
}
</style>