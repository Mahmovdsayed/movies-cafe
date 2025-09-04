const compressImage = async (
  file: File,
  type: "banner" | "default" = "default"
): Promise<Blob | null> => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return reject(new Error("Failed to get canvas context"));

    const img = new Image();
    const objectURL = URL.createObjectURL(file);

    img.onload = () => {
      const targetWidth = type === "banner" ? 1920 : 500;
      const targetHeight = type === "banner" ? 1080 : 500;
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      const imgWidth = img.width;
      const imgHeight = img.height;

      const scale = Math.max(targetWidth / imgWidth, targetHeight / imgHeight);
      const newWidth = imgWidth * scale;
      const newHeight = imgHeight * scale;

      const offsetX = (targetWidth - newWidth) / 2;
      const offsetY = (targetHeight - newHeight) / 2;

      ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);

      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectURL);
          resolve(blob);
        },
        file.type === "image/gif" ? "image/jpeg" : file.type,
        1
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectURL);
      reject(new Error("Failed to load image"));
    };

    img.src = objectURL;
  });
};

export { compressImage };
