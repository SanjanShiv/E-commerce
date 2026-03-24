import React, { useState, useEffect } from "react";
import { Filter, ShoppingCart, Heart, Activity, Check, Plus, Edit2, Trash2 } from "lucide-react";
import ProductService from "../services/product.service";
import AuthService from "../services/auth.service";
import "./Dashboard.css";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({ id: null, name: "", description: "", price: 0, category: "Electronics" });
  
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) setCurrentUser(user);
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    ProductService.getAllProducts().then(
      (response) => {
        setProducts(response.data);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const deleteProduct = (id) => {
    ProductService.deleteProduct(id).then(() => fetchProducts());
  };

  const openModal = (product = { id: null, name: "", description: "", price: 0 }) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (currentProduct.id) {
      ProductService.updateProduct(currentProduct.id, currentProduct).then(() => {
        fetchProducts();
        setShowModal(false);
      });
    } else {
      ProductService.createProduct(currentProduct).then(() => {
        fetchProducts();
        setShowModal(false);
      });
    }
  };

  const isAdmin = currentUser?.roles?.includes("ROLE_ADMIN");

  const filteredProducts = (Array.isArray(products) ? products : []).filter(p => {
    const passPrice = p.price >= priceRange.min && p.price <= priceRange.max;
    const passCategory = selectedCategory === "All Categories" || p.category === selectedCategory;
    return passPrice && passCategory;
  });

  return (
    <div className="dashboard-layout">
      
      {/* LEFT SIDEBAR */}
      <div className="dashboard-sidebar">
        <div className="sidebar-section">
          <h3 className="sidebar-title">Categories</h3>
          <div className="category-list">
            {["All Categories", "Electronics", "Fashion", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys & Games"].map(cat => (
              <div 
                key={cat} 
                className="category-item" 
                onClick={() => setSelectedCategory(cat)}
                style={{ 
                  cursor: 'pointer', 
                  fontWeight: selectedCategory === cat ? 'bold' : 'normal', 
                  color: selectedCategory === cat ? 'var(--primary-color)' : 'inherit' 
                }}
              >
                <span className="cat-name">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Price Range</h3>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            style={{width: '100%'}} 
          />
          <div className="price-inputs">
            <input 
              type="number" 
              placeholder="Min" 
              value={priceRange.min} 
              onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
            />
            <span>-</span>
            <input 
              type="number" 
              placeholder="Max" 
              value={priceRange.max} 
              onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="sidebar-section">
          <h3 className="sidebar-title">Customer Rating</h3>
          {[4, 3, 2].map(star => (
            <div key={star} className="rating-row">
              <div className="stars">
                {Array(5).fill(0).map((_, i) => (
                  <span key={i} style={{color: i < star ? '#f59e0b' : 'var(--border-color)'}}>★</span>
                ))}
              </div>
              <span>& up</span>
            </div>
          ))}
        </div>

        <div className="sidebar-section" style={{border: 'none', background: 'transparent', padding: 0}}>
          <label className="checkbox-row"><input type="checkbox" defaultChecked /> Prime/Free Delivery</label>
          <label className="checkbox-row"><input type="checkbox" defaultChecked /> Cash on Delivery</label>
          <label className="checkbox-row"><input type="checkbox" /> Same Day Delivery</label>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="dashboard-main">
        <div className="main-header-strip">
          <span>{filteredProducts.length === 0 ? "No products found." : `Showing 1-${filteredProducts.length} of ${filteredProducts.length} products`}</span>
          <div className="header-actions">
            {isAdmin && (
              <button className="btn-add-global" onClick={() => openModal()}>
                <Plus size={16} style={{marginRight: '4px', verticalAlign: 'text-bottom'}}/> 
                Add Product
              </button>
            )}
            <div>
              Sort by: 
              <select className="sort-select" style={{marginLeft: '0.5rem'}}>
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
            <button className="btn-filter"><Filter size={16} /> Filter</button>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((p) => {
            // Mocking random images/stats based on ID for visual representation
            const oldPrice = p.price > 100 ? (p.price * 1.2).toFixed(2) : (p.price * 1.5).toFixed(2);
            const initial = p.name ? p.name[0] : 'P';
            return (
              <div key={p.id} className="product-card">
                <span className="badge-discount">🔥 Deal</span>
                <button className="btn-heart"><Heart size={20} /></button>
                
                <div className="img-placeholder">
                   {/* Placeholder matching visual style */}
                   <div style={{fontSize: '4rem', color: 'var(--text-secondary)', opacity: 0.3}}>{initial}</div>
                </div>

                <h3 className="product-title" title={p.name}>{p.name}</h3>
                <div className="product-brand">{p.description.substring(0, 30)}...</div>
                
                <div className="product-rating">
                  <div className="stars">★★★★☆</div>
                  <span>(4.5) • {(p.price * 3).toFixed(1)}k reviews</span>
                </div>

                <div className="product-price-row">
                  <span className="price-current">${p.price}</span>
                  <span className="price-old">${oldPrice}</span>
                </div>

                <span className="badge-delivery">FREE Delivery</span>

                <button className="btn-add-cart">
                  <ShoppingCart size={18} /> Add to Cart
                </button>

                {isAdmin && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button onClick={() => openModal(p)} style={{ flex: 1, padding: '6px', background: 'var(--primary-color)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      <Edit2 size={16} /> Edit
                    </button>
                    <button onClick={() => deleteProduct(p.id)} style={{ flex: 1, padding: '6px', background: 'var(--danger-color)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                      <Trash2 size={16} /> Delete
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Modal for CRUD */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{marginTop: 0, marginBottom: '1.5rem'}}>{currentProduct.id ? "Edit Product" : "Add Product"}</h3>
              <form onSubmit={handleSave}>
                <div className="form-group" style={{marginBottom: '1rem'}}>
                  <label>Product Name</label>
                  <input type="text" className="form-control" style={{width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '6px'}} value={currentProduct.name} onChange={(e) => setCurrentProduct({...currentProduct, name: e.target.value})} required />
                </div>
                <div className="form-group" style={{marginBottom: '1rem'}}>
                  <label>Description / Brand</label>
                  <input type="text" className="form-control" style={{width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '6px'}} value={currentProduct.description} onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})} required />
                </div>
                <div className="form-group" style={{marginBottom: '1.5rem'}}>
                  <label>Price ($)</label>
                  <input type="number" step="0.01" className="form-control" style={{width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '6px'}} value={currentProduct.price} onChange={(e) => setCurrentProduct({...currentProduct, price: parseFloat(e.target.value)})} required />
                </div>
                <div className="form-group" style={{marginBottom: '1.5rem'}}>
                  <label>Category</label>
                  <select className="form-control" style={{width: '100%', padding: '0.8rem', marginTop: '0.5rem', borderRadius: '6px'}} value={currentProduct.category || "Electronics"} onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}>
                    {["Electronics", "Fashion", "Home & Kitchen", "Books", "Sports", "Beauty", "Toys & Games"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.8rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '6px', cursor: 'pointer' }}>Cancel</button>
                  <button type="submit" style={{ flex: 1, padding: '0.8rem', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Save Product</button>
                </div>
              </form>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
};

export default Dashboard;
