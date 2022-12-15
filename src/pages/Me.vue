<template>
  <q-page class="container">
    <div class="row justify-center">
      <h3>Contagem de Prazo</h3>
    </div>

    <div class="row">
      <!-- Área do formulário -->
      <div class="col-8 bg-amber">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus fuga
          dolor dicta, ratione totam assumenda architecto nostrum quo ex placeat
          illum sequi minus explicabo magnam quas nam nulla, voluptatem tempore.
        </p>
      </div>

      <!-- Área de Calendários -->
      <div class="col-4">
        <div class="row q-pa-md justify-center">
          <q-date v-model="date" today-btn />
        </div>
      </div>
    </div>

    <!-- <div v-if="user">
      <p>Olá, {{ user.user_metadata.usuario }}</p>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { ref } from "vue";

export default defineComponent({
  name: "PageMe",
  setup() {
    const { user } = useAuthUser();

    const dataHoje = Date.now();
    const today = new Date(dataHoje);
    console.log(today);

    return {
      user,
      date: ref(today),
    };
  },
});
</script>
