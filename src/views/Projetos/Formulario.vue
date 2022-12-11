<template>
	<section>
		<form @submit.prevent="salvar">
			<div class="field">
				<label
					for="nomedoProjeto"
					class="label"
				>
					Nome do Projeto
				</label>
				<input
					type="text"
					class="input"
					v-model="nomeDoProjeto"
					id="nomeDoProjeto"
				>
			</div>
			<div class="field">
				<button
					class="button"
					type="submit"
				>
					Salvar
				</button>
			</div>
		</form>
	</section>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import { useStore } from '@/store';
	import { CADASTRAR_PROJETO, ALTERAR_PROJETO } from '@/store/tipos-acoes';
	import { TipoNotificacao } from '@/Interfaces/INotificacao'
	import useNotificador from '@/hook/notificador'

	export default defineComponent({
		name: 'FormularioVue',
		props:{
			id: {
				type: String
			}
		},
		mounted(){
			if(this.id){
				const projeto = this.store.state.projetos.find(proj => proj.id == this.id)
				this.nomeDoProjeto = projeto?.nome || '';
			}
		},
		data() {
			return {
				nomeDoProjeto: '',
			}
		},
		methods: {
			salvar() {
				if (this.id){
					this.store.dispatch(ALTERAR_PROJETO,  {
						id: this.id,
						nome: this.nomeDoProjeto,
					})
					.then(() => this.lidarComsucesso())
				}
				else {
					this.store.dispatch(CADASTRAR_PROJETO, this.nomeDoProjeto)
						.then(() => this.lidarComsucesso())
				}

			},
			lidarComsucesso() {
				this.nomeDoProjeto = '';
							this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto adicionado a lista')
							this.$router.push('/projetos')
			}

		},
		setup() {
			const store = useStore()
			const {notificar} = useNotificador()
			return {
				store,
				notificar,
			}
		}
	})
</script>
