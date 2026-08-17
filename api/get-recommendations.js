import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }

  try {
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // Map rows to clean objects for the frontend
    const recommendations = rows.map(row => ({
      name: row.get('Name'),
      position: row.get('Position'),
      recommendation: row.get('Recommendation'),
    }));

    return res.status(200).json(recommendations);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to fetch recommendations', error: error.message });
  }
}