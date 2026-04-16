import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Lazy loading views
const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const AdminLayout = () => import('../layouts/AdminLayout.vue')
const DashboardView = () => import('../views/admin/DashboardView.vue')
const OrderListView = () => import('../views/admin/OrderListView.vue')
const MyOrdersView = () => import('../views/MyOrdersView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../layouts/MainLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'home',
                    component: HomeView
                },
                {
                    path: 'my-orders',
                    name: 'my-orders',
                    component: MyOrdersView,
                    meta: { requiresAuth: true }
                }
            ]
        },
        {
            path: '/',
            component: () => import('../layouts/AuthLayout.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: LoginView
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('../views/RegisterView.vue')
                }
            ]
        },
        {
            path: '/admin',
            component: AdminLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '',
                    name: 'admin-dashboard',
                    component: DashboardView,
                    meta: { requiresAdmin: true }
                },
                {
                    path: 'products',
                    component: () => import('../views/admin/ProductList.vue'),
                    meta: { requiresAdmin: true }
                },
                {
                    path: 'products/create',
                    component: () => import('../views/admin/ProductForm.vue'),
                    meta: { requiresAdmin: true }
                },
                {
                    path: 'products/edit/:id',
                    component: () => import('../views/admin/ProductForm.vue'),
                    meta: { requiresAdmin: true }
                },
                {
                    path: 'categories',
                    component: () => import('../views/admin/CategoryList.vue'),
                    meta: { requiresSuperAdmin: true }
                },
                {
                    path: 'categories/create',
                    component: () => import('../views/admin/CategoryForm.vue'),
                    meta: { requiresSuperAdmin: true }
                },
                {
                    path: 'categories/edit/:id',
                    component: () => import('../views/admin/CategoryForm.vue'),
                    meta: { requiresSuperAdmin: true }
                },
                {
                    path: 'orders',
                    component: OrderListView,
                    meta: { requiresAdmin: true }
                }

            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    
    // Si la ruta requiere auth y no está logueado
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return next('/login')
    }

    // Si requiere ser Admin y no lo es (ni es SuperAdmin)
    if (to.meta.requiresAdmin && !authStore.isAdmin) {
        return next('/')
    }

    // Si requiere ser SuperAdmin y no lo es
    if (to.meta.requiresSuperAdmin && !authStore.isSuperAdmin) {
        return next('/admin')
    }

    next()
})

export default router
