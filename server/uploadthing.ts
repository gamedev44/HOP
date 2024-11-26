import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  messageAttachment: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "test" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId };
    }),

  backgroundImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      return { userId: "test" };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Background image uploaded for userId:", metadata.userId);
      console.log("File URL:", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;