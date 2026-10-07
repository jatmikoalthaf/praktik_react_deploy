import { useState } from "react";
import "./TiraiLogin.css";

export default function TiraiLogin() {
  const [on, setOn] = useState(false);
  const [pull, setPull] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  const toggleCurtain = () => {
    setOn((v) => !v);
    setPull(false);
    requestAnimationFrame(() => setPull(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Nama pengguna belum diisi.");
      return;
    }
    if (pass.length < 6) {
      setError("Kata sandi minimal 6 karakter.");
      return;
    }

    setError("");
    setUser(name.trim());
  };

  const handleLogout = () => {
    setUser(null);
    setPass("");
  };

  return (
    <div className={`tr ${on ? "on" : ""}`}>
      <div className="tr-wrap">
        <button
          className="tr-btn"
          onClick={toggleCurtain}
          aria-pressed={on}
          aria-label={on ? "Tutup tirai" : "Buka tirai"}
        >
          <svg viewBox="0 0 260 340" width="260" height="340" aria-hidden="true">
            <defs>
              <clipPath id="trglass">
                <rect x="26" y="40" width="188" height="250" />
              </clipPath>

              <linearGradient id="trsky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8fc4e6" />
                <stop offset="1" stopColor="#fbd7a4" />
              </linearGradient>

              <pattern id="trfold" width="16" height="10" patternUnits="userSpaceOnUse">
                <rect width="16" height="10" fill="#6f8f7a" />
                <rect width="7" height="10" fill="#628270" />
              </pattern>
            </defs>

            <rect x="10" y="24" width="220" height="276" rx="6" fill="#5a3d2b" />

            <g clipPath="url(#trglass)">
              <rect x="26" y="40" width="188" height="250" fill="#1b2440" />
              <g className="tr-stars" fill="#fff">
                <circle cx="60" cy="70" r="1.5" />
                <circle cx="150" cy="60" r="1.2" />
                <circle cx="185" cy="110" r="1.6" />
                <circle cx="90" cy="130" r="1" />
              </g>

              <rect className="tr-dawn" x="26" y="40" width="188" height="250" fill="url(#trsky)" />

              <g className="tr-sun">
                <circle cx="120" cy="210" r="46" fill="#ffe9b0" opacity="0.45" />
                <circle cx="120" cy="210" r="28" fill="#fff3c9" />
              </g>

              <path
                d="M26 290 L26 250 Q70 225 120 245 Q170 225 214 250 L214 290 Z"
                fill="#4f7a62"
              />

              <rect x="119" y="40" width="2" height="250" fill="#5a3d2b" />
              <rect x="26" y="150" width="188" height="2" fill="#5a3d2b" />

              <rect className="tr-cl" x="26" y="40" width="96" height="250" fill="url(#trfold)" />
              <rect className="tr-cr" x="118" y="40" width="96" height="250" fill="url(#trfold)" />
            </g>

            <rect x="0" y="14" width="250" height="8" rx="4" fill="#3b2a1d" />
            <rect x="4" y="298" width="232" height="10" rx="3" fill="#3b2a1d" />

            <g
              className={`tr-cord ${pull ? "pull" : ""}`}
              onAnimationEnd={() => setPull(false)}
            >
              <line x1="240" y1="22" x2="240" y2="170" stroke="#8a7d6a" strokeWidth="1.5" />
              <circle cx="240" cy="176" r="6" fill="#d9a441" />
            </g>
          </svg>
        </button>

        <div className="tr-hint">Tarik tali untuk membuka tirai</div>
      </div>

      <form className="tr-card" onSubmit={handleSubmit} noValidate aria-hidden={!on}>
        <h1>Selamat pagi</h1>

        {user ? (
          <>
            <p className="tr-sub">Halo, {user}. Kamu sudah masuk.</p>
            <button
              type="button"
              className="tr-go"
              tabIndex={on ? 0 : -1}
              onClick={handleLogout}
            >
              Keluar
            </button>
          </>
        ) : (
          <>
            <p className="tr-sub">Masuk untuk memulai harimu</p>

            <label className="tr-lab">
              Nama pengguna
              <input
                className="tr-in"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!on}
                autoComplete="username"
              />
            </label>

            <label className="tr-lab">
              Kata sandi
              <input
                className="tr-in"
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                disabled={!on}
                autoComplete="current-password"
              />
            </label>

            {error && (
              <p className="tr-err" role="alert">
                {error}
              </p>
            )}

            <button className="tr-go" type="submit" disabled={!on}>
              Masuk
            </button>
          </>
        )}
      </form>
    </div>
  );
}