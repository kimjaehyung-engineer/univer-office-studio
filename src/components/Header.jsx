import React from 'react';
import {
  Table2,
  FileText,
  Sparkles,
  Download,
  FolderOpen,
  HelpCircle,
  Maximize2,
  Minimize2,
  Layers,
  ChevronDown
} from 'lucide-react';

export default function Header({
  mode,
  setMode,
  selectedTemplateKey,
  onSelectTemplate,
  onOpenHelp,
  isFullscreen,
  onToggleFullscreen
}) {
  return (
    <header className="univer-header-bar">
      <div className="header-left">
        <div className="app-branding">
          <div className="brand-icon-box">
            {mode === 'sheets' ? <Table2 size={20} className="icon-excel" /> : <FileText size={20} className="icon-word" />}
          </div>
          <div className="brand-text-wrap">
            <span className="brand-title">
              Univer <span className="brand-subtitle">{mode === 'sheets' ? 'Sheets (Excel)' : 'Docs (Word)'}</span>
            </span>
            <span className="brand-tag">v1.1 Core Engine</span>
          </div>
        </div>

        <div className="header-divider" />

        {/* Mode Switcher */}
        <div className="mode-segmented-control">
          <button
            className={`mode-btn ${mode === 'sheets' ? 'active excel' : ''}`}
            onClick={() => setMode('sheets')}
            title="Excel 스타일 스프레드시트 모드"
          >
            <Table2 size={16} />
            <span>Excel 시트</span>
          </button>
          <button
            className={`mode-btn ${mode === 'docs' ? 'active word' : ''}`}
            onClick={() => setMode('docs')}
            title="Word 스타일 리치 문서 모드"
          >
            <FileText size={16} />
            <span>Word 문서</span>
          </button>
        </div>
      </div>

      <div className="header-center">
        {/* Template Selector (Shown in Sheets mode) */}
        {mode === 'sheets' && (
          <div className="template-dropdown-wrap">
            <Layers size={15} className="dropdown-icon" />
            <select
              className="template-select"
              value={selectedTemplateKey}
              onChange={(e) => onSelectTemplate(e.target.value)}
            >
              <option value="cost">🏗️ [템플릿 1] 동탄트램 가시설 원가 집계표 (수식 포함)</option>
              <option value="risk">📋 [템플릿 2] 소방시설 & 지반 리스크 점검표</option>
              <option value="blank">📄 [새 시트] 빈 통합 문서 (Blank)</option>
            </select>
          </div>
        )}
      </div>

      <div className="header-right">
        <button
          className="header-tool-btn"
          onClick={onOpenHelp}
          title="Univer & REA 오픈소스 가이드"
        >
          <HelpCircle size={17} />
          <span>REA & 유니버 안내</span>
        </button>

        <button
          className="header-tool-btn"
          onClick={onToggleFullscreen}
          title="전체화면 전환"
        >
          {isFullscreen ? <Minimize2 size={17} /> : <Maximize2 size={17} />}
        </button>
      </div>
    </header>
  );
}
