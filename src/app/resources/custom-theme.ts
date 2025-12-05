import Aura from '@primeng/themes/aura';
//Configuración personalizada de colores para PrimeNG
const customTheme = {
    ...Aura,
    semantic: {
        ...Aura.semantic,
        primary: {
          50:  '#FFF8F2',
          100: '#FFF1E6',
          200: '#FCD7C0',
          300: '#FCB89A',
          400: '#FA6950',
          500: '#f70707', // base
          600: '#DE0707',
          700: '#BA0404',
          800: '#940303',
          900: '#700101',
          950: '#2d0101'
        },
        muted: {
            50:  '#fff5f5',   // rojo muy muy claro
            100: '#ffeaea',   // rojo muy claro
            200: '#ffd6d6',   // rojo claro
            300: '#ffb3b3',   // rojo pastel
            400: '#ff8a8a',   // rojo pastel más fuerte
            500: '#ff5c5c',   // rojo suave
            600: '#ff2e2e',   // rojo suave más fuerte
            700: '#e01a1a',   // rojo atenuado
            800: '#b31212',   // rojo oscuro atenuado
            900: '#7a0a0a',   // rojo muy oscuro
            950: '#3d0505'    // casi negro con tinte rojo
        },
        secondary: {
            50:  '#fbeaea',   // rojo muy desaturado
            100: '#f7cccc',
            200: '#f2a8a8',
            300: '#ed8585',
            400: '#e95e5e',
            500: '#e53935',   // rojo desaturado base
            600: '#c62828',
            700: '#ad2121',
            800: '#8b1a1a',
            900: '#6a1313'
        },
        surface: {
            0:   '#ffffff',  // blanco puro
            50:  '#f8fafc',  // muy muy claro
            100: '#f1f5f9',  // tu color base
            200: '#e2e8f0',  // un poco más oscuro
            300: '#cbd5e1',  // gris azulado claro
            400: '#94a3b8',  // gris azulado medio
            500: '#64748b',  // gris azulado más fuerte
            600: '#475569',  // gris azulado oscuro
            700: '#334155',  // más oscuro
            800: '#1e293b',  // casi negro azulado
            900: '#0f172a',  // casi negro
            950: '#020617'   // negro profundo
        },
        colorScheme: {
            ...Aura.semantic?.colorScheme,
            light: {
                ...Aura.semantic?.colorScheme?.light,
                primary: {
                    color: '{primary.500}',
                    contrastColor: '{primary.950}',
                    hoverColor: '{primary.600}',
                    activeColor: '{primary.700}'
                },
                highlight: {
                    background: '{primary.50}',
                    focusBackground: '{primary.100}',
                    color: '{primary.700}',
                    focusColor: '{primary.800}'
                }
            },
            dark: {
                ...Aura.semantic?.colorScheme?.dark,
                primary: {
                    color: '{primary.400}',
                    contrastColor: '{surface.900}',
                    hoverColor: '{primary.300}',
                    activeColor: '{primary.200}'
                },
                highlight: {
                    background: 'color-mix(in srgb, {primary.400}, transparent 84%)',
                    focusBackground: 'color-mix(in srgb, {primary.400}, transparent 76%)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)'
                }
            }
        }
    }
};

export default customTheme;
