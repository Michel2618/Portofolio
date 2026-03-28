"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';
import { db, auth } from '@/lib/firebase';
import { collection, addDoc, doc, setDoc, getDocs, updateDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';

type TabView = 'projects' | 'quotes' | 'contact' | 'skills';

export default function AdminDashboard() {
  const router = useRouter();

  // 1. ALL HOOKS MUST BE DECLARED AT THE TOP
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabView>('projects');
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

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

  const [skillsForm, setSkillsForm] = useState({
    languages: '',
    databases: '',
    tools: '',
    frameworks: '',
    other: ''
  });

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const docRef = doc(db, 'skills', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSkillsForm({
            languages: data.languages || '',
            databases: data.databases || '',
            tools: data.tools || '',
            frameworks: data.frameworks || '',
            other: data.other || ''
          });
        }
      } catch (error) {
        console.error('Error fetching skills:', error);
      }
    };
    fetchSkills();
  }, []);

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

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projects = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProjectsList(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

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

      if (editingProjectId) {
        const updateData: any = {
          title: projectForm.title,
          techStack: projectForm.techStack,
          description: projectForm.description,
          liveLink: projectForm.liveLink,
          githubLink: projectForm.githubLink,
          isFeatured: projectForm.isFeatured,
        };
        if (imageUrl) {
          updateData.imageUrl = imageUrl;
        }
        await updateDoc(doc(db, 'projects', editingProjectId), updateData);
      } else {
        await addDoc(collection(db, 'projects'), {
          title: projectForm.title,
          techStack: projectForm.techStack,
          description: projectForm.description,
          liveLink: projectForm.liveLink,
          githubLink: projectForm.githubLink,
          isFeatured: projectForm.isFeatured,
          imageUrl: imageUrl,
        });
      }

      setProjectForm({
        title: '',
        techStack: '',
        description: '',
        liveLink: '',
        githubLink: '',
        isFeatured: false,
        coverImage: null
      });
      setEditingProjectId(null);
      (e.target as HTMLFormElement).reset();
      await fetchProjects();
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

  const handleSkillsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setDoc(doc(db, 'skills', 'main'), skillsForm);
      alert('Saved successfully!');
    } catch (error) {
      console.error('Error saving skills:', error);
      alert('Error saving skills.');
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
          <button
            className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </div>

        {/* Tab Content Panels */}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
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
              {editingProjectId ? 'Update Project' : 'Save Project'}
            </button>
          </form>

          <div style={{ marginTop: '2rem' }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 'bold' }}>Edit Existing Projects</h2>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {projectsList.map((proj) => (
                <li key={proj.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255, 255, 255, 0.05)', padding: '1rem', marginBottom: '0.5rem', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <span style={{ color: '#fff', fontWeight: '500' }}>{proj.title}</span>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectForm({
                        title: proj.title || '',
                        techStack: proj.techStack || '',
                        description: proj.description || '',
                        liveLink: proj.liveLink || '',
                        githubLink: proj.githubLink || '',
                        isFeatured: proj.isFeatured || false,
                        coverImage: null
                      });
                      setEditingProjectId(proj.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{ padding: '0.5rem 1rem', background: 'rgba(255, 255, 255, 0.1)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.2)', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  >
                    Edit
                  </button>
                </li>
              ))}
            </ul>
          </div>
          </div>
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

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <form className={styles.formCard} onSubmit={handleSkillsSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="languages">Languages</label>
              <input
                type="text"
                id="languages"
                className={styles.input}
                value={skillsForm.languages}
                onChange={(e) => setSkillsForm({ ...skillsForm, languages: e.target.value })}
                placeholder="e.g. JavaScript, TypeScript, Python"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="databases">Databases</label>
              <input
                type="text"
                id="databases"
                className={styles.input}
                value={skillsForm.databases}
                onChange={(e) => setSkillsForm({ ...skillsForm, databases: e.target.value })}
                placeholder="e.g. MongoDB, PostgreSQL"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="tools">Tools</label>
              <input
                type="text"
                id="tools"
                className={styles.input}
                value={skillsForm.tools}
                onChange={(e) => setSkillsForm({ ...skillsForm, tools: e.target.value })}
                placeholder="e.g. Git, Docker"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="frameworks">Frameworks & Libraries</label>
              <input
                type="text"
                id="frameworks"
                className={styles.input}
                value={skillsForm.frameworks}
                onChange={(e) => setSkillsForm({ ...skillsForm, frameworks: e.target.value })}
                placeholder="e.g. React, Next.js, Vue"
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="other">Other</label>
              <input
                type="text"
                id="other"
                className={styles.input}
                value={skillsForm.other}
                onChange={(e) => setSkillsForm({ ...skillsForm, other: e.target.value })}
                placeholder="e.g. REST APIs, Agile"
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Save Skills
            </button>
          </form>
        )}
      </main>
    </div>
  );
}