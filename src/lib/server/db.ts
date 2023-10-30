import { MONGO_URI } from '$env/static/private';
import { MongoClient } from 'mongodb';

const client = new MongoClient(MONGO_URI);

export const mongo = client.db('pw16');

mongo.collection('challenges').createIndex( { "date": 1 }, { expireAfterSeconds: 120 } )
mongo.collection('sessions').createIndex( { "session": 1 } )
mongo.collection('sessions').createIndex( { "date": 1 }, { expireAfterSeconds: 60 * 24 * 60 * 60 } )
