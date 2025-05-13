import { supabase } from './supabase';

/**
 * Upload a file to Supabase Storage
 * @param {File} file - The file to upload
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The path within the bucket
 * @returns {Promise<string>} - The public URL of the uploaded file
 */
export const uploadFile = async (file, bucket, path) => {
  try {
    // Create full path including filename
    const fileName = `${Date.now()}_${file.name}`;
    const fullPath = path ? `${path}/${fileName}` : fileName;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fullPath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return urlData.publicUrl;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

/**
 * Upload profile picture
 * @param {File} file - The image file
 * @param {string} userId - The user ID
 * @returns {Promise<string>} - The public URL of the uploaded image
 */
export const uploadProfilePicture = async (file, userId) => {
  return uploadFile(file, 'avatars', userId);
};

/**
 * Delete a file from Supabase Storage
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The path to the file within the bucket
 * @returns {Promise<boolean>} - Whether the deletion was successful
 */
export const deleteFile = async (bucket, path) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) throw error;

    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
};

/**
 * List files in a bucket/folder
 * @param {string} bucket - The storage bucket name
 * @param {string} path - The folder path (optional)
 * @returns {Promise<Array>} - Array of file objects
 */
export const listFiles = async (bucket, path = '') => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path);

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Error listing files:", error);
    throw error;
  }
};
