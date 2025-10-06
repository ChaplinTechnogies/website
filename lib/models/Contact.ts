import getClientPromise from '../mongodb'
import { ContactFormData } from '../../types/index'

// method to create new contact and his requiest

export async function createContact(data: ContactFormData) {
    const client = await getClientPromise();
    const db = client.db();
    const contacts = db.collection<ContactFormData>("contacts"); // a mongodb collecion of clients

    const res = await contacts.insertOne({
        ...data,
        createdAt: new Date(),
    })

    return res;

}

// method to return all contacts from db

export async function getAllContacts() {
    const client = await getClientPromise();
    const db = client.db()
    const contacts = db.collection<ContactFormData>("contacts");

    return contacts.find({}).toArray();
}


