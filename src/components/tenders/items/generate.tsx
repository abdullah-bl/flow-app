"use client"

import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"
import { TenderItem } from "@/types"
import * as docx from "docx"

export default function GeneratePricesDocuments({
  items,
}: {
  items: TenderItem[]
}) {
  const handleGeneratePricesDocument = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
    const doc = new docx.Document({
      sections: [
        {
          properties: {},
          children: [
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "Prices Document",
                  bold: true,
                  size: 24,
                }),
              ],
              alignment: docx.AlignmentType.CENTER,
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "This document contains the prices of all items in this tender.",
                }),
              ],
            }),
            new docx.Paragraph({
              children: [
                new docx.TextRun({
                  text: "Items",
                  bold: true,
                  size: 18,
                }),
              ],
            }),
            new docx.Table({
              width: {
                size: 100,
                type: docx.WidthType.PERCENTAGE,
              },
              rows: [
                new docx.TableRow({
                  children: [
                    new docx.TableCell({
                      children: [new docx.Paragraph("Item")],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph("Unit")],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph("Quantity")],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph("Amount")],
                    }),
                    new docx.TableCell({
                      children: [new docx.Paragraph("Total")],
                    }),
                  ],
                }),
                ...items.map(
                  (item) =>
                    new docx.TableRow({
                      children: [
                        new docx.TableCell({
                          children: [new docx.Paragraph(item.name)],
                        }),
                        new docx.TableCell({
                          children: [new docx.Paragraph(item.unit)],
                        }),
                        new docx.TableCell({
                          children: [
                            new docx.Paragraph(item.quantity.toString()),
                          ],
                        }),
                        new docx.TableCell({
                          children: [
                            new docx.Paragraph(item.amount.toString()),
                          ],
                        }),
                        new docx.TableCell({
                          children: [
                            new docx.Paragraph(
                              (item.amount * item.quantity).toString()
                            ),
                          ],
                        }),
                      ],
                    })
                ),
                new docx.TableRow({
                  children: [
                    new docx.TableCell({
                      children: [
                        new docx.Paragraph("Total Amount (VAT Included)"),
                      ],
                      columnSpan: 4,
                    }),
                    new docx.TableCell({
                      children: [
                        new docx.Paragraph(
                          formatCurrency(
                            items
                              .map((item) => item.amount * item.quantity)
                              .reduce((a, b) => a + b, 0)
                          )
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        },
      ],
    })
    const buffer = await docx.Packer.toBuffer(doc)
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "prices.docx"
    a.click()
  }
  return (
    <Button
      variant={"outline"}
      onClick={handleGeneratePricesDocument}
      disabled={items.length === 0}
    >
      Generate
    </Button>
  )
}
