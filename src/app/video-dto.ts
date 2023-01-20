export interface VideoDto {
  id: string;
  title: string;
  uploadedBy: string;
  uploadedById: string;
  description: string;
  tags: Array<string>;
  videoUrl: string
  videoStatus: string;
  thumbnailUrl: string;
  likeCount: number;
  disLikeCount: number;
  viewCount: number;
}
