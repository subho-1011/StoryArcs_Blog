const conf = {
  appwrite: {
    url: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    projectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    collectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    bucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
  },
  tinyMCE: { apiKey: String(import.meta.env.VITE_TINYMCE_API_KEY) },
};

export default conf;
