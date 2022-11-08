<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Registar Usuário</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          outlined
          label="Nome"
          v-model="form.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Digite um nome']"
        />

        <q-input
          outlined
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Digite um email válido',
          ]"
          type="email"
        />

        <q-input
          outlined
          label="Senha"
          v-model="form.password"
          lazy-rules
          type="password"
          :rules="[
            (val) =>
              (val && val.length >= 6) ||
              'Digite uma senha com no mínimo 6 caracteres',
          ]"
        />

        <div class="full-width q-pt-md q-gutter-y-sm">
          <q-btn
            label="Registar"
            color="primary"
            class="full-width"
            outlined
            size="lg"
            type="submit"
          />

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
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
// import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageRegister",
  setup() {
    const router = useRouter();
    const { register } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    // const $q = useQuasar();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });
    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
        notifySuccess(`Email de confirmação enviado para: ${form.value.email}`);
        // $q.dialog({
        //   title: "Email Enviado",
        //   message: `Email de confirmação enviado para: ${form.value.email}`,
        // });
      } catch (error) {
        notifyError(`Ocorreu o seguinte erro: ${error.message}`);
        // $q.dialog({
        //   title: "Erro",
        //   message: `Erro apresentado: ${error.message}`,
        // });
      }
    };
    return {
      form,
      handleRegister,
    };
  },
});
</script>
