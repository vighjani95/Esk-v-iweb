import React, { useState } from 'react';

const RSVPSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    guests: 1,
    attendance: 'yes',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Itt lehetne valós adatküldés egy API-nak
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLoading(false);
    setSubmitted(true);
    // Alaphelyzetbe állítás 5 másodperc után
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-8 text-center">
        RSVP
      </h2>
      
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-gray-700 mb-6">
          Kedves Vendégeink! 💌
          <br />
          Kérjük, erősítsétek meg részvételiteket vagy titeket nem látunk majd...
        </p>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">Név*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label htmlFor="guests" className="block text-gray-700 mb-2">Vendégek száma</label>
            <select
              id="guests"
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            >
              {[1, 2, 3, 4, 5].map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          <div>
            <span className="block text-gray-700 mb-2">Részt veszel?</span>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="attendance"
                  value="yes"
                  checked={formData.attendance === 'yes'}
                  onChange={handleChange}
                  className="text-pink-500"
                />
                <span className="ml-2">Igen, ott leszek! 🎉</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="attendance"
                  value="no"
                  checked={formData.attendance === 'no'}
                  onChange={handleChange}
                  className="text-pink-500"
                />
                <span className="ml-2">Sajnos nem 😢</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 mb-2">Üzenet (opcionális)</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                Küldés...
              </>
            ) : (
              'Visszaigazolás küldése'
            )}
          </button>
        </form>
      ) : (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 w-full max-w-md">
          <p className="font-bold">Köszönjük a visszajelzést!</p>
          <p>Az RSVP-t sikeresen elküldtéd. Hamarosan felvesszük veled a kapcsolatot.</p>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Kérjük, küldd el visszaigazolásodat legkésőbb 2023. október 15-ig.</p>
      </div>
    </div>
  );
};

export default RSVPSection;