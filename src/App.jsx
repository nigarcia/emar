import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Search, Filter, MessageCircle, Menu, X, Plus, Trash2, Edit2, 
  Check, ChevronRight, Lock, Eye, RefreshCw, Star, SlidersHorizontal, Settings, ArrowRight, User
} from 'lucide-react';

const LOGO_SRC = "https://i.ibb.co/68vM3M9/emar-logo.png"; // Fallback placeholder logo

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Chaqueta Bombeér Ante Suede',
    price: 85.00,
    category: 'Chaqueta',
    featured: true,
    isNew: true,
    description: 'Chaqueta en acabado tipo ante suave con cierre frontal metálico, corte ajustado a la cintura y mangas acentuadas. Una pieza versátil para superposiciones elegantes.',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000'
    ],
    variants: [
      { size: 'S', color: 'Marrón Chocolate', stock: 3 },
      { size: 'M', color: 'Marrón Chocolate', stock: 5 },
      { size: 'L', color: 'Marrón Chocolate', stock: 2 }
    ]
  },
  {
    id: '2',
    name: 'Blazer Estructurado Cuadros Heritage',
    price: 110.00,
    category: 'Chaquetas',
    featured: true,
    isNew: true,
    description: 'Chaqueta corta con patrón de cuadros tradicionales, cuello alto estilizado y solapas de bolsillo frontales. Confección sutilmente rígida para un ajuste impecable.',
    images: [
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000'
    ],
    variants: [
      { size: 'S', color: 'Beige / Arena', stock: 4 },
      { size: 'M', color: 'Beige / Arena', stock: 2 }
    ]
  },
  {
    id: '3',
    name: 'Top Drapeado Espalda Descubierta',
    price: 48.00,
    category: 'Blusas',
    featured: false,
    isNew: false,
    description: 'Top sofisticado de tono café en tela fluida de caída suave. Diseño con escote profundo en la espalda y drapeado envolvente que resalta la silueta.',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000'
    ],
    variants: [
      { size: 'XS', color: 'Marrón Moka', stock: 2 },
      { size: 'S', color: 'Marrón Moka', stock: 6 },
      { size: 'M', color: 'Marrón Moka', stock: 3 }
    ]
  }
];

export default function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('emar_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return localStorage.getItem('emar_wa_phone') || '584140000000';
  });

  const [activeTab, setActiveTab] = useState('catalog');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPass, setAdminPass] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Filtering & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('Todas');
  const [priceRange, setPriceRange] = useState(200);

  // Modal Detail state
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('emar_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('emar_wa_phone', whatsappNumber);
  }, [whatsappNumber]);

  const categories = ['Todos', 'Chaquetas', 'Blusas', 'Vestidos', 'Pantalones', 'Conjuntos', 'Accesorios'];
  const sizes = ['Todas', 'XS', 'S', 'M', 'L', 'XL'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchesPrice = p.price <= priceRange;
    const matchesSize = selectedSizeFilter === 'Todas' || p.variants.some(v => v.size === selectedSizeFilter && v.stock > 0);
    return matchesSearch && matchesCat && matchesPrice && matchesSize;
  });

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setActiveImageIdx(0);
    if (product.variants.length > 0) {
      setSelectedSize(product.variants[0].size);
      setSelectedColor(product.variants[0].color);
    }
  };

  const getVariantStock = (product, size, color) => {
    const v = product.variants.find(v => v.size === size && v.color === color);
    return v ? v.stock : 0;
  };

  const sendWhatsAppMessage = (product, size, color) => {
    const text = `Hola EMAR, estoy interesada en el producto "${product.name}".\nPrecio: $${product.price.toFixed(2)}\nTalla: ${size || 'N/A'}\nColor: ${color || 'N/A'}\n¿Podrían indicarme la disponibilidad y método de pago?`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A]">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => setActiveTab('catalog')} className="flex items-center gap-2">
            <span className="font-serif text-3xl tracking-widest text-[#3D2A21] font-bold">EMAR</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
            <button onClick={() => setActiveTab('catalog')} className={`hover:text-[#5C4033] transition-colors ${activeTab === 'catalog' ? 'text-[#5C4033] font-bold border-b border-[#5C4033]' : 'text-gray-600'}`}>
              Catálogo
            </button>
            <button onClick={() => setActiveTab('about')} className={`hover:text-[#5C4033] transition-colors ${activeTab === 'about' ? 'text-[#5C4033] font-bold border-b border-[#5C4033]' : 'text-gray-600'}`}>
              Sobre Nosotros
            </button>
            <button onClick={() => setActiveTab('admin')} className={`flex items-center gap-1 hover:text-[#5C4033] transition-colors ${activeTab === 'admin' ? 'text-[#5C4033] font-bold' : 'text-gray-600'}`}>
              <Lock size={12} /> Admin
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <a 
              href={`https://wa.me/${whatsappNumber}`} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#3D2A21] text-white px-4 py-2 rounded-full text-xs uppercase tracking-wider hover:bg-[#5C4033] transition-colors"
            >
              <MessageCircle size={14} className="text-[#C5A059]" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      {activeTab === 'catalog' && (
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center bg-[#E8E2D9] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
              alt="EMAR Lookbook" 
              className="absolute inset-0 w-full h-full object-cover object-center opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 via-transparent to-transparent" />
            
            <div className="relative text-center text-white px-4 max-w-3xl mx-auto space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] font-medium text-[#E8E2D9]">Nueva Colección 2026</span>
              <h1 className="font-serif text-5xl sm:text-7xl font-light tracking-wide leading-tight">Elegancia Sobria & Contemporánea</h1>
              <p className="text-sm sm:text-base font-light text-[#E8E2D9] max-w-xl mx-auto">
                Piezas de diseño exclusivo seleccionadas cuidadosamente para resaltar la autenticidad y sofisticación femenina.
              </p>
              <div className="pt-4">
                <a href="#cat" className="inline-flex items-center gap-2 bg-[#FAF8F5] text-[#1A1A1A] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold hover:bg-[#3D2A21] hover:text-white transition-all">
                  Explorar Catálogo <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </section>

          {/* Catalog Section */}
          <section id="cat" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h2 className="font-serif text-3xl text-[#3D2A21]">Catálogo Exclusivo</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{filteredProducts.length} Piezas Disponibles</p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text"
                  placeholder="Buscar producto..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E2D9] rounded-full text-sm focus:outline-none focus:border-[#3D2A21]"
                />
              </div>
            </div>

            {/* Categories & Filters */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-[#E8E2D9] mb-8">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all ${selectedCategory === cat ? 'bg-[#3D2A21] text-white' : 'bg-white border border-[#E8E2D9] text-gray-600 hover:border-[#3D2A21]'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
              {filteredProducts.map(product => {
                const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                return (
                  <div 
                    key={product.id} 
                    onClick={() => handleOpenProduct(product)}
                    className="group cursor-pointer flex flex-col bg-white rounded-lg overflow-hidden border border-[#E8E2D9]/60 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative aspect-[3/4] bg-[#E8E2D9]/30 overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.isNew && (
                        <span className="absolute top-3 left-3 bg-[#3D2A21] text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">Nuevo</span>
                      )}
                      {totalStock === 0 && (
                        <span className="absolute top-3 right-3 bg-red-800 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">Agotado</span>
                      )}
                    </div>
                    <div className="p-4 flex flex-col flex-grow justify-between space-y-2">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-widest">{product.category}</span>
                        <h3 className="font-serif text-lg text-[#1A1A1A] group-hover:text-[#5C4033] line-clamp-1">{product.name}</h3>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-[#E8E2D9]/40">
                        <span className="font-semibold text-sm text-[#3D2A21]">${product.price.toFixed(2)}</span>
                        <span className="text-xs text-[#5C4033] font-medium underline flex items-center gap-1">
                          Ver Detalle
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D9] max-h-[90vh] flex flex-col md:flex-row">
            <div className="md:w-1/2 relative bg-[#E8E2D9]/40 p-4 flex flex-col items-center justify-center">
              <img 
                src={selectedProduct.images[activeImageIdx]} 
                alt={selectedProduct.name} 
                className="max-h-[400px] object-contain rounded-lg"
              />
              <button 
                onClick={() => setSelectedProduct(null)} 
                className="absolute top-4 left-4 md:hidden bg-white/80 p-2 rounded-full"
              >
                <X size={18} />
              </button>
            </div>

            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-400 uppercase tracking-widest">{selectedProduct.category}</span>
                    <h2 className="font-serif text-3xl text-[#3D2A21]">{selectedProduct.name}</h2>
                  </div>
                  <button onClick={() => setSelectedProduct(null)} className="hidden md:block text-gray-400 hover:text-black">
                    <X size={20} />
                  </button>
                </div>

                <p className="text-2xl font-semibold text-[#5C4033]">${selectedProduct.price.toFixed(2)}</p>
                <p className="text-xs text-gray-600 leading-relaxed">{selectedProduct.description}</p>

                {/* Variants Selector */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700">Talla:</label>
                  <div className="flex gap-2">
                    {[...new Set(selectedProduct.variants.map(v => v.size))].map(sz => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded text-xs border ${selectedSize === sz ? 'bg-[#3D2A21] text-white border-[#3D2A21]' : 'bg-white text-gray-700 border-[#E8E2D9]'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <label className="text-xs font-semibold uppercase tracking-wider text-gray-700 block mt-2">Color:</label>
                  <div className="flex gap-2">
                    {[...new Set(selectedProduct.variants.map(v => v.color))].map(clr => (
                      <button
                        key={clr}
                        onClick={() => setSelectedColor(clr)}
                        className={`px-3 py-1.5 rounded text-xs border ${selectedColor === clr ? 'bg-[#3D2A21] text-white border-[#3D2A21]' : 'bg-white text-gray-700 border-[#E8E2D9]'}`}
                      >
                        {clr}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 pt-1">
                    Disponibilidad: <span className="font-semibold text-[#3D2A21]">{getVariantStock(selectedProduct, selectedSize, selectedColor)} unidades</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E2D9] mt-6">
                <button
                  onClick={() => sendWhatsAppMessage(selectedProduct, selectedSize, selectedColor)}
                  disabled={getVariantStock(selectedProduct, selectedSize, selectedColor) <= 0}
                  className="w-full bg-[#3D2A21] text-white py-3 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-[#5C4033] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <MessageCircle size={16} className="text-[#C5A059]" />
                  Consultar por WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#1A1A1A] text-white py-12 border-t border-[#3D2A21]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="font-serif text-2xl tracking-widest text-[#C5A059] block mb-4">EMAR</span>
            <p className="text-xs text-gray-400 leading-relaxed">
              Boutique de moda femenina dedicada a la elegancia contemporánea y piezas de diseño atemporal.
            </p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C5A059] mb-4">Atención al Cliente</h4>
            <p className="text-xs text-gray-400">Envíos nacionales e internacionales.</p>
            <p className="text-xs text-gray-400 mt-2">Atención personalizada vía WhatsApp.</p>
          </div>
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#C5A059] mb-4">Contacto</h4>
            <p className="text-xs text-gray-400">WhatsApp: +{whatsappNumber}</p>
            <p className="text-xs text-gray-400 mt-1">Atención: Mon - Sat 9:00 AM - 7:00 PM</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-gray-800 text-center text-[10px] text-gray-500 uppercase tracking-widest">
          © 2026 EMAR Boutique. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
