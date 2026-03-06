'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './CalculatorClient.module.css';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select';
  required?: boolean;
  placeholder?: string;
  unit?: string;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}
interface ResultField { key: string; label: string; unit?: string; }
interface Props {
  apiEndpoint: string;
  fields: Field[];
  resultFields: ResultField[];
  buttonText: string;
}

const navBtn: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 6, color: '#e8e4df', width: 28, height: 28, cursor: 'pointer',
  fontSize: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
};
const miniSel: React.CSSProperties = {
  flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 6, color: '#e8e4df', padding: '4px 6px', fontSize: 12,
  cursor: 'pointer', appearance: 'none' as any,
};

function CalendarPicker({
  id, value, onChange, required, placeholder = '日付を選択',
}: {
  id: string; value: string; onChange: (v: string) => void;
  required?: boolean; placeholder?: string;
}) {
  const now   = new Date();
  const ymd   = /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : '';
  const parts = ymd ? ymd.split('-').map(Number) : null;

  const [vy, setVy] = useState(parts ? parts[0] : now.getFullYear() - 30);
  const [vm, setVm] = useState(parts ? parts[1] - 1 : now.getMonth());
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const fn = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [open]);

  const totalDays  = new Date(vy, vm + 1, 0).getDate();
  const startDay   = new Date(vy, vm, 1).getDay();
  const years      = Array.from({ length: now.getFullYear() - 1899 }, (_, i) => now.getFullYear() - i);
  const monthNames = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'];

  const pick = (d: number) => {
    const m = String(vm + 1).padStart(2, '0');
    const day = String(d).padStart(2, '0');
    onChange(`${vy}-${m}-${day}`);
    setOpen(false);
  };

  const prevM = () => vm === 0 ? (setVm(11), setVy(y => y - 1)) : setVm(m => m - 1);
  const nextM = () => vm === 11 ? (setVm(0), setVy(y => y + 1)) : setVm(m => m + 1);
  const noNext = vy === now.getFullYear() && vm === now.getMonth();
  const display = parts ? `${parts[0]}年${parts[1]}月${parts[2]}日` : '';
  const isSel = (d: number) => !!parts && parts[0] === vy && parts[1] - 1 === vm && parts[2] === d;
  const isNow = (d: number) => now.getFullYear() === vy && now.getMonth() === vm && now.getDate() === d;

  return (
    <div ref={wrap} style={{ position: 'relative' }}>
      <div className={styles.inputWrap} onClick={() => setOpen(o => !o)} style={{ cursor: 'pointer' }}>
        <input
          id={id} readOnly required={required} value={display} placeholder={placeholder}
          className={styles.input}
          style={{ cursor: 'pointer', paddingRight: 48, caretColor: 'transparent', userSelect: 'none' }}
        />
        <span className={styles.unit} style={{ fontSize: 18 }}>📅</span>
      </div>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 8px)', left: 0, zIndex: 300,
          background: '#1a1a28', border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 14, padding: 18, width: 280,
          boxShadow: '0 24px 64px rgba(0,0,0,0.7)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            <button type="button" onClick={prevM} style={navBtn}>‹</button>
            <select value={vm} onChange={e => setVm(+e.target.value)} style={miniSel}>
              {monthNames.map((n, i) => <option key={i} value={i}>{n}</option>)}
            </select>
            <select value={vy} onChange={e => setVy(+e.target.value)} style={{ ...miniSel, width: 72 }}>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <button type="button" onClick={nextM} disabled={noNext} style={navBtn}>›</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2, marginBottom: 4 }}>
            {['日','月','火','水','木','金','土'].map((d, i) => (
              <div key={d} style={{ textAlign: 'center', fontSize: 9, padding: '2px 0',
                color: i === 0 ? '#e87474' : i === 6 ? '#74a8e8' : '#8a8680' }}>
                {d}
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 2 }}>
            {Array(startDay).fill(null).map((_, i) => <div key={`x${i}`} />)}
            {Array.from({ length: totalDays }, (_, i) => i + 1).map(d => {
              const col = (startDay + d - 1) % 7;
              const sel = isSel(d), tod = isNow(d);
              return (
                <button key={d} type="button" onClick={() => pick(d)} style={{
                  border: tod && !sel ? '1px solid rgba(201,169,110,0.5)' : 'none',
                  borderRadius: 7, padding: '5px 2px', fontSize: 12, cursor: 'pointer',
                  background: sel ? 'linear-gradient(135deg,#e8624a,#c8432a)' : 'transparent',
                  color: sel ? '#fff' : col === 0 ? '#e87474' : col === 6 ? '#74a8e8' : '#e8e4df',
                  fontWeight: sel || tod ? 700 : 400,
                }}>{d}</button>
              );
            })}
          </div>

          <button type="button" onClick={() => {
            setVy(now.getFullYear()); setVm(now.getMonth()); pick(now.getDate());
          }} style={{
            marginTop: 10, width: '100%', padding: 7,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 8, color: '#8a8680', fontSize: 11, cursor: 'pointer', letterSpacing: '0.08em',
          }}>今日</button>
        </div>
      )}
    </div>
  );
}

/* ── Main Calculator Component ── */
export default function CalculatorClient({ apiEndpoint, fields, resultFields, buttonText }: Props) {
  const [formData,  setFormData]  = useState<Record<string, string>>(() => {
    const init: Record<string, string> = {};
    fields.forEach(f => { if (f.defaultValue !== undefined) init[f.name] = f.defaultValue; });
    return init;
  });
  const [result,    setResult]    = useState<Record<string, any> | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const set = (name: string, val: string) => setFormData(p => ({ ...p, [name]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null); setSubmitted(false);
    try {
      const body: Record<string, any> = {};
      fields.forEach(f => {
        const v = formData[f.name];
        if (v !== undefined && v !== '') body[f.name] = f.type === 'number' ? parseFloat(v) : v;
      });

      // ── URL resolution ──────────────────────────────────────────
      // Priority: NEXT_PUBLIC_API_URL env var (set in .env.local)
      // If not set, use apiEndpoint as-is (allows absolute URLs in prod)
      const apiBase = process.env.NEXT_PUBLIC_API_URL;
      let endpoint: string;

      if (apiBase) {
        // Strip any hardcoded origin from apiEndpoint, then prepend env base
        const pathOnly = apiEndpoint.replace(/^https?:\/\/[^/]+/, '');
        endpoint = `${apiBase.replace(/\/$/, '')}${pathOnly}`;
      } else {
        // Use apiEndpoint directly — must be an absolute URL in production
        endpoint = apiEndpoint;
      }
      // ────────────────────────────────────────────────────────────

      const res  = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      // Guard: if response is not JSON, surface a clear error
      const contentType = res.headers.get('content-type') ?? '';
      if (!contentType.includes('application/json')) {
        throw new Error(`サーバーエラー（${res.status}）: APIサーバーが起動していることを確認してください`);
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || '計算に失敗しました');
      setResult(data); setSubmitted(true);
    } catch (err: any) {
      setError(err.message || '計算中にエラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  const dateFields  = fields.filter(f => f.type === 'date');
  const otherFields = fields.filter(f => f.type !== 'date');

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <form onSubmit={submit} className={styles.form} noValidate>

          {dateFields.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: dateFields.length === 2 ? '1fr 1fr' : '1fr', gap: 16 }}>
              {dateFields.map(f => (
                <div key={f.name} className={styles.field} style={{ padding: '12px 0' }}>
                  <label htmlFor={f.name} className={styles.label}>
                    {f.required && <span className={styles.labelReq} aria-hidden="true" />}
                    {f.label}
                  </label>
                  <CalendarPicker
                    id={f.name}
                    value={formData[f.name] ?? ''}
                    onChange={v => set(f.name, v)}
                    required={f.required}
                    placeholder={f.placeholder ?? '日付を選択'}
                  />
                </div>
              ))}
            </div>
          )}

          {otherFields.map(f => (
            <div key={f.name}>
              <div className={styles.divider} />
              <div className={styles.field}>
                <label htmlFor={f.name} className={styles.label}>
                  {f.required && <span className={styles.labelReq} aria-hidden="true" />}
                  {f.label}
                </label>
                {f.type === 'select' && f.options ? (
                  <div className={styles.selectWrap}>
                    <select id={f.name} value={formData[f.name] || ''} onChange={e => set(f.name, e.target.value)}
                      required={f.required} className={styles.select}>
                      <option value="" disabled>選択してください</option>
                      {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                ) : (
                  <div className={styles.inputWrap}>
                    <input id={f.name} type={f.type} value={formData[f.name] || ''}
                      onChange={e => set(f.name, e.target.value)} placeholder={f.placeholder}
                      required={f.required}
                      className={`${styles.input}${f.unit ? ` ${styles.inputHasUnit}` : ''}`}
                      inputMode={f.type === 'number' ? 'decimal' : undefined}
                      step={f.type === 'number' ? 'any' : undefined} />
                    {f.unit && <span className={styles.unit}>{f.unit}</span>}
                  </div>
                )}
              </div>
            </div>
          ))}

          <div className={styles.divider} style={{ marginTop: 8 }} />

          <button type="submit" disabled={loading} className={styles.btn}>
            <span className={styles.btnInner}>
              {loading ? <><span className={styles.spinner} />計算中…</> : <>{buttonText}<span className={styles.arrow}>→</span></>}
            </span>
          </button>
        </form>

        {error && (
          <div className={styles.errorBox} role="alert">
            <span className={styles.errorIcon}>⚠</span>
            <div><p className={styles.errorTitle}>エラー</p><p className={styles.errorMsg}>{error}</p></div>
          </div>
        )}

        {result && submitted && (
          <div className={styles.result} role="region" aria-label="計算結果">
            <div className={styles.resultHeader}><span className={styles.resultDot} />計算結果</div>
            <div className={styles.resultBody}>
              {resultFields.map(f => {
                const v = result[f.key];
                if (v === undefined || v === null) return null;
                const isNum = typeof v === 'number';
                return (
                  <div key={f.key} className={styles.resultRow}>
                    <span className={styles.resultKey}>{f.label}</span>
                    <span className={`${styles.resultVal}${!isNum ? ` ${styles.resultValString}` : ''}`}>
                      {isNum ? v.toLocaleString('ja-JP') : v}
                      {isNum && f.unit && <span className={styles.resultUnit}>{f.unit}</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}