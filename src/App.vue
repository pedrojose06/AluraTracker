<template>
	<main class="columns is-gapless is-multiline" :class="{'modo-escuro': modoEscuroAtivo}">
		<div class="column is-one-quarter">
			<BarraLateralVue @aoTemaAlterado="trocarTema" />
		</div>
		<div class="column is-three-quarter conteudo">
			<NotificacoesVue />
			<router-view></router-view>
		</div>
	</main>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import BarraLateralVue from './components/BarraLateral.vue';
	import	NotificacoesVue from '../src/components/Notificacao.vue'


	export default defineComponent({
		name: 'App',
		components: {
			BarraLateralVue,
			NotificacoesVue
		},
		data() {
			return {
				modoEscuroAtivo: false
			}
		},
		methods: {
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
