"use server";

import { AdminForm, ServerResponse } from "@/src/interfaces";
import { requireAuth } from "@/src/lib";
import prisma from "@/src/lib/prisma";
import { regex } from "@/src/utils/regex";
import { Roles } from "@prisma/client";
import bcrypt from "bcrypt";
import { revalidatePath } from "next/cache";

export async function getAdmins() {
  try {
    await requireAuth("admin");
    const admins = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        lastname: true,
        email: true,
        role: true,
      },
    });
    if (!admins) return { success: false };

    return {
      success: true,
      data: admins,
    };
  } catch (error) {
    return { success: false };
  }
}

export async function createAdmin(
  user: AdminForm,
): Promise<ServerResponse<any>> {
  const { name, lastname, email, password, role } = user;
  //! todo: makes validations!!!!!

  if (!regex.roles.test(role)) return { success: false };
  if (!password) return { success: false };

  try {
    await requireAuth("admin");

    await prisma.user.create({
      data: {
        name,
        lastname,
        email,
        password: bcrypt.hashSync(password, 10),
        role: role as Roles,
      },
    });

    revalidatePath("/dashboard/admins");
    return { success: true };
  } catch (error) {
    return { success: false };
  }
}

export async function deleteAdmin(id: string): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!
  try {
    await requireAuth("admin");

    await prisma.user.delete({ where: { id } });

    revalidatePath("/dashboard/admins");
    return {
      success: true,
      message: "The administrator has been delete successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error deleting the administrator.",
    };
  }
}

export async function editAdmin(
  id: string,
  user: AdminForm,
): Promise<ServerResponse<any>> {
  const { name, lastname, email, role } = user;

  if (!regex.roles.test(role)) return { success: false };

  try {
    await requireAuth("admin");

    await prisma.user.update({
      data: { name, lastname, email, role: role as Roles },
      where: { id },
    });

    revalidatePath("/dashboard/admins");

    return {
      success: true,
      message: "The administrator has been edit successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error editing the administrator.",
    };
  }
}

export async function changeAdminPassword(
  id: string,
  password: string,
): Promise<ServerResponse<any>> {
  //! todo: makes validations!!!!!
  try {
    await requireAuth("admin");

    await prisma.user.update({
      data: { password: bcrypt.hashSync(password, 10) },
      where: { id },
    });

    return {
      success: true,
      message: "The password administrator has been edit successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "There was an error editing the administrator password.",
    };
  }
}
