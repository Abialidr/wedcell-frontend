import imageCompression from "browser-image-compression";

const compressAndAppendFilesMultiple = async (files, formData, fieldName) => {
  if (files) {
    await Promise.all(
      files.map(async (file) => {
        const options = {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          alwaysKeepResolution: true,
          fileType: "image/webp",
        };
        try {
          let compressedFile = await imageCompression(
            file.originFileObj,
            options
          );
          compressedFile = new File([compressedFile], compressedFile.name);
          formData.append(fieldName, compressedFile);
        } catch (error) {
          console.error(error);
        }
      })
    );
  }
};

export default compressAndAppendFilesMultiple;
