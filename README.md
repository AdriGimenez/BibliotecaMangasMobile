# BibliotecaMangas Mobile

Aplicación móvil desarrollada con React Native y Expo para el primer parcial de Aplicaciones Móviles.

## Opción elegida

Lista de compras inteligente.

BibliotecaMangas Mobile funciona como una lista de deseos de mangas, donde el usuario puede guardar los tomos que desea comprar.

## Funcionalidades

- Registro de usuario local.
- Inicio de sesión con validación de datos.
- Persistencia de sesión.
- Lista de deseos de mangas.
- Alta de mangas.
- Visualización de mangas guardados.
- Eliminación de mangas.
- Persistencia de datos mediante AsyncStorage.
- Validación de datos al agregar un manga.
- Notificación local como recordatorio de compra.
- Cierre de sesión.

## Tecnologías utilizadas

- React Native
- Expo SDK 57
- TypeScript
- React Navigation
- AsyncStorage
- Expo Notifications
- Jest
- React Native Testing Library

## APK Android

La aplicación puede instalarse directamente en un dispositivo Android desde el siguiente enlace:

[Descargar BibliotecaMangas Mobile](https://expo.dev/accounts/adri.gimenez/projects/BibliotecaMangasMobile/builds/ee88af86-ec72-4015-a7fb-e04de2e00d17)

El APK corresponde a una compilación `preview` realizada con EAS Build y funciona de manera independiente, sin necesidad de ejecutar Metro ni `npx expo start`.

## Ejecución

Instalar dependencias

```bash
npm install
```

Iniciar Proyecto

```bash
npx expo start --dev-client
```

La aplicación utiliza un Development Build de Expo para poder ejecutar correctamente las notificaciones locales.

## Testing

Para ejecutar los tests:
```bash
npm test
```

Actualmente el proyecto cuenta con 5 tests:
- Renderizado del componente reutilizable ```CustomButton```.
- Ejecución de ```onPress``` en ```CustomButton```.
- Validación de datos correctos de un manga.
- Validación del título obligatorio.
- Validación del número del tomo.

Resultado final: 
![Resultado de los tests](docs/evidencias/tests-passed.png)

## Demo

[Ver video demo en YouTube](https://youtube.com/shorts/M-iI80gU1mM?si=xva7qPdO81LXoqtx)