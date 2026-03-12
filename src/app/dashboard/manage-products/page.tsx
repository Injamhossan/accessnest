
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
  Layers
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
    return <div className="p-10 text-center font-bold text-red-600">Unauthorized Access</div>;
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <Layers className="h-8 w-8 text-blue-600" />
            Manage Products
          </h1>
          <p className="text-slate-500 font-medium mt-1">Add, update, or remove your digital offerings.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-5 w-5" /> Add New Product
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4 bg-slate-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 w-full transition-all" 
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">Filters</button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Product Information</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto" />
                    <p className="mt-2 text-slate-500 font-medium">Loading products...</p>
                  </td>
                </tr>
              ) : products.length > 0 ? (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden relative">
                          {product.image ? (
                            <Image src={product.image} alt={product.title} fill className="object-cover" />
                          ) : (
                            <Package className="h-6 w-6 m-3 text-slate-300" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{product.title}</p>
                          <p className="text-xs text-slate-400 font-medium mt-0.5 line-clamp-1 max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {(t as any).categories?.[product.category] || product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-900">৳{product.price}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold ring-1 ring-inset ${product.isActive ? 'bg-emerald-50 text-emerald-700 ring-emerald-600/10' : 'bg-slate-100 text-slate-600 ring-slate-400/10'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${product.isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                        {product.isActive ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 pr-2">
                        <button 
                          onClick={() => openModal(product)}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center">
                    <Package className="h-10 w-10 text-slate-200 mx-auto mb-3" />
                    <p className="text-slate-500 font-bold">No products found</p>
                    <button onClick={() => openModal()} className="mt-4 text-blue-600 font-bold text-sm hover:underline">Add your first product</button>
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
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h2 className="text-xl font-black text-slate-900">{editingProduct ? "Edit Product" : "New Digital Product"}</h2>
              <button onClick={closeModal} className="p-2 hover:bg-white rounded-full transition-colors">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Product Name</label>
                  <input 
                    required
                    value={formData.name}
                    onChange={(e) => {
                      const name = e.target.value;
                      const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                      setFormData({...formData, name, slug: formData.slug ? formData.slug : slug});
                    }}
                    type="text" 
                    placeholder="e.g. Cloud Storage Pro"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">URL Slug (Optional)</label>
                  <input 
                    value={formData.slug}
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    type="text" 
                    placeholder="e.g. cloud-storage-pro (Defaults to ID)"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Price (BDT)</label>
                  <input 
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                    type="number" 
                    step="0.01"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all appearance-none"
                  >
                    <option value="">Select Category</option>
                    {Object.entries((t as any).categories || {}).map(([key, value]) => (
                      <option key={key} value={key}>{value as string}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Description</label>
                <textarea 
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={4}
                  placeholder="What is this product about?"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Image URL (Optional)</label>
                <div className="relative">
                  <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input 
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    type="text" 
                    placeholder="https://..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Download URL (Digital Delivery)</label>
                  <input 
                    value={formData.downloadUrl}
                    onChange={(e) => setFormData({...formData, downloadUrl: e.target.value})}
                    type="text" 
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Deliverable Content / License</label>
                  <input 
                    value={formData.deliverableContent}
                    onChange={(e) => setFormData({...formData, deliverableContent: e.target.value})}
                    type="text" 
                    placeholder="Keys, Instructions, etc."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  {editingProduct ? "Update Product" : "Publish Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
