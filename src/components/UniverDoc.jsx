import React, { useEffect, useRef } from 'react';
import { createUniver, LocaleType, mergeLocales } from '@univerjs/presets';
import { UniverDocsCorePreset } from '@univerjs/preset-docs-core';
import UniverPresetDocsCoreKoKR from '@univerjs/preset-docs-core/locales/ko-KR';
import UniverPresetDocsCoreEnUS from '@univerjs/preset-docs-core/locales/en-US';

import '@univerjs/preset-docs-core/lib/index.css';

export default function UniverDoc({ initialData, onUniverReady }) {
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
          [LocaleType.KO_KR]: mergeLocales(UniverPresetDocsCoreKoKR),
          [LocaleType.EN_US]: mergeLocales(UniverPresetDocsCoreEnUS),
        },
        presets: [
          UniverDocsCorePreset({
            container,
          }),
        ],
      });

      univerInstance = univer;

      // Create document
      if (initialData) {
        univerAPI.createDocument(initialData);
      } else {
        univerAPI.createDocument({});
      }

      if (onUniverReady) {
        onUniverReady(univerAPI);
      }
    } catch (err) {
      console.error('Failed to initialize Univer Docs:', err);
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
