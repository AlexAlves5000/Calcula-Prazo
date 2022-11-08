<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Calculadora de Prazo </q-toolbar-title>

        <q-btn-dropdown color="primary" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Desconectar</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Feriados",
    caption: "Cadastro de Feriados",
    icon: "school",
    link: "https://quasar.dev",
  },
  {
    title: "Github",
    caption: "github.com/quasarframework",
    icon: "code",
    link: "https://github.com/quasarframework",
  },
  {
    title: "Discord Chat Channel",
    caption: "chat.quasar.dev",
    icon: "chat",
    link: "https://chat.quasar.dev",
  },
  {
    title: "Forum",
    caption: "forum.quasar.dev",
    icon: "record_voice_over",
    link: "https://forum.quasar.dev",
  },
  {
    title: "Twitter",
    caption: "@quasarframework",
    icon: "rss_feed",
    link: "https://twitter.quasar.dev",
  },
  {
    title: "Facebook",
    caption: "@QuasarFramework",
    icon: "public",
    link: "https://facebook.quasar.dev",
  },
  {
    title: "Quasar Awesome",
    caption: "Community Quasar projects",
    icon: "favorite",
    link: "https://awesome.quasar.dev",
  },
];

import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
// import useApi from "src/composables/UseApi";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    const $q = useQuasar();

    const router = useRouter();

    const { logout } = useAuthUser();

    const handleLogout = async () => {
      $q.dialog({
        title: "Sair",
        message: "Você realmente deseja sair?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
    };
  },
});
</script>

<!-- <template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Estoque </q-toolbar-title>

        <q-btn-dropdown flat color="white" icon="person">
          <q-list>
            <q-item clickable v-close-popup @click="handleLogout">
              <q-item-section>
                <q-item-label>Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Menu </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition
          appear
          enter-active-class="animated fadeInUp"
          leave-active-class="animated fadeOutDown"
        >
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
const linksList = [
  {
    title: "Home",
    caption: "",
    icon: "mdi-home",
    routeName: "me",
  },
  {
    title: "Category",
    caption: "",
    icon: "mdi-shape-outline",
    routeName: "category",
  },
  {
    title: "Product",
    caption: "",
    icon: "mdi-archive",
    routeName: "product",
  },
  {
    title: "Config",
    caption: "",
    icon: "mdi-cog",
    routeName: "form-config",
  },
];
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
// import useApi from "src/composables/UseApi";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
export default defineComponent({
  name: "MainLayout",
  components: {
    EssentialLink,
  },
  setup() {
    const leftDrawerOpen = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const { logout } = useAuthUser();
    const { getBrand } = useApi();
    onMounted(() => {
      getBrand();
    });
    const handleLogout = async () => {
      $q.dialog({
        title: "Logout",
        message: "Do you really want to leave ?",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        await logout();
        router.replace({ name: "login" });
      });
    };
    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
      handleLogout,
    };
  },
});
</script> -->
