const STOP_WORDS = new Set([
  "the", "and", "for", "are", "but", "not", "you", "all", "can", "had",
  "her", "was", "one", "our", "out", "has", "have", "been", "will",
  "with", "this", "that", "from", "they", "were", "said", "each",
  "which", "their", "about", "would", "make", "like", "just", "over",
  "such", "take", "than", "them", "very", "some", "into", "most",
  "other", "could", "also", "more", "what", "when", "your", "work",
  "able", "using", "used", "including", "must", "should", "well",
  "experience", "role", "team", "join", "looking", "based", "strong",
  "working", "knowledge", "understanding", "skills", "ability",
  "responsibilities", "requirements", "qualifications", "preferred",
  "required", "years", "plus", "etc", "minimum",
]);

const extractKeywords = (text) => {
  const words = text.toLowerCase().match(/\b[a-z][a-z+#./-]{2,}\b/g) || [];
  return words.filter((w) => !STOP_WORDS.has(w));
};

const analyzeKeywords = (resumeText, jobDescription) => {
  if (!jobDescription) {
    return { score: 0, matched: [], missing: [], totalJdKeywords: 0 };
  }

  const jdKeywords = extractKeywords(jobDescription);
  const resumeKeywords = new Set(extractKeywords(resumeText));

  const freq = {};
  for (const w of jdKeywords) { freq[w] = (freq[w] || 0) + 1; }
  const topJdKeywords = Object.entries(freq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word);

  const matched = topJdKeywords.filter((k) => resumeKeywords.has(k));
  const missing = topJdKeywords.filter((k) => !resumeKeywords.has(k));
  const total = topJdKeywords.length || 1;

  return {
    score: Math.min(Math.round((matched.length / total) * 100), 100),
    matched: matched.slice(0, 20),
    missing: missing.slice(0, 15),
    totalJdKeywords: topJdKeywords.length,
  };
};

const ACTION_VERBS = new Set([
  'achieved', 'accelerated', 'accomplished', 'advanced', 'advised', 'analyzed',
  'appointed', 'approved', 'arranged', 'assessed', 'assigned', 'assisted',
  'assumed', 'assured', 'attained', 'avoided', 'awarded', 'began', 'believed',
  'benefited', 'boosted', 'budgeted', 'built', 'calculated', 'centralized',
  'chaired', 'championed', 'changed', 'characterized', 'charged', 'clarified',
  'classified', 'coached', 'collaborated', 'collected', 'combined', 'commanded',
  'commenced', 'commissioned', 'committed', 'communicated', 'compared', 'compiled',
  'completed', 'conceptualized', 'concluded', 'conducted', 'confirmed', 'connected',
  'constructed', 'consulted', 'consumed', 'contacted', 'continued', 'contracted',
  'contributed', 'controlled', 'converted', 'coordinated', 'corrected', 'corresponded',
  'created', 'credited', 'decreased', 'defined', 'delegated', 'delivered', 'demanded',
  'demonstrated', 'deprecated', 'described', 'designed', 'designated', 'desired',
  'determined', 'developed', 'devised', 'directed', 'disclosed', 'discovered',
  'discussed', 'distributed', 'diversified', 'documented', 'duplicated', 'earned',
  'edited', 'educated', 'elevated', 'eliminated', 'emphasized', 'employed', 'enabled',
  'enacted', 'encouraged', 'endured', 'engineered', 'enhanced', 'enlarged', 'enlisted',
  'ensured', 'entertained', 'entitled', 'enumerated', 'equipped', 'established',
  'evaluated', 'examined', 'exceeded', 'exchanged', 'excluded', 'executed', 'expanded',
  'expedited', 'experienced', 'experimented', 'explained', 'exposed', 'expressed',
  'extended', 'extracted', 'fabricated', 'facilitated', 'failed', 'fashioned',
  'fathered', 'favored', 'featured', 'filed', 'filled', 'finalized', 'financed',
  'floated', 'focused', 'forced', 'forged', 'formalized', 'formulated', 'fortified',
  'fostered', 'founded', 'framed', 'freed', 'fulfilled', 'furnished', 'furthered',
  'gained', 'gathered', 'gauged', 'gazed', 'generated', 'governed', 'graded',
  'granted', 'grasped', 'gravitated', 'greeted', 'grouped', 'guaranteed',
]);

const checkFormatting = (sections) => {
  let score = 0;
  const checks = {
    formatting: 0,
    sectionCompleteness: 0,
    quantification: 0,
    actionVerbs: 0,
    length: 0,
    contactInfo: 0,
  };

  // Check contact info (personalInfo section)
  if (sections.personalInfo?.email && sections.personalInfo?.phone) {
    checks.contactInfo = 100;
  } else if (sections.personalInfo?.email || sections.personalInfo?.phone) {
    checks.contactInfo = 50;
  }

  // Check section completeness
  const expectedSections = ['personalInfo', 'summary', 'experience', 'education', 'skills'];
  const completeSections = expectedSections.filter(sec => {
    const section = sections[sec];
    return section && (Array.isArray(section) ? section.length > 0 : Object.keys(section).length > 0);
  });
  checks.sectionCompleteness = Math.round((completeSections.length / expectedSections.length) * 100);

  // Check for quantifiable achievements
  const experienceText = sections.experience ? JSON.stringify(sections.experience) : '';
  const quantifiableMatches = (experienceText.match(/(\d+%|\d+\$|\d+ (employees?|customers?|projects?|hours?|days?|weeks?|months?|years?))/gi) || []).length;
  checks.quantification = Math.min(quantifiableMatches * 15, 100);

  // Check for action verbs
  const allText = JSON.stringify(sections).toLowerCase();
  const actionVerbMatches = Array.from(ACTION_VERBS).filter(verb => allText.includes(verb)).length;
  checks.actionVerbs = Math.min(Math.round((actionVerbMatches / 10) * 100), 100);

  // Check content length (avoid too short or too long)
  const totalContent = JSON.stringify(sections).length;
  if (totalContent > 400 && totalContent < 2500) {
    checks.length = 100;
  } else if (totalContent > 200 && totalContent < 3000) {
    checks.length = 80;
  } else if (totalContent > 100) {
    checks.length = 60;
  } else {
    checks.length = 0;
  }

  // Overall formatting score
  checks.formatting = Math.round(
    (checks.contactInfo * 0.15 +
      checks.sectionCompleteness * 0.25 +
      checks.quantification * 0.2 +
      checks.actionVerbs * 0.2 +
      checks.length * 0.2) / 100
  );

  return checks;
};

export { analyzeKeywords, checkFormatting };