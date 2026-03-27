"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type TabView = 'projects' | 'quotes' | 'contact';

export default function AdminDashboard() {
  const router = useRouter();

  // 1. ALL HOOKS MUST BE DECLARED AT THE TOP
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabView>('projects');

  const [projectForm, setProjectForm] = useState({
    title: '',
    techStack: '',
    description: '',
    liveLink: '',
    githubLink: '',
    isFeatured: false,
    coverImage: null as File | null
  });

  const [quoteForm, setQuoteForm] = useState({
    quoteText: '',
    author: ''
  });

  const [contactForm, setContactForm] = useState({
    mainDescription: '',
    email: '',
    discordUsername: '',
    cvFile: null as File | null
  });

  // 2. Security Check Effect
  useEffect(() => {
    const allowedEmails = [
      'michelruwishka@gmail.com',
      'w2120009@westminster.ac.uk',
      'ruwishkam@gmail.com',
      'michel.20232043@iit.ac.lk'
    ];

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || !user.email || !allowedEmails.includes(user.email)) {
        router.push('/admin');
      } else {
        setIsAuthorized(true);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  // 3. Handlers
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.push('/admin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (projectForm.coverImage) {
        const formData = new FormData();
        formData.append('file', projectForm.coverImage);
        formData.append('upload_preset', 'portfolio_uploads');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        imageUrl = data.secure_url;
      }

      await addDoc(collection(db, 'projects'), {
        title: projectForm.title,
        techStack: projectForm.techStack,
        description: projectForm.description,
        liveLink: projectForm.liveLink,
        githubLink: projectForm.githubLink,
        isFeatured: projectForm.isFeatured,
        imageUrl: imageUrl,
      });

      setProjectForm({
        title: '',
        techStack: '',
        description: '',
        liveLink: '',
        githubLink: '',
        isFeatured: false,
        coverImage: null
      });
      (e.target as HTMLFormElement).reset();
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project.');
    }
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'quotes'), {
        quoteText: quoteForm.quoteText,
        author: quoteForm.author
      });

      setQuoteForm({
        quoteText: '',
        author: ''
      });
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving quote:', error);
      alert('Error saving quote.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updateData: any = {
        mainDescription: contactForm.mainDescription,
        email: contactForm.email,
        discordUsername: contactForm.discordUsername
      };

      if (contactForm.cvFile) {
        const formData = new FormData();
        formData.append('file', contactForm.cvFile);
        formData.append('upload_preset', 'portfolio_uploads');

        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`, {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();
        updateData.cvUrl = data.secure_url;
      }

      await setDoc(doc(db, 'contact', 'main'), updateData, { merge: true });

      setContactForm({
        mainDescription: '',
        email: '',
        discordUsername: '',
        cvFile: null
      });
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving contact info:', error);
      alert('Error saving contact info.');
    }
  };

  // 4. EARLY RETURNS MUST GO HERE (After all hooks)
  if (isLoading) return <div className={styles.loading} style={{ padding: '2rem', textAlign: 'center', color: '#fff' }}>Verifying access...</div>;
  if (!isAuthorized) return null;

  // 5. MAIN RENDER
  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Dashboard</h1>
        <button className={styles.signOutBtn} onClick={handleSignOut}>
          Sign Out
        </button>
      </header>

      {/* Main Container */}
      <main className={styles.main}>
        {/* Tab Navigation */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'quotes' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('quotes')}
          >
            Quotes
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('contact')}
          >
            Contact Info
          </button>
        </div>

        {/* Tab Content Panels */}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <form className={styles.formCard} onSubmit={handleProjectSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className={styles.input}
                value={projectForm.title}
                onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="techStack">Tech Stack</label>
              <input
                type="text"
                id="techStack"
                className={styles.input}
                value={projectForm.techStack}
                onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                placeholder="e.g. Next.js, TypeScript, Firebase"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Project Description</label>
              <textarea
                id="description"
                className={styles.textarea}
                value={projectForm.description}
                onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                placeholder="Enter project overview..."
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="liveLink">Live Link (URL)</label>
              <input
                type="url"
                id="liveLink"
                className={styles.input}
                value={projectForm.liveLink}
                onChange={(e) => setProjectForm({ ...projectForm, liveLink: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="githubLink">GitHub Link (URL)</label>
              <input
                type="url"
                id="githubLink"
                className={styles.input}
                value={projectForm.githubLink}
                onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })}
              />
            </div>

            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="isFeatured"
                className={styles.checkbox}
                checked={projectForm.isFeatured}
                onChange={(e) => setProjectForm({ ...projectForm, isFeatured: e.target.checked })}
              />
              <label htmlFor="isFeatured">Is Featured</label>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="coverImage">Cover Image</label>
              <input
                type="file"
                id="coverImage"
                accept="image/*"
                className={styles.fileInput}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setProjectForm({ ...projectForm, coverImage: file });
                }}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Save Project
            </button>
          </form>
        )}

        {/* Quotes Tab */}
        {activeTab === 'quotes' && (
          <form className={styles.formCard} onSubmit={handleQuoteSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="quoteText">Quote Text</label>
              <textarea
                id="quoteText"
                className={styles.textarea}
                value={quoteForm.quoteText}
                onChange={(e) => setQuoteForm({ ...quoteForm, quoteText: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="author">Author</label>
              <input
                type="text"
                id="author"
                className={styles.input}
                value={quoteForm.author}
                onChange={(e) => setQuoteForm({ ...quoteForm, author: e.target.value })}
                required
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Save Quote
            </button>
          </form>
        )}

        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <form className={styles.formCard} onSubmit={handleContactSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="mainDescription">Main Description</label>
              <textarea
                id="mainDescription"
                className={styles.textarea}
                value={contactForm.mainDescription}
                onChange={(e) => setContactForm({ ...contactForm, mainDescription: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={contactForm.email}
                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="discordUsername">Discord Username</label>
              <input
                type="text"
                id="discordUsername"
                className={styles.input}
                value={contactForm.discordUsername}
                onChange={(e) => setContactForm({ ...contactForm, discordUsername: e.target.value })}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="cvFile">Upload CV (PDF)</label>
              <input
                type="file"
                id="cvFile"
                accept="application/pdf"
                className={styles.fileInput}
                onChange={(e) => {
                  const file = e.target.files ? e.target.files[0] : null;
                  setContactForm({ ...contactForm, cvFile: file });
                }}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Save Contact Info
            </button>
          </form>
        )}
      </main>
    </div>
  );
}