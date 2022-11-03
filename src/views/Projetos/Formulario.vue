<template>
	<section>
		<form @submit.prevent="salvar">
			<div class="field">
				<label
					for="nomedoProjeto"
					class="labe"
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
	import { EDITA_PROJETO, ADICIONA_PROJETO } from '@/store/tipos-mutacoes';
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
					this.store.commit(EDITA_PROJETO,  {
						id: this.id,
						nome: this.nomeDoProjeto,
					})
				}
				else {
					this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto)
				}
				this.nomeDoProjeto = '';
				this.notificar(TipoNotificacao.SUCESSO, 'Excelente', 'Projeto adicionado a lista')
				this.$router.push('/projetos')
			},

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
