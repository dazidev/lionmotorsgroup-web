"use server";

import { DataImage, ServerResponse } from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import { deleteByKey, r2 } from "@/src/lib/cloudflare-r2";
import prisma from "@/src/lib/prisma";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);
const BUCKET = process.env.R2_BUCKET!;

export async function getBrands() {
  try {
    const brands = await prisma.brand.findMany();
    if (!brands) return { success: false };

    return {
      success: true,
      data: brands,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function addBrand(
  name: string,
  dataImage: DataImage,
): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!

  try {
    await requireAuth("admin");

    const { mime, ext, size } = dataImage;

    //* Image validation
    const allow = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
    if (!allow.includes(mime)) throw "";
    if (!ext || ext.length > 8) throw "";
    if (!size || size > MAX_BYTES) throw "";

    const brand = await prisma.brand.create({
      data: {
        name,
        imagePath: "",
      },
    });

    const key = `catalog/brands/images/${
      brand.id
    }/${Date.now()}-${crypto.randomUUID()}.${dataImage.ext}`;

    const cmd = new PutObjectCommand({
      Bucket: BUCKET,
      Key: key,
      ContentType: mime,
      // Opcional: limitar tamaño esperado
      // ContentLength: size,
    });

    const url = await getSignedUrl(r2, cmd, { expiresIn: 600 });

    return {
      success: true,
      message: "The brand has been create successfully.",
      data: {
        url: url ?? "",
        key: key ?? "",
        brandId: brand.id,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error creating the brand.",
    };
  }
}

export async function attachBrandImage(
  id: string,
  key: string,
): Promise<ServerResponse<any>> {
  try {
    await requireAuth("admin");

    await prisma.brand.update({ where: { id }, data: { imagePath: key } });
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteBrand(id: string): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!
  try {
    await requireAuth("admin");

    const brand = await prisma.brand.delete({
      where: { id },
      select: { imagePath: true },
    });

    await deleteByKey(BUCKET, brand.imagePath);

    return {
      success: true,
      message: "The brand has been delete successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the brand.",
    };
  }
}
