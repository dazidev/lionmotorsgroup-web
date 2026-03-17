module.exports = [
"[project]/src/utils/regex.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "regex",
    ()=>regex
]);
const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    uuidv4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    roles: /^(admin|moderator|user)$/,
    zipcode: /^\d{5}(-\d{4})?$/,
    phoneNumber: /^\+?1?\s*(?:\([2-9]\d{2}\)|[2-9]\d{2})[ .-]?\d{3}[ .-]?\d{4}(?:\s*(?:x|ext\.?|extension)\s*\d{1,5})?$/,
    vin: /^[A-Za-z0-9]{17}$/
};
}),
"[project]/src/actions/admin/admins.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0077998523f40e7bcec39a16fdf1c499f05ac28f87":"getAdmins","40108f3dc9288fa56e47233b2a79e0f98d0922acee":"deleteAdmin","403cadddbd8a5fb479974ab17a558c628ab2d4b330":"createAdmin","6065013d1382910df328dfa1851af984d33a57900d":"editAdmin","607f25a020700684352cb6ef0b333d0acbfb11825a":"changeAdminPassword"},"",""] */ __turbopack_context__.s([
    "changeAdminPassword",
    ()=>changeAdminPassword,
    "createAdmin",
    ()=>createAdmin,
    "deleteAdmin",
    ()=>deleteAdmin,
    "editAdmin",
    ()=>editAdmin,
    "getAdmins",
    ()=>getAdmins
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regex$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/regex.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__ = __turbopack_context__.i("[externals]/bcrypt [external] (bcrypt, cjs, [project]/node_modules/bcrypt)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function getAdmins() {
    try {
        const admins = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.findMany({
            select: {
                id: true,
                name: true,
                lastname: true,
                email: true,
                role: true
            }
        });
        if (!admins) return {
            success: false
        };
        return {
            success: true,
            data: admins
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function createAdmin(user) {
    const { name, lastname, email, password, role } = user;
    //! todo: makes validations!!!!!
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regex$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regex"].roles.test(role)) return {
        success: false
    };
    if (!password) return {
        success: false
    };
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.create({
            data: {
                name,
                lastname,
                email,
                password: __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__["default"].hashSync(password, 10),
                role: role
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/admins");
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function deleteAdmin(id) {
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/admins");
        return {
            success: true,
            message: "The administrator has been delete successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error deleting the administrator."
        };
    }
}
async function editAdmin(id, user) {
    const { name, lastname, email, role } = user;
    if (!__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$regex$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["regex"].roles.test(role)) return {
        success: false
    };
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.update({
            data: {
                name,
                lastname,
                email,
                role: role
            },
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/admins");
        return {
            success: true,
            message: "The administrator has been edit successfully."
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error editing the administrator."
        };
    }
}
async function changeAdminPassword(id, password) {
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].user.update({
            data: {
                password: __TURBOPACK__imported__module__$5b$externals$5d2f$bcrypt__$5b$external$5d$__$28$bcrypt$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f$bcrypt$29$__["default"].hashSync(password, 10)
            },
            where: {
                id
            }
        });
        return {
            success: true,
            message: "The password administrator has been edit successfully."
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error editing the administrator password."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getAdmins,
    createAdmin,
    deleteAdmin,
    editAdmin,
    changeAdminPassword
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getAdmins, "0077998523f40e7bcec39a16fdf1c499f05ac28f87", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createAdmin, "403cadddbd8a5fb479974ab17a558c628ab2d4b330", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteAdmin, "40108f3dc9288fa56e47233b2a79e0f98d0922acee", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(editAdmin, "6065013d1382910df328dfa1851af984d33a57900d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(changeAdminPassword, "607f25a020700684352cb6ef0b333d0acbfb11825a", null);
}),
"[project]/src/actions/admin/leads.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0026a17f26b93086e270b58a37f6b898d951a6f212":"getLeads","40c7b2650ca2534cd3b83408d0aafa24855437f61e":"deleteLead","40cb3c24e759ca7cbc75f6f4be7fc5cb017e91ac24":"setAttend"},"",""] */ __turbopack_context__.s([
    "deleteLead",
    ()=>deleteLead,
    "getLeads",
    ()=>getLeads,
    "setAttend",
    ()=>setAttend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
async function getLeads() {
    try {
        const leads = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].lead.findMany();
        if (!leads) return {
            success: false
        };
        return {
            success: true,
            data: leads
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function setAttend(id) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].lead.update({
            where: {
                id
            },
            data: {
                status: "attended"
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/leads");
        return {
            success: true,
            message: "The status has been updated."
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while changing the status."
        };
    }
}
async function deleteLead(id) {
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].lead.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/leads");
        return {
            success: true,
            message: "The lead has been delete successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error deleting the lead."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getLeads,
    setAttend,
    deleteLead
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getLeads, "0026a17f26b93086e270b58a37f6b898d951a6f212", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(setAttend, "40cb3c24e759ca7cbc75f6f4be7fc5cb017e91ac24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteLead, "40c7b2650ca2534cd3b83408d0aafa24855437f61e", null);
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[project]/src/lib/cloudflare-r2.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "deleteByKey",
    ()=>deleteByKey,
    "deleteMany",
    ()=>deleteMany,
    "r2",
    ()=>r2
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs, [project]/node_modules/@aws-sdk/client-s3)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/dotenv/lib/main.js [app-rsc] (ecmascript)");
;
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$dotenv$2f$lib$2f$main$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["config"])();
const r2 = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["S3Client"]({
    region: "auto",
    endpoint: `https://${process.env.CF_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
    },
    forcePathStyle: true,
    requestChecksumCalculation: "WHEN_REQUIRED",
    responseChecksumValidation: "WHEN_REQUIRED"
});
async function deleteByKey(bucket, key) {
    await r2.send(new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["DeleteObjectCommand"]({
        Bucket: bucket,
        Key: key
    }));
}
async function deleteMany(bucket, keys) {
    if (!keys.length) return;
    await r2.send(new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["DeleteObjectsCommand"]({
        Bucket: bucket,
        Delete: {
            Objects: keys.map((Key)=>({
                    Key
                }))
        }
    }));
}
}),
"[project]/src/utils/format.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "capitalize",
    ()=>capitalize,
    "normalizeToSlug",
    ()=>normalizeToSlug
]);
function capitalize(word) {
    if (!word) return "";
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
function normalizeToSlug(text) {
    return text.toLowerCase().normalize("NFD") // separa acentos
    .replace(/[\u0300-\u036f]/g, "") // elimina acentos
    .replace(/[^a-z0-9]+/g, "-") // reemplaza todo lo no alfanumérico por -
    .replace(/(^-|-$)+/g, ""); // quita guiones al inicio/fin
}
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[project]/src/actions/admin/vehicles.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"405ce3b416946a9dcfb5ab638dd884591bde7beb8f":"getVehicleSlug","40907ae21e1e30a5809b461a018bc5faa47fcef778":"getVehicles","40c48837af26dd66b5dca87cdedc83051705535046":"deleteVehicle","608ac40de894dc55210391bc1c164ee4f8402c4228":"attachVehicleImages","6097cbd47d487a70939f233cf701d1c8201b077ff0":"getVehiclesDetailsByVin","7096c98b36a1df36755594bd8f4ff4b8dd2d444dd0":"createVehicle"},"",""] */ __turbopack_context__.s([
    "attachVehicleImages",
    ()=>attachVehicleImages,
    "createVehicle",
    ()=>createVehicle,
    "deleteVehicle",
    ()=>deleteVehicle,
    "getVehicleSlug",
    ()=>getVehicleSlug,
    "getVehicles",
    ()=>getVehicles,
    "getVehiclesDetailsByVin",
    ()=>getVehiclesDetailsByVin
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2d$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cloudflare-r2.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/format.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs, [project]/node_modules/@aws-sdk/client-s3)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/s3-request-presigner/dist-es/getSignedUrl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);
const BUCKET = process.env.R2_BUCKET;
async function getVehicleSlug(id) {
    try {
        const vehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.findUnique({
            where: {
                id
            },
            select: {
                slug: true,
                shortId: true
            }
        });
        if (!vehicle) throw new Error("Vehicle doesn't exists.");
        const slug = `${vehicle.slug}-${vehicle.shortId}`;
        return {
            success: true,
            data: {
                slug
            }
        };
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error."
        };
    }
}
async function createVehicle(data, specifications, images) {
    const allow = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
        "image/avif"
    ];
    try {
        if (images.length < 5) throw new Error("You need to upload at least 5 images.");
        images.forEach((img, index)=>{
            if (!allow.includes(img.mime)) throw new Error(`Incorrect image type, image ${index + 1}.`);
            if (!img.ext || img.ext.length > 8) throw new Error(`Incorrect image extension, image ${index + 1}.`);
            if (!img.size || img.size > MAX_BYTES) throw new Error(`Incorrect image size, image ${index + 1}.`);
        });
        const exists = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.findUnique({
            where: {
                vin: data.vin
            }
        });
        if (exists) throw new Error("The vehicle has already exists! Duplicate VIN.");
        const brand = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].brand.findUnique({
            where: {
                id: data.brand
            }
        });
        if (!brand) throw new Error("There was an error getting the brand name.");
        const slug = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$format$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizeToSlug"])(`${brand.name}-${data.model}-${data.year}`);
        const vehicle = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.create({
            data: {
                vin: data.vin,
                slug: slug,
                year: Number(data.year),
                brand: {
                    connect: {
                        id: data.brand
                    }
                },
                model: data.model,
                series: data.series,
                doors: Number(data.doors),
                color_ext: data.colorExt,
                color_int: data.colorInt,
                mileage: Number(data.mileage),
                price: Number(data.price),
                status: data.status,
                type: data.type
            }
        });
        const shortId = vehicle.id.replace(/-/g, "").slice(0, 10);
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.update({
            data: {
                shortId: shortId
            },
            where: {
                id: vehicle.id
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleTechnical.create({
            data: {
                vehicle: {
                    connect: {
                        id: vehicle.id
                    }
                },
                engine_fuel_type: data.engineFuelType,
                engine_configuration: data.engineConfiguration,
                engine_cylinders: Number(data.engineCylinders),
                engine_power: Number(data.enginePower),
                engine_displacement: Number(data.engineDisplacement),
                engine_turbo: data.engineTurbo,
                drivetrain: data.drivetrain,
                transmission: data.transmission
            }
        });
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleSpecification.createMany({
            data: specifications.map((s)=>({
                    vehicleId: vehicle.id,
                    specificationId: s
                }))
        });
        const urls = await Promise.all(images.map(async (img)=>{
            const key = `catalog/vehicles/images/${vehicle.id}/${Date.now()}-${crypto.randomUUID()}.${img.ext}`;
            const cmd = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["PutObjectCommand"]({
                Bucket: BUCKET,
                Key: key,
                ContentType: img.mime,
                ContentLength: img.size
            });
            const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSignedUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2d$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r2"], cmd, {
                expiresIn: 600
            });
            return {
                url,
                key
            };
        }));
        return {
            success: true,
            data: {
                urls: urls ?? [],
                vehicleId: vehicle.id
            }
        };
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error instanceof Error ? error.message : "Unknown error"
        };
    }
}
async function attachVehicleImages(id, keys) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleImage.createMany({
            data: keys.map((key, index)=>({
                    vehicleId: id,
                    key: key,
                    position: index
                }))
        });
        return {
            success: true,
            message: "The vehicle has been created successfully!"
        };
    } catch (error) {
        return {
            success: false,
            message: "There was error attaching the images."
        };
    }
}
async function getVehicles(amount) {
    try {
        const vehicles = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.findMany({
            include: {
                brand: true
            }
        });
        if (!vehicles) return {
            success: false
        };
        return {
            success: true,
            data: vehicles
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function deleteVehicle(id) {
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.delete({
            where: {
                id
            }
        });
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/dashboard/catalog");
        return {
            success: true,
            message: "The vehicle has been delete successfully"
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error deleting the vehicle."
        };
    }
}
async function getVehiclesDetailsByVin(vin, year) {
    const formatVin = vin.toUpperCase();
    const url = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${formatVin}?format=json&modelyear=${year}`;
    try {
        const res = await fetch(url, {
            cache: "no-store"
        }).then((response)=>response.json()).catch();
        const data = res.Results[0];
        const payload = {
            general: {
                vin: vin,
                year: data.ModelYear,
                brand: data.Make,
                model: data.Model,
                series: data.Series || data.Trim,
                doors: data.Doors
            },
            technical: {
                fuelType: data.FuelTypePrimary,
                engine: {
                    configuration: data.EngineConfiguration,
                    cylinders: data.EngineCylinders,
                    power: data.EngineHP,
                    displacement: data.DisplacementL,
                    turbo: data.Turbo
                },
                drivetrain: data.DriveType,
                transmission: data.TransmissionStyle
            }
        };
        return {
            success: true,
            data: payload
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getVehicleSlug,
    createVehicle,
    attachVehicleImages,
    getVehicles,
    deleteVehicle,
    getVehiclesDetailsByVin
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVehicleSlug, "405ce3b416946a9dcfb5ab638dd884591bde7beb8f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createVehicle, "7096c98b36a1df36755594bd8f4ff4b8dd2d444dd0", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(attachVehicleImages, "608ac40de894dc55210391bc1c164ee4f8402c4228", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVehicles, "40907ae21e1e30a5809b461a018bc5faa47fcef778", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteVehicle, "40c48837af26dd66b5dca87cdedc83051705535046", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getVehiclesDetailsByVin, "6097cbd47d487a70939f233cf701d1c8201b077ff0", null);
}),
"[project]/src/actions/public/leads.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40e5c51b657f1235b60e5880e63a5283b331ee431d":"saveLead"},"",""] */ __turbopack_context__.s([
    "saveLead",
    ()=>saveLead
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function saveLead(form) {
    const { name, lastname, email, zipcode, phoneNumber, comments, vehicleId } = form;
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].lead.create({
            data: {
                name,
                lastname,
                email,
                zipcode,
                phoneNumber,
                comments,
                vehicleId
            }
        });
        return {
            success: true,
            message: "Your information has been sent successfully. We'll reach out to you as soon as possible. Thank you for your interest!"
        };
    } catch (error) {
        return {
            success: false,
            message: "An error occurred while processing your request. Please try again later."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    saveLead
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(saveLead, "40e5c51b657f1235b60e5880e63a5283b331ee431d", null);
}),
"[project]/src/actions/auth/logout.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"0096f09927161fe0f1ae48be646683dc903d9a0852":"logout"},"",""] */ __turbopack_context__.s([
    "logout",
    ()=>logout
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/auth.config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const logout = async ()=>{
    await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$auth$2e$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["signOut"])();
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    logout
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(logout, "0096f09927161fe0f1ae48be646683dc903d9a0852", null);
}),
"[project]/src/actions/admin/brands.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00d8228e7f70fc48668935ca3cb57bf339bfde141b":"getBrands","4062667782f4e544f92e8e87ee709786bbd656e8a1":"deleteBrand","605f00fc8dd9269ecc174737275b6b03d28e63697d":"addBrand","60f7d229974aa40d39664ac3e5627e040e75f94f42":"attachBrandImage"},"",""] */ __turbopack_context__.s([
    "addBrand",
    ()=>addBrand,
    "attachBrandImage",
    ()=>attachBrandImage,
    "deleteBrand",
    ()=>deleteBrand,
    "getBrands",
    ()=>getBrands
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2d$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/cloudflare-r2.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__ = __turbopack_context__.i("[externals]/@aws-sdk/client-s3 [external] (@aws-sdk/client-s3, cjs, [project]/node_modules/@aws-sdk/client-s3)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@aws-sdk/s3-request-presigner/dist-es/getSignedUrl.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
const MAX_BYTES = Number(process.env.MAX_UPLOAD_BYTES ?? 5_000_000);
const BUCKET = process.env.R2_BUCKET;
async function getBrands() {
    try {
        const brands = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].brand.findMany();
        if (!brands) return {
            success: false
        };
        return {
            success: true,
            data: brands
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function addBrand(name, dataImage) {
    //! todo: makes validations!!!!!
    try {
        const { mime, ext, size } = dataImage;
        //* Image validation
        const allow = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "image/jpg"
        ];
        if (!allow.includes(mime)) throw "";
        if (!ext || ext.length > 8) throw "";
        if (!size || size > MAX_BYTES) throw "";
        const brand = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].brand.create({
            data: {
                name,
                imagePath: ""
            }
        });
        const key = `catalog/brands/images/${brand.id}/${Date.now()}-${crypto.randomUUID()}.${dataImage.ext}`;
        const cmd = new __TURBOPACK__imported__module__$5b$externals$5d2f40$aws$2d$sdk$2f$client$2d$s3__$5b$external$5d$__$2840$aws$2d$sdk$2f$client$2d$s3$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$client$2d$s3$29$__["PutObjectCommand"]({
            Bucket: BUCKET,
            Key: key,
            ContentType: mime
        });
        const url = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$aws$2d$sdk$2f$s3$2d$request$2d$presigner$2f$dist$2d$es$2f$getSignedUrl$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSignedUrl"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2d$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["r2"], cmd, {
            expiresIn: 600
        });
        return {
            success: true,
            message: "The brand has been create successfully.",
            data: {
                url: url ?? "",
                key: key ?? "",
                brandId: brand.id
            }
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error creating the brand."
        };
    }
}
async function attachBrandImage(id, key) {
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].brand.update({
            where: {
                id
            },
            data: {
                imagePath: key
            }
        });
        return {
            success: true
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function deleteBrand(id) {
    //! todo: makes validations!!!!!
    try {
        const brand = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].brand.delete({
            where: {
                id
            },
            select: {
                imagePath: true
            }
        });
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$cloudflare$2d$r2$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteByKey"])(BUCKET, brand.imagePath);
        return {
            success: true,
            message: "The brand has been delete successfully."
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error deleting the brand."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getBrands,
    addBrand,
    attachBrandImage,
    deleteBrand
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getBrands, "00d8228e7f70fc48668935ca3cb57bf339bfde141b", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addBrand, "605f00fc8dd9269ecc174737275b6b03d28e63697d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(attachBrandImage, "60f7d229974aa40d39664ac3e5627e040e75f94f42", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteBrand, "4062667782f4e544f92e8e87ee709786bbd656e8a1", null);
}),
"[project]/src/actions/admin/specifications.actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00db37082917c02d6bcfc1bd0ac473bfcee5549ae6":"getSpecifications","401fd4fca22bf77669d9e98aba61741bec611fd44c":"deleteSpecification","600375cac8a6368856a97d4d73453240a51335ea72":"addSpecification"},"",""] */ __turbopack_context__.s([
    "addSpecification",
    ()=>addSpecification,
    "deleteSpecification",
    ()=>deleteSpecification,
    "getSpecifications",
    ()=>getSpecifications
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function getSpecifications() {
    try {
        const specifications = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].specification.findMany();
        return {
            success: true,
            data: specifications
        };
    } catch (error) {
        return {
            success: false
        };
    }
}
async function addSpecification(name, type) {
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].specification.create({
            data: {
                type,
                name
            }
        });
        return {
            success: true,
            message: "The security specification has been create successfully."
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error creating the security specification."
        };
    }
}
async function deleteSpecification(id) {
    //! todo: makes validations!!!!!
    try {
        await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].specification.delete({
            where: {
                id
            }
        });
        return {
            success: true,
            message: "The specification has been delete successfully."
        };
    } catch (error) {
        return {
            success: false,
            message: "There was an error deleting the specification."
        };
    }
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getSpecifications,
    addSpecification,
    deleteSpecification
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSpecifications, "00db37082917c02d6bcfc1bd0ac473bfcee5549ae6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(addSpecification, "600375cac8a6368856a97d4d73453240a51335ea72", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSpecification, "401fd4fca22bf77669d9e98aba61741bec611fd44c", null);
}),
"[project]/src/components/index.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DefaultButton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$button$2f$DefaultButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["DefaultButton"],
    "ErrorDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2f$ErrorDialog$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ErrorDialog"],
    "Grid",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$grid$2f$Grid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Grid"],
    "SelectInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$input$2f$SelectInput$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SelectInput"],
    "Skeleton",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$loading$2f$Skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Skeleton"],
    "SuccessDialog",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2f$SuccessDialog$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["SuccessDialog"],
    "TextInput",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$input$2f$TextInput$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TextInput"],
    "TopNav",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$topNav$2f$TopNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TopNav"],
    "TopNavPublic",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$topNav$2f$TopNavPublic$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TopNavPublic"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$topNav$2f$TopNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/private/dashboard/topNav/TopNav.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$table$2f$Table$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/private/dashboard/table/Table.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$table$2d$lead$2f$LeadsTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/private/dashboard/table-lead/LeadsTable.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$catalog$2f$table$2f$CatalogTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/private/dashboard/catalog/table/CatalogTable.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$carousel$2f$Carousel$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/carousel/Carousel.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$carousel$2f$CarouselVehicleImages$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/carousel/CarouselVehicleImages.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$topNav$2f$TopNavPublic$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/topNav/TopNavPublic.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$catalog$2f$VehicleCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/catalog/VehicleCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$formAvailability$2f$FormAvailability$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/formAvailability/FormAvailability.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$grid$2f$Grid$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/grid/Grid.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2f$ErrorDialog$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog/ErrorDialog.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$dialog$2f$SuccessDialog$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/dialog/SuccessDialog.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$button$2f$CloseButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/button/CloseButton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$button$2f$DefaultButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/button/DefaultButton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$loading$2f$Skeleton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/loading/Skeleton.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$input$2f$SelectInput$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/input/SelectInput.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$input$2f$TextInput$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/input/TextInput.tsx [app-rsc] (ecmascript)");
__turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$table$2f$Table$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$table$2d$lead$2f$LeadsTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$catalog$2f$table$2f$CatalogTable$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$carousel$2f$Carousel$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$carousel$2f$CarouselVehicleImages$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$catalog$2f$VehicleCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$formAvailability$2f$FormAvailability$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__), __turbopack_context__.j(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$button$2f$CloseButton$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__);
}),
"[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"404f350bd1408d3e48b4b9ca187316b4b726b53291":"InformationCard"},"",""] */ __turbopack_context__.s([
    "InformationCard",
    ()=>InformationCard
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-icons/gi/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
function isDataText(item) {
    return "value" in item;
}
function isDataTag(item) {
    return "id" in item && "type" in item;
}
const InformationCard = async ({ title, data, type, specificationType })=>{
    const style = type === "text" ? "grid py-5 gap-3 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]" : "flex flex-wrap gap-3";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "flex flex-col my-5 gap-3 bg-stone-900 p-5 rounded-2xl",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-3xl font-bold text-gold-500",
                children: title
            }, void 0, false, {
                fileName: "[project]/src/components/public/card/InformationCard.tsx",
                lineNumber: 34,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "block w-full h-px bg-gray-500/70"
            }, void 0, false, {
                fileName: "[project]/src/components/public/card/InformationCard.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: style,
                children: [
                    type === "text" && data.map((item)=>{
                        if (isDataText(item)) {
                            const { name, value } = item;
                            if (value) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex justify-between border-b border-b-gray-500/70 pb-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-gray-500/70",
                                            children: name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/card/InformationCard.tsx",
                                            lineNumber: 47,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-bold",
                                            children: value
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/card/InformationCard.tsx",
                                            lineNumber: 48,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, name, true, {
                                    fileName: "[project]/src/components/public/card/InformationCard.tsx",
                                    lineNumber: 43,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            }
                        }
                    }),
                    type === "tag" && data.map((item)=>{
                        if (isDataTag(item)) {
                            const { id, name, type } = item;
                            if (type === specificationType) {
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "flex w-auto flex-row gap-3 items-center text-gold-500 bg-zinc-800/80 py-1 px-4 border border-gray-200/20 rounded-2xl",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$icons$2f$gi$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["GiCheckMark"], {
                                            size: 16
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/card/InformationCard.tsx",
                                            lineNumber: 65,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "",
                                            children: name
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/public/card/InformationCard.tsx",
                                            lineNumber: 66,
                                            columnNumber: 21
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, id, true, {
                                    fileName: "[project]/src/components/public/card/InformationCard.tsx",
                                    lineNumber: 61,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0));
                            }
                        }
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/public/card/InformationCard.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/public/card/InformationCard.tsx",
        lineNumber: 33,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    InformationCard
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(InformationCard, "404f350bd1408d3e48b4b9ca187316b4b726b53291", null);
}),
"[project]/src/app/(public)/catalog/[id]/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40018c27aa3fb1b32981534213abe2f705e045df0f":"default"},"",""] */ __turbopack_context__.s([
    "default",
    ()=>CatalogVehicleIdPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/index.ts [app-rsc] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/index.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
;
async function CatalogVehicleIdPage({ params }) {
    const { id } = await params;
    const lastDashIndex = id.lastIndexOf("-");
    const slug = id.slice(0, lastDashIndex);
    const shortId = id.slice(lastDashIndex + 1);
    const vehicleData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].vehicleGeneral.findUnique({
        where: {
            slug,
            shortId
        },
        include: {
            brand: true,
            technical: true,
            images: true,
            specifications: {
                include: {
                    specification: true
                }
            }
        }
    });
    if (!vehicleData) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            children: "not found"
        }, void 0, false, {
            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
            lineNumber: 35,
            columnNumber: 9
        }, this)
    }, void 0, false);
    const milesFormat = new Intl.NumberFormat("en-US").format(vehicleData.mileage);
    const priceFormat = new Intl.NumberFormat("en-US").format(vehicleData.price);
    const images = Object.values(vehicleData.images).map(({ key })=>key);
    const generalData = [
        {
            name: "VIN",
            value: vehicleData.vin
        },
        {
            name: "Brand",
            value: vehicleData.brand.name
        },
        {
            name: "Model",
            value: vehicleData.model
        },
        {
            name: "Year",
            value: vehicleData.year
        },
        {
            name: "Series",
            value: vehicleData.series
        },
        {
            name: "Doors",
            value: vehicleData.doors
        },
        {
            name: "Exterior color",
            value: vehicleData.color_ext
        },
        {
            name: "Interior color",
            value: vehicleData.color_int
        },
        {
            name: "Type",
            value: vehicleData.type
        }
    ];
    const technicalData = [
        {
            name: "Fuel type",
            value: vehicleData.technical?.engine_fuel_type
        },
        {
            name: "Configuration",
            value: vehicleData.technical?.engine_configuration
        },
        {
            name: "Cylinders",
            value: vehicleData.technical?.engine_cylinders
        },
        {
            name: "Power",
            value: `${vehicleData.technical?.engine_power} HP`
        },
        {
            name: "Displacement",
            value: `${vehicleData.technical?.engine_displacement} L`
        },
        {
            name: "Turbo",
            value: vehicleData.technical?.engine_turbo
        },
        {
            name: "Drivetrain",
            value: vehicleData.technical?.drivetrain
        },
        {
            name: "Transmission",
            value: vehicleData.technical?.transmission
        }
    ];
    const specificationData = vehicleData.specifications.map(({ specification })=>({
            id: specification.id,
            name: specification.name,
            type: specification.type
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-row w-full items-start pt-5 overflow-hidden gap-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-8 min-w-0 text-xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["CarouselVehicleImages"], {
                            images: images
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 86,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InformationCard"], {
                            title: "General Information",
                            type: "text",
                            data: generalData
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 87,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InformationCard"], {
                            title: "Technical Information",
                            type: "text",
                            data: technicalData
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 92,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InformationCard"], {
                            title: "Security Specifications",
                            type: "tag",
                            data: specificationData,
                            specificationType: "security"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 97,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InformationCard"], {
                            title: "Confort Specifications",
                            type: "tag",
                            data: specificationData,
                            specificationType: "confort"
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 103,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                    lineNumber: 85,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-4 min-w-0 flex flex-col gap-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-full h-auto bg-stone-900 rounded-2xl text-center gap-5 p-5",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-5",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-3xl",
                                            children: `${vehicleData.year} ${vehicleData.brand.name.toUpperCase()}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                            lineNumber: 113,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-5xl font-bold",
                                            children: `${vehicleData.model.toUpperCase()}`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                            lineNumber: 116,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-2xl",
                                            children: `${milesFormat} miles`
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                            lineNumber: 117,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "block w-full h-px bg-gray-300"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                    lineNumber: 119,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "py-5",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "flex justify-between text-4xl font-bold",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Price"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                                lineNumber: 122,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-gold-500",
                                                children: `$${priceFormat}`
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                                lineNumber: 123,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                        lineNumber: 121,
                                        columnNumber: 15
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 111,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$index$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["FormAvailability"], {
                            vehicleId: vehicleData.id
                        }, void 0, false, {
                            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                            lineNumber: 127,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
                    lineNumber: 110,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/(public)/catalog/[id]/page.tsx",
            lineNumber: 84,
            columnNumber: 7
        }, this)
    }, void 0, false);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    CatalogVehicleIdPage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(CatalogVehicleIdPage, "40018c27aa3fb1b32981534213abe2f705e045df0f", null);
}),
"[project]/.next-internal/server/app/(public)/catalog/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/components/private/dashboard/topNav/TopNav.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/admin/admins.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/actions/admin/leads.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/actions/admin/vehicles.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/src/actions/public/leads.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/src/actions/auth/logout.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/src/actions/admin/brands.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/src/actions/admin/specifications.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/src/app/(public)/catalog/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE9 => \"[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$topNav$2f$TopNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/private/dashboard/topNav/TopNav.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/admins.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/leads.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/vehicles.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$public$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/public/leads.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2f$logout$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/auth/logout.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/brands.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$specifications$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/specifications.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$catalog$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(public)/catalog/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
}),
"[project]/.next-internal/server/app/(public)/catalog/[id]/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/components/private/dashboard/topNav/TopNav.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/src/actions/admin/admins.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/src/actions/admin/leads.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE3 => \"[project]/src/actions/admin/vehicles.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE4 => \"[project]/src/actions/public/leads.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE5 => \"[project]/src/actions/auth/logout.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE6 => \"[project]/src/actions/admin/brands.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE7 => \"[project]/src/actions/admin/specifications.actions.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE8 => \"[project]/src/app/(public)/catalog/[id]/page.tsx [app-rsc] (ecmascript)\", ACTIONS_MODULE9 => \"[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "008c7c3f44eccd2318285dd9c268140283bcb6c74b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$topNav$2f$TopNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["TopNav"],
    "0096f09927161fe0f1ae48be646683dc903d9a0852",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2f$logout$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["logout"],
    "00d8228e7f70fc48668935ca3cb57bf339bfde141b",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getBrands"],
    "00db37082917c02d6bcfc1bd0ac473bfcee5549ae6",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$specifications$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSpecifications"],
    "40018c27aa3fb1b32981534213abe2f705e045df0f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$catalog$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"],
    "40108f3dc9288fa56e47233b2a79e0f98d0922acee",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteAdmin"],
    "401fd4fca22bf77669d9e98aba61741bec611fd44c",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$specifications$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteSpecification"],
    "403cadddbd8a5fb479974ab17a558c628ab2d4b330",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdmin"],
    "404f350bd1408d3e48b4b9ca187316b4b726b53291",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["InformationCard"],
    "405ce3b416946a9dcfb5ab638dd884591bde7beb8f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVehicleSlug"],
    "4062667782f4e544f92e8e87ee709786bbd656e8a1",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteBrand"],
    "40c48837af26dd66b5dca87cdedc83051705535046",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteVehicle"],
    "40c7b2650ca2534cd3b83408d0aafa24855437f61e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteLead"],
    "40cb3c24e759ca7cbc75f6f4be7fc5cb017e91ac24",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["setAttend"],
    "40e5c51b657f1235b60e5880e63a5283b331ee431d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$public$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["saveLead"],
    "600375cac8a6368856a97d4d73453240a51335ea72",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$specifications$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addSpecification"],
    "605f00fc8dd9269ecc174737275b6b03d28e63697d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["addBrand"],
    "6065013d1382910df328dfa1851af984d33a57900d",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["editAdmin"],
    "607f25a020700684352cb6ef0b333d0acbfb11825a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["changeAdminPassword"],
    "608ac40de894dc55210391bc1c164ee4f8402c4228",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["attachVehicleImages"],
    "6097cbd47d487a70939f233cf701d1c8201b077ff0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getVehiclesDetailsByVin"],
    "60f7d229974aa40d39664ac3e5627e040e75f94f42",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["attachBrandImage"],
    "7096c98b36a1df36755594bd8f4ff4b8dd2d444dd0",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createVehicle"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f28$public$292f$catalog$2f5b$id$5d2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$topNav$2f$TopNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$admin$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE3__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE4__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$public$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE5__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$auth$2f$logout$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE6__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE7__$3d3e$__$225b$project$5d2f$src$2f$actions$2f$admin$2f$specifications$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE8__$3d3e$__$225b$project$5d2f$src$2f$app$2f28$public$292f$catalog$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE9__$3d3e$__$225b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/(public)/catalog/[id]/page/actions.js { ACTIONS_MODULE0 => "[project]/src/components/private/dashboard/topNav/TopNav.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/src/actions/admin/admins.actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/src/actions/admin/leads.actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE3 => "[project]/src/actions/admin/vehicles.actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE4 => "[project]/src/actions/public/leads.actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE5 => "[project]/src/actions/auth/logout.ts [app-rsc] (ecmascript)", ACTIONS_MODULE6 => "[project]/src/actions/admin/brands.actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE7 => "[project]/src/actions/admin/specifications.actions.ts [app-rsc] (ecmascript)", ACTIONS_MODULE8 => "[project]/src/app/(public)/catalog/[id]/page.tsx [app-rsc] (ecmascript)", ACTIONS_MODULE9 => "[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$private$2f$dashboard$2f$topNav$2f$TopNav$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/private/dashboard/topNav/TopNav.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$admins$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/admins.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/leads.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$vehicles$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/vehicles.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$public$2f$leads$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/public/leads.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$auth$2f$logout$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/auth/logout.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$brands$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/brands.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$actions$2f$admin$2f$specifications$2e$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/actions/admin/specifications.actions.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f28$public$292f$catalog$2f5b$id$5d2f$page$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/(public)/catalog/[id]/page.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$public$2f$card$2f$InformationCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/public/card/InformationCard.tsx [app-rsc] (ecmascript)");
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bc5dc21d._.js.map