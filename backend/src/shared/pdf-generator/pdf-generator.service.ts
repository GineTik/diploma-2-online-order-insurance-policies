import { Injectable } from '@nestjs/common';
import * as PDFKit from 'pdfkit';
import { Response } from 'express';

// Define a structure for the data, matching the visual elements
interface PdfRenderData {
	header: {
		id: string;
		status: string;
		orderedDate: string;
	};
	policyDetails: {
		sectionTitle: string;
		title: string;
		version: string;
		description: string;
		advantages: string[];
	};
	orderSummary: {
		sectionTitle: string;
		details: Array<{ label: string; value: string }>;
	};
	footer: {
		orderTotal: string;
		companyName: string;
	};
}

// Constants for styling
const PAGE_MARGIN = 40;
const FONT_REGULAR = 'src/assets/fonts/InterVariable.ttf';
const FONT_BOLD = 'src/assets/fonts/InterVariable.ttf';

const TEXT_COLOR_DARK = '#333333';
const TEXT_COLOR_MEDIUM = '#555555';
const TEXT_COLOR_LIGHT = '#777777';

const BADGE_PENDING_BG = '#E5E7EB'; // Light Gray
const BADGE_PENDING_TEXT = '#374151'; // Black
const BADGE_VERSION_BG = '#E5E7EB'; // Light Gray
const BADGE_VERSION_TEXT = '#374151'; // Dark Gray

const LINE_COLOR = '#E0E0E0';
const ROW_HEIGHT = 25;
const PADDING = 5; // Padding for badges

@Injectable()
export class PdfGeneratorService {
	async generatePdf(
		filename: string,
		data: PdfRenderData, // Changed to use the specific interface
		res: Response,
	): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			try {
				const doc = new PDFKit({ margin: PAGE_MARGIN });
				const stream = res.writeHead(200, {
					'Content-Type': 'application/pdf',
					'Content-disposition': `attachment;filename=${filename}.pdf`,
				});

				doc.on('data', (chunk) => stream.write(chunk));
				doc.on('end', () => stream.end());

				this._drawHeader(doc, data.header);
				doc.moveDown(2);
				this._drawPolicyDetails(doc, data.policyDetails);
				doc.moveDown(2);
				this._drawOrderSummary(doc, data.orderSummary);
				this._drawFooter(doc, data.footer);

				doc.end();
			} catch (error) {
				reject(error);
			}
		});
	}

	private _drawHeader(
		doc: PDFKit.PDFDocument,
		headerData: PdfRenderData['header'],
	): void {
		const contentWidth = doc.page.width - 2 * PAGE_MARGIN;
		const startY = doc.y;

		// Order ID
		doc
			.font(FONT_BOLD)
			.fontSize(18)
			.fillColor(TEXT_COLOR_DARK)
			.text('Замовлення №' + headerData.id, PAGE_MARGIN, startY, {
				width: contentWidth * 0.6,
				lineBreak: false,
			});

		// Status Badge
		const statusText = headerData.status.toUpperCase();
		doc.font(FONT_BOLD).fontSize(10); // Set font for width calculation
		const statusTextWidth = doc.widthOfString(statusText);
		const statusBadgeWidth = statusTextWidth + 2 * PADDING;
		const statusX = doc.page.width - PAGE_MARGIN - statusBadgeWidth;

		doc
			.roundedRect(
				statusX,
				startY - PADDING / 2,
				statusBadgeWidth,
				20 + PADDING,
				3,
			)
			.fill(BADGE_PENDING_BG);
		doc
			.fillColor(BADGE_PENDING_TEXT)
			.text(statusText, statusX + PADDING, startY + PADDING / 2, {
				width: statusTextWidth,
				align: 'center',
			});

		doc.moveDown(0.7); // Space after ID/Status line
		const orderedDateY = doc.y; // Capture Y after potential moveDown from status if it wrapped

		// Ordered Date
		doc
			.font(FONT_REGULAR)
			.fontSize(9)
			.fillColor(TEXT_COLOR_LIGHT)
			.text(headerData.orderedDate, PAGE_MARGIN, orderedDateY, {
				align: 'right',
				width: contentWidth,
			});

		doc.y = Math.max(startY + 20 + PADDING, orderedDateY) + 10; // Ensure Y is below the tallest element
	}

	private _drawPolicyDetails(
		doc: PDFKit.PDFDocument,
		policyData: PdfRenderData['policyDetails'],
	): void {
		const contentWidth = doc.page.width - 2 * PAGE_MARGIN;
		let currentY = doc.y;

		// Section Title "Поліс"
		doc
			.font(FONT_REGULAR)
			.fontSize(10)
			.fillColor(TEXT_COLOR_MEDIUM)
			.text(policyData.sectionTitle, PAGE_MARGIN, currentY);

		// Version Badge
		const versionText = policyData.version;
		const currentTitleFont = doc.font(FONT_REGULAR).fontSize(10); // Set font for badge text and width calculation
		const versionTextWidth = currentTitleFont.widthOfString(
			'Версія ' + versionText,
		);
		const versionBadgeWidth = versionTextWidth + 2 * PADDING;
		// Position it next to the title. This might need adjustment if title is very long.
		const titleWidth = doc.widthOfString(policyData.sectionTitle);
		let versionX = PAGE_MARGIN + titleWidth + 10;
		if (versionX + versionBadgeWidth > doc.page.width - PAGE_MARGIN) {
			// If it overflows
			currentY += 20; // Move to next line
			versionX = PAGE_MARGIN;
		}

		doc
			.roundedRect(
				versionX,
				currentY - PADDING / 2,
				versionBadgeWidth,
				15 + PADDING,
				3,
			)
			.fill(BADGE_VERSION_BG);
		doc
			.font(FONT_REGULAR)
			.fontSize(10)
			.fillColor(BADGE_VERSION_TEXT)
			.text('Версія ' + versionText, versionX + PADDING, currentY, {
				width: versionTextWidth,
				align: 'center',
			});

		currentY += 15;

		// Policy Title
		doc
			.font(FONT_BOLD)
			.fontSize(16)
			.fillColor(TEXT_COLOR_DARK)
			.text(policyData.title, PAGE_MARGIN, currentY, {
				lineBreak: false,
				width: contentWidth,
			});

		currentY = Math.max(currentY + 20, doc.y + 5); // Ensure Y is below title and badge

		// Description
		doc
			.font(FONT_REGULAR)
			.fontSize(12)
			.fillColor(TEXT_COLOR_DARK)
			.text(policyData.description, PAGE_MARGIN, currentY, {
				width: contentWidth,
			});
		currentY = doc.y + 10;

		// Advantages on the right side
		const advantagesX = doc.page.width / 2 + PAGE_MARGIN / 2;
		const advantagesWidth = doc.page.width / 2 - PAGE_MARGIN * 1.5;
		let advantagesY = PAGE_MARGIN + 60; // Align with top of policy section roughly

		policyData.advantages.forEach((adv) => {
			doc
				.font(FONT_REGULAR)
				.fontSize(12)
				.fillColor(TEXT_COLOR_DARK)
				.text(`✓ ${adv}`, advantagesX, advantagesY, { width: advantagesWidth });
			advantagesY += 20;
		});

		// Make sure currentY is below the advantages list if it's longer
		doc.y = Math.max(currentY, advantagesY);
	}

	private _drawOrderSummary(
		doc: PDFKit.PDFDocument,
		summaryData: PdfRenderData['orderSummary'],
	): void {
		const contentWidth = doc.page.width - 2 * PAGE_MARGIN;
		let currentY = doc.y;

		// Section Title
		doc
			.font(FONT_BOLD)
			.fontSize(14)
			.fillColor(TEXT_COLOR_DARK)
			.text(summaryData.sectionTitle, PAGE_MARGIN, currentY, {
				width: contentWidth,
			});
		currentY = doc.y + 10;

		const labelWidth = contentWidth * 0.4;
		const valueWidth = contentWidth * 0.6;
		const rowCornerRadius = 3; // Define a corner radius for the rows

		summaryData.details.forEach((item, index) => {
			const rowY = currentY + index * ROW_HEIGHT;
			const textY = rowY + (ROW_HEIGHT - 12) / 2 - 2; // Vertically center text (approx)

			// Rounded background for row
			doc
				.roundedRect(
					PAGE_MARGIN,
					rowY,
					contentWidth,
					ROW_HEIGHT,
					rowCornerRadius,
				)
				.fill('#f0f1f9');

			doc
				.font(FONT_REGULAR)
				.fontSize(12)
				.fillColor(TEXT_COLOR_MEDIUM)
				.text(item.label, PAGE_MARGIN + PADDING, textY, {
					width: labelWidth - PADDING,
				});

			doc
				.font(FONT_REGULAR)
				.fontSize(12)
				.fillColor(TEXT_COLOR_DARK)
				.text(item.value, PAGE_MARGIN + labelWidth + PADDING, textY, {
					width: valueWidth - 2 * PADDING,
				});

			// Line separator - not drawn after the last item
			if (index < summaryData.details.length - 1) {
				doc
					.moveTo(PAGE_MARGIN, rowY + ROW_HEIGHT)
					.lineTo(doc.page.width - PAGE_MARGIN, rowY + ROW_HEIGHT)
					.strokeColor(LINE_COLOR)
					.stroke();
			}
		});
		doc.y = currentY + summaryData.details.length * ROW_HEIGHT + 10;
	}

	private _drawFooter(
		doc: PDFKit.PDFDocument,
		footerData: PdfRenderData['footer'],
	): void {
		const contentWidth = doc.page.width - 2 * PAGE_MARGIN;
		// Position footer near the bottom of the page
		// This is a simple approach; for multi-page, it would be more complex.
		// Assuming content fits on one page for now.
		let currentY = doc.page.height - PAGE_MARGIN - 60; // Estimate for footer height
		if (doc.y > currentY) currentY = doc.y + 20; // If content is already lower, push footer down

		const itemGap = 15;
		doc.font(FONT_BOLD).fontSize(12); // Set font for width calculation

		// Order Total
		doc
			.font(FONT_REGULAR)
			.fontSize(12)
			.fillColor(TEXT_COLOR_DARK)
			.text(
				`Сума замовлення: ${footerData.orderTotal} грн`,
				PAGE_MARGIN,
				currentY,
				{
					width: contentWidth / 3,
				},
			);

		// Company Name (right-aligned)
		doc
			.font(FONT_REGULAR)
			.fontSize(12)
			.fillColor(TEXT_COLOR_DARK)
			.text(
				`Страхова компанія: ${footerData.companyName}`,
				PAGE_MARGIN,
				currentY,
				{
					align: 'right',
					width: contentWidth,
				},
			);
		doc.y = currentY + 10;
	}
}
