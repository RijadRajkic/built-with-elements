import React from 'react';
import {
  Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider, Social,
} from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

/**
 * Event Ticket — Nightshift · a rooftop electronic showcase.
 * "After-dark": near-black grounds, oversized display, heavy negative space,
 * one electric-magenta accent. The QR always sits on a LIGHT stub so it scans.
 *
 * email / web  → EMAIL · CONFIRMATION artboard (magenta Buttons, "View in browser",
 *                manage-tickets footer). web = same layout, reflow-friendly.
 * document     → PRINT PDF · WALLET TICKET artboard (compact dark ticket card + QR
 *                + printed instructions; no tracking / "view in browser").
 */

// ── Palette (verbatim from the spec-sheet band) ─────────────────────────────
const NEAR_BLACK = '#0B0B10'; // Ground · ticket
const PANEL = '#14141C';      // Insets · hero image  (spec calls #14141C)
const MAGENTA = '#FF2D78';    // The one spark
const WHITE = '#F4F4F8';      // Text · the light QR stub
const MUTED = '#8E8EA0';      // Secondary text (spec); body copy uses #9A9AAB
const BODY_MUTE = '#9A9AAB';
const BODY_DIM = '#C7C7D2';
const FINE = '#6E6E82';
const HAIRLINE = 'rgba(244,244,248,.12)';
const HAIRLINE_STRONG = 'rgba(244,244,248,.13)';

// Light-stub tones (ticket-stub sits on #F4F4F8)
const INK = '#0B0B10';
const STUB_LABEL = '#6A6A78';

const DISPLAY_STACK = "'Space Grotesk','Helvetica Neue',Arial,sans-serif";
const MONO_STACK = "'JetBrains Mono','Courier New',monospace";

/**
 * One stub row = two key/value stacks side by side. The block model bottoms out
 * at Column (no nested Rows), so the 2x2 stub grid is expressed as two of these
 * inline-HTML Paragraphs — two inline-block spans each, mono label over a big
 * display (or mono) value, matching the artboard's grid cells exactly.
 */
type StubCell = { label: string; value: string; valueMono: boolean };
function stubPair(a: StubCell, b: StubCell, valueColor: string, labelColor: string): string {
  const cell = (c: StubCell) => {
    const valFace = c.valueMono ? MONO_STACK : DISPLAY_STACK;
    const valWeight = c.valueMono ? 500 : 600;
    return (
      `<span style="display:inline-block;width:49%;vertical-align:top;">` +
      `<span style="display:block;font-family:${MONO_STACK};font-size:8px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:${labelColor};">${c.label}</span>` +
      `<span style="display:block;font-family:${valFace};font-size:14px;font-weight:${valWeight};color:${valueColor};margin-top:5px;">${c.value}</span>` +
      `</span>`
    );
  };
  return `<span style="display:block;">${cell(a)}<span style="display:inline-block;width:2%;">&nbsp;</span>${cell(b)}</span>`;
}

export default function EventTicket({ mode }: { mode: Mode }) {
  const isDoc = mode === 'document';
  return isDoc ? <WalletTicket /> : <Confirmation mode={mode} />;
}

/* ============================================================================
 * EMAIL / WEB · CONFIRMATION
 * ==========================================================================*/
function Confirmation({ mode }: { mode: Mode }) {
  return (
    <Root
      mode={mode}
      backgroundColor={NEAR_BLACK}
      contentWidth="600px"
      previewText="You're in — Nightshift · Sat Aug 15. Your QR ticket is inside."
      fontFamily={font.body}
    >
      {/* ---- Preheader: from-line + view in browser ---- */}
      <Row cells={[2, 1]} backgroundColor={NEAR_BLACK} padding="18px 30px 16px">
        <Column padding="0">
          <Paragraph
            fontFamily={font.body}
            fontSize="13px"
            color={WHITE}
            lineHeight="1.5"
            html={`<strong style="font-weight:600;">Nightshift</strong> <span style="color:#7C7C8C;font-weight:400;">&lt;tickets@nightshift.live&gt;</span><br/><span style="color:#7C7C8C;font-size:12px;">You're in — Nightshift · Sat Aug 15</span>`}
          />
        </Column>
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            color="#7C7C8C"
            letterSpacing=".12em"
            textAlign="right"
            html={`<a href="#" style="color:#7C7C8C;text-decoration:none;text-transform:uppercase;">View in browser</a>`}
          />
        </Column>
      </Row>

      {/* ================= BAND 1 · HERO ================= */}
      <Row cells={[1, 1]} backgroundColor={NEAR_BLACK} padding="32px 30px 6px">
        <Column padding="0">
          <Image src="assets/nightshift-mark-magenta.svg" alt="Nightshift" width={30} />
        </Column>
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            color="#7C7C8C"
            letterSpacing=".2em"
            textAlign="right"
            html={`<span style="text-transform:uppercase;">Rooftop Series · Vol. 07</span>`}
          />
        </Column>
      </Row>
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={NEAR_BLACK} padding="24px 30px 26px">
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="11px"
            fontWeight={500}
            color={MAGENTA}
            letterSpacing=".32em"
            html={`<span style="text-transform:uppercase;">You're in</span>`}
          />
          <Heading
            level="h1"
            text="Nightshift"
            fontFamily={font.display}
            fontSize="62px"
            fontWeight={500}
            color={WHITE}
            letterSpacing="-.025em"
            lineHeight="0.92"
          />
          <Paragraph
            fontFamily={font.body}
            fontSize="15px"
            color={BODY_MUTE}
            lineHeight="1.5"
            html={`A rooftop electronic showcase — Kessler, Aluna Vega &amp; Midnight Republic, under the open sky.`}
          />
        </Column>
      </Row>

      {/* ---- Hero image panel (placeholder — no baked-in text) ---- */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={NEAR_BLACK} padding="0 30px 26px">
        <Column
          backgroundColor={PANEL}
          padding="88px 20px"
          border={{
            borderTopWidth: '1.5px', borderTopColor: 'rgba(255,45,120,.4)', borderTopStyle: 'dashed',
            borderRightWidth: '1.5px', borderRightColor: 'rgba(255,45,120,.4)', borderRightStyle: 'dashed',
            borderBottomWidth: '1.5px', borderBottomColor: 'rgba(255,45,120,.4)', borderBottomStyle: 'dashed',
            borderLeftWidth: '1.5px', borderLeftColor: 'rgba(255,45,120,.4)', borderLeftStyle: 'dashed',
          }}
        >
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            color="#6E6E82"
            letterSpacing=".14em"
            textAlign="center"
            html={`<span style="text-transform:uppercase;">Photo goes here</span>`}
          />
          <Paragraph
            fontFamily={font.body}
            fontSize="11px"
            color="#5A5A6E"
            textAlign="center"
            html={`Rooftop · night · crowd`}
          />
        </Column>
      </Row>

      {/* ================= BAND 2 · ORDER CONFIRMED ================= */}
      <Row
        cells={[1, 24]}
        backgroundColor={NEAR_BLACK}
        padding="22px 30px"
        border={{
          borderTopWidth: '1px', borderTopColor: HAIRLINE, borderTopStyle: 'solid',
          borderBottomWidth: '1px', borderBottomColor: HAIRLINE, borderBottomStyle: 'solid',
        }}
      >
        <Column padding="6px 0 0">
          <Paragraph
            fontFamily={font.body}
            fontSize="13px"
            lineHeight="1"
            html={`<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#FF2D78;">&nbsp;</span>`}
          />
        </Column>
        <Column padding="0">
          <Paragraph
            fontFamily={font.body}
            fontSize="13px"
            color={BODY_DIM}
            lineHeight="1.5"
            html={`Order <span style="font-family:'JetBrains Mono','Courier New',monospace;color:#F4F4F8;">NS-7742</span> confirmed — sent to <span style="color:#F4F4F8;">alex@example.com</span>`}
          />
        </Column>
      </Row>

      {/* ================= BAND 3 · DETAILS (2col) ================= */}
      <Row
        cells={[1, 1]}
        backgroundColor={NEAR_BLACK}
        border={{ borderBottomWidth: '1px', borderBottomColor: HAIRLINE, borderBottomStyle: 'solid' }}
      >
        <Column
          padding="24px 30px"
          border={{ borderRightWidth: '1px', borderRightColor: HAIRLINE, borderRightStyle: 'solid' }}
        >
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            color={MAGENTA}
            letterSpacing=".18em"
            html={`<span style="text-transform:uppercase;">Date &amp; time</span>`}
          />
          <Heading
            level="h3"
            text="Sat, Aug 15 2026"
            fontFamily={font.display}
            fontSize="17px"
            fontWeight={600}
            color={WHITE}
          />
          <Paragraph
            fontFamily={font.mono}
            fontSize="12px"
            color={BODY_MUTE}
            lineHeight="1.6"
            html={`Doors 9:00 PM<br/>Sets till 3:00 AM`}
          />
        </Column>
        <Column padding="24px 30px">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            color={MAGENTA}
            letterSpacing=".18em"
            html={`<span style="text-transform:uppercase;">Venue</span>`}
          />
          <Heading
            level="h3"
            text="The Aerie Rooftop"
            fontFamily={font.display}
            fontSize="17px"
            fontWeight={600}
            color={WHITE}
          />
          <Paragraph
            fontFamily={font.body}
            fontSize="12px"
            color={BODY_MUTE}
            lineHeight="1.55"
            html={`14th floor · 220 Rivington St<br/>New York, NY 10002`}
          />
        </Column>
      </Row>

      {/* ================= BAND 4 · TICKET STUB (light, perforated) =================
          The light card = one Row cells=[1,2], both Columns on #F4F4F8. narrow = QR;
          wide = the 4 key/value pairs. A 2x2 can't nest Rows inside a Column (block
          model bottoms out at Column), so each of the two detail rows is one
          Paragraph laying out its pair of label/value stacks via inline HTML. */}
      <Row cells={[1, 2]} backgroundColor={NEAR_BLACK} padding="26px 30px">
        <Column
          backgroundColor={WHITE}
          padding="18px"
          borderRadius="14px"
          border={{ borderRightWidth: '2px', borderRightColor: 'rgba(11,11,16,.22)', borderRightStyle: 'dashed' }}
        >
          <Image src="assets/qr-nightshift.png" alt="Scan at gate — ticket NS-7742" width={116} />
          <Paragraph
            fontFamily={font.mono}
            fontSize="8px"
            fontWeight={500}
            color={INK}
            letterSpacing=".16em"
            textAlign="center"
            html={`<span style="text-transform:uppercase;">Scan at gate</span>`}
          />
        </Column>
        <Column backgroundColor={WHITE} padding="20px 22px" borderRadius="14px">
          <Paragraph
            fontFamily={font.body}
            fontSize="14px"
            lineHeight="1.2"
            html={stubPair(
              { label: 'Ticket', value: 'General Admission', valueMono: false },
              { label: 'Admit', value: '1 · GA Standing', valueMono: false },
              INK, STUB_LABEL,
            )}
          />
          <Paragraph
            fontFamily={font.body}
            fontSize="14px"
            lineHeight="1.2"
            html={
              `<div style="height:16px;line-height:16px;">&nbsp;</div>` +
              stubPair(
                { label: 'Gate', value: 'East Elevator · 14F', valueMono: false },
                { label: 'Order', value: 'NS-7742', valueMono: true },
                INK, STUB_LABEL,
              )
            }
          />
        </Column>
      </Row>

      {/* ================= BAND 5 · BUTTONS ================= */}
      <Row cells={[1, 1]} backgroundColor={NEAR_BLACK} padding="0 30px 26px">
        <Column padding="0 6px 0 0">
          <Button
            href="#"
            backgroundColor={MAGENTA}
            color={NEAR_BLACK}
            fontFamily={font.mono}
            fontSize="12px"
            fontWeight={500}
            letterSpacing=".1em"
            padding="14px 16px"
            borderRadius="8px"
            width="100%"
            textAlign="center"
          >
            ADD TO CALENDAR
          </Button>
        </Column>
        <Column padding="0 0 0 6px">
          <Button
            href="#"
            backgroundColor="transparent"
            color={WHITE}
            fontFamily={font.mono}
            fontSize="12px"
            fontWeight={500}
            letterSpacing=".1em"
            padding="12.5px 16px"
            borderRadius="8px"
            width="100%"
            textAlign="center"
            border={{
              borderTopWidth: '1.5px', borderTopColor: 'rgba(244,244,248,.35)', borderTopStyle: 'solid',
              borderRightWidth: '1.5px', borderRightColor: 'rgba(244,244,248,.35)', borderRightStyle: 'solid',
              borderBottomWidth: '1.5px', borderBottomColor: 'rgba(244,244,248,.35)', borderBottomStyle: 'solid',
              borderLeftWidth: '1.5px', borderLeftColor: 'rgba(244,244,248,.35)', borderLeftStyle: 'solid',
            }}
          >
            VIEW / TRANSFER
          </Button>
        </Column>
      </Row>

      {/* ================= BAND 6 · KNOW BEFORE YOU GO ================= */}
      <Row
        layout={ColumnLayouts.OneColumn}
        backgroundColor={NEAR_BLACK}
        padding="24px 30px 8px"
        border={{ borderTopWidth: '1px', borderTopColor: HAIRLINE, borderTopStyle: 'solid' }}
      >
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            color="#7C7C8C"
            letterSpacing=".18em"
            html={`<span style="text-transform:uppercase;">Know before you go</span>`}
          />
        </Column>
      </Row>
      <Row cells={[1, 1]} backgroundColor={NEAR_BLACK} padding="0 30px 12px">
        <Column padding="0 10px 0 0">
          <Paragraph fontFamily={font.body} fontSize="13px" color={BODY_DIM} lineHeight="1.4" html={`21+ · valid photo ID required at the gate.`} />
        </Column>
        <Column padding="0 0 0 10px">
          <Paragraph fontFamily={font.body} fontSize="13px" color={BODY_DIM} lineHeight="1.4" html={`Rain or shine — the rooftop is covered.`} />
        </Column>
      </Row>
      <Row cells={[1, 1]} backgroundColor={NEAR_BLACK} padding="0 30px 24px">
        <Column padding="0 10px 0 0">
          <Paragraph fontFamily={font.body} fontSize="13px" color={BODY_DIM} lineHeight="1.4" html={`No re-entry once you're on the roof.`} />
        </Column>
        <Column padding="0 0 0 10px">
          <Paragraph fontFamily={font.body} fontSize="13px" color={BODY_DIM} lineHeight="1.4" html={`This QR is your ticket — screenshot it.`} />
        </Column>
      </Row>

      {/* ================= BAND 7 · FOOTER ================= */}
      <Row
        cells={[2, 1]}
        backgroundColor={NEAR_BLACK}
        padding="22px 30px 4px"
        border={{ borderTopWidth: '1px', borderTopColor: HAIRLINE, borderTopStyle: 'solid' }}
      >
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            color="#7C7C8C"
            letterSpacing=".04em"
            lineHeight="1.7"
            html={`NIGHTSHIFT · nightshift.live<br/>The Aerie Rooftop · New York, NY`}
          />
        </Column>
        <Column padding="0">
          {/* Artboard shows three circle marks (ig · tt · ↗). Social resolves only
              real brand icons from Unlayer's CDN, so the generic ↗ "visit site"
              becomes Spotify — on-brand for an electronic showcase and a valid icon. */}
          <Social
            icons={[
              { name: 'Instagram', url: 'https://instagram.com/nightshift.live' },
              { name: 'TikTok', url: 'https://tiktok.com/@nightshift.live' },
              { name: 'Spotify', url: 'https://open.spotify.com/user/nightshift.live' },
            ]}
            iconType="circle"
            iconSize={26}
            spacing={8}
          />
        </Column>
      </Row>
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={NEAR_BLACK} padding="12px 30px 22px">
        <Column padding="12px 0 0" border={{ borderTopWidth: '1px', borderTopColor: 'rgba(244,244,248,.1)', borderTopStyle: 'solid' }}>
          <Paragraph
            fontFamily={font.body}
            fontSize="11px"
            color={FINE}
            lineHeight="1.55"
            html={`You're receiving this because you bought a ticket. Can't make it? Transfer it from your order page.`}
          />
        </Column>
      </Row>

      {/* ---- sub-footer nav ---- */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={NEAR_BLACK} padding="16px 30px 24px">
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            color="#7C7C8C"
            letterSpacing=".08em"
            textAlign="center"
            html={`<a href="#" style="color:#7C7C8C;text-decoration:none;">View in browser</a> · <a href="#" style="color:#7C7C8C;text-decoration:none;">Manage tickets</a> · Nightshift, NYC`}
          />
        </Column>
      </Row>
    </Root>
  );
}

/* ============================================================================
 * DOCUMENT · PRINT PDF WALLET TICKET
 * ==========================================================================*/
function WalletTicket() {
  return (
    <Root
      mode="document"
      backgroundColor="#FFFFFF"
      contentWidth="688px"
      previewText="Nightshift · Wallet ticket · NS-7742"
      fontFamily={font.body}
    >
      {/* ---- print header ---- */}
      <Row cells={[1, 1]} backgroundColor="#FFFFFF" padding="0 0 20px">
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="11px"
            fontWeight={500}
            color="#111418"
            letterSpacing=".2em"
            html={`<span style="text-transform:uppercase;">Nightshift · Wallet ticket</span>`}
          />
        </Column>
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="11px"
            color="#8A9094"
            letterSpacing=".06em"
            textAlign="right"
            html={`NS-7742 · Page 1 of 1`}
          />
        </Column>
      </Row>

      {/* ================= THE TICKET CARD (dark) ================= */}
      {/* card header */}
      <Row cells={[1, 1]} backgroundColor={NEAR_BLACK} padding="30px 32px 24px">
        <Column padding="0">
          <Paragraph
            fontFamily={font.display}
            fontSize="16px"
            fontWeight={600}
            color={WHITE}
            letterSpacing=".02em"
            lineHeight="1"
            html={`<img src="assets/nightshift-mark-magenta.svg" alt="Nightshift" width="30" height="30" style="vertical-align:middle;margin-right:11px;"/><span style="vertical-align:middle;">NIGHTSHIFT</span>`}
          />
        </Column>
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            letterSpacing=".24em"
            textAlign="right"
            lineHeight="1"
            html={`<span style="display:inline-block;background:#FF2D78;color:#0B0B10;padding:6px 11px;border-radius:999px;text-transform:uppercase;">Admit one</span>`}
          />
        </Column>
      </Row>
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={NEAR_BLACK} padding="0 32px 24px">
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="11px"
            fontWeight={500}
            color={MAGENTA}
            letterSpacing=".3em"
            html={`<span style="text-transform:uppercase;">Rooftop Series · Vol. 07</span>`}
          />
          <Heading
            level="h1"
            text="Nightshift"
            fontFamily={font.display}
            fontSize="58px"
            fontWeight={500}
            color={WHITE}
            letterSpacing="-.025em"
            lineHeight="0.92"
          />
          <Paragraph
            fontFamily={font.body}
            fontSize="14px"
            color={BODY_MUTE}
            html={`Kessler · Aluna Vega · Midnight Republic — under the open sky.`}
          />
        </Column>
      </Row>

      {/* card date/venue 2-col */}
      <Row
        cells={[1, 1]}
        backgroundColor={NEAR_BLACK}
        border={{ borderTopWidth: '1px', borderTopColor: HAIRLINE_STRONG, borderTopStyle: 'solid' }}
      >
        <Column
          padding="20px 32px"
          border={{ borderRightWidth: '1px', borderRightColor: HAIRLINE_STRONG, borderRightStyle: 'solid' }}
        >
          <Paragraph fontFamily={font.mono} fontSize="10px" fontWeight={500} color={MAGENTA} letterSpacing=".18em" html={`<span style="text-transform:uppercase;">Date &amp; time</span>`} />
          <Heading level="h3" text="Sat, Aug 15 2026" fontFamily={font.display} fontSize="17px" fontWeight={600} color={WHITE} />
          <Paragraph fontFamily={font.mono} fontSize="12px" color={BODY_MUTE} html={`Doors 9:00 PM · till 3:00 AM`} />
        </Column>
        <Column padding="20px 32px">
          <Paragraph fontFamily={font.mono} fontSize="10px" fontWeight={500} color={MAGENTA} letterSpacing=".18em" html={`<span style="text-transform:uppercase;">Venue</span>`} />
          <Heading level="h3" text="The Aerie Rooftop · 14F" fontFamily={font.display} fontSize="17px" fontWeight={600} color={WHITE} />
          <Paragraph fontFamily={font.body} fontSize="12px" color={BODY_MUTE} html={`220 Rivington St · New York, NY`} />
        </Column>
      </Row>

      {/* perforation */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor={NEAR_BLACK} padding="0">
        <Column padding="0">
          <Divider borderTopWidth="2px" borderTopColor="rgba(244,244,248,.28)" borderTopStyle="dashed" width="100%" />
        </Column>
      </Row>

      {/* STUB · QR (on a light chip so it scans) | 2x2 details.
          Same block-model constraint as the email stub: no Rows inside a Column,
          so the four key/value pairs are two inline-HTML Paragraphs. */}
      <Row cells={[1, 2]} backgroundColor={NEAR_BLACK} padding="26px 32px 30px">
        <Column backgroundColor={WHITE} padding="12px" borderRadius="12px">
          <Image src="assets/qr-nightshift.png" alt="Scan at gate — NS-7742" width={132} />
        </Column>
        <Column padding="0 0 0 26px">
          <Paragraph
            fontFamily={font.body}
            fontSize="15px"
            lineHeight="1.2"
            html={stubPair(
              { label: 'Ticket', value: 'General Admission', valueMono: false },
              { label: 'Admit', value: '1 · GA Standing', valueMono: false },
              WHITE, '#7C7C8C',
            )}
          />
          <Paragraph
            fontFamily={font.body}
            fontSize="15px"
            lineHeight="1.2"
            html={
              `<div style="height:18px;line-height:18px;">&nbsp;</div>` +
              stubPair(
                { label: 'Gate', value: 'East Elevator · 14F', valueMono: false },
                { label: 'Order', value: 'NS-7742', valueMono: true },
                WHITE, '#7C7C8C',
              )
            }
          />
        </Column>
      </Row>

      {/* ================= print instructions ================= */}
      <Row layout={ColumnLayouts.OneColumn} backgroundColor="#FFFFFF" padding="26px 4px 0">
        <Column padding="0">
          <Paragraph
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            color="#8A9094"
            letterSpacing=".16em"
            html={`<span style="text-transform:uppercase;">At the gate</span>`}
          />
        </Column>
      </Row>
      <Row cells={[1, 1]} backgroundColor="#FFFFFF" padding="12px 4px 0">
        <Column padding="0 14px 0 0">
          <Paragraph fontFamily={font.body} fontSize="13px" color="#4A4F52" lineHeight="1.5" html={`Present this QR — printed or on your phone. One scan admits one.`} />
        </Column>
        <Column padding="0 0 0 14px">
          <Paragraph fontFamily={font.body} fontSize="13px" color="#4A4F52" lineHeight="1.5" html={`21+ with valid photo ID. No re-entry once on the roof.`} />
        </Column>
      </Row>

      {/* ---- print footer ---- */}
      <Row
        cells={[1, 1]}
        backgroundColor="#FFFFFF"
        padding="20px 4px 0"
        border={{ borderTopWidth: '1px', borderTopColor: 'rgba(17,20,24,.13)', borderTopStyle: 'solid' }}
      >
        <Column padding="0">
          <Paragraph fontFamily={font.mono} fontSize="10px" color="#8A9094" letterSpacing=".05em" html={`NIGHTSHIFT · nightshift.live`} />
        </Column>
        <Column padding="0">
          <Paragraph fontFamily={font.mono} fontSize="10px" color="#8A9094" letterSpacing=".05em" textAlign="right" html={`Cut along the dashed line for a wallet stub`} />
        </Column>
      </Row>
    </Root>
  );
}
