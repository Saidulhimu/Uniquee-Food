import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { INITIAL_FOODS } from '../../data/mockFoods';
import { Trash2, Edit3, ToggleLeft, ToggleRight, Search } from 'lucide-react';
import toast from 'react-hot-toast';

export const ManageProducts = () => {
  const [products, setProducts] = useState(() => {
    const custom = JSON.parse(localStorage.getItem('uniquee_custom_products') || '[]');
    return [...custom, ...INITIAL_FOODS];
  });
  const [searchTerm, setSearchTerm] = useState('');

  // In Stock / Out of Stock toggle as specified in doc:
  // "সব প্রোডাক্ট দেখা, প্রাইস/স্টক এডিট করা, In Stock / Out of Stock টগল এবং প্রোডাক্ট ডিলিট করা"
  const handleToggleStock = (id) => {
    setProducts((prev) =>
      prev.map((p) =>
        p._id === id ? { ...p, inStock: p.inStock === false ? true : false, stock: p.inStock === false ? 20 : 0 } : p
      )
    );
    toast.success('Stock availability updated');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success('Product removed from catalog');
    }
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout isAdminLayout={true}>
      <div className="space-y-6">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E8D8C3]">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">Manage Food Inventory</h1>
            <p className="text-xs text-gray-500">Edit prices, toggle stock, and maintain organic food catalogue</p>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search inventory..."
              className="pl-9 pr-4 py-2 bg-white border border-[#D8C3A5] rounded-xl text-xs focus:outline-none focus:border-[#5C162E]"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#D8C3A5] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-100 bg-[#FFF8E7]/60 text-gray-500 font-bold uppercase">
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Weight</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((prod) => {
                  const isAvailable = prod.inStock !== false && (prod.stock === undefined || prod.stock > 0);
                  return (
                    <tr key={prod._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.images?.[0]}
                            alt={prod.name}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100"
                          />
                          <div>
                            <p className="font-bold text-[#4A0E22]">{prod.name}</p>
                            <span className="text-[10px] text-gray-400 font-mono">ID: {prod._id.slice(-6)}</span>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 font-medium text-[#2E5A36]">{prod.category}</td>
                      <td className="p-4 font-semibold text-gray-600">{prod.weight}</td>

                      <td className="p-4">
                        <span className="font-bold text-[#5C162E]">৳{prod.discountPrice || prod.regularPrice}</span>
                        {prod.discountPrice && (
                          <span className="text-gray-400 line-through ml-1.5 text-[10px]">৳{prod.regularPrice}</span>
                        )}
                      </td>

                      <td className="p-4">
                        <button
                          onClick={() => handleToggleStock(prod._id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold transition-colors ${
                            isAvailable
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          <span>{isAvailable ? 'In Stock' : 'Out of Stock'}</span>
                        </button>
                      </td>

                      <td className="p-4 text-right">
                        <div className="inline-flex items-center gap-2">
                          <button
                            onClick={() => handleToggleStock(prod._id)}
                            className="p-1.5 text-gray-500 hover:text-[#5C162E] hover:bg-gray-100 rounded-lg"
                            title="Toggle Stock Status"
                          >
                            {isAvailable ? <ToggleRight className="w-5 h-5 text-emerald-600" /> : <ToggleLeft className="w-5 h-5 text-gray-400" />}
                          </button>
                          <button
                            onClick={() => handleDelete(prod._id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManageProducts;
