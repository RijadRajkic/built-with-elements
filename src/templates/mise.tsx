import React from 'react';
import { Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider } from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

/**
 * Mise — "Cast-Iron Rosemary Focaccia" (recipe of the week + a clip-card).
 * email = recipe teaser · web = the full recipe page · document = a 4×6 index
 * card (front + back) you clip for the recipe box. Warm paper, burnt-sienna
 * accent, muted olive for the cook's notes; mono for every measure and time.
 */

const PAPER = '#F4EDE1';
const INK = '#2A2420';
const SIENNA = '#B95E2E';
const OLIVE = '#6E7A44';
const OLIVE_BG = 'rgba(110,122,68,.1)';
const MUT = '#5C554C';
const MUT2 = '#8A8175';
const KRAFT = '#B9B6AE';
const HAIR = 'rgba(42,36,32,.12)';

const disp = "'Space Grotesk','Helvetica Neue',Arial,sans-serif";
const body = "Inter,'Helvetica Neue',Arial,sans-serif";
const mono = "'JetBrains Mono','Courier New',monospace";

const Col = Column as React.FC<
  React.ComponentProps<typeof Column> & { verticalAlign?: 'top' | 'middle' | 'bottom' }
>;

const hair = (side: 'Top' | 'Bottom' | 'Right' | 'Left', color = HAIR, style = 'solid') => ({
  [`border${side}Width`]: '1px',
  [`border${side}Color`]: color,
  [`border${side}Style`]: style,
});

const INGREDIENTS: [string, string][] = [
  ['400 g', 'Bread flour'],
  ['320 g', 'Warm water'],
  ['8 g', 'Fine salt'],
  ['7 g', 'Instant yeast'],
  ['3 tbsp', 'Olive oil <span style="color:#8A8175">+ more for the pan</span>'],
  ['2 sprigs', 'Rosemary'],
  ['to finish', 'Flaky salt'],
];
const METHOD: [string, string][] = [
  ['Mix', 'Whisk flour, salt and yeast. Add the warm water and 2 tbsp oil; stir to a shaggy, sticky dough.'],
  ['First proof', 'Cover and leave somewhere warm ~2 h, until doubled and bubbled.'],
  ['Oil the skillet', 'Pour 1 tbsp oil into a 10-inch cast-iron skillet; turn the dough into it.'],
  ['Dimple & rest', 'Oil your fingers; press deep dimples all over. Rest 20 min while the oven heats.'],
  ['Finish', 'Drizzle with oil, tuck in rosemary sprigs, and scatter over flaky salt.'],
  ['Bake', '220°C / 430°F for 25 min, until deep gold. Cool 10 min before cutting.'],
];

const ingredientsHtml = (qtyW = '92px', fs = '14.5px') =>
  INGREDIENTS.map(
    ([q, name], i) =>
      `<span style="display:grid;grid-template-columns:${qtyW} 1fr;gap:12px;padding:10px 0;${i < INGREDIENTS.length - 1 ? 'border-bottom:1px solid ' + HAIR + ';' : ''}"><span style="font-family:${mono};font-size:13px;font-variant-numeric:tabular-nums;">${q}</span><span style="font-family:${body};font-size:${fs};">${name}</span></span>`,
  ).join('');

const methodHtml = (compact = false) =>
  METHOD.map(
    ([label, text], i) =>
      compact
        ? `<span style="display:grid;grid-template-columns:auto 1fr;gap:12px;padding:8px 0;${i < 5 ? 'border-bottom:1px solid ' + HAIR + ';' : ''}"><span style="font-family:${disp};font-size:17px;font-weight:600;color:${SIENNA};line-height:1.1;">${i + 1}</span><span style="font-family:${body};font-size:12.5px;line-height:1.45;"><strong style="font-weight:600;">${label}</strong> — ${text}</span></span>`
        : `<span style="display:grid;grid-template-columns:auto 1fr;gap:18px;padding:14px 0;${i < 5 ? 'border-bottom:1px solid ' + HAIR + ';' : ''}"><span style="font-family:${disp};font-size:26px;font-weight:600;color:${SIENNA};line-height:1;">${i + 1}</span><span><span style="font-family:${mono};font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:${MUT2};">${label}</span><br/><span style="font-family:${body};font-size:14.5px;line-height:1.55;">${text}</span></span></span>`,
  ).join('');

/** one time-strip cell: icon + value + label */
function TimeCell({ icon, value, label, border }: any) {
  return (
    <Col padding="16px 10px" backgroundColor={PAPER} border={border} verticalAlign="top">
      <Paragraph
        html={
          `<span style="text-align:center;display:block;"><img src="assets/mise-icon-${icon}.svg" width="26" style="display:inline-block"/>` +
          `<span style="display:block;font-family:${mono};font-size:15px;font-weight:600;font-variant-numeric:tabular-nums;margin-top:6px;color:${INK};">${value}</span>` +
          `<span style="display:block;font-family:${mono};font-size:8.5px;letter-spacing:.14em;text-transform:uppercase;color:${MUT2};margin-top:2px;">${label}</span></span>`
        }
        textAlign="center"
      />
    </Col>
  );
}

export default function Mise({ mode }: { mode: Mode }) {
  // ---------------------------------------------------------------- EMAIL
  if (mode === 'email') {
    return (
      <Root mode={mode} backgroundColor={KRAFT} contentWidth="480px" previewText="Recipe of the week — Cast-Iron Rosemary Focaccia" fontFamily={font.body}>
        <Row backgroundColor={PAPER} cells={[3, 2]} padding="20px 26px 16px">
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/mise-mark.svg" width="30" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:20px;font-weight:600;letter-spacing:.02em;color:${INK};vertical-align:middle;padding-left:8px;">MISE</span>`} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">Recipe of the week<br/>№ 34</span>`} fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".2em" color={MUT2} textAlign="right" lineHeight="1.4" /></Col>
        </Row>
        <Row backgroundColor={PAPER} padding="0"><Column padding="0"><Divider borderTopWidth="3px" borderTopColor={SIENNA} borderTopStyle="solid" width="100%" /></Column></Row>
        <Row backgroundColor={PAPER} padding="24px 26px 6px">
          <Column padding="0">
            <Heading level="h2" text="Cast-Iron Rosemary Focaccia" fontFamily={font.display} fontSize="27px" fontWeight={600} letterSpacing="-.01em" lineHeight="1.06" color={INK} />
            <Paragraph text="Crisp-bottomed, dimpled, olive-oil rich — the easiest bread you'll make on repeat. One skillet, four ingredients you already own." fontFamily={font.body} fontSize="14.5px" color={MUT} lineHeight="1.55" containerPadding="12px 0 0" />
          </Column>
        </Row>
        <Row backgroundColor={PAPER} padding="18px 26px 0"><Column padding="0"><Image src="assets/mise-focaccia.svg" alt="Top-down cast-iron rosemary focaccia" width="62%" /></Column></Row>
        <Row backgroundColor={PAPER} layout={ColumnLayouts.FourEqual} padding="20px 0 0" border={{ ...hair('Top'), ...hair('Bottom') }}>
          {TimeCell({ icon: 'skillet', value: '8', label: 'Serves', border: hair('Right') })}
          {TimeCell({ icon: 'prep', value: '20m', label: 'Prep', border: hair('Right') })}
          {TimeCell({ icon: 'proof', value: '2h', label: 'Proof', border: hair('Right') })}
          {TimeCell({ icon: 'bake', value: '25m', label: 'Bake' })}
        </Row>
        <Row backgroundColor={PAPER} padding="22px 26px"><Column padding="0"><Button href="#" backgroundColor={SIENNA} color={PAPER} width="100%" fontFamily={font.body} fontSize="15px" fontWeight={600} padding="16px" textAlign="center" borderRadius="0px">Get the printable card →</Button></Column></Row>
        <Row backgroundColor={PAPER} cells={[3, 2]} padding="0 26px 22px">
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">Mise · a recipe worth keeping</span>`} fontFamily={font.mono} fontSize="9px" letterSpacing=".16em" color={MUT2} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<a href="#" style="color:${MUT2};text-transform:uppercase">Unsubscribe</a>`} fontFamily={font.mono} fontSize="9px" letterSpacing=".16em" textAlign="right" /></Col>
        </Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- DOCUMENT (4×6 card front + back)
  if (mode === 'document') {
    const dashed = {
      ...hair('Top', 'rgba(42,36,32,.5)', 'dashed'),
      ...hair('Bottom', 'rgba(42,36,32,.5)', 'dashed'),
      ...hair('Left', 'rgba(42,36,32,.5)', 'dashed'),
      ...hair('Right', 'rgba(42,36,32,.5)', 'dashed'),
    };
    const front = [
      <Paragraph key="clip" html={`<span style="text-transform:uppercase">✂ &nbsp;clip for your recipe box&nbsp; ✂</span>`} fontFamily={font.mono} fontSize="8.5px" letterSpacing=".18em" color={SIENNA} textAlign="center" />,
      <Paragraph key="mark" html={`<span style="display:flex;justify-content:space-between;align-items:center;"><span><img src="assets/mise-mark.svg" width="22" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:15px;font-weight:600;letter-spacing:.02em;color:${INK};vertical-align:middle;">MISE</span></span><span style="font-family:${mono};font-size:9px;letter-spacing:.14em;color:${MUT2};">№ 34</span></span>`} containerPadding="16px 0 0" />,
      <Heading key="name" level="h3" text="Cast-Iron Rosemary Focaccia" fontFamily={font.display} fontSize="25px" fontWeight={600} letterSpacing="-.01em" lineHeight="1.05" color={INK} containerPadding="14px 0 0" />,
      <Paragraph key="times" html={`<span style="font-family:${mono};font-size:11px;color:${MUT};">Serves 8 &nbsp;·&nbsp; Prep 20m &nbsp;·&nbsp; Proof 2h &nbsp;·&nbsp; Bake 25m</span>`} containerPadding="14px 0 0" />,
      <Divider key="d" borderTopWidth="1px" borderTopColor="rgba(42,36,32,.2)" borderTopStyle="solid" width="100%" containerPadding="18px 0" />,
      <Paragraph key="ing-h" html={`<span style="text-transform:uppercase">Ingredients</span>`} fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".2em" color={SIENNA} />,
      <Paragraph key="ing" html={ingredientsHtml('76px', '13px')} containerPadding="8px 0 0" />,
      <Paragraph key="foot" html={`<span style="text-transform:uppercase">mise.co · turn over for method →</span>`} fontFamily={font.mono} fontSize="8.5px" letterSpacing=".16em" color={MUT2} textAlign="center" containerPadding="16px 0 0" />,
    ];
    const back = [
      <Paragraph key="m-h" html={`<span style="text-transform:uppercase">Method</span>`} fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".2em" color={SIENNA} />,
      <Paragraph key="m" html={methodHtml(true)} containerPadding="6px 0 0" />,
      <Paragraph key="notes" html={`<span style="display:block;background:${OLIVE_BG};padding:12px 14px;"><span style="font-family:${mono};font-size:9px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:${OLIVE};">Notes</span><br/><span style="font-family:${body};font-size:12px;line-height:1.45;color:#4C4A3C;">No cast iron? A cake tin works — add two minutes. Best after an overnight cold proof.</span></span>`} containerPadding="14px 0 0" />,
      <Paragraph key="foot" html={`<span style="text-transform:uppercase">✂ clip &amp; keep · mise.co</span>`} fontFamily={font.mono} fontSize="8.5px" letterSpacing=".16em" color={MUT2} textAlign="center" containerPadding="14px 0 0" />,
    ];
    const card = (side: 'front' | 'back') => (
      <Row backgroundColor={PAPER} padding="0 0 24px">
        <Column padding="26px 24px" backgroundColor={PAPER} border={dashed}>
          {side === 'front' ? front : back}
        </Column>
      </Row>
    );
    return (
      <Root mode={mode} backgroundColor={PAPER} contentWidth="400px" fontFamily={font.body}>
        {card('front')}
        {card('back')}
      </Root>
    );
  }

  // ---------------------------------------------------------------- WEB (full recipe page)
  return (
    <Root mode={mode} backgroundColor={PAPER} contentWidth="1000px" fontFamily={font.body}>
      <Row backgroundColor={PAPER} cells={[1, 1]} padding="20px 44px" border={hair('Bottom')}>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/mise-mark.svg" width="28" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:18px;font-weight:600;letter-spacing:.02em;color:${INK};vertical-align:middle;padding-left:8px;">MISE</span>`} /></Col>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">Breads · Recipe of the week</span>`} fontFamily={font.mono} fontSize="11px" letterSpacing=".18em" color={MUT2} textAlign="right" /></Col>
      </Row>

      {/* hero */}
      <Row backgroundColor={PAPER} layout={ColumnLayouts.TwoEqual} padding="56px 44px" border={hair('Bottom')}>
        <Col padding="0 22px 0 0" verticalAlign="middle">
          <Paragraph html={`<span style="text-transform:uppercase">Recipe № 34</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".26em" color={SIENNA} />
          <Heading level="h2" text="Cast-Iron Rosemary Focaccia" fontFamily={font.display} fontSize="54px" fontWeight={600} letterSpacing="-.02em" lineHeight="1.02" color={INK} containerPadding="16px 0 0" />
          <Paragraph text="Crisp-bottomed, dimpled and rich with olive oil. One 10-inch skillet, four pantry ingredients, and an afternoon of patience." fontFamily={font.body} fontSize="16px" color={MUT} lineHeight="1.6" containerPadding="18px 0 0" />
          <Paragraph
            html={
              `<span style="display:flex;gap:26px;flex-wrap:wrap;">` +
              [['skillet', '8', 'Serves'], ['prep', '20m', 'Prep'], ['proof', '2h', 'Proof'], ['bake', '25m', 'Bake']]
                .map(([ic, v, l]) => `<span style="display:flex;align-items:center;gap:9px;"><img src="assets/mise-icon-${ic}.svg" width="24"/><span><span style="font-family:${mono};font-size:15px;font-weight:600;color:${INK};">${v}</span><br/><span style="font-family:${mono};font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:${MUT2};">${l}</span></span></span>`)
                .join('') +
              `</span>`
            }
            containerPadding="26px 0 0"
          />
        </Col>
        <Col padding="0" verticalAlign="middle"><Image src="assets/mise-focaccia.svg" alt="Top-down cast-iron rosemary focaccia" width="100%" /></Col>
      </Row>

      {/* ingredients + method */}
      <Row backgroundColor={PAPER} cells={[85, 115]} padding="48px 44px">
        <Col padding="0 24px 0 0" verticalAlign="top">
          <Paragraph html={`<span style="text-transform:uppercase">Ingredients</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".24em" color={SIENNA} />
          <Paragraph html={ingredientsHtml('92px', '14.5px')} containerPadding="16px 0 0" />
        </Col>
        <Col padding="0" verticalAlign="top">
          <Paragraph html={`<span style="text-transform:uppercase">Method</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".24em" color={SIENNA} />
          <Paragraph html={methodHtml(false)} containerPadding="8px 0 0" />
          <Paragraph html={`<span style="display:block;background:${OLIVE_BG};padding:18px 20px;"><span style="font-family:${mono};font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:${OLIVE};">Notes — from the kitchen</span><br/><span style="font-family:${body};font-size:14px;line-height:1.55;color:#4C4A3C;">No cast iron? A cake tin works — just add two minutes. The crumb is even better after an overnight cold proof in the fridge.</span></span>`} containerPadding="22px 0 0" />
        </Col>
      </Row>
    </Root>
  );
}
