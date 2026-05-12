import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Addproduct from './components/Addproduct';
import Getproduct from './components/Getproduct';
import Makepayment from './components/Makepayment';
import Footer from './components/Footer';
import Navbar from './components/navbar';
import Cart from './components/Cart';

// Chatbot knowledge base
const knowledgeBase = [
  { keywords: ["hello", "hi", "greet"], response: "Hello! I am your electronics assistant. How can I help you today?" },
  { keywords: ["phone", "battery", "drain"], response: "Reduce screen brightness, close background apps, and turn off unused features like Bluetooth or GPS." },
  { keywords: ["laptop", "slow", "lag"], response: "Try restarting your laptop, closing unused programs, and freeing up storage space." },
  { keywords: ["internet", "wifi", "slow"], response: "Restart your router, move closer to it, and limit the number of connected devices." },
  { keywords: ["tv", "screen", "display"], response: "Check the power cable and input source. Make sure the TV is properly connected." },
  { keywords: ["charging", "cable", "not working"], response: "Try a different cable or adapter and check if the charging port is clean." },
  { keywords: ["overheat", "hot", "device"], response: "Turn it off for a while, avoid using it while charging, and keep it in a cool environment." },
  { keywords: ["headphones", "sound", "issue"], response: "Check the connection, clean the jack, or test with another device." },
  { keywords: ["software", "update", "install"], response: "Yes, updates improve security and performance. Make sure to back up your data first." },
]

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm Linun 🤖 your electronics assistant. How can I help you?" }
  ])
  const [input, setInput] = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const getResponse = (userText) => {
    const lower = userText.toLowerCase()
    for (const item of knowledgeBase) {
      for (const keyword of item.keywords) {
        if (lower.includes(keyword.trim().toLowerCase())) {
          return item.response
        }
      }
    }
    return "I don't know that one. Try asking about 'phones', 'laptop', 'wifi', or 'charging'. 😊"
  }

  const handleSend = () => {
    if (!input.trim()) return
    const userMessage = { from: "user", text: input }
    const botMessage = { from: "bot", text: getResponse(input) }
    setMessages((prev) => [...prev, userMessage, botMessage])
    setInput("")
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend()
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed", bottom: "20px", right: "20px",
          width: "55px", height: "55px", borderRadius: "50%",
          backgroundColor: "#0d6efd", color: "white", fontSize: "24px",
          border: "none", cursor: "pointer", zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)"
        }}
      >
        {open ? "✖" : "🤖"}
      </button>

      {open && (
        <div style={{
          position: "fixed", bottom: "85px", right: "20px",
          width: "320px", height: "420px", backgroundColor: "#1a1a2e",
          borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          display: "flex", flexDirection: "column", zIndex: 999, overflow: "hidden"
        }}>
          <div style={{
            backgroundColor: "#0d6efd", padding: "12px 16px",
            color: "white", fontWeight: "bold", fontSize: "15px"
          }}>
            🤖 Linun — Electronics Assistant
          </div>

          <div style={{
            flex: 1, overflowY: "auto", padding: "12px",
            display: "flex", flexDirection: "column", gap: "8px"
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.from === "user" ? "#0d6efd" : "#2a2a4a",
                color: "white", padding: "8px 12px", borderRadius: "12px",
                maxWidth: "80%", fontSize: "13px", lineHeight: "1.4"
              }}>
                {msg.text}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #333", padding: "8px" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything..."
              style={{
                flex: 1, padding: "8px", borderRadius: "8px",
                border: "none", backgroundColor: "#2a2a4a",
                color: "white", outline: "none", fontSize: "13px"
              }}
            />
            <button
              onClick={handleSend}
              style={{
                marginLeft: "8px", padding: "8px 12px",
                backgroundColor: "#0d6efd", color: "white",
                border: "none", borderRadius: "8px",
                cursor: "pointer", fontSize: "16px"
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <header className="App-header indie-flower-regular">
          <h1>Jounior electronic shop</h1>
        </header>

        <Navbar />

        <Routes>
          <Route path='/' element={<Getproduct />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/addproduct' element={<Addproduct />} />
          <Route path='/makepayment' element={<Makepayment />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>

        <Footer />
        <Chatbot />

      </div>
    </BrowserRouter>
  );
}

export default App;