import db from '../configs/database.config.ts';
import { FieldPacket, RowDataPacket } from 'mysql2';
import { notFoundError } from "../errors/customError.ts";
import { JwtPayload } from 'jsonwebtoken';

export const GetPerrmission : ( userId : string | JwtPayload ) => Promise<string[]> = async( userId : string | JwtPayload ) => {
    try {
        const isExistUser : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT userId FROM users WHERE userId = ?", [userId] );
        if ( !isExistUser[0] || isExistUser[0]?.length == 0 ) {
            throw new notFoundError("User not found");
        }
        const isExistUserRole : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT roleId FROM user_roles WHERE userId = ?", [userId]);
        if ( !isExistUserRole[0] || isExistUserRole[0]?.length == 0 ) {
            throw new notFoundError("User's role not found");
        }
        const roles : RowDataPacket[] = isExistUserRole[0];
        const rolesOfUser : Promise<Number>[] = roles.map( async( role : RowDataPacket ) => {
            const isExistRole : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT roleId FROM roles WHERE roleId = ?", [ role.roleId] );
            if ( !isExistRole[0] || isExistRole[0]?.length == 0 ) {
                throw new notFoundError("Role not found");
            }
            return isExistRole[0][0].roleId;
        } )

        const isExistPermissions : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT permissionId FROM role_permissions WHERE roleId IN (?)", [ rolesOfUser ]);
        if ( !isExistPermissions[0] || isExistPermissions[0]?.length == 0 ) {
            throw new notFoundError("Permissions not found");
        }
        const permissions : RowDataPacket[] = isExistPermissions[0];
        const permissionsOfRole : Promise<string>[] = permissions.map( async( permission : RowDataPacket ) => {
            const isExistPermission : [ RowDataPacket[], FieldPacket[] ] = await db.query("SELECT permissionId, permissionName FROM permissions WHERE permissionId = ?", [ permission.permissionId] );
            if ( !isExistPermission[0] || isExistPermission[0]?.length == 0 ) {
                throw new notFoundError("Permission not found");
            }
            return isExistPermission[0][0].permissionName;
        } )

        return Promise.all( permissionsOfRole );
        

    } catch ( error : unknown ) {
        throw error
    }
}