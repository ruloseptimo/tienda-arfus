<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="buyer-events-card">
                    <v-card-title class="buyer-events-title">Crear Evento de Comprador</v-card-title>
                    <v-card-text>
                        <v-text-field v-model="newEvent.buyerId" label="ID Comprador"></v-text-field>
                        <v-select v-model="newEvent.eventType" :items="eventTypes" label="Tipo de Evento"></v-select>
                        <v-textarea v-model="newEvent.details" label="Detalles"></v-textarea>
                        <v-btn color="primary" @click="createEvent">Crear Evento</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import { ref } from 'vue';
import { createBuyerEvent } from '../services/api';

export default {
    setup() {
        const newEvent = ref({
            buyerId: '',
            eventType: '',
            details: '',
        });
        const eventTypes = ['PURCHASE', 'REFUND', 'VISIT', 'DATA_CONSULTATION', 'DATA_UPDATE', 'INVOICE_DOWNLOAD'];

        const handleCreateEvent = async () => {
            await createBuyerEvent(newEvent.value);
            newEvent.value = { buyerId: '', eventType: '', details: '' };
        };

        return {
            newEvent,
            eventTypes,
            createEvent: handleCreateEvent,
        };
    },
};
</script>

<style scoped>
.buyer-events-card {
    background-color: #fff3e0; /* Naranja claro */
}

.buyer-events-title {
    color: #ff9800; /* Naranja */
}
</style>