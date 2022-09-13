import { Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AppService {

  async getUserById(id: string) {

    const firestoreInstance = new FirebaseAdmin.firestore.Firestore();

    const doc = await firestoreInstance.collection('users').where('id', '==', id).get();

    return doc.docs.map(doc => doc.data());

  }

  async getAllUsers(): Promise<any> {

    const firestoreInstance = new FirebaseAdmin.firestore.Firestore();

    const res = await firestoreInstance.collection('users').get();

    return res.docs.map(doc => doc.data());
  }

  async addUser(item: CreateUserDto): Promise<CreateUserDto> {

    const { id } = item;

    const firestoreInstance = new FirebaseAdmin.firestore.Firestore();

    await firestoreInstance.collection('users').doc(id).set(item);

    return item;
  }

  async deleteUser(id: string) {

    const firestoreInstance = new FirebaseAdmin.firestore.Firestore();

    const res = await firestoreInstance.collection('users').doc(id).delete();

    return res;
  }
}
