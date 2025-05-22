import { Client, Account } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  try {
    const client = new Client()
      .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
      .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
      .setKey(req.headers['x-appwrite-key'] ?? '');

    const account = new Account(client);

    // Delete the currently authenticated user's account
    await account.delete();

    // Return success response
    return res.json({ success: true, message: 'Account deleted successfully.' });

  } catch (err) {
    error('Failed to delete account: ' + err.message);
    return res.json({ success: false, message: err.message });
  };
};
