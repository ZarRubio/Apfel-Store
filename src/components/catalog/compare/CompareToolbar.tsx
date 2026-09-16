import { COMPARE_PRESETS } from './compareData';
import { SparklesIcon } from '@/components/icons/UiIcons';

interface CompareToolbarProps {
  selectedSlugs: string[];
  onlyDifferences: boolean;
  differenceCount: number;
  onPreset: (slugs: string[]) => void;
  onSlotCountChange: (count: 2 | 3) => void;
  onDifferencesChange: (checked: boolean) => void;
}

export function CompareToolbar({
  selectedSlugs,
  onlyDifferences,
  differenceCount,
  onPreset,
  onSlotCountChange,
  onDifferencesChange,
}: CompareToolbarProps) {
  return <>
    <div className="compare-presets-wrap" aria-label="Comparaciones populares">
      <span className="compare-presets-label"><SparklesIcon /> Comparaciones populares:</span>
      {COMPARE_PRESETS.map((preset) => {
        const isActive = preset.slugs.length === selectedSlugs.length
          && preset.slugs.every((slug, index) => slug === selectedSlugs[index]);
        return <button
          key={preset.label}
          type="button"
          className={`compare-preset-pill ${isActive ? 'active' : ''}`}
          aria-pressed={isActive}
          onClick={() => onPreset([...preset.slugs])}
        >
          {preset.label}
        </button>;
      })}
    </div>

    <div className="compare-toolbar">
      <div className="compare-slot-controls" aria-label="Cantidad de modelos">
        <button
          type="button"
          className={`slot-toggle-button ${selectedSlugs.length === 2 ? 'active' : ''}`}
          aria-pressed={selectedSlugs.length === 2}
          onClick={() => onSlotCountChange(2)}
        >
          2 modelos
        </button>
        <button
          type="button"
          className={`slot-toggle-button ${selectedSlugs.length === 3 ? 'active' : ''}`}
          aria-pressed={selectedSlugs.length === 3}
          onClick={() => onSlotCountChange(3)}
        >
          3 modelos
        </button>
      </div>

      <div className="compare-diff-toggle-wrap">
        <label className="compare-toggle-label">
          <input
            type="checkbox"
            className="sr-only compare-toggle-input"
            checked={onlyDifferences}
            onChange={(event) => onDifferencesChange(event.target.checked)}
          />
          <span className="compare-toggle-switch" aria-hidden="true" />
          <span>Solo mostrar diferencias</span>
        </label>
        <span className="compare-diff-count-badge" aria-live="polite">
          {differenceCount} {differenceCount === 1 ? 'diferencia' : 'diferencias'}
        </span>
      </div>
    </div>
  </>;
}
