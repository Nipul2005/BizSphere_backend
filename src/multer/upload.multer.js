import multer from "multer";
const bizSphereStorage = multer.memoryStorage({});
const bizShpereImagesHandler = multer({
  storage: bizSphereStorage,
  limits: {
    fileSize: 100 * 1024 * 1024, //100Mb
  },
});

export default bizShpereImagesHandler;
