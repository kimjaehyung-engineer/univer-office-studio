import React, { useEffect, useRef } from 'react';
import { createUniver, LocaleType, mergeLocales } from '@univerjs/presets';
import { UniverSheetsCorePreset } from '@univerjs/preset-sheets-core';
import UniverPresetSheetsCoreKoKR from '@univerjs/preset-sheets-core/locales/ko-KR';
import UniverPresetSheetsCoreEnUS from '@univerjs/preset-sheets-core/locales/en-US';

import '@univerjs/preset-sheets-core/lib/index.css';

export default function UniverSheet({ initialData, onUniverReady }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    // Create child container
    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.height = '100%';
    host.innerHTML = '';
    host.appendChild(container);

    let univerInstance = null;

    try {
      const { univer, univerAPI } = createUniver({
        locale: LocaleType.KO_KR,
        locales: {
          [LocaleType.KO_KR]: mergeLocales(UniverPresetSheetsCoreKoKR),
          [LocaleType.EN_US]: mergeLocales(UniverPresetSheetsCoreEnUS),
        },
        presets: [
          UniverSheetsCorePreset({
            container,
          }),
        ],
      });

      univerInstance = univer;

      // Create workbook with provided initial template data or default blank
      if (initialData) {
        univerAPI.createWorkbook(initialData);
      } else {
        univerAPI.createWorkbook({});
      }

      if (onUniverReady) {
        onUniverReady(univerAPI);
      }
    } catch (err) {
      console.error('Failed to initialize Univer Sheets:', err);
    }

    return () => {
      if (univerInstance) {
        try {
          univerInstance.dispose();
        } catch (e) {
          // ignore cleanup errors
        }
      }
      container.remove();
    };
  }, [initialData]);

  return (
    <div
      ref={containerRef}
      className="univer-container"
      style={{ width: '100%', height: '100%', overflow: 'hidden' }}
    />
  );
}
