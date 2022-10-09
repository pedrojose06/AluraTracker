<template>
	<header>
		<h1>
			<img
			src="../assets/logo.png"
			alt="logo"
			/>
			<button class="button" @click="alterarTema">{{textoDoBotao}}</button>
		</h1>
	</header>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	export default defineComponent({
		name: 'BarraLateral',
		emits:['aoTemaAlterado'],
		data (){
			return {
				modoEscuroAtivo:false
			}
		},
		computed:{
			textoDoBotao(){
				return this.modoEscuroAtivo ? 'Desativar modo escuro' : 'Ativar modo escuro'
			}
		},
		methods:{
			alterarTema(){
				this.modoEscuroAtivo = !this.modoEscuroAtivo;
				this.$emit('aoTemaAlterado', this.modoEscuroAtivo);
			}

		},
	})
</script>

<style scoped>
	header {
		background: #0d3b66;
		width: 100%;
		height: 100vh;
		padding: 1rem;
		text-align: center;
	}
	@media only screen and (max-width: 768px) {
		header {
			padding: 2.5rem;
			height: auto;
		}
	}
</style>