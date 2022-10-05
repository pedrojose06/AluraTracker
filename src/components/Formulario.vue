<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário Teste">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" />
            </div>

            <div class="column">
                <TemporizadorVue />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TemporizadorVue from "./Temporizador.vue";


export default defineComponent({
    name: "FormularioVue",
    components: {
        TemporizadorVue,
    },
})
</script>
