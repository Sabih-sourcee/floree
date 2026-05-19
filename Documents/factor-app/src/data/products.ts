// src/data/products.ts
import { Category, Product } from '../types';

// Base path for assets served from /public
const B = '/Assets/product pics/Organzied';

export const CATEGORIES: Category[] = [
  {
    id: 'cob-series',
    name: 'COB Series',
    thumbnail: `${B}/COB Series/02_cob-light1.jpg.jpeg`,
    products: [
      { id: 'cob-c-series', name: 'C Series', categoryId: 'cob-series', categoryName: 'COB Series', images: [`${B}/COB Series/C.png`], description: 'High-efficiency COB chip-on-board LED light for commercial and residential use.' },
      { id: 'cob-sasa', name: 'SASA', categoryId: 'cob-series', categoryName: 'COB Series', images: [`${B}/COB Series/Sasa.png`], description: 'Compact SASA COB light with superior lumen output and long lifespan.' },
    ],
  },
  {
    id: 'downlights',
    name: 'Downlights',
    thumbnail: `${B}/Downlights/06_star-downlight1.jpg.jpeg`,
    products: [
      { id: 'alkor-downlight', name: 'Alkor', categoryId: 'downlights', categoryName: 'Downlights', images: [`${B}/Downlights/Alkore Downlight.png`], description: 'Architectural Alkor downlight with precision beam optics and die-cast aluminum housing.' },
      { id: 'glow-downlight', name: 'Glow', categoryId: 'downlights', categoryName: 'Downlights', images: [`${B}/Downlights/Glow Lightks.png`], description: 'Warm-glow downlight ideal for hospitality and high-end residential installations.' },
      { id: 'range-downlight', name: 'Range', categoryId: 'downlights', categoryName: 'Downlights', images: [`${B}/Downlights/Range.png`], description: 'Versatile range downlight available in multiple wattages and CCT options.' },
      { id: 'star-downlight', name: 'Star', categoryId: 'downlights', categoryName: 'Downlights', images: [`${B}/Downlights/STAR.png`], description: 'Premium Star series downlight with anti-glare design and high CRI rendering.' },
    ],
  },
  {
    id: 'mercury-series',
    name: 'Mercury Series',
    thumbnail: `${B}/Mercury Series/03_Mercury-Series1.jpg.jpeg`,
    products: [
      { id: 'mercury-circle', name: 'Mercury Circle Series', categoryId: 'mercury-series', categoryName: 'Mercury Series', images: [`${B}/Mercury Series/Mercury Circle.png`], description: 'Circular surface-mounted Mercury light with elegant form and even illumination.' },
      { id: 'mercury-square', name: 'Mercury Square Series', categoryId: 'mercury-series', categoryName: 'Mercury Series', images: [`${B}/Mercury Series/Mercury Circle.png`], description: 'Square-profile Mercury light for modern grid-ceiling and feature lighting.' },
      { id: 'mercury-surface', name: 'Mercury Surface', categoryId: 'mercury-series', categoryName: 'Mercury Series', images: [`${B}/Mercury Series/Mercury Surface light.png`], description: 'Surface-mounted Mercury with ultra-slim profile and 120° beam spread.' },
    ],
  },
  {
    id: 'dc-series',
    name: 'DC Series',
    thumbnail: null,
    products: [
      { id: 'dc-solo-bulb', name: 'DC Solo Bulb', categoryId: 'dc-series', categoryName: 'DC Series', images: [`${B}/DC Series/solo.png`], description: 'DC-powered LED bulb for solar systems and off-grid applications.' },
      { id: 'orion-dc', name: 'Orion DC', categoryId: 'dc-series', categoryName: 'DC Series', images: [`${B}/DC Series/Orion DC.png`], description: 'Orion DC LED bulb with wide voltage range and high shock resistance.' },
    ],
  },
  {
    id: 'led-bulbs',
    name: 'LED Bulbs',
    thumbnail: null,
    products: [
      { id: 'blaz', name: 'Blaz', categoryId: 'led-bulbs', categoryName: 'LED Bulbs', images: [`${B}/LED Bulbs/Blaz.png`], description: 'Energy-efficient Blaz LED bulb with E27 base and warm white output.' },
      { id: 'lomo', name: 'Lomo', categoryId: 'led-bulbs', categoryName: 'LED Bulbs', images: [`${B}/LED Bulbs/Lomo.png`], description: 'Compact Lomo bulb with 270° beam angle for complete room illumination.' },
      { id: 'range-bulb', name: 'Range Bulb', categoryId: 'led-bulbs', categoryName: 'LED Bulbs', images: [`${B}/LED Bulbs/Range.png`], description: 'Range series LED bulb available in 7W, 9W, 12W, 15W and 18W variants.' },
    ],
  },
  {
    id: 'tubelights',
    name: 'Tubelights',
    thumbnail: `${B}/Tubelights/01_Tubelights1t.jpg.jpeg`,
    products: [
      { id: 'm3-mini', name: 'M3 Mini', categoryId: 'tubelights', categoryName: 'Tubelights', images: [`${B}/Tubelights/M3 Light - Mini small.png`], description: 'Compact M3 Mini tubelight for under-cabinet and accent lighting.' },
      { id: 'm-series', name: 'M Series', categoryId: 'tubelights', categoryName: 'Tubelights', images: [`${B}/Tubelights/M3 Light.png`, `${B}/Tubelights/M3 Light 2.png`], description: 'Full-length M Series LED tube replacement with T8 compatibility.' },
      { id: 'tu-series', name: 'TU Series', categoryId: 'tubelights', categoryName: 'Tubelights', images: [`${B}/Tubelights/Tu seri.png`, `${B}/Tubelights/TU-60.png`], description: 'TU Series energy-efficient tube light with 60cm and 120cm profiles.' },
      { id: 'zeno', name: 'Zeno', categoryId: 'tubelights', categoryName: 'Tubelights', images: [`${B}/Tubelights/Zeno Tube light With shadow.png`], description: 'Premium Zeno tube light with diffused optic for glare-free illumination.' },
    ],
  },
  {
    id: 'flood-lights',
    name: 'Flood Lights',
    thumbnail: `${B}/Flood Lights/09_Flood-Lights1.jpg.jpeg`,
    products: [
      { id: 'mars-series', name: 'Mars Series', categoryId: 'flood-lights', categoryName: 'Flood Lights', images: [`${B}/Flood Lights/Mars-Series-MARS-200-watts.png`], description: 'Powerful Mars Series flood light rated IP66 for outdoor and industrial use.' },
      { id: 'venus-series', name: 'Venus Series', categoryId: 'flood-lights', categoryName: 'Flood Lights', images: [`${B}/Flood Lights/Mars-Series-MARS-200-watts.png`], description: 'Venus Series flood light with narrow beam and high-lumen output for stadiums.' },
      { id: 'rgb-reflector-flood', name: 'RGB Reflector', categoryId: 'flood-lights', categoryName: 'Flood Lights', images: [`${B}/Flood Lights/RGB flood light.png`], description: 'RGB colour-changing reflector flood light for architectural and entertainment use.' },
    ],
  },
  {
    id: 'track-lights',
    name: 'Track Lights',
    thumbnail: `${B}/Track Lights/05_track-light1.jpg.jpeg`,
    products: [
      {
        id: 'track-spot-light',
        name: 'Track Spot Light',
        categoryId: 'track-lights',
        categoryName: 'Track Lights',
        images: [
          `${B}/Track Lights/TRACK LIGHT/DSC_0639 copy.png`,
          `${B}/Track Lights/TRACK LIGHT/DSC_0641 copy.png`,
          `${B}/Track Lights/TRACK LIGHT/DSC_0644 copy.png`,
          `${B}/Track Lights/TRACK LIGHT/DSC_0647 copy.png`,
          `${B}/Track Lights/TRACK LIGHT/DSC_0650 copy.png`,
        ],
        description: 'Adjustable track spotlight for retail, gallery, and accent lighting.',
      },
    ],
  },
  {
    id: 'industrial-lighting',
    name: 'Industrial Lighting',
    thumbnail: `${B}/Industrial Lighting/13_Highbay1.jpg.jpeg`,
    products: [
      { id: 'highbay', name: 'Highbay', categoryId: 'industrial-lighting', categoryName: 'Industrial Lighting', images: [`${B}/Industrial Lighting/13_Highbay1.jpg.jpeg`], description: 'Heavy-duty UFO Highbay LED for warehouses, factories, and large industrial spaces.' },
    ],
  },
  {
    id: 'panel-lights',
    name: 'Panel Lights',
    thumbnail: `${B}/Panel Lights/04_Panel-Lights1p.jpg.jpeg`,
    products: [
      { id: 'pl-5', name: 'PL-5', categoryId: 'panel-lights', categoryName: 'Panel Lights', images: [`${B}/Panel Lights/PL-5.png`], description: 'PL-5 slim edge-lit panel light for drop ceilings, 600x600mm profile.' },
      { id: 'pl-14', name: 'PL-14', categoryId: 'panel-lights', categoryName: 'Panel Lights', images: [`${B}/Panel Lights/PL-14.png`], description: 'PL-14 ultra-thin panel light with uniform luminance and UGR<19 rating.' },
    ],
  },
  {
    id: 'street-lights',
    name: 'Street Lights',
    thumbnail: `${B}/Street Lights/08_Street-Lights1.jpg.jpeg`,
    products: [
      { id: 'solar-street-light', name: 'Solar Street Light', categoryId: 'street-lights', categoryName: 'Street Lights', images: [`${B}/Street Lights/Solar Street Light.png`], description: 'All-in-one solar street light with integrated panel, battery, and motion sensor.' },
      { id: 'st-light', name: 'ST Light', categoryId: 'street-lights', categoryName: 'Street Lights', images: [`${B}/Street Lights/1. ST 50.png`], description: 'ST50 street light with die-cast housing and IP66 protection for urban roads.' },
      { id: 'serene-street-light', name: 'Serene Street Light', categoryId: 'street-lights', categoryName: 'Street Lights', images: [`${B}/Street Lights/Serene ST - 50 02.png`], description: 'Serene series decorative street light with curved arm for boulevards and parks.' },
    ],
  },
  {
    id: 'architectural-lighting',
    name: 'Architectural Lighting',
    thumbnail: `${B}/Architectural Lighting/07_Architectural-Lighting1.jpg.jpeg`,
    products: [
      { id: 'lime-rope', name: 'Lime Rope Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Aura.png`], description: 'Flexible Lime rope light for cove, contour, and feature lighting.' },
      { id: 'glossy', name: 'Glossy', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Gleam.png`], description: 'Glossy profile light with reflective finish for high-end retail and hospitality.' },
      { id: 'profile-light', name: 'Profile Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Profile light Separator.png`], description: 'Recessed profile light separator for clean architectural line definition.' },
      { id: 'lazer-blade-light', name: 'Lazer Blade Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: ['https://res.cloudinary.com/dkxa7oj4p/image/upload/q_auto/f_auto/v1778935013/zntqd3sd5pngnltxs4ncuogzgxx6_z8bd1f.png'], description: 'Ultra-slim Lazer Blade recessed linear light for precision architectural applications.' },
      { id: 'aura-rope-light', name: 'Aura Rope Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Aura.png`], description: 'Aura neon-flex rope light with IP65 rating for indoor and outdoor cove lighting.' },
      { id: 'flowy-rope-light', name: 'Flowy Rope Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Flowy.png`], description: 'Flowy soft silicone rope light for curved and freeform installations.' },
      { id: 'gleam-rope-light', name: 'Gleam Rope Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Gleam.png`], description: 'Gleam rope light with high-density LEDs for vibrant colour saturation.' },
      { id: 'linear-led-light', name: 'Linear LED Light', categoryId: 'architectural-lighting', categoryName: 'Architectural Lighting', images: [`${B}/Architectural Lighting/Linear tubelight/1/DSC_5084.JPG`, `${B}/Architectural Lighting/Linear tubelight/1/DSC_5086.JPG`, `${B}/Architectural Lighting/Linear tubelight/2/DSC_5105.JPG`], description: 'Recessed linear LED light channel for clean, continuous line illumination.' },
    ],
  },
  {
    id: 'premium-products',
    name: 'Premium Products',
    thumbnail: `${B}/Premium Products/10_Premium-Products1.jpg.jpeg`,
    products: [
      { id: 'tubix', name: 'Tubix', categoryId: 'premium-products', categoryName: 'Premium Products', images: [`${B}/Premium Products/Tubix.png`], description: 'Premium Tubix LED tube with aircraft-grade aluminum body and 5-year warranty.' },
      { id: 'lux-bulb', name: 'Lux', categoryId: 'premium-products', categoryName: 'Premium Products', images: [`${B}/Premium Products/Premium Lux Bulb.png`], description: 'Lux premium LED bulb with 95+ CRI and flicker-free driver for luxury settings.' },
      { id: 'optima', name: 'Optima', categoryId: 'premium-products', categoryName: 'Premium Products', images: [`${B}/Premium Products/Premium DL Optima/New Downlight 02.png`, `${B}/Premium Products/Premium DL Optima/New Downlight 3.png`], description: 'Optima premium downlight with motorised zoom optic and DMX control.' },
      { id: 'elite', name: 'Elite', categoryId: 'premium-products', categoryName: 'Premium Products', images: [`${B}/Premium Products/elite.png`], description: 'Elite series flagship downlight with integrated emergency pack and IP65 trim.' },
      {
        id: 'hile-flood-maxon',
        name: 'Hile Flood Light',
        categoryId: 'premium-products',
        categoryName: 'Premium Products',
        images: [`${B}/Premium Products/Hile Flood Light (MAXON)/MAXON Flood light/floodlight picture/100W/100W.png`],
        variants: [
          { wattage: '50W', images: [`${B}/Premium Products/Hile Flood Light (MAXON)/MAXON Flood light/floodlight picture/50W/50W.png`] },
          { wattage: '100W', images: [`${B}/Premium Products/Hile Flood Light (MAXON)/MAXON Flood light/floodlight picture/100W/100W.png`] },
          { wattage: '150W', images: [`${B}/Premium Products/Hile Flood Light (MAXON)/MAXON Flood light/floodlight picture/150W/150W.png`] },
          { wattage: '200W', images: [`${B}/Premium Products/Hile Flood Light (MAXON)/MAXON Flood light/floodlight picture/200W/200W.png`] },
          { wattage: '300W', images: [`${B}/Premium Products/Hile Flood Light (MAXON)/MAXON Flood light/floodlight picture/300W/300W.png`] },
        ],
        description: 'MAXON Hile premium flood light with die-cast housing, available 50W–300W.',
      },
      {
        id: 'hila-street-apex',
        name: 'Hila Street Light',
        categoryId: 'premium-products',
        categoryName: 'Premium Products',
        images: [`${B}/Premium Products/Hila Street Light (APEX)/APEX STREET LIGHT/100W/100W.png`],
        variants: [
          { wattage: '50W', images: [`${B}/Premium Products/Hila Street Light (APEX)/APEX STREET LIGHT/50W/50W.png`] },
          { wattage: '100W', images: [`${B}/Premium Products/Hila Street Light (APEX)/APEX STREET LIGHT/100W/100W.png`] },
          { wattage: '200W', images: [`${B}/Premium Products/Hila Street Light (APEX)/APEX STREET LIGHT/200W/200W.png`] },
        ],
        description: 'APEX Hila premium street light with asymmetric optic for road-grade illumination.',
      },
    ],
  },
  {
    id: 'breaker-series',
    name: 'Breaker Series',
    thumbnail: `${B}/Breaker Series/12_Breaker-Series1.jpg.jpeg`,
    products: [
      {
        id: 'mcb',
        name: 'MCB Series',
        categoryId: 'breaker-series',
        categoryName: 'Breaker Series',
        images: [
          `${B}/Breaker Series/DSC_0721 copy.png`,
          `${B}/Breaker Series/DSC_0724 copy.png`,
          `${B}/Breaker Series/DSC_0727 copy.png`,
        ],
        description: 'Miniature Circuit Breaker series rated 6A–63A for residential and commercial panels.',
      },
    ],
  },
  {
    id: 'devices',
    name: 'Devices',
    thumbnail: `${B}/Devices/14_Devices1.jpg.jpeg`,
    products: [
      {
        id: 'vakwh-voltage-protector',
        name: 'VAKWH Voltage Protector',
        categoryId: 'devices',
        categoryName: 'Devices',
        images: [`${B}/Devices/DEVICE/DSC_0678 copy.png`, `${B}/Devices/DEVICE/DSC_0680 copy.png`, `${B}/Devices/DEVICE/DSC_0685 copy.png`],
        description: 'VAKWH voltage protector with automatic cut-off and surge protection for appliances.',
      },
      {
        id: 'heat-aerosol-fire-extinguisher',
        name: 'Heat Aerosol Fire Extinguisher',
        categoryId: 'devices',
        categoryName: 'Devices',
        images: [
          `${B}/Devices/Heat Aerosol Fire Extinguisher Relay/RED PRODUCT WITH TEXT 01.jpg`,
          `${B}/Devices/Heat Aerosol Fire Extinguisher Relay/RED PRODUCT WITH TEXT 02.jpg`,
        ],
        description: 'Automatic heat-activated aerosol fire suppression device for electrical panels.',
      },
    ],
  },
  {
    id: 'pvc-tapes',
    name: 'PVC Tapes',
    thumbnail: `${B}/PVC Tapes/15_PVC-Tapes1.jpg.jpeg`,
    products: [
      { id: 'match-tape', name: 'Match', categoryId: 'pvc-tapes', categoryName: 'PVC Tapes', images: [`${B}/PVC Tapes/15_PVC-Tapes1.jpg.jpeg`], description: 'Match PVC insulation tape with strong adhesion and 90°C heat resistance.' },
      { id: 'klas-tape', name: 'Klas', categoryId: 'pvc-tapes', categoryName: 'PVC Tapes', images: [`${B}/PVC Tapes/15_PVC-Tapes1.jpg.jpeg`], description: 'Klas heavy-duty PVC tape for electrical insulation and harness wrapping.' },
    ],
  },
];

// Flat list of all products for search
export const ALL_PRODUCTS: Product[] = CATEGORIES.flatMap(cat => cat.products);
