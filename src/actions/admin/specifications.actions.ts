"use server";
import { ServerResponse, Specification } from "@/src/interfaces";
import prisma from "@/src/lib/prisma";
import { TypeSpecification } from "@prisma/client";

export async function getSpecifications(): Promise<
  ServerResponse<Specification[]>
> {
  try {
    const specifications = await prisma.specification.findMany();

    return {
      success: true,
      data: specifications,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}

export async function addSpecification(
  name: string,
  type: TypeSpecification,
): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!

  try {
    await prisma.specification.create({
      data: {
        type,
        name,
      },
    });

    return {
      success: true,
      message: `The ${type} specification has been create successfully.`,
    };
  } catch (error) {
    return {
      success: false,
      message: `There was an error creating the ${type} specification.`,
    };
  }
}

export async function deleteSpecification(
  id: string,
): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!
  try {
    await prisma.specification.delete({ where: { id } });

    return {
      success: true,
      message: "The specification has been delete successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the specification.",
    };
  }
}
