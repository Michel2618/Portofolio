'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import styles from './admin.module.css';
import { auth } from '@/lib/firebase';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from 'firebase/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuthSuccess = async (userEmail: string | null) => {
    const allowedEmails = [
      'michelruwishka@gmail.com',
      'w2120009@westminster.ac.uk',
      'ruwishkam@gmail.com',
      'michel.20232043@iit.ac.lk'
    ];

    if (!userEmail || !allowedEmails.includes(userEmail)) {
      await signOut(auth);
      setError('Unauthorized: Email not whitelisted.');
      return;
    }
    router.push('/admin/dashboard');
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await handleAuthSuccess(result.user.email);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please try again.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await handleAuthSuccess(result.user.email);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Google sign-in failed. Please try again.');
    }
  };

  return (
    <main className={styles.page}>
      {/* Animated background blobs for depth */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />

      <div className={styles.card} role="main">
        {/* Lock icon */}
        <div className={styles.iconWrap} aria-hidden="true">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.lockIcon}
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h1 className={styles.heading}>
          <span className={styles.accent}>#</span>admin-access
        </h1>
        <p className={styles.sub}>Authorized personnel only</p>

        {error && (
          <p style={{ color: 'red', marginBottom: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className={styles.form} noValidate>
          {/* Email */}
          <div className={styles.fieldGroup}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <div className={styles.inputWrap}>
              <svg
                className={styles.inputIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className={styles.fieldGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <div className={styles.inputWrap}>
              <svg
                className={styles.inputIcon}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </div>
          </div>

          <button type="submit" className={styles.loginBtn}>
            Login
            <svg
              className={styles.btnArrow}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </form>

        {/* Divider */}
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>or continue with</span>
          <span className={styles.dividerLine} />
        </div>

        {/* Google Sign-In */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className={styles.googleBtn}
        >
          {/* Google "G" SVG logo */}
          <svg
            className={styles.googleLogo}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Sign in with Google
        </button>
      </div>
    </main>
  );
}
