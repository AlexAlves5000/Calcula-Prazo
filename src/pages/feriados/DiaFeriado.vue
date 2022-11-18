<template>
  <q-page padding>
    <div class="row">
      <q-table :rows="rows" :columns="columns" row-key="date" class="col-12">
        <template v-slot:top>
          <span class="text-h6"> Feriados </span>
          <q-space />
          <q-btn label="Adicionar" color="positive" />
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
  { name: "date", align: "left", label: "Data", field: "date", sortable: true },
  { name: "feriado", align: "left", label: "Feriado", field: "feriado" },
  { name: "sistema", align: "center", label: "Sistemas", field: "sistema" },
  { name: "actions", align: "center", label: "Ações", field: "actions" },
];

const rows = [
  {
    date: "15/11/2022",
    feriado: "Proclamação da Republica",
    sistema: "PJE/eJUD",
    actions: 87,
  },
];

import { defineComponent } from "vue";

export default defineComponent({
  name: "PageListaFeriados",
  setup() {
    return {
      columns,
      rows,
    };
  },
});
</script>
