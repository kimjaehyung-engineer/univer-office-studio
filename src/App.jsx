import React, { useState } from 'react';
import Header from './components/Header';
import UniverSheet from './components/UniverSheet';
import UniverDoc from './components/UniverDoc';
import HelpModal from './components/HelpModal';
import AICopilot from './components/AICopilot';

import {
  CONSTRUCTION_COST_TEMPLATE,
  RISK_CHECKLIST_TEMPLATE,
  BLANK_TEMPLATE
} from './data/templates';

import './App.css';

export default function App() {
  const [mode, setMode] = useState('sheets'); // 'sheets' | 'docs'
  const [selectedTemplateKey, setSelectedTemplateKey] = useState('cost');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // AI Copilot state (open by default)
  const [isCopilotOpen, setIsCopilotOpen] = useState(true);
  const [univerAPI, setUniverAPI] = useState(null);

  // Determine which template data to provide to UniverSheet
  const currentSheetData =
    selectedTemplateKey === 'cost'
      ? CONSTRUCTION_COST_TEMPLATE
      : selectedTemplateKey === 'risk'
      ? RISK_CHECKLIST_TEMPLATE
      : BLANK_TEMPLATE;

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="univer-app-layout">
      {/* 1. Header Bar with Microsoft 365 Styling */}
      <Header
        mode={mode}
        setMode={setMode}
        selectedTemplateKey={selectedTemplateKey}
        onSelectTemplate={(key) => setSelectedTemplateKey(key)}
        onOpenHelp={() => setIsHelpOpen(true)}
        isFullscreen={isFullscreen}
        onToggleFullscreen={handleToggleFullscreen}
        isCopilotOpen={isCopilotOpen}
        onToggleCopilot={() => setIsCopilotOpen((prev) => !prev)}
      />

      {/* 2. Main Body: Split between Univer Workspace and AI Copilot Sidebar */}
      <div className="univer-body-wrapper">
        <main className="univer-main-workspace">
          {mode === 'sheets' ? (
            <UniverSheet
              key={`sheet-${selectedTemplateKey}`}
              initialData={currentSheetData}
              onUniverReady={(api) => setUniverAPI(api)}
            />
          ) : (
            <UniverDoc
              key="univer-doc-editor"
              initialData={null}
              onUniverReady={(api) => setUniverAPI(api)}
            />
          )}
        </main>

        {/* 3. AI Vibe Copilot Panel */}
        <AICopilot
          isOpen={isCopilotOpen}
          onClose={() => setIsCopilotOpen(false)}
          univerAPI={univerAPI}
          mode={mode}
          selectedTemplateKey={selectedTemplateKey}
        />
      </div>

      {/* 4. Help & REA Guide Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
