export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: 'Guía de compra' | 'Batería y Rendimiento' | 'Consejos técnicos';
  readTime: string;
  date: string;
  featured?: boolean;
  coverImage: string;
  content: string[];
  keyTakeaways: string[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'que-iphone-comprar-en-2026',
    title: '¿Qué iPhone comprar en 2026? Guía según tu uso y presupuesto',
    excerpt: 'Comparamos la nueva Serie 18, 17, 16 y 15 para ayudarte a elegir el equilibrio perfecto entre pantalla, cámara, batería e inversión.',
    category: 'Guía de compra',
    readTime: '5 min de lectura',
    date: '14 de Septiembre, 2026',
    featured: true,
    coverImage: '/images/products/17-pro-silver.webp',
    keyTakeaways: [
      'Si buscas la máxima innovación y cámara con apertura variable: Serie 18 Pro y Pro Max.',
      'Si buscas el mejor rendimiento profesional con USB-C y titanio: Serie 17 Pro o 16 Pro.',
      'Si buscas la mejor relación calidad-precio para el día a día: iPhone 16 base o iPhone 15 Pro de exhibición.',
    ],
    content: [
      'Elegir un iPhone en 2026 no se trata simplemente de comprar el modelo más caro, sino de encontrar el equipo que responda exactamente a tus hábitos diarios.',
      'Para creadores de contenido, fotografía y trabajo intensivo, los modelos Pro Max de las series 16, 17 y la nueva 18 marcan la diferencia gracias a la pantalla ProMotion de 120Hz fluida, el teleobjetivo con zoom óptico de 5x y la mayor autonomía de batería.',
      'Para usuarios que buscan un teléfono confiable, rápido y con cámaras versátiles para redes sociales y uso diario, el iPhone 16 y el iPhone 15 ofrecen puerto USB-C, Dynamic Island y potencia de sobra para los próximos 4 a 5 años sin gastar de más.',
      'En Apfel Store te recomendamos siempre revisar la capacidad: si grabas videos en 4K o tomas muchas fotos, opta por 256 GB para no depender permanentemente de la nube de iCloud.',
      'Antes de decidir, puedes usar nuestro comparador interactivo o escribirnos directamente a WhatsApp para ver fotos en tiempo real y disponibilidad del modelo exacto.',
    ],
  },
  {
    slug: 'sellado-o-exhibicion-que-preguntar',
    title: 'Sellado vs. Exhibición: 5 puntos clave antes de comprar',
    excerpt: 'Te explicamos las diferencias reales, qué debes exigir al vendedor y cómo ahorrar hasta S/ 1,000 con total seguridad.',
    category: 'Guía de compra',
    readTime: '4 min de lectura',
    date: '10 de Septiembre, 2026',
    coverImage: '/images/products/16-pro-natural.webp',
    keyTakeaways: [
      'Un equipo sellado garantiza 0 ciclos y caja de fábrica intacta.',
      'Un equipo de exhibición en condición sobresaliente ofrece un ahorro de entre 20% y 35% con garantía idéntica.',
      'Exige siempre fotos reales, porcentaje de salud de batería y verificación de Face ID y True Tone.',
    ],
    content: [
      'Una de las dudas más frecuentes de nuestros clientes es si conviene comprar un equipo sellado en caja o uno de exhibición. La respuesta depende de tus prioridades y de la transparencia de la tienda.',
      'Un iPhone sellado es una unidad virgen de fábrica: viene con sus precintos originales, 0 ciclos de carga y la experiencia completa de desempaquetado.',
      'Por su parte, un equipo de exhibición ha estado en vitrinas o demostraciones controladas. En Apfel Store, estos equipos pasan por más de 30 puntos de inspección técnica: garantizamos condición física impecable (9.5 a 10 de 10) y salud de batería entre 85% y 100% sin mensajes de piezas desconocidas.',
      'Nuestra regla de oro: nunca compres un equipo de segunda mano o exhibición sin ver previamente fotos y videos de la unidad física exacta que recibirás. En Apfel Store te mostramos el número de serie y la pantalla de ajustes antes de cualquier pago.',
    ],
  },
  {
    slug: 'como-cuidar-salud-bateria-iphone',
    title: 'Salud de batería en iPhone: Mitos, verdades y cómo cuidarla',
    excerpt: 'Aprende qué factores degradan la batería de iones de litio y las configuraciones de iOS que prolongan su vida útil.',
    category: 'Batería y Rendimiento',
    readTime: '4 min de lectura',
    date: '5 de Septiembre, 2026',
    coverImage: '/images/products/15-pro-natural.webp',
    keyTakeaways: [
      'El calor excesivo es el enemigo número uno de la química de la batería.',
      'Activar el límite de carga al 80% en modelos con USB-C reduce el estrés químico.',
      'Una batería por encima del 80% ofrece rendimiento de pico máximo sin ralentizaciones.',
    ],
    content: [
      'La batería del iPhone es un consumible químico que con el tiempo y los ciclos de carga pierde capacidad de retención energética.',
      'El principal factor de degradación no es dejar el teléfono conectado toda la noche, sino el calor. Jugar videojuegos exigentes o cargar el teléfono bajo el sol con fundas gruesas acelera el desgaste más que cualquier otro factor.',
      'Desde el iPhone 15 en adelante, Apple introdujo en Ajustes > Batería la opción de fijar el límite de carga al 80%. Si trabajas en oficina o tienes un cargador a mano, activar este límite prolonga drásticamente la salud de la batería a lo largo de los años.',
      'En Apfel Store entregamos todos nuestros equipos con salud óptima verificada, garantizando un rendimiento sin estrangulamiento térmico ni apagones repentinos.',
    ],
  },
  {
    slug: 'pasar-de-android-a-iphone-sin-perder-datos',
    title: 'Cómo migrar de Android a iPhone sin perder tus fotos ni chats',
    excerpt: 'Paso a paso para transferir tus contactos, fotos y el historial completo de WhatsApp con la app oficial Trasladar a iOS.',
    category: 'Consejos técnicos',
    readTime: '6 min de lectura',
    date: '28 de Agosto, 2026',
    coverImage: '/images/products/16-black.webp',
    keyTakeaways: [
      'Usa la app oficial "Trasladar a iOS" durante la configuración inicial del iPhone.',
      'Asegúrate de que ambos teléfonos estén conectados al mismo Wi-Fi y enchufados a corriente.',
      'Si compras en Apfel Store, un asesor te guía paso a paso por WhatsApp durante tu migración.',
    ],
    content: [
      'Cambiar de sistema operativo solía ser un dolor de cabeza, pero hoy en día el proceso es casi automático gracias a las herramientas oficiales de Apple.',
      'El momento clave para migrar tus datos es durante la pantalla de configuración inicial del iPhone, seleccionando la opción "Transferir datos desde Android".',
      'Para migrar WhatsApp, la app Trasladar a iOS empaqueta tus conversaciones, audios y fotos de manera cifrada y los restaura directamente en el iPhone al registrar tu número.',
      'Consejo fundamental: no configures el iPhone como nuevo antes de la migración, ya que requeriría restablecer de fábrica el equipo para volver a ver la opción de transferencia.',
      'Si compras tu iPhone con Apfel Store y tienes dudas en el proceso, nuestros asesores te acompañan de manera remota para que no pierdas ni un solo recuerdo.',
    ],
  },
];
