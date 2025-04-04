import React, { useState, useEffect } from "react";
import GallerySection from './GallerySection.jsx'

export default function App() {
  const [showRSVP, setShowRSVP] = useState(false);
  const [showEvents, setShowEvents] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showRouteLodging, setShowRouteLodging] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeAllSections = () => {
    setShowRSVP(false);
    setShowEvents(false);
    setShowContact(false);
    setShowMusic(false);
    setShowGallery(false);
    setShowRouteLodging(false);
  };

  return (
    <div className="relative flex flex-col md:flex-row h-screen bg-[#FFF0F5]">
      <Sidebar
        setShowRSVP={setShowRSVP}
        setShowEvents={setShowEvents}
        setShowContact={setShowContact}
        setShowMusic={setShowMusic}
        setShowGallery={setShowGallery}
        setShowRouteLodging={setShowRouteLodging}
        isMobile={isMobile}
        closeAllSections={closeAllSections}
      />
      {showRSVP ? (
        <RSVPSection />
      ) : showEvents ? (
        <EventsSection />
      ) : showContact ? (
        <ContactSection />
      ) : showMusic ? (
        <MusicSection />
      ) : showGallery ? (
        <GallerySection />
      ) : showRouteLodging ? (
        <RouteLodgingSection />
      ) : (
        <HeroSection onRSVPClick={() => setShowRSVP(true)} />
      )}
    </div>
  );
}

function Copyright() {
  return (
    <div className="text-center text-xs text-gray-500 mt-8 pb-4 md:hidden">
      <p>© 2025 Vigh János Róbert - Minden jog fenntartva</p>
    </div>
  );
}

function Sidebar({
  setShowRSVP,
  setShowEvents,
  setShowContact,
  setShowMusic,
  setShowGallery,
  setShowRouteLodging,
  isMobile,
  closeAllSections,
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full md:w-1/2 h-[50vh] md:h-full">
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        {/* Helykitöltő */}
        {!imageLoaded && isMobile && (
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFF0F5] to-[#f8d7e3] flex items-center justify-center">
            <div className="text-center p-6">
              <div className="animate-pulse flex justify-center">
                <div className="w-16 h-16 rounded-full bg-pink-200 opacity-70"></div>
              </div>
              <h2 className="mt-4 text-xl font-serif text-gray-700 animate-pulse">
                Mesi & János
              </h2>
            </div>
          </div>
        )}

        {/* Háttérkép - Pontos pozíció beállítása mobilnézetben */}
        <img
          src="https://i.imgur.com/tB4ek54.jpeg"
          alt="Esküvői háttér"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            objectPosition: isMobile ? "center 50%" : "center center",
            height: isMobile ? "50vh" : "100%",
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      {!isMobile && (
        <div className="absolute top-16 left-16 text-white text-left">
          <h1 className="text-3xl md:text-5xl font-serif italic text-white drop-shadow-[2px_2px_3px_black]">
            Mesi & János
          </h1>
        </div>
      )}

      {!isMobile && (
        <div className="absolute bottom-6 left-0 right-0 text-center text-xs text-gray-300">
          <p>© 2025 Vigh János Róbert - Minden jog fenntartva</p>
        </div>
      )}

      <Menu
        setShowRSVP={setShowRSVP}
        setShowEvents={setShowEvents}
        setShowContact={setShowContact}
        setShowMusic={setShowMusic}
        setShowGallery={setShowGallery}
        setShowRouteLodging={setShowRouteLodging}
        closeAllSections={closeAllSections}
      />
    </div>
  );
}

function Menu({
  setShowRSVP,
  setShowEvents,
  setShowContact,
  setShowMusic,
  setShowGallery,
  setShowRouteLodging,
  closeAllSections,
}) {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (sectionHandler) => {
    closeAllSections();
    sectionHandler(true);
    setOpen(false);
  };

  return (
    <div
      className="fixed top-4 left-4 md:top-6 md:left-6 z-50"
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className="sticky top-4 p-1.5 bg-transparent border-2 border-white rounded-full shadow-md hover:scale-110 transition-transform duration-300 ease-in-out w-10 h-10 flex items-center justify-center"
      >
        <span className="text-white text-xl">☰</span>
      </button>

      {open && (
        <ul className="absolute top-12 left-0 w-60 bg-black bg-opacity-80 backdrop-blur-md shadow-xl rounded-xl p-4 border border-white space-y-2">
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(() => closeAllSections())}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🏠 Főoldal
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowEvents)}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              📅 Események
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowRSVP)}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              ✍️ Visszajelzés
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowContact)}
              className="flex items-center gap-2 text-white text-sm hover:text-lg hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              📞 Kapcsolat
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowGallery)}
              className="flex items-center gap-2 text-white text-sm hover:text-base hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🖼️ Galéria
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowMusic)}
              className="flex items-center gap-2 text-white text-sm hover:text-base hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🎵 Zene kívánságlista
            </button>
          </li>
          <li className="py-2">
            <button
              onClick={() => handleMenuClick(setShowRouteLodging)}
              className="flex items-center gap-2 text-white text-sm hover:text-base hover:font-semibold hover:scale-105 hover:underline underline-offset-4 transform transition-all duration-300 ease-in-out"
            >
              🗺️ Útvonal & Szállás
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

function HeroSection({ onRSVPClick }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft() {
    const targetDate = new Date("2025-06-07T14:00:00");
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="relative w-full md:w-1/2 flex-grow flex flex-col justify-center items-center bg-[#FFF0F5] p-10 text-center shadow-lg border-4 border-dashed border-pink-200 rounded-[3rem]">
      <h2 className="text-2xl md:text-3xl font-serif italic">
        Szamosújvár, Románia
      </h2>
      <p className="text-gray-600 mt-2 text-lg font-medium">
        2025. Június 07.
      </p>
      <p className="mt-4 text-gray-800 text-lg font-semibold animate-fade-in">
        {Math.floor(timeLeft.days / 30)} hónap {timeLeft.days % 30} nap{" "}
        {timeLeft.hours} óra
      </p>
      <button
        onClick={onRSVPClick}
        className="mt-6 px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white transition rounded-full text-lg"
      >
        Visszajelzés
      </button>
      <Copyright />
    </div>
  );
}

function EventsSection() {
  const events = [
    {
      icon: (
        <img
          src="https://img.icons8.com/emoji/48/dove-emoji.png"
          alt="dove icon"
          className="w-8 h-8"
        />
      ),
      title: "Búcsúztató",
      time: "12:00",
      link: "https://www.google.com/maps/place/Strada+Emil+Precup+13,+Gherla+405300,+Rom%C3%A1nia/@47.0372224,23.9160485,17z/data=!3m1!4b1!4m6!3m5!1s0x4749bdc1cdd8257f:0x708dba33b0dbbc2!8m2!3d47.0372225!4d23.9209194!16s%2Fg%2F11pzxhgxy5?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: "⛪",
      title: "Templomi szertartás",
      time: "14:00",
      link: "https://www.google.com/maps/place/Biserica+Reformat%C4%83/@47.0275099,23.9069219,17z/data=!3m1!4b1!4m6!3m5!1s0x4749bdbd20aefe0d:0x3cc4476f3b2f22ce!8m2!3d47.0275099!4d23.9094968!16s%2Fg%2F1pp2tkbjq?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
    },
    {
      icon: (
        <img
          src="https://img.icons8.com/color/48/champagne.png"
          alt="pezsgő ikon"
          className="w-8 h-8"
        />
      ),
      title: "Lakodalom",
      time: "18:00",
      link: "https://www.google.com/maps/place/Club+Escape/@47.0345001,23.9001655,17z/data=!3m1!4b1!4m6!3m5!1s0x4749bdb750c13141:0x6385487b5780214b!8m2!3d47.0345001!4d23.9027404!16s%2Fg%2F1tj5jybt?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMxOS4yIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-28 text-center">
        Események
      </h2>
      <div className="flex flex-col gap-20 w-full max-w-2xl">
        {events.map((event, idx) => (
          <div key={idx} className="flex justify-between items-center">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-white shadow">
                {event.icon}
              </div>
              <div>
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <p className="text-sm text-gray-700">{event.time}</p>
              </div>
            </div>
            <div>
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow transform transition duration-300 hover:scale-110 hover:bg-black group"
              >
                <img
                  src="https://img.icons8.com/ios-filled/50/000000/google-maps.png"
                  alt="Térkép"
                  className="w-6 h-6 transition duration-300 group-hover:invert"
                />
              </a>
            </div>
          </div>
        ))}
      </div>
      <Copyright />
    </div>
  );
}

function RSVPSection() {
  const [formData, setFormData] = useState({
    név: '',
    vendégek: 1,
    részvétel: 'igen',
    szállás: 'nem',
    üzenet: ''
  });
  const [elküldve, setElküldve] = useState(false);
  const [betöltés, setBetöltés] = useState(false);
  const [hiba, setHiba] = useState(null);

  const változásKezelése = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const beküldésKezelése = async (e) => {
    e.preventDefault();
    setBetöltés(true);
    setHiba(null);

    try {
      const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxa5-3QOIVlifcPOdLAU0HA0DqJzkZbEiCcn7lypYxusad6qNP6EHVaADA4GYABL9_P/exec';
      
      const adatParaméterek = new URLSearchParams();
      adatParaméterek.append('név', formData.név);
      adatParaméterek.append('vendégek', formData.vendégek);
      adatParaméterek.append('részvétel', formData.részvétel);
      adatParaméterek.append('szállás', formData.szállás);
      adatParaméterek.append('üzenet', formData.üzenet);

      const válasz = await fetch(`${SCRIPT_URL}?${adatParaméterek.toString()}`, {
        method: 'GET',
        redirect: 'follow'
      });

      setElküldve(true);
      setTimeout(() => setElküldve(false), 5000);
      setFormData({
        név: '',
        vendégek: 1,
        részvétel: 'igen',
        szállás: 'nem',
        üzenet: ''
      });

    } catch (err) {
      console.error('Hiba történt:', err);
      setHiba('Sikertelen beküldés. Kérlek próbáld újra!');
    } finally {
      setBetöltés(false);
    }
  };

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-8 text-center">
        Visszajelzés
      </h2>
      
      <div className="text-center mb-8 max-w-2xl">
        <p className="text-gray-700 mb-6">
          Kedves Vendégeink! 💌
          <br />
          Kérjük, erősítsétek meg részvételi szándékotokat legkésőbb 2025. május 15-ig.
        </p>
      </div>

      {hiba && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-full max-w-md">
          <p>{hiba}</p>
          <button 
            onClick={() => setHiba(null)}
            className="mt-2 text-red-500 hover:text-red-700"
          >
            Bezárás
          </button>
        </div>
      )}

      {!elküldve ? (
        <form onSubmit={beküldésKezelése} className="w-full max-w-md space-y-6">
          <div>
            <label htmlFor="név" className="block text-gray-700 mb-2">Név*</label>
            <input
              type="text"
              id="név"
              name="név"
              value={formData.név}
              onChange={változásKezelése}
              required
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <div>
            <label htmlFor="vendégek" className="block text-gray-700 mb-2">Résztvevők száma</label>
            <select
              id="vendégek"
              name="vendégek"
              value={formData.vendégek}
              onChange={változásKezelése}
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
                  name="részvétel"
                  value="igen"
                  checked={formData.részvétel === 'igen'}
                  onChange={változásKezelése}
                  className="text-pink-500"
                />
                <span className="ml-2">Igen, ott leszek! 🎉</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="részvétel"
                  value="nem"
                  checked={formData.részvétel === 'nem'}
                  onChange={változásKezelése}
                  className="text-pink-500"
                />
                <span className="ml-2">Sajnos nem 😢</span>
              </label>
            </div>
          </div>

          <div>
            <span className="block text-gray-700 mb-2">Szükséged van szállásra?</span>
            <div className="flex space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="szállás"
                  value="igen"
                  checked={formData.szállás === 'igen'}
                  onChange={változásKezelése}
                  className="text-pink-500"
                />
                <span className="ml-2">Igen</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="szállás"
                  value="nem"
                  checked={formData.szállás === 'nem'}
                  onChange={változásKezelése}
                  className="text-pink-500"
                />
                <span className="ml-2">Nem</span>
              </label>
            </div>
          </div>

          <div>
            <label htmlFor="üzenet" className="block text-gray-700 mb-2">Üzenet (opcionális)</label>
            <textarea
              id="üzenet"
              name="üzenet"
              value={formData.üzenet}
              onChange={változásKezelése}
              rows={3}
              className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={betöltés}
            className="w-full px-6 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {betöltés ? (
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
          <p>A visszaigazolásodat sikeresen elküldtük.</p>
        </div>
      )}

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Kérjük, küldd el visszaigazolásodat legkésőbb 2025. május 15-ig.</p>
      </div>
      <Copyright />
    </div>
  );
}

function ContactSection() {
  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-16 text-center">
        Kapcsolat
      </h2>

      <div className="flex flex-col gap-12 items-center justify-center">
        {/* János */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl shadow-md">
            🤵
          </div>
          <h3 className="text-xl font-semibold">János</h3>
          <a
            href="mailto:vighjani95@gmail.com"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            📧 vighjani95@gmail.com
          </a>
          <a
            href="tel:+36501099018"
            className="text-gray-800 hover:underline flex items-center gap-2"
          >
            📱 +36 50 109 9018
          </a>
        </div>

        {/* Mesi */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl shadow-md">
            👰
          </div>
          <h3 className="text-xl font-semibold">Mesi</h3>
          <a
            href="mailto:fulopemese.h@gmail.com"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            📧 fulopemese.h@gmail.com
          </a>
          <a
            href="tel:+36209243292"
            className="text-gray-800 hover:underline flex items-center gap-2"
          >
            📱 +36 20 924 3292
          </a>
        </div>
      </div>
      <Copyright />
    </div>
  );
}

function MusicSection() {
  const [formData, setFormData] = useState({ name: "", artist: "", song: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.name && formData.artist && formData.song) {
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycby0qO7qwvs8GzeXI8MLkWJDSJKvmM6JL8FcC0cDjXfTDVuaIWcYqDWmhPt8dk5X3qtpSg/exec"
        );
        const data = await res.json();

        const isDuplicate = data.some(
          (entry) =>
            entry.artist?.toLowerCase().trim() ===
              formData.artist.toLowerCase().trim() &&
            entry.song?.toLowerCase().trim() === formData.song.toLowerCase().trim()
        );

        if (isDuplicate) {
          setError(
            "Ez a dal már szerepel a kívánságlistán! 🎵 Kérlek válassz másikat."
          );
          return;
        }

        const saveRes = await fetch(
          "https://script.google.com/macros/s/AKfycby0qO7qwvs8GzeXI8MLkWJDSJKvmM6JL8FcC0cDjXfTDVuaIWcYqDWmhPt8dk5X3qtpSg/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        const saveResult = await saveRes.text();
        console.log("Mentés válasza:", saveResult);

        setFormData({ name: "", artist: "", song: "" });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
      } catch (err) {
        console.error("Hiba a mentés során:", err);
        setError("Hiba történt az adatok mentése közben.");
      }
    }
  };

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-3xl md:text-5xl font-serif italic mb-16 text-center">
        Zene kívánságlista
      </h2>

      <div className="w-full max-w-xs bg-white rounded-xl shadow-md p-6 border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center text-2xl">
            🎵
          </div>
        </div>

        {submitted && (
          <div className="mb-4 text-green-700 bg-green-100 border border-green-300 p-2 rounded text-center text-sm">
            Köszönjük! A kívánságot mentettük 🎉
          </div>
        )}

        {error && (
          <div className="mb-4 text-red-700 bg-red-100 border border-red-300 p-2 rounded text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Neved
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Előadó
            </label>
            <input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-300 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dal címe
            </label>
            <input
              type="text"
              name="song"
              value={formData.song}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-pink-200 focus:border-pink-300 text-sm"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition text-sm"
            >
              Küldés 🎵
            </button>
          </div>
        </form>

        <div className="mt-6">
          <AdminDownloadButton />
        </div>
      </div>
      <Copyright />
    </div>
  );
}

function AdminDownloadButton() {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    const code = prompt("Kérlek add meg az admin letöltési kódot:");
    if (code !== "mesijani.DJ2025") {
      alert("Hibás kód! Nincs jogosultság a letöltéshez.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycby0qO7qwvs8GzeXI8MLkWJDSJKvmM6JL8FcC0cDjXfTDVuaIWcYqDWmhPt8dk5X3qtpSg/exec?code=" +
          code
      );
      const result = await response.json();

      if (result.url) {
        window.open(result.url, "_blank");
      } else {
        alert("Nem sikerült a letöltési linket lekérni.");
      }
    } catch (error) {
      console.error("Hiba a letöltés során:", error);
      alert("Hiba történt a letöltés közben.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="w-full bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition text-sm"
      disabled={loading}
    >
      {loading ? "Letöltés..." : "🎧 Admin letöltés"}
    </button>
  );
}

function RouteLodgingSection() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Szállás képei (Google-ból)
  const hotelImages = [
    "https://i.szalas.hu/hotels/1420570/original/37241757.webp",
    "https://i.szalas.hu/hotels/1420570/original/37241760.webp",
    "https://i.szalas.hu/hotels/1420570/original/37241761.webp",
    "https://i.szalas.hu/hotels/1420570/original/37241762.webp",
    "https://i.szalas.hu/hotels/1420570/original/37241764.webp",
    "https://i.szalas.hu/hotels/1420570/original/37241766.webp",
    "https://i.szalas.hu/hotels/1420570/original/37241767.webp"
  ];

  return (
    <div className="relative w-full md:w-1/2 flex flex-col justify-start items-center bg-[#FFF0F5] p-10 animate-fade-in-up overflow-y-auto">
      <h2 className="text-2xl md:text-4xl font-serif italic mb-8 text-center">
        Útvonal & Szállás
      </h2>

      {/* 3 útvonal opció körökben - itt növeltem a gap értékeket */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-8 md:gap-12 w-full mb-12">
        {/* Opció 1 */}
        <div className="flex flex-col items-center">
          <a
            href="https://maps.app.goo.gl/18nkwcE3fFji1ftp7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-110 hover:bg-pink-50"
            title="Opció 1"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-maps.png"
              alt="Térkép"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </a>
          <p className="mt-2 text-sm font-medium">Opció 1 🚗</p>
        </div>

        {/* Opció 2 */}
        <div className="flex flex-col items-center">
          <a
            href="https://maps.app.goo.gl/3pr3GarSkqeVSEyA9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-110 hover:bg-pink-50"
            title="Opció 2"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-maps.png"
              alt="Térkép"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </a>
          <p className="mt-2 text-sm font-medium">Opció 2 🚗</p>
        </div>

        {/* Opció 3 */}
        <div className="flex flex-col items-center">
          <a
            href="https://maps.app.goo.gl/8ZCNCUpg8G4RjMjb7"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-110 hover:bg-pink-50"
            title="Opció 3"
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-maps.png"
              alt="Térkép"
              className="w-8 h-8 md:w-10 md:h-10"
            />
          </a>
          <p className="mt-2 text-sm font-medium">Opció 3 🚗</p>
        </div>
      </div>

      {/* Szállás rész - 4. kör + képnézegető */}
      <div className="w-full max-w-3xl">
        <h3 className="text-xl font-serif italic mb-6 text-center">Szállás</h3>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* 4. kör - Hotel térkép */}
          <div className="flex flex-col items-center w-full md:w-auto">
            <a
              href="https://www.google.com/maps/place/Hotel+Restaurant+Merion/@47.0303546,23.9267776,17z/data=!3m1!4b1!4m9!3m8!1s0x4749bd9f2d200143:0xc095f8e0461c0b7e!5m2!4m1!1i2!8m2!3d47.0303546!4d23.9293525!16s%2Fg%2F11ktbc36mn?hl=hu&entry=ttu&g_ep=EgoyMDI1MDMzMC4wIKXMDSoASAFQAw%3D%3D"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 md:w-24 md:h-24 rounded-full bg-white border-2 border-pink-300 flex items-center justify-center shadow-lg transform transition duration-300 hover:scale-110 hover:bg-pink-50 mb-3"
              title="Hotel térkép"
            >
              <img
                src="https://img.icons8.com/ios-filled/50/000000/google-maps.png"
                alt="Térkép"
                className="w-8 h-8 md:w-10 md:h-10"
              />
            </a>
            <p className="text-sm font-medium">Szállás 🛌</p>
          </div>

          {/* Képnézegető */}
          <div className="flex-1 w-full">
            <div className="relative h-56 md:h-64 w-full rounded-xl overflow-hidden shadow-lg border-2 border-pink-200">
              <img
                src={hotelImages[activeImageIndex]}
                alt={`Hotel kép ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigációs gombok */}
              <button
                onClick={() => setActiveImageIndex(prev => (prev > 0 ? prev - 1 : hotelImages.length - 1))}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
              >
                ←
              </button>
              <button
                onClick={() => setActiveImageIndex(prev => (prev < hotelImages.length - 1 ? prev + 1 : 0))}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1.5 rounded-full hover:bg-opacity-70"
              >
                →
              </button>
              
              {/* Pont indikátorok */}
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {hotelImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-2 h-2 rounded-full ${activeImageIndex === idx ? 'bg-pink-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
}