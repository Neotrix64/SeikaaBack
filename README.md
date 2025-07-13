# 🤖 Seikaa Bot - Backend

Este es el backend de **Seikaa**, un bot de Discord desarrollado con Node.js, Express y MongoDB. El proyecto sigue una arquitectura **hexagonal (o clean architecture)** para asegurar una separación clara entre lógica de negocio, infraestructura y controladores.

---

## 📦 Módulo: Perfil de Usuario

El primer módulo implementado en este backend es el de **Perfil de Usuario**, que gestiona la creación, almacenamiento y recuperación de perfiles personalizados de los usuarios del servidor de Discord.

### 🧠 ¿Qué es un Perfil?

Cada usuario de Discord que interactúa con el bot puede tener un perfil que incluye:

- `userDiscordID` → ID del usuario en Discord
- `Estado` → Información sobre relaciones (por ejemplo, casado con otro usuario)
- `exp` → Experiencia obtenida dentro del bot
- `nivel` → Nivel de usuario basado en su actividad
- `economia` → Dinero del usuario dividido en:
  - Efectivo
  - Banco

### 🧱 Estructura del Proyecto

El módulo se encuentra dividido siguiendo los principios de la arquitectura hexagonal:

```bash
src/
│
├── domain/
│ └── models/ → Entidades como Profile
│
├── application/
│ └── use-cases/ → Casos de uso como CrearPerfil.ts
│
├── infrastructure/
│ └── repositories/ → Implementaciones como MongoProfileRepository.ts
│
└── interfaces/
└── controllers/ → Endpoints de Express, como ProfileController.ts
```

## 🔌 API REST (módulo de perfil)

### Crear un perfil


#### Body esperado:
```json
{
  "userDiscordID": 123456789,
  "Estado": [],
  "exp": 0,
  "nivel": 0,
  "economia": [
    {
      "Efectivo": 0,
      "Banco": 0
    }
  ]
}
```

## 🧪 Tecnologías utilizadas

- **Node.js** con **TypeScript**
- **Express** como framework HTTP
- **Mongoose** para modelado de datos con MongoDB
- **MongoDB** como base de datos
- Arquitectura **Hexagonal / Clean Architecture**

---

## 🚀 Cómo ejecutar

1. Clona el proyecto:
```bash
git clone https://github.com/Neotrix64/SeikaaBack
cd seikaa-backend
```

2. Instala Dependencias:
```bash
npm install
```

3. Crea un archivo env con lo siguiente:
```bash
MONGODB_URI=mongodb://localhost:27017/seikaa
PORT=3000
```

4. Inicia con el comando:
```bash
npm run dev
```
