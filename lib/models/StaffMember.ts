import getClientPromise from '../mongodb'
import { z } from 'zod'
import {
    staffMemberSchema,
    staffMemberOutScheme,
    staffMemberPasswordSchema,
    staffMemberQuerySchema,
    staffMemberSelfUpdateSchema,
    staffMemberUpdateSchema,
    loginSchema
} from '@/app/schemas/user.schema'


import { logger } from '@/lib/logger'
import bcrypt from 'bcryptjs';
import { createAccessToken, createRefreshToken } from '@/app/utils/jwt'


// post staff member

export async function createStaffMember(staffMember: z.infer<typeof staffMemberSchema>) {

    const parsed = staffMemberSchema.parse(staffMember);

    const client = await getClientPromise();

    const db = client.db()

    const existing = await db.collection("staff_members").findOne({
        $or: [
            { email: parsed.email }, { phone: parsed.phone }
        ]
    });

    if (existing) {
        throw new Error("A staff member with this email or phone number already registred");
    }

    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    const staffToInsert = {
        ...parsed,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    const res = await db.collection("staff_members").insertOne(staffToInsert);
    return res;
}


// get staffMember

export async function getStaffMemberOut(id: string) {
    const client = await getClientPromise();

    const db = client.db();

    const staff = await db.collection("staff_members").findOne({ id });

    if (!staff) {
        throw new Error("Staff member not found")
    }

    const staffMember: z.infer<typeof staffMemberOutScheme> = staffMemberOutScheme.parse(staff);

    return staffMember;
}

// get all members

export async function getStaffMembersOut() {
    const client = await getClientPromise();

    const db = client.db()

    const staffList = await db.collection("staff_members").find({}).toArray();

    return staffList.map(staff => staffMemberOutScheme.parse(staff)) || [];
}

// update staff member

export async function updateStaffMember(id: string, 
    data: z.infer<typeof staffMemberUpdateSchema>) {
    
    const parsed = staffMemberUpdateSchema.parse(data);
    const client = await getClientPromise();

    const db = client.db();

    const existing = db.collection("staff_members").findOne({ id });

    if (!existing) {
        throw new Error("Staff not found!");
    }
    await db.collection("staff_members").updateOne({ id }, { $set: { ...parsed, updatedAt: new Date() } });
    const updatedStaff: z.infer<typeof updateStaffMember> = await db.collection("staff_members").findOne({ id });
    if (!updatedStaff) {
        throw new Error("Staff Member Not Found!")
    }
    const m = staffMemberOutScheme.parse(updatedStaff)
    return {m};
}

// staff self update

export async function selfUpdateStaffMember(id:string, 
    data: z.infer<typeof staffMemberSelfUpdateSchema>) {
    const parsed = staffMemberSelfUpdateSchema.parse(data);
    const client = await getClientPromise();
    const db = client.db();
    const existing = await db.collection("staff_members").findOne({ id });
    if(!existing) {
        throw new Error("Staff Member Not Found");
    }
    await db.collection("staff_members").updateOne({ id }, {$set: { ...parsed, updatedAt: new Date() }})
    const updatedStaff = await db.collection("staff_members").findOne({ id });
    if(!updatedStaff){
        throw new Error ("Staff member not found");
    }
    return staffMemberOutScheme.parse(updatedStaff);
}

// update staff password

export async function updateStaffPassword(id: string, data: z.infer<typeof staffMemberPasswordSchema>) {
    const parsed = staffMemberPasswordSchema.parse(data);
    const client = await getClientPromise();
    const db = client.db()

    const existing = await db.collection("staff_members").findOne({ id });
    if(!existing) {
        throw new Error("Staff Member Not Found!");
    }
    const hashedPassword = await bcrypt.hash(parsed.password, 10);
    await db.collection("staff_members").updateOne({ id }, {$set: {password: hashedPassword, updatedAt: new Date()}})
    return {message: "Password Updated well"};
}

// Staff Member Filtering

export async function staffMemberQuery(query: z.infer<typeof staffMemberQuerySchema>) {
    const parsed = staffMemberQuerySchema.parse(query);
    const client = await getClientPromise();
    const db = client.db();

    const filter: any = {};
    if(parsed.role) filter.role = parsed.role;
    if(typeof parsed.isActive==="boolean") filter.isActive = parsed.isActive;
    if(parsed.search) {
        filter.$or = [
            {names: { $regex: parsed.search, $options: 'i' }},
            {email: {$regex: parsed.search, $options: 'i'}}
        ]
    }

    const staffList = await db.collection('staff_members').find(filter).toArray();


  return staffList.map(staff => staffMemberOutScheme.parse(staff));
}

// Staff Member Login

export async function loginStaff(input: unknown) {
    const parsed = loginSchema.parse(input);

    const client = await getClientPromise();

    const db = client.db();

    const staff = await db.collection("staff_members").findOne({ email: parsed.email });
    if(!staff) throw new Error ("Invalid Email or Password");

    const passwordMatch  = await bcrypt.compare(parsed.password, staff.password);
    if (!passwordMatch) throw new Error ("Invalid Email or Password");

    const accessToken = createAccessToken({id: staff.id, role: staff.role});
    const refreshToken = createRefreshToken({ id: staff.id, role: staff.role })

    return { accessToken, refreshToken }

}        