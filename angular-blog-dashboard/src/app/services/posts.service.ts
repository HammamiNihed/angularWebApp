import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  
  constructor(
    private storage: AngularFireStorage,
    private afs: AngularFirestore,
    private toastr: ToastrService,
    private router: Router
  ) {}

  uploadImage(selectedImg: any, postData: any, formStatus:any,id:any) {
    const filePath = `postIMG/${Date.now()}`;
    this.storage.upload(filePath, selectedImg).then(() => {
      console.log('Post Image uploaded successfully');

      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((URL) => {
          postData.postImgPath = URL;
          console.log(postData);

          if(formStatus == 'Edit') {
            this.updateDoc(id, postData);
          } else {
          this.saveData(postData);
          }
        });
    });
  }

  saveData(postData: any) {
    this.afs
      .collection('posts')
      .add(postData)
      .then((docRef) => {
        this.toastr.success('Data Insert successfully');
        this.router.navigate(['/posts']);
      });
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
       map(actions => {
        return actions.map(a => {
           const data = a.payload.doc.data();
           const id = a.payload.doc.id;
 
           return { id,data };
         })
       })
     )
  }

  loadPostById(id:any) {
    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateDoc(id:any, postData:any) {
     this.afs.doc(`posts/${id}`).update(postData).then(() => {
        this.toastr.success('Data Updated successfully');
        this.router.navigate(['/posts']);
    })
  }

  deleteImage(postImgPath: string, id:any) {
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
    this.deleteDoc(id);  
    })
  }

  deleteDoc(id:any) {
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning('Data deleted ..!');
     
  })
  }
}
