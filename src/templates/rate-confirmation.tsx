import React from 'react';
import {
  Row,
  Column,
  ColumnLayouts,
  Heading,
  Paragraph,
  Button,
  Image,
  Divider,
  Table,
  Social,
  htmlToTextJson,
} from '@unlayer/react-elements';
import { Root, font, type Mode } from '../lib/root.js';

// Column honours `verticalAlign` at runtime but the exported type omits it;
// Table's `values` type demands all fields while the runtime accepts a partial.
// These aliases are the same components — type-only accommodations, zero runtime change.
const Col = Column as React.FC<
  React.ComponentProps<typeof Column> & { verticalAlign?: 'top' | 'middle' | 'bottom' | string }
>;
const Tbl = Table as React.FC<
  Omit<React.ComponentProps<typeof Table>, 'values'> & { values?: unknown }
>;

/**
 * Rate Confirmation — Northwind Freight.
 * A shipping contract, not a marketing email: austere, ruled, every figure
 * tabular. One vermilion accent (#C6412A), action & status only.
 *
 * Nine bands, flush, separated by single 1px hairlines. The block model is
 * strict — Root → Row → Column → item, nothing nests deeper than Column — so
 * every horizontal strip is its OWN top-level Row; consecutive same-colour
 * Rows read as one band.
 *
 * Mode deltas:
 *   email/web = "Review & Accept" button + reply line + "View in browser" sub-footer
 *   document  = printed signature + date lines; no button, no tracking/browser links
 */

// --- palette (verbatim from the spec sheet) ---
const INK = '#17242E'; // ink navy — bands, primary text, rules
const KRAFT = '#ECE6D8'; // email ground
const WHITE = '#FFFFFF'; // document card / paper
const VERM = '#C6412A'; // vermilion accent — action & status only
const SLATE = '#5C6771'; // secondary text · captions
const MUTED = '#7A828B'; // labels / eyebrows
const BODY_INK = '#33383B'; // body figures
const CREAM = '#F3EDE0'; // cream text on navy
const CREAM_70 = 'rgba(243,237,224,.7)';
const CREAM_60 = 'rgba(243,237,224,.6)';
const CREAM_55 = 'rgba(243,237,224,.55)';
const CREAM_50 = 'rgba(243,237,224,.5)';
const CREAM_45 = 'rgba(243,237,224,.45)';
const CREAM_20 = 'rgba(243,237,224,.2)';
const CREAM_16 = 'rgba(243,237,224,.16)';
const HAIR = 'rgba(23,36,46,.13)'; // 1px hairline between bands

const hairRight = {
  borderRightWidth: '1px',
  borderRightColor: HAIR,
  borderRightStyle: 'solid',
};
const hairBottom = {
  borderBottomWidth: '1px',
  borderBottomColor: HAIR,
  borderBottomStyle: 'solid',
};

export default function RateConfirmation({ mode }: { mode: Mode }) {
  const isDoc = mode === 'document';

  return (
    <Root
      mode={mode}
      backgroundColor={KRAFT}
      contentWidth="600px"
      previewText="Rate Confirmation NW-RC-48217 — signature required"
      fontFamily={font.body}
    >
      {/* ============ BAND 1 · HEADER (navy) ============ */}
      {/* top strip: mark · wordmark | RATE / CONFIRMATION */}
      <Row backgroundColor={INK} cells={[1, 4, 4]} padding="24px 28px 0">
        <Col padding="0 8px 0 0" verticalAlign="middle">
          <Image src="assets/northwind-mark-paper.svg" alt="Northwind Freight compass mark" width={36} />
        </Col>
        <Col padding="0" verticalAlign="middle">
          <Heading
            level="h1"
            text="NORTHWIND"
            fontFamily={font.display}
            fontSize="18px"
            fontWeight={600}
            letterSpacing=".02em"
            lineHeight="1"
            color={CREAM}
          />
          <Paragraph
            text="FREIGHT · BROKERAGE"
            fontFamily={font.mono}
            fontSize="9px"
            fontWeight={500}
            letterSpacing=".34em"
            color={CREAM_60}
            lineHeight="1"
          />
        </Col>
        <Col padding="0" verticalAlign="middle">
          <Paragraph
            text="Rate"
            fontFamily={font.mono}
            fontSize="11px"
            fontWeight={500}
            letterSpacing=".22em"
            color={CREAM_60}
            textAlign="right"
            lineHeight="1"
          />
          <Heading
            level="h2"
            text="CONFIRMATION"
            fontFamily={font.display}
            fontSize="19px"
            fontWeight={500}
            letterSpacing=".04em"
            color={CREAM}
            textAlign="right"
            lineHeight="1.1"
          />
          {isDoc && (
            <Paragraph
              text="Page 1 of 1"
              fontFamily={font.mono}
              fontSize="9px"
              letterSpacing=".16em"
              color={CREAM_45}
              textAlign="right"
              lineHeight="1"
            />
          )}
        </Col>
      </Row>
      {/* hairline rule inside the navy header */}
      <Row backgroundColor={INK} padding="20px 28px 16px">
        <Col padding="0">
          <Divider borderTopWidth="1px" borderTopColor={CREAM_20} borderTopStyle="solid" width="100%" />
        </Col>
      </Row>
      {/* meta strip: conf no. | issued | signature-required */}
      <Row backgroundColor={INK} cells={[2, 2, 2]} padding="0 28px 24px">
        <Col padding="0" verticalAlign="middle">
          <Paragraph text="Confirmation No." fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={CREAM_55} lineHeight="1" />
          <Paragraph text="NW-RC-48217" fontFamily={font.mono} fontSize="14px" fontWeight={500} letterSpacing=".04em" color={CREAM} lineHeight="1" />
        </Col>
        <Col padding="0" verticalAlign="middle">
          <Paragraph text="Issued" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={CREAM_55} lineHeight="1" />
          <Paragraph text="Jul 24 2026" fontFamily={font.mono} fontSize="14px" fontWeight={500} letterSpacing=".04em" color={CREAM} lineHeight="1" />
        </Col>
        {isDoc ? (
          <Col padding="0" verticalAlign="middle">
            <Paragraph
              text="Signature required"
              fontFamily={font.mono}
              fontSize="11px"
              fontWeight={500}
              letterSpacing=".16em"
              color="#E8836F"
              textAlign="right"
              lineHeight="1.2"
            />
          </Col>
        ) : (
          <Col padding="0" verticalAlign="middle">
            <Paragraph
              html={'<span style="display:inline-block;background:#C6412A;color:#ffffff;font-family:\'JetBrains Mono\',monospace;font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;padding:7px 11px;">Signature required</span>'}
              textAlign="right"
              lineHeight="1"
            />
          </Col>
        )}
      </Row>

      {/* ============ BAND 2 · LANE HERO (white) ============ */}
      <Row backgroundColor={WHITE} padding="28px 28px 4px">
        <Col padding="0">
          <Paragraph text="The lane" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".2em" color={MUTED} lineHeight="1" />
        </Col>
      </Row>
      <Row backgroundColor={WHITE} cells={[5, 3, 5]} padding="0 28px 26px" border={hairBottom}>
        {/* origin */}
        <Col padding="12px 0 0" verticalAlign="top">
          <Heading level="h3" text="Portland, OR" fontFamily={font.display} fontSize="30px" fontWeight={500} letterSpacing="-.01em" lineHeight="1.02" color={INK} />
          <Paragraph text="Pickup" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".16em" color={VERM} lineHeight="1" />
          <Paragraph text="Mon Jul 27 · 08:00–12:00" fontFamily={font.mono} fontSize="13px" color={BODY_INK} lineHeight="1" />
        </Col>
        {/* distance / transit */}
        <Col padding="18px 0 0" verticalAlign="top">
          <Paragraph
            html={'963 <span style="font-size:11px;color:#7A828B;">MI</span>'}
            fontFamily={font.mono}
            fontSize="17px"
            fontWeight={500}
            color={INK}
            textAlign="center"
            lineHeight="1"
          />
          <Paragraph html={'<span style="color:rgba(23,36,46,.35);">— — ▶</span>'} fontFamily={font.mono} fontSize="11px" textAlign="center" lineHeight="1" />
          <Paragraph text="~24 hr transit" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".12em" color={MUTED} textAlign="center" lineHeight="1.2" />
        </Col>
        {/* destination */}
        <Col padding="12px 0 0" verticalAlign="top">
          <Heading level="h3" text="Vernon, CA" fontFamily={font.display} fontSize="30px" fontWeight={500} letterSpacing="-.01em" lineHeight="1.02" color={INK} textAlign="right" />
          <Paragraph text="Delivery" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".16em" color={MUTED} textAlign="right" lineHeight="1" />
          <Paragraph text="Tue Jul 28 · 13:00–16:00" fontFamily={font.mono} fontSize="13px" color={BODY_INK} textAlign="right" lineHeight="1" />
        </Col>
      </Row>

      {/* ============ BAND 3 · SPEC STRIP (3col) ============ */}
      <Row backgroundColor={WHITE} layout={ColumnLayouts.ThreeEqual} padding="0" border={hairBottom}>
        <Col padding="16px 28px" border={hairRight}>
          <Paragraph text="Load No." fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={MUTED} lineHeight="1" />
          <Paragraph text="L-33915" fontFamily={font.mono} fontSize="14px" fontWeight={500} color={INK} lineHeight="1" />
        </Col>
        <Col padding="16px 20px" border={hairRight}>
          <Paragraph text="Equipment" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={MUTED} lineHeight="1" />
          <Paragraph text="53′ Dry Van" fontFamily={font.body} fontSize="14px" fontWeight={500} color={INK} lineHeight="1" />
        </Col>
        <Col padding="16px 20px">
          <Paragraph text="Gross Weight" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={MUTED} lineHeight="1" />
          <Paragraph text="42,000 lbs" fontFamily={font.mono} fontSize="14px" fontWeight={500} color={INK} lineHeight="1" />
        </Col>
      </Row>

      {/* ============ BAND 4 · STOP DETAIL (2col) ============ */}
      <Row backgroundColor={WHITE} layout={ColumnLayouts.TwoEqual} padding="0" border={hairBottom}>
        <Col padding="22px 28px" border={hairRight}>
          <Paragraph text="Stop 01 · Pickup" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".16em" color={MUTED} lineHeight="1" />
          <Heading level="h4" text="Columbia Cold Storage" fontFamily={font.display} fontSize="16px" fontWeight={600} color={INK} lineHeight="1.2" />
          <Paragraph html="3400 NW Front Ave<br/>Portland, OR 97210" fontFamily={font.body} fontSize="13px" lineHeight="1.5" color={SLATE} />
          <Paragraph
            html={
              '<span style="color:#7A828B;">REF/PO</span>&nbsp;&nbsp;PO-88213<br/>' +
              '<span style="color:#7A828B;">PHONE</span>&nbsp;&nbsp;(503) 555-0142<br/>' +
              '<span style="color:#7A828B;">APPT</span>&nbsp;&nbsp;Mon Jul 27 · 08:00–12:00'
            }
            fontFamily={font.mono}
            fontSize="11px"
            color={BODY_INK}
            lineHeight="1.9"
          />
        </Col>
        <Col padding="22px 28px">
          <Paragraph text="Stop 02 · Delivery" fontFamily={font.mono} fontSize="10px" fontWeight={500} letterSpacing=".16em" color={MUTED} lineHeight="1" />
          <Heading level="h4" text="Vernon Distribution Center" fontFamily={font.display} fontSize="16px" fontWeight={600} color={INK} lineHeight="1.2" />
          <Paragraph html="4825 S Boyle Ave<br/>Vernon, CA 90058" fontFamily={font.body} fontSize="13px" lineHeight="1.5" color={SLATE} />
          <Paragraph
            html={
              '<span style="color:#7A828B;">REF/DO</span>&nbsp;&nbsp;DO-55190<br/>' +
              '<span style="color:#7A828B;">PHONE</span>&nbsp;&nbsp;(323) 555-0198<br/>' +
              '<span style="color:#7A828B;">APPT</span>&nbsp;&nbsp;Tue Jul 28 · 13:00–16:00'
            }
            fontFamily={font.mono}
            fontSize="11px"
            color={BODY_INK}
            lineHeight="1.9"
          />
        </Col>
      </Row>

      {/* ============ BAND 5 · RATE BREAKDOWN (Table) ============ */}
      <Row backgroundColor={WHITE} padding="22px 28px 18px">
        <Col padding="0">
          <Tbl
            values={{
              table: {
                headers: [
                  {
                    height: 0,
                    cells: [
                      {
                        width: 70,
                        textJson: htmlToTextJson(
                          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#17242E;">Description</span>'
                        ),
                        color: INK,
                        textAlign: 'left',
                        padding: '0 0 11px',
                      },
                      {
                        width: 30,
                        textJson: htmlToTextJson(
                          '<span style="font-family:\'JetBrains Mono\',monospace;font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#17242E;">Amount</span>'
                        ),
                        color: INK,
                        textAlign: 'right',
                        padding: '0 0 11px',
                      },
                    ],
                  },
                ],
                rows: [
                  {
                    height: 0,
                    cells: [
                      {
                        width: 70,
                        textJson: htmlToTextJson(
                          '<span style="font-family:Inter,sans-serif;font-size:14px;color:#17242E;">Linehaul <span style="color:#7A828B;">— Portland, OR → Vernon, CA</span></span>'
                        ),
                        textAlign: 'left',
                        padding: '13px 0',
                      },
                      {
                        width: 30,
                        textJson: htmlToTextJson('<span style="font-family:\'JetBrains Mono\',monospace;font-size:14px;color:#17242E;">$2,300.00</span>'),
                        textAlign: 'right',
                        padding: '13px 0',
                      },
                    ],
                  },
                  {
                    height: 0,
                    cells: [
                      {
                        width: 70,
                        textJson: htmlToTextJson(
                          '<span style="font-family:Inter,sans-serif;font-size:14px;color:#17242E;">Fuel surcharge <span style="color:#7A828B;">— 963 mi @ $0.36/mi</span></span>'
                        ),
                        backgroundColor: 'rgba(23,36,46,.02)',
                        textAlign: 'left',
                        padding: '13px 0',
                      },
                      {
                        width: 30,
                        textJson: htmlToTextJson('<span style="font-family:\'JetBrains Mono\',monospace;font-size:14px;color:#17242E;">$345.00</span>'),
                        backgroundColor: 'rgba(23,36,46,.02)',
                        textAlign: 'right',
                        padding: '13px 0',
                      },
                    ],
                  },
                  {
                    height: 0,
                    cells: [
                      {
                        width: 70,
                        textJson: htmlToTextJson(
                          '<span style="font-family:Inter,sans-serif;font-size:14px;color:#17242E;">Detention <span style="color:#7A828B;">— 1 hr @ $25.00 (Vernon)</span></span>'
                        ),
                        textAlign: 'left',
                        padding: '13px 0',
                      },
                      {
                        width: 30,
                        textJson: htmlToTextJson('<span style="font-family:\'JetBrains Mono\',monospace;font-size:14px;color:#17242E;">$25.00</span>'),
                        textAlign: 'right',
                        padding: '13px 0',
                      },
                    ],
                  },
                ],
                footers: [],
              },
              enableHeader: true,
              enableFooter: false,
              headerBackgroundColor: WHITE,
              contentBackgroundColor: WHITE,
              border: {
                borderBottomColor: HAIR,
                borderBottomStyle: 'solid',
                borderBottomWidth: '1px',
              },
            }}
          />
        </Col>
      </Row>

      {/* ============ BAND 6 · TOTAL BAND (navy) ============ */}
      <Row backgroundColor={INK} cells={[3, 2]} padding="22px 28px">
        <Col padding="0" verticalAlign="middle">
          <Paragraph text="Total due to carrier" fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".18em" color={CREAM_70} lineHeight="1" />
          <Paragraph text="All-in · USD · net 30 on signed BOL" fontFamily={font.mono} fontSize="10px" letterSpacing=".06em" color={CREAM_50} lineHeight="1" />
        </Col>
        <Col padding="0" verticalAlign="middle">
          <Paragraph text="$2,670.00" fontFamily={font.mono} fontSize="33px" fontWeight={500} letterSpacing="-.01em" color={CREAM} textAlign="right" lineHeight="1" />
        </Col>
      </Row>

      {/* ============ BAND 7 · PARTIES + TERMS (white) ============ */}
      <Row backgroundColor={WHITE} cells={[1, 1]} padding="22px 28px 0">
        <Col padding="0 12px 18px 0">
          <Paragraph text="Broker" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={MUTED} lineHeight="1" />
          <Paragraph
            html={"Northwind Freight LLC<br/><span style=\"font-family:'JetBrains Mono',monospace;color:#5C6771;\">MC 712043 · Dana Okafor, Dispatch</span>"}
            fontFamily={font.body}
            fontSize="13px"
            color={INK}
            lineHeight="1.45"
          />
        </Col>
        <Col padding="0 0 18px 12px">
          <Paragraph text="Carrier" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".2em" color={MUTED} lineHeight="1" />
          <Paragraph
            html={"Cascade Line Haul LLC<br/><span style=\"font-family:'JetBrains Mono',monospace;color:#5C6771;\">MC 883147 · DOT 2946512</span>"}
            fontFamily={font.body}
            fontSize="13px"
            color={INK}
            lineHeight="1.45"
          />
        </Col>
      </Row>
      <Row backgroundColor={WHITE} padding="0 28px 22px" border={hairBottom}>
        <Col padding="0">
          <Paragraph
            html={'Rate is all-in and inclusive of fuel. Detention paid at $25.00/hr after 2 hours free at each stop, documented on the BOL. Carrier may not re-broker or double-broker this load. Notify dispatch of any delay within one hour of the appointment window. Invoice with signed BOL and this confirmation to <span style="color:#17242E;">accounting@northwindfreight.com</span>.'}
            fontFamily={font.body}
            fontSize="12px"
            lineHeight="1.6"
            color={SLATE}
          />
        </Col>
      </Row>

      {/* ============ BAND 8 · CTA (email/web) OR SIGNATURE (document) ============ */}
      {isDoc ? (
        [
          // acceptance header rule
          <Row key="sig-hd" backgroundColor={WHITE} cells={[3, 2]} padding="22px 28px 0">
            <Col padding="0" border={{ borderTopWidth: '2px', borderTopColor: INK, borderTopStyle: 'solid' }}>
              <Paragraph text="Carrier acceptance" fontFamily={font.mono} fontSize="11px" fontWeight={500} letterSpacing=".16em" color={INK} lineHeight="1" />
            </Col>
            <Col padding="0" border={{ borderTopWidth: '2px', borderTopColor: INK, borderTopStyle: 'solid' }}>
              <Paragraph text="Sign & return to dispatch@northwindfreight.com" fontFamily={font.mono} fontSize="10px" letterSpacing=".06em" color={MUTED} textAlign="right" lineHeight="1" />
            </Col>
          </Row>,
          // signature + date lines
          <Row key="sig-line" backgroundColor={WHITE} cells={[3, 2]} padding="34px 28px 0">
            <Col padding="0 24px 0 0">
              <Paragraph text="▸ Sign here" fontFamily={font.mono} fontSize="9px" fontWeight={500} letterSpacing=".18em" color={VERM} lineHeight="1" />
              <Divider borderTopWidth="2px" borderTopColor={INK} borderTopStyle="solid" width="100%" />
              <Paragraph text="Authorized signature" fontFamily={font.mono} fontSize="9px" letterSpacing=".14em" color={MUTED} lineHeight="1" />
            </Col>
            <Col padding="21px 0 0">
              <Divider borderTopWidth="2px" borderTopColor={INK} borderTopStyle="solid" width="100%" />
              <Paragraph text="Date" fontFamily={font.mono} fontSize="9px" letterSpacing=".14em" color={MUTED} lineHeight="1" />
            </Col>
          </Row>,
          // print name + driver/truck lines
          <Row key="sig-name" backgroundColor={WHITE} cells={[3, 2]} padding="26px 28px 26px">
            <Col padding="0 24px 0 0">
              <Divider borderTopWidth="1px" borderTopColor="rgba(23,36,46,.4)" borderTopStyle="solid" width="100%" />
              <Paragraph text="Print name" fontFamily={font.mono} fontSize="9px" letterSpacing=".14em" color={MUTED} lineHeight="1" />
            </Col>
            <Col padding="0">
              <Divider borderTopWidth="1px" borderTopColor="rgba(23,36,46,.4)" borderTopStyle="solid" width="100%" />
              <Paragraph text="Driver / Truck No." fontFamily={font.mono} fontSize="9px" letterSpacing=".14em" color={MUTED} lineHeight="1" />
            </Col>
          </Row>,
        ]
      ) : (
        <Row backgroundColor={WHITE} padding="26px 28px">
          <Col padding="0">
            <Button
              href="#"
              backgroundColor={VERM}
              color="#FFFFFF"
              fontFamily={font.mono}
              fontSize="13px"
              fontWeight={500}
              letterSpacing=".12em"
              padding="15px 34px"
              borderRadius="4px"
              textAlign="center"
            >
              Review &amp; Accept
            </Button>
            <Paragraph
              html={"Or reply to confirm · Dana Okafor, Dispatch · <span style=\"font-family:'JetBrains Mono',monospace;color:#5C6771;\">(503) 555-0110</span>"}
              fontFamily={font.body}
              fontSize="12px"
              color={MUTED}
              textAlign="center"
              lineHeight="1.4"
            />
          </Col>
        </Row>
      )}

      {/* ============ BAND 9 · FOOTER (navy) ============ */}
      {isDoc ? (
        <Row backgroundColor={WHITE} cells={[3, 2]} padding="26px 28px 24px">
          <Col padding="0" border={{ borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid' }}>
            <Paragraph
              text="NORTHWIND FREIGHT · 220 SW Ash St, Suite 400 · Portland, OR 97204"
              fontFamily={font.mono}
              fontSize="10px"
              letterSpacing=".06em"
              color={MUTED}
              lineHeight="1.4"
            />
          </Col>
          <Col padding="0" border={{ borderTopWidth: '1px', borderTopColor: HAIR, borderTopStyle: 'solid' }}>
            <Paragraph
              text="NW-RC-48217 · Page 1 of 1"
              fontFamily={font.mono}
              fontSize="10px"
              letterSpacing=".06em"
              color={MUTED}
              textAlign="right"
              lineHeight="1.4"
            />
          </Col>
        </Row>
      ) : (
        [
          <Row key="ft-top" backgroundColor={INK} cells={[4, 2]} padding="22px 28px 0">
            <Col padding="0" verticalAlign="middle">
              <Paragraph
                html="NORTHWIND FREIGHT · MC 712043<br/>220 SW Ash St, Suite 400 · Portland, OR 97204"
                fontFamily={font.mono}
                fontSize="10px"
                letterSpacing=".04em"
                color={CREAM_70}
                lineHeight="1.7"
              />
            </Col>
            <Col padding="0" verticalAlign="middle">
              <Social
                icons={[
                  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/northwind-freight' },
                  { name: 'Twitter', url: 'https://twitter.com/northwindfreight' },
                ]}
                iconType="circle"
                iconSize={26}
                spacing={8}
                align="right"
              />
            </Col>
          </Row>,
          <Row key="ft-legal" backgroundColor={INK} padding="16px 28px 22px">
            <Col padding="0">
              <Divider borderTopWidth="1px" borderTopColor={CREAM_16} borderTopStyle="solid" width="100%" />
              <Paragraph
                text="You received this because you are a contracted carrier with Northwind Freight. This rate confirmation is part of a load agreement, not a solicitation."
                fontFamily={font.body}
                fontSize="11px"
                lineHeight="1.55"
                color={CREAM_50}
              />
            </Col>
          </Row>,
        ]
      )}

      {/* email/web-only sub-footer on kraft */}
      {!isDoc && (
        <Row backgroundColor={KRAFT} padding="16px 4px 4px">
          <Col padding="0">
            <Paragraph
              html={'<a href="#" style="color:#8A8478;">View in browser</a> · <a href="#" style="color:#8A8478;">Manage notifications</a> · Northwind Freight, Portland OR'}
              fontFamily={font.mono}
              fontSize="10px"
              letterSpacing=".08em"
              color="#8A8478"
              textAlign="center"
              lineHeight="1.4"
            />
          </Col>
        </Row>
      )}
    </Root>
  );
}
