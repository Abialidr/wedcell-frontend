import imageCompression from "browser-image-compression";

const compressAndAppendFiles = async (file, formData, fieldName) => {
  if (file) {
    const options = {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      alwaysKeepResolution: true,
      fileType: "image/webp",
    };
    try {
      let compressedFile = await imageCompression(file, options);
      compressedFile = new File([compressedFile], compressedFile.name);
      return compressedFile;
    } catch (error) {
      console.error(error);
    }
  }
};

export default compressAndAppendFiles;
