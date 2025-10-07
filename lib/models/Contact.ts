import getClientPromise from '../mongodb'
import { ContactFormData } from '../../types/index'


export async function createContact(data: ContactFormData) {
    const client = await getClientPromise();
    const db = client.db();
    const contacts = db.collection<ContactFormData>("contacts");

    const res = await contacts.insertOne({
        ...data,
        createdAt: new Date(),
    })

    return res;

}



export async function getAllContacts() {
    const client = await getClientPromise();
    const db = client.db()
    const contacts = db.collection<ContactFormData>("contacts");

    return contacts.find({}).toArray();
}