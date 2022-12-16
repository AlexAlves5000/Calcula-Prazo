<template>
  <q-page padding>
    <p class="text-h4 text-center">Contagem de Prazo</p>
    <div class="row">
      <!-- Área do formulário -->
      <div class="col-sm-12 col-12 col-md-8 gb-ligth">
        <div class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="row justify-between">
              <div class="bg-grey-2 q-pa-sm rounded-borders col-5">
                <label class="text-h6">Sistema:</label>
                <q-option-group
                  name="sistema"
                  v-model="sistema"
                  :options="options"
                  color="primary"
                  inline
                />
              </div>

              <div class="bg-grey-2 q-pa-sm rounded-borders col-5">
                <label class="text-h6">Forma de Contagem:</label>
                <q-option-group
                  name="tipoContagem"
                  v-model="formaContagem"
                  :options="optionsContagem"
                  color="primary"
                  inline
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 col-sm-3 col-md-3">
                <label class="text-h6">Dia do Evento:</label>
                <q-input type="date" outlined></q-input>
              </div>
            </div>

            <div class="row justify-between bg-grey-2 q-pa-sm">
              <p class="text-h6 col-12 text-weight-bolder">PRAZOS:</p>
              <div class="col-4 bg-grey-2 q-pa-md">
                <label class="text-h6">Prazo 1 (Em Dias)</label>
                <q-input v-model.number="model" type="number" outlined />
                <label class="text-h6">Data Final</label>
                <q-input v-model.number="model" outlined disable="" />
                <div class="row justify-center">
                  <q-btn
                    label="Relatório"
                    type="submit"
                    color="secondary"
                    class="q-mt-lg"
                  />
                </div>
              </div>
              <div class="col-4 bg-grey-3 q-pa-md">
                <label class="text-h6">Prazo 2 (Em Dias)</label>
                <q-input v-model.number="model" type="number" outlined />
                <label class="text-h6">Data Final</label>
                <q-input v-model.number="model" outlined disable="" />
                <div class="row justify-center">
                  <q-btn
                    label="Relatório"
                    type="submit"
                    color="secondary"
                    class="q-mt-lg"
                  />
                </div>
              </div>
              <div class="col-4 bg-grey-2 q-pa-md">
                <label class="text-h6">Prazo 3 (Em Dias)</label>
                <q-input v-model.number="model" type="number" outlined />
                <label class="text-h6">Data Final</label>
                <q-input v-model.number="model" outlined disable="" />
                <div class="row justify-center">
                  <q-btn
                    label="Relatório"
                    type="submit"
                    color="secondary"
                    class="q-mt-lg"
                  />
                </div>
              </div>
            </div>
            <div class="row justify-center q-pa-md">
              <q-btn
                label="Calcular Prazo"
                type="submit"
                color="primary"
                class="text-h6"
              />
            </div>
          </q-form>
        </div>
      </div>

      <!-- Área de Calendários -->
      <div class="col-sm-12 col-md-4 col-12">
        <div class="row q-pa-md justify-center">
          <q-date v-model="date" today-btn />
        </div>
      </div>
    </div>

    <!-- <div v-if="user">
      <p>Olá, {{ user.user_metadata.usuario }}</p>
    </div> -->
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import useAuthUser from "../composables/UseAuthUser";
import { ref } from "vue";

export default defineComponent({
  name: "PageMe",
  setup() {
    const { user } = useAuthUser();
    const submitResult = ref([]);
    const dataHoje = Date.now();
    const today = new Date(dataHoje);
    console.log(today);

    return {
      sistema: ref("1"),
      formaContagem: ref("1"),
      // accepted: ref([]),
      // submitResult,
      options: [
        {
          label: "eJUD",
          value: "1",
        },
        {
          label: "PJe",
          value: "2",
        },
      ],

      optionsContagem: [
        {
          label: "Dia Útil",
          value: "1",
        },
        {
          label: "Dia Corrido",
          value: "2",
        },
      ],

      onSubmit(evt) {
        // const formData = new FormData(evt.target);
        // const data = [];
        // for (const [name, value] of formData.entries()) {
        //   data.push({
        //     name,
        //     value,
        //   });
        // }
        // submitResult.value = data;
      },

      user,
      date: ref(today),
    };
  },
});
</script>
