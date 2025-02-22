<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="product-list-card">
            <v-card-title class="product-list-title">Lista de Productos</v-card-title>
            <v-btn :to="'/create'" class="mx-2 mb-2" fab dark color="indigo">
              <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <v-table class="product-list-table">
              <thead>
                <tr>
                  <th class="text-center">Nombre</th>
                  <th class="text-center">Descripción</th>
                  <th class="text-center">Precio</th>
                  <th class="text-center">Stock</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in displayedProducts" :key="product.id">
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td class="text-right">${{ product.price.toFixed(2) }}</td>
                  <td class="text-right">{{ product.stockQuantity }}</td>
                </tr>
              </tbody>
            </v-table>
            <v-pagination
              v-model="page"
              :length="totalPages"
              @input="paginate"
              class="product-list-pagination"
            ></v-pagination>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { fetchProducts } from '../services/api';
  
  export default {
    setup() {
      const products = ref([]);
      const page = ref(1);
      const itemsPerPage = ref(10); // Número de elementos por página
  
      const totalPages = computed(() => Math.ceil(products.value.length / itemsPerPage.value));
  
      const displayedProducts = computed(() => {
        const start = (page.value - 1) * itemsPerPage.value;
        const end = start + itemsPerPage.value;
        return products.value.slice(start, end);
      });
  
      onMounted(async () => {
        products.value = await fetchProducts();
      });
  
      const paginate = (newPage) => {
        page.value = newPage;
      };
  
      return { products, page, totalPages, displayedProducts, paginate };
    }
  };
  </script>
  
  <style scoped>
  .product-list-card {
    background-color: #e0f7fa; /* Celeste claro para la tarjeta */
  }
  
  .product-list-title {
    color: #2196f3; /* Azul para el título */
  }
  
  .product-list-table {
    border-collapse: collapse;
    width: 100%;
  }
  
  .product-list-table th,
  .product-list-table td {
    border: 1px solid #bbdefb; /* Azul claro para los bordes de la tabla */
    padding: 8px;
    text-align: left;
  }
  
  .product-list-table th {
    background-color: #2196f3; /* Azul para el encabezado de la tabla */
    color: #ffffff; /* Blanco para el texto del encabezado */
  }
  
  .product-list-pagination {
    margin-top: 16px; /* Espacio entre la tabla y la paginación */
  }
  </style>