<template>
  <q-page padding>
    <p class="text-body1">Obrigado por se registar!</p>
    <p class="text-body1">
      Favor confirmar o seu registro no email enviado para:
      <strong>{{ $route.query.email }}</strong>
    </p>
    <div class="row justify-center">
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-btn
          label="Voltar"
          color="dark"
          class="full-width"
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
