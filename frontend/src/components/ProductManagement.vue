<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="product-management-card">
                    <v-card-title class="product-management-title">Gestión de Productos</v-card-title>

                    <v-form @submit.prevent="createProductHandler">
                        <v-text-field v-model="newProduct.name" label="Nombre"></v-text-field>
                        <v-text-field v-model="newProduct.description" label="Descripción"></v-text-field>
                        <v-text-field v-model="newProduct.price" label="Precio" type="number"></v-text-field>
                        <v-text-field v-model="newProduct.stockQuantity" label="Cantidad en Stock" type="number"></v-text-field>
                        <v-btn type="submit" color="primary">Crear Producto</v-btn>
                    </v-form>

                    <v-list>
                        <v-list-item v-for="product in products" :key="product.id">
                            <v-list-item-content>
                                <v-list-item-title>{{ product.name }} - ${{ product.price.toFixed(2) }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                                <v-btn icon @click="deleteProductHandler(product.id)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </v-list-item-action>
                        </v-list-item>
                    </v-list>

                    <v-card class="products-report-card">
                        <v-card-title class="products-report-title">Reporte de Productos (Precio > 50, Stock < 20)</v-card-title>
                        <v-list>
                            <v-list-item v-for="product in productsReport" :key="product.id">
                                <v-list-item-content>
                                    <v-list-item-title>{{ product.name }} - ${{ product.price.toFixed(2) }} (Stock: {{ product.stockQuantity }})</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-card>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref, onMounted } from 'vue';
import { fetchProducts, createProduct, deleteProduct, fetchProductsReport } from '../services/api';

export default {
    setup() {
        const products = ref([]);
        const productsReport = ref([]);
        const newProduct = ref({
            name: '',
            description: '',
            price: 0,
            stockQuantity: 0
        });

        onMounted(async () => {
            products.value = await fetchProducts();
            productsReport.value = await fetchProductsReport();
        });

        const createProductHandler = async () => {
            await createProduct(newProduct.value);
            products.value = await fetchProducts();
            newProduct.value = { name: '', description: '', price: 0, stockQuantity: 0 };
            productsReport.value = await fetchProductsReport();
        };

        const deleteProductHandler = async (productId) => {
            await deleteProduct(productId);
            products.value = await fetchProducts();
            productsReport.value = await fetchProductsReport();
        };

        return { products, productsReport, newProduct, createProductHandler, deleteProductHandler };
    }
};
</script>

<style scoped>
.product-management-card {
    background-color: #e8f5e9; /* Verde claro para la tarjeta */
}

.product-management-title {
    color: #4caf50; /* Verde para el título */
}

.products-report-card {
    margin-top: 20px;
    background-color: #fff3e0; /* Naranja claro para el reporte */
}

.products-report-title {
    color: #ff9800; /* Naranja para el título del reporte */
}
</style>