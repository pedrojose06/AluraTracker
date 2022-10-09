<template>
	<div class="box has-test-weight-bold" :style="estilo">
        <slot></slot>
	</div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue'
	export default defineComponent({
        name: 'BoxVue',
		data(){
			return{
				estilo: {
					backgroundColor:'#faf0ca'
				}
			}
		}
	})

</script>