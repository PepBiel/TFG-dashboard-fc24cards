# 🖥️ Dashboard – Interfaz Visual

Este repositorio contiene la interfaz visual (frontend) del sistema desarrollado en el TFG “Tècniques evolutives per a la presa de decisions en videojocs”.
El dashboard actúa como orquestador del flujo completo, permitiendo al usuario interactuar de forma intuitiva con el backend encargado del procesamiento de imágenes, gestión de jugadores y generación automática de plantillas para Desafiaments de Creació de Plantilles (DCP) en EA Sports FC 24.

## 🎯 Objetivo de la Interfaz

La interfaz tiene como finalidad:

- Facilitar la captura y carga de imágenes del club del usuario.
- Visualizar y gestionar los jugadores detectados tras el procesamiento OCR.
- Permitir la selección de DCP y lanzar el proceso de generación automática.
- Mostrar de forma clara la plantilla generada, sus métricas y restricciones cumplidas.
- Proporcionar una experiencia ligera, clara y accesible, sin lógica de negocio en el cliente.

## 🧩 Estructura General de la UI

La aplicación está organizada en tres bloques principales:

### 🔹 **Barra lateral izquierda**

Navegación entre secciones:

- Pantalla inicial
- Captura de imágenes
- Jugadores del club
- Generador de DCP

Acceso rápido y persistente durante toda la sesión.

### 🔹 **Barra superior**

Controles globales:

- Cambio entre modo claro / modo oscuro

<img width="2557" height="1268" alt="image" src="https://github.com/user-attachments/assets/13da8925-148e-4f49-a0fe-3d6100a98927" />

- Información contextual del estado del sistema

### 🔹 **Contenido central**

Zona dinámica donde se renderiza cada funcionalidad según la sección activa.

## 🏠 Pantalla Inicial

<img width="2557" height="1269" alt="image" src="https://github.com/user-attachments/assets/fc40bbad-553d-4a78-9e70-f43689f1fc14" />

- Vista general del sistema.
- Introducción rápida al flujo de trabajo.
- Indicadores visuales del estado de la aplicación.
- Disponible en tema claro y tema oscuro para mejorar la experiencia de usuario.

## 📸 Captura de Imágenes

<img width="2557" height="1268" alt="image" src="https://github.com/user-attachments/assets/3bfe689c-41f4-4271-b074-b9c940844766" />

Esta sección permite obtener las imágenes necesarias para detectar las cartas del club:

- Captura automática a intervalos definidos o carga manual de imágenes.
- Visualización inmediata de miniaturas.

<img width="2557" height="1267" alt="image" src="https://github.com/user-attachments/assets/4b4086a1-9759-48bc-b067-dab06f2b1a7a" />

- Vista ampliada de cada captura para verificación.

<img width="2555" height="1264" alt="image" src="https://github.com/user-attachments/assets/5295e881-22e3-4337-9a6c-36827dbce018" />

- Preparación de las imágenes para su envío al backend (segmentación y OCR).

## 👥 Jugadores del Club

<img width="2556" height="1266" alt="image" src="https://github.com/user-attachments/assets/801647c9-45bd-4fd2-83dc-bdc9f28ec26a" />

<img width="2558" height="1268" alt="image" src="https://github.com/user-attachments/assets/b8bb6537-39ec-4dc8-9f48-e33d3e86c490" />

Una vez procesadas las imágenes:

- Se muestra una tabla con todos los jugadores detectados.- Indicadores visuales de estado:
- Jugadores correctamente identificados.
  - Filas pendientes de resolución por ambigüedad.
- Diálogo interactivo para:
  - Resolver conflictos entre versiones de un mismo jugador.
  - Confirmar manualmente la carta correcta.

    <img width="2556" height="1266" alt="image" src="https://github.com/user-attachments/assets/2e4765a3-f3fc-4408-ae87-8a305e2dd83f" />

- Panel lateral con información detallada de cada jugador.

  <img width="2556" height="1264" alt="image" src="https://github.com/user-attachments/assets/e8812223-9c11-4179-9208-ae5e9664fe0d" />

- Opciones para filtrar o eliminar jugadores del club.

## 🧠 Generador de DCP

<img width="2556" height="1264" alt="image" src="https://github.com/user-attachments/assets/82520fe9-2691-4eb1-a92a-9502b1ef92f2" />

Sección central del sistema:

- Selección del DCP disponible y visualización de sus restricciones:
  - Media mínima
  - Química
  - Nacionalidades, ligas, clubes, etc.
- Vista previa antes de la generación:

<img width="2556" height="1265" alt="image" src="https://github.com/user-attachments/assets/ef088fc7-736f-4d90-b937-b6974fbcae1b" />

  - Plantilla vacía
  - Métricas iniciales a cero
- Ejecución del algoritmo desde la interfaz.
- Visualización final de:

  <img width="2556" height="1265" alt="image" src="https://github.com/user-attachments/assets/e951b47f-0fee-4b7a-8cb0-158fe97d9b26" />

  - Plantilla generada
  - Coste total
  - Química alcanzada
  - Listas desplegables de ligas y clubes presentes
- Feedback inmediato y comprensible para el usuario.

  <img width="2556" height="1266" alt="image" src="https://github.com/user-attachments/assets/ced359fa-9adf-4c52-b3fa-647d078f3b62" />


## 🎥 Vídeo de Demostración

El siguiente vídeo muestra el funcionamiento completo del dashboard, desde la captura de imágenes hasta la generación final de una plantilla DCP.

[![Ver demo del dashboard](https://www.youtube.com/watch?v=kCma6vsQI48)](https://www.youtube.com/watch?v=kCma6vsQI48)

## 🛠️ Tecnologías del Frontend

- React (Create React App)
- Comunicación con backend mediante API REST
- Renderizado dinámico de tablas y paneles
- Gestión de estado orientada a procesos
- Diseño responsive para resoluciones mínimas de 1024×768

## ℹ️ Notas

- La interfaz no contiene lógica de negocio: toda la computación se delega al backend.
- Diseñada con fines académicos, respetando los ToS de EA Sports FC 24.
- Pensada para facilitar la experimentación y la validación del algoritmo genético.

## ✅ Requisitos

- Node.js v22+ (npm incluido)
- Git

## ⚡ Instalación rápida

```bash
git clone https://github.com/PepBiel/TFG-dashboard-fc24cards.git
cd TFG-dashboard-fc24cards
npm install
npm run start
```


