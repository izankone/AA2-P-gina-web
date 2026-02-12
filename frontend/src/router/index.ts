import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

// Lazy loading views
const HomeView = () => import('../views/HomeView.vue')
const LoginView = () => import('../views/LoginView.vue')
const AdminLayout = () => import('../layouts/AdminLayout.vue')
const DashboardView = () => import('../views/admin/DashboardView.vue')

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
                    component: DashboardView
                },
                {
                    path: 'products',
                    component: () => import('../views/admin/ProductList.vue')
                },
                {
                    path: 'products/create',
                    component: () => import('../views/admin/ProductForm.vue')
                },
                {
                    path: 'products/edit/:id',
                    component: () => import('../views/admin/ProductForm.vue')
                },
                {
                    path: 'categories',
                    component: () => import('../views/admin/CategoryList.vue')
                },
                {
                    path: 'categories/create',
                    component: () => import('../views/admin/CategoryForm.vue')
                },
                {
                    path: 'categories/edit/:id',
                    component: () => import('../views/admin/CategoryForm.vue')
                }

            ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

export default router
