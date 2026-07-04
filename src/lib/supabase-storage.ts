import { createClient } from "@supabase/supabase-js";

// Supabase configuration — DO NOT MODIFY
const supabaseUrl = "https://jypmxfhaxcniztkswueb.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cG14ZmhheGNuaXp0a3N3dWViIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI5MTAxMjEsImV4cCI6MjA5ODQ4NjEyMX0.zHttmS0Q1M2qIxMhsOjlf7xNDScwpLfWV0BGVtqu3nE";
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function uploadToSupabase(file: File): Promise<string> {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from('products')
    .upload(fileName, file, { cacheControl: '3600', upsert: false });

  if (error) throw new Error(error.message);

  const { data: publicUrlData } = supabase.storage
    .from('products')
    .getPublicUrl(fileName);

  return publicUrlData.publicUrl;
}

export async function deleteFromSupabase(imageUrl: string) {
  const prefix = `${supabaseUrl}/storage/v1/object/public/products/`;
  if (!imageUrl || !imageUrl.startsWith(prefix)) return;
  const fileName = imageUrl.replace(prefix, "");
  await supabase.storage.from('products').remove([fileName]);
}
