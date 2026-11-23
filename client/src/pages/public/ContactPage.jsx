import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for contacting Uniquee Food! We will get back to you shortly.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFF8E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1 rounded-full">
            Customer Support & Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4A0E22] mt-3">
            Contact Uniquee Food
          </h1>
          <p className="text-sm text-gray-600 mt-2">
            Have questions about our pure honey, organic ghee, or nationwide order delivery? We are here to assist 24/7.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Official Contact Details from Document */}
          <div className="bg-[#5C162E] text-[#FFF8E7] rounded-3xl p-8 shadow-xl border border-[#D8C3A5] flex flex-col justify-between">
            <div>
              <h2 className="font-serif text-2xl font-bold mb-6 pb-3 border-b border-[#E8D8C3]/30">
                Official Information
              </h2>

              <ul className="space-y-6 text-sm text-[#E8D8C3]">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Physical Store & Fulfillment</strong>
                    <span className="text-xs leading-relaxed">
                      34/35 House, Top Floor, Rainkhola, Road 3, Block A, Mirpur 2, Dhaka-1216, Bangladesh
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Hotline & WhatsApp</strong>
                    <span className="text-xs">01341-180530 / +880 1341-180530</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Email Address</strong>
                    <span className="text-xs">orders@uniqueefood.com</span>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-white shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Operating Hours</strong>
                    <span className="text-xs">Always Open (24/7 Online Ordering)</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8D8C3]/20">
              <a
                href="https://wa.me/8801341180530"
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#2E5A36] hover:bg-emerald-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-[#D8C3A5] p-8 sm:p-10 shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#4A0E22] mb-2">
              Send us a Message
            </h2>
            <p className="text-xs text-gray-500 mb-6">
              Fill in the form below and our team will get back to you within 2 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4A0E22] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Saidul Himu"
                    className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4A0E22] mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="017xxxxxxxx"
                    className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A0E22] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A0E22] mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Wholesale Inquiry / Order Status / Feedback"
                  className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4A0E22] mb-1">Your Message</label>
                <textarea
                  rows="4"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we assist you with our organic products?..."
                  className="w-full px-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                ></textarea>
              </div>

              <button
                type="submit"
                className="px-8 py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactPage;
