import React from 'react';
import { Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider } from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

/**
 * SPORE — "A Field Guide Deck" (collectible fungi cards).
 * email = a "+3 unlocked" reveal · web = the deck gallery · document = a
 * print-and-cut sheet (fronts + card backs). Forest-ink on spore-cream, rust
 * marks the edibility verdict; rarity lives only in the pip.
 */

const CREAM = '#EFE9DA';
const INK = '#23271F';
const RUST = '#B4623A';
const MUT = '#6B6C62';
const MUT2 = '#8A8B80';
const FLAV = '#4A4B44';
const KRAFT = '#B9B6AE';
const SHEET = '#F4F0E6';
const HAIR = 'rgba(35,39,31,.16)';
const HAIRD = 'rgba(35,39,31,.5)';

const disp = "'Space Grotesk','Helvetica Neue',Arial,sans-serif";
const body = "Inter,'Helvetica Neue',Arial,sans-serif";
const mono = "'JetBrains Mono','Courier New',monospace";

const Col = Column as React.FC<
  React.ComponentProps<typeof Column> & { verticalAlign?: 'top' | 'middle' | 'bottom' }
>;
const border = (side: string, color = HAIR, style = 'solid') => ({
  [`border${side}Width`]: '1px',
  [`border${side}Color`]: color,
  [`border${side}Style`]: style,
});
const allBorder = (color = HAIR, style = 'solid') => ({
  ...border('Top', color, style),
  ...border('Bottom', color, style),
  ...border('Left', color, style),
  ...border('Right', color, style),
});

type Spec = {
  n: string; title: string; binomial: string; sil: string; pip: string; rarity: string;
  verdict: string; vicon: string; habitat: string; season: string; capd: string; flavor: string;
};

const statGrid = (s: Spec) => {
  const cell = (label: string, val: string, extra: string, valColor = INK) =>
    `<td width="50%" style="padding:8px 10px;${extra}"><span style="font-family:${mono};font-size:8px;letter-spacing:.14em;text-transform:uppercase;color:${MUT2};">${label}</span><br/><span style="font-family:${mono};font-size:11px;color:${valColor};">${val}</span></td>`;
  return (
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;table-layout:fixed;border:1px solid ${HAIR};"><tr>` +
    cell('Edibility', `${s.vicon} ${s.verdict}`, `border-right:1px solid ${HAIR};border-bottom:1px solid ${HAIR};`, RUST) +
    cell('Cap Ø', s.capd, `border-bottom:1px solid ${HAIR};`) +
    `</tr><tr>` +
    cell('Habitat', s.habitat, `border-right:1px solid ${HAIR};`) +
    cell('Season', s.season, '') +
    `</tr></table>`
  );
};

/** one field-guide card → a bordered Column */
// `compact` is the email deck reveal, where the card has to read at a glance.
function Card(s: Spec, cardBorder: object = allBorder(), compact = false) {
  return (
    <Column padding={compact ? '14px 14px 12px' : '16px 16px 14px'} backgroundColor={CREAM} border={cardBorder}>
      {[
        <Paragraph key="h" html={`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;"><tr><td align="left" style="font-family:${mono};font-size:10px;letter-spacing:.14em;color:${MUT2};">№ ${s.n}</td><td align="right" style="font-family:${mono};font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:${INK};"><img src="${s.pip}" width="10" style="vertical-align:middle"/> ${s.rarity}</td></tr></table>`} />,
        <Paragraph key="sil" html={`<span style="display:block;text-align:center;padding:12px 0 4px;"><img src="${s.sil}" height="${compact ? 84 : 104}"/></span>`} />,
        <Heading key="nm" level="h3" text={s.title} fontFamily={font.display} fontSize={compact ? '21px' : '24px'} fontWeight={600} color={INK} textAlign="center" letterSpacing="-.01em" />,
        <Paragraph key="bi" html={`<span style="font-style:italic;">${s.binomial}</span>`} fontFamily={font.mono} fontSize="12px" color={MUT} textAlign="center" containerPadding="2px 0 0" />,
        <Paragraph key="st" html={statGrid(s)} containerPadding="14px 0 0" />,
        <Paragraph key="fl" html={`<span style="font-style:italic;">${s.flavor}</span>`} fontFamily={font.body} fontSize="12.5px" color={FLAV} lineHeight="1.4" containerPadding="12px 0 2px" />,
        <Divider key="fd" borderTopWidth="1px" borderTopColor={HAIR} borderTopStyle="solid" width="100%" containerPadding="10px 0 0" />,
        <Paragraph key="ft" html={`<span style="text-transform:uppercase">SPORE · FIELD GUIDE · ${s.n} / 24</span>`} fontFamily={font.mono} fontSize="8px" letterSpacing=".14em" color={MUT2} containerPadding="8px 0 0" />,
      ]}
    </Column>
  );
}

const SPECIES: Spec[] = [
  { n: '01', title: 'Chanterelle', binomial: 'Cantharellus cibarius', sil: 'assets/spore-01-chanterelle.png', pip: 'assets/spore-pip-oxblood.svg', rarity: 'Rare', verdict: 'Edible', vicon: '✓', habitat: 'Oak & beech duff', season: 'Jul–Oct', capd: '3–10 cm', flavor: 'Apricot-scented and gold — the forager’s favourite handshake.' },
  { n: '02', title: 'Fly Agaric', binomial: 'Amanita muscaria', sil: 'assets/spore-02-flyagaric.png', pip: 'assets/spore-pip-amber.svg', rarity: 'Uncommon', verdict: 'Toxic', vicon: '△', habitat: 'Birch & pine', season: 'Aug–Nov', capd: '8–20 cm', flavor: 'Storybook red, storybook danger. Admire; don’t taste.' },
  { n: '03', title: 'Morel', binomial: 'Morchella esculenta', sil: 'assets/spore-03-morel.png', pip: 'assets/spore-pip-oxblood.svg', rarity: 'Rare', verdict: 'Edible', vicon: '✓', habitat: 'Ash & elm, burns', season: 'Mar–May', capd: '3–8 cm', flavor: 'A honeycomb on a stalk — spring’s most hunted prize.' },
  { n: '04', title: 'Death Cap', binomial: 'Amanita phalloides', sil: 'assets/spore-04-deathcap.png', pip: 'assets/spore-pip-amber.svg', rarity: 'Uncommon', verdict: 'Deadly', vicon: '▲', habitat: 'Oak woodland', season: 'Aug–Nov', capd: '5–15 cm', flavor: 'Half a cap can end you. Learn this one first.' },
  { n: '05', title: 'Lion’s Mane', binomial: 'Hericium erinaceus', sil: 'assets/spore-05-lionsmane.png', pip: 'assets/spore-pip-amber.svg', rarity: 'Uncommon', verdict: 'Edible', vicon: '✓', habitat: 'Hardwood wounds', season: 'Aug–Nov', capd: '8–25 cm', flavor: 'A frozen white waterfall. Tastes faintly of crab.' },
  { n: '06', title: 'Turkey Tail', binomial: 'Trametes versicolor', sil: 'assets/spore-06-turkeytail.png', pip: 'assets/spore-pip-sage.svg', rarity: 'Common', verdict: 'Medicinal', vicon: '✚', habitat: 'Dead hardwood', season: 'All year', capd: '4–10 cm', flavor: 'Banded like its namesake; steeped for centuries as tea.' },
];
const byNum = (n: string) => SPECIES.find((s) => s.n === n)!;

export default function Spore({ mode }: { mode: Mode }) {
  // ---------------------------------------------------------------- EMAIL (reveal)
  if (mode === 'email') {
    const mini = (s: Spec, brd?: object) => (
      <Col padding="12px 14px" backgroundColor={CREAM} border={brd} verticalAlign="middle">
        <Paragraph html={`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="width:100%;"><tr><td width="46" style="vertical-align:middle;padding-right:12px;"><img src="${s.sil}" height="46"/></td><td style="vertical-align:middle;"><span style="font-family:${disp};font-size:16px;font-weight:600;color:${INK};">${s.title}</span><br/><span style="font-family:${mono};font-size:10.5px;font-style:italic;color:${MUT};">${s.binomial}</span></td><td width="20" align="right" style="vertical-align:middle;"><img src="${s.pip}" width="14"/></td></tr></table>`} />
      </Col>
    );
    return (
      <Root mode={mode} backgroundColor={KRAFT} contentWidth="480px" previewText="You unlocked 3 new specimens — one of them is dangerous" fontFamily={font.body}>
        <Row backgroundColor={INK} cells={[1, 1]} padding="20px 24px">
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/spore-mark-cream.svg" width="30" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:18px;font-weight:600;letter-spacing:.18em;color:${CREAM};vertical-align:middle;padding-left:8px;">SPORE</span>`} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">6 / 24 collected</span>`} fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".18em" color="rgba(239,233,218,.6)" textAlign="right" /></Col>
        </Row>
        <Row backgroundColor={INK} padding="8px 24px 8px">
          <Column padding="0">
            <Paragraph html={`<span style="text-transform:uppercase">New in your deck</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".26em" color={RUST} textAlign="center" />
            <Heading level="h2" text="+3 unlocked" fontFamily={font.display} fontSize="34px" fontWeight={500} letterSpacing="-.02em" color={CREAM} textAlign="center" containerPadding="8px 0 0" />
          </Column>
        </Row>
        <Row backgroundColor={INK} cells={[1, 3, 1]} padding="4px 24px 12px">
          <Column padding="0" />
          {Card(byNum('02'), allBorder(), true)}
          <Column padding="0" />
        </Row>
        <Row backgroundColor={INK} padding="0 24px 30px">
          <Column padding="0"><Paragraph html={`<span style="text-transform:uppercase">Featured — the one to know</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".2em" color="rgba(239,233,218,.5)" textAlign="center" /></Column>
        </Row>
        <Row backgroundColor={CREAM} padding="22px 24px 12px"><Column padding="0"><Paragraph html={`<span style="text-transform:uppercase">Also unlocked</span>`} fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".2em" color={MUT2} /></Column></Row>
        <Row backgroundColor={CREAM} layout={ColumnLayouts.TwoEqual} padding="0 24px" border={allBorder()}>
          {mini(byNum('03'), border('Right'))}
          {mini(byNum('05'))}
        </Row>
        <Row backgroundColor={CREAM} padding="20px 24px"><Column padding="0"><Button href="#" backgroundColor={RUST} color={CREAM} width="100%" fontFamily={font.body} fontSize="15px" fontWeight={600} padding="16px" textAlign="center" borderRadius="0px">View your collection →</Button></Column></Row>
        <Row backgroundColor={CREAM} cells={[3, 2]} padding="0 24px 20px">
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">Spore · a field guide, one card at a time</span>`} fontFamily={font.mono} fontSize="9px" letterSpacing=".16em" color={MUT2} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<a href="#" style="color:${MUT2};text-transform:uppercase">Unsubscribe</a>`} fontFamily={font.mono} fontSize="9px" letterSpacing=".16em" textAlign="right" /></Col>
        </Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- DOCUMENT (print & cut)
  if (mode === 'document') {
    const dashRow = (a: Spec, b: Spec, top: boolean) => (
      <Row backgroundColor={SHEET} layout={ColumnLayouts.TwoEqual} padding="0">
        {Card(a, top ? allBorder(HAIRD, 'dashed') : { ...border('Bottom', HAIRD, 'dashed'), ...border('Left', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}
        {Card(b, top ? { ...border('Top', HAIRD, 'dashed'), ...border('Bottom', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') } : { ...border('Bottom', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}
      </Row>
    );
    const backCell = (brd: object) => (
      <Column padding="16px" backgroundColor={SHEET} border={brd}><Image src="assets/spore-cardback.svg" alt="Spore card back" width="100%" /></Column>
    );
    return (
      <Root mode={mode} backgroundColor={SHEET} contentWidth="680px" fontFamily={font.body}>
        <Row backgroundColor={SHEET} cells={[1, 1]} padding="26px 26px 14px" border={border('Bottom', 'rgba(35,39,31,.2)')}>
          <Col padding="0" verticalAlign="middle"><Heading level="h2" text="SPORE — PRINT & CUT" fontFamily={font.display} fontSize="18px" fontWeight={600} letterSpacing=".06em" color={INK} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">Cards 01–06 · ✂ trim on dashed lines</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".16em" color={MUT} textAlign="right" /></Col>
        </Row>
        <Row backgroundColor={SHEET} padding="20px 26px 0"><Column padding="0" /></Row>
        {dashRow(byNum('01'), byNum('02'), true)}
        {dashRow(byNum('03'), byNum('04'), false)}
        {dashRow(byNum('05'), byNum('06'), false)}
        <Row backgroundColor={SHEET} cells={[1, 1]} padding="34px 26px 14px" border={border('Bottom', 'rgba(35,39,31,.2)')}>
          <Col padding="0" verticalAlign="middle"><Heading level="h2" text="PAGE 2 — CARD BACKS" fontFamily={font.display} fontSize="18px" fontWeight={600} letterSpacing=".06em" color={INK} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">Print on reverse · align to fronts</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".16em" color={MUT} textAlign="right" /></Col>
        </Row>
        <Row backgroundColor={SHEET} padding="20px 26px 0"><Column padding="0" /></Row>
        <Row backgroundColor={SHEET} layout={ColumnLayouts.TwoEqual} padding="0">{backCell(allBorder(HAIRD, 'dashed'))}{backCell({ ...border('Top', HAIRD, 'dashed'), ...border('Bottom', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}</Row>
        <Row backgroundColor={SHEET} layout={ColumnLayouts.TwoEqual} padding="0">{backCell({ ...border('Bottom', HAIRD, 'dashed'), ...border('Left', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}{backCell({ ...border('Bottom', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}</Row>
        <Row backgroundColor={SHEET} layout={ColumnLayouts.TwoEqual} padding="0">{backCell({ ...border('Bottom', HAIRD, 'dashed'), ...border('Left', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}{backCell({ ...border('Bottom', HAIRD, 'dashed'), ...border('Right', HAIRD, 'dashed') })}</Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- WEB (gallery)
  const gap = <Column padding="0" backgroundColor={CREAM} />;
  return (
    <Root mode={mode} backgroundColor={CREAM} contentWidth="1000px" fontFamily={font.body}>
      <Row backgroundColor={CREAM} cells={[1, 1]} padding="20px 40px" border={border('Bottom', 'rgba(35,39,31,.14)')}>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/spore-mark-ink.svg" width="28" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:16px;font-weight:600;letter-spacing:.18em;color:${INK};vertical-align:middle;padding-left:8px;">SPORE</span>`} /></Col>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">6 / 24 collected</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".2em" color={MUT} textAlign="right" /></Col>
      </Row>
      <Row backgroundColor={CREAM} padding="56px 40px 40px" border={border('Bottom', 'rgba(35,39,31,.14)')}>
        <Column padding="0">
          <Paragraph html={`<span style="text-transform:uppercase">A Field Guide Deck</span>`} fontFamily={font.mono} fontSize="12px" fontWeight={500} letterSpacing=".26em" color={RUST} textAlign="center" />
          <Heading level="h2" text="SPORE" fontFamily={font.display} fontSize="76px" fontWeight={500} letterSpacing=".04em" color={INK} textAlign="center" containerPadding="14px 0 0" />
          <Paragraph text="Twenty-four species to find, identify, and keep. Six in your deck so far." fontFamily={font.body} fontSize="16px" color={FLAV} lineHeight="1.55" textAlign="center" containerPadding="18px 0 0" />
          <Paragraph html={`<span style="display:block;max-width:360px;margin:26px auto 0;"><span style="display:block;height:4px;background:rgba(35,39,31,.15);"><span style="display:block;height:4px;width:25%;background:${RUST};"></span></span><span style="display:flex;justify-content:space-between;margin-top:8px;font-family:${mono};font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${MUT2};"><span>6 collected</span><span>18 in the wild</span></span></span>`} />
        </Column>
      </Row>
      <Row backgroundColor={CREAM} cells={[32, 2, 32, 2, 32]} padding="44px 40px 22px">
        {Card(byNum('01'))}{gap}{Card(byNum('02'))}{gap}{Card(byNum('03'))}
      </Row>
      <Row backgroundColor={CREAM} cells={[32, 2, 32, 2, 32]} padding="0 40px 44px">
        {Card(byNum('04'))}{gap}{Card(byNum('05'))}{gap}{Card(byNum('06'))}
      </Row>
      <Row backgroundColor={CREAM} cells={[1, 1]} padding="0 40px 44px" border={border('Top', 'rgba(35,39,31,.14)')}>
        <Col padding="18px 0 0" verticalAlign="middle"><Paragraph text="Collect all 24 — then print the deck." fontFamily={font.body} fontSize="14px" color={FLAV} /></Col>
        <Col padding="18px 0 0" verticalAlign="middle"><Paragraph html={`<a href="#" style="display:inline-block;background:${INK};color:${CREAM};padding:13px 22px;font-family:${body};font-size:14px;font-weight:600;">Get the print &amp; cut sheet →</a>`} textAlign="right" /></Col>
      </Row>
    </Root>
  );
}
