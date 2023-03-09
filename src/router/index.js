import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/index.vue";
Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        hidden:true
    },
    {
        path: '/',
        name: '挂号收费',
        component: Layout,
        children: [
            {
                path: '/onsite_registration',
                name: '窗口挂号',
                component: () => import(/* webpackChunkName: "about" */ '../views/registration/onsite_registration.vue')
            },
            {
                path: '/registration_record',
                name: '窗口退号',
                component: () => import(/* webpackChunkName: "about" */ '../views/registration/registration_record.vue')
            },
            {
                path: '/expense_charge',
                name: '收费',
                component: () => import(/* webpackChunkName: "about" */ '../views/registration/expense_charge.vue')
            },
            {
                path: '/expense_refund',
                name: '退费',
                component: () => import(/* webpackChunkName: "about" */ '../views/registration/expense_refund.vue')
            },
            {
                path: '/expense_manage',
                name: '费用记录查询',
                component: () => import(/* webpackChunkName: "about" */ '../views/registration/expense_manage.vue')
            },
        ]
    },
    {
        path: '/',
        name: '门诊医生',
        component: Layout,
        children: [
            {
                path: '/physician_patient',
                name: '患者查看',
                component: () => import(/* webpackChunkName: "about" */ '../views/physician/physician_patient.vue')
            },
            {
                path: '/physician_diagnosis',
                name: '医生诊疗',
                component: () => import(/* webpackChunkName: "about" */ '../views/physician/physician_diagnosis.vue')
            },
            {
                path: '/physician_history',
                name: '看诊记录',
                component: () => import(/* webpackChunkName: "about" */ '../views/physician/physician_history.vue')
            }
        ]
    },
    {
        path: '/',
        name: '检查管理',
        component: Layout,
        children: [
            {
                path: '/examination_apply',
                name: '检查申请',
                component: () => import(/* webpackChunkName: "about" */ '../views/examination/examination_apply.vue')
            },
            {
                path: '/examination_patient',
                name: '患者录入',
                component: () => import(/* webpackChunkName: "about" */ '../views/examination/examination_patient.vue')
            },
            {
                path: '/examination_input',
                name: '结果录入',
                component: () => import(/* webpackChunkName: "about" */ '../views/examination/examination_input.vue')
            },
            {
                path: '/examination_manage',
                name: '检查管理',
                component: () => import(/* webpackChunkName: "about" */ '../views/examination/examination_manage.vue')
            }
        ]
    },
    {
        path: '/',
        name: '检验管理',
        component: Layout,
        children: [
            {
                path: '/disponsal_apply',
                name: '检验申请',
                component: () => import(/* webpackChunkName: "about" */ '../views/disponsal/disponsal_apply.vue')
            },
            {
                path: '/disponsal_patient',
                name: '患者录入',
                component: () => import(/* webpackChunkName: "about" */ '../views/disponsal/disponsal_patient.vue')
            },
            {
                path: '/disponsal_input',
                name: '检验录入',
                component: () => import(/* webpackChunkName: "about" */ '../views/disponsal/disponsal_input.vue')
            },
            {
                path: '/disponsal_manage',
                name: '检验管理',
                component: () => import(/* webpackChunkName: "about" */ '../views/disponsal/disponsal_manage.vue')
            }
        ]
    },
    {
        path: '/',
        name: '药房管理',
        component: Layout,
        children: [
            {
                path: '/give_medicine',
                name: '药房发药',
                component: () => import(/* webpackChunkName: "about" */ '../views/drugstore/give_medicine.vue')
            },
            {
                path: '/deug_medicine',
                name: '药房退药',
                component: () => import(/* webpackChunkName: "about" */ '../views/drugstore/deug_medicine.vue')
            },
            {
                path: '/drug_manage',
                name: '药库管理',
                component: () => import(/* webpackChunkName: "about" */ '../views/drugstore/drug_manage.vue')
            },
            {
                path: '/tran_history',
                name: '交易管理',
                component: () => import(/* webpackChunkName: "about" */ '../views/drugstore/tran_history.vue')
            }
        ]
    },
    {
        path: '/',
        name: '处置管理',
        component: Layout,
        children: [
            {
                path: '/laboratory_apply',
                name: '处置申请',
                component: () => import(/* webpackChunkName: "about" */ '../views/laboratory/laboratory_apply.vue')
            },
            {
                path: '/laboratory_patient',
                name: '患者录入',
                component: () => import(/* webpackChunkName: "about" */ '../views/laboratory/laboratory_patient.vue')
            },
            {
                path: '/laboratory_input',
                name: '处置录入',
                component: () => import(/* webpackChunkName: "about" */ '../views/laboratory/laboratory_input.vue')
            },
            {
                path: '/laboratory_manage',
                name: '处置管理',
                component: () => import(/* webpackChunkName: "about" */ '../views/laboratory/laboratory_manage.vue')
            }
        ]
    },

]

const router = new VueRouter({
    routes
})


export default router
