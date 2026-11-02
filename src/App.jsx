import React, { useState, useEffect } from 'react';
import { 
  Search, MessageCircle, Lock, X, ArrowRight, Check, Plus, Trash2, Edit2
} from 'lucide-react';

const PRODUCTS_DATA = [
  {
    id: '1',
    name: 'Chaqueta Bomber Suede Moka',
    price: 95.00,
    category: 'Chaquetas',
    featured: true,
    isNew: true,
    description: 'Chaqueta corta en acabado suave tipo ante de tono marrón moka con cremallera metálica, solapas estructuradas y puños elasticados. Combínala con pantalones de talle alto.',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
    ],
    variants: [
      { size: 'S', color: 'Marrón Moka', stock: 4 },
      { size: 'M', color: 'Marrón Moka', stock: 6 },
      { size: 'L', color: 'Marrón Moka', stock: 2 }
    ]
  },
  {
    id: '2',
    name: 'Blazer Estructurado Cuadros Heritage',
    price: 120.00,
    category: 'Chaquetas',
    featured: true,
    isNew: true,
    description: 'Chaqueta corta confeccionada con tejido de cuadros clásicos en tonos neutros y arena. Posee cuello mao levantado, bolsillos de parche con solapa y corte limpio.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000'
    ],
    variants: [
      { size: 'S', color: 'Beige / Arena', stock: 3 },
      { size: 'M', color: 'Beige / Arena', stock: 5 }
    ]
  },
  {
    id: '3',
    name: 'Top Drapeado Espalda Descubierta',
    price: 52.00,
    category: 'Blusas',
    featured: true,
    isNew: false,
    description: 'Top minimalista en tono café profundo con cuello halter envuelto y dramático escote en la espalda. Confeccionado en tejido de suave elasticidad que ajusta la figura.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000'
    ],
    variants: [
      { size: 'XS', color: 'Café Moka', stock: 2 },
      { size: 'S', color: 'Café Moka', stock: 5 },
      { size: 'M', color: 'Café Moka', stock: 4 }
    ]
  }
];

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('emar_products_v4');
    return saved ? JSON.parse(saved) : PRODUCTS_DATA;
  });

  const [whatsappNumber] = useState('584140000000');
  const [activeTab, setActiveTab] = useState('catalog');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  useEffect(() => {
    localStorage.setItem('emar_products_v4', JSON.stringify(products));
  }, [products]);

  const categories = ['Todos', 'Chaquetas', 'Blusas', 'Vestidos', 'Pantalones', 'Conjuntos', 'Accesorios'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
  };

  const sendWhatsAppMessage = (product) => {
    const text = `Hola EMAR, me gustaría consultar la disponibilidad del producto "${product.name}".\nPrecio: $${product.price.toFixed(2)}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] font-sans">
      {/* Header Fijo con Fondo Marfil / Beige Cálido */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => setActiveTab('catalog')} className="flex items-center gap-3">
            <span className="font-serif text-3xl tracking-[0.3em] text-[#3D2A21] font-bold">EMAR</span>
          </button>

          <nav className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium">
            <button onClick={() => setActiveTab('catalog')} className={`hover:text-[#5C4033] transition-colors ${activeTab === 'catalog' ? 'text-[#3D2A21] font-bold border-b-2 border-[#3D2A21] pb-1' : 'text-gray-500'}`}>
              Catálogo
            </button>
            <button onClick={() => setActiveTab('about')} className={`hover:text-[#5C4033] transition-colors ${activeTab === 'about' ? 'text-[#3D2A21] font-bold border-b-2 border-[#3D2A21] pb-1' : 'text-gray-500'}`}>
              Sobre Nosotros
            </button>
          </nav>

          <a 
            href={`https://wa.me/${whatsappNumber}`} 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-2 bg-[#3D2A21] text-white px-5 py-2.5 rounded-full text-xs uppercase tracking-widest hover:bg-[#5C4033] transition-all shadow-sm"
          >
            <MessageCircle size={15} className="text-[#C5A059]" />
            <span>WhatsApp</span>
          </a>
        </div>
      </header>

      {/* Hero Section idéntica al diseño editorial inicial */}
      <section className="relative h-[85vh] min-h-[550px] flex items-center justify-center bg-[#1A1A1A] overflow-hidden">
        {/* Fotografía de moda editorial de alta definición */}
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
          alt="EMAR Editorial Lookbook" 
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />
        
        {/* Capa de sombreado graduado para contraste perfecto de texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/60 to-[#1A1A1A]/30" />

        <div className="relative text-center text-white px-4 max-w-4xl mx-auto space-y-6">
          <span className="inline-block text-[11px] uppercase tracking-[0.4em] text-[#C5A059] font-bold bg-[#1A1A1A]/60 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#C5A059]/30">
            NUEVA COLECCIÓN 2026
          </span>
          
          <h1 className="font-serif text-5xl sm:text-7xl font-normal tracking-wide leading-tight drop-shadow-lg text-[#FAF8F5]">
            Elegancia Sobria &amp; Contemporánea
          </h1>
          
          <p className="text-sm sm:text-base font-light text-[#E8E2D9] max-w-xl mx-auto leading-relaxed drop-shadow">
            Diseño independiente y curaduría de moda femenina de alta gama. Piezas exclusivas que combinan sofisticación y estilo atemporal.
          </p>
          
          <div className="pt-6">
            <a 
              href="#catalogo" 
              className="inline-flex items-center gap-3 bg-[#FAF8F5] text-[#3D2A21] px-8 py-3.5 rounded-full text-xs uppercase tracking-[0.2em] font-semibold hover:bg-[#C5A059] hover:text-white transition-all shadow-xl hover:scale-105"
            >
              Explorar Catálogo <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* Catálogo Principales */}
      <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#3D2A21] tracking-wide">Catálogo Exclusivo</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">{filteredProducts.length} Piezas Seleccionadas</p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text"
              placeholder="Buscar prenda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E8E2D9] rounded-full text-xs uppercase tracking-wider focus:outline-none focus:border-[#3D2A21]"
            />
          </div>
        </div>

        {/* Categorías */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 border-b border-[#E8E2D9]">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs uppercase tracking-wider transition-all whitespace-nowrap ${selectedCategory === cat ? 'bg-[#3D2A21] text-white font-semibold' : 'bg-white border border-[#E8E2D9] text-gray-600 hover:border-[#3D2A21]'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Rejilla de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              onClick={() => handleOpenProduct(product)}
              className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-[#E8E2D9] hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[3/4] bg-[#E8E2D9]/30 overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                {product.isNew && (
                  <span className="absolute top-4 left-4 bg-[#3D2A21] text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">Nuevo</span>
                )}
              </div>
              <div className="p-5 flex flex-col flex-grow justify-between space-y-3">
                <div>
                  <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-semibold">{product.category}</span>
                  <h3 className="font-serif text-xl text-[#1A1A1A] group-hover:text-[#5C4033] transition-colors mt-1">{product.name}</h3>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D9]/60">
                  <span className="font-semibold text-base text-[#3D2A21]">${product.price.toFixed(2)}</span>
                  <span className="text-xs text-[#5C4033] font-medium underline tracking-wider">Ver Ficha</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Ficha Producto */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-3xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D9] max-h-[90vh] flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-[#1A1A1A] flex items-center justify-center p-4">
              <img 
                src={selectedProduct.images[0]} 
                alt={selectedProduct.name}
                className="max-h-[420px] object-contain rounded-lg"
              />
            </div>
            <div className="md:w-1/2 p-8 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] text-[#C5A059] uppercase tracking-widest font-bold">{selectedProduct.category}</span>
                    <h3 className="font-serif text-2xl text-[#3D2A21]">{selectedProduct.name}</h3>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="text-gray-400 hover:text-black">
                    <X size={20} />
                  </button>
                </div>
                <p className="text-2xl font-semibold text-[#5C4033]">${selectedProduct.price.toFixed(2)}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="pt-6 border-t border-[#E8E2D9] mt-6">
                <button
                  onClick={() => sendWhatsAppMessage(selectedProduct)}
                  className="w-full bg-[#3D2A21] text-white py-3.5 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-[#5C4033] transition-all shadow-md"
                >
                  <MessageCircle size={16} className="text-[#C5A059]" />
                  Comprar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 mt-auto border-t border-[#3D2A21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="font-serif text-3xl tracking-[0.3em] text-[#C5A059] block">EMAR</span>
          <p className="text-xs text-gray-400 max-w-md mx-auto">Boutique de moda femenina contemporánea y catálogo exclusivo.</p>
          <div className="pt-4 text-[10px] text-gray-500 uppercase tracking-widest">
            © 2026 EMAR Boutique. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
