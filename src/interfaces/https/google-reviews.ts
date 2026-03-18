export interface GooglePlacesResponse {
  html_attributions: string[];
  result: PlaceResult;
  status: string;
}

export interface PlaceResult {
  rating: number;
  reviews: Review[];
}

export interface Review {
  author_name: string;
  author_url: string;
  language: string;
  original_language: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
  time: number;
  translated: boolean;
}
