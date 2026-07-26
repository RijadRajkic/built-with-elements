import React from 'react';
import { Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider } from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

/**
 * Cadence — "Your Year in Motion" (a Wrapped-style running recap).
 * One tree, three jobs: email = compact teaser · web = a loud scroll-story ·
 * document = a frame-it poster. Near-black ground, one sodium-orange accent
 * (effort + the forward CTA), sage for supporting figures. Data as hero.
 */

const INK = '#0E0F12'; // near-black ground
const BONE = '#EDEBE4'; // bone ink / numbers
const ORANGE = '#FF5A1F'; // sodium accent — effort + action
const SAGE = '#9FB89E'; // secondary figures
const PANEL = '#121317'; // alternate band
const CARD = '#15161A'; // share card
const KRAFT = '#B9B6AE'; // email ground
const HAIR = 'rgba(237,235,228,.14)';
const c = (a: number) => `rgba(237,235,228,${a})`;

// Column honours verticalAlign at runtime but the exported type omits it.
const Col = Column as React.FC<
  React.ComponentProps<typeof Column> & { verticalAlign?: 'top' | 'middle' | 'bottom' }
>;

const disp = "'Space Grotesk','Helvetica Neue',Arial,sans-serif";
const mono = "'JetBrains Mono','Courier New',monospace";

const hair = (side: 'Top' | 'Bottom' | 'Right' | 'Left', color = HAIR) => ({
  [`border${side}Width`]: '1px',
  [`border${side}Color`]: color,
  [`border${side}Style`]: 'solid',
});

/** big hero number + unit, baseline-aligned, as one rich Paragraph */
function heroNum(num: string, unit: string, size: number, unitSize: number) {
  return (
    `<span style="font-family:${disp};font-size:${size}px;font-weight:500;letter-spacing:-.03em;` +
    `line-height:.8;font-variant-numeric:tabular-nums;color:${BONE};">${num}</span>` +
    `<span style="font-family:${mono};font-size:${unitSize}px;font-weight:500;letter-spacing:.06em;` +
    `color:${ORANGE};padding-left:12px;">${unit}</span>`
  );
}

/** one stat tile: big number + mono label */
function Tile({ n, label, color = BONE, num = 24, border }: any) {
  return (
    <Col padding="18px 20px" backgroundColor={INK} border={border}>
      <Paragraph
        html={`<span style="font-family:${disp};font-size:${num}px;font-weight:500;font-variant-numeric:tabular-nums;line-height:1;color:${color};">${n}</span>`}
      />
      <Paragraph
        text={label}
        fontFamily={font.mono}
        fontSize="9px"
        fontWeight={500}
        letterSpacing=".16em"
        color={c(0.5)}
        lineHeight="1.3"
      />
    </Col>
  );
}

export default function Cadence({ mode }: { mode: Mode }) {
  // ---------------------------------------------------------------- EMAIL
  if (mode === 'email') {
    return (
      <Root
        mode={mode}
        backgroundColor={KRAFT}
        contentWidth="480px"
        previewText="Alex, your 2026 is in — 1,284 km and counting"
        fontFamily={font.body}
      >
        {/* header */}
        <Row backgroundColor={INK} cells={[1, 5, 4]} padding="22px 26px 18px">
          <Col padding="0" verticalAlign="middle">
            <Image src="assets/cadence-mark.svg" alt="Cadence sunrise mark" width={30} />
          </Col>
          <Col padding="0 0 0 11px" verticalAlign="middle">
            <Heading level="h1" text="CADENCE" fontFamily={font.display} fontSize="17px" fontWeight={600} letterSpacing=".14em" color={BONE} lineHeight="1" />
          </Col>
          <Col padding="0" verticalAlign="middle">
            <Paragraph html={`<span style="text-transform:uppercase">Your Year<br/>in Motion</span>`} fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".22em" color={c(0.55)} textAlign="right" lineHeight="1.4" />
          </Col>
        </Row>
        <Row backgroundColor={INK} padding="0">
          <Column padding="0"><Divider borderTopWidth="3px" borderTopColor={ORANGE} borderTopStyle="solid" width="100%" /></Column>
        </Row>

        {/* hero */}
        <Row backgroundColor={INK} padding="32px 26px 28px">
          <Column padding="0">
            <Paragraph text="You ran" fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".24em" color={ORANGE} lineHeight="1" />
            <Paragraph html={heroNum('1,284', 'KM', 72, 16)} containerPadding="12px 0 0" />
            <Paragraph html={`<span style="display:inline-block;background:${SAGE};color:${INK};font-family:${mono};font-size:11px;font-weight:500;letter-spacing:.14em;text-transform:uppercase;padding:5px 10px;">+18% vs 2025</span>`} containerPadding="18px 0 0" />
          </Column>
        </Row>

        {/* stat tiles */}
        <Row backgroundColor={INK} layout={ColumnLayouts.ThreeEqual} padding="0" border={{ ...hair('Top'), ...hair('Bottom') }}>
          {Tile({ n: '142', label: 'Runs', num: 26, border: hair('Right') })}
          {Tile({ n: '96,400', label: 'Metres climbed', num: 26, border: hair('Right') })}
          {Tile({ n: '21', label: 'Day streak', num: 26 })}
        </Row>

        {/* persona teaser */}
        <Row backgroundColor={INK} padding="24px 26px 24px">
          <Column padding="0">
            <Paragraph text="Your 2026 persona" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".22em" color={c(0.5)} lineHeight="1" />
            <Heading level="h2" text="The Dawn Patrol" fontFamily={font.display} fontSize="24px" fontWeight={500} letterSpacing="-.01em" color={BONE} containerPadding="8px 0 0" />
            <Paragraph text="38 sunrise runs will do that. See the full breakdown — chapter by chapter." fontFamily={font.body} fontSize="13px" color={c(0.62)} lineHeight="1.5" containerPadding="6px 0 0" />
          </Column>
        </Row>

        {/* CTA */}
        <Row backgroundColor={INK} padding="0 0 4px">
          <Column padding="0">
            <Button href="#" backgroundColor={ORANGE} color={INK} width="100%" fontFamily={font.body} fontSize="15px" fontWeight={600} padding="17px" textAlign="center" borderRadius="0px">See your full year →</Button>
          </Column>
        </Row>

        {/* footer */}
        <Row backgroundColor={INK} cells={[3, 2]} padding="18px 26px 22px">
          <Col padding="0" verticalAlign="middle"><Paragraph text="Cadence · your year in motion" fontFamily={font.mono} fontSize="9px" letterSpacing=".16em" color={c(0.4)} lineHeight="1.4" /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<a href="#" style="color:${c(0.4)};text-transform:uppercase">Unsubscribe</a>`} fontFamily={font.mono} fontSize="9px" letterSpacing=".16em" textAlign="right" lineHeight="1.4" /></Col>
        </Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- DOCUMENT (poster)
  if (mode === 'document') {
    return (
      <Root mode={mode} backgroundColor={INK} contentWidth="560px" fontFamily={font.body}>
        <Row backgroundColor={INK} cells={[3, 2]} padding="40px 40px 0">
          <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/cadence-mark.svg" width="30" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:17px;font-weight:600;letter-spacing:.14em;color:${BONE};vertical-align:middle;padding-left:8px;">CADENCE</span>`} /></Col>
          <Col padding="0" verticalAlign="middle"><Paragraph text="2026" fontFamily={font.mono} fontSize="12px" fontWeight={500} letterSpacing=".2em" color={c(0.55)} textAlign="right" /></Col>
        </Row>
        <Row backgroundColor={INK} padding="40px 40px 0">
          <Column padding="0">
            <Paragraph text="Your Year in Motion" fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".26em" color={ORANGE} lineHeight="1" html={`<span style="text-transform:uppercase">Your Year in Motion</span>`} />
            <Paragraph html={heroNum('1,284', 'KM', 122, 24)} containerPadding="14px 0 0" />
            <Paragraph html={`<span style="text-transform:uppercase;letter-spacing:.12em">Alex &nbsp;·&nbsp; The Dawn Patrol</span>`} fontFamily={font.mono} fontSize="12px" color={c(0.6)} containerPadding="18px 0 0" />
          </Column>
        </Row>

        {/* 8-tile grid, 2 col */}
        <Row backgroundColor={INK} layout={ColumnLayouts.TwoEqual} padding="30px 40px 0">
          {Tile({ n: '142', label: 'Runs', border: { ...hair('Right'), ...hair('Bottom') } })}
          {Tile({ n: '96,400', label: 'Metres climbed', border: hair('Bottom') })}
        </Row>
        <Row backgroundColor={INK} layout={ColumnLayouts.TwoEqual} padding="0 40px">
          {Tile({ n: '34.2', label: 'Longest km · Oct 12', border: { ...hair('Right'), ...hair('Bottom') } })}
          {Tile({ n: '21:38', label: 'Fastest 5K', border: hair('Bottom') })}
        </Row>
        <Row backgroundColor={INK} layout={ColumnLayouts.TwoEqual} padding="0 40px">
          {Tile({ n: '214h 06m', label: 'Moving time', border: { ...hair('Right'), ...hair('Bottom') } })}
          {Tile({ n: '38', label: 'Sunrise runs', border: hair('Bottom') })}
        </Row>
        <Row backgroundColor={INK} layout={ColumnLayouts.TwoEqual} padding="0 40px">
          {Tile({ n: '21', label: 'Day streak', border: hair('Right') })}
          {Tile({ n: '+18%', label: 'vs 2025', color: SAGE })}
        </Row>

        {/* charts */}
        <Row backgroundColor={INK} cells={[3, 2]} padding="26px 40px 0">
          <Col padding="0 12px 0 0" verticalAlign="bottom"><Image src="assets/cadence-elevation.svg" alt="Season elevation profile" width="100%" /></Col>
          <Col padding="0" verticalAlign="bottom"><Image src="assets/cadence-route.svg" alt="Top route trace" width="110px" /></Col>
        </Row>
        <Row backgroundColor={INK} padding="24px 40px 40px">
          <Column padding="0" border={hair('Top')}>
            <Paragraph html={`<span style="display:flex;justify-content:space-between;font-family:${mono};font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:${c(0.45)};padding-top:16px;"><span>cadence.run/2026</span><span>Print · frame · keep</span></span>`} />
          </Column>
        </Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- WEB (scroll-story)
  const chapterLabel = (n: string, title: string) =>
    `<span style="font-family:${mono};font-size:13px;font-weight:500;letter-spacing:.24em;text-transform:uppercase;color:${c(0.55)};"><span style="color:${ORANGE};">${n}</span> &nbsp;—&nbsp; ${title}</span>`;

  return (
    <Root mode={mode} backgroundColor={INK} contentWidth="1000px" fontFamily={font.body}>
      {/* nav */}
      <Row backgroundColor={INK} cells={[3, 2]} padding="22px 56px" border={hair('Bottom')}>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/cadence-mark.svg" width="28" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:16px;font-weight:600;letter-spacing:.14em;color:${BONE};vertical-align:middle;padding-left:8px;">CADENCE</span>`} /></Col>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">2026 · Alex</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".22em" color={c(0.55)} textAlign="right" /></Col>
      </Row>

      {/* hero */}
      <Row backgroundColor={INK} padding="72px 56px 60px">
        <Column padding="0">
          <Paragraph html={`<span style="text-transform:uppercase">Your Year in Motion</span>`} fontFamily={font.mono} fontSize="12px" fontWeight={500} letterSpacing=".26em" color={ORANGE} lineHeight="1" />
          <Heading level="h2" text="You showed up 142 times. Here's the shape of your year." fontFamily={font.display} fontSize="52px" fontWeight={500} letterSpacing="-.02em" lineHeight="1.04" color={BONE} containerPadding="20px 0 0" />
          <Paragraph text="Five chapters, one athlete, twelve months of dawn. Scroll down — it gets loud." fontFamily={font.body} fontSize="17px" color={c(0.62)} lineHeight="1.6" containerPadding="18px 0 0" />
          <Paragraph html={`<span style="text-transform:uppercase">↓ Scroll</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".24em" color={c(0.4)} containerPadding="40px 0 0" />
        </Column>
      </Row>

      {/* 01 THE DISTANCE */}
      <Row backgroundColor={INK} padding="64px 56px" border={hair('Top')}>
        <Column padding="0">
          <Paragraph html={chapterLabel('01', 'The Distance')} containerPadding="0 0 24px" />
          <Paragraph html={heroNum('1,284', 'KM', 150, 28)} />
          <Paragraph html={`Across 142 runs — a <span style="color:${SAGE};">+18%</span> jump on last year. October was your biggest month; December, your rest.`} fontFamily={font.body} fontSize="17px" color={c(0.68)} lineHeight="1.6" containerPadding="22px 0 0" />
          <Image src="assets/cadence-barchart.svg" alt="Monthly distance bar chart, October highest" width="100%" containerPadding="36px 0 0" />
          <Paragraph html={`<span style="text-transform:uppercase">Monthly distance · km · Jan → Dec</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".2em" color={c(0.4)} containerPadding="12px 0 0" />
        </Column>
      </Row>

      {/* 02 THE CLIMB */}
      <Row backgroundColor={PANEL} padding="64px 56px" border={hair('Top')}>
        <Column padding="0">
          <Paragraph html={chapterLabel('02', 'The Climb')} containerPadding="0 0 24px" />
          <Paragraph html={heroNum('96,400', 'M UP', 132, 26)} />
          <Paragraph text="Vertical metres climbed this year. Your legs did the Matterhorn, floor to summit, twenty-two times over." fontFamily={font.body} fontSize="17px" color={c(0.68)} lineHeight="1.6" containerPadding="22px 0 0" />
          <Image src="assets/cadence-elevation.svg" alt="Season elevation profile" width="100%" containerPadding="36px 0 0" />
          <Paragraph html={`<span style="text-transform:uppercase">Season elevation profile · summit marked</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".2em" color={c(0.4)} containerPadding="12px 0 0" />
        </Column>
      </Row>

      {/* 03 THE EFFORT */}
      <Row backgroundColor={INK} padding="64px 56px 32px" border={hair('Top')}>
        <Column padding="0"><Paragraph html={chapterLabel('03', 'The Effort')} /></Column>
      </Row>
      <Row backgroundColor={INK} layout={ColumnLayouts.ThreeEqual} padding="0 56px 64px" border={{}}>
        <Col padding="32px 28px" backgroundColor={INK} border={{ ...hair('Top'), ...hair('Bottom'), ...hair('Left'), ...hair('Right') }}>
          <Paragraph html={`<span style="font-family:${disp};font-size:56px;font-weight:500;letter-spacing:-.02em;line-height:.9;font-variant-numeric:tabular-nums;color:${BONE};">214<span style="font-size:26px;color:${c(0.55)};">h</span> 06<span style="font-size:26px;color:${c(0.55)};">m</span></span>`} />
          <Paragraph html={`<span style="text-transform:uppercase">Moving time</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".18em" color={c(0.5)} containerPadding="16px 0 0" />
        </Col>
        <Col padding="32px 28px" backgroundColor={INK} border={{ ...hair('Top'), ...hair('Bottom'), ...hair('Right') }}>
          <Paragraph html={`<span style="font-family:${disp};font-size:56px;font-weight:500;letter-spacing:-.02em;line-height:.9;font-variant-numeric:tabular-nums;color:${BONE};">34.2<span style="font-size:26px;color:${ORANGE};"> km</span></span>`} />
          <Paragraph html={`<span style="text-transform:uppercase">Longest run · Oct 12</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".18em" color={c(0.5)} containerPadding="16px 0 0" />
        </Col>
        <Col padding="32px 28px" backgroundColor={INK} border={{ ...hair('Top'), ...hair('Bottom'), ...hair('Right') }}>
          <Paragraph html={`<span style="font-family:${disp};font-size:56px;font-weight:500;letter-spacing:-.02em;line-height:.9;font-variant-numeric:tabular-nums;color:${BONE};">21:38</span>`} />
          <Paragraph html={`<span style="text-transform:uppercase">Fastest 5K</span>`} fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".18em" color={c(0.5)} containerPadding="16px 0 0" />
        </Col>
      </Row>

      {/* 04 THE HABIT */}
      <Row backgroundColor={PANEL} padding="64px 56px 32px" border={hair('Top')}>
        <Column padding="0"><Paragraph html={chapterLabel('04', 'The Habit')} /></Column>
      </Row>
      <Row backgroundColor={PANEL} cells={[23, 17]} padding="0 56px 64px">
        <Col padding="0" verticalAlign="middle">
          <Paragraph html={`<span style="font-family:${disp};font-size:80px;font-weight:500;line-height:.8;font-variant-numeric:tabular-nums;color:${BONE};">21</span> <span style="font-family:${mono};font-size:16px;letter-spacing:.1em;color:${ORANGE};">DAY STREAK</span>`} />
          <Paragraph text="Your longest unbroken run of days. Late September into October." fontFamily={font.body} fontSize="15px" color={c(0.6)} lineHeight="1.5" containerPadding="8px 0 24px" />
          <Divider borderTopWidth="1px" borderTopColor={HAIR} borderTopStyle="solid" width="100%" />
          <Paragraph html={`<span style="font-family:${disp};font-size:80px;font-weight:500;line-height:.8;font-variant-numeric:tabular-nums;color:${BONE};">38</span> <span style="font-family:${mono};font-size:16px;letter-spacing:.1em;color:${SAGE};">SUNRISE RUNS</span>`} containerPadding="24px 0 0" />
          <Paragraph text="Out the door before the sun. More than one in four." fontFamily={font.body} fontSize="15px" color={c(0.6)} lineHeight="1.5" containerPadding="8px 0 0" />
        </Col>
        <Col padding="28px" verticalAlign="middle" border={{ ...hair('Top'), ...hair('Bottom'), ...hair('Left'), ...hair('Right') }}>
          <Image src="assets/cadence-route.svg" alt="Top route trace" width="100%" maxWidth="220px" />
          <Paragraph html={`<span style="text-transform:uppercase">Top route ×22</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".2em" color={c(0.5)} textAlign="center" containerPadding="18px 0 0" />
          <Heading level="h3" text="Miljacka Loop" fontFamily={font.display} fontSize="22px" fontWeight={500} color={BONE} textAlign="center" containerPadding="6px 0 0" />
        </Col>
      </Row>

      {/* 05 PERSONA — full orange payoff */}
      <Row backgroundColor={ORANGE} padding="80px 56px" border={hair('Top')}>
        <Column padding="0">
          <Paragraph html={`<span style="text-transform:uppercase"><span>05</span> &nbsp;—&nbsp; Your Persona</span>`} fontFamily={font.mono} fontSize="12px" fontWeight={500} letterSpacing=".26em" color="rgba(14,15,18,.6)" />
          <Heading level="h2" text="The Dawn Patrol" fontFamily={font.display} fontSize="96px" fontWeight={500} letterSpacing="-.03em" lineHeight=".92" color={INK} containerPadding="20px 0 0" />
          <Paragraph text="You logged 38 runs before sunrise. The city was still asleep. You weren't. This is who you were in 2026." fontFamily={font.body} fontSize="19px" color="rgba(14,15,18,.78)" lineHeight="1.55" containerPadding="24px 0 0" />
        </Column>
      </Row>

      {/* share card */}
      <Row backgroundColor={INK} padding="64px 56px 72px" border={hair('Top')}>
        <Column padding="0">
          <Paragraph html={`<span style="text-transform:uppercase">Tap to share your card</span>`} fontFamily={font.mono} fontSize="10px" letterSpacing=".24em" color={c(0.4)} textAlign="center" containerPadding="0 0 24px" />
        </Column>
      </Row>
      <Row backgroundColor={INK} cells={[1, 5, 1]} padding="0 56px 72px">
        <Column padding="0" />
        <Column padding="32px" backgroundColor={CARD} border={{ ...hair('Top'), ...hair('Bottom'), ...hair('Left'), ...hair('Right') }}>
          <Paragraph html={`<span style="display:flex;justify-content:space-between;align-items:center;"><span><img src="assets/cadence-mark.svg" width="24" style="vertical-align:middle"/> <span style="font-family:${disp};font-size:14px;font-weight:600;letter-spacing:.14em;color:${BONE};vertical-align:middle;">CADENCE</span></span><span style="font-family:${mono};font-size:11px;letter-spacing:.14em;color:${c(0.5)};">2026</span></span>`} />
          <Heading level="h3" text="The Dawn Patrol" fontFamily={font.display} fontSize="40px" fontWeight={500} letterSpacing="-.01em" color={BONE} containerPadding="24px 0 4px" />
          <Paragraph html={`<span style="text-transform:uppercase">Alex</span>`} fontFamily={font.mono} fontSize="12px" letterSpacing=".1em" color={ORANGE} />
          <Paragraph
            html={
              `<span style="display:grid;grid-template-columns:1fr 1fr;gap:16px 12px;">` +
              [['1,284', 'km', 'Distance'], ['96,400', 'm', 'Climbed'], ['142', '', 'Runs'], ['21', '', 'Day streak']]
                .map(([n, u, l]) => `<span><span style="font-family:${disp};font-size:26px;font-weight:500;font-variant-numeric:tabular-nums;color:${BONE};">${n}<span style="font-size:13px;color:${c(0.5)};"> ${u}</span></span><br/><span style="font-family:${mono};font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:${c(0.45)};">${l}</span></span>`)
                .join('') +
              `</span>`
            }
            containerPadding="26px 0 0"
          />
          <Button href="#" backgroundColor={ORANGE} color={INK} width="100%" fontFamily={font.body} fontSize="14px" fontWeight={600} padding="14px" textAlign="center" borderRadius="0px">Share your card →</Button>
        </Column>
        <Column padding="0" />
      </Row>
    </Root>
  );
}
