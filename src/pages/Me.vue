<template>
  <q-page padding class="overflow-hidden-y">
    <p class="text-h4 text-center">Contagem de Prazo</p>
    <div class="row">
      <!-- Área do formulário -->
      <div class="col-sm-12 col-md-8 gb-ligth">
        <div class="q-pa-md">
          <q-form @submit="onSubmit" class="q-gutter-md">
            <div class="bg-grey-2 q-pa-sm rounded-borders">
              Sistema:
              <q-option-group
                name="sistema"
                v-model="sistema"
                :options="options"
                color="primary"
                inline
              />
            </div>

            <div class="bg-grey-2 q-pa-sm rounded-borders">
              Forma de Contagem:
              <q-option-group
                name="tipoContagem"
                v-model="formaContagem"
                :options="optionsContagem"
                color="primary"
                inline
              />
            </div>

            <!-- <div class="q-pa-md col-12 col-sm-3 col-md-3">
              <label>Data do Feriado</label>
              <q-input type="date" v-model="form.data" outlined> </q-input>
            </div> -->

            <div>
              <q-btn label="Calcular Prazo" type="submit" color="primary" />
            </div>
          </q-form>

          <q-card
            v-if="submitResult.length > 0"
            flat
            bordered
            class="q-mt-md bg-grey-2"
          >
            <q-card-section
              >Submitted form contains the following formData (key =
              value):</q-card-section
            >
            <q-separator />
            <q-card-section class="row q-gutter-sm items-center">
              <div
                v-for="(item, index) in submitResult"
                :key="index"
                class="q-px-sm q-py-xs bg-grey-8 text-white rounded-borders text-center text-no-wrap"
              >
                {{ item.name }} = {{ item.value }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Área de Calendários -->
      <div class="col-sm-12 col-md-4">
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
      accepted: ref([]),
      submitResult,

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
        const formData = new FormData(evt.target);
        const data = [];

        for (const [name, value] of formData.entries()) {
          data.push({
            name,
            value,
          });
        }

        submitResult.value = data;
      },

      user,
      date: ref(today),
    };
  },
});
</script>
