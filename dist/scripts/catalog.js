// Precios de referencia del catálogo El Convoy revisado durante la planificación.
// Confirmar precios, disponibilidad, condición y número de WhatsApp antes de venta pública.
export const STORE = {
  name: 'Apfel Store',
  whatsapp: '51931436218',
  referenceDate: '2026-09-13',
  preview: true
};
export const products = [
  {id:'iphone-17-pro-max', name:'iPhone 17 Pro Max', generation:'17', line:'Pro Max', condition:'Sellado', price:5000, capacities:[{label:'256 GB',price:5000},{label:'512 GB',price:5600}], colors:[{name:'Plateado',hex:'#d3d3cf',image:'17-pro-silver.webp'},{name:'Azul',hex:'#38445a',image:'17-pro-blue.webp'},{name:'Naranja',hex:'#c87540',image:'17-pro-orange.webp'}], tagline:'Todo el potencial. En grande.', short:'Para quienes lo quieren todo.', image:'17-pro-silver.webp', screen:'6.9 pulgadas', chip:'A19 Pro',camera:'Sistema de cámaras Pro',featured:true},
  {id:'iphone-17-pro',name:'iPhone 17 Pro',generation:'17',line:'Pro',condition:'Sellado',price:4600,capacities:[{label:'256 GB',price:4600}],colors:[{name:'Azul',hex:'#38445a',image:'17-pro-blue.webp'},{name:'Plateado',hex:'#d3d3cf',image:'17-pro-silver.webp'},{name:'Naranja',hex:'#c87540',image:'17-pro-orange.webp'}],tagline:'Pro. En cada detalle.',short:'Potencia que se nota.',image:'17-pro-blue.webp',screen:'6.3 pulgadas',chip:'A19 Pro',camera:'Sistema de cámaras Pro',featured:true},
  {id:'iphone-17',name:'iPhone 17',generation:'17',line:'Base',condition:'Sellado',price:3450,capacities:[{label:'256 GB',price:3450}],colors:[{name:'Lavanda',hex:'#c1b8d7',image:'17-lavender.webp'},{name:'Negro',hex:'#333437',image:'17-black.webp'}],tagline:'Más de lo que te encanta.',short:'Un gran salto para tu día a día.',image:'17-lavender.webp',screen:'6.3 pulgadas',chip:'A19',camera:'Sistema de cámara dual',featured:true},
  {id:'iphone-16-pro-max',name:'iPhone 16 Pro Max',generation:'16',line:'Pro Max',condition:'Sellado',price:4400,capacities:[{label:'256 GB',price:4400}],colors:[{name:'Titanio Natural',hex:'#a79e91',image:'16-pro-natural.webp'}],tagline:'Una experiencia a lo grande.',short:'Diseño en titanio. Espíritu Pro.',image:'16-pro-natural.webp',screen:'6.9 pulgadas',chip:'A18 Pro',camera:'Sistema de cámaras Pro',featured:false},
  {id:'iphone-16',name:'iPhone 16',generation:'16',line:'Base',condition:'Sellado',price:3000,capacities:[{label:'128 GB',price:3000}],colors:[{name:'Negro',hex:'#343637',image:'16-black.webp'}],tagline:'Hecho para tu día a día.',short:'Todo lo que te gusta de iPhone.',image:'16-black.webp',screen:'6.1 pulgadas',chip:'A18',camera:'Sistema de cámara dual',featured:true},
  {id:'iphone-15-pro-max',name:'iPhone 15 Pro Max',generation:'15',line:'Pro Max',condition:'De exhibición',price:3200,capacities:[{label:'256 GB',price:3200}],colors:[{name:'Titanio Natural',hex:'#9d9689',image:'15-pro-natural.webp'}],tagline:'Tu entrada al mundo Pro.',short:'Conoce el estado de tu equipo.',image:'15-pro-natural.webp',screen:'6.7 pulgadas',chip:'A17 Pro',camera:'Sistema de cámaras Pro',featured:false}
];
export const money = value => new Intl.NumberFormat('es-PE',{style:'currency',currency:'PEN',maximumFractionDigits:0}).format(value);
export function findProduct(id){return products.find(product=>product.id===id);}
export function whatsappUrl(product,capacityIndex=0,colorIndex=0){
  let message = `Hola ${STORE.name}, vengo de la web y quisiera asesoría para elegir mi iPhone.`;
  if(product){
    const capacity=product.capacities[capacityIndex];
    const color=product.colors[colorIndex];
    const link=new URL(`/producto/${product.id}/`,location.origin);
    link.searchParams.set('capacidad',String(capacityIndex));
    link.searchParams.set('color',String(colorIndex));
    message=`Hola ${STORE.name}, me interesa el ${product.name}:\nCapacidad: ${capacity.label}\nColor: ${color.name}\nCondición: ${product.condition}\nPrecio de referencia: ${money(capacity.price)}\n¿Me confirman disponibilidad, precio final y opciones de entrega?\n${link.href}`;
  }
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(message)}`;
}
