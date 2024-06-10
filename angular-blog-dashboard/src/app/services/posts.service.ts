import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService
  ) {}

  uploadImage(selectedImg: any, postData: any) {
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('Post Image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          console.log(postData);

          this.saveData(postData);
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data Insert successfully');
      });
  }
}
