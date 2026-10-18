import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  Mic,
  MicOff,
  Bot,
  User,
  CheckCircle2,
  TrendingUp,
  Palette,
  PlusCircle,
  FileSpreadsheet,
  X,
  HelpCircle,
  RefreshCw,
  Grid,
  AlignCenter,
  Wand2
} from 'lucide-react';
import { executeVibeCommand } from '../utils/vibeEngine';

export default function AICopilot({
  isOpen,
  onClose,
  univerAPI,
  mode,
  selectedTemplateKey
}) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: '안녕하세요! Univer AI 바이브 코파일럿입니다. 🤖\n\n💡 **"표에 선 그려줘"**, **"단가 8% 인상해줘"**, **"헤더 예쁘게 꾸며줘"**, **"가운데 정렬해줘"** 등 자연어로 편하게 말씀해 주시면 시트를 실시간으로 자동 조작합니다.',
      timestamp: '방금 전'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll chat to bottom (HMR active)
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Setup Web Speech API for voice dictation
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'ko-KR';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputPrompt(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('현재 브라우저에서는 음성 인식을 지원하지 않습니다. Chrome/Edge를 사용해 주세요.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  // Execute Vibe Action on Univer
  const handleExecute = (promptText) => {
    if (!promptText.trim() || isProcessing) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setIsProcessing(true);

    // Call the intelligent Vibe Engine
    setTimeout(() => {
      const result = executeVibeCommand(promptText, univerAPI);

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: result.message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsProcessing(false);
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <aside className="ai-copilot-sidebar">
      {/* Sidebar Header */}
      <div className="copilot-header">
        <div className="copilot-title-box">
          <Sparkles className="sparkle-badge" size={18} />
          <div>
            <h3>AI 바이브 코파일럿</h3>
            <span className="copilot-status-tag">Univer Agent Active</span>
          </div>
        </div>
        <button className="close-copilot-btn" onClick={onClose}>
          <X size={18} />
        </button>
      </div>

      {/* Quick Vibe Action Cards */}
      <div className="quick-vibe-actions">
        <span className="vibe-label">⚡ 원클릭 바이브 명령어 (테스트 추천)</span>
        <div className="vibe-chips">
          {/* 1. BORDER (The exact user request!) */}
          <button
            className="vibe-chip highlight"
            onClick={() => handleExecute('표에 선 그려줘 (모든 테두리)')}
          >
            <Grid size={13} />
            <span>📏 표에 선 그리기</span>
          </button>

          {/* 2. HEADER POLISH */}
          <button
            className="vibe-chip highlight"
            onClick={() => handleExecute('헤더 예쁘게 꾸며줘')}
          >
            <Wand2 size={13} />
            <span>✨ 헤더 예쁘게 꾸미기</span>
          </button>

          {/* 3. ALIGNMENT */}
          <button
            className="vibe-chip"
            onClick={() => handleExecute('가운데 정렬해줘')}
          >
            <AlignCenter size={13} />
            <span>🎯 가운데 정렬</span>
          </button>

          {/* 4. PRICE INFLATION */}
          <button
            className="vibe-chip"
            onClick={() => handleExecute('전체 공사비 물가상승률 8% 일괄 인상해줘')}
          >
            <TrendingUp size={13} />
            <span>⚡ 단가 8% 인상</span>
          </button>

          {/* 5. HIGHLIGHT */}
          <button
            className="vibe-chip"
            onClick={() => handleExecute('7천만원 이상 고액 공종 골드 하이라이트 걸어줘')}
          >
            <Palette size={13} />
            <span>🎨 고액 공종 하이라이트</span>
          </button>

          {/* 6. ADD ROW */}
          <button
            className="vibe-chip"
            onClick={() => handleExecute('차수 그라우팅 신규 공종 행 추가해줘')}
          >
            <PlusCircle size={13} />
            <span>➕ 신규 공종 행 추가</span>
          </button>

          {/* 7. RESET */}
          <button
            className="vibe-chip"
            onClick={() => handleExecute('서식 초기화해줘')}
          >
            <RefreshCw size={13} />
            <span>🧹 서식 초기화</span>
          </button>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="copilot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message-row ${msg.sender}`}>
            <div className="avatar-icon">
              {msg.sender === 'ai' ? <Bot size={15} /> : <User size={15} />}
            </div>
            <div className="message-bubble">
              <p className="message-content">{msg.text}</p>
              <span className="message-time">{msg.timestamp}</span>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="chat-message-row ai">
            <div className="avatar-icon"><Bot size={15} /></div>
            <div className="message-bubble thinking">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        className="copilot-input-area"
        onSubmit={(e) => {
          e.preventDefault();
          handleExecute(inputPrompt);
        }}
      >
        <div className="input-box-wrapper">
          <input
            type="text"
            className="copilot-input"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="자연어로 편하게 지시하세요 (예: 표에 선 그려줘)"
            disabled={isProcessing}
          />

          <button
            type="button"
            className={`voice-mic-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleVoiceInput}
            title={isListening ? '듣는 중... (클릭 시 중지)' : '음성으로 말하기 (보이스 지시)'}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          <button
            type="submit"
            className="copilot-send-btn"
            disabled={!inputPrompt.trim() || isProcessing}
            title="지시 전송"
          >
            <Send size={15} />
          </button>
        </div>
      </form>
    </aside>
  );
}
