<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassowrd">
      <p class="col-12 text-h5 text-center">Recuperar Senha</p>

      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-sm">
        <q-input
          outlined
          label="Email"
          v-model="email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email requerido']"
          type="email"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Enviar Email"
            color="primary"
            class="full-width"
            outlined
            size="lg"
            type="submit"
          />
        </div>

        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Voltar"
            color="dark"
            class="full-width"
            flat
            :to="{ name: 'login' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "../composables/UseNotify";
// import { useQuasar } from "quasar";

export default defineComponent({
  setup() {
    const { sendPasswordRestEmail } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const email = ref("");
    const router = useRouter();
    // const $q = useQuasar();

    const handleForgotPassowrd = async () => {
      try {
        console.log(email.value);
        await sendPasswordRestEmail(email.value);
        router.push({ name: "login" });
        notifySuccess(`Senha recuperada enviada para email: ${email.value}`);
      } catch (error) {
        notifyError(`Ocorreu o seguinte erro: ${error.message}`);
      }
    };

    return {
      email,
      handleForgotPassowrd,
    };
  },
});
</script>
