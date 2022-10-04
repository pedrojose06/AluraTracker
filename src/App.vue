<template>
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <BarraLateralVue />
    </div>
    <div class="column is-three-quarter">
      <FormularioVue />
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BarraLateralVue from './components/BarraLateral.vue';
import FormularioVue from './components/Formulario.vue'


export default defineComponent({
  name: 'App',
  components: {
    BarraLateralVue,
    FormularioVue
}
});
</script>

<style lang="scss">

</style>
