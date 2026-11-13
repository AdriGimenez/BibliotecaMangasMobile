import { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { WebView } from 'react-native-webview';

type Coordenadas = {
    latitud: number;
    longitud: number;
}

type Props = {
    visible: boolean;
    ubicacionInicial?: Coordenadas | null;
    onCerrar: () => void;
    onConfirmar: (coordenadas: Coordenadas) => void;
};

export default function SelectorMapa({
    visible, ubicacionInicial, onCerrar, onConfirmar, }: Props) {
    const [punto, setPunto] = useState<Coordenadas | null>(null);

    const latitudInicial = ubicacionInicial?.latitud ?? -34.6;
    const longitudInicial = ubicacionInicial?.longitud ?? -58.4;
    const zoomInicial = ubicacionInicial ? 14 : 5;

    
const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0" />

    <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css"
    />

    <style>
        html, body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }

        #map {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: #e5ebe7;
        }

        #estado {
            position: absolute;
            top: 12px;
            left: 12px;
            right: 12px;
            z-index: 1000;
            padding: 10px;
            background: white;
            color: #12372D;
            font-family: sans-serif;
            border-radius: 8px;
        }
    </style>
</head>

<body>
    <div id="map"></div>
    <div id="estado">Cargando mapa...</div>

    <script src="https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js"></script>

    <script>
        const estado = document.getElementById('estado');

        try {
            if (!window.L) {
                throw new Error('Leaflet no está disponible');
            }

            const mapa = L.map('map').setView(
                [${latitudInicial}, ${longitudInicial}],
                ${zoomInicial}
            );

            const capa = L.tileLayer(
                'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                {
                    maxZoom: 19,
                    attribution: '&copy; OpenStreetMap contributors'
                }
            );

            capa.on('tileload', function() {
                estado.style.display = 'none';
            });

            capa.on('tileerror', function() {
                estado.innerText =
                    'No se pudieron cargar las imágenes del mapa.';
            });

            capa.addTo(mapa);

            let marcador = null;

            mapa.on('click', function(evento) {
                const coordenadas = evento.latlng;

                if (marcador) {
                    marcador.setLatLng(coordenadas);
                } else {
                    marcador = L.marker(coordenadas).addTo(mapa);
                }

                window.ReactNativeWebView.postMessage(
                    JSON.stringify({
                        latitud: coordenadas.lat,
                        longitud: coordenadas.lng
                    })
                );
            });

            setTimeout(function() {
                mapa.invalidateSize();
            }, 300);

        } catch (error) {
            estado.innerText =
                'Error al iniciar el mapa: ' + error.message;
        }
    </script>
</body>
</html>
`;


    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onCerrar}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>
                        Ubicación de la comiquería
                    </Text>

                    <TouchableOpacity onPress={onCerrar}>
                        <Text style={styles.cerrar}>Cerrar</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.instruccion}>
                    Buscá el comercio y tocá su ubicación en el mapa.
                </Text>

                {visible && (
                    <WebView
                        style={styles.mapa}
                        originWhitelist={['*']}
                        source={{ html, baseUrl: 'https://cdn.jsdelivr.net/', }}
                        javaScriptEnabled
                        domStorageEnabled
                        onMessage={(evento) => {
                            try {
                                const datos = JSON.parse(
                                    evento.nativeEvent.data
                                );
                                    
                                if (
                                    Number.isFinite(datos.latitud) &&
                                    Number.isFinite(datos.longitud)
                                ) {
                                    setPunto({
                                        latitud: datos.latitud,
                                        longitud: datos.longitud,
                                    });
                                }
                            } catch (error) {
                                console.error(
                                    'Error al seleccionar ubicación: ', error
                                );
                            }
                        }}
                    />
                )}

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[
                            styles.boton,
                            !punto && styles.botonDeshabilitado,
                        ]}
                        disabled={!punto}
                        onPress={() => {
                            if(punto) {
                                onConfirmar(punto);
                                setPunto(null);
                            }
                        }}
                    >
                        <Text style={styles.botonTexto}>
                            Confirmar ubicación
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3EBDC'
    },

    header: {
        paddingTop: 55,
        paddingHorizontal: 20,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#12372D',
        flexShrink: 1,
    },

    cerrar: {
        color: '#205C48',
        fontSize: 15,
        marginLeft: 12,
    },

    instruccion: {
        paddingHorizontal: 20,
        paddingBottom: 12,
        color: '#60796C',
    },

    mapa: {
        flex: 1,
    },

    footer: {
        padding: 20,
        paddingBottom: 35,
    },

    boton: {
        backgroundColor: '#205C48',
        borderRadius: 12,
        padding: 17,
        alignItems: 'center',
    },

    botonDeshabilitado: {
        opacity: 0.4,
    },

    botonTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});