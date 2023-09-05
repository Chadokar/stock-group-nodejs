export const handleImage = async (e, setImage, setBase64) => {
  setImage(e.target.files[0]);
  const base = await convertToBase64(e.target.files[0]);
  setBase64(base);
};

export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};
