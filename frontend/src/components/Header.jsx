import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const roles = [
  'Plumber', 'Electrician', 'Tutor', 'Mechanic', 'Painter', 'Gardener', 'Chef', 'Caretaker'
];

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const navigate = useNavigate();

  const filteredSuggestions = searchQuery.trim()
    ? roles.filter((r) => r.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : [];

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    setCurrentFocus(-1);
    setSuggestionsVisible(!!val.trim());
  };

  const selectSuggestion = (s) => {
    setSearchQuery(s);
    setSuggestionsVisible(false);
    navigate('/hire', { state: { role: s } });
  };

  const handleKeyDown = (e) => {
    const items = filteredSuggestions;
    if (!items || items.length === 0) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCurrentFocus((p) => (p + 1) % items.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCurrentFocus((p) => (p - 1 + items.length) % items.length);
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
      if (!ev.target.closest || !ev.target.closest('.search-container')) setSuggestionsVisible(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  return (
    <header className="head">
      <img src="/image.png" alt="logo" id="pic" />
      <h1 id="he">Find And Grab</h1>
      <nav id="li">
        <Link to="/hire">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/help">Help</Link>
        <Link to="/" id="logout-link">Logout</Link>

        <div className="search-container" style={{ marginLeft: '12px' }}>
          <input
            id="search-box"
            placeholder="Search role..."
            autoComplete="off"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <ul id="suggestions" style={{ display: suggestionsVisible ? 'block' : 'none' }}>
            {filteredSuggestions.map((s, idx) => (
              <li key={s} className={idx === currentFocus ? 'active' : ''} onMouseDown={() => selectSuggestion(s)}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
