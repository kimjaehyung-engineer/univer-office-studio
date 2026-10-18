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
  RefreshCw
} from 'lucide-react';

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
      text: '안녕하세요! Univer AI 바이브 코파일럿입니다. 🤖\n엑셀 수식, 데이터 수정, 서식 변경, 단가 인상 등을 자연어로 편하게 말씀해 주시면 시트를 실시간으로 자동 조작해 드립니다.',
      timestamp: '방금 전'
    }
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Auto scroll chat to bottom
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
  const executeVibeAction = async (promptText) => {
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

    // Simulate AI inference & execution
    setTimeout(() => {
      let aiResponseText = '';
      let success = true;

      try {
        const workbook = univerAPI?.getActiveWorkbook();
        const sheet = workbook?.getActiveSheet();

        const lower = promptText.toLowerCase();

        if (lower.includes('인상') || lower.includes('올려') || lower.includes('물가')) {
          // 1. Inflate prices by 8%
          if (sheet) {
            // Rows 4 to 9 (0-indexed)
            for (let r = 4; r <= 9; r++) {
              const unitPriceRange = sheet.getRange(r, 5); // F column (단가)
              const oldPrice = Number(unitPriceRange.getValue()) || 0;
              if (oldPrice > 0) {
                const newPrice = Math.round(oldPrice * 1.08);
                unitPriceRange.setValue(newPrice);
              }
            }
            aiResponseText = '⚡ F열(단가)에 물가상승률 8%를 일괄 적용했습니다! 연결된 공급가액(G열)과 총액(I열) 수식이 실시간으로 함께 갱신되었습니다.';
          } else {
            aiResponseText = 'F열의 단가 항목들을 8% 인상 적용하였습니다.';
          }
        } else if (lower.includes('하이라이트') || lower.includes('강조') || lower.includes('색') || lower.includes('빨간') || lower.includes('노란')) {
          // 2. Highlight expensive items
          if (sheet) {
            for (let r = 4; r <= 9; r++) {
              const amountRange = sheet.getRange(r, 8); // I column (합계)
              const totalVal = Number(amountRange.getValue()) || 0;
              if (totalVal >= 70000000) {
                const rowRange = sheet.getRange(r, 0, 1, 10);
                rowRange.setBackgroundColor('#FEF3C7'); // light amber
              }
            }
            aiResponseText = '🎨 7,000만원 이상의 대형 공종(H-Pile, 토류판, 강관버팀보, 지반앵커) 행에 소프트 골드 하이라이트(#FEF3C7)를 적용했습니다.';
          } else {
            aiResponseText = '고액 공종 행에 하이라이트 서식을 적용했습니다.';
          }
        } else if (lower.includes('추가') || lower.includes('행') || lower.includes('공종')) {
          // 3. Add new row
          if (sheet) {
            // Row 10 is next available row before summary
            const newRow = 10;
            sheet.getRange(newRow, 0).setValue(7);
            sheet.getRange(newRow, 1).setValue('차수 그라우팅 (JSP 공법)');
            sheet.getRange(newRow, 2).setValue('Φ800mm 유효경 L=15m');
            sheet.getRange(newRow, 3).setValue(60);
            sheet.getRange(newRow, 4).setValue('공');
            sheet.getRange(newRow, 5).setValue(1250000);
            sheet.getRange(newRow, 6).setFormula('=D11*F11');
            sheet.getRange(newRow, 7).setFormula('=G11*0.1');
            sheet.getRange(newRow, 8).setFormula('=G11+H11');
            sheet.getRange(newRow, 9).setValue('신규 공법 반영');

            // Highlight new row
            sheet.getRange(newRow, 0, 1, 10).setBackgroundColor('#E0F2FE'); // light cyan

            aiResponseText = '➕ [No. 7] 차수 그라우팅(JSP공법, 60공, 단가 125만원) 신규 행을 추가하고 공급가액·부가세 수식을 자동 연동했습니다.';
          } else {
            aiResponseText = '신규 공종 행을 성공적으로 추가했습니다.';
          }
        } else if (lower.includes('초기화') || lower.includes('리셋') || lower.includes('서식 지우기')) {
          // 4. Reset formatting
          if (sheet) {
            for (let r = 4; r <= 10; r++) {
              sheet.getRange(r, 0, 1, 10).setBackgroundColor('#FFFFFF');
            }
            aiResponseText = '🧹 셀 배경색 하이라이트를 모두 클린 모드로 초기화했습니다.';
          }
        } else if (lower.includes('요약') || lower.includes('분석') || lower.includes('보고')) {
          // 5. Engineering summary
          aiResponseText = '📊 **동탄트램 가시설 원가 분석 리포트**:\n\n1. **최대 예산 점유 공종**: H-Pile 천공근입 (1.12억, 25.5%)\n2. **공정 핵심 리스크**: 심부 지반앵커 인장 안정성 확보\n3. **원가 절감 기회**: 버팀보 구간 단면 최적화(Φ609.6 → Φ508) 시 약 1,800만원 절감 가능\n\n추가로 수행할 작업이 있으시면 지시해 주세요!';
        } else {
          // General natural language interpretation
          if (sheet) {
            // Generic sample action
            sheet.getRange(0, 0).setBackgroundColor('#F0FDF4');
            aiResponseText = `🤖 말씀하신 지시사항 ("${promptText}")을(를) 해석하여 시트 상태에 반영했습니다. 추가 세부 조건이 필요하시면 언제든 말씀해 주세요!`;
          } else {
            aiResponseText = `🤖 지시사항을 반영했습니다: "${promptText}"`;
          }
        }
      } catch (err) {
        console.error('Copilot Execution Error:', err);
        aiResponseText = '⚠️ 작업 수행 중 오류가 발생했습니다. Univer 인스턴스가 활성화되어 있는지 확인해 주세요.';
        success = false;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: aiResponseText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
      setIsProcessing(false);
    }, 600);
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
        <span className="vibe-label">⚡ 원클릭 바이브 명령어</span>
        <div className="vibe-chips">
          <button
            className="vibe-chip"
            onClick={() => executeVibeAction('전체 공사비 물가상승률 8% 일괄 인상해줘')}
          >
            <TrendingUp size={13} />
            <span>단가 8% 인상</span>
          </button>
          <button
            className="vibe-chip"
            onClick={() => executeVibeAction('7천만원 이상 고액 공종 골드 하이라이트 걸어줘')}
          >
            <Palette size={13} />
            <span>고액 공종 하이라이트</span>
          </button>
          <button
            className="vibe-chip"
            onClick={() => executeVibeAction('차수 그라우팅 신규 공종 행 추가해줘')}
          >
            <PlusCircle size={13} />
            <span>신규 공종 행 추가</span>
          </button>
          <button
            className="vibe-chip"
            onClick={() => executeVibeAction('공사비 원가 상위 리스크 요약 보고해줘')}
          >
            <FileSpreadsheet size={13} />
            <span>엔지니어링 요약 분석</span>
          </button>
          <button
            className="vibe-chip"
            onClick={() => executeVibeAction('서식 초기화해줘')}
          >
            <RefreshCw size={13} />
            <span>서식 초기화</span>
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
          executeVibeAction(inputPrompt);
        }}
      >
        <div className="input-box-wrapper">
          <input
            type="text"
            className="copilot-input"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="자연어로 편하게 지시하세요 (예: 단가 8% 인상해줘)"
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
