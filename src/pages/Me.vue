<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <p>Olá, {{ user.user_metadata.usuario }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "../composables/UseAuthUser";

export default defineComponent({
  name: "PageMe",
  setup() {
    const { user } = useAuthUser();

    return {
      user,
    };
  },
});
</script>
