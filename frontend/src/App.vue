<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" app>
      <v-list density="compact" nav>
        <v-list-item prepend-icon="mdi-view-dashboard" title="Dashboard" :to="'/'"></v-list-item>
        <v-list-item prepend-icon="mdi-package-variant" title="Productos" :to="'/products'"></v-list-item>
        <v-list-item prepend-icon="mdi-account-multiple" title="Reporte Compradores" :to="'/buyers'"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="white--text">Shop arfus</v-app-bar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const drawer = ref(null);

    return { drawer };
  },
};
</script>