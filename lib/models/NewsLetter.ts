import getClientPromise  from "../mongodb";

import  { NewsletterSubscribe } from '../../types/index'
import logger from "../logger";

export async function addSubscriber(subscriber: NewsletterSubscribe) {
    const client = await getClientPromise();
    const db = client.db() // later here will be an original db name
    const collecion = db.collection<NewsletterSubscribe>("subscribers");

    // to check if email is already subscribed
    const existing = await collecion.findOne({ email: subscriber.email });
    if (existing) {
        logger.info("You have already subscribed !", { email: existing.email });
    }

    const res = await collecion.insertOne(subscriber)
    return res;

}

export async function getAllSubscribers() {
  try {
    const client = await getClientPromise();
    const db = client.db();
    const subscribers = await db
      .collection<NewsletterSubscribe>("subscribers")
      .find({})
      .toArray();

    if (subscribers.length === 0) {
      logger.warn("No subscribers found");
    }

    return subscribers;
  } catch (error) {
    logger.error("Failed to fetch subscribers", { error });
    return [];
  }
}


