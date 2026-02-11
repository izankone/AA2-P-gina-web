<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useDataStore } from '../../stores/data'

const route = useRoute()
const router = useRouter()
const dataStore = useDataStore()

const isEdit = route.params.id !== undefined
const id = isEdit ? Number(route.params.id) : null

const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio'),
  description: yup.string().required('La descripción es obligatoria')
})

const { handleSubmit } = useForm({ validationSchema: schema })

const { value: name, errorMessage: nameError } = useField('name')
const { value: description, errorMessage: descriptionError } = useField('description')

onMounted(async () => {
    if (isEdit) {
        await dataStore.fetchCategories()
        const category = dataStore.categories.find(c => c.id === id)
        if (category) {
            name.value = category.name
            description.value = category.description
        }
    }
})

const submit = handleSubmit(async (values) => {
    // Implement create/update category in store logic
    router.push('/admin/categories')
})
</script>

<template>
  <v-container>
    <v-card width="600" class="mx-auto pa-4">
        <v-card-title>{{ isEdit ? 'Editar Categoría' : 'Crear Categoría' }}</v-card-title>
        <v-card-text>
            <form @submit.prevent="submit">
                <v-text-field v-model="name" :error-messages="nameError" label="Nombre"></v-text-field>
                <v-text-field v-model="description" :error-messages="descriptionError" label="Descripción"></v-text-field>
                <v-btn type="submit" color="primary" block class="mt-4">Guardar</v-btn>
            </form>
        </v-card-text>
    </v-card>
  </v-container>
</template>
