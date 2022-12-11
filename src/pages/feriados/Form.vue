<template>
  <q-page padding class="overflow-hidden-y">
    <p class="text-h5 text-center">Registro de Feriados</p>

    <q-form @submit.prevent="handleFeriado">
      <div class="q-pa-md">
        <label>Feriado aplicável em qual(is) sistema(s):</label>
        <q-option-group
          v-model="form.sistema"
          :options="options"
          color="primary"
          inline
        />
      </div>

      <div class="row">
        <div class="q-pa-md col-12 col-sm-3 col-md-3">
          <label>Data do Feriado</label>
          <q-input type="date" v-model="form.data" outlined> </q-input>
        </div>

        <div class="col-12 q-pa-md">
          <label>Descrição do Feriado</label>
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
          :label="isUpdate ? 'Atualizar' : 'Registrar'"
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
import { defineComponent, ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useApi from "../../composables/UserApi";
import useNotify from "../../composables/UseNotify";

export default defineComponent({
  name: "PageAdicionarFeriado",
  setup() {
    const table = "FeriadosGerais";
    const router = useRouter();
    const route = useRoute();
    const { post, getById, update } = useApi();
    const { notifyError, notifySuccess } = useNotify();

    // verifica se existe um id na nossa rota o isUpdate recebe verdade ou falso
    const isUpdate = computed(() => route.params.id);

    let feriado = {};

    const form = ref({
      sistema: "3",
      data: "",
      feriado: "",
    });

    const handleFeriado = async () => {
      try {
        console.log(isUpdate.value);
        if (isUpdate.value) {
          console.log('Dados do formulário de update: ', form.value);
          await update(table, form.value);
          notifySuccess('Feriado atualizado!');
          router.push({ name: "diaferiado" });
        } else {
          console.log('Dados para cadastro de novo feriado: ', form.value)
          await post(table, form.value);
          notifySuccess("Feriado cadastrado!");
          router.push({ name: "diaferiado" });
        }
      } catch (error) {
        if (
          error.message ===
          'duplicate key value violates unique constraint "FeriadosGerais_data_key"'
        ) {
          notifyError("Data já cadastrada!");
        }
      }
    };

    const handleGetFeriado = async (id) => {
      try {
        feriado = await getById(table, id);
        form.value = feriado;
      } catch (error) {
        notifyError(error.message);
      }
    };

    onMounted(() => {
      if (isUpdate.value) {
        handleGetFeriado(isUpdate.value);
      }
      // handleFeriado();
    });

    return {
      form,
      handleFeriado,
      handleGetFeriado,
      isUpdate,

      group: ref(""),

      options: [
        {
          label: "e-JUD e PJe",
          value: "3",
        },
        {
          label: "e-JUD",
          value: "1",
        },
        {
          label: "PJe",
          value: "2",
        },
      ],
    };
  },
});
</script>
