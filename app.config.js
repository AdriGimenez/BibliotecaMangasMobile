module.exports = ({ config }) => {
    const esDesarrollo =
        process.env.APP_VARIANT === 'development';

    return {
        ...config,

        name: esDesarrollo
            ? 'BibliotecaMangas DEV'
            : config.name,

        android: {
            ...config.android,

            package: esDesarrollo
                ? 'com.adrigimenez.bibliotecamangas.dev'
                : config.android.package,
        },
    };
};