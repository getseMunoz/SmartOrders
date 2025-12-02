# SmartOrders
# 🧑‍💼 Sistema de Gestión de Empleados - Vue.js

Este proyecto es una aplicación web Single Page Application (SPA) desarrollada con Vue 3 para gestionar usuarios y visualizar información de empleados, consumiendo una API externa. Cuenta con un sistema de autenticación de usuario/administrador y una interfaz moderna con SCSS.

## 🚀 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
| :--- | :--- | :--- |
| **Vue.js** | 3 (Composition API) | Framework principal para la construcción de la UI. |
| **Vue Router** | 4 | Gestión de navegación y rutas protegidas. |
| **Vuex** | 4 | Gestión del estado global (Autenticación y usuarios). |
| **Vite** | Última | Empaquetador y entorno de desarrollo rápido. |
| **SCSS / Sass** | - | Preprocesador CSS para estilos avanzados. |
| **API Externa** | JSONPlaceholder (`/users`) | Fuente de datos simulada para la información de empleados. |

## ✨ Funcionalidades Obligatorias

1.  **Sistema de Login** con credenciales de usuario y contraseña.
2.  **Usuario Administrador** por defecto (`admin/adminpass`).
3.  **Creación de Nuevos Usuarios** (funcionalidad exclusiva para el rol `admin`).
4.  **Visualización de 10 Empleados** en formato de tarjeta (Grid).
5.  **Modal de Detalles** al hacer clic en cualquier tarjeta de empleado.
6.  **Rutas Protegidas** (solo accesibles si el usuario está logueado).
7.  **Logout Funcional**.

## 👥 Estructura del Equipo y Fases del Proyecto

El desarrollo se ha dividido en cuatro fases principales, asignando responsabilidades para el desarrollo y el despliegue.

| Fase | Tarea Principal | Responsable |.
| :--- | :--- | :--- | :--- |
| **Fase 1** | **Configuración Inicial:** Instalación de dependencias (Router, Vuex, Sass), configuración de `main.js`, `store/index.js` y `router/index.js`. | **Angelica Getsemani Muñoz Jimenez** | 
| **Fase 2** | **Desarrollo del Módulo de Autenticación:** Creación de las vistas `LoginPage.vue` y `CreateUserPage.vue`, e implementación de la lógica de login/logout/registro en Vuex. | **Angelica Getsemani Muñoz Jimenez** |
| **Fase 3** | **Integración de Empleados y API:** Creación de `EmployeesPage.vue`, consumo de la API externa (`jsonplaceholder`), y desarrollo del componente `EmployeeCard.vue`. | **Antonio Alejandro Gonzalez Campos** |
| **Fase 4** | **Modal y Estilos Finales:** Creación del componente `DetailModal.vue`, y aplicación de los estilos finales (SCSS) y ajustes de la interfaz de usuario. | **Antonio Alejandro Gonzalez Campos** |
