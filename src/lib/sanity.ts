// src/lib/sanity.ts
import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: "your_project_id", // Replace with your actual Sanity project ID
  dataset: "production",
  apiVersion: "2023-08-04",
  useCdn: true,
});
