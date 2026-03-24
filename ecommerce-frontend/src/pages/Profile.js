import React, { useState, useEffect } from "react";
import { 
  User, Package, Heart, MapPin, CreditCard, Settings, Shield, LogOut,
  Camera, CheckCircle2, Mail, Phone, Users, Edit2, Box, BadgeIndianRupee, Tag
} from "lucide-react";
import api from "../services/api";
import AuthService from "../services/auth.service";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({ username: "User", email: "user@example.com" });
  const [activeTab, setActiveTab] = useState("overview");

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = () => {
    setEditForm(profile);
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      await api.put("/profile", editForm);
      setProfile(editForm);
      setIsEditing(false);
    } catch (e) {
      console.error(e);
      alert("Failed to update profile");
    }
  };

  useEffect(() => {
    api.get("/profile").then(
      (response) => {
        setProfile({ 
          username: response.data.username, 
          email: response.data.email,
          fullName: response.data.fullName,
          phoneNumber: response.data.phoneNumber
        });
      },
      (error) => {
        console.error("Error fetching profile", error);
        const u = AuthService.getCurrentUser();
        if(u) setProfile({ username: u.username, email: u.email || "user@example.com", fullName: null, phoneNumber: null });
      }
    );
  }, []);

  const handleLogout = () => {
    AuthService.logout();
    window.location.href = "/login";
  };

  return (
    <div className="profile-layout">
      
      {/* SIDEBAR */}
      <div className="profile-sidebar">
        <div className={`sidebar-menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
          <User size={18} /> Profile Overview
        </div>
        <div className="sidebar-menu-item" onClick={() => setActiveTab('orders')}>
          <Package size={18} /> My Orders
        </div>
        <div className="sidebar-menu-item" onClick={() => setActiveTab('wishlist')}>
          <Heart size={18} /> Wishlist <span className="sidebar-badge">3</span>
        </div>
        <div className="sidebar-menu-item" onClick={() => setActiveTab('addresses')}>
          <MapPin size={18} /> Addresses
        </div>
        <div className="sidebar-menu-item" onClick={() => setActiveTab('payments')}>
          <CreditCard size={18} /> Payment Methods
        </div>
        <div className="sidebar-menu-item" onClick={() => setActiveTab('settings')}>
          <Settings size={18} /> Account Settings
        </div>
        <div className="sidebar-menu-item" onClick={() => setActiveTab('security')}>
          <Shield size={18} /> Security
        </div>
        <div className="sidebar-menu-item" style={{color: 'var(--danger-color)'}} onClick={handleLogout}>
          <LogOut size={18} /> Logout
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="profile-main">
        <div className="profile-header-actions">
          <a href="/" className="action-link">← Back to Shopping</a>
          <div className="action-link"><Package size={18}/> Orders</div>
          <div className="action-link"><Heart size={18}/> Wishlist <span className="sidebar-badge">3</span></div>
          <div className="action-link"><ShoppingCart size={18} /> Cart <span className="sidebar-badge" style={{backgroundColor: '#eab308'}}>2</span></div>
        </div>

        {/* Column 1 */}
        <div className="main-column-left">
          
          <div className="profile-card">
            <div className="card-title-row">
              <h3>Profile Information</h3>
              <button className="btn-edit-profile" onClick={handleEditClick}><Edit2 size={14} /> Edit Profile</button>
            </div>
            
            <div className="profile-info-grid">
              <div className="profile-avatar-wrapper">
                <img src={`https://ui-avatars.com/api/?name=${profile.username.charAt(0)}&background=0D8ABC&color=fff&size=100`} alt="Avatar" className="profile-avatar" />
                <div className="avatar-badge"><Camera size={14} /></div>
              </div>
              
              <div className="profile-details">
                <h2>{profile.fullName || profile.username || "John Doe"} <span className="verified-badge"><CheckCircle2 size={12}/> Verified Buyer</span></h2>
                <div className="contact-row"><Mail size={16} /> {profile.email}</div>
                <div className="contact-row"><Phone size={16} /> {profile.phoneNumber || "+1(555) 012-3456"}</div>
                <div className="contact-row"><Users size={16} /> Member since January 2024</div>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <h3 style={{marginTop: 0, marginBottom: '1.5rem', fontSize: '1.1rem'}}>Quick Actions</h3>
            <div className="quick-actions-grid">
              <button className="btn-quick-action"><Package size={18} /> View All Orders</button>
              <button className="btn-quick-action" style={{color: '#ef4444', borderColor: '#ef4444'}}><Heart size={18} /> My Wishlist (3)</button>
              <button className="btn-quick-action" style={{color: '#10b981', borderColor: '#10b981'}}><MapPin size={18} /> Manage Addresses</button>
              <button className="btn-quick-action" style={{color: '#3b82f6', borderColor: '#3b82f6'}}><CreditCard size={18} /> Payment Methods</button>
            </div>
          </div>

        </div>

        {/* Column 2 */}
        <div className="main-column-right">
          
          <div className="profile-card">
            <h3 style={{marginTop: 0, marginBottom: '1.5rem', fontSize: '1.1rem'}}>Shopping Stats</h3>
            
            <div className="stat-box">
              <div className="stat-icon blue"><Box size={20} /></div>
              <div className="stat-info">
                <h4>24</h4>
                <p>Total Orders</p>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon green"><BadgeIndianRupee size={20} /></div>
              <div className="stat-info">
                <h4>$4,578</h4>
                <p>Total Spent</p>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon orange"><Tag size={20} /></div>
              <div className="stat-info">
                <h4>$1,243</h4>
                <p>Money Saved</p>
              </div>
            </div>
          </div>

          <div className="profile-card">
            <div className="card-title-row">
              <h3>Recent Orders</h3>
              <a href="#" style={{color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600}}>View All →</a>
            </div>
            
            <div className="recent-order-item">
              <div style={{fontSize: '3rem', opacity: 0.2, margin: '0 10px'}}>🎧</div>
              <div>
                <div style={{fontWeight: 600, fontSize: '0.95rem'}}>Wireless Headphones</div>
                <div style={{fontWeight: 700, margin: '0.2rem 0'}}>$249.99</div>
                <span className="order-badge">✓ Delivered</span>
              </div>
            </div>
            
            <a href="#" style={{color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600}}>Track All Orders →</a>
          </div>

        </div>
      </div>

      {isEditing && (
        <div className="modal-overlay" style={{position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <div className="modal-content" style={{backgroundColor: 'var(--surface-color)', padding: '2rem', borderRadius: '12px', width: '400px', maxWidth: '90%'}}>
            <h2 style={{marginTop: 0, marginBottom: '1.5rem'}}>Edit Profile</h2>
            <div className="form-group" style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Username</label>
              <input type="text" className="form-control" value={editForm.username || ""} onChange={(e) => setEditForm({...editForm, username: e.target.value})} style={{width: '100%', padding: '0.6rem'}} disabled />
            </div>
            <div className="form-group" style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Email</label>
              <input type="email" className="form-control" value={editForm.email || ""} onChange={(e) => setEditForm({...editForm, email: e.target.value})} style={{width: '100%', padding: '0.6rem'}} />
            </div>
            <div className="form-group" style={{marginBottom: '1rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Full Name</label>
              <input type="text" className="form-control" value={editForm.fullName || ""} onChange={(e) => setEditForm({...editForm, fullName: e.target.value})} style={{width: '100%', padding: '0.6rem'}} />
            </div>
            <div className="form-group" style={{marginBottom: '1.5rem'}}>
              <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 500}}>Phone Number</label>
              <input type="text" className="form-control" value={editForm.phoneNumber || ""} onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})} style={{width: '100%', padding: '0.6rem'}} />
            </div>
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: '1rem'}}>
              <button className="btn-outline" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSaveProfile}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// Quick helper to safely render a missing lucide icon from the above without breaking completely
const ShoppingCart = ({size}) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>;

export default Profile;
