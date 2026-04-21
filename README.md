# 📦 Sistema de Gestión de Inventario

Proyecto académico para la materia "Taller de Aplicaciones en Internet" - Ingeniería de Sistemas.

## 🛠 Tecnologías utilizadas

| Capa | Tecnología |
|------|------------|
| Frontend | Angular 19 |
| Backend | NestJS 11 |
| Base de Datos | PostgreSQL 16 |
| ORM | TypeORM |
| Estilos | Bootstrap 5 |

---

## 📋 Requisitos previos

Antes de empezar, asegúrate de tener instalado:

| Software | Versión | Descarga |
|----------|---------|----------|
| Node.js | v18 o superior | [https://nodejs.org](https://nodejs.org) |
| PostgreSQL | v14 o superior | [https://www.postgresql.org](https://www.postgresql.org) |
| Git | Cualquier versión | [https://git-scm.com](https://git-scm.com) |

> **Alternativa para PostgreSQL:** Puedes usar Docker (recomendado para evitar instalaciones)
> ```bash
> docker-compose up -d
> ```

---

## 🚀 Instrucciones de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/elmer22x/sistema-inventario.git
cd sistema-inventario
2. Configurar la Base de Datos
Opción A: PostgreSQL local (instalado manualmente)
Abre pgAdmin o la terminal de PostgreSQL

Crea una base de datos llamada sistema_inventario

Ejecuta el siguiente SQL para crear las tablas:

sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE inventory (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    product_id UUID UNIQUE REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 0,
    min_stock INTEGER DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Opción B: Docker (recomendado)
Si tienes Docker instalado, ejecuta en la raíz del proyecto:

bash
docker-compose up -d
Esto creará automáticamente la base de datos con todas las tablas.

3. Configurar el Backend (NestJS)
bash
# Entrar a la carpeta del backend
cd backend

# Instalar dependencias
npm install

# Configurar conexión a PostgreSQL
# Editar el archivo: src/config/typeorm.config.ts
# Cambiar la contraseña por la tuya
Archivo src/config/typeorm.config.ts:

typescript
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'TU_CONTRASEÑA_AQUI',  // <--- CAMBIAR
  database: 'sistema_inventario',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
};
bash
# Ejecutar el backend
npm run start:dev
El backend correrá en: http://localhost:3000

4. Configurar el Frontend (Angular)
bash
# Abrir una NUEVA terminal
cd sistema-inventario/frontend

# Instalar dependencias
npm install

# Ejecutar el frontend
ng serve
El frontend correrá en: http://localhost:4200

🧪 Probar la aplicación
Abrir navegador en: http://localhost:4200

Registrar un usuario nuevo

Iniciar sesión

Crear categorías

Crear productos

Gestionar inventario (stock)

📡 Endpoints de la API (para probar con Postman)
Método	URL	Descripción
GET	http://localhost:3000/users	Obtener usuarios
POST	http://localhost:3000/users	Crear usuario
GET	http://localhost:3000/categories	Obtener categorías
POST	http://localhost:3000/categories	Crear categoría
GET	http://localhost:3000/products	Obtener productos
POST	http://localhost:3000/products	Crear producto
GET	http://localhost:3000/inventory	Obtener inventario
PUT	http://localhost:3000/inventory/stock/{productId}	Actualizar stock
📁 Estructura del proyecto
text
sistema-inventario/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── users/          # Módulo de usuarios
│   │   ├── categories/     # Módulo de categorías
│   │   ├── products/       # Módulo de productos
│   │   ├── inventory/      # Módulo de inventario
│   │   └── config/         # Configuración (DB)
│   └── package.json
│
├── frontend/               # Angular frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── login/      # Pantalla de login
│   │   │   ├── register/   # Pantalla de registro
│   │   │   ├── products/   # CRUD productos
│   │   │   ├── categories/ # CRUD categorías
│   │   │   ├── inventory/  # Gestión de stock
│   │   │   └── services/   # Servicio API
│   └── package.json
│
└── README.md
❌ Posibles errores y soluciones
Error CORS (frontend no conecta con backend)
Solución: Verificar que backend/src/main.ts tenga CORS habilitado:

typescript
app.enableCors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
});
Error "password authentication failed"
Solución: Revisar la contraseña en backend/src/config/typeorm.config.ts

Error "relation does not exist"
Solución: Las tablas no están creadas. Ejecutar el SQL del paso 2.

Puerto 3000 o 4200 ocupado
Soluciones:

Cerrar otra aplicación que use ese puerto

Cambiar el puerto en la configuración

👥 Trabajo en equipo (Git)
bash
# Antes de empezar a trabajar (siempre hacer esto)
git pull origin main

# Después de hacer cambios
git add .
git commit -m "descripción de lo que hice"
git push origin main
📞 Contacto
Repositorio: https://github.com/elmer22x/sistema-inventario

Autor: Elmer

✅ Estado del proyecto
Módulo	Estado
Backend NestJS	✅ Completado
Frontend Angular	✅ Completado
Base de Datos	✅ Completado
Autenticación	✅ Completado
CRUD Productos	✅ Completado
CRUD Categorías	✅ Completado
Inventario/Stock	✅ Completado
