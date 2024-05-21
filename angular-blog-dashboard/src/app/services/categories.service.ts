import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data:any) {
    this.afs
    .collection('categories')
    .add(data)
    .then((docRef:any) => {
      console.log(docRef);
      this.toastr.success('Data insert successfully ..!');
      /* this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)

      this.afs
        .collection('categories')
        .doc(docRef.id)
        .collection('subcategories')
        .add(subCategoryData)
        .then((docRef1) => {
            this.afs.doc(`categories/${docRef.id}/subcategories/${docRef1.id}`).collection('subsubcategories').add(subCategoryData);
          console.log(docRef1);
        });*/
    })
    .catch((err:any) => {
      console.log(err);
    });

  }
}
