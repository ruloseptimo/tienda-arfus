import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importa Vuetify
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'; // Importa los iconos de Material Design
import 'vuetify/styles' // Importa los estilos de Vuetify

const vuetify = createVuetify({
    components,
    directives,
});

const app = createApp(App);
app.use(router);
app.use(vuetify); // Usa Vuetify
app.mount('#app');