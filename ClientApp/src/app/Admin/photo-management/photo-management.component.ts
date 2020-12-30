import { Component, OnInit } from '@angular/core';
import { Photo } from '../../_models/photo';
import { AdminService } from '../../_services/admin.service';
import { ConfirmService } from '../../_services/confirm.service';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
  photosForApproval: Photo[] = [];
  photosUsername: string;

  constructor(private adminService: AdminService, private confirmService: ConfirmService) { }

  ngOnInit(): void {
    this.getPhotosForApproval();
  }

  getPhotosForApproval() {
    this.adminService.getPhotosForApproval().subscribe(result => {
      this.photosForApproval = result;
      //if the return is null, reset the array to new zero-length array
      if (this.photosForApproval == null) {
        this.photosForApproval = [];
      }
    });
  }

  approvePhoto(photoId: number) {
    this.confirmService.confirm("Confirm approve photo", "This cannot be undone", "Confirm", "Cancel").subscribe(result => {
      if (result) {
        this.adminService.approvePhoto(photoId).subscribe(() => {
          this.getPhotosForApproval();
        });
      }
    });
  }

  rejectPhoto(photoId: number) {
    this.confirmService.confirm("Confirm reject photo", "This cannot be undone", "Confirm", "Cancel").subscribe(result => {
      if (result) {
        this.adminService.rejectPhoto(photoId).subscribe(() => {
          this.photosForApproval.splice(this.photosForApproval.findIndex(m => m.id === photoId), 1);
          this.getPhotosForApproval();
        })
      }
    });
  }
}
