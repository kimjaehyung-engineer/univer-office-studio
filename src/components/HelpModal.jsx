import React from 'react';
import { X, Sparkles, BookOpen, Layers, CheckCircle2 } from 'lucide-react';

export default function HelpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="univer-modal-backdrop" onClick={onClose}>
      <div className="univer-modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="univer-modal-header">
          <div className="modal-header-title">
            <Sparkles size={20} className="modal-sparkle-icon" />
            <h3>Univer (유니버) & REA 오픈소스 가이드</h3>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <div className="univer-modal-content">
          <div className="guide-card">
            <h4>🏆 Univer (dream-num/univer)란?</h4>
            <p>
              마이크로소프트 365(Microsoft Office)와 Google Docs를 완벽히 대체하기 위해 탄생한
              차세대 <strong>풀 오픈소스 웹 오피스 엔진</strong>입니다.
            </p>
            <ul>
              <li><strong>Univer Sheets (Excel)</strong>: Canvas 기반 초고속 렌더링, 수식 계산 엔진(SUM, AVERAGE, IF 등), 다중 시트, 필터, 셀 서식 지원</li>
              <li><strong>Univer Docs (Word)</strong>: A4 페이지네이션, 제목 계층, 리치 텍스트 서식, 표 삽입 지원</li>
              <li><strong>Univer Slides (PPT)</strong>: 브라우저 기반 슬라이드 발표 및 레이아웃 제어</li>
            </ul>
          </div>

          <div className="guide-card highlight">
            <h4>🔍 "REA로 워드, 엑셀, PPT를 카피했다"는 소문의 배경</h4>
            <p>
              최근 깃허브에서 화제가 된 <strong>REA (Reverse Engineer Anything)</strong>는 AI 코딩 에이전트(Claude Code, Cursor 등)에게
              상용 소프트웨어를 역공학(리버스 엔지니어링)하여 동작 방식을 파악하도록 돕는 도구입니다.
            </p>
            <p>
              이와 동시에 AI를 활용해 MS Office를 1:1로 복제한 <strong>Univer, FortuneSheet, PPTist</strong> 같은 프로젝트들이 커뮤니티에서
              함께 결합되어 큰 화제가 되었습니다.
            </p>
          </div>

          <div className="guide-card">
            <h4>💡 현재 화면에서 바로 해볼 수 있는 것들</h4>
            <div className="features-grid">
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-check" />
                <span>셀 더블클릭 후 엑셀 수식(예: <code>=D5*F5</code>, <code>=SUM(...)</code>) 입력 및 실시간 연산</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-check" />
                <span>상단 템플릿 선택기에서 [동탄트램 가시설 원가 집계표] 또는 [소방 리스크 점검표] 즉시 로드</span>
              </div>
              <div className="feature-item">
                <CheckCircle2 size={16} className="feature-check" />
                <span>[Excel 시트] ↔ [Word 문서] 모드 전환을 통한 문서 작성</span>
              </div>
            </div>
          </div>
        </div>

        <div className="univer-modal-footer">
          <button className="modal-primary-btn" onClick={onClose}>
            확인 및 편집 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}
