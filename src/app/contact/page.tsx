"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useLangStore } from "@/store/langStore";
import { dict } from "@/utils/dictionary";

export default function ContactPage() {
  const { lang } = useLangStore();
  const t = dict[lang]?.contact || dict.en.contact;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t.desc}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.email}</h3>
                <p className="text-slate-500 mt-1 mb-2 text-sm">{t.emailDesc}</p>
                <a href="mailto:accessnestbd@gmail.com" className="font-semibold text-sky-600 hover:underline break-all">accessnestbd@gmail.com</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.call}</h3>
                <p className="text-slate-500 mt-1 mb-2 text-sm">{t.callDesc}</p>
                <a href="tel:+8801641108312" className="font-semibold text-emerald-600 hover:underline">+8801641108312</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4 transition-all hover:shadow-md">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{t.visit}</h3>
                <p className="text-slate-500 mt-1 mb-2 text-sm">{t.visitDesc}</p>
                <span className="font-semibold text-amber-600 block">Bashundhara R/A, Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 relative overflow-hidden">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">{t.formTitle}</h2>
            
            {success ? (
              <div className="flex flex-col items-center justify-center py-16 text-center animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-500 max-w-md">Thank you for reaching out. We have received your message and will get back to you shortly.</p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 px-6 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm font-bold animate-in fade-in">
                    {error}
                  </div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-semibold text-slate-700">{t.fName}</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-semibold text-slate-700">{t.lName}</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-700">{t.emailInput}</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-semibold text-slate-700">{t.message}</label>
                  <textarea 
                    id="message" 
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={lang === "bn" ? "কীভাবে সাহায্য করতে পারি?" : "How can we help you?"}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> {t.send}</>}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
