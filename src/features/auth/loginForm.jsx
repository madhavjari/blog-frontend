import { useState, useEffect } from "react";
import styles from "./auth.module.css";
import { Link } from "react-router";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [checkLogin, setCheckLogin] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    fetch(
      "https://blog-backend-production-e9b5.up.railway.app/api/auth/login",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
      .then((response) => {
        if (response.status === 404) {
          setCheckLogin("Already logged in");
        }
        return response.json();
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [token, error]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://blog-backend-production-e9b5.up.railway.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid Login Credentials");
      }
      localStorage.setItem("token", data.token);
      alert("Login successful!");
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (checkLogin === "Already logged in") {
    return (
      <>
        <p className={styles.error}>{checkLogin}</p>
        <Link to={`/`}>Go back</Link>
      </>
    );
  }
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Secure Access</p>
          <h1 className={styles.title}>Welcome back</h1>
          <p className={styles.subtitle}>
            Sign in to continue to your writing dashboard.
          </p>
        </header>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="username">
              Username*
            </label>
            <input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              value={username}
              required
              max={30}
              min={2}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">
              Password*
            </label>
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              value={password}
              max={15}
              min={8}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
