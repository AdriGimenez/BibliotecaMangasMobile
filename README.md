# BibliotecaMangas Mobile

Aplicación móvil desarrollada con **React Native, Expo SDK 57 y TypeScript** para la materia Aplicaciones Móviles.

**Parcial 2 — Continuación del Parcial 1**

## Descripción

BibliotecaMangas Mobile es una lista de deseos de mangas que permite registrar los tomos que el usuario desea comprar y llevar un seguimiento de sus compras.

Los usuarios pueden agregar mangas, consultar su información, eliminarlos y marcarlos como comprados o pendientes de compra.

La aplicación también permite asociar fotografías, ubicaciones y contactos de la agenda del dispositivo, además de crear recordatorios mediante notificaciones locales y el calendario.

## Funcionalidades

### Gestión de usuarios

- Registro de usuario local.
- Inicio de sesión local con validación de los datos de acceso.
- Persistencia de sesión.
- Cierre de sesión.

### Gestión de mangas

- Agregar mangas con título, tomo y editorial.
- Visualizar mangas guardados.
- Eliminar mangas de la lista.
- Marcar mangas como comprados o pendientes de compra.
- Actualizar el estado de los mangas mediante Zustand.
- Validar los datos ingresados.
- Conservar la información utilizando AsyncStorage.

### Cámara y galería

- Tomar fotografías utilizando la cámara del dispositivo.
- Seleccionar imágenes desde la galería.
- Solicitar los permisos correspondientes.
- Mostrar una vista previa de la imagen seleccionada.
- Guardar las fotografías en el almacenamiento de la aplicación.
- Asociar imágenes a los mangas y mostrarlas en la lista.

Se utiliza `expo-image-picker` para acceder a la cámara y la galería, y `expo-file-system` para conservar las fotografías.

### Ubicación

- Obtener la ubicación actual mediante GPS utilizando `expo-location`.
- Solicitar permisos de ubicación.
- Seleccionar manualmente un punto en un mapa interactivo.
- Asociar las coordenadas seleccionadas a un manga.
- Mostrar la ubicación guardada en la lista.

El mapa está implementado con  Leaflet y OpenStreetMap mediante `react-native-webview`

La visualización del mapa requiere conexión a Internet.

### Contactos

- Acceder al selector de contactos del dispositivo.
- Solicitar los permisos correspondientes.
- Seleccionar cualquier contacto disponible en la agenda.
- Asociar el contacto seleccionado a un manga.
- Mostrar su nombre mediante el campo "Consultar en".

La aplicación almacena únicamente el nombre del contacto seleccionado, sin copiar toda la agenda del teléfono.

### Calendario y notificaciones

- Generar notificaciones locales relacionadas con los mangas.
- Ofrecer la opción de agendar una compra en el calendario del dispositivo.
- Abrir el formulario del calendario con un evento precargado.
- Incluir en el evento el título del manga, tomo, editorial y contacto asociado.
- Permitir que el usuario seleccione la fecha y confirme el evento.

Se utiliza `expo-notifications` para las notificaciones locales y `expo-calendar` para la integración con el calendario.

### Estado global y persistencia 

Se utiliza Zustand para administrar globalmente la lista de mangas.

El store implementa las siguientes acciones:

- `setMangas`: establecer la lista de mangas.
- `loadMangas`: cargar los mangas almacenados.
- `addManga`: agregar un manga.
- `deleteManga`: eliminar un manga.
- `updateManga`: actualizar un manga existente.

AsyncStorage se utiliza para conservar la información entre ejecuciones de la aplicación.

## Tecnologías utilizadas

- React Native
- Expo SDK 57
- TypeScript
- React Navigation
- Zustand
- AsyncStorage
- Expo Image Picker
- Expo File System
- Expo Location
- Expo Contacts
- Expo Calendar
- Expo Notifications
- React Native WebView
- Leaflet 
- OpenStreetMap
- Jest
- React Native Testing Library
- EAS Build

## Organización del proyecto

- `src/screens/`: pantallas de la aplicación.
- `src/components/`: componentes reutilizables y selector de mapa.
- `src/context/`: contexto de autenticación.
- `src/store/`: estado global con Zustand.
- `src/storage/`: persistencia de datos.
- `src/types/`: tipos de TypeScript.
- `src/utils/`: validaciones y funciones auxiliares.
- `src/notifications/`: notificaciones locales.
- `src/navigation/`: navegación entre pantallas.

## Instalación y ejecución

### Requisitos

- Node.js y npm.
- Un dispositivo Android.
- Conexión a Internet.
- Una cuenta de Expo para generar la aplicación con EAS Build.

### Instalación

Clonar el repositorio e instalar las dependencias:

```bash
git clone https://github.com/AdriGimenez/BibliotecaMangasMobile.git
cd BibliotecaMangasMobile
npm install
```

### Ejecución

Para generar una compilación de Android: 
```bash
npx eas-cli build --platform android --profile preview
```

Una vez finalizada la compilación, descargar e instalar la APK generada en el dispositivo Android.

El perfil `preview` está configurado para generar una versión instalable de la aplicación sin depender de un servidor de desarrollo.

## Pruebas automatizadas

Se implementaron pruebas utilizando Jest y React Native Testing Library.

### Ejecutar los tests

Desde la carpeta del proyecto:

```bash
npx jest --runInBand
```

### Pruebas implementadas

**CustomButton**

1. Verificar que el componente muestre correctamente el texto del botón.
2. Verificar que se ejecute la función `onPress` al presionarlo.

**Validación de mangas**

3. Verificar que los datos válidos no generen errores.
4. Verificar que el título sea obligatorio.
5. Verificar que el número del tomo sea mayor a cero.

### Resultados

Última ejecución verificada:

```text
PASS src/utils/__tests__/validators.test.ts
PASS src/components/__tests__/CustomButton.test.tsx

Test Suites: 2 passed, 2 total
Tests:       5 passed, 5 total
Snapshots:   0 total
```

Las cinco pruebas automatizadas finalizaron correctamente.

## Uso de inteligencia artificial

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para comprender tecnologías, generar y refactorizar fragmentos de código, resolver errores y mejorar la interfaz.

Las sugerencias se revisaron y adaptaron a la estructura del proyecto antes de integrarlas.

### Herramienta utilizada

- ChatGPT (OpenAI)

### Ejemplos de solicitudes realizadas

Los siguientes ejemplos resumen solicitudes realizadas durante el desarrollo.

**Ejemplo 1 — Organización del formulario**

Solicitud:

> Quiero que los campos Tomo y Editorial aparezcan en una misma fila. Tomo debe ocupar menos espacio que Editorial para aprovechar mejor la pantalla del celular.

Resultado:

Se reorganizó el formulario utilizando `flexDirection: 'row'` y diferentes proporciones de `flex`.

**Ejemplo 2 — Cámara y galería**

Solicitud:

> Quiero permitir que el usuario tome una fotografía del manga o seleccione una imagen desde la galería, pero sin agregar demasiados botones a la interfaz.

Resultado:

Se implementó un único control que permite elegir entre cámara y galería mediante `expo-image-picker`.

**Ejemplo 3 — Selección de ubicación**

Solicitud:

> Quiero que el usuario pueda elegir una ubicación en un mapa interactivo y guardarla junto con los datos del manga.

Resultado:

Se implementó un mapa utilizando Leaflet, OpenStreetMap y WebView, permitiendo seleccionar coordenadas y asociarlas al manga.

**Ejemplo 4 — Integración con calendario**

Solicitud:

> Quiero que el usuario pueda agendar la compra de un manga en el calendario del teléfono, incluyendo el título, tomo, editorial y contacto seleccionado.

Resultado:

Se integró `expo-calendar` para abrir el formulario de creación de eventos con información precargada.

### Código generado y código final integrado

Las propuestas de código realizadas con ayuda de ChatGPT se revisaron y adaptaron a la estructura, los requisitos y el diseño de BibliotecaMangasMobile.

Durante la implementación se realizaron los siguientes ajustes:

- Reorganización del formulario para reducir la cantidad de botones.
- Incorporación de solicitudes de permisos y manejo de errores.
- Persistencia de fotografías mediante `expo-file-system`.
- Adaptación de la importación legacy de `expo-contacts`.
- Corrección de la carga HTML del mapa en WebView.
- Integración de Zustand y AsyncStorage para agregar, actualizar y eliminar mangas.
- Integración con el calendario del dispositivo.
- Pruebas de funcionamiento en un dispositivo Android real.

El código final se integró y comprobó durante el desarrollo.

## Video demostrativo — Parcial 2

[Ver video demostrativo del Parcial 2 en YouTube](https://youtube.com/shorts/-ej_TPBDntM)

El video tiene una duración inferior a un minuto y muestra las principales funcionalidades implementadas:

- Incorporación de fotografías mediante cámara y galería.
- Obtención de ubicación mediante GPS.
- Selección de ubicación en un mapa interactivo.
- Asociación de contactos.
- Creación de eventos en el calendario.
- Actualización del estado de compra de los mangas.
- Eliminación de mangas.
- Persistencia de datos y fotografías después de cerrar sesión.

## Repositorio

https://github.com/AdriGimenez/BibliotecaMangasMobile

## Aclaraciones

- La aplicación utiliza almacenamiento local.
- No requiere backend ni una base de datos externa.
- Las fotografías se almacenan dentro del espacio de la aplicación.
- El mapa necesita conexión a Internet.
- El usuario debe confirmar la creación de eventos en el calendario del dispositivo.
- La aplicación fue desarrollada y probada en Android.
```