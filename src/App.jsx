import React, { useState, useEffect } from 'react';
import { 
  Search, MessageCircle, Lock, X, ArrowRight, Check, Plus, Trash2, Edit2, 
  Package, Phone, LogOut, Save, AlertCircle, Image as ImageIcon
} from 'lucide-react';

const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'Chaqueta Bomber Suede Moka',
    price: 95.00,
    category: 'Chaquetas',
    featured: true,
    isNew: true,
    description: 'Chaqueta corta en acabado suave tipo ante de tono marrón moka con cremallera metálica, solapas estructuradas y puños elasticados. Combínala con pantalones de talle alto.',
    images: [
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000'
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
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'
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
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1000',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1000'
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
    const saved = localStorage.getItem('emar_products_v6');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [whatsappNumber, setWhatsappNumber] = useState(() => {
    return localStorage.getItem('emar_wa_phone') || '584140000000';
  });

  const [activeTab, setActiveTab] = useState('catalog');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Modal Gallery & Variant State
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [modalSize, setModalSize] = useState('');
  const [modalColor, setModalColor] = useState('');

  // Admin Form State
  const [editingProductId, setEditingProductId] = useState(null);
  const [formProduct, setFormProduct] = useState({
    name: '',
    price: '',
    category: 'Chaquetas',
    featured: false,
    isNew: true,
    description: '',
    images: ['https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'],
    variants: [{ size: 'S', color: 'Marrón Moka', stock: 5 }]
  });

  useEffect(() => {
    localStorage.setItem('emar_products_v6', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('emar_wa_phone', whatsappNumber);
  }, [whatsappNumber]);

  const categories = ['Todos', 'Chaquetas', 'Blusas', 'Vestidos', 'Pantalones', 'Conjuntos', 'Accesorios'];
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL', 'Única'];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminPasswordInput === 'admin123' || adminPasswordInput === 'emar2026') {
      setIsAdminLoggedIn(true);
      setLoginError(false);
      setAdminPasswordInput('');
    } else {
      setLoginError(true);
    }
  };

  const handleOpenProduct = (product) => {
    setSelectedProduct(product);
    setActiveImageIdx(0);
    if (product.variants && product.variants.length > 0) {
      setModalSize(product.variants[0].size);
      setModalColor(product.variants[0].color);
    }
  };

  const getVariantStock = (product, size, color) => {
    if (!product || !product.variants) return 0;
    const v = product.variants.find(item => item.size === size && item.color === color);
    return v ? v.stock : 0;
  };

  const sendWhatsAppMessage = (product, size, color) => {
    const text = `Hola EMAR Boutique, estoy interesada en comprar el producto "${product.name}".\nPrecio: $${product.price.toFixed(2)}\nTalla: ${size || 'N/A'}\nColor: ${color || 'N/A'}\n¿Podrían indicarme la disponibilidad y métodos de pago?`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  // CRUD Admin Operations
  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setFormProduct({
      name: product.name,
      price: product.price,
      category: product.category,
      featured: product.featured,
      isNew: product.isNew,
      description: product.description,
      images: [...product.images],
      variants: [...product.variants.map(v => ({ ...v }))]
    });
  };

  const handleResetForm = () => {
    setEditingProductId(null);
    setFormProduct({
      name: '',
      price: '',
      category: 'Chaquetas',
      featured: false,
      isNew: true,
      description: '',
      images: ['https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'],
      variants: [{ size: 'S', color: 'Marrón Moka', stock: 5 }]
    });
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!formProduct.name || !formProduct.price) return;

    // Filter empty image URLs
    const cleanImages = formProduct.images.filter(img => img.trim() !== '');
    const finalImages = cleanImages.length > 0 ? cleanImages : ['https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000'];

    if (editingProductId) {
      setProducts(products.map(p => p.id === editingProductId ? {
        ...formProduct,
        id: editingProductId,
        price: parseFloat(formProduct.price),
        images: finalImages
      } : p));
    } else {
      const newProd = {
        ...formProduct,
        id: Date.now().toString(),
        price: parseFloat(formProduct.price),
        images: finalImages
      };
      setProducts([newProd, ...products]);
    }
    handleResetForm();
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('¿Estás segura/o de eliminar este producto del catálogo?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  // Admin Image Fields Management
  const handleAddImageField = () => {
    setFormProduct({
      ...formProduct,
      images: [...formProduct.images, '']
    });
  };

  const handleRemoveImageField = (index) => {
    setFormProduct({
      ...formProduct,
      images: formProduct.images.filter((_, i) => i !== index)
    });
  };

  const handleImageChange = (index, value) => {
    const updated = [...formProduct.images];
    updated[index] = value;
    setFormProduct({ ...formProduct, images: updated });
  };

  // Admin Variant Fields Management
  const handleAddVariant = () => {
    setFormProduct({
      ...formProduct,
      variants: [...formProduct.variants, { size: 'M', color: 'Beige', stock: 3 }]
    });
  };

  const handleRemoveVariant = (index) => {
    setFormProduct({
      ...formProduct,
      variants: formProduct.variants.filter((_, i) => i !== index)
    });
  };

  const handleVariantChange = (index, field, value) => {
    const updated = [...formProduct.variants];
    updated[index][field] = field === 'stock' ? Math.max(0, parseInt(value) || 0) : value;
    setFormProduct({ ...formProduct, variants: updated });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1A1A] font-sans">
      {/* Header Fijo */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <button onClick={() => setActiveTab('catalog')} className="flex items-center gap-3">
            <span className="font-serif text-3xl tracking-[0.3em] text-[#3D2A21] font-bold">EMAR</span>
          </button>

          <nav className="hidden md:flex items-center space-x-10 text-xs uppercase tracking-[0.2em] font-medium">
            <button 
              onClick={() => setActiveTab('catalog')} 
              className={`hover:text-[#5C4033] transition-colors ${activeTab === 'catalog' ? 'text-[#3D2A21] font-bold border-b-2 border-[#3D2A21] pb-1' : 'text-gray-500'}`}
            >
              Catálogo
            </button>
            <button 
              onClick={() => setActiveTab('about')} 
              className={`hover:text-[#5C4033] transition-colors ${activeTab === 'about' ? 'text-[#3D2A21] font-bold border-b-2 border-[#3D2A21] pb-1' : 'text-gray-500'}`}
            >
              Sobre Nosotros
            </button>
            <button 
              onClick={() => setActiveTab('admin')} 
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] uppercase tracking-widest transition-all ${activeTab === 'admin' ? 'bg-[#3D2A21] text-white font-bold' : 'text-[#3D2A21] hover:bg-[#E8E2D9]'}`}
            >
              <Lock size={12} className="text-[#C5A059]" />
              <span>Admin</span>
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

      {/* PÁGINA CATÁLOGO */}
      {activeTab === 'catalog' && (
        <main className="flex-grow">
          {/* Hero Section Editorial */}
          <section className="relative h-[85vh] min-h-[550px] flex items-center justify-center bg-[#1A1A1A] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000" 
              alt="EMAR Editorial Lookbook" 
              className="absolute inset-0 w-full h-full object-cover object-center scale-105"
            />
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

          {/* Grilla de Productos */}
          <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#3D2A21] tracking-wide">Catálogo Exclusivo</h2>
                <p className="text-xs text-gray-400 uppercase tracking-widest mt-2">{filteredProducts.length} Piezas Disponibles</p>
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

            {/* Rejilla */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map(product => {
                const totalStock = product.variants.reduce((acc, v) => acc + v.stock, 0);
                return (
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
                      {product.images.length > 1 && (
                        <span className="absolute bottom-4 right-4 bg-[#1A1A1A]/70 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full font-medium flex items-center gap-1">
                          <ImageIcon size={10} /> {product.images.length} fotos
                        </span>
                      )}
                      {totalStock === 0 && (
                        <span className="absolute top-4 right-4 bg-red-900 text-white text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-medium">Agotado</span>
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
                );
              })}
            </div>
          </section>
        </main>
      )}

      {/* PÁGINA SOBRE NOSOTROS */}
      {activeTab === 'about' && (
        <main className="flex-grow max-w-5xl mx-auto px-4 py-20">
          <div className="text-center space-y-6 mb-16">
            <span className="text-xs uppercase tracking-[0.3em] text-[#C5A059] font-bold">FILOSOFÍA EMAR</span>
            <h1 className="font-serif text-5xl text-[#3D2A21]">Diseño, Sofisticación &amp; Atemporalidad</h1>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto leading-relaxed">
              EMAR nació para redefinir el guardarropa femenino contemporáneo. Diseñamos y curamos colecciones exclusivas pensadas para mujeres que aprecian la elegancia sobria, las texturas de alta calidad y los cortes impecables.
            </p>
          </div>
        </main>
      )}

      {/* PÁGINA PANEL ADMINISTRATIVO */}
      {activeTab === 'admin' && (
        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          {!isAdminLoggedIn ? (
            <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-[#E8E2D9] my-12 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-[#3D2A21] text-[#C5A059] rounded-full flex items-center justify-center mx-auto mb-2">
                  <Lock size={20} />
                </div>
                <h2 className="font-serif text-2xl text-[#3D2A21]">Panel Administrativo EMAR</h2>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Inicia sesión para gestionar inventario</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider block mb-2">Contraseña de Administrador:</label>
                  <input 
                    type="password"
                    placeholder="Escribe admin123"
                    value={adminPasswordInput}
                    onChange={(e) => setAdminPasswordInput(e.target.value)}
                    className="w-full px-4 py-3 border border-[#E8E2D9] rounded-xl text-sm focus:outline-none focus:border-[#3D2A21]"
                  />
                  {loginError && (
                    <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                      <AlertCircle size={12} /> Contraseña incorrecta (Usa: admin123)
                    </p>
                  )}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-[#3D2A21] text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-[#5C4033] transition-all shadow-md"
                >
                  Ingresar al Sistema
                </button>
              </form>
            </div>
          ) : (
            <div className="space-y-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm gap-4">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold">EMAR INVENTORY CONTROL</span>
                  <h1 className="font-serif text-3xl text-[#3D2A21]">Gestión de Productos e Inventario</h1>
                </div>
                <button 
                  onClick={() => setIsAdminLoggedIn(false)}
                  className="flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-xs uppercase tracking-wider hover:bg-gray-200 transition-colors"
                >
                  <LogOut size={14} /> Salir
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Formulario */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-6 h-fit">
                  <div className="flex justify-between items-center border-b border-[#E8E2D9] pb-4">
                    <h3 className="font-serif text-2xl text-[#3D2A21]">
                      {editingProductId ? 'Editar Producto' : 'Nuevo Producto'}
                    </h3>
                    {editingProductId && (
                      <button onClick={handleResetForm} className="text-xs text-gray-500 underline">Cancelar</button>
                    )}
                  </div>

                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider block mb-1">Nombre de la Prenda:</label>
                      <input 
                        type="text" 
                        required
                        value={formProduct.name}
                        onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
                        placeholder="Ej: Blazer Lino Arena"
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs focus:outline-none focus:border-[#3D2A21]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider block mb-1">Precio ($ USD):</label>
                        <input 
                          type="number" 
                          step="0.01"
                          required
                          value={formProduct.price}
                          onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
                          placeholder="85.00"
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs focus:outline-none focus:border-[#3D2A21]"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider block mb-1">Categoría:</label>
                        <select 
                          value={formProduct.category}
                          onChange={(e) => setFormProduct({ ...formProduct, category: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs focus:outline-none focus:border-[#3D2A21]"
                        >
                          {categories.filter(c => c !== 'Todos').map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Galería Dinámica de Imágenes */}
                    <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-semibold text-[#3D2A21] uppercase tracking-wider">Galería de Imágenes (URLs):</label>
                        <button 
                          type="button" 
                          onClick={handleAddImageField}
                          className="text-[10px] bg-[#3D2A21] text-white px-2 py-1 rounded flex items-center gap-1"
                        >
                          <Plus size={10} /> Añadir Foto
                        </button>
                      </div>

                      {formProduct.images.map((imgUrl, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            type="text" 
                            required={idx === 0}
                            value={imgUrl}
                            onChange={(e) => handleImageChange(idx, e.target.value)}
                            placeholder={idx === 0 ? "Foto principal (URL)" : `Foto ${idx + 1} (URL)`}
                            className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs focus:outline-none focus:border-[#3D2A21]"
                          />
                          {formProduct.images.length > 1 && (
                            <button type="button" onClick={() => handleRemoveImageField(idx)} className="text-red-500 hover:text-red-700">
                              <Trash2 size={13} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-gray-700 uppercase tracking-wider block mb-1">Descripción:</label>
                      <textarea 
                        rows={3}
                        value={formProduct.description}
                        onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
                        placeholder="Detalles del tejido, calce y diseño..."
                        className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl text-xs focus:outline-none focus:border-[#3D2A21]"
                      />
                    </div>

                    {/* Variantes */}
                    <div className="space-y-3 pt-2 border-t border-[#E8E2D9]">
                      <div className="flex justify-between items-center">
                        <label className="text-[11px] font-semibold text-[#3D2A21] uppercase tracking-wider">Stock por Talla y Color:</label>
                        <button 
                          type="button" 
                          onClick={handleAddVariant}
                          className="text-[10px] bg-[#3D2A21] text-white px-2 py-1 rounded flex items-center gap-1"
                        >
                          <Plus size={10} /> Variante
                        </button>
                      </div>

                      {formProduct.variants.map((v, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-[#FAF8F5] p-2 rounded-xl border border-[#E8E2D9]">
                          <select 
                            value={v.size}
                            onChange={(e) => handleVariantChange(idx, 'size', e.target.value)}
                            className="w-16 px-1 py-1 text-xs border rounded bg-white"
                          >
                            {sizeOptions.map(sz => <option key={sz} value={sz}>{sz}</option>)}
                          </select>
                          <input 
                            type="text" 
                            placeholder="Color"
                            value={v.color}
                            onChange={(e) => handleVariantChange(idx, 'color', e.target.value)}
                            className="w-24 px-2 py-1 text-xs border rounded bg-white"
                          />
                          <input 
                            type="number" 
                            placeholder="Stock"
                            min="0"
                            value={v.stock}
                            onChange={(e) => handleVariantChange(idx, 'stock', e.target.value)}
                            className="w-16 px-2 py-1 text-xs border rounded bg-white font-semibold"
                          />
                          {formProduct.variants.length > 1 && (
                            <button type="button" onClick={() => handleRemoveVariant(idx)} className="text-red-500 hover:text-red-700">
                              <Trash2 size={12} />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#3D2A21] text-white py-3 rounded-xl text-xs uppercase tracking-widest font-semibold hover:bg-[#5C4033] transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Save size={14} className="text-[#C5A059]" />
                      <span>{editingProductId ? 'Guardar Cambios' : 'Publicar Producto'}</span>
                    </button>
                  </form>
                </div>

                {/* Inventario */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E8E2D9] shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-[#E8E2D9] pb-4">
                    <h3 className="font-serif text-2xl text-[#3D2A21]">Inventario en Tiempo Real</h3>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">{products.length} Productos</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E8E2D9] text-gray-400 uppercase tracking-wider text-[10px]">
                          <th className="pb-3">Producto</th>
                          <th className="pb-3">Categoría</th>
                          <th className="pb-3">Precio</th>
                          <th className="pb-3">Stock Total</th>
                          <th className="pb-3 text-right">Acciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E2D9]/60">
                        {products.map(p => {
                          const totalStock = p.variants.reduce((sum, v) => sum + v.stock, 0);
                          return (
                            <tr key={p.id} className="hover:bg-[#FAF8F5]/60 transition-colors">
                              <td className="py-4 flex items-center gap-3">
                                <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover rounded-md bg-gray-100" />
                                <div>
                                  <p className="font-semibold text-sm text-[#1A1A1A]">{p.name}</p>
                                  <p className="text-[10px] text-gray-400">{p.images.length} fotos • {p.variants.length} variantes</p>
                                </div>
                              </td>
                              <td className="py-4 text-gray-600">{p.category}</td>
                              <td className="py-4 font-semibold text-[#3D2A21]">${p.price.toFixed(2)}</td>
                              <td className="py-4">
                                {totalStock > 0 ? (
                                  <span className="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                                    {totalStock} unid.
                                  </span>
                                ) : (
                                  <span className="bg-red-100 text-red-800 px-2.5 py-1 rounded-full text-[10px] font-semibold">
                                    Agotado
                                  </span>
                                )}
                              </td>
                              <td className="py-4 text-right space-x-2">
                                <button onClick={() => handleEditClick(p)} className="p-1.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-[#3D2A21] hover:text-white transition-colors">
                                  <Edit2 size={13} />
                                </button>
                                <button onClick={() => handleDeleteProduct(p.id)} className="p-1.5 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-colors">
                                  <Trash2 size={13} />
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      )}

      {/* Modal Ficha Producto con GALERÍA MULTIFOTO E INTERACTIVA */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FAF8F5] max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl border border-[#E8E2D9] max-h-[90vh] flex flex-col md:flex-row">
            {/* Galería Lateral / Principal */}
            <div className="md:w-1/2 bg-[#1A1A1A] flex flex-col items-center justify-center p-4 space-y-4">
              <img 
                src={selectedProduct.images[activeImageIdx] || selectedProduct.images[0]} 
                alt={selectedProduct.name}
                className="max-h-[360px] object-contain rounded-lg shadow-md transition-all duration-300"
              />
              
              {/* Selector de Miniaturas si hay 2 o más fotos */}
              {selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pt-2 max-w-full">
                  {selectedProduct.images.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIdx(i)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${activeImageIdx === i ? 'border-[#C5A059] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    >
                      <img src={imgUrl} alt={`Vista ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="md:w-1/2 p-8 flex flex-col justify-between overflow-y-auto">
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

                {/* Talla y Color */}
                <div className="space-y-3 pt-2">
                  <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-700 block">Tallas Disponibles:</label>
                  <div className="flex gap-2">
                    {[...new Set(selectedProduct.variants.map(v => v.size))].map(sz => (
                      <button
                        key={sz}
                        onClick={() => setModalSize(sz)}
                        className={`px-3 py-1 rounded text-xs border ${modalSize === sz ? 'bg-[#3D2A21] text-white border-[#3D2A21]' : 'bg-white text-gray-700 border-[#E8E2D9]'}`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>

                  <label className="text-[10px] font-semibold uppercase tracking-wider text-gray-700 block pt-1">Colores:</label>
                  <div className="flex gap-2">
                    {[...new Set(selectedProduct.variants.map(v => v.color))].map(clr => (
                      <button
                        key={clr}
                        onClick={() => setModalColor(clr)}
                        className={`px-3 py-1 rounded text-xs border ${modalColor === clr ? 'bg-[#3D2A21] text-white border-[#3D2A21]' : 'bg-white text-gray-700 border-[#E8E2D9]'}`}
                      >
                        {clr}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-gray-500 pt-1">
                    Disponibilidad: <span className="font-bold text-[#3D2A21]">{getVariantStock(selectedProduct, modalSize, modalColor)} unidades</span>
                  </p>
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E2D9] mt-6">
                <button
                  onClick={() => sendWhatsAppMessage(selectedProduct, modalSize, modalColor)}
                  disabled={getVariantStock(selectedProduct, modalSize, modalColor) <= 0}
                  className="w-full bg-[#3D2A21] text-white py-3.5 rounded-full flex items-center justify-center gap-2 text-xs uppercase tracking-widest hover:bg-[#5C4033] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  <MessageCircle size={16} className="text-[#C5A059]" />
                  Consultar / Comprar por WhatsApp
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
