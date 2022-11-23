<template>
  <q-page padding class="overflow-hidden-y">
    <p class="text-h5 text-center">Registro de Feriados</p>

    <q-form @submit.prevent="handleFeriado">
      <div class="q-pa-md">
        <label>Feriado aplicável em qual(is) sistema(s):</label>
        <q-option-group
          name="accepted_genres"
          v-model="form.sistema"
          :options="options"
          type="checkbox"
          color="info"
          inline
          class="col-12"
        />
      </div>

      <div class="row">
        <div class="q-pa-md col-12 col-sm-3 col-md-3">
          <label>Data do Feriado</label>
          <q-input type="date" v-model="form.data" outlined> </q-input>
        </div>

        <div class="col-12 q-pa-md">
          <label>descrição do Feriado</label>
          <q-input
            outlined
            label="Feriado"
            v-model="form.feriado"
            lazy-rules
            class="col-12"
            :rules="[
              (val) =>
                (val && val.length > 0) || 'Digite a descrição do feriado',
            ]"
          />
        </div>
      </div>

      <div class="row justify-center q-gutter-md">
        <q-btn
          label="Registrar"
          color="primary"
          outlined
          size="md"
          type="submit"
        />
        <q-btn
          label="Voltar"
          color="secondary"
          size="md"
          outlined
          :to="{ name: 'diaferiado' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import useApi from "../../composables/UserApi";
import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageAdicionarFeriado",
  setup() {
    const table = "FeriadosGerais";
    const router = useRouter();
    const { post } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      sistema: ["ejud", "pje"],
      data: "",
      feriado: "",
    });

    const handleFeriado = async () => {
      if (form.value.sistema.length === 2) {
        form.value.sistema = 3;
      } else if (form.value.sistema[0] === "ejud") {
        form.value.sistema = 1;
      } else {
        form.value.sistema = 2;
      }

      try {
        await post(table, form.value);
        notifySuccess("Feriado cadastrado!");
        router.push({ name: "diaferiado" });
      } catch (error) {
        if (
          error.message ===
          'duplicate key value violates unique constraint "FeriadosGerais_data_key"'
        ) {
          notifyError("Data já cadastrada!");
        }
      }
    };

    // onMounted(() => {
    //   handleFeriado();
    // });

    return {
      form,
      handleFeriado,
      accepted: ref(["ejud", "pje"]),

      options: [
        {
          label: "eJUD",
          value: "ejud",
        },
        {
          label: "PJE",
          value: "pje",
        },
      ],
    };
  },
});
</script>
