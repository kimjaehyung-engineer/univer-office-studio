import React, { useState } from 'react';
import Header from './components/Header';
import UniverSheet from './components/UniverSheet';
import UniverDoc from './components/UniverDoc';
import HelpModal from './components/HelpModal';

import {
  CONSTRUCTION_COST_TEMPLATE,
  RISK_CHECKLIST_TEMPLATE
} from './data/templates';

import './App.css';

export default function App() {
  const [mode, setMode] = useState('sheets'); // 'sheets' | 'docs'
  const [selectedTemplateKey, setSelectedTemplateKey] = useState('cost');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Determine which template data to provide to UniverSheet
  const currentSheetData =
    selectedTemplateKey === 'cost'
      ? CONSTRUCTION_COST_TEMPLATE
      : selectedTemplateKey === 'risk'
      ? RISK_CHECKLIST_TEMPLATE
      : null;

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
      />

      {/* 2. Main Univer Office Canvas Workspace */}
      <main className="univer-main-workspace">
        {mode === 'sheets' ? (
          <UniverSheet
            key={`sheet-${selectedTemplateKey}`}
            initialData={currentSheetData}
          />
        ) : (
          <UniverDoc
            key="univer-doc-editor"
            initialData={null}
          />
        )}
      </main>

      {/* 3. Help & REA Guide Modal */}
      <HelpModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}
