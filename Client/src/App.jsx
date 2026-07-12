import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext'
import { ChatProvider } from './context/ChatContext'
import { TripProvider } from './context/TripContext'


function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          <TripProvider>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#1a1a24',
                  color: '#fff',
                  border: '1px solid rgba(79, 115, 242, 0.3)',
                  borderRadius: '12px',
                },
                success: {
                  iconTheme: {
                    primary: '#4f73f2',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
            <AppRoutes />
          </TripProvider>
        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App

// import React, { useState, useEffect } from 'react';
// import { 
//   Compass, Send, Cpu, Layers, DollarSign, Calendar, Users, 
//   CheckCircle, TrendingUp, LogOut, MapPin, Download, Share2, 
//   Trash2, Settings, AlertCircle, User, Plus, Grid, ChevronRight, 
//   Info, X, Sparkles, Shield, Activity, RefreshCw, BarChart2,
//   Clock, ArrowRightLeft, Smile, Plane, Bed, Utensils, AlertTriangle, BookOpen
// } from 'lucide-react';

// const BACKEND_BASE_URL = 'http://localhost:5000/api';

// class ApiService {
//   constructor() {
//     this.token = localStorage.getItem('travelmind_token') || null;
//     this.useMockFallback = false;
//   }

//   setToken(token) {
//     this.token = token;
//     if (token) {
//       localStorage.setItem('travelmind_token', token);
//     } else {
//       localStorage.removeItem('travelmind_token');
//     }
//   }

//   getHeaders() {
//     const headers = { 'Content-Type': 'application/json' };
//     if (this.token) {
//       headers['Authorization'] = `Bearer ${this.token}`;
//     }
//     return headers;
//   }

//   async request(endpoint, options = {}) {
//     const url = `${BACKEND_BASE_URL}${endpoint}`;
//     const headers = { ...this.getHeaders(), ...options.headers };
    
//     try {
//       const response = await fetch(url, { ...options, headers });
      
//       if (!response.ok) {
//         const errData = await response.json().catch(() => ({}));
//         throw new Error(errData.message || 'API request failed');
//       }
      
//       this.useMockFallback = false;
//       return await response.json();
//     } catch (err) {
//       console.warn(`[API Connection Warning] Routing via simulated client: ${err.message}`);
//       this.useMockFallback = true;
//       return this.handleFallback(endpoint, options);
//     }
//   }

//   handleFallback(endpoint, options) {
//     const body = options.body ? JSON.parse(options.body) : null;
//     const method = options.method || 'GET';

//     if (!localStorage.getItem('mock_trips')) {
//       localStorage.setItem('mock_trips', JSON.stringify([]));
//     }
//     if (!localStorage.getItem('mock_chats')) {
//       localStorage.setItem('mock_chats', JSON.stringify([]));
//     }

//     const getMockTrips = () => JSON.parse(localStorage.getItem('mock_trips'));
//     const saveMockTrips = (data) => localStorage.setItem('mock_trips', JSON.stringify(data));

//     if (endpoint === '/auth/login' && method === 'POST') {
//       const token = "mock_jwt_token_" + Date.now();
//       this.setToken(token);
//       return {
//         success: true,
//         data: { user: { id: "user_001", name: body.name || "Arjun Sharma", email: body.email }, token },
//         message: "Logged in via Simulated Session"
//       };
//     }

//     if (endpoint === '/auth/register' && method === 'POST') {
//       const token = "mock_jwt_token_" + Date.now();
//       this.setToken(token);
//       return {
//         success: true,
//         data: { user: { id: "user_001", name: body.name, email: body.email }, token },
//         message: "Registered successfully via Simulated Session"
//       };
//     }

//     if (endpoint === '/auth/profile' && method === 'GET') {
//       return {
//         success: true,
//         data: { id: "user_001", name: "Arjun Sharma", email: "arjun@travelmind.ai", createdAt: new Date() },
//         message: "Profile retrieved"
//       };
//     }

//     if (endpoint === '/users/dashboard' && method === 'GET') {
//       const trips = getMockTrips();
//       const totalSpent = trips.reduce((acc, t) => acc + (t.totalCost?.total || 0), 0);
//       return {
//         success: true,
//         data: { totalTrips: trips.length, chatCount: trips.length + 2, totalInvestment: totalSpent || 23660, recentTrips: trips.slice(0, 3) }
//       };
//     }

//     if (endpoint === '/trips' && method === 'GET') {
//       return { success: true, data: getMockTrips() };
//     }

//     if (endpoint === '/trips' && method === 'POST') {
//       const newTrip = { _id: "trip_" + Date.now(), ...body, createdAt: new Date().toISOString() };
//       const current = getMockTrips();
//       current.unshift(newTrip);
//       saveMockTrips(current);
//       return { success: true, data: newTrip, message: "Trip successfully saved to fallback storage!" };
//     }

//     if (endpoint.startsWith('/trips/') && method === 'DELETE') {
//       const id = endpoint.split('/')[2];
//       const current = getMockTrips();
//       const filtered = current.filter(t => t._id !== id);
//       saveMockTrips(filtered);
//       return { success: true, message: "Trip deleted from storage" };
//     }

//     if (endpoint === '/chat' && method === 'POST') {
//       return this.generateSimulatedGeminiPlan(body.message);
//     }

//     throw new Error('Endpoint unrecognized by fallback driver');
//   }

//   generateSimulatedGeminiPlan(prompt) {
//     const cleanPrompt = prompt.toLowerCase().trim();
    
//     // Fuzzy matching for casual chit-chat
//     const greetingRegex = /\b(hi+|hello+|hey+|hola+|namaste+|hii+)\b/i;
//     const frustrationRegex = /\b(fuck|shit|stupid|dumb|useless|worst|bakwas|gussa|yaar|frustrat+|pagal)\b/i;

//     if (greetingRegex.test(cleanPrompt)) {
//       return {
//         success: true,
//         data: {
//           isConversational: true,
//           conversationalMessage: "Hello! I am your TravelMind AI agent. How can I help you plan your next journey today? Let me know where you'd like to go!",
//           reasoningSteps: [
//             "Agent 1 [Intent Classifier]: Detected greeting input.",
//             "Agent 2 [Response Specialist]: Formulated warm welcome message."
//           ],
//           tripPlan: null
//         }
//       };
//     }

//     if (frustrationRegex.test(cleanPrompt)) {
//       return {
//         success: true,
//         data: {
//           isConversational: true,
//           conversationalMessage: "I hear you, and I am truly sorry if something went wrong! Let's solve this together. Tell me what trip you want to plan, and I will draft a beautiful travel itinerary.",
//           reasoningSteps: [
//             "Agent 1 [Intent Classifier]: Detected frustration or emotional venting.",
//             "Agent 2 [Response Specialist]: Dispatched supportive and calming feedback."
//           ],
//           tripPlan: null
//         }
//       };
//     }

//     // Standard Planning Fallback
//     let destination = "Goa";
//     let source = "Varanasi";
//     let budget = 25000;
//     let days = 5;
//     let travelers = 2;

//     if (/singap[ouae]+r/i.test(cleanPrompt) || /s[ngp]+[ou]r/i.test(cleanPrompt)) {
//       destination = "Singapore";
//     } else if (/go+a/i.test(cleanPrompt) || /g[ov]+a/i.test(cleanPrompt)) {
//       destination = "Goa";
//     } else if (/man[ae]li/i.test(cleanPrompt)) {
//       destination = "Manali";
//     } else if (/ker[ae]l[aa]/i.test(cleanPrompt)) {
//       destination = "Kerala";
//     } else if (/par[ei]s/i.test(cleanPrompt)) {
//       destination = "Paris";
//     }

//     const dayMatch = cleanPrompt.match(/(\d+)\s*day/);
//     if (dayMatch) days = parseInt(dayMatch[1], 10);

//     const travMatch = cleanPrompt.match(/(\d+)\s*(traveler|people|person|guest|friend)/);
//     if (travMatch) travelers = parseInt(travMatch[1], 10);

//     const promptNoCommas = cleanPrompt.replace(/,/g, '');
//     const kMatch = promptNoCommas.match(/(\d+)\s*k/);
//     if (kMatch) {
//       budget = parseInt(kMatch[1], 10) * 1000;
//     } else {
//       const budgetMatch = promptNoCommas.match(/(\d{4,7})/);
//       if (budgetMatch) budget = parseInt(budgetMatch[1], 10);
//     }

//     const isInternational = destination === "Singapore" || destination === "Paris";
//     const transport = isInternational ? Math.round(28000 * travelers) : Math.round(3500 * travelers);
//     const hotel = Math.round((isInternational ? 4500 : 1500) * days * (travelers > 1 ? 1.5 : 1));
//     const food = Math.round((isInternational ? 2000 : 800) * days * travelers);
//     const activities = Math.round((isInternational ? 1500 : 600) * days * travelers);
//     const total = transport + hotel + food + activities;

//     const mockItinerary = Array.from({ length: days }, (_, i) => {
//       const day = i + 1;
//       return {
//         day,
//         title: day === 1 ? `Welcome to ${destination}` : day === days ? `Departing ${destination}` : `Exploring Scenic ${destination} Highlights`,
//         activities: [
//           `Morning visit to central attractions in ${destination}.`,
//           `Lunch break trying authentic local cuisines.`,
//           `Evening scenic tour with dynamic photo sessions.`
//         ],
//         meals: { breakfast: "Included", lunch: "Local delicacies", dinner: "Gourmet coastal dine-out" },
//         accommodation: `Standard Cozy Boutique Homestay near central ${destination}`,
//         travelDetails: "Shared autos, local rental scooters or private cycle rickshaws.",
//         tips: "Use digital payment apps but carry small change."
//       };
//     });

//     return {
//       success: true,
//       data: {
//         isConversational: false,
//         reasoningSteps: [
//           "Agent 1 [Requirement Analyzer]: Extracted destination coordinates.",
//           "Agent 2 [Gemini Retriever]: Pulling regional parameters.",
//           "Agent 3 [Budget Planner]: Formatting financial layouts.",
//           "Agent 4 [Hotel Selector]: Sourcing matching hotels.",
//           "Agent 5 [Itinerary Planner]: Arranging day-wise sights.",
//           "Agent 6 [Report Generator]: Finishing dynamic overview plans."
//         ],
//         tripPlan: {
//           source, destination, budget, days, travelers,
//           lodgingDetails: { category: budget > 40000 ? "moderate" : "budget", nightlyCostEstimate: isInternational ? 4500 : 1500, name: `${destination} Eco-Resort & Hostels`, description: "Highly social environment with robust internet.", justification: "Leaves maximum budget pool for food & transit." },
//           itinerary: mockItinerary,
//           costBreakdown: { transport, hotel, food, activities, total },
//           recommendations: ["Travel during early weekdays.", "Rent vehicles locally in advance."],
//           travelTips: "Save up to 35% by renting transport early.",
//           emergencyContacts: "National Support: 112"
//         }
//       }
//     };
//   }
// }

// const api = new ApiService();

// export default function App() {
//   const [currentPage, setCurrentPage] = useState('home');
//   const [authModal, setAuthModal] = useState(null);
//   const [user, setUser] = useState(null);
//   const [isAuthLoading, setIsAuthLoading] = useState(true);

//   const [trips, setTrips] = useState([]);
//   const [chats, setChats] = useState([
//     {
//       role: 'assistant',
//       text: "Hello! I am your TravelMind AI Agent. Give me your requirements (e.g., 'I want a 5-day trip to Goa from Varanasi under ₹25,000 for 2 people') and let my team of autonomous agents organize everything for you."
//     }
//   ]);
//   const [activePlan, setActivePlan] = useState(null);
//   const [reasoningSteps, setReasoningSteps] = useState([]);
//   const [isPlanning, setIsPlanning] = useState(false);
//   const [currentStepIndex, setCurrentStepIndex] = useState(-1);
//   const [dashboardStats, setDashboardStats] = useState({ totalTrips: 0, chatCount: 0, totalInvestment: 0, recentTrips: [] });
//   const [selectedTrip, setSelectedTrip] = useState(null);

//   const [comparison, setComparison] = useState({ destA: "Goa", destB: "Manali", budget: 30000, days: 5 });
//   const [comparisonResult, setComparisonResult] = useState(null);
//   const [isComparing, setIsComparing] = useState(false);

//   const [toast, setToast] = useState(null);
//   const showToast = (message, type = 'success') => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), 4000);
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       if (api.token) {
//         try {
//           const res = await api.request('/auth/profile');
//           if (res.success) {
//             setUser(res.data);
//             fetchDashboardAndTrips();
//           }
//         } catch (err) {
//           api.setToken(null);
//         }
//       }
//       setIsAuthLoading(false);
//     };
//     checkAuth();
//   }, []);

//   const fetchDashboardAndTrips = async () => {
//     try {
//       const [tripsRes, statsRes] = await Promise.all([
//         api.request('/trips'),
//         api.request('/users/dashboard')
//       ]);
//       if (tripsRes.success) setTrips(tripsRes.data);
//       if (statsRes.success) setDashboardStats(statsRes.data);
//     } catch (err) {
//       console.error("Error syncing dashboard records:", err);
//     }
//   };

//   const handleLogin = async (email, password) => {
//     try {
//       const res = await api.request('/auth/login', {
//         method: 'POST',
//         body: JSON.stringify({ email, password })
//       });
//       if (res.success) {
//         setUser(res.data.user);
//         api.setToken(res.data.token);
//         setAuthModal(null);
//         showToast(`Welcome back, ${res.data.user.name}!`);
//         fetchDashboardAndTrips();
//         setCurrentPage('dashboard');
//       }
//     } catch (err) {
//       showToast(err.message || 'Login failed', 'error');
//     }
//   };

//   const handleRegister = async (name, email, password) => {
//     try {
//       const res = await api.request('/auth/register', {
//         method: 'POST',
//         body: JSON.stringify({ name, email, password })
//       });
//       if (res.success) {
//         setUser(res.data.user);
//         api.setToken(res.data.token);
//         setAuthModal(null);
//         showToast('Account registered! Welcome to TravelMind AI.');
//         fetchDashboardAndTrips();
//         setCurrentPage('planner');
//       }
//     } catch (err) {
//       showToast(err.message || 'Registration failed', 'error');
//     }
//   };

//   const handleLogout = () => {
//     api.setToken(null);
//     setUser(null);
//     setCurrentPage('home');
//     showToast('Logged out successfully.');
//   };

//   const handleSendPrompt = async (promptText) => {
//     if (!promptText.trim()) return;

//     if (!user) {
//       setAuthModal('login');
//       showToast("Please authenticate to access the AI Agent's intelligence framework.", "info");
//       return;
//     }

//     const newUserMessage = { role: 'user', text: promptText };
//     setChats(prev => [...prev, newUserMessage]);
//     setIsPlanning(true);
//     setReasoningSteps([]);
//     setCurrentStepIndex(-1);
//     setActivePlan(null);

//     try {
//       const response = await api.request('/chat', {
//         method: 'POST',
//         body: JSON.stringify({ message: promptText })
//       });

//       if (response.success) {
//         const payload = response.data;
//         const steps = payload.reasoningSteps || [];
//         const isConversational = payload.isConversational || false;

//         let step = 0;
//         const interval = setInterval(() => {
//           if (step < steps.length) {
//             setReasoningSteps(prev => [...prev, steps[step]]);
//             setCurrentStepIndex(step);
//             step++;
//           } else {
//             clearInterval(interval);
//             setIsPlanning(false);

//             if (isConversational) {
//               setChats(prev => [...prev, {
//                 role: 'assistant',
//                 text: payload.conversationalMessage,
//                 plan: null
//               }]);
//               showToast("AI Response generated.");
//             } else {
//               const plan = payload.tripPlan;
//               setActivePlan(plan);
//               setChats(prev => [...prev, {
//                 role: 'assistant',
//                 text: `I have customized a complete ${plan.days}-day itinerary to ${plan.destination} from ${plan.source}. Below is your comprehensive cost matrix and day-by-day sightseeing checklist. You can save this trip to your dashboard immediately.`,
//                 plan: plan
//               }]);
//               showToast(`Autonomous Planning for ${plan.destination} complete!`);
//             }
//           }
//         }, 1100);
//       }
//     } catch (err) {
//       setIsPlanning(false);
//       showToast(err.message || "Failed to parse travel query", "error");
//     }
//   };

//   const handleSaveTrip = async (planToSave) => {
//     try {
//       const res = await api.request('/trips', {
//         method: 'POST',
//         body: JSON.stringify(planToSave)
//       });
//       if (res.success) {
//         showToast(`Trip to ${planToSave.destination} saved successfully to your dashboard!`);
//         fetchDashboardAndTrips();
//         setCurrentPage('saved-trips');
//       }
//     } catch (err) {
//       showToast(err.message || 'Could not save trip to dashboard', 'error');
//     }
//   };

//   const handleDeleteTrip = async (id, name) => {
//     try {
//       const res = await api.request(`/trips/${id}`, { method: 'DELETE' });
//       if (res.success) {
//         showToast(`Successfully deleted ${name} from your catalog.`);
//         fetchDashboardAndTrips();
//         if (selectedTrip && selectedTrip._id === id) {
//           setSelectedTrip(null);
//         }
//       }
//     } catch (err) {
//       showToast(err.message || 'Failed to remove trip', 'error');
//     }
//   };

//   const handleCompare = async () => {
//     setIsComparing(true);
//     setComparisonResult(null);

//     setTimeout(() => {
//       const resA = api.generateSimulatedGeminiPlan(`Plan a ${comparison.days} day ${comparison.destA} trip with ${comparison.budget} budget`);
//       const resB = api.generateSimulatedGeminiPlan(`Plan a ${comparison.days} day ${comparison.destB} trip with ${comparison.budget} budget`);
      
//       const planA = resA.data.tripPlan;
//       const planB = resB.data.tripPlan;

//       setComparisonResult({
//         destinationA: planA,
//         destinationB: planB,
//         bestChoice: planA.costBreakdown.total < planB.costBreakdown.total ? planA.destination : planB.destination,
//         justification: `Based on your budget cap of ₹${comparison.budget}, ${planA.destination} leaves a larger reserve margin of ₹${comparison.budget - planA.costBreakdown.total} for safety and exploration, while lodging options score higher in user satisfaction reviews.`
//       });
//       setIsComparing(false);
//       showToast("Comparison analysis generated successfully.");
//     }, 2000);
//   };

//   const triggerPdfDownload = (tripId, destName) => {
//     showToast(`Compiling detailed PDF for ${destName}...`);
//     window.open(`${BACKEND_BASE_URL}/trips/${tripId}/pdf?token=${api.token || ''}`, '_blank');
//   };

//   return (
//     <div className="min-h-screen text-slate-100 bg-[#090b11] font-sans relative overflow-x-hidden selection:bg-indigo-500/30 selection:text-indigo-200">
      
//       {/* BACKGROUND GLOWS / AURORA EFFECT */}
//       <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-950/20 via-violet-950/10 to-transparent pointer-events-none z-0" />
//       <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none z-0 animate-pulse" />
//       <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[160px] pointer-events-none z-0" />
//       <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

//       {/* GLOBAL TOAST BANNER */}
//       {toast && (
//         <div className={`fixed bottom-6 right-6 z-50 px-5 py-4 rounded-xl border flex items-center gap-3 shadow-2xl transition-all duration-300 animate-slide-in backdrop-blur-md ${
//           toast.type === 'error' ? 'bg-red-950/80 border-red-500/30 text-red-200' :
//           toast.type === 'info' ? 'bg-indigo-950/80 border-indigo-500/30 text-indigo-200' :
//           'bg-emerald-950/80 border-emerald-500/30 text-emerald-200'
//         }`}>
//           <div className="w-2 h-2 rounded-full animate-ping bg-current" />
//           <p className="text-sm font-medium">{toast.message}</p>
//         </div>
//       )}

//       {/* MODE INDICATOR */}
//       {api.useMockFallback && (
//         <div className="bg-amber-500/10 border-b border-amber-500/20 py-2 px-4 text-xs text-center text-amber-400 flex items-center justify-center gap-2 relative z-50 backdrop-blur-md">
//           <Info className="w-3.5 h-3.5" />
//           <span>Local Sandbox Sandbox Active: System operating with client-side Gemini fallback. No manual setup required.</span>
//         </div>
//       )}

//       {/* HEADER NAVIGATION */}
//       <header className="sticky top-0 z-40 border-b border-white/5 bg-slate-950/70 backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          
//           {/* Logo Brand */}
//           <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
//             <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20 flex items-center justify-center">
//               <Compass className="w-5 h-5 text-white animate-spin-slow" />
//             </div>
//             <div>
//               <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
//                 TravelMind
//               </span>
//               <span className="ml-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
//                 Agent OS
//               </span>
//             </div>
//           </div>

//           {/* Navigation Links */}
//           <nav className="hidden md:flex items-center gap-1.5">
//             <button 
//               onClick={() => setCurrentPage('home')}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'home' ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
//             >
//               Overview
//             </button>
//             <button 
//               onClick={() => user ? setCurrentPage('dashboard') : setAuthModal('login')}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'dashboard' ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
//             >
//               Dashboard
//             </button>
//             <button 
//               onClick={() => setCurrentPage('planner')}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${currentPage === 'planner' ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
//             >
//               <Cpu className="w-3.5 h-3.5 text-indigo-400" />
//               AI Agent Console
//             </button>
//             <button 
//               onClick={() => user ? setCurrentPage('saved-trips') : setAuthModal('login')}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 'saved-trips' ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
//             >
//               Saved Trips
//             </button>
//             <button 
//               onClick={() => setCurrentPage('compare')}
//               className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${currentPage === 'compare' ? 'bg-white/5 text-white' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
//             >
//               <ArrowRightLeft className="w-3.5 h-3.5 text-purple-400" />
//               Compare
//             </button>
//           </nav>

//           {/* User Actions */}
//           <div className="flex items-center gap-3">
//             {user ? (
//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => setCurrentPage('profile')}
//                   className="p-1.5 md:pr-3 rounded-lg flex items-center gap-2 hover:bg-white/5 text-slate-300 transition-colors"
//                 >
//                   <div className="w-7 h-7 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-xs uppercase">
//                     {user.name[0]}
//                   </div>
//                   <span className="hidden md:inline text-xs font-semibold">{user.name}</span>
//                 </button>
//                 <button 
//                   onClick={handleLogout}
//                   title="Sign Out"
//                   className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
//                 >
//                   <LogOut className="w-4 h-4" />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-2">
//                 <button 
//                   onClick={() => setAuthModal('login')}
//                   className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors"
//                 >
//                   Sign In
//                 </button>
//                 <button 
//                   onClick={() => setAuthModal('register')}
//                   className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-95 active:scale-95 transition-all"
//                 >
//                   Launch App
//                 </button>
//               </div>
//             )}
//           </div>

//         </div>
//       </header>

//       {/* ============================================================================
//           MAIN BODY LAYOUT SWITCH
//          ============================================================================ */}
//       <main className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        
//         {/* PAGE 1: HERO / LANDING PAGE */}
//         {currentPage === 'home' && (
//           <div className="space-y-24 py-10">
            
//             {/* HERO SECTION */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
//               <div className="space-y-8">
//                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-400 animate-pulse">
//                   <Sparkles className="w-3.5 h-3.5" />
//                   <span>Interactive Multi-Agent Travel Planner</span>
//                 </div>
                
//                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-none">
//                   Plan travel via <br />
//                   <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
//                     Autonomous AI
//                   </span> <br />
//                   Agentic Reasoning
//                 </h1>

//                 <p className="text-base sm:text-lg text-slate-400 max-w-lg leading-relaxed">
//                   TravelMind orchestrates isolated digital agents powered by Google Gemini to analyze budgets, research destination attractions, locate stays, and compile itineraries in seconds.
//                 </p>

//                 <div className="flex flex-wrap gap-4">
//                   <button 
//                     onClick={() => {
//                       if (user) {
//                         setCurrentPage('planner');
//                       } else {
//                         setAuthModal('register');
//                         showToast("Create a fast hackathon account to try the planner!", "info");
//                       }
//                     }}
//                     className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:opacity-95 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
//                   >
//                     Start Agent Planning
//                   </button>
//                   <button 
//                     onClick={() => {
//                       setCurrentPage('compare');
//                     }}
//                     className="px-6 py-4 rounded-xl bg-slate-900 border border-white/5 hover:bg-slate-800 text-white font-semibold text-sm transition-all"
//                   >
//                     Compare Trips
//                   </button>
//                 </div>

//                 {/* Metrics Badges */}
//                 <div className="pt-6 border-t border-white/5 grid grid-cols-3 gap-6">
//                   <div>
//                     <h4 className="text-2xl font-bold text-white">5+</h4>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">Active Agents</p>
//                   </div>
//                   <div>
//                     <h4 className="text-2xl font-bold text-white">&lt; 3s</h4>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">Response latency</p>
//                   </div>
//                   <div>
//                     <h4 className="text-2xl font-bold text-white">100%</h4>
//                     <p className="text-xs text-slate-500 uppercase font-semibold">Gemini Grounded</p>
//                   </div>
//                 </div>
//               </div>

//               {/* STUNNING FUTURISTIC GLOBE CONTAINER */}
//               <div className="relative flex items-center justify-center">
//                 <div className="absolute inset-0 bg-indigo-500/5 rounded-full blur-[80px] pointer-events-none" />
                
//                 {/* SVG Globe Animation Visualizer */}
//                 <div className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] border border-white/10 rounded-full relative p-6 bg-slate-950/20 backdrop-blur-md flex items-center justify-center">
                  
//                   {/* Virtual Rotating Grid Ring */}
//                   <div className="absolute inset-0 border border-indigo-500/10 rounded-full animate-spin-slow pointer-events-none" />
//                   <div className="absolute inset-4 border border-dashed border-purple-500/20 rounded-full animate-spin-reverse pointer-events-none" />
                  
//                   {/* Internal Compass Star */}
//                   <Compass className="w-24 h-24 text-indigo-400/20 animate-pulse" />

//                   {/* Flight Node Cards */}
//                   <div className="absolute top-10 left-10 p-3 bg-slate-900/90 border border-white/10 rounded-xl shadow-2xl animate-bounce flex items-center gap-2">
//                     <MapPin className="w-3.5 h-3.5 text-cyan-400" />
//                     <span className="text-[10px] font-bold">Varanasi (VNS)</span>
//                   </div>

//                   <div className="absolute bottom-16 right-4 p-3 bg-slate-900/90 border border-white/10 rounded-xl shadow-2xl flex items-center gap-2">
//                     <Plane className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
//                     <span className="text-[10px] font-bold">Goa (GOI) ₹23,600</span>
//                   </div>

//                   {/* Center Node Hub */}
//                   <div className="absolute p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-500/30 flex flex-col items-center justify-center text-center shadow-2xl">
//                     <Cpu className="w-8 h-8 text-indigo-400 animate-spin-slow mb-2" />
//                     <span className="text-[9px] font-bold tracking-wider text-indigo-300 uppercase">Orchestrator Active</span>
//                     <span className="text-[11px] text-white font-semibold">Gemini 1.5 Flash</span>
//                   </div>

//                 </div>
//               </div>
//             </div>

//             {/* SECTION 2: THE MULTI-AGENT WORKFLOW VISUALIZER */}
//             <div className="space-y-12">
//               <div className="text-center space-y-4">
//                 <span className="text-xs uppercase tracking-wider font-bold text-indigo-400">Collaborative Micro-Services</span>
//                 <h2 className="text-3xl md:text-4xl font-extrabold text-white">How Our Multi-Agent Framework Works</h2>
//                 <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
//                   Unlike traditional LLM wrappers, TravelMind divides planning among six autonomous specialists that peer-review each other's outputs.
//                 </p>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {[
//                   {
//                     id: "01",
//                     role: "Requirement Analyzer",
//                     task: "Extracts source location, destination, day limit thresholds, and headcount arrays.",
//                     color: "border-indigo-500/20 bg-indigo-500/5 hover:border-indigo-500/40 text-indigo-400"
//                   },
//                   {
//                     id: "02",
//                     role: "Gemini Retriever",
//                     task: "Queries vector space, local tourism records, safety files, and destination highlights.",
//                     color: "border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40 text-cyan-400"
//                   },
//                   {
//                     id: "03",
//                     role: "Budget Planner",
//                     task: "Calculates cost allocations for transport, hotel rooms, dining, and activities.",
//                     color: "border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 text-emerald-400"
//                   },
//                   {
//                     id: "04",
//                     role: "Hotel Selector",
//                     task: "Sifts available options based on budget criteria and nightly allowances.",
//                     color: "border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40 text-amber-400"
//                   },
//                   {
//                     id: "05",
//                     role: "Itinerary Planner",
//                     task: "Drafts detailed day-by-day maps with logical, localized activity sequences.",
//                     color: "border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40 text-purple-400"
//                   },
//                   {
//                     id: "06",
//                     role: "Report Generator",
//                     task: "Gathers emergency hotlines, medical guides, and local travel advisories.",
//                     color: "border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40 text-pink-400"
//                   }
//                 ].map((agent) => (
//                   <div key={agent.id} className={`p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between group cursor-default ${agent.color}`}>
//                     <div className="space-y-4">
//                       <div className="flex items-center justify-between">
//                         <span className="text-2xl font-black opacity-35 group-hover:opacity-60 transition-opacity">{agent.id}</span>
//                         <Cpu className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
//                       </div>
//                       <h3 className="text-lg font-bold text-white">{agent.role}</h3>
//                       <p className="text-slate-400 text-xs leading-relaxed">{agent.task}</p>
//                     </div>
//                     <div className="pt-4 flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase opacity-80">
//                       <span>Verified Status</span>
//                       <CheckCircle className="w-3 h-3" />
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* CALL TO ACTION */}
//             <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-tr from-slate-900 via-slate-950 to-indigo-950/40 border border-white/5 relative overflow-hidden">
//               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[80px]" />
//               <div className="relative z-10 max-w-2xl space-y-6">
//                 <h3 className="text-3xl font-extrabold text-white">Experience AI-Native Travel Planning</h3>
//                 <p className="text-slate-400 text-sm md:text-base leading-relaxed">
//                   Join thousands of smart travelers planning trips with Gemini agent intelligence. Skip hours of coordination and manual budget allocation.
//                 </p>
//                 <button 
//                   onClick={() => {
//                     if (user) {
//                       setCurrentPage('planner');
//                     } else {
//                       setAuthModal('register');
//                     }
//                   }}
//                   className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-950 font-bold text-sm shadow-xl transition-all"
//                 >
//                   Create Your Free Account
//                 </button>
//               </div>
//             </div>

//           </div>
//         )}

//         {/* PAGE 2: AUTHENTICATED DASHBOARD */}
//         {currentPage === 'dashboard' && (
//           <div className="space-y-8 animate-fade-in">
            
//             {/* Header Title */}
//             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
//               <div>
//                 <h2 className="text-3xl font-bold text-white">Welcome, {user?.name || "Traveler"}</h2>
//                 <p className="text-slate-400 text-sm">Real-time statistics for your synced travel workspace.</p>
//               </div>
//               <button 
//                 onClick={() => setCurrentPage('planner')}
//                 className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg transition-all"
//               >
//                 <Plus className="w-4 h-4" />
//                 <span>Create New Plan</span>
//               </button>
//             </div>

//             {/* Analytical Metrics Panel */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
//               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
//                 <div className="flex items-center justify-between text-slate-400">
//                   <span className="text-xs font-semibold uppercase tracking-wider">Saved Trips</span>
//                   <Compass className="w-5 h-5 text-indigo-400" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white">{dashboardStats.totalTrips || trips.length}</h3>
//                 <p className="text-[10px] text-indigo-300 font-semibold">Active Itinerary Files</p>
//               </div>

//               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
//                 <div className="flex items-center justify-between text-slate-400">
//                   <span className="text-xs font-semibold uppercase tracking-wider">Total Outlay</span>
//                   <DollarSign className="w-5 h-5 text-emerald-400" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white">₹{dashboardStats.totalInvestment || 0}</h3>
//                 <p className="text-[10px] text-emerald-300 font-semibold">Consolidated Budget</p>
//               </div>

//               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
//                 <div className="flex items-center justify-between text-slate-400">
//                   <span className="text-xs font-semibold uppercase tracking-wider">Agent Conversations</span>
//                   <Cpu className="w-5 h-5 text-purple-400" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white">{dashboardStats.chatCount || 2}</h3>
//                 <p className="text-[10px] text-purple-300 font-semibold">Planning Queries Ran</p>
//               </div>

//               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2">
//                 <div className="flex items-center justify-between text-slate-400">
//                   <span className="text-xs font-semibold uppercase tracking-wider">Platform Security</span>
//                   <Shield className="w-5 h-5 text-cyan-400" />
//                 </div>
//                 <h3 className="text-3xl font-bold text-white">Verified</h3>
//                 <p className="text-[10px] text-cyan-300 font-semibold">JWT Session Secure</p>
//               </div>

//             </div>

//             {/* RECHARTS STYLE COMPONENT REPRESENTING BUDGET ALLOCATIONS */}
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
//               <div className="lg:col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h4 className="font-bold text-white">Budget Analytics & Visual Metrics</h4>
//                     <p className="text-xs text-slate-400">Comparing estimated expenses relative to savings margin</p>
//                   </div>
//                   <BarChart2 className="w-5 h-5 text-indigo-400" />
//                 </div>

//                 {/* Simulated SVG Bar Charts */}
//                 {trips.length > 0 ? (
//                   <div className="space-y-4">
//                     {trips.map((t, idx) => {
//                       const totalCostVal = t.totalCost?.total || 15000;
//                       const ratio = Math.min((totalCostVal / t.budget) * 100, 100);
//                       return (
//                         <div key={idx} className="space-y-1.5">
//                           <div className="flex justify-between text-xs font-semibold text-slate-300">
//                             <span>{t.destination} ({t.days} Days)</span>
//                             <span>₹{totalCostVal} / ₹{t.budget} Budget Limit</span>
//                           </div>
//                           <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
//                             <div 
//                               className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400"
//                               style={{ width: `${ratio}%` }}
//                             />
//                           </div>
//                         </div>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <div className="h-40 flex flex-col items-center justify-center text-slate-500 space-y-2">
//                     <TrendingUp className="w-8 h-8 opacity-40" />
//                     <p className="text-xs">No active travel metrics. Create a trip inside the agent console.</p>
//                   </div>
//                 )}
//               </div>

//               {/* SAVED RECENT TRIPS */}
//               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
//                 <h4 className="font-bold text-white">Recent Planning Activity</h4>
                
//                 <div className="space-y-3">
//                   {trips.slice(0, 3).map((t, i) => (
//                     <div 
//                       key={i} 
//                       onClick={() => { setSelectedTrip(t); }}
//                       className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 cursor-pointer transition-all flex items-center justify-between"
//                     >
//                       <div className="space-y-1">
//                         <p className="text-xs font-bold text-white">{t.destination}</p>
//                         <p className="text-[10px] text-slate-400">From {t.source} • {t.days} days</p>
//                       </div>
//                       <span className="text-[11px] font-bold text-indigo-300">₹{t.totalCost?.total}</span>
//                     </div>
//                   ))}

//                   {trips.length === 0 && (
//                     <p className="text-xs text-slate-400 text-center py-6">Your itineraries will be listed here.</p>
//                   )}
//                 </div>
//               </div>

//             </div>

//           </div>
//         )}

//         {/* PAGE 3: AI PLANNER PAGE (OS CONSOLE) */}
//         {currentPage === 'planner' && (
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
//             {/* LEFT COLUMN: CHAT INTERFACE & INPUT */}
//             <div className="lg:col-span-7 space-y-6">
              
//               <div className="p-6 rounded-2xl bg-slate-950/70 border border-white/10 backdrop-blur-md h-[450px] flex flex-col justify-between">
                
//                 {/* Chat Message Stream */}
//                 <div className="overflow-y-auto space-y-4 pr-2 flex-grow scrollbar-thin scrollbar-thumb-white/10">
//                   {chats.map((chat, idx) => (
//                     <div 
//                       key={idx} 
//                       className={`flex gap-3 max-w-[85%] ${chat.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
//                     >
//                       {/* Avatar */}
//                       <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
//                         chat.role === 'user' ? 'bg-indigo-500/20 text-indigo-300' : 'bg-gradient-to-tr from-purple-500 to-pink-500 text-white'
//                       }`}>
//                         {chat.role === 'user' ? <User className="w-4 h-4" /> : <Cpu className="w-4 h-4 animate-pulse" />}
//                       </div>

//                       {/* Text Bubble */}
//                       <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-4 ${
//                         chat.role === 'user' 
//                           ? 'bg-indigo-500/15 border-indigo-500/30 text-white' 
//                           : 'bg-white/5 border-white/5 text-slate-200'
//                       }`}>
//                         <p>{chat.text}</p>

//                         {/* Embeded Interactive Planning Card inside bubble response */}
//                         {chat.plan && (
//                           <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-white/5 space-y-3">
//                             <div className="flex justify-between items-center">
//                               <span className="font-bold text-sm text-indigo-300">{chat.plan.destination} Plan</span>
//                               <span className="px-2 py-0.5 rounded text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold uppercase">
//                                 Verified Under Budget
//                               </span>
//                             </div>
//                             <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400">
//                               <span>Start Point: {chat.plan.source}</span>
//                               <span>Duration: {chat.plan.days} Days</span>
//                               <span>Travelers: {chat.plan.travelers} Guest(s)</span>
//                               <span>Estimated Cost: ₹{chat.plan.costBreakdown?.total}</span>
//                             </div>
//                             <div className="pt-2 flex gap-2">
//                               <button 
//                                 onClick={() => handleSaveTrip(chat.plan)}
//                                 className="px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-[10px] font-bold text-white transition-all flex items-center gap-1"
//                               >
//                                 <Plus className="w-3 h-3" /> Save to Workspace
//                               </button>
//                             </div>
//                           </div>
//                         )}

//                       </div>
//                     </div>
//                   ))}

//                   {/* Thinking Loader State */}
//                   {isPlanning && (
//                     <div className="flex gap-3 max-w-[80%]">
//                       <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
//                         <Cpu className="w-4 h-4 animate-spin" />
//                       </div>
//                       <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-xs text-slate-400 flex items-center gap-2">
//                         <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" />
//                         <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-100" />
//                         <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce delay-200" />
//                         <span className="ml-2 font-medium">Orchestrating agents...</span>
//                       </div>
//                     </div>
//                   )}

//                 </div>

//                 {/* Suggestion Chips */}
//                 <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2">
//                   <button 
//                     onClick={() => handleSendPrompt("I want a 5 day Goa trip from Varanasi under ₹25000")}
//                     className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-slate-300 font-semibold"
//                   >
//                     "Goa trip from Varanasi under ₹25000"
//                   </button>
//                   <button 
//                     onClick={() => handleSendPrompt("Plan 3 days Manali from Delhi under ₹15000")}
//                     className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-slate-300 font-semibold"
//                   >
//                     "3 days Manali under ₹15000"
//                   </button>
//                   <button 
//                     onClick={() => handleSendPrompt("Create a 7 day Kerala trip under ₹80000")}
//                     className="px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] text-slate-300 font-semibold"
//                   >
//                     "Kerala trip under ₹80000"
//                   </button>
//                 </div>

//               </div>

//               {/* CHAT CONSOLE INPUT FORM */}
//               <form 
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   const promptVal = e.target.prompt.value;
//                   if (promptVal.trim()) {
//                     handleSendPrompt(promptVal);
//                     e.target.reset();
//                   }
//                 }}
//                 className="relative"
//               >
//                 <input 
//                   type="text" 
//                   name="prompt"
//                   autoComplete="off"
//                   placeholder={user ? "Instruct the TravelMind autonomous agents (e.g., Goa from Varanasi under ₹25000)" : "Please login to write prompts..."}
//                   disabled={!user || isPlanning}
//                   className="w-full pl-6 pr-14 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs sm:text-sm text-white placeholder-slate-500 transition-all outline-none"
//                 />
//                 <button 
//                   type="submit"
//                   disabled={!user || isPlanning}
//                   className="absolute right-3.5 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white transition-all"
//                 >
//                   <Send className="w-4 h-4" />
//                 </button>
//               </form>

//             </div>

//             {/* RIGHT COLUMN: LIVE REASONING CONSOLE PANEL */}
//             <div className="lg:col-span-5 space-y-6">
              
//               <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
                
//                 <div className="flex items-center justify-between border-b border-white/5 pb-4">
//                   <div className="flex items-center gap-2">
//                     <Activity className="w-5 h-5 text-indigo-400" />
//                     <h3 className="font-bold text-white">Live Agent Reasoning Pipeline</h3>
//                   </div>
//                   <span className="px-2 py-0.5 rounded text-[9px] uppercase font-bold bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
//                     Live Telemetry
//                   </span>
//                 </div>

//                 {/* Animated Steps Flow */}
//                 <div className="space-y-4">
//                   {[
//                     "Agent 1 [Requirement Analyzer]: Analyzing prompt tokens to extract target destination and budget bounds.",
//                     "Agent 2 [Gemini Retriever]: Scanning Google Gemini context for optimal sightseeing, dining, and safe transit routes.",
//                     "Agent 3 [Budget Planner]: Distributing costs dynamically across transport, hotels, and activities.",
//                     "Agent 4 [Hotel Selector]: Sourcing stays matching current spending capacity.",
//                     "Agent 5 [Itinerary Planner]: Generating detailed customized daily timetables.",
//                     "Agent 6 [Report Generator]: Bundling safety tips, contacts, and emergency information."
//                   ].map((step, idx) => {
//                     const isCompleted = idx <= currentStepIndex;
//                     const isActive = idx === currentStepIndex + 1 && isPlanning;

//                     return (
//                       <div 
//                         key={idx}
//                         className={`p-3 rounded-xl border text-xs flex items-start gap-3 transition-all ${
//                           isCompleted ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-200' :
//                           isActive ? 'bg-purple-500/10 border-purple-500/30 text-purple-200 animate-pulse' :
//                           'bg-white/5 border-white/5 text-slate-500 opacity-50'
//                         }`}
//                       >
//                         <div className="shrink-0 mt-0.5">
//                           {isCompleted ? (
//                             <CheckCircle className="w-4 h-4 text-emerald-400" />
//                           ) : isActive ? (
//                             <RefreshCw className="w-4 h-4 text-purple-400 animate-spin" />
//                           ) : (
//                             <Clock className="w-4 h-4" />
//                           )}
//                         </div>
//                         <p className="font-medium leading-relaxed">{step}</p>
//                       </div>
//                     );
//                   })}
//                 </div>

//                 {!isPlanning && reasoningSteps.length === 0 && (
//                   <div className="py-12 flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
//                     <Cpu className="w-10 h-10 opacity-30" />
//                     <p className="text-xs">Agents are currently idle. Write a travel instruction to trigger planning telemetry.</p>
//                   </div>
//                 )}

//               </div>

//             </div>

//           </div>
//         )}

//         {/* PAGE 4: SAVED TRIPS GALLERY */}
//         {currentPage === 'saved-trips' && (
//           <div className="space-y-8 animate-fade-in">
            
//             <div className="border-b border-white/5 pb-6">
//               <h2 className="text-3xl font-bold text-white">Your Saved Trips Workspace</h2>
//               <p className="text-slate-400 text-sm">Review, delete, and download PDF catalogs for your saved travel itineraries.</p>
//             </div>

//             {trips.length > 0 ? (
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {trips.map((trip) => (
//                   <div key={trip._id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-500/20 transition-all backdrop-blur-md flex flex-col justify-between">
                    
//                     <div className="space-y-4">
                      
//                       <div className="flex justify-between items-start">
//                         <div>
//                           <h3 className="font-bold text-lg text-white">{trip.destination}</h3>
//                           <p className="text-xs text-slate-400">From {trip.source}</p>
//                         </div>
//                         <span className="px-2 py-1 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
//                           {trip.days} Days
//                         </span>
//                       </div>

//                       <div className="pt-4 border-t border-white/5 grid grid-cols-2 gap-3 text-xs text-slate-300">
//                         <div className="space-y-0.5">
//                           <span className="text-[10px] text-slate-500 block uppercase">Travelers</span>
//                           <span className="font-semibold flex items-center gap-1">
//                             <Users className="w-3.5 h-3.5 text-indigo-400" />
//                             {trip.travelers} Guest(s)
//                           </span>
//                         </div>
//                         <div className="space-y-0.5">
//                           <span className="text-[10px] text-slate-500 block uppercase">Total Cost</span>
//                           <span className="font-semibold text-emerald-400 font-bold">
//                             ₹{trip.totalCost?.total || 0}
//                           </span>
//                         </div>
//                       </div>

//                     </div>

//                     <div className="pt-6 mt-6 border-t border-white/5 flex gap-2">
//                       <button 
//                         onClick={() => setSelectedTrip(trip)}
//                         className="flex-1 px-3 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white transition-all text-center"
//                       >
//                         Open Details
//                       </button>
//                       <button 
//                         onClick={() => triggerPdfDownload(trip._id, trip.destination)}
//                         className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-slate-300 transition-all"
//                         title="Download PDF"
//                       >
//                         <Download className="w-4 h-4" />
//                       </button>
//                       <button 
//                         onClick={() => handleDeleteTrip(trip._id, trip.destination)}
//                         className="p-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 transition-all"
//                         title="Delete Plan"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                       </button>
//                     </div>

//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="py-24 text-center space-y-4">
//                 <Compass className="w-16 h-16 text-slate-600 mx-auto opacity-30 animate-spin-slow" />
//                 <h3 className="text-xl font-bold text-white">Your Saved Workspace is empty</h3>
//                 <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
//                   Head over to the AI Planner page and prompt the agent to formulate details to save an itinerary.
//                 </p>
//                 <button 
//                   onClick={() => setCurrentPage('planner')}
//                   className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-xs font-semibold text-white transition-all"
//                 >
//                   Open AI Planner
//                 </button>
//               </div>
//             )}

//           </div>
//         )}

//         {/* PAGE 5: DUAL DESTINATION COMPARE PAGE */}
//         {currentPage === 'compare' && (
//           <div className="space-y-8 animate-fade-in">
            
//             <div className="border-b border-white/5 pb-6">
//               <h2 className="text-3xl font-bold text-white">Dynamic AI Destination Comparison</h2>
//               <p className="text-slate-400 text-sm">Let our agents cross-reference and contrast dynamic details for two destinations side-by-side.</p>
//             </div>

//             {/* Input Config Bar */}
//             <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
//               <div>
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-2">Destination A</label>
//                 <input 
//                   type="text"
//                   value={comparison.destA}
//                   onChange={(e) => setComparison(prev => ({ ...prev, destA: e.target.value }))}
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-2">Destination B</label>
//                 <input 
//                   type="text"
//                   value={comparison.destB}
//                   onChange={(e) => setComparison(prev => ({ ...prev, destB: e.target.value }))}
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>
//               <div>
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold mb-2">Budget Target (₹)</label>
//                 <input 
//                   type="number"
//                   value={comparison.budget}
//                   onChange={(e) => setComparison(prev => ({ ...prev, budget: parseInt(e.target.value, 10) }))}
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>
//               <button 
//                 onClick={handleCompare}
//                 disabled={isComparing}
//                 className="w-full py-3.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-500/20"
//               >
//                 {isComparing ? "Analyzing Context..." : "Trigger Comparison Plan"}
//               </button>
//             </div>

//             {/* COMPARISON RESULTS RENDER */}
//             {comparisonResult ? (
//               <div className="space-y-8 animate-fade-in">
                
//                 {/* Visual Recommendation Panel */}
//                 <div className="p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4">
//                   <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-300 h-fit shrink-0">
//                     <Sparkles className="w-6 h-6 animate-pulse" />
//                   </div>
//                   <div className="space-y-2">
//                     <h4 className="font-bold text-white text-base">TravelMind Recommendation: Choose {comparisonResult.bestChoice}!</h4>
//                     <p className="text-slate-300 text-xs leading-relaxed">{comparisonResult.justification}</p>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  
//                   {/* Option A Card */}
//                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
//                     <div className="flex justify-between items-center border-b border-white/5 pb-4">
//                       <h3 className="text-2xl font-bold text-white">{comparisonResult.destinationA.destination}</h3>
//                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-400">Option A</span>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4 text-xs">
//                         <div>
//                           <span className="text-[10px] text-slate-500 uppercase block">Calculated Cost</span>
//                           <span className="font-bold text-white">₹{comparisonResult.destinationA.costBreakdown.total}</span>
//                         </div>
//                         <div>
//                           <span className="text-[10px] text-slate-500 uppercase block">Margin Remaining</span>
//                           <span className="font-bold text-emerald-400">₹{comparison.budget - comparisonResult.destinationA.costBreakdown.total}</span>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <span className="text-[10px] text-slate-500 uppercase block font-semibold">Recommended Stay</span>
//                         <p className="text-xs text-slate-300 font-bold">{comparisonResult.destinationA.lodgingDetails.name}</p>
//                         <p className="text-[11px] text-slate-400 leading-relaxed">{comparisonResult.destinationA.lodgingDetails.description}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <span className="text-[10px] text-slate-500 uppercase block font-semibold">Transit Options</span>
//                         <p className="text-xs text-slate-300">{comparisonResult.destinationA.travelTips}</p>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Option B Card */}
//                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-6">
//                     <div className="flex justify-between items-center border-b border-white/5 pb-4">
//                       <h3 className="text-2xl font-bold text-white">{comparisonResult.destinationB.destination}</h3>
//                       <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-400">Option B</span>
//                     </div>

//                     <div className="space-y-4">
//                       <div className="grid grid-cols-2 gap-4 text-xs">
//                         <div>
//                           <span className="text-[10px] text-slate-500 uppercase block">Calculated Cost</span>
//                           <span className="font-bold text-white">₹{comparisonResult.destinationB.costBreakdown.total}</span>
//                         </div>
//                         <div>
//                           <span className="text-[10px] text-slate-500 uppercase block">Margin Remaining</span>
//                           <span className="font-bold text-emerald-400">₹{comparison.budget - comparisonResult.destinationB.costBreakdown.total}</span>
//                         </div>
//                       </div>

//                       <div className="space-y-2">
//                         <span className="text-[10px] text-slate-500 uppercase block font-semibold">Recommended Stay</span>
//                         <p className="text-xs text-slate-300 font-bold">{comparisonResult.destinationB.lodgingDetails.name}</p>
//                         <p className="text-[11px] text-slate-400 leading-relaxed">{comparisonResult.destinationB.lodgingDetails.description}</p>
//                       </div>

//                       <div className="space-y-2">
//                         <span className="text-[10px] text-slate-500 uppercase block font-semibold">Transit Options</span>
//                         <p className="text-xs text-slate-300">{comparisonResult.destinationB.travelTips}</p>
//                       </div>
//                     </div>
//                   </div>

//                 </div>

//               </div>
//             ) : (
//               <div className="py-24 text-center text-slate-500 space-y-2">
//                 <ArrowRightLeft className="w-12 h-12 opacity-35 mx-auto animate-pulse" />
//                 <p className="text-xs">No analysis computed yet. Click the comparison trigger button above.</p>
//               </div>
//             )}

//           </div>
//         )}

//         {/* PAGE 6: USER PROFILE */}
//         {currentPage === 'profile' && (
//           <div className="max-w-xl mx-auto p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-8 animate-fade-in">
            
//             <div className="text-center space-y-2 border-b border-white/5 pb-6">
//               <div className="w-16 h-16 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-300 font-extrabold text-2xl uppercase">
//                 {user?.name[0]}
//               </div>
//               <h3 className="text-xl font-bold text-white">{user?.name}</h3>
//               <p className="text-xs text-slate-400">{user?.email}</p>
//             </div>

//             <form 
//               onSubmit={async (e) => {
//                 e.preventDefault();
//                 const name = e.target.name.value;
//                 const email = e.target.email.value;
//                 try {
//                   const res = await api.request('/auth/profile', {
//                     method: 'PUT',
//                     body: JSON.stringify({ name, email })
//                   });
//                   if (res.success) {
//                     setUser(res.data);
//                     showToast('Account details successfully updated!');
//                   }
//                 } catch (err) {
//                   showToast(err.message || 'Failed to update profile settings', 'error');
//                 }
//               }}
//               className="space-y-4"
//             >
//               <div className="space-y-1.5">
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold">Username/Name</label>
//                 <input 
//                   type="text"
//                   name="name"
//                   defaultValue={user?.name || ''}
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold">Registered Email</label>
//                 <input 
//                   type="email"
//                   name="email"
//                   defaultValue={user?.email || ''}
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               <button 
//                 type="submit"
//                 className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-xs font-bold text-white transition-all shadow-lg"
//               >
//                 Save Profile Changes
//               </button>
//             </form>

//           </div>
//         )}

//       </main>

//       {/* FOOTER */}
//       <footer className="border-t border-white/5 mt-24 py-8 bg-slate-950/40 relative z-10 text-center text-slate-500 space-y-3">
//         <p className="text-xs font-semibold text-slate-400">&copy; 2026 TravelMind AI Agent Platform. Created for Microsoft AI Hackathon.</p>
//         <p className="text-[10px] max-w-lg mx-auto leading-relaxed">
//           Powered dynamically using standalone, peer-to-peer Google Gemini 1.5 Flash Micro-agents coordinating live within sandboxed Node environments.
//         </p>
//       </footer>

//       {/* ============================================================================
//           MODAL COMPONENT 1: GLOBAL DETAILED TRIP PREVIEW 
//          ============================================================================ */}
//       {selectedTrip && (
//         <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
//           <div className="bg-[#0f121d] border border-white/10 rounded-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col">
            
//             {/* Header */}
//             <div className="p-6 border-b border-white/5 flex items-center justify-between shrink-0">
//               <div>
//                 <span className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-widest block">Consolidated Itinerary</span>
//                 <h3 className="text-xl font-extrabold text-white">{selectedTrip.source} to {selectedTrip.destination}</h3>
//               </div>
//               <div className="flex items-center gap-3">
//                 <button 
//                   onClick={() => triggerPdfDownload(selectedTrip._id, selectedTrip.destination)}
//                   className="px-3.5 py-1.5 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 text-indigo-300 text-xs font-semibold transition-all flex items-center gap-1.5"
//                 >
//                   <Download className="w-3.5 h-3.5" />
//                   <span>Download PDF</span>
//                 </button>
//                 <button 
//                   onClick={() => setSelectedTrip(null)}
//                   className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all"
//                 >
//                   <X className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             {/* Content Stream Scrollable */}
//             <div className="p-6 overflow-y-auto flex-grow space-y-8 scrollbar-thin scrollbar-thumb-white/10">
              
//               {/* Stats Bar */}
//               <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center space-y-1">
//                   <Calendar className="w-4 h-4 text-indigo-400 mx-auto" />
//                   <span className="text-[10px] text-slate-500 block uppercase font-bold">Duration</span>
//                   <span className="text-xs font-bold text-white">{selectedTrip.days} Days</span>
//                 </div>
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center space-y-1">
//                   <Users className="w-4 h-4 text-cyan-400 mx-auto" />
//                   <span className="text-[10px] text-slate-500 block uppercase font-bold">Travelers</span>
//                   <span className="text-xs font-bold text-white">{selectedTrip.travelers} Guest(s)</span>
//                 </div>
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center space-y-1">
//                   <DollarSign className="w-4 h-4 text-emerald-400 mx-auto" />
//                   <span className="text-[10px] text-slate-500 block uppercase font-bold">Limit Budget</span>
//                   <span className="text-xs font-bold text-white">₹{selectedTrip.budget}</span>
//                 </div>
//                 <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center space-y-1">
//                   <TrendingUp className="w-4 h-4 text-purple-400 mx-auto" />
//                   <span className="text-[10px] text-slate-500 block uppercase font-bold">Calculated Cost</span>
//                   <span className="text-xs font-bold text-emerald-400">₹{selectedTrip.totalCost?.total}</span>
//                 </div>
//               </div>

//               {/* Cost Breakdown */}
//               <div className="p-6 rounded-xl bg-white/5 border border-white/5 space-y-4">
//                 <h4 className="font-bold text-white text-sm flex items-center gap-2">
//                   <DollarSign className="w-4 h-4 text-indigo-400" />
//                   <span>Cost Distribution Breakdown</span>
//                 </h4>
//                 <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
//                   <div className="p-3 bg-slate-900 rounded-lg">
//                     <span className="text-slate-500 block mb-1">Transit / Flight</span>
//                     <span className="font-bold">₹{selectedTrip.totalCost?.transport}</span>
//                   </div>
//                   <div className="p-3 bg-slate-900 rounded-lg">
//                     <span className="text-slate-500 block mb-1">Accommodations</span>
//                     <span className="font-bold">₹{selectedTrip.totalCost?.hotel}</span>
//                   </div>
//                   <div className="p-3 bg-slate-900 rounded-lg">
//                     <span className="text-slate-500 block mb-1">Food & Dining</span>
//                     <span className="font-bold">₹{selectedTrip.totalCost?.food}</span>
//                   </div>
//                   <div className="p-3 bg-slate-900 rounded-lg">
//                     <span className="text-slate-500 block mb-1">Activities & Tours</span>
//                     <span className="font-bold">₹{selectedTrip.totalCost?.activities}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Day-Wise Timeline */}
//               <div className="space-y-4">
//                 <h4 className="font-bold text-white text-sm flex items-center gap-2">
//                   <Grid className="w-4 h-4 text-indigo-400" />
//                   <span>Day-by-Day Sightseeing Itinerary</span>
//                 </h4>
                
//                 <div className="space-y-4 border-l-2 border-indigo-500/20 pl-6 ml-3">
//                   {selectedTrip.itinerary?.map((day, idx) => (
//                     <div key={idx} className="relative space-y-2">
                      
//                       {/* Timeline Dot Node */}
//                       <div className="absolute top-1.5 -left-[31px] w-4 h-4 rounded-full bg-slate-950 border-2 border-indigo-500 flex items-center justify-center">
//                         <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
//                       </div>

//                       <h5 className="font-bold text-indigo-300 text-xs sm:text-sm">
//                         Day {day.day}: {day.title}
//                       </h5>

//                       <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-300 space-y-3">
//                         <div>
//                           <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-1">Activities Included:</span>
//                           <ul className="list-disc pl-4 space-y-1">
//                             {day.activities?.map((act, i) => <li key={i}>{act}</li>)}
//                           </ul>
//                         </div>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-white/5 text-[11px] text-slate-400">
//                           <div>
//                             <span className="text-[10px] text-slate-500 block font-semibold">Stay:</span>
//                             <span>{day.accommodation || 'Standard Lodging Stay'}</span>
//                           </div>
//                           <div>
//                             <span className="text-[10px] text-slate-500 block font-semibold">Transit Tip:</span>
//                             <span>{day.tips || 'Explore local transport'}</span>
//                           </div>
//                         </div>
//                       </div>

//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Safety Advisories / Emergency contacts */}
//               {selectedTrip.emergencyContacts && (
//                 <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-start gap-3">
//                   <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
//                   <div className="space-y-1 text-xs">
//                     <span className="font-bold text-red-200">Local Security Contacts & Advisory Hotlines</span>
//                     <p className="text-slate-400">{selectedTrip.emergencyContacts}</p>
//                   </div>
//                 </div>
//               )}

//             </div>

//           </div>
//         </div>
//       )}

//       {/* ============================================================================
//           MODAL COMPONENT 2: SECURE AUTHENTICATION (LOGIN / REGISTER)
//          ============================================================================ */}
//       {authModal && (
//         <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
//           <div className="bg-[#0f121d] border border-white/10 rounded-2xl max-w-sm w-full p-6 space-y-6 relative">
            
//             <button 
//               onClick={() => setAuthModal(null)}
//               className="absolute right-4 top-4 p-1 rounded bg-white/5 text-slate-400 hover:text-white transition-all"
//             >
//               <X className="w-4 h-4" />
//             </button>

//             <div className="text-center space-y-1.5">
//               <h3 className="text-xl font-bold text-white">
//                 {authModal === 'login' ? "Access TravelMind" : "Create Sandbox Account"}
//               </h3>
//               <p className="text-xs text-slate-400">
//                 {authModal === 'login' ? "Sign in to activate dynamic agent planning." : "Instant credential registration for judges and testing."}
//               </p>
//             </div>

//             <form 
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 const email = e.target.email.value;
//                 const password = e.target.password.value;
//                 if (authModal === 'login') {
//                   handleLogin(email, password);
//                 } else {
//                   const name = e.target.name.value;
//                   handleRegister(name, email, password);
//                 }
//               }}
//               className="space-y-4"
//             >
//               {authModal === 'register' && (
//                 <div className="space-y-1.5">
//                   <label className="block text-[10px] text-slate-500 uppercase font-semibold">Username / Full Name</label>
//                   <input 
//                     type="text"
//                     name="name"
//                     required
//                     placeholder="Arjun Sharma"
//                     className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                   />
//                 </div>
//               )}

//               <div className="space-y-1.5">
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold">Email Address</label>
//                 <input 
//                   type="email"
//                   name="email"
//                   required
//                   placeholder="arjun@travelmind.ai"
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               <div className="space-y-1.5">
//                 <label className="block text-[10px] text-slate-500 uppercase font-semibold">Password</label>
//                 <input 
//                   type="password"
//                   name="password"
//                   required
//                   placeholder="••••••••"
//                   className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-white/5 text-xs text-white outline-none focus:border-indigo-500 transition-all"
//                 />
//               </div>

//               <button 
//                 type="submit"
//                 className="w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-xs font-bold text-white transition-all shadow-lg"
//               >
//                 {authModal === 'login' ? "Authenticate Token" : "Register Credentials"}
//               </button>
//             </form>

//             <div className="text-center text-xs">
//               {authModal === 'login' ? (
//                 <p className="text-slate-400">
//                   Don't have an account?{' '}
//                   <button onClick={() => setAuthModal('register')} className="text-indigo-400 font-semibold hover:underline">
//                     Register here
//                   </button>
//                 </p>
//               ) : (
//                 <p className="text-slate-400">
//                   Already registered?{' '}
//                   <button onClick={() => setAuthModal('login')} className="text-indigo-400 font-semibold hover:underline">
//                     Sign in here
//                   </button>
//                 </p>
//               )}
//             </div>

//           </div>
//         </div>
//       )}

//     </div>
//   );
// }
