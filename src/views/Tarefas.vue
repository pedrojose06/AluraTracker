<template>
    <FormularioVue @aoSalvarTarefa="salvarTarefa" />
    <div class="lista">
    <BoxVue v-if="listaVazia">
        <div> Você não está muito produtivo hoje ! :'( </div>
    </BoxVue>
        <TarefaVue
            v-for="(tarefa, index) in tarefas"
            :key="index"
            :tarefa="tarefa"
        />
    </div>
</template>

<script lang="ts">
	import { defineComponent } from 'vue';
	import FormularioVue from '../components/Formulario.vue';
	import TarefaVue from '../components/Tarefa.vue';
	import BoxVue from '../components/Box.vue';
	import ITarefa from '../Interfaces/ITarefa';


	export default defineComponent({
		name: 'App',
		components: {
			FormularioVue,
			TarefaVue,
			BoxVue,
		},
		data() {
			return {
				tarefas: [] as ITarefa[],
			}
		},
		methods: {
			salvarTarefa(tarefa: ITarefa) {
				this.tarefas.push(tarefa);
			},
		},
		computed:{
			listaVazia() : boolean{
				return this.tarefas.length === 0;
			}
		},
	});
</script>