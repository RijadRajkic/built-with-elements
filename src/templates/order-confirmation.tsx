import React from 'react';
import {
  Row, Column, ColumnLayouts, Heading, Paragraph, Button, Image, Divider, Table, Social,
  type TableProps,
} from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

/** The Table `values` escape hatch is a full-schema type, but the runtime merges
 *  whatever partial you pass over the built-in defaults — so a small override is
 *  legitimately partial. Cast through this to keep strict tsc honest. */
type TableValuesInput = TableProps['values'];

/**
 * Order Confirmation + Packing Slip — Trailhead Goods (Template 04, Retail).
 * One tree, three renders. Deltas taken straight from the two artboards:
 *  - email / web  → EMAIL artboard: thumbnail-rich items, prices, Track/View buttons, browser link + social footer.
 *  - document     → PRINT PDF packing-slip artboard: NO prices, an "Items packed" checklist
 *                   (check-box + qty), a note card, a QR track/returns block, printed footer text.
 *
 * Palette (verbatim from spec sheet):
 *   Oat ground   #EFE9DB   Warm white card/paper #FBF8F1
 *   Forest green #2F5D50   Rust accent #C7622B (action & status only)   Bark ink #33352C
 *   Hairline     rgba(47,93,80,.14)   Muted mono #7C7A6B / #8A8574
 *   Cream text on green #F1EBDD
 * Type: Space Grotesk (display) / Inter (body) / JetBrains Mono (figures & labels).
 */

// ── shared tokens ───────────────────────────────────────────────────────────
const GREEN = '#2F5D50';
const RUST = '#C7622B';
const INK = '#33352C';
const BODY = '#4A4C40';
const MUTED = '#7C7A6B';
const CREAM = '#F1EBDD';
const CREAM_55 = 'rgba(241,235,221,.55)';
const CREAM_62 = 'rgba(241,235,221,.62)';
const CREAM_74 = 'rgba(241,235,221,.74)';
const WARM_WHITE = '#FBF8F1';
const OAT = '#EFE9DB';
const THUMB_BG = '#EEEBE0';
const HAIR = 'rgba(47,93,80,.14)';

const hairBottom = { borderBottomWidth: '1px', borderBottomColor: HAIR, borderBottomStyle: 'solid' } as const;
const hairTop = { borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid' } as const;
const hairRight = { borderRightWidth: '1px', borderRightColor: HAIR, borderRightStyle: 'solid' } as const;

// Product thumbnails: the artboard shows dashed photo placeholders ("Photo goes
// here"); with no product-photo asset exported, the brand mark is the sanctioned
// stand-in (green mark for the light card, cream mark for the green header world).
const THUMB = 'assets/trailhead-mark-green.svg';

type Item = { name: string; variant: string; qty: string; price: string };
const ITEMS: Item[] = [
  { name: 'Cascade 3L Rain Shell', variant: 'Spruce · Men’s M · SKU CAS-3L-SPM', qty: '1', price: '$189.00' },
  { name: 'Ridgeline Merino Crew', variant: 'Oatmeal · Women’s S · SKU RDG-MC-OS', qty: '1', price: '$78.00' },
  { name: 'Switchback Trail Crew Sock', variant: 'Moss · L · $18.00 ea · SKU SWB-SK-ML', qty: '2', price: '$36.00' },
];
// Packing-slip variants drop the per-unit price aside on the sock line.
const PACKED_VARIANT = ['Spruce · Men’s M · SKU CAS-3L-SPM', 'Oatmeal · Women’s S · SKU RDG-MC-OS', 'Moss · L · SKU SWB-SK-ML'];

// ── mark + wordmark lockup, emitted as sibling Columns ───────────────────────
// The block model forbids Row-in-Column, so the lockup can't be one nested Row
// reused inside a header Column. Instead these two functions emit the mark
// Column and the wordmark Column, dropped straight into a header Row's cells.
// Called as plain functions (never <X/>) — the static walker only groks literal
// Unlayer elements, so a custom component in the tree would render to nothing.
const markColumn = () => (
  <Column padding="0px">
    <Image src="assets/trailhead-mark-cream.svg" alt="Trailhead Goods mark" width="34" />
  </Column>
);
const wordmarkColumn = () => (
  <Column padding="0px">
    <Heading level="h2" text="TRAILHEAD" fontFamily={font.display} fontSize="18px" fontWeight={600} letterSpacing=".03em" color={CREAM} lineHeight="1" />
    <Paragraph html="GOODS · OUTFITTERS" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".32em" color={CREAM_62} lineHeight="1" />
  </Column>
);

export default function OrderConfirmation({ mode }: { mode: Mode }) {
  const isDoc = mode === 'document';

  return (
    <Root
      mode={mode}
      backgroundColor={OAT}
      contentWidth={isDoc ? '640px' : '600px'}
      previewText="Your Trailhead order is confirmed — TH-100482"
      fontFamily={font.body}
    >
      {/* Each band function returns a fragment of <Row>s. renderToHtml flattens
          fragments, but the static renderToJson walker does not — a bare fragment
          trips its "only <Row> is allowed" check. Unwrap the fragment to a keyed,
          deep-flattened <Row>[] (toArray over the fragment's children) so all
          three renders — email, web, and the JSON round-trip — stay clean. */}
      {React.Children.toArray((isDoc ? packingSlip() : emailConfirmation()).props.children)}
    </Root>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// EMAIL / WEB — order confirmation
// ════════════════════════════════════════════════════════════════════════════
function emailConfirmation() {
  return (
    <>
      {/* BAND 1 · HEADER (green) — flat sibling Rows sharing the green ground */}
      <Row cells={[1, 6, 5]} backgroundColor={GREEN} padding="22px 28px 0px">
        {markColumn()}
        {wordmarkColumn()}
        <Column padding="0px">
          <Paragraph
            html={`<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${RUST};margin-right:8px;vertical-align:middle;"></span>Order confirmed`}
            fontFamily={font.mono}
            fontSize="11px"
            fontWeight={500}
            letterSpacing=".16em"
            color={CREAM}
            textAlign="right"
          />
        </Column>
      </Row>
      <Row backgroundColor={GREEN} padding="18px 28px 14px">
        <Column padding="0px">
          <Divider borderTopWidth="1px" borderTopColor="rgba(241,235,221,.2)" borderTopStyle="solid" width="100%" />
        </Column>
      </Row>
      <Row cells={[1, 1]} backgroundColor={GREEN} padding="0px 28px 22px">
        <Column padding="0px">
          <Paragraph html="Order No." fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={CREAM_55} />
          <Paragraph html="TH-100482" fontFamily={font.mono} fontSize="14px" fontWeight={500} color={CREAM} />
        </Column>
        <Column padding="0px">
          <Paragraph html="Placed" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={CREAM_55} />
          <Paragraph html="Jul 24 2026" fontFamily={font.mono} fontSize="14px" fontWeight={500} color={CREAM} />
        </Column>
      </Row>

      {/* BAND 2 · GREETING HERO (2col) */}
      <Row cells={[5, 4]} backgroundColor={WARM_WHITE} padding="28px">
        <Column padding="0px 24px 0px 0px">
          <Paragraph html="Thanks for shopping" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".18em" color={RUST} />
          <Heading level="h1" text="Your order’s on the way." fontFamily={font.display} fontSize="38px" fontWeight={500} letterSpacing="-.015em" lineHeight="1.04" color={GREEN} />
          <Paragraph
            html="Thanks, Alex — we’ve got it and it’s being packed. Tracking lands in your inbox the moment it ships."
            fontFamily={font.body}
            fontSize="14px"
            lineHeight="1.55"
            color={BODY}
          />
          <Paragraph
            html={`<span style="display:inline-block;border:1px solid rgba(47,93,80,.28);border-radius:999px;padding:7px 13px;"><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${RUST};margin-right:8px;vertical-align:middle;"></span><span style="font-family:${font.mono.value};font-size:11px;letter-spacing:.06em;color:${INK};">Est. delivery · Jul 29–31</span></span>`}
          />
        </Column>
        <Column padding="0px" backgroundColor={THUMB_BG} borderRadius="12px">
          <Paragraph html="&nbsp;" fontSize="4px" />
          <Image src={THUMB} alt="On-trail lifestyle" width="60" />
          <Paragraph html="Photo goes here" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".14em" color="#8B927F" textAlign="center" />
          <Paragraph html="Lifestyle · on-trail" fontFamily={font.body} fontSize="11px" color="#A1A08F" textAlign="center" />
          <Paragraph html="&nbsp;" fontSize="4px" />
        </Column>
      </Row>

      {/* BAND 3 · ITEMS (thumbnail rows) — column head */}
      <Row cells={[3, 1]} backgroundColor={WARM_WHITE} padding="24px 28px 0px">
        <Column padding="0px 0px 12px" border={{ borderBottomWidth: '1.5px', borderBottomColor: GREEN, borderBottomStyle: 'solid' }}>
          <Paragraph html="Item" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".16em" color={GREEN} />
        </Column>
        <Column padding="0px 0px 12px" border={{ borderBottomWidth: '1.5px', borderBottomColor: GREEN, borderBottomStyle: 'solid' }}>
          <Paragraph html="Qty&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Price" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".16em" color={GREEN} textAlign="right" />
        </Column>
      </Row>
      {ITEMS.map((it, i) => (
        <Row key={it.name} cells={[1, 5, 2]} backgroundColor={WARM_WHITE} padding="14px 28px">
          <Column padding="0px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Image src={THUMB} alt={it.name} width="56" />
          </Column>
          <Column padding="0px 12px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Heading level="h4" text={it.name} fontFamily={font.display} fontSize="15px" fontWeight={600} color={INK} />
            <Paragraph html={it.variant} fontFamily={font.mono} fontSize="11px" color={MUTED} />
          </Column>
          <Column padding="0px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Paragraph
              html={`<span style="font-family:${font.mono.value};font-size:13px;color:${INK};">${it.qty}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;${it.price}</span>`}
              textAlign="right"
            />
          </Column>
        </Row>
      ))}

      {/* BAND 4 · TOTALS — breakdown Table right-aligned, then the total line */}
      <Row cells={[2, 3]} backgroundColor={WARM_WHITE} padding="6px 28px 0px">
        <Column padding="0px" />
        <Column padding="0px">
          <Table
            enableHeader={false}
            values={{
              enableHeader: false,
              stripedRows: false,
              contentBackgroundColor: WARM_WHITE,
              // One content font per Table; the artboard's figures are mono and are
              // the dominant read, so mono wins — labels go mono too (minor delta).
              contentFontFamily: font.mono,
              contentFontSize: '13px',
              contentColor: BODY,
              contentPadding: '8px 2px',
              contentLetterSpacing: '0px',
              border: {
                borderBottomWidth: '1px', borderBottomColor: HAIR, borderBottomStyle: 'solid',
              },
              table: {
                headers: [],
                footers: [],
                rows: [
                  { height: 0, cells: [
                    { width: 60, text: 'Subtotal', textAlign: 'left', padding: '8px 2px' },
                    { width: 40, text: '$303.00', textAlign: 'right', padding: '8px 2px', color: INK },
                  ] },
                  { height: 0, cells: [
                    { width: 60, text: 'Shipping · over $150', textAlign: 'left', padding: '8px 2px' },
                    { width: 40, text: 'FREE', textAlign: 'right', padding: '8px 2px', color: GREEN },
                  ] },
                  { height: 0, cells: [
                    { width: 60, text: 'Estimated tax · CO', textAlign: 'left', padding: '8px 2px' },
                    { width: 40, text: '$26.69', textAlign: 'right', padding: '8px 2px', color: INK },
                  ] },
                ],
              },
            } as unknown as TableValuesInput}
          />
        </Column>
      </Row>
      <Row cells={[2, 3, 2]} backgroundColor={WARM_WHITE} padding="0px 28px 24px">
        <Column padding="0px" />
        <Column padding="14px 0px 0px">
          <Heading level="h4" text="Total" fontFamily={font.display} fontSize="16px" fontWeight={600} color={GREEN} />
        </Column>
        <Column padding="14px 0px 0px">
          <Paragraph html="$329.69" fontFamily={font.mono} fontSize="22px" fontWeight={500} color={GREEN} textAlign="right" />
        </Column>
      </Row>

      {/* BAND 5 · ADDRESSES (2col) */}
      <Row cells={[1, 1]} backgroundColor={WARM_WHITE} padding="0px" border={hairTop}>
        <Column padding="22px 28px" border={hairRight}>
          <Paragraph html="Ship to" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".18em" color={MUTED} />
          <Heading level="h4" text="Alex Rivera" fontFamily={font.display} fontSize="15px" fontWeight={600} color={INK} />
          <Paragraph html="1450 Pearl St, Apt 3<br/>Denver, CO 80203" fontFamily={font.body} fontSize="13px" lineHeight="1.5" color={BODY} />
          <Paragraph html="Standard · 3–5 business days" fontFamily={font.mono} fontSize="11px" color={MUTED} />
        </Column>
        <Column padding="22px 28px">
          <Paragraph html="Billing" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".18em" color={MUTED} />
          <Heading level="h4" text="Same as shipping" fontFamily={font.display} fontSize="15px" fontWeight={600} color={INK} />
          <Paragraph html={`Visa ending <span style="font-family:${font.mono.value};">4242</span><br/>Charged Jul 24 2026`} fontFamily={font.body} fontSize="13px" lineHeight="1.5" color={BODY} />
        </Column>
      </Row>

      {/* BAND 6 · BUTTONS */}
      <Row cells={[1, 1]} backgroundColor={WARM_WHITE} padding="24px 28px" border={hairTop}>
        <Column padding="0px 6px 0px 0px">
          <Button href="#" backgroundColor={RUST} color={WARM_WHITE} fontFamily={font.mono} fontSize="12px" fontWeight={500} letterSpacing=".1em" padding="14px 16px" borderRadius="8px" width="100%" textAlign="center">
            TRACK ORDER
          </Button>
        </Column>
        <Column padding="0px 0px 0px 6px">
          <Button
            href="#"
            backgroundColor="transparent"
            color={GREEN}
            fontFamily={font.mono}
            fontSize="12px"
            fontWeight={500}
            letterSpacing=".1em"
            padding="12.5px 16px"
            borderRadius="8px"
            width="100%"
            textAlign="center"
            border={{ borderTopWidth: '1.5px', borderRightWidth: '1.5px', borderBottomWidth: '1.5px', borderLeftWidth: '1.5px', borderTopColor: GREEN, borderRightColor: GREEN, borderBottomColor: GREEN, borderLeftColor: GREEN, borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid' }}
          >
            VIEW ORDER
          </Button>
        </Column>
      </Row>

      {/* BAND 7 · FOOTER (green) */}
      <Row cells={[3, 2]} backgroundColor={GREEN} padding="22px 28px">
        <Column padding="0px">
          <Heading level="h4" text="Free 60-day returns" fontFamily={font.display} fontSize="13px" fontWeight={600} color={CREAM} />
          <Paragraph html="On unworn gear, no questions asked. Your pack comes with a prepaid label." fontFamily={font.body} fontSize="12px" lineHeight="1.55" color={CREAM_74} />
        </Column>
        <Column padding="0px">
          <Social
            icons={[
              { name: 'Instagram', url: 'https://instagram.com/trailheadgoods' },
              { name: 'LinkedIn', url: 'https://linkedin.com/company/trailheadgoods' },
            ]}
            iconType="circle"
            iconSize="26px"
            spacing={8}
            align="right"
          />
        </Column>
      </Row>
      <Row backgroundColor={GREEN} padding="0px 28px 22px">
        <Column padding="0px">
          <Divider borderTopWidth="1px" borderTopColor="rgba(241,235,221,.16)" borderTopStyle="solid" width="100%" />
          <Paragraph html="TRAILHEAD GOODS · 78 Wy’east Ave · Bend, OR 97701" fontFamily={font.mono} fontSize="10px" letterSpacing=".04em" color={CREAM_55} />
        </Column>
      </Row>

      {/* email sub-footer */}
      <Row backgroundColor={OAT} padding="16px 6px 4px">
        <Column padding="0px">
          <Paragraph
            html={'<a href="#" style="color:#8A8574;">View in browser</a> · <a href="#" style="color:#8A8574;">Unsubscribe</a> · Trailhead Goods, Bend OR'}
            fontFamily={font.mono}
            fontSize="10px"
            letterSpacing=".08em"
            color="#8A8574"
            textAlign="center"
          />
        </Column>
      </Row>
    </>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// DOCUMENT — print PDF packing slip (no prices, checklist, QR)
// ════════════════════════════════════════════════════════════════════════════
function packingSlip() {
  return (
    <>
      {/* HEADER (green, rounded) — mark | wordmark | slip title */}
      <Row cells={[1, 4, 5]} backgroundColor={GREEN} padding="22px 26px" borderRadius="14px">
        {markColumn()}
        {wordmarkColumn()}
        <Column padding="0px">
          <Heading level="h3" text="PACKING SLIP" fontFamily={font.display} fontSize="17px" fontWeight={500} letterSpacing=".04em" color={CREAM} textAlign="right" />
          <Paragraph html="TH-100482 · Jul 24 2026 · Page 1/1" fontFamily={font.mono} fontSize="10px" letterSpacing=".1em" color="rgba(241,235,221,.6)" textAlign="right" />
        </Column>
      </Row>

      {/* SHIP TO / FROM */}
      <Row cells={[1, 1]} backgroundColor={WARM_WHITE} padding="26px 4px 22px" border={hairBottom}>
        <Column padding="0px 14px 0px 0px">
          <Paragraph html="Ship to" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".18em" color={MUTED} />
          <Heading level="h3" text="Alex Rivera" fontFamily={font.display} fontSize="18px" fontWeight={600} color={INK} />
          <Paragraph html="1450 Pearl St, Apt 3 · Denver, CO 80203" fontFamily={font.body} fontSize="13px" lineHeight="1.5" color={BODY} />
        </Column>
        <Column padding="0px 0px 0px 14px">
          <Paragraph html="From" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".18em" color={MUTED} />
          <Heading level="h3" text="Trailhead Goods" fontFamily={font.display} fontSize="18px" fontWeight={600} color={GREEN} />
          <Paragraph html="78 Wy’east Ave · Bend, OR 97701" fontFamily={font.body} fontSize="13px" lineHeight="1.5" color={BODY} />
        </Column>
      </Row>

      {/* ITEMS PACKED CHECKLIST (no prices) */}
      <Row cells={[1, 1]} backgroundColor={WARM_WHITE} padding="22px 4px 0px">
        <Column padding="0px">
          <Paragraph html="Items packed" fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".16em" color={GREEN} />
        </Column>
        <Column padding="0px">
          <Paragraph html="3 items · 4 units" fontFamily={font.mono} fontSize="11px" color={MUTED} textAlign="right" />
        </Column>
      </Row>
      <Row backgroundColor={WARM_WHITE} padding="0px 4px">
        <Column padding="0px">
          <Divider borderTopWidth="1.5px" borderTopColor={GREEN} borderTopStyle="solid" width="100%" />
        </Column>
      </Row>
      {ITEMS.map((it, i) => (
        <Row key={it.name} cells={[1, 2, 8, 3]} backgroundColor={WARM_WHITE} padding="15px 4px">
          <Column padding="0px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Paragraph
              html={`<span style="display:inline-block;width:18px;height:18px;border-radius:5px;border:1.5px solid ${GREEN};"></span>`}
            />
          </Column>
          <Column padding="0px 8px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Image src={THUMB} alt={it.name} width="46" />
          </Column>
          <Column padding="0px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Heading level="h4" text={it.name} fontFamily={font.display} fontSize="15px" fontWeight={600} color={INK} />
            <Paragraph html={PACKED_VARIANT[i]} fontFamily={font.mono} fontSize="11px" color={MUTED} />
          </Column>
          <Column padding="0px" border={i < ITEMS.length - 1 ? hairBottom : undefined}>
            <Paragraph html={`Qty ${it.qty}`} fontFamily={font.mono} fontSize="13px" color={INK} textAlign="right" />
          </Column>
        </Row>
      ))}

      {/* NOTE card */}
      <Row backgroundColor={WARM_WHITE} padding="20px 0px 0px">
        <Column backgroundColor="#F4F1E8" borderRadius="12px" padding="18px 22px">
          <Heading level="h4" text="Thanks, Alex." fontFamily={font.display} fontSize="15px" fontWeight={600} color={GREEN} />
          <Paragraph html="Everything you ordered is in this box. Gear up and get out there — the trail’s been waiting." fontFamily={font.body} fontSize="13px" lineHeight="1.55" color={BODY} />
        </Column>
      </Row>

      {/* QR BLOCK (narrow | wide) */}
      <Row cells={[1, 3]} backgroundColor={WARM_WHITE} padding="24px 4px 22px" border={{ ...hairTop, ...hairBottom }}>
        <Column padding="0px" backgroundColor={WARM_WHITE} borderRadius="12px" border={{ borderTopWidth: '1px', borderRightWidth: '1px', borderBottomWidth: '1px', borderLeftWidth: '1px', borderTopColor: 'rgba(47,93,80,.18)', borderRightColor: 'rgba(47,93,80,.18)', borderBottomColor: 'rgba(47,93,80,.18)', borderLeftColor: 'rgba(47,93,80,.18)', borderTopStyle: 'solid', borderRightStyle: 'solid', borderBottomStyle: 'solid', borderLeftStyle: 'solid' }}>
          <Image src="assets/qr-track.png" alt="Scan to track order TH-100482" width="118" />
        </Column>
        <Column padding="0px 0px 0px 22px">
          <Paragraph html="Track &amp; returns" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".18em" color={RUST} />
          <Heading level="h3" text="Scan to follow every mile." fontFamily={font.display} fontSize="20px" fontWeight={600} color={INK} />
          <Paragraph
            html={`Live tracking from our door to yours. Changed your mind? <span style="color:${RUST};font-weight:500;">Start a free return</span> from the same page — your prepaid label is ready.`}
            fontFamily={font.body}
            fontSize="13px"
            lineHeight="1.5"
            color={BODY}
          />
          <Paragraph html="trailheadgoods.com/track/TH-100482" fontFamily={font.mono} fontSize="10px" color={MUTED} />
        </Column>
      </Row>

      {/* FOOTER (printed text) */}
      <Row cells={[3, 1]} backgroundColor={WARM_WHITE} padding="20px 0px 0px">
        <Column padding="0px">
          <Heading level="h4" text="Free 60-day returns on unworn gear" fontFamily={font.display} fontSize="13px" fontWeight={600} color={GREEN} />
          <Paragraph html="Questions? hello@trailheadgoods.com · (541) 555-0173" fontFamily={font.body} fontSize="12px" color={MUTED} />
        </Column>
        <Column padding="0px">
          <Paragraph html="TRAILHEAD GOODS<br/>Bend, OR" fontFamily={font.mono} fontSize="10px" letterSpacing=".06em" color={MUTED} textAlign="right" />
        </Column>
      </Row>
    </>
  );
}
