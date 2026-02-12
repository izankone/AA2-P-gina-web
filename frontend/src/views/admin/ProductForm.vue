<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useProductStore } from '../../stores/products'
import { useCategoryStore } from '../../stores/categories'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const categoryStore = useCategoryStore()
const { t } = useI18n()

const isEdit = route.params.id !== undefined
const id = isEdit ? Number(route.params.id) : null

// Esquema de validación
const schema = yup.object({
  name: yup.string().required(),
  price: yup.number().required().min(0),
  stock: yup.number().required().min(0).integer(),
  categoryId: yup.number().required(),
  image: yup.string().url().nullable()
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
  await categoryStore.fetchCategories()
  if (isEdit) {
    // Si no tenemos los productos cargados, quizás deberíamos cargar, 
    // pero asumimos que venimos del listado o cargamos todo.
    // Para asegurar, podríamos llamar a fetchProducts si products esta vacío.
    if (productStore.products.length === 0) {
        await productStore.fetchProducts()
    }
    
    const product = productStore.products.find(p => p.id === id)
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
    await productStore.updateProduct({ id, ...values } as any)
  } else {
    await productStore.createProduct(values as any)
  }
  router.push('/admin/products')
})
</script>

<template>
  <v-container>
    <v-card width="600" class="mx-auto pa-4">
        <v-card-title>{{ isEdit ? t('products.edit') : t('products.create') }}</v-card-title>
        <v-card-text>
            <form @submit.prevent="submit">
                <v-text-field
                    v-model="name"
                    :error-messages="nameError"
                    :label="t('products.name')"
                ></v-text-field>

                <v-text-field
                    v-model="price"
                    :error-messages="priceError"
                    :label="t('products.price')"
                    type="number"
                ></v-text-field>

                <v-text-field
                    v-model="stock"
                    :error-messages="stockError"
                    :label="t('products.stock')"
                    type="number"
                ></v-text-field>

                <v-select
                    v-model="categoryId"
                    :error-messages="categoryIdError"
                    :items="categoryStore.categories"
                    item-title="name"
                    item-value="id"
                    :label="t('products.category')"
                ></v-select>

                 <v-text-field
                    v-model="image"
                    :error-messages="imageError"
                    :label="t('products.image')"
                ></v-text-field>

                <v-btn type="submit" color="primary" block class="mt-4">{{ t('common.save') }}</v-btn>
            </form>
        </v-card-text>
    </v-card>
  </v-container>
</template>
