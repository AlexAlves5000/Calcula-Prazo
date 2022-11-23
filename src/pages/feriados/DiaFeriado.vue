<template>
  <q-page padding class="overflow-hidden-y">
    <div class="row">
      <q-table
        :rows="feriados"
        :columns="columns"
        row-key="data"
        class="col-12"
        :loading="loading"
        v-model:pagination="pagination"
      >
        <template v-slot:top>
          <span class="text-h6"> Feriados </span>
          <q-space />
          <q-btn
            label="Adicionar"
            color="positive"
            icon="mdi-plus"
            :to="{ name: 'formferiado' }"
          />
        </template>
        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-x-sm">
            <q-btn icon="mdi-pencil" color="info" dense>
              <q-tooltip class="bg-info" :offset="[10, 10]"> Editar </q-tooltip>
            </q-btn>
            <q-btn icon="mdi-delete-empty" color="negative" dense>
              <q-tooltip class="bg-negative" :offset="[10, 10]">
                Deletar
              </q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
const columns = [
  { name: "data", align: "left", label: "Data", field: "data", sortable: true },
  { name: "feriado", align: "left", label: "Feriado", field: "feriado" },
  { name: "sistema", align: "center", label: "Sistemas", field: "sistema" },
  { name: "actions", align: "center", label: "Ações", field: "actions" },
];

import { defineComponent, ref, onMounted } from "vue";
import useApi from "../../composables/UserApi";
import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageListaFeriados",

  setup() {
    const feriados = ref([]);
    const loading = ref(true);
    const { list } = useApi();
    const { notifyError } = useNotify();
    const pagination = ref({
      rowsPerPage: 10,
    });

    const handleListFeriados = async () => {
      try {
        loading.value = true;
        feriados.value = await list("FeriadosGerais");
        loading.value = false;
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      handleListFeriados();
    });

    return {
      columns,
      feriados,
      loading,
      pagination,
    };
  },
});
</script>
