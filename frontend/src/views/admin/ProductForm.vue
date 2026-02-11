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

// Esquema de validación
const schema = yup.object({
  name: yup.string().required('El nombre es obligatorio').min(3, 'Mínimo 3 caracteres'),
  price: yup.number().required('El precio es obligatorio').positive('Debe ser positivo'),
  stock: yup.number().required('El stock es obligatorio').integer('Debe ser entero').min(0),
  categoryId: yup.number().required('La categoría es obligatoria'),
  image: yup.string().url('Debe ser una URL válida').nullable()
})

const { handleSubmit, handleReset } = useForm({
  validationSchema: schema
})

// Campos
const { value: name, errorMessage: nameError } = useField('name')
const { value: price, errorMessage: priceError } = useField('price')
const { value: stock, errorMessage: stockError } = useField('stock')
const { value: categoryId, errorMessage: categoryIdError } = useField('categoryId')
const { value: image, errorMessage: imageError } = useField('image')

onMounted(async () => {
  await dataStore.fetchCategories()
  if (isEdit) {
    const product = dataStore.products.find(p => p.id === id)
    if (product) {
        name.value = product.name
        price.value = product.price
        stock.value = product.stock
        categoryId.value = product.categoryId
        image.value = product.image
    }
  }
})

const submit = handleSubmit(async (values) => {
  if (isEdit) {
    await dataStore.updateProduct({ id, ...values } as any)
  } else {
    await dataStore.createProduct(values as any)
  }
  router.push('/admin/products')
})
</script>

<template>
  <v-container>
    <v-card width="600" class="mx-auto pa-4">
        <v-card-title>{{ isEdit ? 'Editar Producto' : 'Crear Producto' }}</v-card-title>
        <v-card-text>
            <form @submit.prevent="submit">
                <v-text-field
                    v-model="name"
                    :error-messages="nameError"
                    label="Nombre"
                ></v-text-field>

                <v-text-field
                    v-model="price"
                    :error-messages="priceError"
                    label="Precio"
                    type="number"
                ></v-text-field>

                <v-text-field
                    v-model="stock"
                    :error-messages="stockError"
                    label="Stock"
                    type="number"
                ></v-text-field>

                <v-select
                    v-model="categoryId"
                    :error-messages="categoryIdError"
                    :items="dataStore.categories"
                    item-title="name"
                    item-value="id"
                    label="Categoría"
                ></v-select>

                 <v-text-field
                    v-model="image"
                    :error-messages="imageError"
                    label="URL Imagen"
                ></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-4">Guardar</v-btn>
            </form>
        </v-card-text>
    </v-card>
  </v-container>
</template>
