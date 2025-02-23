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
                              <th class="text-center">Acciones</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="product in displayedProducts" :key="product.id">
                              <td>{{ product.name }}</td>
                              <td>{{ product.description }}</td>
                              <td class="text-right">${{ product.price.toFixed(2) }}</td>
                              <td class="text-right">{{ product.stockQuantity }}</td>
                              <td>
                                  <v-btn fab dark small color="red" @click="deleteProductHandler(product.id)">
                                      <v-icon dark>mdi-delete</v-icon>
                                  </v-btn>
                              </td>
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

      <v-dialog v-model="confirmDialog" max-width="500">
          <v-card>
              <v-card-title class="headline">¿Desea eliminar el registro?</v-card-title>
              <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text @click="confirmDialog = false">Cancelar</v-btn>
                  <v-btn color="error" text @click="confirmDeleteProduct">Eliminar</v-btn>
              </v-card-actions>
          </v-card>
      </v-dialog>

      <v-snackbar v-model="snackbar" :timeout="5000">
          {{ snackbarMessage }}
          <template v-slot:actions>
              <v-btn color="pink" variant="text" @click="snackbar = false">Cerrar</v-btn>
          </template>
      </v-snackbar>
  </v-container>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { fetchProducts, deleteProduct } from '../services/api';

export default {
  setup() {
      const products = ref([]);
      const page = ref(1);
      const itemsPerPage = ref(10);
      const confirmDialog = ref(false);
      const productIdToDelete = ref(null);
      const snackbar = ref(false); // Variable para controlar el snackbar
      const snackbarMessage = ref(''); // Variable para el mensaje del snackbar

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

      const deleteProductHandler = (productId) => {
          productIdToDelete.value = productId;
          confirmDialog.value = true;
      };

      const confirmDeleteProduct = async () => {
          try {
              await deleteProduct(productIdToDelete.value);
              products.value = await fetchProducts();
              confirmDialog.value = false;
              snackbarMessage.value = 'Producto eliminado con éxito';
              snackbar.value = true;
          } catch (error) {
              console.error('Error al eliminar el producto:', error);
              alert('No se pudo eliminar el producto. Inténtalo de nuevo.');
          }
      };

      return { products, page, totalPages, displayedProducts, paginate, deleteProductHandler, confirmDialog, confirmDeleteProduct, snackbar, snackbarMessage };
  }
};
</script>

<style scoped>
.product-list-card {
  background-color: #e0f7fa;
}

.product-list-title {
  color: #2196f3;
}

.product-list-table {
  border-collapse: collapse;
  width: 100%;
}

.product-list-table th,
.product-list-table td {
  border: 1px solid #bbdefb;
  padding: 8px;
  text-align: left;
}

.product-list-table th {
  background-color: #2196f3;
  color: #ffffff;
}

.product-list-pagination {
  margin-top: 16px;
}
</style>