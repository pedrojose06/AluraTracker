<template>
	<section>
		<form @submit.prevent="salvar">
			<div class="field">
				<label for="nomedoProjeto" class="label">
					Nome do Projeto
				</label>
				<input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
			</div>
			<div class="field">
				<button class="button" type="submit">
					Salvar
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from '@/store';
import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipos-acoes';
import { TipoNotificacao } from '@/Interfaces/INotificacao'
import useNotificador from '@/hook/notificador'
import {  useRouter } from 'vue-router';

export default defineComponent({
	name: 'FormularioVue',
	props: {
		id: {
			type: String
		}
	},
	setup(props) {
		const router = useRouter()
		const store = useStore()
		const { notificar } = useNotificador()
		const nomeDoProjeto = ref('')

		if (props.id) {
			const projeto = store.state.projeto.projetos.find(
				(proj) => proj.id == props.id
			);
			nomeDoProjeto.value = projeto?.nome || '';

		}

		const lidarComsucesso = () =>  {
			nomeDoProjeto.value = '';
			notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto adicionado a lista')
			router.push('/projetos')
		}

		const salvar = () =>  {
			if (props.id) {
				store
					.dispatch(ALTERAR_PROJETO, {
					id: props.id,
					nome: nomeDoProjeto.value,
				})
					.then(() => lidarComsucesso())
			}
			else {
				store
					.dispatch(CADASTRAR_PROJETO, nomeDoProjeto.value)
					.then(() => lidarComsucesso())
			}
		}

		return {
			nomeDoProjeto,
			salvar
		}
	}
})
</script>
