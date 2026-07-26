import React from 'react';
import {
  Row, Column, Heading, Paragraph, Button, Image, Table, Social,
  type TableValues,
} from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

/**
 * Template 03 — Payments · "Swiss ledger."
 * Loomly Studio Invoice & Receipt. Crisp International style — cool white ground,
 * near-black ink #111418, one restrained ink-blue accent #1E3A5F, hairline rules,
 * tabular figures, the paid amount as hero.
 *
 *   email / web → EMAIL · RECEIPT artboard (Download PDF invoice button, view-in-browser)
 *   document    → PRINT PDF · INVOICE artboard (paid-status band + printed notes/terms,
 *                 no tracking, no view-in-browser)
 */

// ── palette (verbatim from the spec sheet) ────────────────────────────────
const INK = '#111418';        // text · rules · total
const BLUE = '#1E3A5F';       // the one accent — paid-status only
const SLATE = '#6B7378';      // secondary text
const GROUND = '#EEF1F2';     // cool white — email ground
const WHITE = '#FFFFFF';      // card · invoice paper
const BODY_MUTE = '#4A4F52';  // body copy on the card
const FAINT = '#8A9094';      // muted labels / meta
const HAIR = 'rgba(17,20,24,.13)';   // hairline rule
const HAIR_SOFT = 'rgba(17,20,24,.12)'; // line-item rule
const HAIR_TEN = 'rgba(17,20,24,.1)';   // footer inner rule
const BLUE_BOX = 'rgba(30,58,95,.35)';  // paid-status box outline (print)

// hairline border objects (per-side, factored out where reused)
const bottomHair = {
  borderBottomWidth: '1px', borderBottomColor: HAIR, borderBottomStyle: 'solid',
};
const rightHair = {
  borderRightWidth: '1px', borderRightColor: HAIR, borderRightStyle: 'solid',
};

export default function InvoiceReceipt({ mode }: { mode: Mode }) {
  const isDoc = mode === 'document';

  return (
    <Root
      mode={mode}
      backgroundColor={GROUND}
      contentWidth="600px"
      previewText="Receipt — Studio plan · $128.00 paid"
      fontFamily={font.body}
    >
      {/* ═══════════ BAND 1 · HEADER ═══════════ */}
      {isDoc ? (
        // PRINT: wordmark + address | "Invoice" + No./Issued/Period + PAID stamp,
        // closed by a 1.5px ink rule.
        <Row
          cells={[1, 7, 6]}
          backgroundColor={WHITE}
          padding="0 0 24px"
          border={{ borderBottomWidth: '2px', borderBottomColor: INK, borderBottomStyle: 'solid' }}
        >
          <Column padding="0">
            <Image src="assets/loomly-mark-ink.svg" alt="Loomly Studio" width={30} />
          </Column>
          <Column padding="4px 0 0 0">
            <Heading
              level="h1"
              text="Loomly Studio"
              fontFamily={font.display}
              fontSize="19px"
              fontWeight={600}
              letterSpacing="-.01em"
              color={INK}
            />
            <Paragraph
              html="55 Washington St, Suite 210<br/>Brooklyn, NY 11201 · loomly.studio"
              fontFamily={font.body}
              fontSize="13px"
              lineHeight="1.5"
              color={SLATE}
            />
          </Column>
          <Column padding="0">
            <Heading
              level="h2"
              text="Invoice"
              fontFamily={font.display}
              fontSize="30px"
              fontWeight={500}
              letterSpacing=".01em"
              lineHeight="1"
              color={INK}
              textAlign="right"
            />
            <Paragraph
              html={
                '<span style="color:#8A9094;">No.</span>&nbsp;&nbsp;&nbsp;<span style="color:#111418;">LM-2026-0417</span><br/>' +
                '<span style="color:#8A9094;">Issued</span>&nbsp;&nbsp;&nbsp;<span style="color:#111418;">Jul 24 2026</span><br/>' +
                '<span style="color:#8A9094;">Period</span>&nbsp;&nbsp;&nbsp;<span style="color:#111418;">Aug 1–31 2026</span>'
              }
              fontFamily={font.mono}
              fontSize="11px"
              lineHeight="1.9"
              textAlign="right"
            />
            <Image src="assets/paid-stamp.svg" alt="Paid" width={112} textAlign="right" />
          </Column>
        </Row>
      ) : (
        // EMAIL: wordmark + "Receipt" label + line | Invoice No./Issued + PAID stamp.
        <Row cells={[1, 7, 6]} backgroundColor={WHITE} padding="26px 32px" border={bottomHair}>
          <Column padding="0">
            <Image src="assets/loomly-mark-ink.svg" alt="Loomly Studio" width={28} />
          </Column>
          <Column padding="3px 0 0 0">
            <Heading
              level="h1"
              text="Loomly Studio"
              fontFamily={font.display}
              fontSize="18px"
              fontWeight={600}
              letterSpacing="-.01em"
              color={INK}
            />
            <Paragraph
              html="<span style='text-transform:uppercase'>Receipt</span>"
              fontFamily={font.mono}
              fontSize="11px"
              fontWeight={500}
              letterSpacing=".2em"
              color={BLUE}
            />
            <Paragraph
              text="Thanks — your payment went through."
              fontFamily={font.body}
              fontSize="12px"
              color={SLATE}
            />
          </Column>
          <Column padding="0">
            <Paragraph
              html={
                '<span style="color:#8A9094;text-transform:uppercase;letter-spacing:.18em;font-size:9px;font-weight:500;">Invoice No.</span><br/>' +
                '<span style="color:#111418;font-size:13px;">LM-2026-0417</span><br/>' +
                '<span style="color:#8A9094;text-transform:uppercase;letter-spacing:.18em;font-size:9px;font-weight:500;">Issued</span><br/>' +
                '<span style="color:#111418;font-size:13px;">Jul 24 2026</span>'
              }
              fontFamily={font.mono}
              lineHeight="1.7"
              textAlign="right"
            />
            <Image src="assets/paid-stamp.svg" alt="Paid" width={102} textAlign="right" />
          </Column>
        </Row>
      )}

      {/* ═══════════ BAND 2 · AMOUNT HERO (email/web only) ═══════════ */}
      {!isDoc && (
        <Row backgroundColor={WHITE} padding="44px 32px" border={bottomHair}>
          <Column padding="0">
            <Image src="assets/check.svg" alt="" width={40} textAlign="center" />
            <Paragraph
              html="<span style='text-transform:uppercase'>Paid in full</span>"
              fontFamily={font.mono}
              fontSize="11px"
              fontWeight={500}
              letterSpacing=".22em"
              color={BLUE}
              textAlign="center"
            />
            <Heading
              level="h2"
              text="$128.00"
              fontFamily={font.mono}
              fontSize="54px"
              fontWeight={500}
              letterSpacing="-.02em"
              color={INK}
              textAlign="center"
            />
            <Paragraph
              text="Studio plan · August 2026"
              fontFamily={font.body}
              fontSize="14px"
              color={BODY_MUTE}
              textAlign="center"
            />
            <Paragraph
              text="Paid Jul 24, 2026 · Visa •••• 4242"
              fontFamily={font.mono}
              fontSize="11px"
              color={FAINT}
              textAlign="center"
            />
          </Column>
        </Row>
      )}

      {/* ═══════════ BAND 3 · PARTIES (2col) ═══════════ */}
      <Row cells={[1, 1]} backgroundColor={WHITE} border={isDoc ? undefined : bottomHair} padding={isDoc ? '26px 0' : '0'}>
        <Column padding={isDoc ? '0 28px 0 0' : '24px 32px'} border={isDoc ? undefined : rightHair}>
          <Paragraph
            html="<span style='color:#1E3A5F'>01</span>&nbsp;&nbsp;<span style='text-transform:uppercase'>Billed to</span>"
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            letterSpacing=".14em"
            color={FAINT}
          />
          <Heading
            level="h3"
            text="Meridian Labs, Inc."
            fontFamily={font.display}
            fontSize={isDoc ? '16px' : '15px'}
            fontWeight={600}
            color={INK}
          />
          <Paragraph
            html={isDoc ? '88 Kearny St, Suite 400 · San Francisco, CA 94108' : '88 Kearny St, Suite 400<br/>San Francisco, CA 94108'}
            fontFamily={font.body}
            fontSize="13px"
            lineHeight="1.5"
            color={BODY_MUTE}
          />
          <Paragraph
            text="Tax ID · 47-6021894"
            fontFamily={font.mono}
            fontSize="11px"
            color={FAINT}
          />
        </Column>
        <Column padding={isDoc ? '0 0 0 28px' : '24px 32px'}>
          <Paragraph
            html="<span style='color:#1E3A5F'>02</span>&nbsp;&nbsp;<span style='text-transform:uppercase'>From</span>"
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            letterSpacing=".14em"
            color={FAINT}
          />
          <Heading
            level="h3"
            text="Loomly Studio, Inc."
            fontFamily={font.display}
            fontSize={isDoc ? '16px' : '15px'}
            fontWeight={600}
            color={INK}
          />
          <Paragraph
            html={isDoc ? '55 Washington St, Suite 210 · Brooklyn, NY 11201' : '55 Washington St, Suite 210<br/>Brooklyn, NY 11201'}
            fontFamily={font.body}
            fontSize="13px"
            lineHeight="1.5"
            color={BODY_MUTE}
          />
          <Paragraph
            text="Tax ID · 88-2140736"
            fontFamily={font.mono}
            fontSize="11px"
            color={FAINT}
          />
        </Column>
      </Row>

      {/* ═══════════ BAND 4 · LINE ITEMS ═══════════ */}
      <Row backgroundColor={WHITE} padding="24px 32px 8px">
        <Column padding="0">
          <Paragraph
            html="<span style='color:#1E3A5F'>03</span>&nbsp;&nbsp;<span style='text-transform:uppercase'>Items</span>"
            fontFamily={font.mono}
            fontSize="10px"
            fontWeight={500}
            letterSpacing=".14em"
            color={FAINT}
          />
          <Table
            border={{
              borderTopWidth: '0px', borderTopStyle: 'solid', borderTopColor: 'transparent',
              borderLeftWidth: '0px', borderLeftStyle: 'solid', borderLeftColor: 'transparent',
              borderRightWidth: '0px', borderRightStyle: 'solid', borderRightColor: 'transparent',
              borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: HAIR_SOFT,
            }}
            values={{
              table: {
                headers: [
                  {
                    height: 0,
                    cells: [
                      { width: 296, text: 'Description', textAlign: 'left' },
                      { width: 60, text: 'Qty', textAlign: 'right' },
                      { width: 90, text: 'Unit', textAlign: 'right' },
                      { width: 90, text: 'Amount', textAlign: 'right' },
                    ],
                  },
                ],
                rows: [
                  {
                    height: 0,
                    cells: [
                      { width: 296, text: 'Studio plan — monthly, Aug 2026', textAlign: 'left', color: INK },
                      { width: 60, text: '1', textAlign: 'right', color: INK },
                      { width: 90, text: '$96.00', textAlign: 'right', color: BODY_MUTE },
                      { width: 90, text: '$96.00', textAlign: 'right', color: INK },
                    ],
                  },
                  {
                    height: 0,
                    cells: [
                      { width: 296, text: 'Additional editor seat', textAlign: 'left', color: INK },
                      { width: 60, text: '2', textAlign: 'right', color: INK },
                      { width: 90, text: '$12.00', textAlign: 'right', color: BODY_MUTE },
                      { width: 90, text: '$24.00', textAlign: 'right', color: INK },
                    ],
                  },
                ],
                footers: [],
              },
              enableHeader: true,
              enableFooter: false,
              headerFontFamily: font.mono,
              headerBackgroundColor: WHITE,
              headerColor: INK,
              headerFontSize: '9px',
              headerFontWeight: 500,
              headerPadding: '14px 0px 10px',
              headerVerticalAlign: 'bottom',
              contentFontFamily: font.mono,
              contentBackgroundColor: WHITE,
              contentColor: INK,
              contentFontSize: '13px',
              contentFontWeight: 400,
              contentPadding: '13px 0px',
              contentVerticalAlign: 'top',
              cellPadding: { property: 'padding' },
            } as Partial<TableValues> as TableValues}
          />
        </Column>
      </Row>

      {/* subtotal / tax / total — right-aligned ledger, flattened to top-level rows */}
      <Row cells={[3, 1, 1]} backgroundColor={WHITE} padding="14px 32px 7px">
        <Column padding="0"><Paragraph text="" /></Column>
        <Column padding="0">
          <Paragraph text="Subtotal" fontFamily={font.body} fontSize="13px" color={BODY_MUTE} />
        </Column>
        <Column padding="0">
          <Paragraph text="$120.00" fontFamily={font.mono} fontSize="13px" color={INK} textAlign="right" />
        </Column>
      </Row>
      <Row cells={[3, 1, 1]} backgroundColor={WHITE} padding="0 32px 7px">
        <Column padding="0"><Paragraph text="" /></Column>
        <Column padding="0" border={bottomHair}>
          <Paragraph text="Tax" fontFamily={font.body} fontSize="13px" color={BODY_MUTE} />
        </Column>
        <Column padding="0" border={bottomHair}>
          <Paragraph text="$8.00" fontFamily={font.mono} fontSize="13px" color={INK} textAlign="right" />
        </Column>
      </Row>
      <Row cells={[3, 1, 1]} backgroundColor={WHITE} padding="12px 32px 8px">
        <Column padding="0"><Paragraph text="" /></Column>
        <Column padding="0">
          <Heading
            level="h4"
            text={isDoc ? 'Total' : 'Total paid'}
            fontFamily={font.display}
            fontSize="15px"
            fontWeight={600}
            color={INK}
          />
        </Column>
        <Column padding="0">
          <Paragraph
            text="$128.00"
            fontFamily={font.mono}
            fontSize={isDoc ? '21px' : '19px'}
            fontWeight={500}
            color={INK}
            textAlign="right"
          />
        </Column>
      </Row>

      {isDoc && [
          /* ═══════════ PAID STATUS BAND (print) ═══════════ */
          <Row key="paid-status" cells={[1, 6, 2]} backgroundColor={WHITE} padding="22px 0 0">
            <Column
              padding="18px 0 18px 22px"
              border={{
                borderTopWidth: '1px', borderTopColor: BLUE_BOX, borderTopStyle: 'solid',
                borderBottomWidth: '1px', borderBottomColor: BLUE_BOX, borderBottomStyle: 'solid',
                borderLeftWidth: '1px', borderLeftColor: BLUE_BOX, borderLeftStyle: 'solid',
              }}
            >
              <Image src="assets/check.svg" alt="" width={34} />
            </Column>
            <Column
              padding="18px 16px 18px 16px"
              border={{
                borderTopWidth: '1px', borderTopColor: BLUE_BOX, borderTopStyle: 'solid',
                borderBottomWidth: '1px', borderBottomColor: BLUE_BOX, borderBottomStyle: 'solid',
              }}
            >
              <Paragraph
                html="<span style='text-transform:uppercase'>Paid in full</span>"
                fontFamily={font.mono}
                fontSize="10px"
                fontWeight={500}
                letterSpacing=".18em"
                color={BLUE}
              />
              <Paragraph
                text="Settled Jul 24, 2026 · Visa •••• 4242 · No payment due."
                fontFamily={font.body}
                fontSize="13px"
                color={BODY_MUTE}
              />
            </Column>
            <Column
              padding="18px 22px 18px 0"
              border={{
                borderTopWidth: '1px', borderTopColor: BLUE_BOX, borderTopStyle: 'solid',
                borderBottomWidth: '1px', borderBottomColor: BLUE_BOX, borderBottomStyle: 'solid',
                borderRightWidth: '1px', borderRightColor: BLUE_BOX, borderRightStyle: 'solid',
              }}
            >
              <Paragraph
                text="$128.00"
                fontFamily={font.mono}
                fontSize="20px"
                fontWeight={500}
                color={INK}
                textAlign="right"
              />
            </Column>
          </Row>

          ,
          /* ═══════════ NOTES (print) ═══════════ */
          <Row key="notes" backgroundColor={WHITE} padding="22px 0 0">
            <Column padding="0">
              <Paragraph
                html="<span style='color:#1E3A5F'>04</span>&nbsp;&nbsp;<span style='text-transform:uppercase'>Notes</span>"
                fontFamily={font.mono}
                fontSize="10px"
                fontWeight={500}
                letterSpacing=".14em"
                color={FAINT}
              />
              <Paragraph
                text="Thank you for your business. This invoice has been paid in full — no remittance required. Retain for your records. VAT not applicable; Loomly Studio, Inc. is a U.S. vendor (Tax ID 88-2140736)."
                fontFamily={font.body}
                fontSize="13px"
                lineHeight="1.6"
                color={BODY_MUTE}
              />
            </Column>
          </Row>

          ,
          /* ═══════════ FOOTER (print) — no tracking, no view-in-browser ═══════════ */
          <Row key="doc-footer" cells={[1, 1]} backgroundColor={WHITE} padding="20px 0 0">
            <Column
              padding="20px 0 0"
              border={{ borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid' }}
            >
              <Paragraph
                text="LOOMLY STUDIO, INC. · receipts@loomly.studio"
                fontFamily={font.mono}
                fontSize="10px"
                letterSpacing=".05em"
                color={FAINT}
              />
            </Column>
            <Column
              padding="20px 0 0"
              border={{ borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid' }}
            >
              <Paragraph
                text="LM-2026-0417 · Page 1 of 1"
                fontFamily={font.mono}
                fontSize="10px"
                letterSpacing=".05em"
                color={FAINT}
                textAlign="right"
              />
            </Column>
          </Row>,
      ]}
      {!isDoc && [
          /* ═══════════ BAND 5 · PAYMENT METHOD ═══════════ */
          <Row
            key="payment-method"
            cells={[1, 1]}
            backgroundColor={WHITE}
            padding="22px 32px"
            border={{
              borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid',
              borderBottomWidth: '1px', borderBottomColor: HAIR, borderBottomStyle: 'solid',
            }}
          >
            <Column padding="0">
              <Paragraph
                html="<span style='color:#1E3A5F'>04</span>&nbsp;&nbsp;<span style='text-transform:uppercase'>Payment method</span>"
                fontFamily={font.mono}
                fontSize="10px"
                fontWeight={500}
                letterSpacing=".14em"
                color={FAINT}
              />
              <Paragraph
                html={
                  '<span style="font-family:\'JetBrains Mono\',\'Courier New\',monospace;font-size:10px;font-weight:500;letter-spacing:.12em;color:#111418;border:1px solid rgba(17,20,24,.28);padding:4px 8px;">VISA</span>' +
                  '&nbsp;&nbsp;<span style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#111418;">Visa •••• 4242</span>'
                }
              />
            </Column>
            <Column padding="0">
              <Paragraph
                text="Charged Jul 24, 2026"
                fontFamily={font.mono}
                fontSize="12px"
                color={SLATE}
                textAlign="right"
              />
            </Column>
          </Row>

          ,
          /* ═══════════ BAND 6 · DOWNLOAD BUTTON ═══════════ */
          <Row key="download" backgroundColor={WHITE} padding="26px 32px">
            <Column padding="0">
              <Button
                href="#"
                backgroundColor={BLUE}
                color="#ffffff"
                fontFamily={font.mono}
                fontSize="12px"
                fontWeight={500}
                letterSpacing=".12em"
                padding="14px 30px"
                borderRadius="2px"
                textAlign="center"
              >
                DOWNLOAD PDF INVOICE
              </Button>
            </Column>
          </Row>

          ,
          /* ═══════════ BAND 7 · FOOTER + SOCIAL ═══════════ */
          <Row
            key="footer-social"
            cells={[2, 1]}
            backgroundColor={WHITE}
            padding="22px 32px 0"
            border={{ borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid' }}
          >
            <Column padding="0">
              <Paragraph
                html="LOOMLY STUDIO, INC. · TAX ID 88-2140736<br/>55 Washington St, Suite 210 · Brooklyn, NY 11201"
                fontFamily={font.mono}
                fontSize="10px"
                lineHeight="1.7"
                letterSpacing=".03em"
                color={SLATE}
              />
            </Column>
            <Column padding="0">
              <Social
                icons={[
                  { name: 'LinkedIn', url: '#' },
                  { name: 'X', url: '#' },
                ]}
                iconType="circle"
                iconSize={26}
                spacing={8}
              />
            </Column>
          </Row>,
          <Row key="vat-footer" backgroundColor={WHITE} padding="12px 32px 22px">
            <Column padding="12px 0 0" border={{ borderTopWidth: '1px', borderTopColor: HAIR_TEN, borderTopStyle: 'solid' }}>
              <Paragraph
                html='VAT not applicable — U.S. vendor. Questions about this receipt? <span style="color:#1E3A5F;">receipts@loomly.studio</span>'
                fontFamily={font.body}
                fontSize="11px"
                lineHeight="1.55"
                color={FAINT}
              />
            </Column>
          </Row>

          ,
          /* below-card meta (email/web only) */
          <Row key="below-card" backgroundColor={GROUND} padding="16px 6px 4px">
            <Column padding="0">
              <Paragraph
                html='<a href="#" style="color:#8A9094;">View in browser</a> · <a href="#" style="color:#8A9094;">Billing settings</a> · Loomly Studio, Brooklyn NY'
                fontFamily={font.mono}
                fontSize="10px"
                letterSpacing=".08em"
                color={FAINT}
                textAlign="center"
              />
            </Column>
          </Row>,
      ]}
    </Root>
  );
}
