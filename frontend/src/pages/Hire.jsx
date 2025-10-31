import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";

const roles = [
  { key: "Plumber", img: "/plumber.png" },
  { key: "Electrician", img: "/elec.png" },
  { key: "Tutor", img: "/tutor.png" },
  { key: "Mechanic", img: "/mech.png" },
  { key: "Painter", img: "/paint.png" },
  { key: "Gardener", img: "/garden.png" },
  { key: "Chef", img: "/chef.png" },
  { key: "Caretaker", img: "/care.png" },
];

const Hire = () => {
  const [workers, setWorkers] = useState([]);
  const [loadingWorkers, setLoadingWorkers] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingWorker, setBookingWorker] = useState(null);

  // Booking form state
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");

  // Search / suggestions state
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);

  const filteredSuggestions = searchQuery.trim()
    ? roles.map(r => r.key).filter(k => k.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : [];

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentFocus(-1);
    setSuggestionsVisible(!!val.trim());
  };

  const selectSuggestion = (s) => {
    setSearchQuery(s);
    setSuggestionsVisible(false);
    showDetails(s);
  };

  const handleSearchKeyDown = (e) => {
    const items = filteredSuggestions;
    if (!items || items.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentFocus(prev => (prev + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentFocus(prev => (prev - 1 + items.length) % items.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (currentFocus > -1 && items[currentFocus]) selectSuggestion(items[currentFocus]);
      else if (searchQuery.trim()) selectSuggestion(searchQuery.trim());
    } else if (e.key === 'Escape') {
      setSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    const onDocClick = (ev) => {
      if (!ev.target.closest || !ev.target.closest('.search-container')) {
        setSuggestionsVisible(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  // show details for a role (fetch workers by jobType)
  const showDetails = async (role) => {
    setSelectedRole(role);
    setDetailsOpen(true);
    setLoadingWorkers(true);
    try {
      const res = await fetch(`/api/workers/by-job/${encodeURIComponent(role)}`);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setWorkers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setWorkers([]);
    } finally {
      setLoadingWorkers(false);
    }
  };

  const closeDetails = () => {
    setDetailsOpen(false);
    setWorkers([]);
    setSelectedRole("");
  };

  const openBooking = (worker) => {
    setBookingWorker(worker);
    setBookingOpen(true);
    // prefill customer email from localStorage user if present
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (user && user.email) setCustomerEmail(user.email);
    } catch (e) {}
  };

  const closeBooking = () => {
    setBookingOpen(false);
    setBookingWorker(null);
    setCustomerName("");
    // keep customerEmail if prefilled
    setCustomerPhone("");
    setCustomerAddress("");
    setBookingDate("");
    setBookingTime("");
  };

  const submitBooking = async (e) => {
    e.preventDefault();
    if (!bookingWorker) return alert('No worker selected');
    try {
      const res = await fetch('/api/bookings/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: bookingWorker._id,
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          jobType: bookingWorker.jobType,
          bookingDate,
          bookingTime,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Booking successful');
        closeBooking();
      } else {
        alert(data.message || data.error || 'Booking failed');
      }
    } catch (err) {
      console.error(err);
      alert('Could not connect to backend');
    }
  };

  // Auto-open details if navigated with a role in location.state
  const location = useLocation();
  useEffect(() => {
    if (location && location.state && location.state.role) {
      showDetails(location.state.role);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location && location.state && location.state.role]);

  return (
    <div>
      <Header />

      <section className="role-grid">
        {roles.map(r => (
          <button key={r.key} className="role-card" onClick={() => showDetails(r.key)}>
            <img src={r.img} alt={r.key} />
            <p>{r.key}</p>
          </button>
        ))}
      </section>

      {/* Details Modal */}
      {detailsOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeDetails}>✖</span>
            <h2>{selectedRole}</h2>
            <div id="workersList">
              {loadingWorkers && <p>Loading...</p>}
              {!loadingWorkers && workers.length === 0 && <p>No workers found for this role.</p>}
              {!loadingWorkers && workers.map(w => (
                <div key={w._id} className="worker-card">
                  <p><strong>{w.name}</strong></p>
                  <p>Email: {w.email}</p>
                  <p>Experience: {w.experience}</p>
                  <button className="btn" onClick={() => openBooking(w)}>Book Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingOpen && (
        <div className="modal" style={{ display: 'flex' }}>
          <div className="modal-content">
            <span className="close-btn" onClick={closeBooking}>✖</span>
            <h2 id="bookingTitle">Book <strong>{bookingWorker?.name}</strong></h2>
            <form id="bookingForm" onSubmit={submitBooking}>
              <div className="form-group">
                <h3>Your Information</h3>
                <label>Your Name:</label>
                <input required value={customerName} onChange={e => setCustomerName(e.target.value)} />
                <label>Your Email:</label>
                <input type="email" required value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
                <label>Phone Number:</label>
                <input required value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} />
                <label>Address:</label>
                <input required value={customerAddress} onChange={e => setCustomerAddress(e.target.value)} />
              </div>
              <div className="form-group">
                <h3>Booking Details</h3>
                <label>Date:</label>
                <input type="date" required value={bookingDate} onChange={e => setBookingDate(e.target.value)} />
                <label>Time:</label>
                <input type="time" required value={bookingTime} onChange={e => setBookingTime(e.target.value)} />
              </div>
              <button type="submit" className="btn">Confirm Booking</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hire;
