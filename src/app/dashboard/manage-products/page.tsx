"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Image as ImageIcon,
  Loader2,
  Package,
  Layers,
  ChevronRight,
  Filter,
  Shield
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function ManageProductsPage() {
  const { data: session } = useSession();
  const lang = useLangStore((state) => state.lang) as keyof typeof dict;
  const t = dict[lang].admin;
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    price: "",
    category: "",
    description: "",
    image: "",
    downloadUrl: "",
    deliverableContent: ""
  });

  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = editingProduct ? `/api/products/${editingProduct.id}` : "/api/products";
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        cache: "no-store",
      });
      if (res.ok) {
        fetchProducts();
        closeModal();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const openModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.title,
        slug: product.slug || "",
        price: product.price.toString(),
        category: product.category,
        description: product.description,
        image: product.image || "",
        downloadUrl: product.downloadUrl || "",
        deliverableContent: product.deliverableContent || ""
      });
    } else {
      setEditingProduct(null);
      setFormData({ 
        name: "", 
        slug: "",
        price: "", 
        category: "", 
        description: "", 
        image: "",
        downloadUrl: "",
        deliverableContent: ""
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  if (session?.user?.role !== "admin" && session?.user?.role !== "superadmin") {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-12 bg-red-50 rounded-3xl border border-red-100 max-w-md">
          <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-red-900 uppercase tracking-wider">Unauthorized Access</h2>
          <p className="text-red-600 font-semibold mt-2 text-sm">Security clearance level 3/A required for this endpoint.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-8 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      {/* Header section */}
      <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            <Layers className="h-8 w-8 text-[#0f7af7]" />
            Manage Inventory
          </h1>
          <p className="text-slate-500 font-semibold mt-1 text-sm">Add, refine, or decommission digital assets with precision.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-[#0f7af7] px-6 py-4 text-xs font-bold text-white transition-all hover:bg-blue-600 active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" /> Add New Asset
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden mb-10">
        <div className="px-8 py-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-6 bg-slate-50/30">
          <div className="relative flex-1 min-w-[280px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search assets by name or SKU..." 
              className="pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-full transition-all" 
            />
          </div>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all shadow-sm uppercase tracking-widest">
                <Filter className="h-4 w-4 text-slate-400" /> Filters
            </button>
          </div>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Asset Information</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Category</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Pricing</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Visibility</th>
                <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-24 text-center">
                    <Loader2 className="h-10 w-10 text-[#0f7af7] animate-spin mx-auto mb-4" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing inventory data...</p>
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-5">
                        <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 shrink-0 overflow-hidden relative shadow-sm">
                          {product.image ? (
                            <Image src={product.image} alt={product.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                          ) : (
                            <Package className="h-6 w-6 m-4 text-slate-200" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-[#0f7af7] transition-colors truncate mb-1">{product.title}</p>
                          <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest line-clamp-1">ID: {product.id.slice(-8).toUpperCase()}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-[10px] font-bold text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                        {(t as any).categories?.[product.category] || product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <span className="text-sm font-bold text-slate-900 force-english-font tracking-tight">৳{product.price}</span>
                    </td>
                    <td className="px-8 py-5">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest ${product.isActive ? 'bg-emerald-50 text-emerald-700 border border-emerald-100/50 shadow-sm shadow-emerald-100/20' : 'bg-slate-100 text-slate-500 border border-slate-200'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${product.isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                        {product.isActive ? 'Operational' : 'Off-line'}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button 
                          onClick={() => openModal(product)}
                          className="p-2.5 text-slate-400 hover:text-[#0f7af7] hover:bg-blue-50 rounded-xl transition-all active:scale-90"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all active:scale-90"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-8 py-32 text-center">
                    <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-sm">
                        <Package className="h-10 w-10 text-slate-200" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 uppercase tracking-wider">Empty Database</h3>
                    <p className="text-slate-400 font-semibold text-sm max-w-xs mx-auto uppercase tracking-tighter mb-8">No digital assets were detected in the system registry.</p>
                    <button onClick={() => openModal()} className="px-8 py-3 bg-[#0f7af7] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-lg transition-transform">Add Master Asset</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-md" onClick={closeModal} />
          <div className="relative bg-white rounded-xl w-full max-w-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-300 border border-white/20">
            <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/20">
              <div>
                <span className="text-[10px] font-bold text-[#0f7af7] uppercase tracking-[0.3em] block mb-1">Asset Configuration</span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">{editingProduct ? "Edit Master Data" : "Deploy New Asset"}</h2>
              </div>
              <button onClick={closeModal} className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-slate-100">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-10 space-y-8 overflow-y-auto max-h-[75vh] custom-scrollbar">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Asset Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                      setFormData({...formData, name, slug: formData.slug ? formData.slug : slug});
                    }}
                    type="text" 
                    placeholder="e.g. Premium Access Node"
                    className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-english-font"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">URL Identifier (Slug)</label>
                  <input 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    type="text" 
                    placeholder="e.g. premium-access-node"
                    className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Market Pricing (BDT)</label>
                  <input 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-english-font"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Sector Class</label>
                  <div className="relative">
                    <select 
                        required
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                    >
                        <option value="">Select Category</option>
                        {Object.entries((t as any).categories || {}).map(([key, value]) => (
                        <option key={key} value={key}>{value as string}</option>
                        ))}
                    </select>
                    <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Asset Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  placeholder="Define the value proposition..."
                  className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Visual Endpoint (URL)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-300" />
                  <input 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    type="text" 
                    placeholder="https://cloud.cdn/asset.jpg"
                    className="w-full pl-14 pr-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Download Hub (Encrypted)</label>
                  <input 
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                    type="text" 
                    placeholder="Secure link endpoint..."
                    className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Deliverable Credentials</label>
                  <input 
                    value={formData.deliverableContent}
                    onChange={(e) => setFormData({...formData, deliverableContent: e.target.value})}
                    type="text" 
                    placeholder="Keys, tokens or intel..."
                    className="w-full px-6 py-4 bg-slate-50/50 border border-slate-200 rounded-lg text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              
              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-5 rounded-lg hover:bg-[#0f7af7] transition-all uppercase tracking-[0.3em] text-xs active:scale-[0.98]"
                >
                  {editingProduct ? "Synchronize Updates" : "Initiate Deployment"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
