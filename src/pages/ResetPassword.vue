<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reiniciar Senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          outlined
          label="Nova Senha"
          v-model="password"
          lazy-rules
          type="password"
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Digite uma senha com no mínimo 6 caracteres',
          ]"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Cadastrar Nova Senha"
            color="primary"
            class="full-width"
            outlined
            size="lg"
            type="submit"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import useNotify from "../composables/UseNotify";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "PageResetPassword",

  setup() {
    const { resetPassword } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const router = useRouter();

    const password = ref("");

    const handlePasswordReset = async () => {
      try {
        await resetPassword(password.value);
        notifySuccess("Nova senha cadastrada!");
        router.push({ name: "login" });
      } catch (error) {
        notifyError(`Ocorreu o seguinte erro: ${error.message}`);
      }
    };
    return {
      password,
      handlePasswordReset,
    };
  },
});
</script>
