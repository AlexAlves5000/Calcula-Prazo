<template>
  <q-page padding>
    <p class="text-h5 text-center">Registro de Feriados</p>

    <q-form class="" @submit.prevent="handleFeriado">
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
// import useApi from "../../composables/UserApi";
// import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageAdicionarFeriado",
  setup() {
    const form = ref({
      sistema: ["ejud", "pje"],
      data: "",
      feriado: "",
    });

    // const submitResult = ref([]);

    // const feriados = ref([]);
    // const loading = ref(true);
    // const { list } = useApi();
    // const { notifyError } = useNotify();
    // const pagination = ref({
    //   rowsPerPage: 10,
    // });

    const handleFeriado = "";

    // const handleListFeriados = async () => {
    //   try {
    //     loading.value = true;
    //     feriados.value = await list("FeriadosGerais");
    //     loading.value = false;
    //   } catch (error) {
    //     notifyError(error.message);
    //   }
    // };

    // onMounted(() => {
    //   handleListFeriados();
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

      // columns,
      // feriados,
      // loading,
      // pagination,
    };
  },
});
</script>
