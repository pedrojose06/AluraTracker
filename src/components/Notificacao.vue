<template>
	<h1>
		<div class="notificacoes">
			<article
				class="message {{notificacao.classe}}"
                :class="contexto[notificacao.tipo] "
				v-for="notificacao in notificacoes"
				:key="notificacao.id"
			>
				<div class="message-header">
					{{notificacao.titulo}}
				</div>
				<div class="message-body">
					{{notificacao.texto}}
				</div>
			</article>
		</div>
	</h1>
</template>
<script lang="ts">
	import { computed, defineComponent } from 'vue'
	import { useStore } from '@/store'
import { TipoNotificacao } from '@/Interfaces/INotificacao'

	export default defineComponent({
		name: 'NotificacoesVue',
        data(){
            return {
                contexto: {
                    [TipoNotificacao.SUCESSO]: 'is-success',
                    [TipoNotificacao.ATENCAO]: 'is-warning',
                    [TipoNotificacao.FALHA]: 'is-danger'
                }
            }
        },
		setup() {
			const store = useStore()
			return {
				notificacoes: computed(() => store.state.notificacoes)
			}
		}
	})

</script>
<style scoped>
	.notificacoes {
		position: absolute;
		top: 0;
		right: 0;
		width: 300px;
		padding: 0.5rem;
		z-index: 3;
	}
</style>