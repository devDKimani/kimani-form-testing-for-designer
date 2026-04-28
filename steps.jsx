// Step components for the Kimani registration flow
// All user-facing text comes from window.FORM_CONFIG (form-config.js).
// Each step receives: { data, setData, accent }

const FIELD_BG = 'rgba(255,255,255,0.04)';
const FIELD_BORDER = 'rgba(255,255,255,0.10)';
const FIELD_BORDER_FOCUS = 'rgba(255,255,255,0.35)';
const LABEL = 'rgba(255,255,255,0.72)';
const HINT = 'rgba(255,255,255,0.42)';
const CARD_BG = 'rgba(255,255,255,0.035)';
const CARD_BORDER = 'rgba(255,255,255,0.08)';

// Shortcut: get config for a step by key
function stepCfg(key) {
  return (window.FORM_CONFIG.steps || []).find(s => s.key === key) || {};
}

function Label({ children, required }) {
  return (
    <div style={{ fontSize: 13, color: LABEL, marginBottom: 8, fontWeight: 500, letterSpacing: 0.1 }}>
      {children}{required && <span style={{ color: '#F28B82', marginLeft: 2 }}>*</span>}
    </div>
  );
}

function TextField({ value, onChange, placeholder, type = 'text' }) {
  const [focus, setFocus] = React.useState(false);
  return (
    <input
      type={type}
      value={value || ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      style={{
        width: '100%', boxSizing: 'border-box',
        background: FIELD_BG,
        border: `1px solid ${focus ? FIELD_BORDER_FOCUS : FIELD_BORDER}`,
        borderRadius: 10, padding: '12px 14px',
        color: '#fff', fontSize: 15, fontFamily: 'inherit',
        outline: 'none', transition: 'border-color 150ms ease',
      }}
    />
  );
}

function Select({ value, onChange, options, placeholder }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef();
  React.useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%', boxSizing: 'border-box',
          background: FIELD_BG,
          border: `1px solid ${open ? FIELD_BORDER_FOCUS : FIELD_BORDER}`,
          borderRadius: 10, padding: '12px 14px',
          color: value ? '#fff' : HINT, fontSize: 15,
          textAlign: 'left', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          fontFamily: 'inherit',
        }}
      >
        <span>{value || placeholder}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 180ms ease' }}>
          <path d="M1 1l5 5 5-5" stroke="rgba(255,255,255,0.6)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
          background: '#1a1a1a', border: `1px solid ${FIELD_BORDER}`,
          borderRadius: 10, zIndex: 10,
          boxShadow: '0 12px 32px rgba(0,0,0,0.6)',
          maxHeight: 240, overflow: 'auto',
        }}>
          {options.map(opt => (
            <div
              key={opt}
              onClick={() => { onChange(opt); setOpen(false); }}
              style={{
                padding: '11px 14px', color: '#fff', fontSize: 15,
                cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >{opt}</div>
          ))}
        </div>
      )}
    </div>
  );
}

function Check({ checked, onToggle, label, accent }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '11px 4px', cursor: 'pointer', userSelect: 'none' }}>
      <div style={{
        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
        background: checked ? accent : 'transparent',
        border: `1.5px solid ${checked ? accent : 'rgba(255,255,255,0.3)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 150ms ease',
      }}>
        {checked && (
          <svg width="11" height="9" viewBox="0 0 11 9">
            <path d="M1 4.5l3 3 6-6" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <div style={{ color: '#fff', fontSize: 14.5, lineHeight: 1.45, flex: 1 }}>{label}</div>
    </div>
  );
}

function Radio({ checked, onSelect, label, accent }) {
  return (
    <div onClick={onSelect} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 4px', cursor: 'pointer', userSelect: 'none' }}>
      <div style={{
        width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
        border: `1.5px solid ${checked ? accent : 'rgba(255,255,255,0.3)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 150ms ease',
      }}>
        {checked && <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} />}
      </div>
      <div style={{ color: '#fff', fontSize: 14.5, flex: 1 }}>{label}</div>
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div style={{ background: CARD_BG, border: `1px solid ${CARD_BORDER}`, borderRadius: 14, padding: 16, ...style }}>
      {children}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Phone — same mechanic as Kimani-Frontend (libphonenumber-js)
// Stores: { country: "+1", number: "6454446116" }
// ──────────────────────────────────────────────────────────────

// Flag emoji from ISO-2 code (e.g. "US" → 🇺🇸)
function isoToFlag(iso) {
  return iso.toUpperCase().split('').map(c =>
    String.fromCodePoint(c.charCodeAt(0) + 0x1F1A5)
  ).join('');
}

const COUNTRIES = [
  ['US','United States','+1'],['GB','United Kingdom','+44'],['CA','Canada','+1'],
  ['AU','Australia','+61'],['DE','Germany','+49'],['FR','France','+33'],
  ['ES','Spain','+34'],['IT','Italy','+39'],['BR','Brazil','+55'],
  ['MX','Mexico','+52'],['JP','Japan','+81'],['KR','South Korea','+82'],
  ['CN','China','+86'],['IN','India','+91'],['AE','UAE','+971'],
  ['SA','Saudi Arabia','+966'],['ZA','South Africa','+27'],['NG','Nigeria','+234'],
  ['KE','Kenya','+254'],['EG','Egypt','+20'],['RU','Russia','+7'],
  ['SG','Singapore','+65'],['MY','Malaysia','+60'],['TH','Thailand','+66'],
  ['NZ','New Zealand','+64'],['NL','Netherlands','+31'],['SE','Sweden','+46'],
  ['NO','Norway','+47'],['DK','Denmark','+45'],['CH','Switzerland','+41'],
  ['AT','Austria','+43'],['BE','Belgium','+32'],['PT','Portugal','+351'],
  ['GR','Greece','+30'],['PL','Poland','+48'],['UA','Ukraine','+380'],
  ['TR','Turkey','+90'],['IL','Israel','+972'],['ID','Indonesia','+62'],
  ['PH','Philippines','+63'],['VN','Vietnam','+84'],['CL','Chile','+56'],
  ['CO','Colombia','+57'],['AR','Argentina','+54'],['PE','Peru','+51'],
  ['VE','Venezuela','+58'],['PK','Pakistan','+92'],['BD','Bangladesh','+880'],
  ['GH','Ghana','+233'],['TZ','Tanzania','+255'],['ET','Ethiopia','+251'],
].map(([iso, name, dial]) => ({ iso, name, dial, flag: isoToFlag(iso) }));

function PhoneInput({ value, onChange }) {
  // value shape: { country: "+1", number: "6454446116" }
  const [selectedCountry, setSelectedCountry] = React.useState(
    COUNTRIES.find(c => c.iso === 'US')
  );
  const [numberInput, setNumberInput] = React.useState(value?.number || '');
  const [dropOpen, setDropOpen] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const [valid, setValid] = React.useState(null); // null | true | false
  const [focusNum, setFocusNum] = React.useState(false);
  const dropRef = React.useRef();
  const lib = window.libphonenumber;

  // Close dropdown on outside click
  React.useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Sync external value → local state (e.g. on reset)
  React.useEffect(() => {
    if (!value?.number && numberInput) { setNumberInput(''); setValid(null); }
  }, [value]);

  const filtered = search
    ? COUNTRIES.filter(c =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.dial.includes(search) ||
        c.iso.toLowerCase().includes(search.toLowerCase())
      )
    : COUNTRIES;

  const handleNumberChange = (raw) => {
    setNumberInput(raw);
    if (!raw) { setValid(null); onChange({ country: selectedCountry.dial, number: '' }); return; }

    const full = selectedCountry.dial + raw.replace(/\s/g, '');
    let isValid = null;
    let national = raw.replace(/\s/g, '');

    if (lib) {
      try {
        const parsed = lib.parsePhoneNumber(full);
        if (parsed) {
          isValid = lib.isValidPhoneNumber(full);
          national = parsed.nationalNumber;
        }
      } catch(e) { isValid = false; }
    }

    setValid(isValid);
    onChange({ country: selectedCountry.dial, number: national });
  };

  const handleCountrySelect = (c) => {
    setSelectedCountry(c);
    setDropOpen(false);
    setSearch('');
    // Re-validate with new country
    if (numberInput) {
      const full = c.dial + numberInput.replace(/\s/g, '');
      if (lib) {
        try { setValid(lib.isValidPhoneNumber(full)); } catch(e) { setValid(false); }
      }
      onChange({ country: c.dial, number: numberInput.replace(/\s/g, '') });
    }
  };

  const borderColor = valid === true
    ? '#6FCF8A'
    : valid === false && numberInput
    ? '#F28B82'
    : focusNum ? FIELD_BORDER_FOCUS : FIELD_BORDER;

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        {/* Country selector */}
        <div ref={dropRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button
            type="button"
            onClick={() => setDropOpen(o => !o)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '12px 10px', height: '100%',
              background: FIELD_BG,
              border: `1px solid ${dropOpen ? FIELD_BORDER_FOCUS : FIELD_BORDER}`,
              borderRadius: 10, cursor: 'pointer', color: '#fff',
              fontSize: 14, fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}
          >
            <span style={{ fontSize: 18 }}>{selectedCountry.flag}</span>
            <span style={{ color: LABEL }}>{selectedCountry.dial}</span>
            <svg width="10" height="6" viewBox="0 0 10 6" style={{ transform: dropOpen ? 'rotate(180deg)' : 'none', transition: 'transform 150ms' }}>
              <path d="M1 1l4 4 4-4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
            </svg>
          </button>

          {dropOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0,
              width: 260, background: '#1a1a1a',
              border: `1px solid ${FIELD_BORDER}`, borderRadius: 10,
              zIndex: 50, boxShadow: '0 12px 32px rgba(0,0,0,0.7)',
              overflow: 'hidden',
            }}>
              {/* Search */}
              <div style={{ padding: '10px 12px', borderBottom: `1px solid ${FIELD_BORDER}` }}>
                <input
                  autoFocus
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search country…"
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.06)',
                    border: `1px solid ${FIELD_BORDER}`, borderRadius: 7,
                    padding: '8px 10px', color: '#fff', fontSize: 13,
                    fontFamily: 'inherit', outline: 'none',
                  }}
                />
              </div>
              {/* List */}
              <div style={{ maxHeight: 200, overflowY: 'auto' }}>
                {filtered.map(c => (
                  <div
                    key={c.iso}
                    onClick={() => handleCountrySelect(c)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10,
                      padding: '10px 14px', cursor: 'pointer',
                      background: c.iso === selectedCountry.iso ? 'rgba(255,255,255,0.07)' : 'transparent',
                      borderBottom: `1px solid rgba(255,255,255,0.03)`,
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => e.currentTarget.style.background = c.iso === selectedCountry.iso ? 'rgba(255,255,255,0.07)' : 'transparent'}
                  >
                    <span style={{ fontSize: 18 }}>{c.flag}</span>
                    <span style={{ flex: 1, fontSize: 13, color: '#fff' }}>{c.name}</span>
                    <span style={{ fontSize: 12, color: HINT }}>{c.dial}</span>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div style={{ padding: '16px', fontSize: 13, color: HINT, textAlign: 'center' }}>No results</div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Number input */}
        <input
          type="tel"
          value={numberInput}
          onChange={e => handleNumberChange(e.target.value)}
          placeholder="645 444 6116"
          onFocus={() => setFocusNum(true)}
          onBlur={() => setFocusNum(false)}
          style={{
            flex: 1, background: FIELD_BG,
            border: `1px solid ${borderColor}`,
            borderRadius: 10, padding: '12px 14px',
            color: '#fff', fontSize: 15, fontFamily: 'inherit',
            outline: 'none', transition: 'border-color 150ms ease',
          }}
        />
      </div>

      {/* Validation feedback */}
      <div style={{ fontSize: 11.5, marginTop: 6, color: valid === true ? '#6FCF8A' : valid === false && numberInput ? '#F28B82' : HINT }}>
        {valid === true
          ? `✓ Valid number · ${selectedCountry.name} (${selectedCountry.dial})`
          : valid === false && numberInput
          ? '✗ Invalid number for this country'
          : 'Select your country then enter your number'
        }
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 1 — First & Last Name
// ══════════════════════════════════════════════════════════════
function StepName({ data, setData }) {
  const d = data.name || {};
  const set = (k, v) => setData({ ...data, name: { ...d, [k]: v } });
  const cfg = stepCfg('name');
  const f = cfg.fields || {};
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: LABEL, fontWeight: 500 }}>{f.first?.label || 'First Name'}</div>
          <div style={{ fontSize: 11, color: HINT }}>{f.first?.hint || '(must match your ID)'}</div>
        </div>
        <TextField value={d.first} onChange={v => set('first', v)} placeholder={f.first?.placeholder || 'First name'} />
      </Card>
      <Card>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
          <div style={{ fontSize: 13, color: LABEL, fontWeight: 500 }}>{f.last?.label || 'Last Name'}</div>
          <div style={{ fontSize: 11, color: HINT }}>{f.last?.hint || '(must match your ID)'}</div>
        </div>
        <TextField value={d.last} onChange={v => set('last', v)} placeholder={f.last?.placeholder || 'Last name'} />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 2 — Gender
// ══════════════════════════════════════════════════════════════
function StepGender({ data, setData, accent }) {
  const d = data.gender || {};
  const cfg = stepCfg('gender');
  const opts = cfg.options || ['Male', 'Female'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        {opts.map(opt => (
          <Radio key={opt} accent={accent} checked={d.value === opt} onSelect={() => setData({ ...data, gender: { value: opt } })} label={opt} />
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 3 — Phone Number  (mechanics = Kimani-Frontend)
// ══════════════════════════════════════════════════════════════
function StepPhone({ data, setData }) {
  const cfg = stepCfg('phone');
  // data.phone shape: { country: "+1", number: "6454446116" }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        <Label required>{cfg.label || 'Phone Number'}</Label>
        <PhoneInput
          value={data.phone || {}}
          onChange={v => setData({ ...data, phone: v })}
        />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 4 — Date of Birth + Age Group (merged)
// ══════════════════════════════════════════════════════════════
function StepDOBAge({ data, setData, accent }) {
  const dob = data.dob || {};
  const setDob = (k, v) => setData({ ...data, dob: { ...dob, [k]: v } });
  const cfgDob = stepCfg('dob');
  const cfgAge = stepCfg('ageGroup');
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const ageOpts = cfgAge.options || ['18 to 25','26 to 35','36 to 45','46 to 55','56 and above'];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        <Label required>{cfgDob.label || 'Date of Birth'}</Label>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 2 }}>
            <Select value={dob.month} onChange={v => setDob('month', v)} options={months} placeholder={cfgDob.placeholderMonth || 'Month'} />
          </div>
          <div style={{ flex: 1 }}>
            <Select value={dob.day} onChange={v => setDob('day', v)} options={days} placeholder={cfgDob.placeholderDay || 'Day'} />
          </div>
        </div>
      </Card>
      <Card>
        <Label required>{cfgAge.title || 'Age Group'}</Label>
        {ageOpts.map(opt => (
          <Radio
            key={opt} accent={accent}
            checked={(data.ageGroup || {}).value === opt}
            onSelect={() => setData({ ...data, ageGroup: { value: opt } })}
            label={opt}
          />
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 6 — Occupation
// ══════════════════════════════════════════════════════════════
function StepOccupation({ data, setData }) {
  const cfg = stepCfg('occupation');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        <Label required>{cfg.label || 'Occupation'}</Label>
        <TextField
          value={(data.occupation || {}).value}
          onChange={v => setData({ ...data, occupation: { value: v } })}
          placeholder={cfg.placeholder || 'e.g. Software Engineer…'}
        />
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 7 — Work Type
// ══════════════════════════════════════════════════════════════
function StepWorkType({ data, setData, accent }) {
  const d = data.workType || {};
  const set = (k, v) => setData({ ...data, workType: { ...d, [k]: v } });
  const cfg = stepCfg('workType');
  const opts = cfg.options || [];
  const subFields = cfg.subFields || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        {opts.map(opt => (
          <Radio key={opt.key} accent={accent} checked={d.status === opt.key} onSelect={() => set('status', opt.key)} label={opt.label} />
        ))}

        {d.status && subFields[d.status] && (
          <div style={{ marginTop: 12, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {subFields[d.status].map(field => (
              <div key={field.key}>
                <Label>{field.label}</Label>
                <TextField value={d[field.key]} onChange={v => set(field.key, v)} placeholder={field.placeholder} />
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 8 — Country
// ══════════════════════════════════════════════════════════════
function StepCountry({ data, setData, accent }) {
  const d = data.country || {};
  const set = (k, v) => setData({ ...data, country: { ...d, [k]: v } });
  const cfg = stepCfg('country');
  const opts = cfg.options || [];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <Card>
        {opts.map(opt => (
          <Radio key={opt} accent={accent} checked={d.value === opt} onSelect={() => set('value', opt)} label={opt} />
        ))}
        {d.value === 'Other' && (
          <div style={{ marginTop: 12, paddingTop: 14, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <Label>{cfg.otherLabel || 'Your country'}</Label>
            <TextField value={d.otherCountry} onChange={v => set('otherCountry', v)} placeholder={cfg.otherPlaceholder || 'Country name'} />
          </div>
        )}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 9 — Social Media
// ══════════════════════════════════════════════════════════════
function StepSocial({ data, setData, accent }) {
  const d = data.social || { selected: [], usernames: {}, otherPlatform: '' };
  const setD = (patch) => setData({ ...data, social: { ...d, ...patch } });
  const cfg = stepCfg('social');
  const platforms = cfg.platforms || ['Instagram', 'LinkedIn', 'Twitter / X', 'Facebook', 'TikTok', 'Other'];

  const togglePlatform = (platform) => {
    const sel = d.selected || [];
    const isOn = sel.includes(platform);
    const next = isOn ? sel.filter(p => p !== platform) : [...sel, platform];
    const usernames = { ...d.usernames };
    if (isOn) delete usernames[platform];
    setD({ selected: next, usernames });
  };
  const setUsername = (platform, val) => setD({ usernames: { ...d.usernames, [platform]: val } });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 13, color: HINT, marginBottom: -4 }}>{cfg.hint || 'Select all that apply'}</div>
      {platforms.map(platform => {
        const isSelected = (d.selected || []).includes(platform);
        return (
          <Card key={platform}>
            <Check accent={accent} checked={isSelected} onToggle={() => togglePlatform(platform)} label={platform} />
            {isSelected && (
              <div style={{ marginTop: 10, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {platform === 'Other' && (
                  <div style={{ marginBottom: 10 }}>
                    <Label>{cfg.otherPlatformLabel || 'Platform name'}</Label>
                    <TextField value={d.otherPlatform} onChange={v => setD({ otherPlatform: v })} placeholder={cfg.otherPlatformPlaceholder || 'e.g. Threads…'} />
                  </div>
                )}
                <Label>Username</Label>
                <TextField value={(d.usernames || {})[platform]} onChange={v => setUsername(platform, v)} placeholder={cfg.usernamePlaceholder || '@username'} />
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 10 — Profile Picture
// ══════════════════════════════════════════════════════════════
function StepProfilePic({ data, setData, accent }) {
  const d = data.profilePic || {};
  const fileRef = React.useRef();
  const cfg = stepCfg('profilePic');
  const onPick = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setData({ ...data, profilePic: { url: URL.createObjectURL(file), name: file.name } });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ fontSize: 13, color: HINT }}>{cfg.hint || 'Face only — clear, recent photo'}</div>
      <div style={{
        border: `2px dashed ${accent}66`, borderRadius: 18, padding: 24,
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
        background: 'rgba(242,139,130,0.04)',
      }}>
        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          border: `3px solid ${accent}`, overflow: 'hidden', background: '#0a0a0a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {d.url
            ? <img src={d.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="24" r="11" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                <path d="M12 56c2-11 10-18 20-18s18 7 20 18" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round"/>
              </svg>
          }
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onPick} />
        <button onClick={() => fileRef.current.click()} style={{
          background: accent, color: '#fff', border: 'none',
          borderRadius: 10, padding: '12px 24px', fontSize: 15, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit', boxShadow: '0 4px 12px rgba(242,139,130,0.3)',
        }}>{d.url ? (cfg.btnChange || 'Change Photo') : (cfg.btnUpload || 'Upload Photo')}</button>
        <div style={{ fontSize: 12, color: HINT, textAlign: 'center' }}>{cfg.meta || 'Maximum File Size: 10MB · Recommended: Square image'}</div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// STEP 11 — Expertise & Passion
// ══════════════════════════════════════════════════════════════
function StepExpertise({ data, setData, accent }) {
  const cfg = stepCfg('expertise');
  const options = cfg.options || [];
  const allOpt = 'All of the above';
  const selected = data.expertise || [];
  const toggle = (opt) => {
    let next;
    if (opt === allOpt) {
      next = selected.includes(opt) ? [] : [...options];
    } else {
      next = selected.includes(opt)
        ? selected.filter(o => o !== opt && o !== allOpt)
        : [...selected.filter(o => o !== allOpt), opt];
    }
    setData({ ...data, expertise: next });
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {cfg.hint && <div style={{ fontSize: 13, color: HINT }}>{cfg.hint}</div>}
      <Card>
        {options.map(opt => (
          <Check key={opt} accent={accent} checked={selected.includes(opt)} onToggle={() => toggle(opt)} label={opt} />
        ))}
      </Card>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// Approval score (mirrors quest chapter reward system)
// ══════════════════════════════════════════════════════════════
function calcAcceptance(data) {
  let score = 0;

  // Identity block (Chapter I)
  if (data.name?.first && data.name?.last) score += 8;
  if (data.gender?.value)                  score += 4;
  if (data.phone?.value)                   score += 8;
  if (data.dob?.month && data.dob?.day)    score += 6;

  // Demographics
  if (data.ageGroup?.value) score += 5;
  if (data.country?.value)  score += 5;

  // Vocation block (Chapter II)
  if (data.occupation?.value) score += 6;
  if (data.workType?.status) {
    score += 8;
    const wt = data.workType;
    if (wt.status === 'company'    && wt.companyName)   score += 4;
    if (wt.status === 'owner'      && wt.bizName)       score += 4;
    if (wt.status === 'freelancer' && wt.portfolio)     score += 4;
    if (wt.status === 'student'    && wt.university)    score += 4;
  }

  // Presence block (Chapter III)
  const socWithUser = (data.social?.selected || []).filter(p => (data.social?.usernames || {})[p]?.trim());
  score += Math.min(socWithUser.length * 4, 12);

  // Portrait (Chapter IV)
  if (data.profilePic?.url) score += 15;

  // Passions (Chapter V)
  const expSelected = (data.expertise || []).filter(e => e !== 'All of the above');
  score += Math.min(expSelected.length * 3, 12);

  return Math.min(score, 100);
}

function AcceptanceRing({ pct, accent }) {
  const r = 44;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#6FCF8A' : pct >= 55 ? accent : '#E8B86A';
  const label = pct >= 80 ? 'Strong' : pct >= 55 ? 'Good' : 'Fair';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <div style={{ position: 'relative', width: 108, height: 108 }}>
        <svg width="108" height="108" viewBox="0 0 108 108" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="54" cy="54" r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="6" />
          <circle cx="54" cy="54" r={r} fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s cubic-bezier(0.2,0.9,0.3,1)' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, color, lineHeight: 1 }}>{pct}%</div>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.45)', letterSpacing: 0.5, marginTop: 2, textTransform: 'uppercase' }}>{label}</div>
        </div>
      </div>
      <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)', letterSpacing: 0.3 }}>
        {(window.FORM_CONFIG.success || {}).approvalLabel || 'Approval chances'}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// SUCCESS
// ══════════════════════════════════════════════════════════════
function StepSuccess({ data, accent }) {
  const d = data.name || {};
  const ref = React.useRef(Math.floor(Math.random() * 900000 + 100000));
  const pct = calcAcceptance(data);
  const sc = window.FORM_CONFIG.success || {};
  const line1 = d.first
    ? (sc.line1 || '{name}, the committee shall deliberate in the coming week.').replace('{name}', d.first)
    : (sc.line1Fallback || 'The committee shall deliberate in the coming week.');
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingTop: 36, textAlign: 'center' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: `${accent}22`, border: `2px solid ${accent}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="32" height="32" viewBox="0 0 40 40">
          <path d="M10 20l7 7 13-14" stroke={accent} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: 26, color: '#fff', letterSpacing: 1.5, textTransform: 'uppercase' }}>
        {sc.title || 'Application Received'}
      </div>
      <AcceptanceRing pct={pct} accent={accent} />
      <div style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, padding: '0 16px', fontFamily: 'var(--serif)', letterSpacing: 0.3 }}>
        {line1}
      </div>
      <div style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.5)', lineHeight: 1.65, padding: '0 16px', fontStyle: 'italic' }}>
        {sc.line2 || 'A sealed letter will arrive by the methods you have provided.'}
      </div>
      <div style={{
        marginTop: 8, padding: '14px 20px',
        background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12, fontSize: 12.5, color: 'rgba(255,255,255,0.42)', letterSpacing: 0.4,
      }}>{sc.refPrefix || 'REFERENCE · KMN-'}{ref.current}</div>
    </div>
  );
}

Object.assign(window, {
  StepName, StepGender, StepPhone, StepDOBAge,
  StepOccupation, StepWorkType, StepCountry, StepSocial,
  StepProfilePic, StepExpertise, StepSuccess,
});
