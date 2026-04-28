// ─────────────────────────────────────────────────────────────────────────────
//  KIMANI FORM CONFIG
//  Edit this file to change any label, hint, option, or placeholder.
//  No code knowledge required — just text.
// ─────────────────────────────────────────────────────────────────────────────

window.FORM_CONFIG = {

  // ── Header (top of every screen) ──────────────────────────────────────────
  header: {
    title:    'Become a Member',
    subtitle: 'As much details as you provide, you will get more chances to get approved.',
    backBtn:  'Go back to login',
  },

  // ── Final screen ──────────────────────────────────────────────────────────
  success: {
    title:   'Application Received',
    line1:   '{name}, the committee shall deliberate in the coming week.',  // {name} is replaced with first name
    line1Fallback: 'The committee shall deliberate in the coming week.',    // used when no name
    line2:   'A sealed letter will arrive by the methods you have provided.',
    refPrefix: 'REFERENCE · KMN-',
    approvalLabel: 'Approval chances',
  },

  // ── Steps ─────────────────────────────────────────────────────────────────
  steps: [

    // 1 · Name ───────────────────────────────────────────────────────────────
    {
      key:   'name',
      title: 'Your Name',
      fields: {
        first: {
          label:       'First Name',
          hint:        '(must match your ID)',
          placeholder: 'Diego',
        },
        last: {
          label:       'Last Name',
          hint:        '(must match your ID)',
          placeholder: 'Duran',
        },
      },
    },

    // 2 · Gender ─────────────────────────────────────────────────────────────
    {
      key:   'gender',
      title: 'Gender',
      options: ['Male', 'Female'],
    },

    // 3 · Phone ──────────────────────────────────────────────────────────────
    {
      key:   'phone',
      title: 'Phone Number',
      label:       'Phone Number',
      placeholder: '+1 645 444 6116',
      hint:        'Type your number with country code (e.g. +1 for US, +44 for UK)',
    },

    // 4 · Date of Birth ──────────────────────────────────────────────────────
    {
      key:   'dob',
      title: 'Date of Birth',
      label: 'Date of Birth',
      placeholderMonth: 'Month',
      placeholderDay:   'Day',
    },

    // 5 · Age Group ──────────────────────────────────────────────────────────
    {
      key:   'ageGroup',
      title: 'Age Group',
      options: [
        '18 to 25',
        '26 to 35',
        '36 to 45',
        '46 to 55',
        '56 and above',
      ],
    },

    // 6 · Occupation ─────────────────────────────────────────────────────────
    {
      key:   'occupation',
      title: 'Occupation',
      label:       'Occupation',
      placeholder: 'e.g. Software Engineer, Designer…',
    },

    // 7 · Work Type ──────────────────────────────────────────────────────────
    {
      key:   'workType',
      title: 'Work Type',
      options: [
        { key: 'company',    label: 'I work for a company' },
        { key: 'owner',      label: 'I own a business / I am a partner' },
        { key: 'freelancer', label: 'I work as a freelancer' },
        { key: 'student',    label: 'Student' },
        { key: 'other',      label: 'Other' },
      ],
      // Sub-fields that appear depending on which option is selected
      subFields: {
        company: [
          { key: 'companyName', label: 'Company Name',                       placeholder: 'Acme Inc.' },
          { key: 'companyLink', label: 'Company Website or Social Link',     placeholder: 'https://...' },
        ],
        owner: [
          { key: 'bizName', label: 'Business Name',    placeholder: 'Your business' },
          { key: 'bizLink', label: 'Business Website', placeholder: 'https://...' },
        ],
        freelancer: [
          { key: 'portfolio', label: 'Portfolio or Social Link', placeholder: 'https://...' },
        ],
        student: [
          { key: 'university',   label: 'University / Institution', placeholder: 'e.g. Harvard University' },
          { key: 'fieldOfStudy', label: 'Field of Study',           placeholder: 'e.g. Business Administration' },
        ],
        other: [
          { key: 'otherDesc', label: 'Please describe', placeholder: 'Describe your work situation' },
        ],
      },
    },

    // 8 · Country ────────────────────────────────────────────────────────────
    {
      key:   'country',
      title: 'Country',
      options: [
        'United States',
        'United Kingdom',
        'Canada',
        'Australia',
        'Germany',
        'France',
        'Spain',
        'Italy',
        'Brazil',
        'Mexico',
        'Other',
      ],
      otherLabel:       'Your country',
      otherPlaceholder: 'Country name',
    },

    // 9 · Social Media ───────────────────────────────────────────────────────
    {
      key:   'social',
      title: 'Social Media',
      hint:  'Select all that apply',
      platforms: [
        'Instagram',
        'LinkedIn',
        'Twitter / X',
        'Facebook',
        'TikTok',
        'Other',
      ],
      usernamePlaceholder:    '@username',
      otherPlatformLabel:     'Platform name',
      otherPlatformPlaceholder: 'e.g. Threads, Pinterest…',
    },

    // 10 · Profile Picture ───────────────────────────────────────────────────
    {
      key:   'profilePic',
      title: 'Profile Picture',
      hint:  'Face only — clear, recent photo',
      btnUpload: 'Upload Photo',
      btnChange: 'Change Photo',
      meta:  'Maximum File Size: 10MB · Recommended: Square image',
    },

    // 11 · Expertise ─────────────────────────────────────────────────────────
    {
      key:   'expertise',
      title: 'Your Passion',
      hint:  'What expertise or passion would you bring to the Kimani Club? Select all that apply.',
      options: [
        'Business leadership, finance, or entrepreneurship',
        'Arts, culture, entertainment, or fashion',
        'Wellness, travel, or luxury lifestyle',
        'Philanthropy, impact investing, or social change',
        'Content creation and sharing experiences',
        'All of the above',
      ],
    },

  ], // end steps

};
