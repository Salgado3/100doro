import { Client, Databases, Users } from 'node-appwrite';

export default async ({ req, res, log, error }) => {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_FUNCTION_API_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID);
  // .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

  const databases = new Databases(client);

  // Log the entire request object for debugging
  log('Request object:', JSON.stringify(req));

  // Check if req.bodyJson exists
  if (!req.bodyJson) {
    error('Request body is undefined.');
    return res.json({ message: 'Failure: Request body is undefined.' });
  }

  const data = req.bodyJson; // Correctly access the JSON payload
  log('Received request data:', JSON.stringify(data));

  try {
    const user = await databases.getDocument(
      '67b3c2ae0038d66b47ec',
      '67b3c2b700380226daba',
      data.$id
    );

    if (user) {
      log('User already exists in the database:', JSON.stringify(user));
      return res.json({ message: 'User already exists' });
    }
  } catch (err) {
    if (err.code === 404) {
      log(
        'User does not exist in the database. Proceed with creating the user.'
      );
    } else {
      error('Error checking user existence:', err);
      return res.json({
        message: 'Error checking user existence',
        error: err.message,
      });
    }
  }

  try {
    await databases.createDocument(
      '67b3c2ae0038d66b47ec',
      '67b3c2b700380226daba',
      data.$id,
      {
        name: data.name,
      }
    );
    log('User created successfully.');
    return res.json({ message: 'Success: User created!' });
  } catch (err) {
    error('Failed to create user in DB:', err);
    return res.json({
      message: 'Failure: User not created!',
      error: err.message,
    });
  }
};
