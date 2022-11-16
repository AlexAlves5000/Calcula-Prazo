<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Entrar</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          outlined
          label="Email"
          v-model="form.email"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Email obrigatório!']"
          type="email"
        />

        <q-input
          outlined
          label="Senha"
          v-model="form.password"
          type="password"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Entre com uma senha!']"
        />

        <div class="full-width q-pt-md">
          <q-btn
            label="Entrar"
            color="primary"
            class="full-width"
            outlined
            size="lg"
            type="submit"
          />
        </div>
        <div class="full-width q-gutter-y-sm">
          <q-btn
            label="Registrar Usuário"
            color="primary"
            class="full-width"
            flat
            to="/register"
          />
          <q-btn
            label="Recuperar Senha"
            color="primary"
            class="full-width"
            flat
            :to="{ name: 'forgot-password' }"
          />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "../composables/UseAuthUser";
// import useAuthUser from "composables/UseAuthUser";
import useNotify from "../composables/UseNotify";
import { useRouter } from "vue-router";
// import { useQuasar } from "quasar";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();
    const { login, isLoggedIn } = useAuthUser();
    // const $q = useQuasar();

    const { notifyError, notifySuccess } = useNotify();
    const form = ref({
      email: "",
      password: "",
    });

    // Verifica se o usuário está logado e joga para página /me
    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: "me" });
      }
    });

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess("Login realizado com sucesso!");
        router.push({ name: "me" });
      } catch (error) {
        console.log(error);
        if (error.message == "Invalid login credentials") {
          notifyError("Informações do usuário não encontrados ou incorretas!");
        } else {
          notifyError(`Ocorreu o seguinte erro: ${error.message}`);
        }
      }
    };
    return {
      form,
      handleLogin,
    };
  },
});
</script>
