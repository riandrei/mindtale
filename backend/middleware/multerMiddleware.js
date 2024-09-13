const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const multerMiddleware = (req, res, next) => {
  const upload = multer().single("image");

  upload(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      next();
      return res.status(400).json({ message: "File upload error" });
    } else if (err) {
      next();
      return res.status(500).json({ message: "Server error" });
    }

    try {
      if (!req.file) {
        // return res.status(400).json({ message: "No file uploaded" });
      }

      const base64 = req.file.buffer.toString("base64");

      const result = await cloudinary.uploader.upload(
        `data:image/png;base64,${base64}`,
        {
          unique_filename: true,
          folder: "Mindtale/profilePictures", // optional, change as needed
        }
      );

      // Store the Cloudinary URL in the request object for further processing
      req.profilePicture = result.secure_url;

      next();
    } catch (error) {
      next();
      console.error("Cloudinary upload error:", error);
      // return res.status(500).json({ message: "Cloudinary upload error" });
    }
  });
};

module.exports = multerMiddleware;
