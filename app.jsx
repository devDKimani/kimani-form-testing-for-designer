// Main Kimani registration flow app
// Step titles come from form-config.js (window.FORM_CONFIG.steps[].title)

// Allow admin preview to override config via localStorage
;(function() {
  try {
    const override = localStorage.getItem('kimani_config_override');
    if (override) window.FORM_CONFIG = JSON.parse(override);
  } catch(e) {}
})();

const STEPS = [
  { key: 'name',       title: 'Your Name',              comp: 'StepName' },
  { key: 'gender',     title: 'Gender',                 comp: 'StepGender' },
  { key: 'phone',      title: 'Phone Number',           comp: 'StepPhone' },
  { key: 'dobAge',     title: 'Date of Birth & Age',    comp: 'StepDOBAge' },
  { key: 'occupation', title: 'Occupation',             comp: 'StepOccupation' },
  { key: 'workType',   title: 'Work Type',              comp: 'StepWorkType' },
  { key: 'country',    title: 'Country',                comp: 'StepCountry' },
  { key: 'social',     title: 'Social Media',           comp: 'StepSocial' },
  { key: 'profilePic', title: 'Profile Picture',        comp: 'StepProfilePic' },
  { key: 'expertise',  title: 'Your Passion',           comp: 'StepExpertise' },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E68A82",
  "background": "#0B0B0B",
  "showProgressBar": true,
  "headerStyle": "serif"
}/*EDITMODE-END*/;

function useTweaks() {
  const [t, setT] = React.useState(TWEAK_DEFAULTS);
  React.useEffect(() => {
    const handler = (e) => {
      const m = e.data;
      if (!m || typeof m !== 'object') return;
      if (m.type === '__activate_edit_mode') setT(s => ({ ...s, __panel: true }));
      if (m.type === '__deactivate_edit_mode') setT(s => ({ ...s, __panel: false }));
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);
  const update = (patch) => {
    setT(s => ({ ...s, ...patch }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
  };
  return [t, update];
}

function TweakPanel({ tweaks, update }) {
  if (!tweaks.__panel) return null;
  const swatches = ['#E68A82', '#C9A26B', '#D4B574', '#8DA58E', '#A3879C', '#E9DCC0'];
  return (
    <div style={{
      position: 'fixed', bottom: 20, right: 20, zIndex: 1000,
      width: 260, padding: 16,
      background: 'rgba(20,20,20,0.95)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255,255,255,0.12)',
      borderRadius: 14, color: '#fff', fontSize: 13,
      boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
    }}>
      <div style={{ fontWeight: 600, marginBottom: 12, letterSpacing: 0.5 }}>Tweaks</div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>Accent</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {swatches.map(c => (
            <div key={c} onClick={() => update({ accent: c })} style={{
              width: 28, height: 28, borderRadius: '50%', background: c, cursor: 'pointer',
              outline: tweaks.accent === c ? '2px solid #fff' : '2px solid transparent', outlineOffset: 2,
            }} />
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>Background</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['#0B0B0B', '#14100E', '#0E1214', '#1A1512'].map(c => (
            <div key={c} onClick={() => update({ background: c })} style={{
              width: 28, height: 28, borderRadius: 6, background: c, cursor: 'pointer',
              border: '1px solid rgba(255,255,255,0.15)',
              outline: tweaks.background === c ? '2px solid #fff' : '2px solid transparent', outlineOffset: 2,
            }} />
          ))}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 11, opacity: 0.6, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.6 }}>Header</div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['serif', 'sans', 'mono'].map(s => (
            <button key={s} onClick={() => update({ headerStyle: s })} style={{
              flex: 1, padding: '6px 8px',
              background: tweaks.headerStyle === s ? '#fff' : 'transparent',
              color: tweaks.headerStyle === s ? '#000' : '#fff',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 6, fontSize: 12, cursor: 'pointer',
              textTransform: 'capitalize', fontFamily: 'inherit',
            }}>{s}</button>
          ))}
        </div>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
        <input type="checkbox" checked={tweaks.showProgressBar}
          onChange={e => update({ showProgressBar: e.target.checked })} />
        <span>Show progress bar</span>
      </label>
    </div>
  );
}

function Header({ tweaks }) {
  const fontFamily = tweaks.headerStyle === 'serif'
    ? 'var(--serif)'
    : tweaks.headerStyle === 'mono'
    ? 'var(--mono)'
    : 'var(--sans)';
  const hc = (window.FORM_CONFIG || {}).header || {};
  return (
    <div style={{ padding: '8px 22px 0', textAlign: 'center' }}>
      <div style={{
        fontFamily, fontSize: 26, fontWeight: 500,
        color: '#fff', letterSpacing: 3,
        textTransform: 'uppercase', lineHeight: 1.1,
      }}>{hc.title || 'Become a Member'}</div>
      <div style={{
        fontSize: 12, color: 'rgba(255,255,255,0.55)',
        marginTop: 8, lineHeight: 1.45, padding: '0 10px',
      }}>
        {hc.subtitle || 'As much details as you provide, you will get more chances to get approved.'}
      </div>
      <button style={{
        marginTop: 12,
        background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.12)',
        color: '#fff', fontSize: 12,
        padding: '7px 14px', borderRadius: 8,
        cursor: 'pointer', fontFamily: 'inherit',
      }}>{hc.backBtn || 'Go back to login'}</button>
    </div>
  );
}

function ProgressBar({ step, total, accent }) {
  return (
    <div style={{ padding: '0 22px', marginTop: 14 }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        fontSize: 11, color: 'rgba(255,255,255,0.5)',
        marginBottom: 6, letterSpacing: 0.5,
      }}>
        <span>Step {step + 1} of {total}</span>
        <span>{Math.round(((step + 1) / total) * 100)}%</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', background: accent,
          width: `${((step + 1) / total) * 100}%`,
          transition: 'width 400ms cubic-bezier(0.2, 0.9, 0.3, 1)',
          borderRadius: 2,
        }} />
      </div>
    </div>
  );
}

function StepTitle({ step, tweaks }) {
  const fontFamily = tweaks.headerStyle === 'serif'
    ? 'var(--serif)'
    : tweaks.headerStyle === 'mono'
    ? 'var(--mono)'
    : 'var(--sans)';
  return (
    <div style={{ padding: '18px 22px 4px', textAlign: 'center' }}>
      <div style={{ fontFamily, fontSize: 21, color: '#fff', fontWeight: 500, letterSpacing: 0.3 }}>
        {((window.FORM_CONFIG?.steps || [])[step] || {}).title || STEPS[step].title}
      </div>
    </div>
  );
}

function App() {
  const [tweaks, updateTweaks] = useTweaks();
  const [step, setStep] = React.useState(() => {
    const saved = parseInt(localStorage.getItem('kimani_step') || '0', 10);
    return Math.min(Math.max(saved, 0), STEPS.length);
  });
  const [data, setData] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('kimani_data') || '{}'); }
    catch { return {}; }
  });
  const [dir, setDir] = React.useState(0);

  React.useEffect(() => { localStorage.setItem('kimani_step', String(step)); }, [step]);
  React.useEffect(() => { localStorage.setItem('kimani_data', JSON.stringify(data)); }, [data]);

  const accent = tweaks.accent;
  const isDone = step >= STEPS.length;
  const isLast = step === STEPS.length - 1;

  const next = () => { setDir(1); setStep(s => Math.min(s + 1, STEPS.length)); };
  const back = () => { setDir(-1); setStep(s => Math.max(s - 1, 0)); };
  const reset = () => { setDir(-1); setStep(0); setData({}); localStorage.removeItem('kimani_step'); localStorage.removeItem('kimani_data'); };

  const canProceed = () => {
    switch (STEPS[step]?.key) {
      case 'name':       return data.name?.first && data.name?.last;
      case 'gender':     return !!data.gender?.value;
      case 'phone':      return !!(data.phone?.number);
      case 'dobAge':     return data.dob?.month && data.dob?.day && !!data.ageGroup?.value;
      case 'occupation': return !!data.occupation?.value;
      case 'workType':   return !!data.workType?.status;
      case 'country':    return !!data.country?.value;
      case 'social':     return (data.social?.selected || []).length > 0;
      case 'profilePic': return !!data.profilePic?.url;
      case 'expertise':  return (data.expertise || []).length > 0;
      default:           return true;
    }
  };

  const StepComp = !isDone ? window[STEPS[step].comp] : window.StepSuccess;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center',
      background: `radial-gradient(1200px 800px at 50% 0%, #1a1412 0%, #0a0909 60%)`,
      padding: 20, position: 'relative',
    }}>
      <TweakPanel tweaks={tweaks} update={updateTweaks} />

      <IOSDevice width={390} height={844} dark={true}>
        <div style={{
          height: '100%', background: tweaks.background,
          display: 'flex', flexDirection: 'column',
          color: '#fff', paddingTop: 54,
        }}>
          <Header tweaks={tweaks} />

          {tweaks.showProgressBar && !isDone && (
            <ProgressBar step={step} total={STEPS.length} accent={accent} />
          )}

          {!isDone && <StepTitle step={step} tweaks={tweaks} />}

          <div style={{
            flex: 1, overflowY: 'auto', overflowX: 'hidden',
            padding: '14px 18px 34px', position: 'relative',
          }}>
            <div
              key={step}
              className="step-anim"
              style={{
                opacity: 1,
                animation: dir === 0
                  ? 'fadeIn 300ms ease both'
                  : dir > 0
                    ? 'slideInR 340ms cubic-bezier(0.2, 0.9, 0.3, 1) both'
                    : 'slideInL 340ms cubic-bezier(0.2, 0.9, 0.3, 1) both',
              }}
            >
              <StepComp data={data} setData={setData} accent={accent} />

              {!isDone && (
                <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
                  <button
                    onClick={next}
                    disabled={!canProceed()}
                    style={{
                      width: '100%', padding: '15px',
                      background: canProceed() ? accent : 'rgba(255,255,255,0.08)',
                      border: 'none',
                      color: canProceed() ? '#fff' : 'rgba(255,255,255,0.35)',
                      borderRadius: 12, fontSize: 15, fontWeight: 600,
                      cursor: canProceed() ? 'pointer' : 'not-allowed',
                      fontFamily: 'inherit', letterSpacing: 0.4,
                      boxShadow: canProceed() ? `0 4px 20px ${accent}44` : 'none',
                      transition: 'all 200ms ease',
                    }}
                  >{isLast ? 'Submit & Continue' : 'Continue'}</button>

                  {step > 0 && (
                    <button
                      onClick={back}
                      style={{
                        background: 'none', border: 'none',
                        color: 'rgba(255,255,255,0.4)',
                        fontSize: 13, cursor: 'pointer',
                        fontFamily: 'inherit', padding: '6px 0',
                        letterSpacing: 0.2,
                      }}
                    >← Go back</button>
                  )}
                </div>
              )}

              {isDone && (
                <div style={{ marginTop: 28, display: 'flex', justifyContent: 'center' }}>
                  <button onClick={reset} style={{
                    background: 'transparent', color: 'rgba(255,255,255,0.6)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '10px 20px', borderRadius: 10,
                    fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
                  }}>Start a new application</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </IOSDevice>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
