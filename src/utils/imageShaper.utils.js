import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function imageShaper({ buffer }) {
  return sharp(buffer)
    .resize(1200, 800, {
      fit: "inside",
      position: "center",
    })
    .webp({
      quality: 85,
    })
    .toBuffer();
}
