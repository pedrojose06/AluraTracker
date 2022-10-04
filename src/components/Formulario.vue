<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário Teste">
                <input type="text" class="input" placeholder="Qual tarefa deseja iniciar?" />
            </div>

            <div class="column">
                <div class="is-flex is-align-items-center is-justify-content-space-between">
                    <section>
                        <strong>00:00:00</strong>
                    </section>
                    <button class="button">
                        <span class="icon">
                            <i class="fas fa-play"></i>
                        </span>
                        <span>play</span>
                    </button>
                    <button class="button">
                        <span class="icon">
                            <i class="fas fa-stop"></i>
                        </span>
                        <span>stop</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name: "FormularioVue",
});
</script>
