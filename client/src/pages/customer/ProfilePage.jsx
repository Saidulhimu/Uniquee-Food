import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../providers/AuthProvider';
import { User, Phone, MapPin, Camera, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export const ProfilePage = () => {
  const { user, updateUserProfile } = useAuth();

  const [name, setName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState('01341-180530');
  const [address, setAddress] = useState('Mirpur 2, Dhaka-1216');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({
        displayName: name,
        photoURL,
        phone,
        address,
      });
      toast.success('Profile details updated successfully!');
    } catch (err) {
      toast.error(err.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout isAdminLayout={false}>
      <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 sm:p-10 shadow-sm space-y-6">
        
        <div className="pb-4 border-b border-[#E8D8C3]">
          <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">Profile & Shipping Details</h1>
          <p className="text-xs text-gray-500">Update your contact information for hassle-free grocery deliveries</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
          <div>
            <label className="block text-xs font-bold text-[#4A0E22] mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A0E22] mb-1">Email (Account ID)</label>
            <input
              type="email"
              value={user?.email || ''}
              disabled
              className="w-full px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A0E22] mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01341-xxxxxx"
              className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A0E22] mb-1">Default Delivery Address</label>
            <textarea
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your street, road, area, and city..."
              className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#4A0E22] mb-1">Profile Photo URL (or ImgBB Link)</label>
            <input
              type="url"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              placeholder="https://i.ibb.co/..."
              className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{loading ? 'Saving Changes...' : 'Save Profile Details'}</span>
          </button>
        </form>

      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
