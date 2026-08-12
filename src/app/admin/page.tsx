'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [token, setToken] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);
  const [adminRole, setAdminRole] = useState<string>('EDITOR');

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'POSTS' | 'CREATE_POST' | 'CATEGORIES' | 'MEMBERS' | 'USERS'>('POSTS');

  // Member & User Data State
  const [members, setMembers] = useState<any[]>([]);
  const [teamUsers, setTeamUsers] = useState<any[]>([]);
  
  // User Creation State
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('EDITOR');

  // Login & Setup State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isSetupMode, setIsSetupMode] = useState(false);

  // Content Data State
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  // Article Form State
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  // Category Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');

  const triggerStatus = (type: 'success' | 'error', text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 5000);
  };

  const getApiUrl = () => process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  const getHeaders = (activeToken: string = token!) => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${activeToken}`
  });

  const fetchContent = async (activeToken: string = token!) => {
    if (!activeToken) return;
    setIsLoading(true);
    try {
      const [postRes, catRes, memberRes, userRes] = await Promise.all([
        fetch(`${getApiUrl()}/api/posts?adminView=true`, { headers: getHeaders(activeToken) }),
        fetch(`${getApiUrl()}/api/categories`),
        fetch(`${getApiUrl()}/api/members`, { headers: getHeaders(activeToken) }).catch(() => ({ json: () => ({ success: false }) })),
        fetch(`${getApiUrl()}/api/admin/users`, { headers: getHeaders(activeToken) }).catch(() => ({ json: () => ({ success: false }) }))
      ]);

      const [postData, catData, memberData, userData] = await Promise.all([
        postRes.json(), 
        catRes.json(), 
        memberRes.json(),
        userRes ? userRes.json() : { success: false }
      ]);

      if (postData.success) setPosts(postData.data);
      if (catData.success) setCategories(catData.data);
      if (memberData && memberData.success) setMembers(memberData.data);
      if (userData && userData.success) setTeamUsers(userData.data);
    } catch (err) {
      console.error('Error fetching CMS content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  {/* TEAM ACCOUNTS TAB */}
        {activeTab === 'USERS' && adminRole === 'MASTER_ADMIN' && (
          <div className="space-y-8">
            {/* CREATE USER FORM */}
            <div className="bg-[#04240c] border border-[#0a4017] rounded-xl p-6 shadow-xl max-w-2xl">
              <h2 className="text-lg font-bold uppercase tracking-wide mb-4 text-white flex items-center">
                <span className="w-2 h-5 bg-[#AE955A] mr-3 rounded-full"></span>
                Add New Team Account
              </h2>
              <form onSubmit={handleCreateUser} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    required
                    placeholder="Full Name (e.g. Media Team 1)"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    className="bg-[#021807] border border-[#0a4017] px-4 py-3 text-white text-sm outline-none rounded-lg focus:border-[#AE955A]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={newUserEmail}
                    onChange={(e) => setNewUserEmail(e.target.value)}
                    className="bg-[#021807] border border-[#0a4017] px-4 py-3 text-white text-sm outline-none rounded-lg focus:border-[#AE955A]"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={newUserPassword}
                    onChange={(e) => setNewUserPassword(e.target.value)}
                    className="bg-[#021807] border border-[#0a4017] px-4 py-3 text-white text-sm outline-none rounded-lg focus:border-[#AE955A]"
                  />
                  <select
                    value={newUserRole}
                    onChange={(e) => setNewUserRole(e.target.value)}
                    className="bg-[#021807] border border-[#0a4017] px-4 py-3 text-white text-sm outline-none rounded-lg focus:border-[#AE955A]"
                  >
                    <option value="EDITOR">EDITOR (Can post articles only)</option>
                    <option value="MASTER_ADMIN">MASTER ADMIN (Full control)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-[#04681F] hover:bg-[#058227] text-white font-bold py-3 px-6 uppercase text-xs tracking-wider rounded-lg transition-all"
                >
                  Create Account
                </button>
              </form>
            </div>

            {/* USERS LIST TABLE */}
            <div className="bg-[#04240c] border border-[#0a4017] rounded-xl p-6 shadow-xl">
              <h2 className="text-lg font-bold uppercase tracking-wide mb-6 text-white flex items-center">
                <span className="w-2 h-5 bg-[#04681F] mr-3 rounded-full"></span>
                Active Admin Accounts
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-[#021807] text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Name</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Role</th>
                      <th className="px-4 py-3 text-center rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamUsers.map((user) => (
                      <tr key={user.id} className="border-b border-[#0a4017] hover:bg-[#021807]/50 transition-colors">
                        <td className="px-4 py-4 font-bold text-white">{user.name}</td>
                        <td className="px-4 py-4 font-mono text-xs text-[#AE955A]">{user.email}</td>
                        <td className="px-4 py-4">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                            user.role === 'MASTER_ADMIN' ? 'bg-amber-950 text-amber-400 border border-amber-800' : 'bg-blue-950 text-blue-400 border border-blue-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold uppercase px-3 py-1.5 rounded transition-all border border-red-800/40"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* JOIN REQUESTS TAB */}
        {activeTab === 'MEMBERS' && (
    const savedToken = localStorage.getItem('cm_token');
    const savedName = localStorage.getItem('cm_name');
    const savedRole = localStorage.getItem('cm_role');

    if (savedToken) {
      setToken(savedToken);
      if (savedName) setAdminName(savedName);
      if (savedRole) setAdminRole(savedRole);
      fetchContent(savedToken);
    }
  }, []);

  // Auto-generate URL slug when title changes
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPostId) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const endpoint = isSetupMode ? '/api/admin/setup' : '/api/admin/login';
    try {
      const res = await fetch(`${getApiUrl()}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });
      const data = await res.json();
      if (data.success) {
        if (isSetupMode) {
          triggerStatus('success', 'Master Admin created! Please log in.');
          setIsSetupMode(false);
          setPassword('');
        } else {
          localStorage.setItem('cm_token', data.token);
          localStorage.setItem('cm_name', data.name);
          localStorage.setItem('cm_role', data.role);
          setToken(data.token);
          setAdminName(data.name);
          setAdminRole(data.role);
          fetchContent(data.token);
        }
      } else {
        setLoginError(data.error || 'Authentication failed.');
      }
    } catch (err) {
      setLoginError('Could not connect to Capacity Movement API.');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
  };

  const resetPostForm = () => {
    setEditingPostId(null);
    setTitle('');
    setSlug('');
    setContent('');
    setFeaturedImage('');
    setImageFile(null);
    setCategoryId('');
    setIsPublished(false);
  };

  const handleSavePost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let finalImageUrl = featuredImage;

    // If the admin selected a new image file, upload it to Cloudinary first
    if (imageFile) {
      triggerStatus('success', 'Uploading image...');
      const formData = new FormData();
      formData.append('image', imageFile);
      
      try {
        const uploadRes = await fetch(`${getApiUrl()}/api/upload`, {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${token}` }, // No Content-Type, browser handles the form boundary
          body: formData
        });
        const uploadData = await uploadRes.json();
        
        if (uploadData.success) {
          finalImageUrl = uploadData.url;
        } else {
          triggerStatus('error', 'Image upload failed.');
          return; // Stop saving the article if image upload fails
        }
      } catch (err) {
        triggerStatus('error', 'Network error during image upload.');
        return;
      }
    }

    const endpoint = editingPostId ? `/api/posts/${editingPostId}` : '/api/posts';
    const method = editingPostId ? 'PUT' : 'POST';

    try {
      const res = await fetch(`${getApiUrl()}${endpoint}`, {
        method,
        headers: getHeaders(),
        body: JSON.stringify({
          title,
          slug,
          content,
          featuredImage: finalImageUrl || null,
          categoryId: categoryId || null,
          isPublished
        })
      });
      const data = await res.json();
      if (data.success) {
        triggerStatus('success', editingPostId ? 'Article updated successfully.' : 'New article published!');
        resetPostForm();
        setActiveTab('POSTS');
        fetchContent();
      } else {
        triggerStatus('error', data.error);
      }
    } catch (err) {
      triggerStatus('error', 'Network error while saving post.');
    }
  };

  const handleEditClick = (post: any) => {
    setEditingPostId(post.id);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
    setFeaturedImage(post.featuredImage || '');
    setCategoryId(post.categoryId || '');
    setIsPublished(post.isPublished);
    setActiveTab('CREATE_POST');
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news update?')) return;
    try {
      const res = await fetch(`${getApiUrl()}/api/posts/${id}`, {
        method: 'DELETE',
        headers: getHeaders()
      });
      const data = await res.json();
      if (data.success) {
        triggerStatus('success', 'Post removed.');
        fetchContent();
      } else {
        triggerStatus('error', data.error);
      }
    } catch (err) {
      triggerStatus('error', 'Network error.');
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${getApiUrl()}/api/categories`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ name: catName, slug: catSlug })
      });
      const data = await res.json();
      if (data.success) {
        triggerStatus('success', 'Category added.');
        setIsCategoryModalOpen(false);
        setCatName('');
        setCatSlug('');
        fetchContent();
      } else {
        triggerStatus('error', data.error);
      }
    } catch (err) {
      triggerStatus('error', 'Network error.');
    }
  };

  // LOGIN INTERFACE
  if (!token) {
    return (
      <main className="min-h-screen bg-[#021807] flex items-center justify-center p-8 font-sans">
        <div className="w-full max-w-md bg-[#04240c] border border-[#0a4017] p-8 shadow-2xl relative rounded-xl">
          <div className="absolute top-0 left-0 w-full h-2 bg-[#AE955A] rounded-t-xl"></div>
          
          <div className="text-center mb-6 mt-2">
            <h1 className="text-2xl font-extrabold text-white tracking-wide">CAPACITY MOVEMENT</h1>
            <p className="text-xs text-[#AE955A] uppercase tracking-widest mt-1 font-bold">Project 2027 Admin Portal</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isSetupMode && (
              <input
                type="text"
                required
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-white placeholder-gray-500 focus:border-[#AE955A] outline-none rounded-lg text-sm"
              />
            )}
            <input
              type="email"
              required
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-white placeholder-gray-500 focus:border-[#AE955A] outline-none rounded-lg text-sm"
            />
            <input
              type="password"
              required
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-white placeholder-gray-500 focus:border-[#AE955A] outline-none rounded-lg text-sm"
            />
            {loginError && <p className="text-red-400 text-xs font-semibold">{loginError}</p>}
            
            <button
              type="submit"
              className="w-full bg-[#04681F] hover:bg-[#058227] text-white font-bold py-3.5 uppercase tracking-wider text-xs rounded-lg transition-all shadow-lg"
            >
              {isSetupMode ? 'Initialize Master Account' : 'Sign In to Dashboard'}
            </button>
          </form>

          <div className="mt-6 text-center border-t border-[#0a4017] pt-5 flex flex-col gap-4">
            <button
              onClick={() => setIsSetupMode(!isSetupMode)}
              className="text-xs text-gray-400 hover:text-[#AE955A] tracking-wider transition-colors"
            >
              {isSetupMode ? '← Back to Login' : 'First time deployment? Setup Master Admin'}
            </button>
            <Link href="/" className="inline-flex items-center justify-center gap-2 text-[10px] text-[#AE955A] hover:text-white font-bold uppercase tracking-widest transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Return to Homepage
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // MAIN DASHBOARD INTERFACE
  return (
    <main className="min-h-screen bg-[#021807] text-white p-6 md:p-10 font-sans relative">
      {statusMsg.text && (
        <div
          className={`fixed top-8 right-8 z-50 px-6 py-4 rounded-lg border shadow-2xl ${
            statusMsg.type === 'success'
              ? 'bg-[#04240c] border-[#04681F] text-green-300'
              : 'bg-red-950/90 border-red-700 text-red-300'
          }`}
        >
          <div className="text-xs font-bold uppercase tracking-widest">
            {statusMsg.type === 'success' ? 'CMS Success' : 'Error'}
          </div>
          <div className="mt-1 text-sm font-medium">{statusMsg.text}</div>
        </div>
      )}

      {/* RETURN TO HOME & HEADER BAR */}
      <div className="max-w-7xl mx-auto mb-4">
        <Link href="/" className="inline-flex items-center justify-center gap-2 text-[10px] md:text-xs text-[#AE955A] hover:text-white font-bold uppercase tracking-widest transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return to Homepage
        </Link>
      </div>
      
      <header className="mb-8 flex justify-between items-center border-b border-[#0a4017] pb-6 max-w-7xl mx-auto">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-white">Capacity Movement Newsroom</h1>
          <p className="text-[#AE955A] mt-1 text-xs font-bold uppercase tracking-widest">
            Logged in as {adminName || 'Admin'} ({adminRole})
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="text-xs font-bold uppercase tracking-wider px-4 py-2 border border-[#0a4017] hover:bg-[#04240c] text-gray-300 hover:text-white rounded-lg transition-all"
        >
          Sign Out
        </button>
      </header>

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto">
        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap gap-4 border-b border-[#0a4017] mb-8 pb-3">
          <button
            onClick={() => { resetPostForm(); setActiveTab('POSTS'); }}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'POSTS' ? 'bg-[#04681F] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            All Articles ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab('CREATE_POST')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'CREATE_POST' ? 'bg-[#04681F] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            {editingPostId ? '✏️ Edit Article' : '+ Write New Article'}
          </button>
          <button
            onClick={() => setActiveTab('MEMBERS')}
            className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === 'MEMBERS' ? 'bg-[#04681F] text-white shadow-md' : 'text-gray-400 hover:text-white'
            }`}
          >
            Join Requests ({members.length})
          </button>
          {adminRole === 'MASTER_ADMIN' && (
            <button
              onClick={() => setActiveTab('USERS')}
              className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'USERS' ? 'bg-[#04681F] text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Team Accounts
            </button>
          )}
          <button
            onClick={() => setIsCategoryModalOpen(true)}
            className="ml-auto px-4 py-2.5 text-xs font-bold uppercase tracking-wider border border-[#AE955A] text-[#AE955A] hover:bg-[#AE955A] hover:text-black rounded-lg transition-all"
          >
            + Add Category
          </button>
        </div>

        {/* JOIN REQUESTS TAB */}
        {activeTab === 'MEMBERS' && (
          <div className="bg-[#04240c] border border-[#0a4017] rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-6 text-white flex items-center">
              <span className="w-2 h-5 bg-[#04681F] mr-3 rounded-full"></span>
              Join Requests
            </h2>

            {members.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-medium">
                No join requests received yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-300">
                  <thead className="bg-[#021807] text-xs uppercase text-gray-400">
                    <tr>
                      <th className="px-4 py-3 rounded-tl-lg">Name</th>
                      <th className="px-4 py-3">Contact Details</th>
                      <th className="px-4 py-3">Joined Date</th>
                      <th className="px-4 py-3 text-center rounded-tr-lg">Contacted?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => (
                      <tr key={member.id} className="border-b border-[#0a4017] hover:bg-[#021807]/50 transition-colors">
                        <td className="px-4 py-4 font-bold text-white">{member.name}</td>
                        <td className="px-4 py-4">
                          <p className="text-[#AE955A] font-mono">{member.phone}</p>
                          <p className="text-xs text-gray-500">{member.email}</p>
                        </td>
                        <td className="px-4 py-4 text-xs font-mono text-gray-400">
                          {new Date(member.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <button
                            onClick={() => handleToggleContacted(member.id, member.contacted)}
                            className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-colors shadow-lg ${
                              member.contacted 
                                ? 'bg-[#04681F] text-white' 
                                : 'bg-red-950/60 text-red-400 border border-red-800'
                            }`}
                          >
                            {member.contacted ? '✔ Yes' : '✖ No'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: POSTS LIST */}
        {activeTab === 'POSTS' && (
          <div className="bg-[#04240c] border border-[#0a4017] rounded-xl p-6 shadow-xl">
            <h2 className="text-lg font-bold uppercase tracking-wide mb-6 text-white flex items-center">
              <span className="w-2 h-5 bg-[#04681F] mr-3 rounded-full"></span>
              Published News & Drafts
            </h2>

            {posts.length === 0 ? (
              <div className="text-center py-12 text-gray-500 font-medium">
                No articles found. Click "+ Write New Article" to publish your first update.
              </div>
            ) : (
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#021807] border border-[#0a4017] p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#04681F] transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded ${
                            post.isPublished ? 'bg-green-950 text-green-400 border border-green-800' : 'bg-yellow-950 text-yellow-400 border border-yellow-800'
                          }`}
                        >
                          {post.isPublished ? 'Live' : 'Draft'}
                        </span>
                        {post.category && (
                          <span className="text-[10px] uppercase tracking-widest text-[#AE955A] font-bold">
                            {post.category.name}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-white mt-1">{post.title}</h3>
                      <p className="text-xs text-gray-500 font-mono">
                        Slug: /{post.slug} | Author: {post.author?.name || 'Media Team'} | {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditClick(post)}
                        className="bg-[#0a4017] hover:bg-[#04681F] text-white text-xs font-bold uppercase px-4 py-2 rounded transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold uppercase px-4 py-2 rounded transition-all border border-red-800/40"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ARTICLE EDITOR FORM */}
        {activeTab === 'CREATE_POST' && (
          <div className="bg-[#04240c] border border-[#0a4017] rounded-xl p-8 shadow-xl max-w-4xl mx-auto">
            <h2 className="text-xl font-bold uppercase tracking-wide mb-6 border-b border-[#0a4017] pb-4">
              {editingPostId ? 'Edit Article' : 'Write New Press Release / Update'}
            </h2>

            <form onSubmit={handleSavePost} className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                  Article Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Capacity Movement Calls for Transparent Primaries in Kaduna"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-white font-bold text-lg focus:border-[#AE955A] outline-none rounded-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                    URL Slug
                  </label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-gray-300 font-mono text-xs focus:border-[#AE955A] outline-none rounded-lg"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                    Category
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-white text-sm focus:border-[#AE955A] outline-none rounded-lg"
                  >
                    <option value="">-- Select Category (Optional) --</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                  Featured Image Cover
                </label>
                <div className="flex flex-col gap-3">
                  {featuredImage && !imageFile && (
                    <div className="text-xs text-green-400">Current Image: Attached</div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setImageFile(e.target.files[0]);
                      }
                    }}
                    className="w-full bg-[#021807] border border-[#0a4017] px-4 py-3 text-white text-xs focus:border-[#AE955A] outline-none rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-bold file:bg-[#04681F] file:text-white hover:file:bg-[#058227] cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2 tracking-widest">
                  Article Body / Content
                </label>
                <textarea
                  required
                  rows={10}
                  placeholder="Write the article or press release details here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-[#021807] border border-[#0a4017] p-4 text-white text-sm focus:border-[#AE955A] outline-none rounded-lg font-sans leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#021807] p-4 border border-[#0a4017] rounded-lg">
                <input
                  type="checkbox"
                  id="publishCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-5 h-5 accent-[#04681F]"
                />
                <label htmlFor="publishCheck" className="text-xs font-bold uppercase tracking-wider text-white">
                  Publish Immediately (Uncheck to save as Draft)
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => { resetPostForm(); setActiveTab('POSTS'); }}
                  className="flex-1 bg-gray-800 text-white font-bold uppercase py-3.5 text-xs rounded-lg hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#04681F] text-white font-bold uppercase py-3.5 text-xs rounded-lg hover:bg-[#058227] shadow-lg"
                >
                  {editingPostId ? 'Save Changes' : 'Publish Post'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* CATEGORY CREATION MODAL */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#04240c] border border-[#0a4017] p-8 rounded-xl w-full max-w-md shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6 uppercase border-b border-[#0a4017] pb-4">
              New Content Category
            </h3>
            <form onSubmit={handleCreateCategory} className="space-y-4">
              <input
                type="text"
                required
                placeholder="Category Name (e.g., Press Release)"
                value={catName}
                onChange={(e) => {
                  setCatName(e.target.value);
                  setCatSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
                }}
                className="w-full bg-[#021807] border border-[#0a4017] text-white px-4 py-3 outline-none focus:border-[#AE955A] rounded-lg text-sm"
              />
              <input
                type="text"
                required
                placeholder="Slug (e.g., press-release)"
                value={catSlug}
                onChange={(e) => setCatSlug(e.target.value)}
                className="w-full bg-[#021807] border border-[#0a4017] text-gray-400 font-mono text-xs px-4 py-3 outline-none focus:border-[#AE955A] rounded-lg"
              />
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="flex-1 bg-gray-800 text-white font-bold uppercase py-3 text-xs rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-[#04681F] text-white font-bold uppercase py-3 text-xs rounded-lg"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}