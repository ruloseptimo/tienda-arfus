<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="buyer-list-card">
            <v-card-title class="buyer-list-title">Reporte de Compradores</v-card-title>
            <v-table class="buyer-list-table">
              <thead>
                <tr>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Documento</th>
                  <th class="text-center">ID Transacción</th>
                  <th class="text-center">Precio Pagado</th>
                  <th class="text-center">Fecha Transacción</th>
                  <th class="text-center">ID Evento</th>
                  <th class="text-center">Tipo Evento</th>
                  <th class="text-center">Fecha Evento</th>
                  <th class="text-center">ID Producto</th>
                  <th class="text-center">Nombre Producto</th>
                  <th class="text-center">Descripción Producto</th>
                  <th class="text-center">Precio Producto</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="buyer in displayedBuyers" :key="buyer.transactionId">
                  <td>{{ buyer.firstName }} {{ buyer.lastName }}</td>
                  <td>{{ buyer.documentId }}</td>
                  <td class="text-right">{{ buyer.transactionId }}</td>
                  <td class="text-right">${{ buyer.pricePaid.toFixed(2) }}</td>
                  <td class="text-center">{{ new Date(buyer.transactionDate).toLocaleDateString() }}</td>
                  <td class="text-right">{{ buyer.buyerEventId }}</td>
                  <td class="text-center">{{ buyer.eventType }}</td>
                  <td class="text-center">{{ new Date(buyer.eventDate).toLocaleDateString() }}</td>
                  <td class="text-right">{{ buyer.productId }}</td>
                  <td>{{ buyer.productName }}</td>
                  <td>{{ buyer.productDescription }}</td>
                  <td class="text-right">${{ buyer.productPrice.toFixed(2) }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-pagination
              v-model="page"
              :length="totalPages"
              @input="paginate"
              class="buyer-list-pagination"
            ></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { fetchBuyers } from '../services/api';
  
  export default {
    setup() {
      const buyers = ref([]);
      const page = ref(1);
      const itemsPerPage = ref(10);
  
      const totalPages = computed(() => Math.ceil(buyers.value.length / itemsPerPage.value));
  
      const displayedBuyers = computed(() => {
        const start = (page.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return buyers.value.slice(start, end);
      });
  
      onMounted(async () => {
        buyers.value = await fetchBuyers();
      });
  
      const paginate = (newPage) => {
        page.value = newPage;
      };
  
      return { buyers, page, totalPages, displayedBuyers, paginate };
    }
  };
  </script>
  
  <style scoped>
  .buyer-list-card {
    background-color: #e0f7fa; /* Celeste claro para la tarjeta */
  }
  
  .buyer-list-title {
    color: #2196f3; /* Azul para el título */
  }
  
  .buyer-list-table {
    border-collapse: collapse;
    width: 100%;
  }
  
  .buyer-list-table th,
  .buyer-list-table td {
    border: 1px solid #bbdefb; /* Azul claro para los bordes de la tabla */
    padding: 8px;
    text-align: left;
  }
  
  .buyer-list-table th {
    background-color: #2196f3; /* Azul para el encabezado de la tabla */
    color: #ffffff; /* Blanco para el texto del encabezado */
  }
  
  .buyer-list-pagination {
    margin-top: 16px; /* Espacio entre la tabla y la paginación */
  }
  </style>