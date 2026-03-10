"use client";

import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";
import { KeyRound, ShieldCheck, Bell } from "lucide-react";

export default function SettingsPage() {
  const { lang } = useLangStore();
  const t = dict[lang].dashboardLayout;

  return (
    <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{t.settings}</h1>
        <p className="text-slate-500 mt-2">Manage security and preferences.</p>
      </header>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <KeyRound className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Change Password</h3>
              <p className="text-sm text-slate-500 leading-tight">Update your current password to secure your account.</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl border border-blue-200 text-blue-600 font-bold hover:bg-blue-50 transition-colors whitespace-nowrap">
            Update Password
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Two-Factor Authentication</h3>
              <p className="text-sm text-slate-500 leading-tight">Add an extra layer of security using an authenticator app.</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors whitespace-nowrap">
            Enable 2FA
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">Email Notifications</h3>
              <p className="text-sm text-slate-500 leading-tight">Control what updates we send to your inbox.</p>
            </div>
          </div>
          <button className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors whitespace-nowrap">
            Manage Preferences
          </button>
        </div>
      </div>
    </div>
  );
}
