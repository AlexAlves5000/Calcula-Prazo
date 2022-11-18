<template>
  <q-page padding>
    <div class="container">
      <div class="row col-12 bg-secondary justify-center">
        <p class="text-h5">Cadastro de Feriados</p>
      </div>
      <div class="bg-grey-2 q-pa-sm rounded-borders">
        Feriado/Dia não útil aplicável(is) em qual(is) sistema(s):
        <q-option-group
          name="accepted_genres"
          v-model="accepted"
          :options="options"
          type="checkbox"
          color="primary"
          inline
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
// import useApi from "../../composables/UserApi";
// import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageAdicionarFeriado",

  setup() {
    const submitResult = ref([]);

    // const feriados = ref([]);
    // const loading = ref(true);
    // const { list } = useApi();
    // const { notifyError } = useNotify();
    // const pagination = ref({
    //   rowsPerPage: 10,
    // });

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
      accepted: ref(["ejud", "pje"]),
      submitResult,

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
