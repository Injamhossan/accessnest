
"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  Clock, 
  ShoppingBag,
  Loader2,
  Filter,
  User,
  Trash2
} from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";

export default function ManageUsersPage() {
  const { data: session } = useSession();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (userId: string, newRole: string) => {
    setUpdatingUserId(userId);
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to update role");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        const data = await res.json();
        alert(data.error || "Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if ((session?.user as any)?.role !== "admin" && (session?.user as any)?.role !== "superadmin") {
    return <div className="p-10 text-center font-bold text-red-600">Unauthorized Access</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto w-full">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">User Management</h1>
          <p className="text-slate-500 text-sm mt-1">Overview of registered users and their platform activity.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all" 
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex gap-6">
            <button className="text-xs font-bold text-blue-600 border-b-2 border-blue-600 pb-2">All Users</button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors pb-2">Admins</button>
            <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors pb-2">Verified</button>
          </div>
          <button className="p-2 bg-white hover:bg-slate-50 rounded-lg border border-slate-200 transition-colors">
            <Filter className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Details</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Role</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activity</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Joined</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="h-6 w-6 text-blue-600 animate-spin mx-auto" />
                  </td>
                </tr>
              ) : users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center overflow-hidden shrink-0">
                        {user.image ? <Image src={user.image} alt={user.name} width={36} height={36} className="object-cover" /> : <User className="h-4 w-4 text-blue-500" />}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name || "User"}</p>
                        <p className="text-[10px] text-slate-400 font-medium truncate">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="relative inline-block">
                      <select 
                        value={user.role} 
                        onChange={(e) => updateRole(user.id, e.target.value)}
                        disabled={updatingUserId === user.id || (user.role === 'superadmin' && (session?.user as any).role !== 'superadmin')}
                        className={`appearance-none inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${user.role === 'admin' || user.role === 'superadmin' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        {(session?.user as any).role === 'superadmin' && <option value="superadmin">Superadmin</option>}
                      </select>
                      {updatingUserId === user.id && (
                        <div className="absolute -right-5 top-1/2 -translate-y-1/2">
                          <Loader2 className="h-3 w-3 text-blue-600 animate-spin" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-3.5 w-3.5 text-slate-300" />
                      <span className="text-xs font-bold text-slate-900">{user.orderCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">{new Date(user.createdAt).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => deleteUser(user.id)}
                        disabled={(session?.user as any).id === user.id || (user.role === 'superadmin' && (session?.user as any).role !== 'superadmin')}
                        className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-300 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total: {users.length} registered users</p>
        </div>
      </div>
    </div>
  );
}
