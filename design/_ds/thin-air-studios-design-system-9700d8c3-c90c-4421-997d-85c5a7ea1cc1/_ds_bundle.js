/* @ds-bundle: {"format":3,"namespace":"ThinAirStudiosDesignSystem_9700d8","components":[{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"},{"name":"Mark","sourcePath":"components/core/Mark.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Wordmark","sourcePath":"components/core/Wordmark.jsx"},{"name":"ServiceCard","sourcePath":"components/display/ServiceCard.jsx"},{"name":"Tag","sourcePath":"components/display/Tag.jsx"},{"name":"WorkCard","sourcePath":"components/display/WorkCard.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Nav","sourcePath":"components/navigation/Nav.jsx"}],"sourceHashes":{"components/core/Button.jsx":"4a29fbaa9b40","components/core/Eyebrow.jsx":"9e4e70c033a0","components/core/Mark.jsx":"ee025bf03749","components/core/SectionHeading.jsx":"ae5f868abd42","components/core/Wordmark.jsx":"5f5b510c8cdd","components/display/ServiceCard.jsx":"18f27e6b4fb0","components/display/Tag.jsx":"34264b6d4ba7","components/display/WorkCard.jsx":"1210c93c7ea2","components/forms/Input.jsx":"50511d8c01ce","components/forms/Textarea.jsx":"3aea44583095","components/navigation/Footer.jsx":"104c6d3fc404","components/navigation/Nav.jsx":"c2fc8a2a3354","ui_kits/marketing-site/ContactPage.jsx":"f3b92c253b52","ui_kits/marketing-site/HomePage.jsx":"e16527cf4a38","ui_kits/marketing-site/ServicesPage.jsx":"a381f08ca7a8","ui_kits/marketing-site/StudioPage.jsx":"e0b7cb09aa7e","ui_kits/marketing-site/WorkPage.jsx":"7f8a709a303a"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ThinAirStudiosDesignSystem_9700d8 = window.ThinAirStudiosDesignSystem_9700d8 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Button — primary (ink fill), secondary (hairline outline), ghost (text +
 * particle on hover). Two sizes. Hover = quiet lift / lighten; ghost draws
 * the particle accent. Small precise radius, no shadow.
 */
function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const sizes = {
    sm: {
      padding: '8px 16px',
      fontSize: 'var(--text-xs, .75rem)'
    },
    md: {
      padding: '13px 24px',
      fontSize: 'var(--text-sm, .875rem)'
    }
  };
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2, .5rem)',
    fontFamily: 'var(--font-mono)',
    fontWeight: 'var(--weight-reg, 400)',
    letterSpacing: 'var(--track-air, .22em)',
    textTransform: 'uppercase',
    border: '1px solid transparent',
    borderRadius: 'var(--radius, 6px)',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    transition: 'transform var(--dur-fast,180ms) var(--ease), background-color var(--dur-fast,180ms) var(--ease), color var(--dur-fast,180ms) var(--ease), border-color var(--dur-fast,180ms) var(--ease)',
    transform: active ? 'translateY(0)' : hover ? 'translateY(-1px)' : 'translateY(0)',
    ...sizes[size]
  };
  const variants = {
    primary: {
      background: hover ? 'var(--slate-700)' : 'var(--slate-800)',
      color: 'var(--paper)',
      borderColor: 'transparent'
    },
    secondary: {
      background: 'transparent',
      color: 'var(--text)',
      borderColor: hover ? 'var(--text)' : 'var(--line)'
    },
    ghost: {
      background: 'transparent',
      color: hover ? 'var(--accent)' : 'var(--text)',
      borderColor: 'transparent',
      letterSpacing: 'var(--track-air, .22em)'
    }
  };
  const El = as;
  return /*#__PURE__*/React.createElement(El, _extends({
    style: {
      ...base,
      ...variants[variant],
      ...style
    },
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false)
  }, rest), children, variant === 'ghost' && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      display: 'inline-block',
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: 'var(--particle)',
      opacity: hover ? 1 : 0,
      transform: hover ? 'translateX(0)' : 'translateX(-4px)',
      transition: 'opacity var(--dur-fast,180ms) var(--ease), transform var(--dur-fast,180ms) var(--ease)'
    }
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Eyebrow / label — wide-tracked small caps, the recurring "air" device.
 * Mono face, --track-air. Sits above headings to introduce a section.
 * Optional leading particle dot for "live"/accented labels.
 */
function Eyebrow({
  children,
  dot = false,
  as = 'div',
  style,
  ...rest
}) {
  const El = as;
  return /*#__PURE__*/React.createElement(El, _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-2, .5rem)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      fontWeight: 'var(--weight-reg, 400)',
      letterSpacing: 'var(--track-air, .22em)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '5px',
      height: '5px',
      borderRadius: '50%',
      background: 'var(--particle)',
      boxShadow: '0 0 0 3px var(--particle-glow, rgba(143,182,196,.18))',
      flex: '0 0 auto'
    }
  }), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/core/Mark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Atmosphere mark (concept A) — the primary Thin Air Studios icon.
 * Stacked strata, dense at the base, thinning toward a lone particle.
 * Inherits color via `currentColor`; the particle dot carries the accent.
 *
 * When `animate` is set, the strata assemble bottom-up on mount (base line
 * first, each thinner line settling in above it, the particle landing last) —
 * the signature "forms out of thin air" load motion. Respects
 * prefers-reduced-motion (renders fully formed).
 */
function Mark({
  size = 48,
  animate = false,
  particle = '#8fb6c4',
  style,
  ...rest
}) {
  const lines = [{
    x1: 18,
    x2: 82,
    y: 82,
    w: 7,
    o: 1
  }, {
    x1: 20,
    x2: 80,
    y: 72,
    w: 6,
    o: 0.92
  }, {
    x1: 23.5,
    x2: 76.5,
    y: 63,
    w: 5,
    o: 0.82
  }, {
    x1: 27,
    x2: 73,
    y: 55,
    w: 4.2,
    o: 0.7
  }, {
    x1: 31,
    x2: 69,
    y: 48,
    w: 3.4,
    o: 0.58
  }, {
    x1: 35,
    x2: 65,
    y: 42,
    w: 2.7,
    o: 0.46
  }, {
    x1: 39,
    x2: 61,
    y: 37,
    w: 2.1,
    o: 0.34
  }, {
    x1: 43,
    x2: 57,
    y: 33,
    w: 1.6,
    o: 0.24
  }, {
    x1: 46.5,
    x2: 53.5,
    y: 29.5,
    w: 1.3,
    o: 0.16
  }];
  const n = lines.length;
  return /*#__PURE__*/React.createElement("svg", _extends({
    width: size,
    height: size,
    viewBox: "0 0 100 100",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round",
    role: "img",
    "aria-label": "Thin Air Studios",
    style: style
  }, rest), lines.map((l, i) => /*#__PURE__*/React.createElement("line", {
    key: i,
    x1: l.x1,
    y1: l.y,
    x2: l.x2,
    y2: l.y,
    strokeWidth: l.w,
    opacity: l.o,
    style: animate ? {
      animation: `tas-strata var(--dur-slow,760ms) var(--ease,cubic-bezier(.2,.7,.2,1)) both`,
      animationDelay: `${i * 70}ms`
    } : undefined
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "24",
    r: "5.5",
    fill: "var(--particle-glow, rgba(143,182,196,.18))",
    stroke: "none",
    style: animate ? {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: `tas-glow var(--dur,420ms) var(--ease,cubic-bezier(.2,.7,.2,1)) both`,
      animationDelay: `${n * 70 + 120}ms`
    } : undefined
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "50",
    cy: "24",
    r: "3",
    fill: particle,
    stroke: "none",
    style: animate ? {
      transformBox: 'fill-box',
      transformOrigin: 'center',
      animation: `tas-particle var(--dur,420ms) var(--ease,cubic-bezier(.2,.7,.2,1)) both`,
      animationDelay: `${n * 70 + 120}ms`
    } : undefined
  }), animate && /*#__PURE__*/React.createElement("style", null, `
          @keyframes tas-strata {
            from { opacity: 0; transform: translateY(6px); }
          }
          @keyframes tas-particle {
            0%   { opacity: 0; transform: translateY(4px) scale(.3); }
            60%  { opacity: 1; transform: translateY(0) scale(1.3); }
            100% { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes tas-glow {
            0%   { opacity: 0; transform: scale(.2); }
            55%  { opacity: 1; transform: scale(1.7); }
            100% { opacity: .9; transform: scale(1); }
          }
          @media (prefers-reduced-motion: reduce) {
            line, circle { animation: none !important; }
          }
        `));
}
Object.assign(__ds_scope, { Mark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Mark.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Section heading — Space Grotesk light, large, slightly tight tracking.
 * The display voice. Never bold. Sizes map to the airy top of the scale.
 */
function SectionHeading({
  children,
  size = 'xl',
  as = 'h2',
  style,
  ...rest
}) {
  const sizes = {
    sm: 'var(--text-xl, 1.5rem)',
    md: 'var(--text-2xl, 2.25rem)',
    lg: 'var(--text-3xl, 3.5rem)',
    xl: 'var(--text-4xl, 5rem)'
  };
  const El = as;
  return /*#__PURE__*/React.createElement(El, _extends({
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light, 300)',
      fontSize: sizes[size],
      lineHeight: 'var(--leading-tight, 1.08)',
      letterSpacing: 'var(--track-tight, -.015em)',
      color: 'var(--text)',
      margin: 0,
      textWrap: 'pretty',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wordmark lockup (concept D) — the Atmosphere mark beside the name.
 * Light geometric caps, letter-spacing as air; "Studios" tracked wider beneath.
 * The everyday signature — use in nav and sign-offs.
 */
function Wordmark({
  size = 34,
  animate = false,
  showStudios = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'var(--space-3, .75rem)',
      color: 'var(--text)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Mark, {
    size: size,
    animate: animate
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '3px',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light, 300)',
      letterSpacing: 'var(--track-wordmark, .42em)',
      textTransform: 'uppercase',
      fontSize: `${size * 0.44}px`,
      whiteSpace: 'nowrap'
    }
  }, "Thin\xA0Air"), showStudios && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-reg, 400)',
      letterSpacing: '.6em',
      textTransform: 'uppercase',
      fontSize: `${size * 0.2}px`,
      opacity: 0.55,
      paddingLeft: '.6em',
      whiteSpace: 'nowrap'
    }
  }, "Studios")));
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/display/ServiceCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Service block / feature card — numbered rule, title, blurb. The three
 * pillars of the studio. Hairline-topped, airy, no fill. Quiet lift on hover.
 */
function ServiceCard({
  index,
  title,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4, 1rem)',
      paddingTop: 'var(--space-6, 1.5rem)',
      borderTop: '1px solid',
      borderColor: hover ? 'var(--accent)' : 'var(--line)',
      transition: 'border-color var(--dur,420ms) var(--ease), transform var(--dur,420ms) var(--ease)',
      transform: hover ? 'translateY(-2px)' : 'translateY(0)',
      ...style
    }
  }, rest), index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: 'var(--track-air, .22em)',
      color: 'var(--text-muted)'
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light, 300)',
      fontSize: 'var(--text-xl, 1.5rem)',
      lineHeight: 'var(--leading-snug, 1.3)',
      letterSpacing: '.01em',
      color: 'var(--text)',
      margin: 0
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base, 1rem)',
      lineHeight: 'var(--leading, 1.6)',
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: '42ch',
      textWrap: 'pretty'
    }
  }, children));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/display/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Tag — wide-tracked mono micro-label for classification (Web / App /
 * Embedded). Hairline capsule, no fill. Quiet by default.
 */
function Tag({
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: 'var(--track-air, .22em)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)',
      border: '1px solid var(--line)',
      borderRadius: 'var(--radius-sm, 4px)',
      padding: '3px 9px',
      lineHeight: 1,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/Tag.jsx", error: String((e && e.message) || e) }); }

// components/display/WorkCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Work card — project codename, one-line result, classification tags.
 * Hover = quiet lift + the codename draws toward the particle, a hairline
 * arrow appears. Hairline-bounded, generous interior space.
 */
function WorkCard({
  name,
  result,
  tags = [],
  href = '#',
  style,
  ...rest
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 'var(--space-12, 3rem)',
      minHeight: '260px',
      padding: 'var(--space-6, 1.5rem)',
      border: '1px solid',
      borderColor: hover ? 'var(--slate-400)' : 'var(--line)',
      borderRadius: 'var(--radius-lg, 12px)',
      background: 'var(--bg)',
      textDecoration: 'none',
      transition: 'border-color var(--dur,420ms) var(--ease), transform var(--dur,420ms) var(--ease)',
      transform: hover ? 'translateY(-3px)' : 'translateY(0)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light, 300)',
      fontSize: 'var(--text-2xl, 2.25rem)',
      letterSpacing: '.02em',
      color: hover ? 'var(--accent)' : 'var(--text)',
      transition: 'color var(--dur,420ms) var(--ease)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-lg, 1.125rem)',
      color: 'var(--accent)',
      opacity: hover ? 1 : 0,
      transform: hover ? 'translate(0,0)' : 'translate(-4px,4px)',
      transition: 'opacity var(--dur,420ms) var(--ease), transform var(--dur,420ms) var(--ease)'
    }
  }, "\u2197")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4, 1rem)'
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base, 1rem)',
      lineHeight: 'var(--leading, 1.6)',
      color: 'var(--text-muted)',
      margin: 0,
      maxWidth: '36ch',
      textWrap: 'pretty'
    }
  }, result), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-2, .5rem)'
    }
  }, tags.map(t => /*#__PURE__*/React.createElement(__ds_scope.Tag, {
    key: t
  }, t)))));
}
Object.assign(__ds_scope, { WorkCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/display/WorkCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Text input — hairline underline that lightens to a particle line on focus.
 * Label in wide-tracked mono; error message in the studio's calm voice.
 * Focus ring is the particle (a moment of "appearing").
 */
function Input({
  label,
  error,
  id,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || (label ? `f-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--particle-deep)' : focus ? 'var(--particle-strong)' : 'var(--line)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2, .5rem)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: 'var(--track-air, .22em)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("input", _extends({
    id: fieldId,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base, 1rem)',
      color: 'var(--text)',
      background: 'transparent',
      border: 'none',
      borderBottom: `1px solid ${borderColor}`,
      borderRadius: 0,
      padding: '10px 2px',
      outline: 'none',
      transition: 'border-color var(--dur-fast,180ms) var(--ease), box-shadow var(--dur-fast,180ms) var(--ease)',
      boxShadow: focus && !error ? '0 1px 0 0 var(--particle-strong)' : 'none'
    },
    "aria-invalid": error ? 'true' : undefined
  }, rest)), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: '.04em',
      color: 'var(--particle-deep)'
    }
  }, error));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Textarea — multi-line field for "what you're building". Same hairline +
 * particle-focus language as Input. Calm placeholder, calm error.
 */
function Textarea({
  label,
  error,
  id,
  rows = 4,
  style,
  ...rest
}) {
  const [focus, setFocus] = useState(false);
  const fieldId = id || (label ? `f-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const borderColor = error ? 'var(--particle-deep)' : focus ? 'var(--particle-strong)' : 'var(--line)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2, .5rem)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: fieldId,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: 'var(--track-air, .22em)',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, label), /*#__PURE__*/React.createElement("textarea", _extends({
    id: fieldId,
    rows: rows,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--text-base, 1rem)',
      lineHeight: 'var(--leading, 1.6)',
      color: 'var(--text)',
      background: 'transparent',
      border: `1px solid ${borderColor}`,
      borderRadius: 'var(--radius, 6px)',
      padding: 'var(--space-3, .75rem)',
      outline: 'none',
      resize: 'vertical',
      transition: 'border-color var(--dur-fast,180ms) var(--ease)'
    },
    "aria-invalid": error ? 'true' : undefined
  }, rest)), error && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: '.04em',
      color: 'var(--particle-deep)'
    }
  }, error));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Footer — TAS monogram (concept C), the line, nav, © Thin Air Studios.
 * Hairline-topped horizon, generous air. Theme-aware.
 */
function Footer({
  links = ['Work', 'Services', 'Studio', 'Contact'],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-12, 3rem)',
      padding: 'var(--space-16, 4rem) var(--space-8, 2rem) var(--space-8, 2rem)',
      borderTop: '1px solid var(--line)',
      background: 'var(--bg)',
      color: 'var(--text)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: 'var(--space-12, 3rem)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4, 1rem)'
    }
  }, /*#__PURE__*/React.createElement(TasMonogram, null), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 'var(--weight-light, 300)',
      fontSize: 'var(--text-lg, 1.125rem)',
      letterSpacing: '.01em',
      color: 'var(--text)',
      margin: 0
    }
  }, "We built it out of thin air.")), /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--space-6, 1.5rem)',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: `#${l.toLowerCase()}`,
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: 'var(--track-air, .22em)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: 'var(--text-muted)'
    }
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: '.06em',
      color: 'var(--text-muted)'
    }
  }, "\xA9 Thin Air Studios"));
}
function TasMonogram() {
  return /*#__PURE__*/React.createElement("svg", {
    width: "120",
    height: "50",
    viewBox: "0 0 150 96",
    fill: "none",
    role: "img",
    "aria-label": "TAS",
    style: {
      color: 'var(--text)'
    }
  }, /*#__PURE__*/React.createElement("text", {
    x: "14",
    y: "56",
    fill: "currentColor",
    fontFamily: "var(--font-display)",
    fontWeight: "300",
    fontSize: "46",
    letterSpacing: "10"
  }, "TAS"), /*#__PURE__*/React.createElement("g", {
    stroke: "currentColor",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "16",
    y1: "78",
    x2: "62",
    y2: "78",
    strokeWidth: "2.4"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "68",
    y1: "78",
    x2: "92",
    y2: "78",
    strokeWidth: "1.7",
    opacity: "0.6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "98",
    y1: "78",
    x2: "112",
    y2: "78",
    strokeWidth: "1.2",
    opacity: "0.34"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "118",
    y1: "78",
    x2: "126",
    y2: "78",
    strokeWidth: "1",
    opacity: "0.18"
  })));
}
Object.assign(__ds_scope, { Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Nav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  useState
} = React;
/**
 * Nav — Wordmark lockup (concept D) + links; theme-aware. Links are quiet text
 * that draw the particle on hover. Hairline bottom rule as a horizon.
 */
function Nav({
  links = ['Work', 'Services', 'Studio', 'Contact'],
  active,
  cta,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 'var(--space-8, 2rem)',
      padding: 'var(--space-6, 1.5rem) var(--space-8, 2rem)',
      borderBottom: '1px solid var(--line)',
      background: 'var(--bg)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Wordmark, {
    size: 30
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-8, 2rem)'
    }
  }, /*#__PURE__*/React.createElement("ul", {
    style: {
      display: 'flex',
      gap: 'var(--space-6, 1.5rem)',
      listStyle: 'none',
      margin: 0,
      padding: 0
    }
  }, links.map(l => /*#__PURE__*/React.createElement(NavLink, {
    key: l,
    label: l,
    active: active === l
  }))), cta));
}
function NavLink({
  label,
  active
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", {
    href: `#${label.toLowerCase()}`,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--text-xs, .75rem)',
      letterSpacing: 'var(--track-air, .22em)',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color: active || hover ? 'var(--text)' : 'var(--text-muted)',
      transition: 'color var(--dur-fast,180ms) var(--ease)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      width: '4px',
      height: '4px',
      borderRadius: '50%',
      background: 'var(--particle)',
      boxShadow: active || hover ? '0 0 0 3px var(--particle-glow, rgba(143,182,196,.18))' : 'none',
      opacity: active || hover ? 1 : 0,
      transition: 'opacity var(--dur-fast,180ms) var(--ease)'
    }
  }), label));
}
Object.assign(__ds_scope, { Nav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Nav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ContactPage.jsx
try { (() => {
/* Contact — short form + the line, with calm success state.
   Exports window.ContactPage. */
(function () {
  const {
    Eyebrow,
    SectionHeading,
    Button,
    Input,
    Textarea,
    Mark
  } = window.ThinAirStudiosDesignSystem_9700d8;
  function ContactPage() {
    const [sent, setSent] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [touched, setTouched] = React.useState(false);
    const emailErr = touched && email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "That doesn't look like an email yet." : undefined;
    if (sent) {
      return /*#__PURE__*/React.createElement("section", {
        className: "shell contact-success"
      }, /*#__PURE__*/React.createElement(Mark, {
        size: 72,
        animate: true
      }), /*#__PURE__*/React.createElement(SectionHeading, {
        size: "md",
        style: {
          textAlign: 'center'
        }
      }, "Got it."), /*#__PURE__*/React.createElement("p", {
        className: "closing-sub"
      }, "We'll be in touch shortly."));
    }
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      className: "shell page-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact"), /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg"
    }, "Tell us the problem."), /*#__PURE__*/React.createElement("p", {
      className: "lead",
      style: {
        marginTop: 'var(--space-4)'
      }
    }, "A sentence is enough to start.")), /*#__PURE__*/React.createElement("section", {
      className: "shell contact"
    }, /*#__PURE__*/React.createElement("form", {
      className: "contact-form",
      onSubmit: e => {
        e.preventDefault();
        setTouched(true);
        if (!emailErr) setSent(true);
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "field-row"
    }, /*#__PURE__*/React.createElement(Input, {
      label: "Name",
      name: "name",
      autoComplete: "name"
    }), /*#__PURE__*/React.createElement(Input, {
      label: "Email",
      name: "email",
      type: "email",
      value: email,
      onChange: e => setEmail(e.target.value),
      onBlur: () => setTouched(true),
      error: emailErr
    })), /*#__PURE__*/React.createElement(Textarea, {
      label: "What you're building",
      name: "brief",
      rows: 5,
      placeholder: "A spreadsheet that's outgrown itself. A device that needs a brain. A site that needs to land."
    }), /*#__PURE__*/React.createElement("div", {
      className: "contact-actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      type: "submit"
    }, "Send it up")))));
  }
  window.ContactPage = ContactPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ContactPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/HomePage.jsx
try { (() => {
/* Home — hero through closing CTA. Composes the kit primitives.
   Exports window.HomePage. */
(function () {
  const {
    Nav,
    Footer,
    Eyebrow,
    SectionHeading,
    Button,
    Mark,
    ServiceCard,
    WorkCard
  } = window.ThinAirStudiosDesignSystem_9700d8;
  const SERVICES = [{
    i: 1,
    t: 'Web & Marketing Sites',
    b: 'The first thing people meet. Fast, distinctive sites that load like a thought and read like the product already works.'
  }, {
    i: 2,
    t: 'Applications & Product UI/UX',
    b: 'Large applications with interfaces people actually want to use. We sweat the states everyone skips — the empty screen, the loading moment, the error nobody planned for.'
  }, {
    i: 3,
    t: 'Embedded Systems',
    b: 'Software close to the metal. Firmware, connected devices, the systems that run without a screen. When the work goes down to the hardware, we go with it.'
  }];
  const WORK = [{
    name: 'Cirrus',
    result: 'Turned a tangle of spreadsheets into a control room. A logistics dashboard a team runs their whole day from.',
    tags: ['Web App', 'UI-UX']
  }, {
    name: 'Meridian',
    result: 'Firmware and a companion app for a connected device — the screen and the silicon, built by one team so they actually agree.',
    tags: ['Embedded', 'App']
  }, {
    name: 'Aurora',
    result: 'A launch site for a product that needed to feel inevitable. Quiet, fast, and impossible to mistake for anyone else.',
    tags: ['Web']
  }];
  function Reveal({
    children,
    delay = 0,
    as = 'div',
    style
  }) {
    const ref = React.useRef(null);
    React.useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) {
          el.setAttribute('data-in', '');
          io.unobserve(el);
        }
      }), {
        threshold: 0.15
      });
      io.observe(el);
      return () => io.disconnect();
    }, []);
    const El = as;
    return /*#__PURE__*/React.createElement(El, {
      ref: ref,
      className: "reveal",
      style: {
        transitionDelay: `${delay}ms`,
        ...style
      }
    }, children);
  }
  function Hero({
    onNav
  }) {
    return /*#__PURE__*/React.createElement("header", {
      className: "hero"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-particles",
      "aria-hidden": "true"
    }), /*#__PURE__*/React.createElement("div", {
      className: "shell hero-inner"
    }, /*#__PURE__*/React.createElement("div", {
      className: "hero-mark"
    }, /*#__PURE__*/React.createElement(Mark, {
      size: 88,
      animate: true
    })), /*#__PURE__*/React.createElement("div", {
      className: "hero-eb"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      dot: true
    }, "Software Studio")), /*#__PURE__*/React.createElement("h1", {
      className: "hero-h1"
    }, "We built it", /*#__PURE__*/React.createElement("br", null), "out of thin air."), /*#__PURE__*/React.createElement("p", {
      className: "hero-sub"
    }, "One studio for the whole thing \u2014 the site that introduces a product, the application that ", /*#__PURE__*/React.createElement("em", null, "is"), " the product, and the firmware running underneath it. From the browser to the bare metal."), /*#__PURE__*/React.createElement("div", {
      className: "hero-cta"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNav('Contact')
    }, "Start a build"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => onNav('Work')
    }, "See the work"))), /*#__PURE__*/React.createElement("div", {
      className: "hero-rule",
      "aria-hidden": "true"
    }));
  }
  function HomePage({
    onNav
  }) {
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
      onNav: onNav
    }), /*#__PURE__*/React.createElement("section", {
      className: "shell section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "What we do"), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, "We design and engineer end to end. No handoffs between a design shop and a dev shop \u2014 the people who draw it are the people who build it.")), /*#__PURE__*/React.createElement("div", {
      className: "three-up"
    }, SERVICES.map((s, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: s.i,
      delay: i * 90
    }, /*#__PURE__*/React.createElement(ServiceCard, {
      index: s.i,
      title: s.t
    }, s.b))))), /*#__PURE__*/React.createElement("section", {
      className: "shell section"
    }, /*#__PURE__*/React.createElement("div", {
      className: "section-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Selected work"), /*#__PURE__*/React.createElement("p", {
      className: "lead"
    }, "A few things we've made. ", /*#__PURE__*/React.createElement("span", {
      className: "muted"
    }, "(Placeholder set \u2014 swap for real case studies.)"))), /*#__PURE__*/React.createElement("div", {
      className: "work-grid"
    }, WORK.map((w, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: w.name,
      delay: i * 90
    }, /*#__PURE__*/React.createElement(WorkCard, {
      name: w.name,
      result: w.result,
      tags: w.tags,
      onClick: e => {
        e.preventDefault();
        onNav('Work');
      }
    }))))), /*#__PURE__*/React.createElement("section", {
      className: "band"
    }, /*#__PURE__*/React.createElement("div", {
      className: "shell how"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "How we work"), /*#__PURE__*/React.createElement(Reveal, {
      as: "div"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg",
      className: "how-h"
    }, "Tell us the problem. We'll hand you the product.")), /*#__PURE__*/React.createElement("p", {
      className: "how-body"
    }, "We figure out the shape of the answer, build it the whole way down, and give you something that works \u2014 not a deck about something that might. Small team, senior hands, no layers between you and the people doing the work."))), /*#__PURE__*/React.createElement("section", {
      className: "shell closing"
    }, /*#__PURE__*/React.createElement(Reveal, {
      as: "div",
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-6)'
      }
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg",
      style: {
        textAlign: 'center'
      }
    }, "Got something to build?"), /*#__PURE__*/React.createElement("p", {
      className: "closing-sub"
    }, "A sentence is enough to start."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNav('Contact')
    }, "Start a build"))));
  }
  window.HomePage = HomePage;
  window.TASReveal = Reveal;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ServicesPage.jsx
try { (() => {
/* Services — the three pillars in depth. Exports window.ServicesPage. */
(function () {
  const {
    Eyebrow,
    SectionHeading,
    Button
  } = window.ThinAirStudiosDesignSystem_9700d8;
  const PILLARS = [{
    n: '01',
    t: 'Web & Marketing Sites',
    b: 'The first thing people meet. Fast, distinctive sites that load like a thought and read like the product already works. Designed and built from scratch — never a template wearing your logo.',
    notes: ['Designed from scratch', 'Built for speed', 'Distinctly yours']
  }, {
    n: '02',
    t: 'Applications & Product UI/UX',
    b: 'Large applications with interfaces people actually want to use. We sweat the states everyone skips — the empty screen, the loading moment, the error nobody planned for — because that\u2019s where software feels finished or doesn\u2019t. Designed and engineered to ship.',
    notes: ['Every state designed', 'Designed + engineered', 'Built to ship']
  }, {
    n: '03',
    t: 'Embedded Systems',
    b: 'Software close to the metal. Firmware, connected devices, the systems that run without a screen. When the work goes all the way down to the hardware, we go with it.',
    notes: ['Firmware', 'Connected devices', 'All the way down']
  }];
  function ServicesPage({
    onNav
  }) {
    const Reveal = window.TASReveal;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      className: "shell page-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Services"), /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg"
    }, "We design and engineer", /*#__PURE__*/React.createElement("br", null), "the whole thing."), /*#__PURE__*/React.createElement("p", {
      className: "lead",
      style: {
        marginTop: 'var(--space-4)'
      }
    }, "Three pillars, one team. No handoffs \u2014 the people who draw it are the people who build it.")), /*#__PURE__*/React.createElement("section", {
      className: "shell",
      style: {
        paddingBottom: 'var(--space-24)'
      }
    }, PILLARS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: p.n,
      delay: i * 60
    }, /*#__PURE__*/React.createElement("article", {
      className: "pillar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "pillar-num"
    }, p.n), /*#__PURE__*/React.createElement("div", {
      className: "pillar-body"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      size: "md",
      as: "h3"
    }, p.t), /*#__PURE__*/React.createElement("p", {
      className: "pillar-text"
    }, p.b), /*#__PURE__*/React.createElement("ul", {
      className: "pillar-notes"
    }, p.notes.map(nt => /*#__PURE__*/React.createElement("li", {
      key: nt
    }, nt)))))))), /*#__PURE__*/React.createElement("section", {
      className: "shell closing"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      size: "md",
      style: {
        textAlign: 'center'
      }
    }, "Not sure which one you need?"), /*#__PURE__*/React.createElement("p", {
      className: "closing-sub"
    }, "That's fine. Tell us the problem."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNav('Contact')
    }, "Start a build")));
  }
  window.ServicesPage = ServicesPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ServicesPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/StudioPage.jsx
try { (() => {
/* Studio / About — who we are, the thin-air idea. Exports window.StudioPage. */
(function () {
  const {
    Eyebrow,
    SectionHeading,
    Button,
    Mark
  } = window.ThinAirStudiosDesignSystem_9700d8;
  function StudioPage({
    onNav
  }) {
    const Reveal = window.TASReveal;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      className: "shell page-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Studio"), /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg"
    }, "The name is the promise.")), /*#__PURE__*/React.createElement("section", {
      className: "shell studio"
    }, /*#__PURE__*/React.createElement(Reveal, {
      as: "div",
      style: {
        display: 'flex',
        justifyContent: 'center',
        padding: 'var(--space-12) 0'
      }
    }, /*#__PURE__*/React.createElement(Mark, {
      size: 120,
      animate: true
    })), /*#__PURE__*/React.createElement("p", {
      className: "studio-body"
    }, "Air thins as you climb \u2014 the higher you go, the clearer it gets, until what's left is only the thing that works. We make software the same way: strip it down to what matters, then build that part exceptionally well. A small studio of senior people who design, engineer, and ship the whole thing.")), /*#__PURE__*/React.createElement("section", {
      className: "shell"
    }, /*#__PURE__*/React.createElement("div", {
      className: "three-up"
    }, /*#__PURE__*/React.createElement(Reveal, {
      delay: 0
    }, /*#__PURE__*/React.createElement("div", {
      className: "value"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Small"), /*#__PURE__*/React.createElement("p", null, "Senior hands, no layers. The people you talk to are the people doing the work."))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 90
    }, /*#__PURE__*/React.createElement("div", {
      className: "value"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "End to end"), /*#__PURE__*/React.createElement("p", null, "Design and engineering under one roof. No handoff, no telephone game, no seams."))), /*#__PURE__*/React.createElement(Reveal, {
      delay: 180
    }, /*#__PURE__*/React.createElement("div", {
      className: "value"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      dot: true
    }, "All the way down"), /*#__PURE__*/React.createElement("p", null, "From the browser to the bare metal \u2014 we go as deep as the problem does."))))), /*#__PURE__*/React.createElement("section", {
      className: "shell closing"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      size: "md",
      style: {
        textAlign: 'center'
      }
    }, "Want to work with us?"), /*#__PURE__*/React.createElement("p", {
      className: "closing-sub"
    }, "A sentence is enough to start."), /*#__PURE__*/React.createElement(Button, {
      variant: "primary",
      onClick: () => onNav('Contact')
    }, "Start a build")));
  }
  window.StudioPage = StudioPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/StudioPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/WorkPage.jsx
try { (() => {
/* Work — selected projects + one detail layout to show the pattern.
   Exports window.WorkPage. */
(function () {
  const {
    Eyebrow,
    SectionHeading,
    Button,
    WorkCard,
    Tag
  } = window.ThinAirStudiosDesignSystem_9700d8;
  const PROJECTS = [{
    name: 'Cirrus',
    tags: ['Web App', 'UI-UX'],
    result: 'Turned a tangle of spreadsheets into a control room. A logistics dashboard a team runs their whole day from.',
    problem: 'A logistics team ran their whole operation out of a dozen spreadsheets that only one person fully understood. Every handoff was a copy-paste, every number a question of which tab was current.',
    built: 'A single control room — live status across every shipment, the day\u2019s exceptions surfaced first, and the deep tables still there for when you need them. Designed for the person who lives in it eight hours a day.',
    outcome: 'One screen the team runs their day from. The spreadsheets are gone, and so are the questions about which number is right.'
  }, {
    name: 'Meridian',
    tags: ['Embedded', 'App'],
    result: 'Firmware and a companion app for a connected device — the screen and the silicon, built by one team so they actually agree.',
    problem: 'A connected device needed firmware and a phone app that behaved as one product — not two teams guessing at each other\u2019s contracts.',
    built: 'The firmware and the companion app, designed and engineered together. One model of the device, shared end to end, so the screen and the silicon never disagree.',
    outcome: 'A device that feels like one thing. Setup that works the first time, and updates that don\u2019t break the pairing.'
  }, {
    name: 'Aurora',
    tags: ['Web'],
    result: 'A launch site for a product that needed to feel inevitable. Quiet, fast, and impossible to mistake for anyone else.',
    problem: 'A product launch that needed to land — a site that felt inevitable rather than hopeful, and loaded instantly anywhere.',
    built: 'A spare, fast launch site with a voice of its own. Every asset trimmed, every transition earned, nothing on the page that wasn\u2019t doing work.',
    outcome: 'A launch that read as confidence. Quiet, fast, and impossible to mistake for anyone else.'
  }];
  function WorkDetail({
    p,
    onBack
  }) {
    return /*#__PURE__*/React.createElement("article", {
      className: "shell detail"
    }, /*#__PURE__*/React.createElement("button", {
      className: "back",
      onClick: onBack
    }, "\u2190 All work"), /*#__PURE__*/React.createElement("div", {
      className: "detail-head"
    }, /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg"
    }, p.name), /*#__PURE__*/React.createElement("div", {
      className: "detail-tags"
    }, p.tags.map(t => /*#__PURE__*/React.createElement(Tag, {
      key: t
    }, t)))), /*#__PURE__*/React.createElement("div", {
      className: "detail-grid"
    }, /*#__PURE__*/React.createElement("div", {
      className: "detail-row"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "The problem"), /*#__PURE__*/React.createElement("p", null, p.problem)), /*#__PURE__*/React.createElement("div", {
      className: "detail-row"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "What we built"), /*#__PURE__*/React.createElement("p", null, p.built)), /*#__PURE__*/React.createElement("div", {
      className: "detail-row"
    }, /*#__PURE__*/React.createElement(Eyebrow, {
      dot: true
    }, "The outcome"), /*#__PURE__*/React.createElement("p", null, p.outcome))));
  }
  function WorkPage() {
    const Reveal = window.TASReveal;
    const [open, setOpen] = React.useState(null);
    if (open) return /*#__PURE__*/React.createElement(WorkDetail, {
      p: open,
      onBack: () => setOpen(null)
    });
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("section", {
      className: "shell page-head"
    }, /*#__PURE__*/React.createElement(Eyebrow, null, "Selected work"), /*#__PURE__*/React.createElement(SectionHeading, {
      size: "lg"
    }, "A few things we've made."), /*#__PURE__*/React.createElement("p", {
      className: "lead",
      style: {
        marginTop: 'var(--space-4)'
      }
    }, "Placeholder set \u2014 real case studies drop in later. ", /*#__PURE__*/React.createElement("span", {
      className: "muted"
    }, "Click any project for the detail pattern."))), /*#__PURE__*/React.createElement("section", {
      className: "shell",
      style: {
        paddingBottom: 'var(--space-24)'
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "work-grid"
    }, PROJECTS.map((p, i) => /*#__PURE__*/React.createElement(Reveal, {
      key: p.name,
      delay: i * 80
    }, /*#__PURE__*/React.createElement(WorkCard, {
      name: p.name,
      result: p.result,
      tags: p.tags,
      onClick: e => {
        e.preventDefault();
        setOpen(p);
      }
    }))))));
  }
  window.WorkPage = WorkPage;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/WorkPage.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Mark = __ds_scope.Mark;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.WorkCard = __ds_scope.WorkCard;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Nav = __ds_scope.Nav;

})();
