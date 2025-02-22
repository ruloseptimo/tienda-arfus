# Proyecto de Gestión de Productos y Compras

## 📌 Descripción
Este proyecto implementa un sistema de gestión de productos y compras utilizando **Node.js**, **Express**, **Sequelize**, **MySQL**, y una interfaz de usuario con **Vue.js**.

## 🛠️ Tecnologías Utilizadas
- **Backend:** Node.js, Express, Sequelize (ORM)
- **Base de Datos:** MySQL
- **Frontend:** Vue.js, Axios
- **Pruebas:** Jest, Supertest, Vue Test Utils

## 📂 Estructura del Proyecto
```
├── backend
│   ├── src
│   │   ├── models (Modelos Sequelize)
│   │   ├── routes (Rutas Express)
│   │   ├── controllers (Controladores de lógica de negocio)
│   │   ├── services (Servicios adicionales)
│   │   ├── config (Configuración de base de datos y entorno)
│   │   ├── app.js (Archivo principal de Express)
│   ├── tests (Pruebas unitarias con Jest)
│   ├── package.json (Dependencias y scripts de Node.js)
│   ├── .env (Configuraciones de entorno)
│
├── frontend
│   ├── src
│   │   ├── components (Componentes Vue)
│   │   ├── views (Vistas principales)
│   │   ├── router (Rutas Vue Router)
│   │   ├── store (Estado global con Vuex/Pinia)
│   │   ├── App.vue (Componente raíz)
│   │   ├── main.js (Punto de entrada de Vue)
│   ├── tests (Pruebas con Jest y Vue Test Utils)
│   ├── package.json (Dependencias y scripts de Vue.js)
```

## 🚀 Instalación y Configuración

### 🔹 1. Clonar el Repositorio
```sh
git clone https://github.com/tu_usuario/proyecto.git
cd proyecto
```

### 🔹 2. Configurar Backend
```sh
cd backend
npm install
cp .env.example .env  # Configurar variables de entorno
```
**Migrar la Base de Datos:**
```sh
npx sequelize-cli db:migrate
```
**Llenar con Datos Dummy:**
```sh
node scripts/fillDatabase.js
```
**Ejecutar Servidor Backend:**
```sh
npm start
```

### 🔹 3. Configurar Frontend
```sh
cd ../frontend
npm install
npm run serve
```

## 📡 API REST - Endpoints
| Método | Endpoint | Descripción |
|--------|-----------------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| POST | `/api/products` | Crear un producto |
| DELETE | `/api/products/:id` | Eliminar un producto |
| POST | `/api/events` | Registrar un evento de comprador |

## 🧪 Ejecución de Pruebas
**Pruebas Backend:**
```sh
cd backend
npm test
```
**Pruebas Frontend:**
```sh
cd frontend
npm test
```

## 📌 Contribución
1. Haz un **fork** del repositorio.
2. Crea una nueva rama (`git checkout -b feature-nueva`).
3. Realiza los cambios y haz commit (`git commit -m 'Agrega nueva característica'`).
4. Sube los cambios (`git push origin feature-nueva`).
5. Abre un **Pull Request**.

## 📄 Licencia
Este proyecto está bajo la **MIT License**.

---
**¡Gracias por usar este sistema! 🚀**

