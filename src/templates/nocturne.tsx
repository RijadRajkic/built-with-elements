import React from 'react';
import { Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider } from '@unlayer/react-elements';
import { Root, type Mode } from '../lib/root.js';

/**
 * Nocturne — Elias Vaughn (a dark-academia gallery exhibition).
 * email = the opening invite · web = the exhibition page · document = a bi-fold
 * gallery guide (cover/colophon + statement/floor-plan + works checklist).
 * Serif-led (EB Garamond); gilt is the light in the dark, oxblood a whisper.
 * Plates are AI-generated (Recraft), Samori-style tenebrous paintings.
 */

const BLACK = '#14110F';
const PARCH = '#E7E2D6';
const GILT = '#A8894F';
const MONO = "'JetBrains Mono','Courier New',monospace";
const BODYF = "Inter,'Helvetica Neue',Arial,sans-serif";
const KRAFT = '#B9B6AE';
const g = (a: number) => `rgba(231,226,214,${a})`;
const gilt = (a: number) => `rgba(168,137,79,${a})`;

const serif = { label: 'EB Garamond', value: "'EB Garamond','Fraunces',Georgia,'Times New Roman',serif" };
const mono = { label: 'JetBrains Mono', value: MONO };
const bodyFont = { label: 'Inter', value: BODYF };

const Col = Column as React.FC<
  React.ComponentProps<typeof Column> & { verticalAlign?: 'top' | 'middle' | 'bottom' }
>;
const border = (side: string, color: string, style = 'solid') => ({
  [`border${side}Width`]: '1px',
  [`border${side}Color`]: color,
  [`border${side}Style`]: style,
});

const plate = (src: string, alt = '') => `<img src="${src}" alt="${alt}" style="display:block;width:100%;border:1px solid ${gilt(0.3)};"/>`;

const WORKS: [string, string, string, string][] = [
  ['assets/nocturne-plate-1.jpg', '01', 'Veil (After the Storm)', 'Oil on linen · 2023 · 180 × 140 cm'],
  ['assets/nocturne-plate-2.jpg', '02', 'Nocturne No. 7', 'Oil on board · 2021 · 90 × 70 cm'],
  ['assets/nocturne-plate-3.jpg', '03', 'The Anatomist’s Dream', 'Oil on linen · 2022 · 150 × 120 cm'],
  ['assets/nocturne-plate-4.jpg', '04', 'Reliquary', 'Oil & gold leaf on panel · 2024 · 60 × 45 cm'],
  ['assets/nocturne-plate-5.jpg', '05', 'Umbra', 'Oil on linen · 2020 · 200 × 160 cm'],
  ['assets/nocturne-plate-6.jpg', '06', 'Saint in Negative', 'Oil on linen · 2025 · 170 × 130 cm'],
];

const checklistHtml = () =>
  WORKS.map(
    ([, num, title, details], i) =>
      `<span style="display:grid;grid-template-columns:auto 1fr;gap:14px;padding:13px 0;${i < 5 ? 'border-bottom:1px solid ' + gilt(0.22) + ';' : ''}"><span style="font-family:${MONO};font-size:12px;color:${GILT};">${num}</span><span><span style="font-family:'EB Garamond',serif;font-style:italic;font-size:19px;color:${PARCH};">${title}</span><br/><span style="font-family:${MONO};font-size:10px;letter-spacing:.04em;color:${g(0.55)};">${details}</span></span></span>`,
  ).join('');

export default function Nocturne({ mode }: { mode: Mode }) {
  // ---------------------------------------------------------------- EMAIL (invite)
  if (mode === 'email') {
    return (
      <Root mode={mode} backgroundColor={KRAFT} contentWidth="600px" previewText="You're invited — Nocturne: Elias Vaughn, opening 12 September" fontFamily={bodyFont}>
        <Row backgroundColor={BLACK} padding="26px 40px 0">
          <Column padding="0">
            <Paragraph html={`<span style="display:block;text-align:center;"><img src="assets/nocturne-monogram.svg" width="40"/></span>`} />
            <Paragraph html={`<span style="text-transform:uppercase">The Aldous Institute</span>`} fontFamily={mono} fontSize="10px" fontWeight={500} letterSpacing=".32em" color={GILT} textAlign="center" containerPadding="14px 0 0" />
            <Divider borderTopWidth="1px" borderTopColor={gilt(0.4)} borderTopStyle="solid" width="30%" containerPadding="20px 0 0" />
          </Column>
        </Row>
        <Row backgroundColor={BLACK} padding="24px 40px 8px">
          <Column padding="0">
            <Paragraph html={`<span style="text-transform:uppercase">You are invited to the opening of</span>`} fontFamily={mono} fontSize="10px" fontWeight={500} letterSpacing=".24em" color={g(0.55)} textAlign="center" />
            <Heading level="h1" text="Nocturne" fontFamily={serif} fontSize="58px" fontWeight={500} letterSpacing="-.01em" lineHeight="1" color={PARCH} textAlign="center" containerPadding="12px 0 0" />
            <Paragraph html={`<span style="font-style:italic">Elias Vaughn · Paintings 2018–2026</span>`} fontFamily={serif} fontSize="19px" color={g(0.75)} textAlign="center" containerPadding="8px 0 0" />
          </Column>
        </Row>
        <Row backgroundColor={BLACK} padding="22px 40px 0"><Column padding="0"><Paragraph html={plate('assets/nocturne-plate-2.jpg', 'Nocturne No. 7')} /></Column></Row>
        <Row backgroundColor={BLACK} padding="26px 40px 6px">
          <Column padding="0">
            <Paragraph html={`Saturday 12 September 2026 · 7 pm`} fontFamily={serif} fontSize="24px" color={PARCH} textAlign="center" />
            <Paragraph html={`<span style="text-transform:uppercase">14 Coirse Row · Wed–Sun 11–18 · Until 30 Nov</span>`} fontFamily={mono} fontSize="11px" letterSpacing=".14em" color={g(0.6)} textAlign="center" containerPadding="10px 0 0" />
          </Column>
        </Row>
        <Row backgroundColor={BLACK} padding="14px 48px 4px"><Column padding="0"><Paragraph html={`<span style="font-style:italic">“Come at dusk, and let your eyes adjust.”</span>`} fontFamily={serif} fontSize="17px" color={g(0.72)} lineHeight="1.5" textAlign="center" /></Column></Row>
        <Row backgroundColor={BLACK} padding="24px 48px"><Column padding="0"><Button href="#" backgroundColor={GILT} color={BLACK} width="100%" fontFamily={mono} fontSize="12px" fontWeight={600} letterSpacing=".14em" padding="15px" textAlign="center" borderRadius="0px">RSVP FOR THE OPENING →</Button></Column></Row>
        <Row backgroundColor={BLACK} padding="0 40px 24px"><Column padding="0"><Paragraph html={`<span style="text-transform:uppercase">The Aldous Institute · Admission free</span>`} fontFamily={mono} fontSize="9px" letterSpacing=".16em" color={g(0.4)} textAlign="center" /></Column></Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- DOCUMENT (bi-fold guide)
  if (mode === 'document') {
    const foldL = border('Right', gilt(0.4), 'dashed');
    return (
      <Root mode={mode} backgroundColor={BLACK} contentWidth="820px" fontFamily={bodyFont}>
        {/* OUTSIDE — colophon | cover */}
        <Row backgroundColor={BLACK} layout={ColumnLayouts.TwoEqual} padding="0">
          <Column padding="40px" backgroundColor={BLACK} border={foldL}>
            {[
              <Paragraph key="v" html={`<span style="text-transform:uppercase">Visiting</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".24em" color={GILT} />,
              <Paragraph key="a" html={`The Aldous Institute<br/>14 Coirse Row`} fontFamily={serif} fontSize="26px" color={PARCH} lineHeight="1.25" containerPadding="14px 0 0" />,
              <Paragraph key="h" html={`<span style="text-transform:uppercase">Wed–Sun · 11:00–18:00<br/>Admission free<br/>Opening 12 Sep · 7 pm</span>`} fontFamily={mono} fontSize="11px" letterSpacing=".06em" color={g(0.6)} lineHeight="1.9" containerPadding="16px 0 40px" />,
              <Divider key="d" borderTopWidth="1px" borderTopColor={gilt(0.35)} borderTopStyle="solid" width="100%" />,
              <Paragraph key="c" html={`<span style="text-transform:uppercase">Nocturne — Elias Vaughn<br/>Paintings 2018–2026 · 12 Sep – 30 Nov 2026<br/>Curated by M. Alder · Gallery guide №1</span>`} fontFamily={mono} fontSize="9.5px" letterSpacing=".08em" color={g(0.5)} lineHeight="1.8" containerPadding="16px 0 0" />,
            ]}
          </Column>
          <Column padding="44px 40px" backgroundColor={BLACK}>
            {[
              <Paragraph key="m" html={`<span style="display:block;text-align:center;"><img src="assets/nocturne-monogram.svg" width="44"/></span>`} />,
              <Paragraph key="p" html={`<span style="text-transform:uppercase">The Aldous Institute presents</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".3em" color={GILT} textAlign="center" containerPadding="18px 0 0" />,
              <Heading key="t" level="h2" text="Nocturne" fontFamily={serif} fontSize="66px" fontWeight={500} lineHeight="1" color={PARCH} textAlign="center" containerPadding="18px 0 0" />,
              <Paragraph key="s" html={`<span style="font-style:italic">Elias Vaughn</span>`} fontFamily={serif} fontSize="20px" color={g(0.78)} textAlign="center" containerPadding="10px 0 0" />,
              <Paragraph key="pl" html={`<span style="display:block;max-width:190px;margin:26px auto 0;">${plate('assets/nocturne-plate-2.jpg')}</span>`} />,
              <Paragraph key="y" html={`<span style="text-transform:uppercase">Paintings 2018–2026</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".16em" color={g(0.6)} textAlign="center" containerPadding="24px 0 0" />,
            ]}
          </Column>
        </Row>
        <Row backgroundColor={BLACK} padding="14px 0"><Column padding="0"><Divider borderTopWidth="1px" borderTopColor={gilt(0.3)} borderTopStyle="dashed" width="100%" /></Column></Row>
        {/* INSIDE — statement + plan | checklist */}
        <Row backgroundColor={BLACK} layout={ColumnLayouts.TwoEqual} padding="0">
          <Column padding="40px" backgroundColor={BLACK} border={foldL}>
            {[
              <Paragraph key="cn" html={`<span style="text-transform:uppercase">Curator's note</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".24em" color={GILT} />,
              <Paragraph key="st" html={`Elias Vaughn paints the hour when things lose their edges. Across eight years his surfaces darken and thin, until each figure is less seen than remembered — a veil, a reliquary, a saint in negative.`} fontFamily={serif} fontSize="18px" color={g(0.85)} lineHeight="1.55" containerPadding="14px 0 0" />,
              <Paragraph key="gp" html={`<span style="text-transform:uppercase">Gallery plan</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".24em" color={GILT} containerPadding="34px 0 0" />,
              <Image key="fp" src="assets/nocturne-floorplan.svg" alt="Gallery floor plan with numbered works" width="100%" containerPadding="14px 0 0" />,
              <Paragraph key="en" html={`↑ Enter from Coirse Row · works numbered 1–6`} fontFamily={mono} fontSize="9.5px" letterSpacing=".06em" color={g(0.5)} containerPadding="12px 0 0" />,
            ]}
          </Column>
          <Column padding="40px" backgroundColor={BLACK}>
            {[
              <Paragraph key="w" html={`<span style="text-transform:uppercase">The works</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".24em" color={GILT} />,
              <Paragraph key="cl" html={checklistHtml()} containerPadding="16px 0 0" />,
            ]}
          </Column>
        </Row>
      </Root>
    );
  }

  // ---------------------------------------------------------------- WEB (exhibition page)
  const gap = <Column padding="0" backgroundColor={BLACK} />;
  const work = ([src, num, title, details]: [string, string, string, string]) => (
    <Column padding="0" backgroundColor={BLACK}>
      {[
        <Paragraph key="pl" html={plate(src, title)} />,
        <Paragraph key="n" html={num} fontFamily={mono} fontSize="10px" letterSpacing=".16em" color={GILT} containerPadding="14px 0 0" />,
        <Paragraph key="t" html={`<span style="font-style:italic">${title}</span>`} fontFamily={serif} fontSize="22px" color={PARCH} containerPadding="4px 0 0" />,
        <Paragraph key="d" html={`<span style="letter-spacing:.06em">${details}</span>`} fontFamily={mono} fontSize="10.5px" color={g(0.55)} containerPadding="6px 0 0" />,
      ]}
    </Column>
  );
  const visit = (label: string, big: string, small: string, brd?: object) => (
    <Col padding="28px 32px" backgroundColor={BLACK} border={brd} verticalAlign="top">
      <Paragraph html={`<span style="text-transform:uppercase">${label}</span>`} fontFamily={mono} fontSize="10px" letterSpacing=".18em" color={GILT} />
      <Paragraph html={big} fontFamily={serif} fontSize="19px" color={PARCH} containerPadding="8px 0 0" />
      <Paragraph html={small} fontFamily={mono} fontSize="11px" color={g(0.55)} containerPadding="6px 0 0" />
    </Col>
  );
  return (
    <Root mode={mode} backgroundColor={BLACK} contentWidth="1000px" fontFamily={bodyFont}>
      <Row backgroundColor={BLACK} cells={[1, 1]} padding="20px 48px" border={border('Bottom', gilt(0.22))}>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<img src="assets/nocturne-monogram.svg" width="28" style="vertical-align:middle"/> <span style="font-family:${MONO};font-size:12px;font-weight:500;letter-spacing:.26em;text-transform:uppercase;color:${PARCH};vertical-align:middle;padding-left:8px;">Nocturne</span>`} /></Col>
        <Col padding="0" verticalAlign="middle"><Paragraph html={`<span style="text-transform:uppercase">The Aldous Institute</span>`} fontFamily={mono} fontSize="11px" letterSpacing=".2em" color={g(0.55)} textAlign="right" /></Col>
      </Row>

      {/* hero */}
      <Row backgroundColor={BLACK} cells={[125, 75]} padding="64px 48px" border={border('Bottom', gilt(0.22))}>
        <Col padding="0 24px 0 0" verticalAlign="middle">
          <Paragraph html={`<span style="text-transform:uppercase">12 Sep – 30 Nov 2026</span>`} fontFamily={mono} fontSize="11px" fontWeight={500} letterSpacing=".26em" color={GILT} />
          <Heading level="h2" text="Nocturne" fontFamily={serif} fontSize="92px" fontWeight={500} letterSpacing="-.015em" lineHeight=".96" color={PARCH} containerPadding="16px 0 0" />
          <Paragraph html={`<span style="font-style:italic">Elias Vaughn · Paintings 2018–2026</span>`} fontFamily={serif} fontSize="24px" color={g(0.78)} containerPadding="10px 0 0" />
          <Paragraph text="Six late paintings, shown together for the first time. Opening night Saturday 12 September, 7 pm." fontFamily={bodyFont} fontSize="15px" color={g(0.6)} lineHeight="1.6" containerPadding="22px 0 0" />
          <Paragraph html={`<a href="#" style="display:inline-block;background:${GILT};color:${BLACK};padding:13px 24px;font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;">Plan your visit →</a>`} containerPadding="26px 0 0" />
        </Col>
        <Col padding="0" verticalAlign="middle"><Paragraph html={plate('assets/nocturne-plate-6.jpg', 'Saint in Negative')} /></Col>
      </Row>

      {/* curator statement */}
      <Row backgroundColor={BLACK} padding="72px 48px" border={border('Bottom', gilt(0.22))}>
        <Column padding="0">
          <Paragraph html={`<span style="text-transform:uppercase">Curator's note</span>`} fontFamily={mono} fontSize="10px" fontWeight={500} letterSpacing=".26em" color={GILT} textAlign="center" />
          <Paragraph html={`<span style="display:block;max-width:680px;margin:0 auto;">Elias Vaughn paints the hour when things lose their edges. Across eight years his surfaces darken and thin, until each figure is less seen than remembered — a veil, a reliquary, a saint in negative. Nocturne brings these late paintings together; linger, and let your eyes adjust.</span>`} fontFamily={serif} fontSize="26px" color={PARCH} lineHeight="1.5" textAlign="center" containerPadding="22px 0 0" />
        </Column>
      </Row>

      {/* works grid */}
      <Row backgroundColor={BLACK} padding="64px 48px 8px"><Column padding="0"><Paragraph html={`<span style="text-transform:uppercase">The works — six paintings</span>`} fontFamily={mono} fontSize="11px" fontWeight={500} letterSpacing=".24em" color={g(0.55)} /></Column></Row>
      <Row backgroundColor={BLACK} cells={[32, 2, 32, 2, 32]} padding="24px 48px 0">
        {work(WORKS[0])}{gap}{work(WORKS[1])}{gap}{work(WORKS[2])}
      </Row>
      <Row backgroundColor={BLACK} cells={[32, 2, 32, 2, 32]} padding="36px 48px 40px">
        {work(WORKS[3])}{gap}{work(WORKS[4])}{gap}{work(WORKS[5])}
      </Row>

      {/* visiting */}
      <Row backgroundColor={BLACK} layout={ColumnLayouts.ThreeEqual} padding="0" border={border('Top', gilt(0.22))}>
        {visit('Dates', '12 Sep – 30 Nov 2026', 'Wed–Sun · 11–18', border('Right', gilt(0.22)))}
        {visit('Where', 'The Aldous Institute', '14 Coirse Row', border('Right', gilt(0.22)))}
        {visit('Admission', 'Free', 'Opening 12 Sep · 7 pm')}
      </Row>
    </Root>
  );
}
