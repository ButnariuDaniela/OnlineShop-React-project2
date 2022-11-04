export class PhotoService {
  getImages() {
    return fetch("http://localhost:3000/data/photos.json")
      .then((res) => res.json())
      .then((d) => d.data);
  }
}
