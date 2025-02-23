<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="create-product-card">
                    <v-card-title class="create-product-title">Crear Nuevo Producto</v-card-title>
                    <v-form @submit.prevent="createProduct">
                        <v-text-field v-model="product.name" label="Nombre" required></v-text-field>
                        <v-textarea v-model="product.description" label="Descripción"></v-textarea>
                        <v-text-field v-model="product.price" label="Precio" type="number" required></v-text-field>
                        <v-text-field v-model="product.stockQuantity" label="Cantidad en Stock" type="number" required></v-text-field>
                        <v-btn type="submit" color="primary">Crear</v-btn>
                        <v-btn class="mx-2" @click="cancel">Cancelar</v-btn>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>

        <v-snackbar v-model="snackbar" :timeout="5000"> {{ snackbarMessage }}
            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">Cerrar</v-btn>
            </template>
        </v-snackbar>
    </v-container>
</template>

<script>
import { ref } from 'vue';
import { createProduct as createProductApi } from '../services/api';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const product = ref({
            name: '',
            description: '',
            price: null,
            stockQuantity: null,
        });
        const router = useRouter();
        const snackbar = ref(false);
        const snackbarMessage = ref('');

        const createProduct = async () => {
            try {
                await createProductApi(product.value);
                snackbarMessage.value = 'Producto creado con éxito';
                snackbar.value = true;
                setTimeout(() => { // Agrega un retraso antes de la redirección
                    router.push('/products');
                }, 1000); // 1000 ms = 1 segundo
            } catch (error) {
                console.error('Error al crear el producto:', error);
                alert('No se pudo crear el producto. Inténtalo de nuevo.');
            }
        };

        const cancel = () => {
            router.push('/products');
        };

        return { product, createProduct, cancel, snackbar, snackbarMessage };
    }
};
</script>

<style scoped>
.create-product-card {
    background-color: #f0f8ff;
}

.create-product-title {
    color: #1e90ff;
}
</style>