// ─── Theme per category ───────────────────────────────────────────────────────
const THEMES = {
  Finance:      { primary: '#10b981', bg1: '#060f1e', bg2: '#0d1f3c' },
  Health:       { primary: '#fb923c', bg1: '#150802', bg2: '#241508' },
  Social:       { primary: '#60a5fa', bg1: '#050b1e', bg2: '#0b183c' },
  'E-Commerce': { primary: '#c084fc', bg1: '#0a0418', bg2: '#170832' },
  Utility:      { primary: '#94a3b8', bg1: '#0a0e18', bg2: '#131b2a' },
  Education:    { primary: '#22d3ee', bg1: '#030c15', bg2: '#071e30' },
  Game:         { primary: '#f472b6', bg1: '#12021a', bg2: '#20062e' },
  Productivity: { primary: '#34d399', bg1: '#021510', bg2: '#04201c' },
  Travel:       { primary: '#818cf8', bg1: '#05040f', bg2: '#0e0b2e' },
  Lifestyle:    { primary: '#fb7185', bg1: '#140512', bg2: '#26081e' },
  Music:        { primary: '#d946ef', bg1: '#0e0214', bg2: '#1a0528' },
  News:         { primary: '#fbbf24', bg1: '#14100a', bg2: '#221c08' },
}

// ─── Encode SVG as data URL ───────────────────────────────────────────────────
const toDataURL = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`

// ─── SVG Helpers ──────────────────────────────────────────────────────────────
const bars = (ox, oy, values, color, bw = 14, maxH = 48) =>
  values.map((v, i) =>
    `<rect x="${ox + i * (bw + 4)}" y="${oy + maxH * (1 - v)}" width="${bw}" height="${maxH * v}" rx="3" fill="${color}" opacity="${0.3 + 0.7 * v}"/>`
  ).join('')

const lineChart = (ox, oy, vals, color, w = 210, h = 85) => {
  const pts = vals.map((v, i) => `${ox + (i / (vals.length - 1)) * w},${oy + h - v * h}`)
  const area = `${ox},${oy + h} ${pts.join(' ')} ${ox + w},${oy + h}`
  return `
    <polygon points="${area}" fill="${color}" opacity="0.12"/>
    <polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${pts[pts.length - 1].split(',')[0]}" cy="${pts[pts.length - 1].split(',')[1]}" r="5" fill="${color}"/>
  `
}

const ring = (cx, cy, r, progress, color) => {
  const c = 2 * Math.PI * r
  return `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ffffff10" stroke-width="12"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${color}" stroke-width="12"
      stroke-dasharray="${c * progress} ${c}" stroke-linecap="round"
      transform="rotate(-90 ${cx} ${cy})"/>
  `
}

// Status bar + bottom nav
const statusBar = () => `
  <rect width="244" height="28" fill="#00000045"/>
  <text x="16" y="19" fill="white" font-size="11" font-weight="600" font-family="system-ui">9:41</text>
  <rect x="202" y="10" width="22" height="10" rx="2.5" fill="none" stroke="white" stroke-width="1.2" opacity="0.5"/>
  <rect x="204" y="12" width="15" height="6" rx="1.5" fill="white" opacity="0.6"/>
  <rect x="226" y="12.5" width="2" height="5" rx="1" fill="white" opacity="0.5"/>
  <rect x="184" y="12" width="12" height="6" rx="1" fill="none" stroke="white" stroke-width="1" opacity="0.4"/>
  <rect x="185" y="13" width="7" height="4" rx="0.5" fill="white" opacity="0.4"/>
`

const bottomNav = (c) => `
  <rect y="368" width="244" height="40" fill="#00000070"/>
  <rect y="368" width="244" height="1" fill="white" opacity="0.06"/>
  <rect x="18" y="378" width="18" height="14" rx="3" fill="${c}"/>
  <rect x="21" y="384" width="12" height="8" rx="1.5" fill="black" opacity="0.3"/>
  <circle cx="82" cy="388" r="7" fill="none" stroke="white" stroke-width="1.5" opacity="0.3"/>
  <line x1="88" y1="394" x2="92" y2="398" stroke="white" stroke-width="1.5" stroke-linecap="round" opacity="0.3"/>
  <circle cx="152" cy="387" r="10" fill="${c}cc"/>
  <line x1="152" y1="382" x2="152" y2="392" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <line x1="147" y1="387" x2="157" y2="387" stroke="white" stroke-width="2" stroke-linecap="round"/>
  <circle cx="214" cy="384" r="7" fill="white" opacity="0.12"/>
  <circle cx="214" cy="382" r="4" fill="white" opacity="0.35"/>
`

// ─── Phone frame wrapper ───────────────────────────────────────────────────────
const phone = (t, content, extraDefs = '') => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <defs>
    <linearGradient id="BG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.bg1}"/>
      <stop offset="100%" stop-color="${t.bg2}"/>
    </linearGradient>
    <linearGradient id="cardG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${t.primary}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${t.primary}" stop-opacity="0.05"/>
    </linearGradient>
    <clipPath id="SC"><rect x="278" y="50" width="244" height="408"/></clipPath>
    ${extraDefs}
  </defs>
  <rect width="800" height="500" fill="url(#BG)"/>
  <ellipse cx="400" cy="260" rx="160" ry="240" fill="${t.primary}" opacity="0.05"/>
  <ellipse cx="150" cy="80"  rx="180" ry="120" fill="${t.primary}" opacity="0.03"/>
  <rect x="272" y="18" width="264" height="472" rx="44" fill="${t.primary}" opacity="0.07"/>
  <rect x="268" y="14" width="264" height="474" rx="44" fill="#080812" stroke="${t.primary}38" stroke-width="1.5"/>
  <rect x="265" y="110" width="4" height="48" rx="2" fill="#16162a"/>
  <rect x="265" y="168" width="4" height="48" rx="2" fill="#16162a"/>
  <rect x="531" y="130" width="4" height="64" rx="2" fill="#16162a"/>
  <rect x="278" y="50" width="244" height="408" fill="#080d14"/>
  <rect x="350" y="20" width="100" height="24" rx="12" fill="#000"/>
  <g clip-path="url(#SC)"><g transform="translate(278,50)">${content}</g></g>
  <rect x="362" y="472" width="76" height="5" rx="2.5" fill="#1e2535"/>
</svg>`

// ─── Screen 0: Dashboard (category-specific) ─────────────────────────────────
const dashboardContent = (p, t) => {
  const cat = p.category
  const barVals = [0.42, 0.65, 0.78, 0.52, 0.88, 0.70, 1.0, 0.60, 0.75, 0.55, 0.85, 0.68]

  if (cat === 'Finance') return `
    <rect x="12" y="90" width="220" height="90" rx="20" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="114" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">TOTAL BALANCE</text>
    <text x="28" y="146" fill="white" font-size="25" font-weight="800" font-family="system-ui">$12,450.85</text>
    <rect x="28" y="155" width="56" height="17" rx="8.5" fill="${t.primary}28"/>
    <text x="56" y="167" fill="${t.primary}" font-size="10" font-weight="600" text-anchor="middle" font-family="system-ui">+8.2%</text>
    <text x="16" y="205" fill="white" font-size="12" font-weight="700" font-family="system-ui">Spending</text>
    <text x="185" y="205" fill="${t.primary}70" font-size="10" font-family="system-ui">This week</text>
    ${bars(14, 215, barVals, t.primary, 12, 46)}
    <text x="16" y="290" fill="white" font-size="12" font-weight="700" font-family="system-ui">Recent Transactions</text>
    <text x="192" y="290" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['Grocery Store','Food &amp; Drink','-$42.50'],['Netflix','Subscription','-$15.99'],['Salary','Income','+$3,200']].map((r,i)=>`
      <rect x="12" y="${298+i*50}" width="220" height="42" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${308+i*50}" width="24" height="24" rx="8" fill="${t.primary}22"/>
      <text x="32" y="${324+i*50}" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">$</text>
      <text x="54" y="${315+i*50}" fill="white" font-size="12" font-weight="500" font-family="system-ui">${r[0]}</text>
      <text x="54" y="${330+i*50}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${323+i*50}" fill="${t.primary}" font-size="12" font-weight="600" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Health') return `
    ${[['Steps','8,432','👟'],['Kcal','342','🔥'],['BPM','72','❤️']].map((s,i)=>`
      <rect x="${12+i*78}" y="90" width="70" height="66" rx="16" fill="${t.primary}12" stroke="${t.primary}20" stroke-width="1"/>
      <text x="${47+i*78}" y="118" fill="${t.primary}80" font-size="18" text-anchor="middle" font-family="system-ui">${s[2]}</text>
      <text x="${47+i*78}" y="138" fill="white" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="151" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    `).join('')}
    <text x="16" y="182" fill="white" font-size="12" font-weight="700" font-family="system-ui">Weekly Activity</text>
    <text x="185" y="182" fill="${t.primary}70" font-size="10" font-family="system-ui">7 days</text>
    ${bars(14, 192, barVals, t.primary, 12, 46)}
    <text x="16" y="268" fill="white" font-size="12" font-weight="700" font-family="system-ui">Today's Workouts</text>
    <text x="192" y="268" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['Morning Run','5.2 km • 32 min','540 kcal'],['Push-ups','3 × 20 reps','120 kcal'],['Yoga','15 min stretch','60 kcal']].map((r,i)=>`
      <rect x="12" y="${276+i*50}" width="220" height="42" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${286+i*50}" width="24" height="24" rx="8" fill="${t.primary}22"/>
      <text x="32" y="${302+i*50}" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">▶</text>
      <text x="54" y="${293+i*50}" fill="white" font-size="12" font-weight="500" font-family="system-ui">${r[0]}</text>
      <text x="54" y="${308+i*50}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${301+i*50}" fill="${t.primary}" font-size="11" font-weight="600" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Social') return `
    ${[['Friends','128','online'],['Posts','47','today'],['Messages','12','unread']].map((s,i)=>`
      <rect x="${12+i*78}" y="90" width="70" height="66" rx="16" fill="${t.primary}12" stroke="${t.primary}20" stroke-width="1"/>
      <text x="${47+i*78}" y="130" fill="white" font-size="18" font-weight="800" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="148" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    `).join('')}
    <text x="16" y="182" fill="white" font-size="12" font-weight="700" font-family="system-ui">Activity</text>
    <text x="185" y="182" fill="${t.primary}70" font-size="10" font-family="system-ui">This week</text>
    ${bars(14, 192, barVals, t.primary, 12, 46)}
    <text x="16" y="268" fill="white" font-size="12" font-weight="700" font-family="system-ui">Recent Messages</text>
    <text x="192" y="268" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['Alex J.','Hey, are you free tonight?','2m'],['Sara K.','The meeting went great!','15m'],['Team Group','New update is live 🚀','1h']].map((r,i)=>`
      <rect x="12" y="${276+i*50}" width="220" height="42" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <circle cx="32" cy="${297+i*50}" r="12" fill="${t.primary}30"/>
      <text x="32" y="${301+i*50}" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">${r[0][0]}</text>
      <text x="54" y="${293+i*50}" fill="white" font-size="12" font-weight="500" font-family="system-ui">${r[0]}</text>
      <text x="54" y="${308+i*50}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${293+i*50}" fill="white" opacity="0.3" font-size="9" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'E-Commerce') return `
    <rect x="12" y="90" width="220" height="70" rx="18" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="112" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">YOUR CART</text>
    <text x="28" y="138" fill="white" font-size="22" font-weight="800" font-family="system-ui">3 items · $124.97</text>
    <rect x="148" y="120" width="72" height="28" rx="14" fill="${t.primary}"/>
    <text x="184" y="138" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Checkout</text>
    <text x="16" y="185" fill="white" font-size="12" font-weight="700" font-family="system-ui">Best Deals</text>
    <text x="185" y="185" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['Wireless Headphones','$49.99','–30%'],['Smart Watch','$89.99','–20%']].map((r,i)=>`
      <rect x="${12+i*114}" y="193" width="106" height="86" rx="16" fill="${t.primary}0e" stroke="${t.primary}18" stroke-width="1"/>
      <rect x="${18+i*114}" y="199" width="94" height="52" rx="10" fill="${t.primary}18"/>
      <rect x="${38+i*114}" y="207" width="54" height="36" rx="8" fill="${t.primary}28"/>
      <text x="${65+i*114}" y="264" fill="white" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">${r[0].split(' ')[0]}</text>
      <text x="${18+i*114}" y="276" fill="${t.primary}" font-size="11" font-weight="600" font-family="system-ui">${r[1]}</text>
      <rect x="${82+i*114}" y="267" width="28" height="14" rx="7" fill="${t.primary}30"/>
      <text x="${96+i*114}" y="278" fill="${t.primary}" font-size="9" font-weight="700" text-anchor="middle" font-family="system-ui">${r[2]}</text>
    `).join('')}
    <text x="16" y="300" fill="white" font-size="12" font-weight="700" font-family="system-ui">Recent Orders</text>
    ${[['Order #4821','Delivered','$42.50'],['Order #4798','Shipped','$89.99'],['Order #4762','Processing','$15.99']].map((r,i)=>`
      <rect x="12" y="${308+i*46}" width="220" height="38" rx="11" fill="${t.primary}0a" stroke="${t.primary}12" stroke-width="1"/>
      <rect x="20" y="${316+i*46}" width="22" height="22" rx="7" fill="${t.primary}22"/>
      <text x="31" y="${331+i*46}" fill="${t.primary}" font-size="10" font-weight="700" text-anchor="middle" font-family="system-ui">#</text>
      <text x="52" y="${325+i*46}" fill="white" font-size="11" font-weight="500" font-family="system-ui">${r[0]}</text>
      <text x="52" y="${338+i*46}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${332+i*46}" fill="${t.primary}" font-size="11" font-weight="600" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Utility') return `
    <text x="16" y="100" fill="white" font-size="12" font-weight="700" font-family="system-ui">Quick Tools</text>
    ${[['QR','Scan'],['PDF','Convert'],['Calc','Unit'],['Zip','File'],['Clock','Timer'],['Key','Pass']].map((tool,i)=>`
      <rect x="${12+(i%3)*78}" y="${108+Math.floor(i/3)*86}" width="70" height="76" rx="18" fill="${t.primary}${10+i*4}" stroke="${t.primary}18" stroke-width="1"/>
      <rect x="${25+(i%3)*78}" y="${120+Math.floor(i/3)*86}" width="44" height="40" rx="12" fill="${t.primary}22"/>
      <text x="${47+(i%3)*78}" y="${148+Math.floor(i/3)*86}" fill="${t.primary}" font-size="16" font-weight="700" text-anchor="middle" font-family="monospace">${tool[0]}</text>
      <text x="${47+(i%3)*78}" y="${176+Math.floor(i/3)*86}" fill="white" opacity="0.55" font-size="10" text-anchor="middle" font-family="system-ui">${tool[1]}</text>
    `).join('')}
    <text x="16" y="292" fill="white" font-size="12" font-weight="700" font-family="system-ui">Recently Used</text>
    ${[['QR Scanner','Last used 5m ago'],['PDF Converter','Last used 1h ago'],['Unit Converter','Last used today']].map((r,i)=>`
      <rect x="12" y="${300+i*46}" width="220" height="38" rx="11" fill="${t.primary}0a" stroke="${t.primary}12" stroke-width="1"/>
      <rect x="20" y="${308+i*46}" width="22" height="22" rx="7" fill="${t.primary}22"/>
      <text x="31" y="${323+i*46}" fill="${t.primary}" font-size="10" font-weight="700" text-anchor="middle" font-family="monospace">${r[0].split(' ')[0].slice(0,2)}</text>
      <text x="52" y="${317+i*46}" fill="white" font-size="11" font-weight="500" font-family="system-ui">${r[0]}</text>
      <text x="52" y="${330+i*46}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
    `).join('')}
  `

  if (cat === 'Education') return `
    <rect x="12" y="90" width="220" height="70" rx="18" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="112" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">DAILY STREAK</text>
    <text x="28" y="143" fill="white" font-size="28" font-weight="800" font-family="system-ui">🔥 12 days</text>
    ${[['Courses','8','enrolled'],['Hours','124','learned'],['Points','3,420','earned']].map((s,i)=>`
      <rect x="${12+i*78}" y="172" width="70" height="56" rx="14" fill="${t.primary}12" stroke="${t.primary}1e" stroke-width="1"/>
      <text x="${47+i*78}" y="197" fill="white" font-size="16" font-weight="800" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="212" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[2]}</text>
    `).join('')}
    <text x="16" y="250" fill="white" font-size="12" font-weight="700" font-family="system-ui">In Progress</text>
    <text x="192" y="250" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['React Advanced','68% complete','12 lessons left'],['UI/UX Design','45% complete','20 lessons left'],['Node.js API','22% complete','34 lessons left']].map((r,i)=>`
      <rect x="12" y="${258+i*52}" width="220" height="44" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${268+i*52}" width="26" height="26" rx="8" fill="${t.primary}22"/>
      <text x="33" y="${285+i*52}" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">▶</text>
      <text x="56" y="${270+i*52}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${r[0]}</text>
      <rect x="56" y="${275+i*52}" width="110" height="5" rx="2.5" fill="white" opacity="0.1"/>
      <rect x="56" y="${275+i*52}" width="${parseInt(r[1])*1.1}" height="5" rx="2.5" fill="${t.primary}"/>
      <text x="56" y="${292+i*52}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${292+i*52}" fill="white" opacity="0.3" font-size="10" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Game') return `
    <rect x="12" y="90" width="220" height="70" rx="18" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="112" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">YOUR STATS</text>
    <text x="28" y="143" fill="white" font-size="26" font-weight="800" font-family="system-ui">Level 24 · 1,240 pts</text>
    ${[['Wins','142'],['Streak','7'],['Rank','#38']].map((s,i)=>`
      <rect x="${12+i*78}" y="172" width="70" height="56" rx="14" fill="${t.primary}12" stroke="${t.primary}1e" stroke-width="1"/>
      <text x="${47+i*78}" y="197" fill="white" font-size="16" font-weight="800" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="212" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    `).join('')}
    <text x="16" y="250" fill="white" font-size="12" font-weight="700" font-family="system-ui">Daily Challenges</text>
    ${[['Puzzle Master','Solve 5 puzzles','3/5 done'],['Speed Run','Complete in 60s','Pending'],['Combo King','10 combo streak','Done ✓']].map((r,i)=>`
      <rect x="12" y="${258+i*52}" width="220" height="44" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${268+i*52}" width="26" height="26" rx="8" fill="${t.primary}22"/>
      <text x="33" y="${285+i*52}" fill="${t.primary}" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">★</text>
      <text x="56" y="${270+i*52}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${r[0]}</text>
      <text x="56" y="${284+i*52}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${280+i*52}" fill="${t.primary}" font-size="10" font-weight="600" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Productivity') return `
    <rect x="12" y="90" width="220" height="70" rx="18" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="112" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">TODAY'S PROGRESS</text>
    <text x="28" y="143" fill="white" font-size="26" font-weight="800" font-family="system-ui">5 / 8 tasks done</text>
    ${[['Focus','2h 14m','today'],['Streak','9 days','active'],['Done','5/8','tasks']].map((s,i)=>`
      <rect x="${12+i*78}" y="172" width="70" height="56" rx="14" fill="${t.primary}12" stroke="${t.primary}1e" stroke-width="1"/>
      <text x="${47+i*78}" y="197" fill="white" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="212" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    `).join('')}
    <text x="16" y="250" fill="white" font-size="12" font-weight="700" font-family="system-ui">Task List</text>
    <text x="192" y="250" fill="${t.primary}" font-size="10" font-family="system-ui">+Add</text>
    ${[['Design new landing page','Design · Due today',true],['Backend API review','Dev · Due 3pm',true],['Weekly team standup','Meeting · 5pm',false],['Write product brief','Marketing · Tomorrow',false]].map((r,i)=>`
      <rect x="12" y="${258+i*46}" width="220" height="38" rx="11" fill="${t.primary}0a" stroke="${t.primary}12" stroke-width="1"/>
      <rect x="20" y="${268+i*46}" width="20" height="20" rx="6" fill="${r[2]?t.primary:'transparent'}" stroke="${t.primary}60" stroke-width="1.5"/>
      ${r[2]?`<text x="30" y="${282+i*46}" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">✓</text>`:''}
      <text x="50" y="${272+i*46}" fill="${r[2]?t.primary+'80':'white'}" font-size="11" font-weight="500" font-family="system-ui">${r[0]}</text>
      <text x="50" y="${285+i*46}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
    `).join('')}
  `

  if (cat === 'Travel') return `
    <rect x="12" y="90" width="220" height="70" rx="18" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="112" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">NEXT TRIP</text>
    <text x="28" y="140" fill="white" font-size="22" font-weight="800" font-family="system-ui">🗺 Paris · 12 days</text>
    ${[['Weather','22°C ☀','Sunny'],['Flight','VN240','On time'],['Hotel','Le Royal','Confirmed']].map((s,i)=>`
      <rect x="${12+i*78}" y="172" width="70" height="56" rx="14" fill="${t.primary}12" stroke="${t.primary}1e" stroke-width="1"/>
      <text x="${47+i*78}" y="195" fill="white" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="212" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    `).join('')}
    <text x="16" y="250" fill="white" font-size="12" font-weight="700" font-family="system-ui">Itinerary</text>
    <text x="192" y="250" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['Eiffel Tower','Day 1 · 09:00','Sightseeing'],['Louvre Museum','Day 1 · 14:00','Culture'],['Seine River Cruise','Day 2 · 18:00','Activity']].map((r,i)=>`
      <rect x="12" y="${258+i*52}" width="220" height="44" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${268+i*52}" width="26" height="26" rx="8" fill="${t.primary}22"/>
      <text x="33" y="${285+i*52}" fill="${t.primary}" font-size="14" text-anchor="middle" font-family="system-ui">📍</text>
      <text x="56" y="${270+i*52}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${r[0]}</text>
      <text x="56" y="${284+i*52}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${280+i*52}" fill="${t.primary}" font-size="10" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Lifestyle') return `
    <rect x="12" y="90" width="220" height="70" rx="18" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <text x="28" y="112" fill="${t.primary}99" font-size="10" font-weight="600" letter-spacing="1" font-family="system-ui">TODAY</text>
    <text x="28" y="143" fill="white" font-size="22" font-weight="800" font-family="system-ui">💇 Hair Salon · 2pm</text>
    ${[['Streak','14 days','beauty'],['Saved','$240','this month'],['Booked','8 times','total']].map((s,i)=>`
      <rect x="${12+i*78}" y="172" width="70" height="56" rx="14" fill="${t.primary}12" stroke="${t.primary}1e" stroke-width="1"/>
      <text x="${47+i*78}" y="197" fill="white" font-size="13" font-weight="800" text-anchor="middle" font-family="system-ui">${s[1]}</text>
      <text x="${47+i*78}" y="212" fill="${t.primary}70" font-size="9" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    `).join('')}
    <text x="16" y="250" fill="white" font-size="12" font-weight="700" font-family="system-ui">Upcoming Bookings</text>
    <text x="192" y="250" fill="${t.primary}" font-size="10" font-family="system-ui">Book</text>
    ${[['Hair Salon · Lily S.','Today · 2:00 PM','Confirmed'],['Facial Treatment','Fri · 11:00 AM','Confirmed'],['Nail Studio · Mia L.','Sat · 3:00 PM','Pending']].map((r,i)=>`
      <rect x="12" y="${258+i*52}" width="220" height="44" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${268+i*52}" width="26" height="26" rx="8" fill="${t.primary}22"/>
      <text x="33" y="${285+i*52}" fill="${t.primary}" font-size="14" text-anchor="middle" font-family="system-ui">✂</text>
      <text x="56" y="${270+i*52}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${r[0]}</text>
      <text x="56" y="${284+i*52}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${280+i*52}" fill="${t.primary}" font-size="10" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Music') return `
    <rect x="12" y="90" width="220" height="120" rx="20" fill="url(#cardG)" stroke="${t.primary}25" stroke-width="1"/>
    <rect x="20" y="98" width="66" height="66" rx="16" fill="${t.primary}30"/>
    ${[0,1,2,3].map(i=>`<rect x="${28+i*16}" y="${108+Math.abs(i-1.5)*8}" width="10" height="${48-Math.abs(i-1.5)*16}" rx="3" fill="${t.primary}${60+i*15}"/>`).join('')}
    <text x="96" y="118" fill="${t.primary}80" font-size="9" font-weight="600" letter-spacing="1" font-family="system-ui">NOW PLAYING</text>
    <text x="96" y="138" fill="white" font-size="14" font-weight="800" font-family="system-ui">Electric Sunrise</text>
    <text x="96" y="154" fill="${t.primary}70" font-size="11" font-family="system-ui">Neon Collective</text>
    <rect x="20" y="172" width="204" height="4" rx="2" fill="white" opacity="0.1"/>
    <rect x="20" y="172" width="122" height="4" rx="2" fill="${t.primary}"/>
    <circle cx="142" cy="174" r="6" fill="${t.primary}"/>
    ${[['⏮',''],['⏸',''],['⏭',''],['🔀',''],['❤','']].map((b,i)=>`
      <text x="${28+i*48}" y="200" fill="white" opacity="${i===1?1:0.35}" font-size="18" font-family="system-ui">${b[0]}</text>
    `).join('')}
    <text x="16" y="226" fill="white" font-size="12" font-weight="700" font-family="system-ui">Up Next</text>
    ${[['Dark Matter','Synth Wave · 4:15'],['Neon Pulse','Electronic · 2:58'],['Midnight Drive','Chill · 5:30']].map((r,i)=>`
      <rect x="12" y="${234+i*52}" width="220" height="44" rx="12" fill="${t.primary}0a" stroke="${t.primary}14" stroke-width="1"/>
      <rect x="20" y="${244+i*52}" width="26" height="26" rx="8" fill="${t.primary}22"/>
      ${[0,1,2].map(j=>`<rect x="${26+j*7}" y="${252+i*52}" width="5" height="${8+j*6}" rx="2" fill="${t.primary}${50+j*20}"/>`).join('')}
      <text x="56" y="${252+i*52}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${r[0]}</text>
      <text x="56" y="${266+i*52}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[1]}</text>
      <text x="222" y="${260+i*52}" fill="${t.primary}" font-size="10" text-anchor="end" font-family="system-ui">▶</text>
    `).join('')}
  `

  if (cat === 'News') return `
    ${['All','Tech','Biz','Sport'].map((c,i)=>`
      <rect x="${12+i*58}" y="88" width="52" height="22" rx="11" fill="${i===0?t.primary:'white'}" opacity="${i===0?1:0.07}"/>
      <text x="${38+i*58}" y="103" fill="${i===0?'white':'white'}" opacity="${i===0?1:0.35}" font-size="11" font-weight="${i===0?700:400}" text-anchor="middle" font-family="system-ui">${c}</text>
    `).join('')}
    <rect x="12" y="118" width="220" height="108" rx="16" fill="${t.primary}14" stroke="${t.primary}1c" stroke-width="1"/>
    <rect x="20" y="126" width="204" height="58" rx="10" fill="${t.primary}20"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="${26+i*34}" y="132" width="26" height="46" rx="4" fill="${t.primary}${14+i*6}"/>`).join('')}
    <rect x="20" y="188" width="54" height="14" rx="7" fill="${t.primary}28"/>
    <text x="47" y="199" fill="${t.primary}" font-size="9" font-weight="600" text-anchor="middle" font-family="system-ui">TOP STORY</text>
    <text x="82" y="199" fill="white" font-size="11" font-weight="600" font-family="system-ui">AI Reshapes the Industry</text>
    <text x="16" y="246" fill="white" font-size="12" font-weight="700" font-family="system-ui">Latest</text>
    <text x="192" y="246" fill="${t.primary}" font-size="10" font-family="system-ui">See all</text>
    ${[['Tech Giants Report Record Q1','Business · 5 min'],['New Framework Tops Rankings','Dev · 3 min'],['Startup Raises $50M Series B','Startup · 4 min']].map((a,i)=>`
      <rect x="12" y="${254+i*50}" width="220" height="42" rx="12" fill="white" opacity="0.04"/>
      <rect x="18" y="${262+i*50}" width="28" height="26" rx="8" fill="${t.primary}18"/>
      ${[0,1,2].map(j=>`<rect x="${22}" y="${267+j*6+i*50}" width="${18-j*4}" height="4" rx="2" fill="${t.primary}${40+j*15}"/>`).join('')}
      <text x="56" y="${272+i*50}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${a[0]}</text>
      <text x="56" y="${286+i*50}" fill="${t.primary}70" font-size="10" font-family="system-ui">${a[1]}</text>
    `).join('')}
  `

  // Default (Utility style)
  return `
    <text x="16" y="100" fill="white" font-size="12" font-weight="700" font-family="system-ui">Overview</text>
    <text x="16" y="182" fill="white" font-size="12" font-weight="700" font-family="system-ui">Activity</text>
    <text x="185" y="182" fill="${t.primary}70" font-size="10" font-family="system-ui">This week</text>
    ${bars(14, 192, barVals, t.primary, 12, 46)}
  `
}

const screen0 = (p, t) => phone(t, `
  ${statusBar()}
  <rect y="28" width="244" height="58" fill="#00000035"/>
  <text x="16" y="56" fill="white" font-size="16" font-weight="800" font-family="system-ui">${p.title}</text>
  <text x="16" y="74" fill="${t.primary}90" font-size="11" font-family="system-ui">Welcome back!</text>
  <circle cx="220" cy="55" r="16" fill="${t.primary}20"/>
  <circle cx="220" cy="50" r="6" fill="${t.primary}50"/>
  <path d="M208 68 a12 7 0 0 1 24 0" fill="${t.primary}35"/>
  ${dashboardContent(p, t)}
  ${bottomNav(t.primary)}
`)

// ─── Screen 1: Category-specific feature ─────────────────────────────────────
const featureContent = (p, t) => {
  const cat = p.category

  if (cat === 'Finance') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Portfolio</text>
    <circle cx="122" cy="158" r="62" fill="none" stroke="${t.primary}18" stroke-width="18"/>
    <circle cx="122" cy="158" r="62" fill="none" stroke="${t.primary}" stroke-width="18" stroke-dasharray="195 195" stroke-dashoffset="98" stroke-linecap="round" transform="rotate(-90 122 158)"/>
    <circle cx="122" cy="158" r="62" fill="none" stroke="#3b82f6" stroke-width="18" stroke-dasharray="98 292" stroke-dashoffset="-97" stroke-linecap="round" transform="rotate(-90 122 158)"/>
    <circle cx="122" cy="158" r="62" fill="none" stroke="#f59e0b" stroke-width="18" stroke-dasharray="49 341" stroke-dashoffset="-195" stroke-linecap="round" transform="rotate(-90 122 158)"/>
    <text x="122" y="152" fill="white" font-size="20" font-weight="800" text-anchor="middle" font-family="system-ui">68%</text>
    <text x="122" y="170" fill="${t.primary}80" font-size="11" text-anchor="middle" font-family="system-ui">Stocks</text>
    ${[['Stocks','$8,427',t.primary],['Crypto','$2,850','#3b82f6'],['ETF','$1,173','#f59e0b']].map((r,i)=>`
      <rect x="14" y="${244+i*38}" width="216" height="30" rx="8" fill="white" opacity="0.04"/>
      <rect x="20" y="${252+i*38}" width="10" height="10" rx="3" fill="${r[2]}"/>
      <text x="38" y="${261+i*38}" fill="white" font-size="12" font-family="system-ui">${r[0]}</text>
      <text x="222" y="${261+i*38}" fill="${r[2]}" font-size="12" font-weight="600" text-anchor="end" font-family="system-ui">${r[1]}</text>
    `).join('')}
  `

  if (cat === 'Health') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Today's Workout</text>
    ${ring(122, 168, 72, 0.72, t.primary)}
    <text x="122" y="162" fill="white" font-size="24" font-weight="800" text-anchor="middle" font-family="system-ui">72%</text>
    <text x="122" y="180" fill="${t.primary}80" font-size="11" text-anchor="middle" font-family="system-ui">Goal reached</text>
    ${[['Steps','8,432'],['Kcal','342'],['Active','45m']].map((s,i)=>`
      <rect x="${14+i*77}" y="258" width="68" height="58" rx="14" fill="${t.primary}12" stroke="${t.primary}20" stroke-width="1"/>
      <text x="${48+i*77}" y="282" fill="${t.primary}80" font-size="10" text-anchor="middle" font-family="system-ui">${s[0]}</text>
      <text x="${48+i*77}" y="300" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">${s[1]}</text>
    `).join('')}
    <text x="16" y="340" fill="white" font-size="12" font-weight="700" font-family="system-ui">Exercises</text>
    ${[['Running','30 min','540 kcal'],['Push-ups','3 sets','120 kcal']].map((e,i)=>`
      <rect x="12" y="${350+i*44}" width="220" height="36" rx="10" fill="${t.primary}0a" stroke="${t.primary}12" stroke-width="1"/>
      <rect x="18" y="${358+i*44}" width="20" height="20" rx="6" fill="${t.primary}20"/>
      <text x="46" y="${366+i*44}" fill="white" font-size="11" font-weight="500" font-family="system-ui">${e[0]}</text>
      <text x="46" y="${378+i*44}" fill="${t.primary}70" font-size="10" font-family="system-ui">${e[1]}</text>
      <text x="222" y="${368+i*44}" fill="${t.primary}" font-size="10" font-weight="600" text-anchor="end" font-family="system-ui">${e[2]}</text>
    `).join('')}
  `

  if (cat === 'Social') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Messages</text>
    <rect x="12" y="60" width="220" height="30" rx="10" fill="white" opacity="0.06"/>
    <rect x="20" y="70" width="14" height="10" rx="2" fill="white" opacity="0.2"/>
    <text x="42" y="79" fill="white" opacity="0.28" font-size="11" font-family="system-ui">Search...</text>
    ${[['A','Alex J.','Hey, are you free tonight?','2m',true],
       ['S','Sara K.','The meeting went great!','15m',false],
       ['M','Mike C.','Photo sent','1h',true],
       ['T','Team','New update available','3h',false],
       ['J','Jess L.','Thanks for the help!','5h',false]
    ].map((r,i)=>`
      <rect x="12" y="${100+i*54}" width="220" height="46" rx="12" fill="${i===0 ? t.primary+'14' : 'white'}" opacity="${i===0 ? 1 : 0.04}" stroke="${i===0 ? t.primary+'20' : 'none'}" stroke-width="1"/>
      <circle cx="36" cy="${123+i*54}" r="16" fill="${t.primary}${25+i*8}"/>
      <text x="36" y="${128+i*54}" fill="white" font-size="12" font-weight="700" text-anchor="middle" font-family="system-ui">${r[0]}</text>
      <text x="60" y="${116+i*54}" fill="white" font-size="12" font-weight="600" font-family="system-ui">${r[1]}</text>
      <text x="60" y="${131+i*54}" fill="white" opacity="0.38" font-size="10" font-family="system-ui">${r[2]}</text>
      <text x="222" y="${116+i*54}" fill="white" opacity="0.3" font-size="9" text-anchor="end" font-family="system-ui">${r[3]}</text>
      ${r[4] ? `<circle cx="218" cy="${128+i*54}" r="5" fill="${t.primary}"/>` : ''}
    `).join('')}
  `

  if (cat === 'E-Commerce') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Shop</text>
    <rect x="12" y="60" width="220" height="30" rx="10" fill="white" opacity="0.06"/>
    <text x="30" y="79" fill="white" opacity="0.28" font-size="11" font-family="system-ui">Search products...</text>
    <text x="16" y="112" fill="white" font-size="12" font-weight="600" font-family="system-ui">Featured</text>
    ${[[0,0,'Sneakers','$49','#10b981'],[1,0,'Jacket','$89','#3b82f6'],
       [0,1,'Bag','$129','#f59e0b'],[1,1,'Watch','$249','#ec4899']].map((r)=>`
      <rect x="${12+r[0]*114}" y="${120+r[1]*112}" width="104" height="104" rx="18" fill="${r[4]}18" stroke="${r[4]}25" stroke-width="1"/>
      <rect x="${20+r[0]*114}" y="${128+r[1]*112}" width="88" height="56" rx="12" fill="${r[4]}20"/>
      <rect x="${40+r[0]*114}" y="${138+r[1]*112}" width="48" height="36" rx="6" fill="${r[4]}30"/>
      <text x="${70+r[0]*114}" y="${180+r[1]*112}" fill="${r[4]}" font-size="12" font-weight="600" font-family="system-ui" text-anchor="middle">${r[2]}</text>
      <text x="${20+r[0]*114}" y="${196+r[1]*112}" fill="white" font-size="11" font-weight="700" font-family="system-ui">${r[3]}</text>
      <rect x="${86+r[0]*114}" y="${188+r[1]*112}" width="22" height="16" rx="8" fill="${r[4]}30"/>
      <text x="${97+r[0]*114}" y="${200+r[1]*112}" fill="${r[4]}" font-size="10" text-anchor="middle" font-family="system-ui">+</text>
    `).join('')}
  `

  if (cat === 'Utility') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">All Tools</text>
    ${[['QR Scan','#10b981'],['PDF','#3b82f6'],['Convert','#f59e0b'],
       ['Calc','#ec4899'],['Compress','#8b5cf6'],['Encrypt','#06b6d4'],
       ['Timer','#f97316'],['Weather','#60a5fa'],['Translate','#a855f7']].map((tool,i)=>{
      const col = i%3, row = Math.floor(i/3)
      return `
        <rect x="${14+col*78}" y="${60+row*94}" width="68" height="80" rx="18" fill="${tool[1]}16" stroke="${tool[1]}25" stroke-width="1"/>
        <rect x="${28+col*78}" y="${72+row*94}" width="40" height="36" rx="10" fill="${tool[1]}22"/>
        <rect x="${36+col*78}" y="${80+row*94}" width="24" height="4" rx="2" fill="${tool[1]}60"/>
        <rect x="${36+col*78}" y="${88+row*94}" width="18" height="4" rx="2" fill="${tool[1]}40"/>
        <rect x="${36+col*78}" y="${96+row*94}" width="22" height="4" rx="2" fill="${tool[1]}30"/>
        <text x="${48+col*78}" y="${128+row*94}" fill="white" font-size="10" font-weight="500" text-anchor="middle" font-family="system-ui">${tool[0]}</text>
      `
    }).join('')}
  `

  if (cat === 'Education') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">My Courses</text>
    ${[['React Dev','Web Dev','78','12h left'],
       ['UI/UX Design','Design','45','24h left'],
       ['Data Science','Analytics','92','4h left'],
       ['Mobile Apps','Flutter','30','40h left']].map((c,i)=>`
      <rect x="12" y="${62+i*76}" width="220" height="66" rx="16" fill="${t.primary}0a" stroke="${t.primary}16" stroke-width="1"/>
      <rect x="20" y="${70+i*76}" width="42" height="42" rx="12" fill="${t.primary}22"/>
      <rect x="28" y="${78+i*76}" width="26" height="4" rx="2" fill="${t.primary}60"/>
      <rect x="28" y="${86+i*76}" width="20" height="4" rx="2" fill="${t.primary}40"/>
      <rect x="28" y="${94+i*76}" width="24" height="4" rx="2" fill="${t.primary}30"/>
      <text x="72" y="${82+i*76}" fill="white" font-size="12" font-weight="600" font-family="system-ui">${c[0]}</text>
      <text x="72" y="${96+i*76}" fill="${t.primary}80" font-size="10" font-family="system-ui">${c[1]} • ${c[3]}</text>
      <rect x="72" y="${104+i*76}" width="148" height="6" rx="3" fill="white" opacity="0.08"/>
      <rect x="72" y="${104+i*76}" width="${148*parseInt(c[2])/100}" height="6" rx="3" fill="${t.primary}"/>
      <text x="222" y="${82+i*76}" fill="${t.primary}" font-size="12" font-weight="700" text-anchor="end" font-family="system-ui">${c[2]}%</text>
    `).join('')}
  `

  if (cat === 'Game') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Leaderboard</text>
    <rect x="72" y="60" width="100" height="96" rx="20" fill="${t.primary}20" stroke="${t.primary}35" stroke-width="1.5"/>
    <circle cx="122" cy="94" r="24" fill="${t.primary}30"/>
    <text x="122" y="100" fill="${t.primary}" font-size="16" font-weight="800" text-anchor="middle" font-family="system-ui">P1</text>
    <text x="122" y="128" fill="white" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">Player1</text>
    <text x="122" y="144" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">42,800</text>
    ${[['#2','Player2','38,420','Lv.38'],['#3','Player3','35,100','Lv.35'],
       ['#4','Player4','31,850','Lv.31'],['#5','You','28,340','Lv.28']].map((r,i)=>`
      <rect x="12" y="${172+i*50}" width="220" height="42" rx="12" fill="${r[1]==='You' ? t.primary+'18' : 'white'}" opacity="${r[1]==='You' ? 1 : 0.04}" stroke="${r[1]==='You' ? t.primary+'28' : 'none'}" stroke-width="1"/>
      <text x="30" y="${198+i*50}" fill="${i<2 ? t.primary : t.primary+'66'}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">${r[0]}</text>
      <circle cx="54" cy="${193+i*50}" r="12" fill="${t.primary}20"/>
      <text x="54" y="${197+i*50}" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">${r[1][0]}</text>
      <text x="74" y="${189+i*50}" fill="white" font-size="12" font-weight="500" font-family="system-ui">${r[1]}</text>
      <text x="74" y="${204+i*50}" fill="${t.primary}70" font-size="10" font-family="system-ui">${r[3]}</text>
      <text x="222" y="${196+i*50}" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="end" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Productivity') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Today's Tasks</text>
    <rect x="168" y="36" width="64" height="22" rx="11" fill="${t.primary}20"/>
    <text x="200" y="51" fill="${t.primary}" font-size="10" font-weight="600" text-anchor="middle" font-family="system-ui">4 / 6 done</text>
    ${[['Design review',true,'HIGH'],['Team standup',true,'MED'],['Write report',true,'HIGH'],
       ['Code review',true,'MED'],['Update docs',false,'LOW'],['Client call',false,'HIGH']].map((r,i)=>`
      <rect x="12" y="${62+i*50}" width="220" height="42" rx="12" fill="${r[1] ? 'white' : t.primary+'08'}" opacity="${r[1] ? 0.04 : 1}" stroke="${r[1] ? 'none' : t.primary+'18'}" stroke-width="1"/>
      <rect x="20" y="${72+i*50}" width="22" height="22" rx="7" fill="${r[1] ? t.primary : 'white'}" opacity="${r[1] ? 1 : 0.1}"/>
      ${r[1] ? `<line x1="25" y1="${83+i*50}" x2="30" y2="${89+i*50}" stroke="white" stroke-width="2" stroke-linecap="round"/><line x1="30" y1="${89+i*50}" x2="38" y2="${76+i*50}" stroke="white" stroke-width="2" stroke-linecap="round"/>` : ''}
      <text x="52" y="${79+i*50}" fill="${r[1] ? '#ffffff55' : 'white'}" font-size="12" font-weight="500" font-family="system-ui">${r[0]}</text>
      <rect x="168" y="${72+i*50}" width="56" height="14" rx="7" fill="${r[2]==='HIGH' ? '#ef444428' : r[2]==='MED' ? t.primary+'22' : '#ffffff10'}"/>
      <text x="196" y="${83+i*50}" fill="${r[2]==='HIGH' ? '#ef4444' : r[2]==='MED' ? t.primary : '#ffffff50'}" font-size="9" font-weight="600" text-anchor="middle" font-family="system-ui">${r[2]}</text>
    `).join('')}
  `

  if (cat === 'Travel') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">My Trip</text>
    <rect x="12" y="60" width="220" height="118" rx="16" fill="${t.primary}10" stroke="${t.primary}1c" stroke-width="1"/>
    ${[76,92,108,124,140,156].map(y=>`<line x1="12" y1="${y}" x2="232" y2="${y}" stroke="${t.primary}" stroke-width="0.4" opacity="0.15"/>`).join('')}
    ${[30,56,82,108,134,160,186,212].map(x=>`<line x1="${x}" y1="60" x2="${x}" y2="178" stroke="${t.primary}" stroke-width="0.4" opacity="0.15"/>`).join('')}
    <polyline points="30,162 68,130 110,112 148,124 200,88" fill="none" stroke="${t.primary}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="6 3"/>
    <circle cx="30" cy="162" r="6" fill="${t.primary}" opacity="0.6"/>
    <circle cx="200" cy="88" r="8" fill="${t.primary}"/>
    <rect x="188" y="70" width="24" height="22" rx="4" fill="#000000aa"/>
    <text x="200" y="85" fill="${t.primary}" font-size="10" font-weight="700" text-anchor="middle" font-family="system-ui">End</text>
    <text x="16" y="202" fill="white" font-size="12" font-weight="700" font-family="system-ui">Itinerary</text>
    ${[['Day 1','Arrival & Hotel Check-in'],['Day 2','City Tour & Landmarks'],['Day 3','Beach & Local Food']].map((d,i)=>`
      <rect x="12" y="${212+i*52}" width="220" height="44" rx="12" fill="${i===0 ? t.primary+'18' : t.primary+'08'}" stroke="${t.primary}${i===0 ? '28' : '12'}" stroke-width="1"/>
      <rect x="20" y="${220+i*52}" width="28" height="28" rx="8" fill="${t.primary}${i===0 ? '35' : '20'}"/>
      <text x="34" y="${225+i*52}" fill="${t.primary}" font-size="10" font-weight="600" text-anchor="middle" font-family="system-ui">${d[0]}</text>
      <text x="58" y="${230+i*52}" fill="${i===0 ? 'white' : '#ffffff99'}" font-size="11" font-weight="${i===0 ? '600' : '400'}" font-family="system-ui">${d[1]}</text>
    `).join('')}
  `

  if (cat === 'Lifestyle') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Book Appointment</text>
    <rect x="12" y="60" width="220" height="140" rx="16" fill="${t.primary}10" stroke="${t.primary}18" stroke-width="1"/>
    <text x="122" y="84" fill="white" font-size="12" font-weight="600" text-anchor="middle" font-family="system-ui">March 2025</text>
    ${['M','T','W','T','F','S','S'].map((d,i)=>`<text x="${28+i*30}" y="100" fill="${t.primary}80" font-size="10" text-anchor="middle" font-family="system-ui">${d}</text>`).join('')}
    ${Array.from({length:28},(_,i)=>{
      const col=i%7, row=Math.floor(i/7), day=i+1
      const sel=day===15, booked=[5,10,18,22].includes(day)
      return `<circle cx="${28+col*30}" cy="${120+row*24}" r="${sel?11:9}" fill="${sel?t.primary:booked?t.primary+'22':'none'}"/>
      <text x="${28+col*30}" y="${125+row*24}" fill="${sel?'white':booked?t.primary:'white'}" opacity="${sel?1:booked?1:0.4}" font-size="10" text-anchor="middle" font-family="system-ui">${day}</text>`
    }).join('')}
    <text x="16" y="222" fill="white" font-size="12" font-weight="700" font-family="system-ui">Available Times</text>
    ${['10:00 AM','11:30 AM','2:00 PM','4:30 PM'].map((time,i)=>`
      <rect x="${14+(i%2)*116}" y="${230+Math.floor(i/2)*50}" width="108" height="42" rx="14" fill="${i===1?t.primary:t.primary+'12'}" stroke="${i===1?'none':t.primary+'20'}" stroke-width="1"/>
      <text x="${68+(i%2)*116}" y="${255+Math.floor(i/2)*50}" fill="${i===1?'white':t.primary}" font-size="12" font-weight="${i===1?'700':'500'}" text-anchor="middle" font-family="system-ui">${time}</text>
    `).join('')}
    <rect x="12" y="340" width="220" height="42" rx="21" fill="${t.primary}"/>
    <text x="122" y="366" fill="white" font-size="13" font-weight="700" text-anchor="middle" font-family="system-ui">Confirm Booking</text>
  `

  if (cat === 'Music') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Now Playing</text>
    <rect x="72" y="60" width="100" height="100" rx="22" fill="${t.primary}20" stroke="${t.primary}35" stroke-width="1.5"/>
    <circle cx="122" cy="110" r="36" fill="${t.primary}30"/>
    <circle cx="122" cy="110" r="22" fill="${t.primary}50"/>
    <circle cx="122" cy="110" r="8"  fill="${t.primary}"/>
    <circle cx="122" cy="110" r="3"  fill="#111"/>
    <text x="122" y="183" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Midnight Rhythm</text>
    <text x="122" y="198" fill="${t.primary}80" font-size="10" text-anchor="middle" font-family="system-ui">The Beat Makers</text>
    <rect x="20" y="212" width="204" height="4" rx="2" fill="white" opacity="0.1"/>
    <rect x="20" y="212" width="122" height="4" rx="2" fill="${t.primary}"/>
    <circle cx="142" cy="214" r="6" fill="${t.primary}"/>
    <text x="20" y="232" fill="white" opacity="0.35" font-size="10" font-family="system-ui">2:04</text>
    <text x="224" y="232" fill="white" opacity="0.35" font-size="10" text-anchor="end" font-family="system-ui">3:48</text>
    <rect x="18" y="244" width="22" height="22" rx="6" fill="white" opacity="0.08"/>
    <polygon points="26,250 26,260 34,255" fill="white" opacity="0.4"/>
    <circle cx="122" cy="255" r="22" fill="${t.primary}"/>
    <rect x="114" y="247" width="6" height="16" rx="2" fill="white"/>
    <rect x="122" y="247" width="6" height="16" rx="2" fill="white"/>
    <rect x="204" y="244" width="22" height="22" rx="6" fill="white" opacity="0.08"/>
    <polygon points="210,250 218,255 210,260" fill="white" opacity="0.4"/>
    <text x="16" y="296" fill="white" font-size="12" font-weight="700" font-family="system-ui">Up Next</text>
    ${[['Electric Sunrise','3:22'],['Dark Matter','4:15'],['Neon Pulse','2:58']].map((s,i)=>`
      <rect x="12" y="${304+i*44}" width="220" height="36" rx="10" fill="white" opacity="0.04"/>
      <rect x="18" y="${312+i*44}" width="20" height="20" rx="6" fill="${t.primary}20"/>
      <rect x="22" y="${317+i*44}" width="12" height="3" rx="1" fill="${t.primary}60"/>
      <rect x="22" y="${322+i*44}" width="8" height="3" rx="1" fill="${t.primary}40"/>
      <rect x="22" y="${327+i*44}" width="10" height="3" rx="1" fill="${t.primary}30"/>
      <text x="48" y="${326+i*44}" fill="white" font-size="11" font-family="system-ui">${s[0]}</text>
      <text x="222" y="${326+i*44}" fill="white" opacity="0.35" font-size="10" text-anchor="end" font-family="system-ui">${s[1]}</text>
    `).join('')}
  `

  if (cat === 'News') return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">For You</text>
    ${['All','Tech','Biz','Sport'].map((c,i)=>`
      <rect x="${14+i*56}" y="58" width="50" height="22" rx="11" fill="${i===0?t.primary:'white'}" opacity="${i===0?1:0.07}"/>
      <text x="${39+i*56}" y="73" fill="${i===0?'white':'white'}" opacity="${i===0?1:0.35}" font-size="11" font-weight="${i===0?700:400}" text-anchor="middle" font-family="system-ui">${c}</text>
    `).join('')}
    <rect x="12" y="88" width="220" height="108" rx="16" fill="${t.primary}14" stroke="${t.primary}1c" stroke-width="1"/>
    <rect x="20" y="96" width="204" height="62" rx="10" fill="${t.primary}18"/>
    ${[0,1,2,3,4,5].map(i=>`<rect x="${26+i*34}" y="102" width="24" height="50" rx="4" fill="${t.primary}${14+i*4}"/>`).join('')}
    <rect x="20" y="162" width="54" height="14" rx="7" fill="${t.primary}28"/>
    <text x="47" y="173" fill="${t.primary}" font-size="9" font-weight="600" text-anchor="middle" font-family="system-ui">TRENDING</text>
    <text x="82" y="173" fill="white" font-size="11" font-weight="600" font-family="system-ui">Tech Giants Report Records</text>
    ${[['AI Reshapes the Industry','5 min'],['Startup Raises $50M','3 min'],['New Framework Released','4 min']].map((a,i)=>`
      <rect x="12" y="${206+i*56}" width="220" height="48" rx="12" fill="white" opacity="0.04"/>
      <rect x="18" y="${214+i*56}" width="32" height="32" rx="10" fill="${t.primary}18"/>
      ${[0,1,2].map(j=>`<rect x="${24}" y="${220+j*8+i*56}" width="${20-j*4}" height="4" rx="2" fill="${t.primary}${40+j*15}"/>`).join('')}
      <text x="60" y="${226+i*56}" fill="white" font-size="11" font-weight="600" font-family="system-ui">${a[0]}</text>
      <text x="60" y="${240+i*56}" fill="${t.primary}70" font-size="10" font-family="system-ui">${a[1]} read</text>
    `).join('')}
  `

  // Default
  return `
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">${p.category}</text>
    ${Array.from({length:6},(_,i)=>{
      const col=i%2, row=Math.floor(i/2)
      return `<rect x="${14+col*114}" y="${60+row*96}" width="106" height="86" rx="18" fill="${t.primary}${12+i*3}" stroke="${t.primary}20" stroke-width="1"/>
        <rect x="${26+col*114}" y="${72+row*96}" width="82" height="48" rx="10" fill="${t.primary}18"/>
        <text x="${67+col*114}" y="${134+row*96}" fill="white" opacity="0.6" font-size="11" text-anchor="middle" font-family="system-ui">Feature ${i+1}</text>`
    }).join('')}
  `
}

const screen1 = (p, t) => phone(t, `
  ${statusBar()}
  <rect y="28" width="244" height="44" fill="#00000035"/>
  <text x="20" y="54" fill="${t.primary}" font-size="18" font-family="system-ui">&#8592;</text>
  <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">${p.title}</text>
  ${featureContent(p, t)}
  ${bottomNav(t.primary)}
`)

// ─── Screen 2: Analytics / Charts ────────────────────────────────────────────
const screen2 = (p, t) => {
  const vals = [0.38,0.52,0.46,0.68,0.62,0.80,0.70,0.88,0.74,0.92,0.82,1.0,0.90,0.96]
  return phone(t, `
    ${statusBar()}
    <rect y="28" width="244" height="44" fill="#00000035"/>
    <text x="20" y="54" fill="${t.primary}" font-size="18" font-family="system-ui">&#8592;</text>
    <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Analytics</text>
    ${['1W','1M','3M','1Y'].map((l,i)=>`
      <rect x="${12+i*56}" y="78" width="50" height="22" rx="11" fill="${i===1?t.primary:'white'}" opacity="${i===1?1:0.07}"/>
      <text x="${37+i*56}" y="93" fill="${i===1?'white':'white'}" opacity="${i===1?1:0.3}" font-size="11" font-weight="${i===1?700:400}" text-anchor="middle" font-family="system-ui">${l}</text>
    `).join('')}
    <text x="16" y="130" fill="${t.primary}99" font-size="11" font-family="system-ui">Total Growth</text>
    <text x="16" y="160" fill="white" font-size="26" font-weight="800" font-family="system-ui">+$3,240.00</text>
    <rect x="16" y="168" width="62" height="18" rx="9" fill="${t.primary}25"/>
    <text x="47" y="181" fill="${t.primary}" font-size="11" font-weight="700" text-anchor="middle" font-family="system-ui">+26.2%</text>
    ${lineChart(16, 194, vals, t.primary, 212, 88)}
    ${['Jan','Feb','Mar','Apr','May','Jun'].map((m,i)=>`
      <text x="${16+i*42}" y="296" fill="white" opacity="0.25" font-size="9" font-family="system-ui">${m}</text>
    `).join('')}
    ${[['Revenue','$12.4K','+18%'],['Users','4,821','+24%'],['Orders','1,234','+12%'],['Rating','4.8 / 5','+0.2']].map((s,i)=>`
      <rect x="${12+(i%2)*116}" y="${304+Math.floor(i/2)*58}" width="108" height="50" rx="14" fill="${t.primary}0c" stroke="${t.primary}16" stroke-width="1"/>
      <text x="${26+(i%2)*116}" y="${323+Math.floor(i/2)*58}" fill="${t.primary}80" font-size="10" font-family="system-ui">${s[0]}</text>
      <text x="${26+(i%2)*116}" y="${343+Math.floor(i/2)*58}" fill="white" font-size="14" font-weight="700" font-family="system-ui">${s[1]}</text>
      <text x="${108+(i%2)*116}" y="${323+Math.floor(i/2)*58}" fill="${t.primary}" font-size="10" font-weight="600" text-anchor="end" font-family="system-ui">${s[2]}</text>
    `).join('')}
    ${bottomNav(t.primary)}
  `)
}

// ─── Screen 3: Profile ────────────────────────────────────────────────────────
const screen3 = (p, t) => phone(t, `
  ${statusBar()}
  <rect y="28" width="244" height="44" fill="#00000035"/>
  <text x="122" y="52" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">Profile</text>
  <circle cx="122" cy="118" r="38" fill="${t.primary}22" stroke="${t.primary}38" stroke-width="2"/>
  <circle cx="122" cy="110" r="17" fill="${t.primary}55"/>
  <path d="M90 148 a32 18 0 0 1 64 0" fill="${t.primary}40"/>
  <text x="122" y="172" fill="white" font-size="15" font-weight="800" text-anchor="middle" font-family="system-ui">Alex Johnson</text>
  <text x="122" y="188" fill="${t.primary}80" font-size="11" text-anchor="middle" font-family="system-ui">Premium • ${p.category}</text>
  ${[['Projects','24'],['Rating','4.9'],['Since','2022']].map((s,i)=>`
    <rect x="${12+i*78}" y="196" width="70" height="50" rx="14" fill="${t.primary}12" stroke="${t.primary}1e" stroke-width="1"/>
    <text x="${47+i*78}" y="216" fill="${t.primary}80" font-size="10" text-anchor="middle" font-family="system-ui">${s[0]}</text>
    <text x="${47+i*78}" y="234" fill="white" font-size="14" font-weight="700" text-anchor="middle" font-family="system-ui">${s[1]}</text>
  `).join('')}
  ${[['Account Settings','Manage profile'],['Notifications','3 new alerts'],['Privacy','All secure'],['Subscription','Premium Active'],['Help','Contact support']].map((item,i)=>`
    <rect x="12" y="${258+i*48}" width="220" height="40" rx="11" fill="white" opacity="0.04"/>
    <rect x="20" y="${266+i*48}" width="24" height="24" rx="8" fill="${t.primary}18"/>
    <rect x="26" y="${272+i*48}" width="12" height="3" rx="1" fill="${t.primary}60"/>
    <rect x="26" y="${278+i*48}" width="8"  height="3" rx="1" fill="${t.primary}40"/>
    <rect x="26" y="${284+i*48}" width="10" height="3" rx="1" fill="${t.primary}30"/>
    <text x="54" y="${276+i*48}" fill="white" font-size="12" font-weight="500" font-family="system-ui">${item[0]}</text>
    <text x="54" y="${290+i*48}" fill="${t.primary}60" font-size="10" font-family="system-ui">${item[1]}</text>
    <text x="222" y="${281+i*48}" fill="white" opacity="0.22" font-size="16" text-anchor="end" font-family="system-ui">&#8250;</text>
  `).join('')}
  ${bottomNav(t.primary)}
`)

// ─── Public API ───────────────────────────────────────────────────────────────
export const generateMockupImages = (project) => {
  const t = THEMES[project.category] || THEMES['Utility']
  return [
    toDataURL(screen0(project, t)),
    toDataURL(screen1(project, t)),
    toDataURL(screen2(project, t)),
    toDataURL(screen3(project, t)),
  ]
}
