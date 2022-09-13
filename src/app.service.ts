import { Injectable } from '@nestjs/common';
import { isNumber } from 'class-validator';
import * as FirebaseAdmin from 'firebase-admin';
import { merge } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async updateUser(updateItem: UpdateUserDto): Promise<UpdateUserDto> {

    const { id } = updateItem;

    const firestoreInstance = new FirebaseAdmin.firestore.Firestore();

    const userDocRef = firestoreInstance.collection('users').doc(id);

    if (!userDocRef) {
      
      await firestoreInstance.collection('users').doc(id).set(updateItem);
    
    } else {
      
      const existingDocument = (await userDocRef.get()).data();

      for (var incomingProp in updateItem) {

        for (var existingProp in existingDocument) {
          
          if (existingProp === incomingProp) {
            
            if (isNumber(existingDocument[existingProp])) {
              // if we just want to replace value (= instead +=), line should looks like:
              // existingDocument[existingProp] = updateItem[incomingProp]; 
              // btw, we could fully skip if/else statement and leave just else body
              existingDocument[existingProp] += +updateItem[incomingProp];
            } else {
              existingDocument[existingProp] = updateItem[incomingProp];
            }
          }
        }

        await userDocRef.set({ ...updateItem, ...existingDocument });
      }
    }

    return updateItem;
  }

  async deleteUser(id: string) {

    const firestoreInstance = new FirebaseAdmin.firestore.Firestore();

    const res = await firestoreInstance.collection('users').doc(id).delete();

    return res;
  }
}
