import multer from "multer";
const bizSphereStorage = multer.memoryStorage({});
const bizShpereImagesHandler = multer({
  storage: bizSphereStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, //5Mb
  },
});

export default bizShpereImagesHandler;
