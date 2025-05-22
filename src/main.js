import { Client, Users } from 'node-appwrite';

// This Appwrite function will be executed every time your function is triggered
export default async ({ req, res, log, error }) => {
  // You can use the Appwrite SDK to interact with other services
  // For this example, we're using the Users service
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(req.headers['x-appwrite-key'] ?? '');
  const users = new Users(client);

  let userId;
  try {
    const body = JSON.parse(req.bodyRaw || '{}');
    userId = body.userId;

    if (!userId) {
      return res.json({ error: 'Missing userId in request body' }, 400);
    }
  } catch (err) {
    return res.json({ error: 'Invalid JSON in request body' }, 400);
  }

  // Try to delete the user
  try {
    await users.delete(userId);
    log(`User ${userId} deleted.`);
    return res.json({ success: true, message: `User ${userId} deleted.` });
  } catch (err) {
    error(`Error deleting user: ${err.message}`);
    return res.json({ error: 'Failed to delete user', details: err.message }, 500);
  };
};
