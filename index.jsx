import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, CheckSquare, StickyNote, Clock, CreditCard, Plus, Trash2, Save, X, 
  Play, Pause, RotateCcw, Sun, Moon, Menu, ArrowRightLeft, Code, Database, 
  Bitcoin, Key, Globe, QrCode, Timer, FileText, RefreshCw, Copy, Check, 
  Lock, Link as LinkIcon, Download, Music, Youtube, Cloud, Disc, Shuffle,
  Maximize2, Minimize2, Video, Volume2, VolumeX, SkipForward, SkipBack,
  Bot, Mic, MicOff, BarChart, ArrowRight, ArrowLeft, ExternalLink, Columns,
  AlertCircle
} from 'lucide-react';

// --- Helper Components ---

const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
    {children}
  </div>
);

const Button = ({ onClick, children, variant = "primary", className = "", icon: Icon, disabled = false }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white disabled:bg-blue-400 disabled:cursor-not-allowed",
    secondary: "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-orange-500 hover:bg-orange-600 text-white"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handleCopy} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors text-gray-500 dark:text-gray-400">
      {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
    </button>
  );
};

// --- Features ---

// 1. DASHBOARD UPDATED
const Dashboard = ({ setActiveTab, tasks, weather }) => {
  const [greeting, setGreeting] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now);
      const hour = now.getHours();
      if (hour < 12) setGreeting('Chào buổi sáng');
      else if (hour < 18) setGreeting('Chào buổi chiều');
      else setGreeting('Chào buổi tối');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const pendingTasks = tasks.filter(t => t.status !== 'done').length;

  // Custom Button Component for Dashboard
  const DashBtn = ({ id, icon: Icon, title, desc, colorClass }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`relative overflow-hidden group p-4 rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-lg transition-all text-left flex flex-col justify-between h-32`}
    >
      <div className={`absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all ${colorClass}`}>
        <Icon size={80} />
      </div>
      <div className={`p-2 rounded-lg w-fit mb-2 ${colorClass} bg-opacity-10 dark:bg-opacity-20`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-')} />
      </div>
      <div>
        <h3 className="font-bold text-lg leading-tight">{title}</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
      </div>
    </button>
  );

  return (
    <div className="space-y-6 animate-fade-in pb-24">
      {/* Header Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 md:col-span-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-none relative overflow-hidden flex flex-col justify-center min-h-[180px]">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-1">{greeting}, Sếp!</h1>
            <p className="opacity-90 text-lg mb-4">WorkOS 5.0 đã sẵn sàng.</p>
            <div className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-4xl font-mono font-bold">
              {time.toLocaleTimeString('vi-VN')}
            </div>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-10 translate-y-10">
            <Globe size={240} />
          </div>
        </Card>

        {/* Weather Widget (Mini) */}
        <Card className="bg-gradient-to-br from-sky-400 to-blue-500 text-white border-none flex flex-col justify-between relative overflow-hidden">
           <div className="relative z-10">
             <div className="flex justify-between items-start">
               <Cloud size={40} />
               <span className="text-sm font-medium opacity-90">Hà Nội</span>
             </div>
             <div className="mt-4">
               <div className="text-5xl font-bold">{weather?.current?.temperature_2m || '--'}°C</div>
               <div className="text-sm mt-1 opacity-90">Độ ẩm: {weather?.current?.relative_humidity_2m || '--'}%</div>
             </div>
           </div>
           <Sun className="absolute -top-4 -right-4 text-yellow-300 opacity-30" size={100} />
        </Card>
      </div>

      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
         <Columns size={20} className="text-blue-500"/> Quản lý & Tiện ích
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashBtn id="kanban" icon={Columns} title="Kanban Board" desc={`${pendingTasks} việc đang chờ`} colorClass="text-blue-600" />
        <DashBtn id="aichat" icon={Bot} title="AI Assistant" desc="Trợ lý ảo thông minh" colorClass="text-purple-600" />
        <DashBtn id="notes" icon={StickyNote} title="Ghi chú" desc="Ý tưởng & Text" colorClass="text-yellow-500" />
        <DashBtn id="finance" icon={BarChart} title="Chi tiêu" desc="Biểu đồ tài chính" colorClass="text-green-600" />
      </div>

      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-2">
         <Play size={20} className="text-rose-500"/> Giải trí & Media
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashBtn id="youtube" icon={Youtube} title="Mini YouTube" desc="Xem video PiP" colorClass="text-red-600" />
        <DashBtn id="music" icon={Music} title="Music Player" desc="Nghe nhạc" colorClass="text-pink-500" />
        <DashBtn id="recorder" icon={Mic} title="Ghi âm" desc="Voice Recorder" colorClass="text-teal-500" />
        <DashBtn id="wheel" icon={Shuffle} title="Vòng quay" desc="Quyết định may mắn" colorClass="text-orange-500" />
      </div>

      <h3 className="font-bold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2 mt-2">
         <Code size={20} className="text-cyan-500"/> Công cụ & Crypto
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DashBtn id="crypto" icon={Bitcoin} title="Crypto Market" desc="Giá Coin Real-time" colorClass="text-orange-500" />
        <DashBtn id="worldclock" icon={Globe} title="Giờ thế giới" desc="Đa múi giờ" colorClass="text-cyan-600" />
        <DashBtn id="password" icon={Key} title="Mật khẩu" desc="Tạo an toàn" colorClass="text-red-500" />
        <DashBtn id="devtools" icon={Code} title="DevTools" desc="JSON / Base64" colorClass="text-emerald-600" />
      </div>
    </div>
  );
};

// 2. YOUTUBE MINI PLAYER (FIXED & IMPROVED FALLBACK)
const YouTubePlayer = () => {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [isMini, setIsMini] = useState(false);

  const loadVideo = () => {
    // Regex hỗ trợ nhiều định dạng link Youtube
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    if (match && match[7].length === 11) {
      setVideoId(match[7]);
    } else {
      alert('Link YouTube không hợp lệ!');
    }
  };

  return (
    <div className={`transition-all duration-300 ${isMini ? 'fixed bottom-4 right-4 z-50 w-80 shadow-2xl' : 'max-w-3xl mx-auto'}`}>
      <Card className={`${isMini ? 'p-2 bg-gray-900 border-gray-700' : ''}`}>
        {!isMini && (
          <>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Youtube className="text-red-600" /> YouTube Mini Player
            </h2>
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={url} 
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Dán link YouTube (Video/Shorts)..." 
                className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 outline-none"
              />
              <Button onClick={loadVideo} className="bg-red-600 hover:bg-red-700">Phát</Button>
            </div>
          </>
        )}

        {videoId ? (
          <div className="relative group flex flex-col gap-3">
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden relative shadow-lg">
              {/* Sử dụng youtube-nocookie để hạn chế lỗi chặn nhúng */}
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {/* Controls Overlay */}
            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={() => setIsMini(!isMini)}
                 className="p-1 bg-black/50 hover:bg-black/70 text-white rounded"
                 title={isMini ? "Mở rộng" : "Thu nhỏ"}
               >
                 {isMini ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
               </button>
               {isMini && (
                 <button 
                   onClick={() => {setVideoId(''); setIsMini(false);}}
                   className="p-1 bg-red-600 hover:bg-red-700 text-white rounded"
                 >
                   <X size={16} />
                 </button>
               )}
            </div>

            {/* Fallback Message UI */}
            {!isMini && (
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-100 dark:border-yellow-800 rounded-lg flex flex-col sm:flex-row gap-3 items-center justify-between text-yellow-800 dark:text-yellow-200 animate-fade-in">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle size={20} />
                  <span>
                    Video bị đen hoặc báo lỗi <b>150/153</b>? (Do bản quyền chặn nhúng)
                  </span>
                </div>
                <a 
                  href={`https://www.youtube.com/watch?v=${videoId}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-800 dark:hover:bg-yellow-700 rounded-lg font-bold text-sm whitespace-nowrap transition-colors flex items-center gap-2"
                >
                  Mở trên YouTube <ExternalLink size={14}/>
                </a>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 text-gray-400">
            <Video size={48} className="mx-auto mb-2 opacity-50" />
            <p>Chưa có video nào được chọn</p>
          </div>
        )}
      </Card>
      {isMini && <div className="text-xs text-white mt-1 text-center bg-black/50 rounded px-2 py-1 truncate">Đang phát trong nền...</div>}
    </div>
  );
};

// 3. KANBAN BOARD
const KanbanBoard = ({ tasks, setTasks }) => {
  const [newTask, setNewTask] = useState('');
  
  const addTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, status: 'todo' }]);
    setNewTask('');
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const Column = ({ status, title, color, icon: Icon }) => {
    const colTasks = tasks.filter(t => t.status === status);
    return (
      <div className="flex-1 min-w-[300px] bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 flex flex-col h-[500px]">
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${color}`}>
          <Icon size={20} /> {title} <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">{colTasks.length}</span>
        </h3>
        <div className="flex-1 overflow-y-auto space-y-3">
          {colTasks.map(task => (
             <div key={task.id} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 group">
                <p className="mb-3 text-sm font-medium">{task.text}</p>
                <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                   <div className="flex gap-1">
                      {status !== 'todo' && <button onClick={() => moveTask(task.id, status === 'done' ? 'doing' : 'todo')} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"><ArrowLeft size={16}/></button>}
                      {status !== 'done' && <button onClick={() => moveTask(task.id, status === 'todo' ? 'doing' : 'done')} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"><ArrowRight size={16}/></button>}
                   </div>
                   <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                </div>
             </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
       <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold flex gap-2 items-center"><Columns className="text-blue-600"/> Kanban Board</h2>
          <form onSubmit={addTask} className="flex gap-2">
            <input value={newTask} onChange={e=>setNewTask(e.target.value)} placeholder="Việc mới..." className="p-2 rounded border bg-white dark:bg-gray-800 w-64 outline-none"/>
            <Button type="submit" icon={Plus}>Thêm</Button>
          </form>
       </div>
       <div className="flex gap-4 overflow-x-auto pb-4 h-full">
         <Column status="todo" title="Cần làm" color="text-gray-500" icon={CheckSquare} />
         <Column status="doing" title="Đang làm" color="text-blue-500" icon={Clock} />
         <Column status="done" title="Hoàn thành" color="text-green-500" icon={Check} />
       </div>
    </div>
  );
};

// 4. CRYPTO MARKET (UPGRADED)
const CryptoMarket = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchMarket = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,binancecoin,solana,cardano,ripple,dogecoin,polkadot&vs_currencies=usd,vnd&include_24hr_change=true');
      const data = await res.json();
      // Transform object to array
      const arr = Object.keys(data).map(key => ({
        id: key,
        name: key.charAt(0).toUpperCase() + key.slice(1),
        price_usd: data[key].usd,
        price_vnd: data[key].vnd,
        change_24h: data[key].usd_24h_change
      }));
      setCoins(arr);
    } catch (err) {
      console.error("Crypto API Limit hit");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMarket(); }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2"><Bitcoin className="text-orange-500"/> Crypto Market</h2>
          <Button onClick={fetchMarket} variant="outline" icon={RefreshCw} className={loading ? 'animate-spin' : ''}>Làm mới</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 text-sm">
                <th className="py-3 px-4">Tên Coin</th>
                <th className="py-3 px-4">Giá (USD)</th>
                <th className="py-3 px-4">Giá (VND)</th>
                <th className="py-3 px-4">Thay đổi (24h)</th>
              </tr>
            </thead>
            <tbody>
              {coins.map(coin => (
                <tr key={coin.id} className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="py-3 px-4 font-bold capitalize flex items-center gap-2">
                     <img src={`https://assets.coingecko.com/coins/images/1/small/${coin.id === 'binancecoin' ? 'binance_coin' : coin.id}.png?1547033579`} 
                          onError={(e) => e.target.style.display = 'none'} 
                          alt="" className="w-6 h-6 rounded-full"/>
                     {coin.name}
                  </td>
                  <td className="py-3 px-4 font-mono">${coin.price_usd.toLocaleString()}</td>
                  <td className="py-3 px-4 font-mono text-gray-600 dark:text-gray-400">₫{coin.price_vnd.toLocaleString()}</td>
                  <td className={`py-3 px-4 font-bold ${coin.change_24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {coin.change_24h.toFixed(2)}%
                  </td>
                </tr>
              ))}
              {coins.length === 0 && !loading && <tr><td colSpan="4" className="text-center py-4 text-gray-500">Không có dữ liệu. Vui lòng làm mới.</td></tr>}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// 5. AI ASSISTANT (MOCK)
const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Xin chào! Tôi là WorkAI. Tôi có thể giúp gì cho bạn hôm nay?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); };
  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulated AI Logic
    setTimeout(() => {
      let response = "Tôi chưa hiểu ý bạn lắm. Hãy thử hỏi về công việc, code hoặc thời gian.";
      const lower = userMsg.toLowerCase();
      if (lower.includes('xin chào') || lower.includes('hi')) response = "Chào bạn! Chúc bạn một ngày làm việc năng suất.";
      else if (lower.includes('giờ') || lower.includes('thời gian')) response = `Bây giờ là ${new Date().toLocaleTimeString('vi-VN')}.`;
      else if (lower.includes('joke') || lower.includes('cười')) response = "Tại sao lập trình viên không thích thiên nhiên? Vì nó có quá nhiều bugs!";
      else if (lower.includes('todo') || lower.includes('việc')) response = "Bạn có thể vào tab Kanban Board để quản lý công việc hiệu quả hơn nhé.";
      else if (lower.includes('mật khẩu')) response = "Hãy sử dụng công cụ tạo mật khẩu của tôi để đảm bảo an toàn!";

      setMessages(prev => [...prev, { role: 'ai', text: response }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto h-[600px] flex flex-col">
       <Card className="flex-1 flex flex-col p-0 overflow-hidden">
          <div className="p-4 bg-gray-50 dark:bg-gray-700/30 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
             <Bot className="text-purple-500" />
             <span className="font-bold">WorkAI Assistant</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                   <div className={`max-w-[80%] p-3 rounded-2xl ${
                      m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-none' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-bl-none'
                   }`}>
                      {m.text}
                   </div>
                </div>
             ))}
             {isTyping && (
               <div className="flex justify-start">
                 <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-none text-gray-500 text-sm italic animate-pulse">
                   Đang suy nghĩ...
                 </div>
               </div>
             )}
             <div ref={chatEndRef} />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
             <input 
                className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border outline-none"
                placeholder="Nhập tin nhắn..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
             />
             <Button onClick={handleSend} className="rounded-xl">Gửi</Button>
          </div>
       </Card>
    </div>
  );
};

// 6. EXPENSE ANALYTICS (CHART)
const FinanceApp = ({ expenses, setExpenses }) => {
  const [desc, setDesc] = useState(''); const [amt, setAmt] = useState('');
  const add = (e) => { e.preventDefault(); if (!desc) return; setExpenses([...expenses, { id: Date.now(), desc, amount: parseFloat(amt) }]); setDesc(''); setAmt(''); };
  const total = expenses.reduce((a, b) => a + b.amount, 0);

  // Simple Chart Mock
  const maxVal = Math.max(...expenses.map(e => e.amount), 1) || 1;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-2">
           <h2 className="text-2xl font-bold mb-6 flex gap-2"><CreditCard className="text-green-500"/> Tài chính</h2>
           <form onSubmit={add} className="flex gap-2 mb-6"><input value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Chi tiêu..." className="flex-1 p-3 rounded border bg-gray-50 dark:bg-gray-900" /><input type="number" value={amt} onChange={e=>setAmt(e.target.value)} placeholder="Số tiền..." className="w-32 p-3 rounded border bg-gray-50 dark:bg-gray-900" /><Button type="submit">Lưu</Button></form>
           <div className="space-y-2 max-h-64 overflow-auto">{expenses.map(e => (<div key={e.id} className="flex justify-between p-3 border rounded"><span>{e.desc}</span><div className="flex gap-4"><span className="font-bold text-red-500">-{e.amount.toLocaleString()}</span><button onClick={()=>setExpenses(expenses.filter(x=>x.id!==e.id))}><Trash2 className="text-red-500" size={16}/></button></div></div>))}</div>
        </Card>
        <div className="space-y-6">
          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
             <h3 className="text-green-800 dark:text-green-300 font-bold">Tổng chi</h3>
             <div className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">{total.toLocaleString()}đ</div>
          </Card>
          <Card>
             <h3 className="font-bold mb-4 flex gap-2"><BarChart size={18}/> Biểu đồ</h3>
             <div className="flex items-end gap-1 h-32 pt-2">
                {expenses.slice(-5).map((e, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group relative">
                     <div 
                       className="w-full bg-blue-400 rounded-t hover:bg-blue-500 transition-all" 
                       style={{ height: `${(e.amount / maxVal) * 100}%` }}
                     ></div>
                     {/* Tooltip */}
                     <div className="absolute -top-8 bg-black text-white text-xs p-1 rounded opacity-0 group-hover:opacity-100">{e.amount/1000}k</div>
                  </div>
                ))}
                {expenses.length === 0 && <div className="text-xs text-gray-400 w-full text-center">Chưa có dữ liệu</div>}
             </div>
             <div className="text-center text-xs text-gray-400 mt-2">5 giao dịch gần nhất</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// 7. VOICE RECORDER
const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordings(prev => [{ id: Date.now(), url, date: new Date().toLocaleString() }, ...prev]);
        chunksRef.current = [];
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Không thể truy cập microphone!");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  return (
    <div className="max-w-xl mx-auto">
      <Card className="text-center">
        <h2 className="text-2xl font-bold mb-6 flex justify-center gap-2"><Mic className="text-teal-500"/> Ghi âm giọng nói</h2>
        <div className="mb-8">
           <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-red-100 animate-pulse' : 'bg-gray-100 dark:bg-gray-700'}`}>
              <Mic size={40} className={isRecording ? 'text-red-500' : 'text-gray-400'} />
           </div>
           <p className="mt-4 font-mono text-lg">{isRecording ? 'Đang ghi âm...' : 'Nhấn để bắt đầu'}</p>
        </div>
        
        <div className="flex justify-center gap-4 mb-8">
           {!isRecording ? (
             <Button onClick={startRecording} className="bg-teal-600 hover:bg-teal-700 w-32 justify-center">Bắt đầu</Button>
           ) : (
             <Button onClick={stopRecording} variant="danger" className="w-32 justify-center">Dừng lại</Button>
           )}
        </div>

        <div className="text-left border-t pt-4">
           <h3 className="font-bold mb-2 text-sm text-gray-500">Bản ghi gần đây</h3>
           <div className="space-y-2">
             {recordings.map(rec => (
               <div key={rec.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="text-sm">{rec.date}</div>
                  <audio src={rec.url} controls className="h-8 w-40" />
               </div>
             ))}
             {recordings.length === 0 && <p className="text-sm text-gray-400 text-center">Chưa có bản ghi nào.</p>}
           </div>
        </div>
      </Card>
    </div>
  );
};

// ... [MusicPlayer, LuckyWheel, WorldClock, PasswordGenerator, QRGenerator, Stopwatch, MarkdownViewer, VaultApp, DevToolsApp, NotesApp, Pomodoro kept] ...

// [Re-inserting components to ensure file completeness]
const MusicPlayer = ({ songs, setSongs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0); const [isPlaying, setIsPlaying] = useState(false); const audioRef = useRef(null); const [newSong, setNewSong] = useState({ title: '', url: '' });
  useEffect(() => { if (songs.length === 0) setSongs([{ id: 1, title: 'Lo-fi Chill Day', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3' }]); }, []);
  useEffect(() => { if (isPlaying) audioRef.current.play(); else audioRef.current.pause(); }, [isPlaying, currentSongIndex]);
  const togglePlay = () => setIsPlaying(!isPlaying); const nextSong = () => { setCurrentSongIndex((prev) => (prev + 1) % songs.length); setIsPlaying(true); }; const prevSong = () => { setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length); setIsPlaying(true); }; const addSong = () => { if (newSong.title && newSong.url) { setSongs([...songs, { id: Date.now(), ...newSong }]); setNewSong({ title: '', url: '' }); } }; const deleteSong = (id) => { setSongs(songs.filter(s => s.id !== id)); if (currentSongIndex >= songs.length - 1) setCurrentSongIndex(0); };
  return (<div className="max-w-3xl mx-auto space-y-6"><Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white border-none"><div className="flex items-center gap-6"><div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center animate-pulse-slow"><Disc size={48} className={isPlaying ? 'animate-spin-slow' : ''} /></div><div className="flex-1 min-w-0"><h3 className="text-sm uppercase tracking-widest opacity-80">Đang phát</h3><h2 className="text-2xl font-bold truncate">{songs[currentSongIndex]?.title || 'Chưa chọn bài'}</h2><audio ref={audioRef} src={songs[currentSongIndex]?.url} onEnded={nextSong} className="hidden" /><div className="flex gap-4 mt-4"><button onClick={prevSong} className="p-2 hover:bg-white/20 rounded-full"><SkipBack /></button><button onClick={togglePlay} className="p-3 bg-white text-pink-600 rounded-full hover:scale-105 transition-transform">{isPlaying ? <Pause fill="currentColor" /> : <Play fill="currentColor" className="ml-1" />}</button><button onClick={nextSong} className="p-2 hover:bg-white/20 rounded-full"><SkipForward /></button></div></div></div></Card><Card><h3 className="font-bold mb-4 flex gap-2 items-center"><Music className="text-pink-500" /> Danh sách phát</h3><div className="flex gap-2 mb-4"><input placeholder="Tên bài hát" className="flex-1 p-2 rounded bg-gray-50 dark:bg-gray-900 border outline-none text-sm" value={newSong.title} onChange={e => setNewSong({...newSong, title: e.target.value})} /><input placeholder="Link MP3 (URL)" className="flex-1 p-2 rounded bg-gray-50 dark:bg-gray-900 border outline-none text-sm" value={newSong.url} onChange={e => setNewSong({...newSong, url: e.target.value})} /><Button onClick={addSong} icon={Plus} className="py-1">Thêm</Button></div><div className="space-y-2 max-h-60 overflow-y-auto">{songs.map((song, idx) => (<div key={song.id} className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${idx === currentSongIndex ? 'bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800' : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'}`} onClick={() => { setCurrentSongIndex(idx); setIsPlaying(true); }}><div className="flex items-center gap-3"><span className="text-xs font-mono text-gray-400">{idx + 1}</span><span className={`font-medium ${idx === currentSongIndex ? 'text-pink-600 dark:text-pink-400' : ''}`}>{song.title}</span>{idx === currentSongIndex && isPlaying && <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping"></div>}</div><button onClick={(e) => { e.stopPropagation(); deleteSong(song.id); }} className="text-gray-400 hover:text-red-500 p-1"><Trash2 size={16} /></button></div>))}</div></Card></div>);
};
const LuckyWheel = () => {
  const [items, setItems] = useState(['Phở', 'Bún chả', 'Cơm rang', 'Bánh mì', 'Salad']); const [newItem, setNewItem] = useState(''); const [result, setResult] = useState(''); const [isSpinning, setIsSpinning] = useState(false);
  const spin = () => { if (items.length < 2) return; setIsSpinning(true); setResult(''); let count = 0; const interval = setInterval(() => { setResult(items[Math.floor(Math.random() * items.length)]); count++; if (count > 20) { clearInterval(interval); setIsSpinning(false); } }, 100); };
  const addItem = () => { if(newItem.trim()) { setItems([...items, newItem]); setNewItem(''); } };
  return (<div className="max-w-xl mx-auto"><Card className="text-center"><h2 className="text-2xl font-bold mb-6 flex items-center justify-center gap-2"><Shuffle className="text-green-500" /> Vòng quay</h2><div className="h-40 flex items-center justify-center mb-8">{result ? (<div className={`text-4xl font-bold text-green-600 animate-bounce`}>{result}</div>) : (<div className="text-gray-400 italic">Nhấn quay để chọn...</div>)}</div><Button onClick={spin} disabled={isSpinning || items.length < 2} className="w-full justify-center text-lg py-4 mb-8 bg-green-600 hover:bg-green-700">{isSpinning ? 'Đang quay...' : 'QUAY NGAY!'}</Button><div className="text-left border-t pt-4"><label className="text-sm font-bold text-gray-500">Danh sách</label><div className="flex gap-2 mt-2 mb-4"><input value={newItem} onChange={e => setNewItem(e.target.value)} className="flex-1 p-2 rounded border bg-gray-50 dark:bg-gray-900 outline-none" placeholder="Thêm..." onKeyDown={e => e.key === 'Enter' && addItem()} /><Button onClick={addItem} icon={Plus}>Thêm</Button></div><div className="flex flex-wrap gap-2">{items.map((item, idx) => (<span key={idx} className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">{item}<button onClick={() => setItems(items.filter((_, i) => i !== idx))} className="hover:text-red-500"><X size={12}/></button></span>))}</div></div></Card></div>);
};
const WorldClock = () => {
  const [time, setTime] = useState(new Date()); useEffect(() => { const timer = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(timer); }, []);
  const cities = [{ name: 'Hà Nội', tz: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' }, { name: 'Tokyo', tz: 'Asia/Tokyo', flag: '🇯🇵' }, { name: 'New York', tz: 'America/New_York', flag: '🇺🇸' }, { name: 'London', tz: 'Europe/London', flag: '🇬🇧' }];
  return (<div className="max-w-4xl mx-auto"><Card><h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Globe className="text-cyan-500"/> Đồng hồ thế giới</h2><div className="grid grid-cols-2 md:grid-cols-4 gap-4">{cities.map(city => (<div key={city.name} className="p-4 rounded-xl border flex flex-col items-center"><span className="text-2xl mb-1">{city.flag}</span><span className="text-gray-600 dark:text-gray-300 text-sm font-bold uppercase">{city.name}</span><span className="text-2xl font-mono font-bold my-1">{time.toLocaleTimeString('vi-VN', { timeZone: city.tz, hour: '2-digit', minute: '2-digit' })}</span></div>))}</div></Card></div>);
};
const PasswordGenerator = () => {
  const [length, setLength] = useState(12); const [password, setPassword] = useState('');
  const generate = () => { const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'; let pass = ''; for (let i = 0; i < length; i++) pass += chars.charAt(Math.floor(Math.random() * chars.length)); setPassword(pass); };
  return (<div className="max-w-xl mx-auto"><Card><h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Key className="text-red-500"/> Tạo mật khẩu</h2><div className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg mb-6 flex justify-between items-center"><span className="font-mono text-xl break-all">{password || '...'}</span>{password && <CopyButton text={password} />}</div><div className="space-y-4 mb-6"><input type="range" min="6" max="32" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full"/><div className="text-center">Độ dài: {length}</div></div><Button onClick={generate} className="w-full justify-center">Tạo mới</Button></Card></div>);
};
const QRGenerator = () => {
  const [text, setText] = useState(''); const [qrUrl, setQrUrl] = useState('');
  return (<div className="max-w-xl mx-auto"><Card><h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><QrCode className="text-purple-500"/> Tạo mã QR</h2><div className="flex gap-2 mb-6"><input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Link/Text..." className="flex-1 p-3 rounded-lg bg-gray-50 dark:bg-gray-900 border outline-none"/><Button onClick={()=>setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`)}>Tạo</Button></div>{qrUrl && <div className="flex justify-center p-4 bg-white rounded"><img src={qrUrl} alt="QR"/></div>}</Card></div>);
};
const Stopwatch = () => {
  const [time, setTime] = useState(0); const [isRunning, setIsRunning] = useState(false); const [laps, setLaps] = useState([]);
  useEffect(() => { let i; if (isRunning) i = setInterval(() => setTime(p => p + 10), 10); return () => clearInterval(i); }, [isRunning]);
  const format = (ms) => new Date(ms).toISOString().slice(14, 22);
  return (<div className="max-w-xl mx-auto"><Card className="text-center"><h2 className="text-2xl font-bold mb-6 flex justify-center gap-2"><Timer className="text-pink-500"/> Bấm giờ</h2><div className="text-6xl font-mono font-bold mb-8">{format(time)}</div><div className="flex justify-center gap-4"><Button onClick={()=>setIsRunning(!isRunning)}>{isRunning?'Dừng':'Chạy'}</Button><Button onClick={()=>setLaps([time, ...laps])} variant="secondary">Lap</Button><Button onClick={()=>{setIsRunning(false);setTime(0);setLaps([])}} variant="outline">Reset</Button></div><div className="mt-6 max-h-40 overflow-auto">{laps.map((l,i)=><div key={i} className="flex justify-between p-2 border-b"><span>Vòng {laps.length-i}</span><span className="font-mono">{format(l)}</span></div>)}</div></Card></div>);
};
const MarkdownViewer = () => {
  const [text, setText] = useState('# Hello\n**Markdown** preview.');
  return (<div className="max-w-4xl mx-auto h-[600px] flex flex-col"><Card className="h-full flex flex-col"><h2 className="font-bold mb-4 flex gap-2"><FileText className="text-indigo-500"/> Markdown</h2><div className="flex-1 grid grid-cols-2 gap-4"><textarea className="p-4 bg-gray-50 dark:bg-gray-900 rounded border resize-none font-mono" value={text} onChange={e=>setText(e.target.value)}/><div className="p-4 border rounded prose dark:prose-invert overflow-auto">{text}</div></div></Card></div>);
};
const NotesApp = ({ notes, setNotes }) => {
  const [isEditing, setIsEditing] = useState(false); const [current, setCurrent] = useState({ title: '', content: '' });
  const save = () => { if (!current.title) return; if (current.id) setNotes(notes.map(n => n.id === current.id ? current : n)); else setNotes([...notes, { ...current, id: Date.now() }]); setIsEditing(false); setCurrent({ title: '', content: '' }); };
  return (<div className="space-y-6"><div className="flex justify-between items-center"><h2 className="text-2xl font-bold flex gap-2"><StickyNote className="text-yellow-500" /> Ghi chú</h2><Button icon={Plus} onClick={() => { setCurrent({title:'', content:''}); setIsEditing(true); }}>Mới</Button></div>{isEditing ? (<Card><input className="w-full text-xl font-bold mb-4 bg-transparent outline-none" placeholder="Tiêu đề" value={current.title} onChange={e=>setCurrent({...current, title: e.target.value})} /><textarea className="w-full h-64 bg-transparent outline-none resize-none" placeholder="Nội dung..." value={current.content} onChange={e=>setCurrent({...current, content: e.target.value})} /><div className="flex justify-end gap-2 mt-4"><Button variant="secondary" onClick={()=>setIsEditing(false)}>Hủy</Button><Button icon={Save} onClick={save}>Lưu</Button></div></Card>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-4">{notes.map(n => (<div key={n.id} onClick={()=>{setCurrent(n); setIsEditing(true);}} className="bg-yellow-100 dark:bg-yellow-900/30 p-5 rounded-xl cursor-pointer hover:shadow-lg h-48 flex flex-col relative group"><h3 className="font-bold mb-2 truncate">{n.title}</h3><p className="text-sm line-clamp-4 flex-1 opacity-80">{n.content}</p><button onClick={(e)=>{e.stopPropagation(); setNotes(notes.filter(x=>x.id!==n.id))}} className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-red-500"><Trash2 size={16}/></button></div>))}</div>)}</div>);
};
const VaultApp = ({ items, setItems }) => {
  const [newItem, setNewItem] = useState({ type: 'code', title: '', content: '' }); const [filter, setFilter] = useState('all');
  const addItem = () => { if (!newItem.title) return; setItems([{ ...newItem, id: Date.now(), createdAt: new Date().toLocaleDateString() }, ...items]); setNewItem({ type: 'code', title: '', content: '' }); };
  const filteredItems = filter === 'all' ? items : items.filter(i => i.type === filter);
  return (<div className="max-w-4xl mx-auto space-y-6"><Card><h2 className="text-2xl font-bold mb-6 flex items-center gap-2"><Database className="text-purple-500" /> Kho lưu trữ</h2><div className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-xl mb-8"><div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4"><select className="p-2 rounded border bg-white dark:bg-gray-800" value={newItem.type} onChange={e => setNewItem({...newItem, type: e.target.value})}><option value="code">Code</option><option value="link">Link</option><option value="text">Text</option></select><input className="md:col-span-3 p-2 rounded border bg-white dark:bg-gray-800" placeholder="Tiêu đề..." value={newItem.title} onChange={e => setNewItem({...newItem, title: e.target.value})}/></div><textarea className="w-full p-2 rounded border bg-white dark:bg-gray-800 h-24" placeholder="Nội dung..." value={newItem.content} onChange={e => setNewItem({...newItem, content: e.target.value})}/><div className="flex justify-end mt-2"><Button onClick={addItem}>Lưu</Button></div></div><div className="space-y-4">{filteredItems.map(item => (<div key={item.id} className="p-4 border rounded bg-white dark:bg-gray-800 flex justify-between"><div><h3 className="font-bold">{item.title}</h3><p className="font-mono text-sm mt-1 bg-gray-100 dark:bg-gray-900 p-1 rounded">{item.content}</p></div><button onClick={() => setItems(items.filter(i => i.id !== item.id))}><Trash2 className="text-red-500" size={18}/></button></div>))}</div></Card></div>);
};
const Pomodoro = () => {
  const [time, setTime] = useState(1500); const [active, setActive] = useState(false);
  useEffect(() => { let i; if (active && time > 0) i = setInterval(() => setTime(t => t - 1), 1000); return () => clearInterval(i); }, [active, time]);
  return (<div className="flex justify-center"><Card className="w-full max-w-lg text-center"><h2 className="text-2xl font-bold mb-8 flex justify-center gap-2"><Clock className="text-red-500"/> Pomodoro</h2><div className="text-8xl font-mono font-bold mb-10">{`${Math.floor(time/60).toString().padStart(2,'0')}:${(time%60).toString().padStart(2,'0')}`}</div><div className="flex justify-center gap-4"><Button onClick={()=>setActive(!active)}>{active?'Dừng':'Chạy'}</Button><Button variant="outline" onClick={()=>{setActive(false); setTime(1500)}}>Reset</Button></div></Card></div>);
};
const DevToolsApp = () => {
  const [input, setInput] = useState(''); const [output, setOutput] = useState('');
  return (<div className="max-w-4xl mx-auto"><Card><h2 className="text-2xl font-bold mb-6 flex gap-2"><Code className="text-green-500"/> DevTools</h2><div className="grid grid-cols-2 gap-4"><textarea className="p-4 rounded border bg-gray-50 dark:bg-gray-900 h-64 font-mono text-xs" value={input} onChange={e=>setInput(e.target.value)} placeholder="JSON..."/><textarea readOnly className="p-4 rounded border bg-gray-50 dark:bg-gray-900 h-64 font-mono text-xs" value={output}/></div><div className="flex gap-2 mt-4"><Button onClick={()=>{try{setOutput(JSON.stringify(JSON.parse(input),null,2))}catch(e){setOutput('Invalid JSON')}}}>Format JSON</Button><Button onClick={()=>setOutput(btoa(input))}>Base64 Encode</Button></div></Card></div>);
};

// --- Main Layout ---

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [weather, setWeather] = useState(null);

  // Persistence
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks') || '[]'));
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes') || '[]'));
  const [expenses, setExpenses] = useState(() => JSON.parse(localStorage.getItem('expenses') || '[]'));
  const [vaultItems, setVaultItems] = useState(() => JSON.parse(localStorage.getItem('vaultItems') || '[]'));
  const [songs, setSongs] = useState(() => JSON.parse(localStorage.getItem('songs') || '[]'));

  useEffect(() => { localStorage.setItem('tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('notes', JSON.stringify(notes)); }, [notes]);
  useEffect(() => { localStorage.setItem('expenses', JSON.stringify(expenses)); }, [expenses]);
  useEffect(() => { localStorage.setItem('vaultItems', JSON.stringify(vaultItems)); }, [vaultItems]);
  useEffect(() => { localStorage.setItem('songs', JSON.stringify(songs)); }, [songs]);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=21.0285&longitude=105.8542&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto')
      .then(res => res.json())
      .then(data => setWeather(data))
      .catch(err => console.log('Weather Error:', err));
  }, []);

  const menuItems = [
    { id: 'dashboard', label: 'Tổng quan', icon: Home },
    { id: 'kanban', label: 'Kanban Board', icon: Columns },
    { id: 'notes', label: 'Ghi chú', icon: StickyNote },
    { id: 'vault', label: 'Kho lưu trữ', icon: Database },
    { id: 'youtube', label: 'Mini YouTube', icon: Youtube },
    { id: 'music', label: 'Music Player', icon: Music },
    { id: 'recorder', label: 'Ghi âm', icon: Mic },
    { id: 'aichat', label: 'AI Chat', icon: Bot },
    { id: 'crypto', label: 'Crypto Market', icon: Bitcoin },
    { id: 'finance', label: 'Tài chính', icon: BarChart },
    { id: 'wheel', label: 'Vòng quay', icon: Shuffle },
    { id: 'worldclock', label: 'Giờ Thế giới', icon: Globe },
    { id: 'password', label: 'Mật khẩu', icon: Key },
    { id: 'qrcode', label: 'Mã QR', icon: QrCode },
    { id: 'stopwatch', label: 'Bấm giờ', icon: Timer },
    { id: 'markdown', label: 'Markdown', icon: FileText },
    { id: 'devtools', label: 'Dev Tools', icon: Code },
  ];

  return (
    <div className={`min-h-screen font-sans bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 flex overflow-hidden ${darkMode ? 'dark' : ''}`}>
      {isSidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />}

      <aside className={`fixed md:static inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 flex flex-col`}>
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">WorkOS 5.0</h1>
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">{darkMode ? <Sun size={20} /> : <Moon size={20} />}</button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
              <item.icon size={18} /><span className="text-sm">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="md:hidden p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h1 className="font-bold text-lg">WorkOS 5.0</h1>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"><Menu size={24} /></button>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-5xl mx-auto h-full">
            {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} tasks={tasks} weather={weather} />}
            {activeTab === 'kanban' && <KanbanBoard tasks={tasks} setTasks={setTasks} />}
            {activeTab === 'youtube' && <YouTubePlayer />}
            {activeTab === 'music' && <MusicPlayer songs={songs} setSongs={setSongs} />}
            {activeTab === 'wheel' && <LuckyWheel />}
            {activeTab === 'worldclock' && <WorldClock />}
            {activeTab === 'notes' && <NotesApp notes={notes} setNotes={setNotes} />}
            {activeTab === 'vault' && <VaultApp items={vaultItems} setItems={setVaultItems} />}
            {activeTab === 'pomodoro' && <Pomodoro />}
            {activeTab === 'finance' && <FinanceApp expenses={expenses} setExpenses={setExpenses} />}
            {activeTab === 'devtools' && <DevToolsApp />}
            {activeTab === 'crypto' && <CryptoMarket />}
            {activeTab === 'aichat' && <AIAssistant />}
            {activeTab === 'recorder' && <VoiceRecorder />}
            {activeTab === 'password' && <PasswordGenerator />}
            {activeTab === 'qrcode' && <QRGenerator />}
            {activeTab === 'stopwatch' && <Stopwatch />}
            {activeTab === 'markdown' && <MarkdownViewer />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;