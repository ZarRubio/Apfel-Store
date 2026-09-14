import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Original, deliberately illustrative artwork. Replace with licensed product photography when available.
const variants = [
  { slug: 'negro', body: '#34363b', edge: '#74777d', light: '#676a70', shade: '#191a1e' },
  { slug: 'plateado', body: '#d4d8da', edge: '#f3f4f4', light: '#f7f8f8', shade: '#a5abad' },
  { slug: 'glaciar', body: '#b9cbd1', edge: '#e6f0f2', light: '#e5f1f3', shade: '#829da6' },
  { slug: 'borgona', body: '#6f4751', edge: '#ab8188', light: '#a3737d', shade: '#3d252e' },
] as const;

function artwork(color: (typeof variants)[number], max: boolean) {
  const scale = max ? 1 : 0.94;
  const offset = max ? 0 : 36;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
    <defs>
      <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${color.light}"/><stop offset=".42" stop-color="${color.body}"/><stop offset="1" stop-color="${color.shade}"/></linearGradient>
      <linearGradient id="rail"><stop stop-color="${color.shade}"/><stop offset=".16" stop-color="${color.edge}"/><stop offset=".82" stop-color="${color.edge}"/><stop offset="1" stop-color="${color.shade}"/></linearGradient>
      <linearGradient id="screen" x1=".12" y1="0" x2=".88" y2="1"><stop stop-color="#090d16"/><stop offset=".34" stop-color="#303c55"/><stop offset=".55" stop-color="#806a83"/><stop offset=".78" stop-color="#253b52"/><stop offset="1" stop-color="#080b12"/></linearGradient>
      <radialGradient id="glow"><stop stop-color="#d8c2d6" stop-opacity=".8"/><stop offset=".44" stop-color="#7a809a" stop-opacity=".24"/><stop offset="1" stop-color="#101724" stop-opacity="0"/></radialGradient>
      <radialGradient id="lens"><stop stop-color="#4f6683"/><stop offset=".36" stop-color="#131924"/><stop offset=".8" stop-color="#050608"/><stop offset="1" stop-color="#606267"/></radialGradient>
      <filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="28"/></filter>
    </defs>
    <g transform="translate(${offset} ${offset}) scale(${scale})">
      <ellipse cx="610" cy="1067" rx="330" ry="45" fill="#11121a" opacity=".18" filter="url(#shadow)"/>
      <g transform="rotate(-9 490 600)">
        <rect x="244" y="138" width="468" height="914" rx="81" fill="url(#rail)"/>
        <rect x="254" y="148" width="448" height="894" rx="73" fill="url(#body)" stroke="${color.edge}" stroke-width="5"/>
        <rect x="274" y="167" width="408" height="854" rx="59" fill="none" stroke="#fff" stroke-opacity=".22" stroke-width="3"/>
        <rect x="273" y="174" width="283" height="274" rx="65" fill="${color.body}" stroke="${color.edge}" stroke-width="9"/>
        <rect x="290" y="190" width="251" height="244" rx="54" fill="url(#body)" opacity=".75"/>
        <circle cx="354" cy="259" r="51" fill="${color.edge}"/><circle cx="354" cy="259" r="40" fill="url(#lens)" stroke="#181b21" stroke-width="5"/><circle cx="343" cy="246" r="10" fill="#c4d5e6" opacity=".35"/>
        <circle cx="467" cy="259" r="51" fill="${color.edge}"/><circle cx="467" cy="259" r="40" fill="url(#lens)" stroke="#181b21" stroke-width="5"/><circle cx="456" cy="246" r="10" fill="#c4d5e6" opacity=".35"/>
        <circle cx="354" cy="371" r="51" fill="${color.edge}"/><circle cx="354" cy="371" r="40" fill="url(#lens)" stroke="#181b21" stroke-width="5"/><circle cx="343" cy="358" r="10" fill="#c4d5e6" opacity=".35"/>
        <circle cx="470" cy="365" r="16" fill="#f7edda" opacity=".85"/><circle cx="480" cy="410" r="12" fill="#2b2d30"/>
        <path d="M326 963 Q478 1001 639 949" fill="none" stroke="#fff" stroke-opacity=".15" stroke-width="3"/>
      </g>
      <g transform="rotate(8 759 600)">
        <rect x="551" y="164" width="414" height="872" rx="73" fill="#16191e" stroke="#aab0b5" stroke-width="11"/>
        <rect x="564" y="177" width="388" height="846" rx="61" fill="url(#screen)"/>
        <ellipse cx="767" cy="609" rx="280" ry="370" fill="url(#glow)"/>
        <path d="M579 861 C720 780 811 842 948 727" fill="none" stroke="#d8bed9" stroke-opacity=".45" stroke-width="25" filter="url(#shadow)"/>
        <path d="M578 889 C732 813 830 878 946 754" fill="none" stroke="#d2b7cc" stroke-opacity=".55" stroke-width="8"/>
        <rect x="689" y="198" width="137" height="37" rx="19" fill="#030406"/><circle cx="803" cy="216" r="6" fill="#1a2637"/>
        <path d="M583 227 Q574 227 574 261 L574 925" fill="none" stroke="#fff" stroke-opacity=".18" stroke-width="4"/>
      </g>
    </g>
  </svg>`;
}

const outputRoot = path.join(process.cwd(), 'public', 'products', 'normalized');
for (const model of ['iphone-18-pro', 'iphone-18-pro-max'] as const) {
  const directory = path.join(outputRoot, model);
  await mkdir(directory, { recursive: true });
  for (const variant of variants) {
    const output = path.join(directory, `${model}-${variant.slug}.webp`);
    await sharp(Buffer.from(artwork(variant, model.endsWith('max')))).webp({ quality: 90, effort: 6 }).toFile(output);
    console.log(output);
  }
}
