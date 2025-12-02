# 🍽️ SmartOrders - Sistema de Pedidos para Restaurantes

**SmartOrders** es una solución integral para la gestión de restaurantes, diseñada para optimizar el flujo de trabajo desde la toma de la orden hasta la entrega. El sistema elimina el uso de comandas de papel, sincronizando en tiempo real las órdenes entre los meseros y la cocina mediante WebSockets.

## 👥 Equipo de Desarrollo y Distribución de Trabajo

El desarrollo de este proyecto se ha dividido en 4 fases estratégicas, asignadas a los siguientes integrantes:

| Integrante | Roles y Responsabilidades | Fases Asignadas |
|------------|---------------------------|-----------------|
| **Angelica Getsemani Muñoz Jimenez** | **Backend y Base de datos**<br>• Diseño de Base de Datos (PostgreSQL).<br>• Configuración de Servidor (Node.js/Express).<br>• Lógica de Negocio (Stock, Pedidos).<br>• Seguridad y Autenticación (JWT). | **Fase 1:** Infraestructura Inicial<br>**Fase 2:** Desarrollo Backend |
| **Antonio Alejandro Gonzalez Campos** | **Frontend  y nube**<br>• Interfaces de Usuario (React + Tailwind).<br>• Sistema KDS (Kitchen Display System).<br>• Integración Tiempo Real (Socket.io).<br>• Despliegue en AWS (Elastic Beanstalk/S3). | **Fase 3:** Frontend Multi-dispositivo<br>**Fase 4:** Despliegue y Cloud |

---

## 🛠️ Stack Tecnológico

El proyecto utiliza una arquitectura moderna basada en la nube:

### **Backend (API REST)**
* ![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white) **Node.js & Express**: Servidor principal.
* ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white) **PostgreSQL**: Base de datos relacional transaccional.
* **Socket.io**: Comunicación bidireccional en tiempo real para el panel de cocina.
* **JWT (JSON Web Tokens)**: Autenticación segura basada en roles.

### **Frontend (Cliente)**
* ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) **React + Vite**: Framework para interfaces de usuario rápidas.
* ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white) **Tailwind CSS**: Estilizado responsivo y moderno.
* **Axios**: Consumo de API.

### **Infraestructura y Despliegue (AWS)**
* ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=flat&logo=amazon-aws&logoColor=white) **Amazon Web Services**:
    * **Elastic Beanstalk**: Orquestación y escalado del Backend.
    * **RDS**: Instancia gestionada de base de datos PostgreSQL.
    * **S3**: Alojamiento del Frontend estático.




