import { Injectable } from '@nestjs/common';
import PDFDocument from 'pdfkit';

@Injectable()
export class PdfGeneratorService {
	async generatePdf(data: Record<string, any>): Promise<Buffer> {
		return new Promise((resolve, reject) => {
			try {
				const doc = new PDFDocument();
				const chunks: Buffer[] = [];

				// Collect PDF chunks
				doc.on('data', (chunk) => chunks.push(chunk));

				// Resolve with the complete PDF buffer when done
				doc.on('end', () => resolve(Buffer.concat(chunks)));

				// Add content to the PDF
				doc.fontSize(16).text('Generated Document', { align: 'center' });
				doc.moveDown();

				// Recursively add object properties to PDF
				this.addObjectToPdf(doc, data);

				// Finalize the PDF
				doc.end();
			} catch (error) {
				reject(error);
			}
		});
	}

	private addObjectToPdf(
		doc: PDFKit.PDFDocument,
		data: Record<string, any>,
		indent = 0,
	): void {
		for (const [key, value] of Object.entries(data)) {
			const indentation = '  '.repeat(indent);

			if (typeof value === 'object' && value !== null) {
				doc.fontSize(12).text(`${indentation}${key}:`, { continued: false });
				this.addObjectToPdf(doc, value, indent + 1);
			} else {
				doc
					.fontSize(12)
					.text(`${indentation}${key}: ${value}`, { continued: false });
			}
		}
	}
}
