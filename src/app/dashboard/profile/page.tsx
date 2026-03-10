"use client";

import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function ProfilePage() {
  const { lang } = useLangStore();
  const t = dict[lang].dashboardLayout;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t.profile}</h1>
        <p className="text-slate-500 mt-2">Manage your account details and personal information.</p>
      </header>
      
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
          <div className="w-24 h-24 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
            JD
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">John Doe</h2>
            <p className="text-slate-500">johndoe@example.com</p>
          </div>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
              <input type="text" defaultValue="John" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
              <input type="text" defaultValue="Doe" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input type="email" defaultValue="johndoe@example.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors" />
          </div>
          
          <div className="pt-4">
            <button type="button" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
