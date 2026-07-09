import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaTimes, FaFlask } from 'react-icons/fa';

export default function Fertilizers() {
  // State synchronized with localStorage matrix parameters
  const [guides, setGuides] = useState([]);

  // Modal Control Matrix State Engine
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', crop: '', rate: '', soil: ''
  });

  // Seed local component nodes from global localStorage ledger on mount
  useEffect(() => {
    const storedGuides = localStorage.getItem('allFertilizerGuides');
    if (storedGuides) {
      try {
        setGuides(JSON.parse(storedGuides));
      } catch (e) {
        console.error("Error parsing structural dosage registers:", e);
      }
    } else {
      // Default MVP seed allocations if lookup ledger node is blank
      const defaultMvp = [
        { id: 1, name: 'NPK 15-15-15 Basal Compound', crop: 'Hybrid White Maize', rate: '150kg / Hectare', soil: 'Low Nitrogen Soils', status: 'Approved' },
        { id: 2, name: 'Granular Urea Top Dressing', crop: 'Sorghum Grain / Maize Rotation', rate: '100kg / Hectare', soil: 'All Soil Profiles', status: 'Approved' },
      ];
      setGuides(defaultMvp);
      localStorage.setItem('allFertilizerGuides', JSON.stringify(defaultMvp));
    }
  }, []);

  // Global persistence ledger handler utility
  const updateGlobalRegistry = (updatedList) => {
    setGuides(updatedList);
    localStorage.setItem('allFertilizerGuides', JSON.stringify(updatedList));
  };

  // Structural Handlers
  const openAddModal = () => {
    setEditingId(null);
    setFormData({ name: '', crop: '', rate: '', soil: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (guide) => {
    setEditingId(guide.id);
    setFormData({
      name: guide.name,
      crop: guide.crop,
      rate: guide.rate,
      soil: guide.soil
    });
    setIsModalOpen(true);
  };

  const handleSaveGuideline = (e) => {
    e.preventDefault();
    if (!formData.name) return alert('Specification name is mandatory.');

    let updatedList;
    if (editingId) {
      // Execute Structural Field Updates
      updatedList = guides.map(g => g.id === editingId ? {
        ...g,
        name: formData.name,
        crop: formData.crop || 'General Crop Matrix',
        rate: formData.rate || 'As Needed',
        soil: formData.soil || 'Universal Profile',
        timestamp: new Date().toISOString()
      } : g);
    } else {
      // Append New Dosage Record Nodes
      const newGuide = {
        id: Date.now(),
        name: formData.name,
        crop: formData.crop || 'General Crop Matrix',
        rate: formData.rate || 'As Needed',
        soil: formData.soil || 'Universal Profile',
        status: 'Approved',
        timestamp: new Date().toISOString()
      };
      updatedList = [...guides, newGuide];
    }

    updateGlobalRegistry(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteGuideline = (id) => {
    if (window.confirm('Purge this structural dosage matrix record?')) {
      const updatedList = guides.filter(g => g.id !== id);
      updateGlobalRegistry(updatedList);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-6 animate-fadeIn">
      
      {/* HEADER CONTROLS SECTION */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-wider">Nutrient Apportionment Rule Register</h3>
          <p className="text-xs text-slate-400">Maintain NPK, Urea, and micronutrient dosage allocation lookup records.</p>
        </div>
        <button 
          onClick={openAddModal} 
          className="px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center space-x-2"
        >
          <FaPlus /> <span>New Dosage Guideline</span>
        </button>
      </div>

      {/* REPOSITORY INTERFACE REGISTRY */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-700 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <th className="py-3 px-4">Nutrient Compound Specification</th>
              <th className="py-3 px-4">Target Biological Host</th>
              <th className="py-3 px-4">Standard Allocation Dosage</th>
              <th className="py-3 px-4">Soil Sub-stratum Constraint</th>
              <th className="py-3 px-4">Status Flag</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-700 text-slate-700 dark:text-slate-300 font-medium font-mono">
            {guides.length > 0 ? (
              guides.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="py-4 px-4 font-bold text-slate-900 dark:text-white font-sans">🔬 {g.name}</td>
                  <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{g.crop}</td>
                  <td className="py-4 px-4 font-bold text-slate-800 dark:text-slate-200">{g.rate}</td>
                  <td className="py-4 px-4 font-sans text-slate-500 dark:text-slate-400">{g.soil}</td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] font-black bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded tracking-wider uppercase">
                      {g.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-1 font-sans">
                    <button 
                      onClick={() => openEditModal(g)} 
                      className="p-2 bg-slate-50 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors inline-flex" 
                      title="Edit Compound Layout"
                    >
                      <FaEdit />
                    </button>
                    <button 
                      onClick={() => handleDeleteGuideline(g.id)} 
                      className="p-2 bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-colors inline-flex" 
                      title="Purge Apportionment Rule"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-slate-400 italic font-sans">
                  No allocation guidance formulas registered in this matrix node.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* SYSTEM APPORTIONMENT FORM MODAL CONTAINER */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 w-full max-w-md rounded-2xl shadow-xl overflow-hidden animate-scaleUp">
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <FaFlask className="text-green-700" /> {editingId ? 'Modify Formulation Node' : 'Initialize Apportionment Record'}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-sm"><FaTimes /></button>
            </div>
            <form onSubmit={handleSaveGuideline} className="p-5 space-y-4 text-xs">
              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-wide text-[10px]">Nutrient Compound Specification *</label>
                <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="e.g. NPK 15-15-15 Basal Compound" />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-wide text-[10px]">Target Biological Host (Crop)</label>
                <input type="text" value={formData.crop} onChange={(e) => setFormData({...formData, crop: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="e.g. Hybrid White Maize" />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-wide text-[10px]">Standard Allocation Dosage</label>
                <input type="text" value={formData.rate} onChange={(e) => setFormData({...formData, rate: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="e.g. 150kg / Hectare" />
              </div>
              <div>
                <label className="block text-slate-500 dark:text-slate-400 font-bold mb-1 uppercase tracking-wide text-[10px]">Soil Sub-stratum Constraint</label>
                <input type="text" value={formData.soil} onChange={(e) => setFormData({...formData, soil: e.target.value})} className="w-full border border-slate-200 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700 rounded-lg p-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-green-700" placeholder="e.g. Low Nitrogen Soils" />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-slate-200 dark:border-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-xl font-bold">Commit Rule Matrix</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}