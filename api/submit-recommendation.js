import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export default async function handler(req, res) {
  // Block any request that isn't a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    // 1. Authenticate using your virtual user's credentials
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 2. Connect to your specific sheet
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);
    
    // 3. Load the document properties
    await doc.loadInfo(); 
    
    // 4. Select the first tab in the spreadsheet
    const sheet = doc.sheetsByIndex[0]; 
    
    // 5. Extract the data sent from your React form
    const { name, position, recommendation } = req.body;

    // 6. Append a new row to the sheet
    await sheet.addRow({
      Name: name,
      Position: position,
      Recommendation: recommendation,
      Date: new Date().toISOString()
    });

    return res.status(200).json({ message: 'Recommendation saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to save recommendation', error: error.message });
  }
}