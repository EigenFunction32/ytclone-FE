import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {ActivatedRoute, Router} from "@angular/router";
import {VideoService} from "../video.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VideoDto} from "../video-dto";
import {TokenStorageService} from "../_services/token-storage.service";

@Component({
  selector: 'app-save-video-details',
  templateUrl: './save-video-details.component.html',
  styleUrls: ['./save-video-details.component.css']
})
export class SaveVideoDetailsComponent implements OnInit {

  saveVideoDetailsForm: FormGroup;
  title: FormControl = new FormControl('');
  description: FormControl = new FormControl('');
  videoStatus: FormControl = new FormControl('');
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = [];
  selectedFile!: File;
  selectedFileName: string | undefined;
  videoId: '';
  fileSelected = false;
  videoUrl!: string;
  thumbnailUrl!: string;

  isLoggedIn = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private videoService: VideoService, private matSnackBar: MatSnackBar, private tokenStorageService: TokenStorageService) {
    this.videoId = this.activatedRoute.snapshot.params['videoId'];
    this.videoService.getVideo(this.videoId).subscribe(data => {
      this.videoUrl = data.videoUrl;
      this.thumbnailUrl = data.thumbnailUrl;
    })
    this.saveVideoDetailsForm = new FormGroup({
      title: this.title,
      description: this.description,
      videoStatus: this.videoStatus,
    })
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      this.router.navigateByUrl('login');
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add tags
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(value: string): void {
    const index = this.tags.indexOf(value);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  onFileSelected(event: Event) {
    // @ts-ignore
    this.selectedFile = event.target.files[0];
    this.selectedFileName = this.selectedFile.name;
    this.fileSelected = true;
  }

  onUpload() {
    this.videoService.uploadThumbnail(this.selectedFile, this.videoId).subscribe(data => {
      console.log(data);
      this.matSnackBar.open("Immagina caricata correttamente", "OK");

    })

  }

  saveVideo() {
const videoMetaData: VideoDto = {
  "id": this.videoId,
  "title": this.saveVideoDetailsForm.get('title')?.value,
  "description": this.saveVideoDetailsForm.get('description')?.value,
  "tags": this.tags,
  "videoStatus": this.saveVideoDetailsForm.get('videoStatus')?.value,
  "videoUrl": this.videoUrl,
  "thumbnailUrl": this.thumbnailUrl
}
this.videoService.saveVideo(videoMetaData).subscribe(data => {
  this.matSnackBar.open("Informazioni video salvate correttamente", "Ok")
})
  }
}
