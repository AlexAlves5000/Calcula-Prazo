<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { supabase } from "./boot/supabase";

export default defineComponent({
  name: "App",
});
</script>
