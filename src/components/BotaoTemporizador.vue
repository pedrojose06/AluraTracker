<template>
	<button
		class="button"
		:disabled="cronometroRodando"
	>
		<span class="icon">
			<i :class="icone"></i>
		</span>
		<span>{{nome}}</span>
	</button>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	export default defineComponent({
		name: 'BotaoTemporizadorVue',
		props: {
			cronometroRodando: {
				type: Boolean,
				default: true
			},
			nome: {
				type: String,
				default: ''
			},
			icone: {
				type: String,
				default: ''
			},
		},
	})

</script>