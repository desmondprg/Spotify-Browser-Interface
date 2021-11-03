import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ArtistData } from '../data/artist-data';
import { AlbumData } from '../data/album-data';
import { TrackData } from '../data/track-data';
import { ResourceData } from '../data/resource-data';
import { ProfileData } from '../data/profile-data';
import { TrackFeature } from '../data/track-feature';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
	expressBaseUrl:string = 'http://localhost:8888';

  constructor(private http:HttpClient) { }

  private sendRequestToExpress(endpoint:string):Promise<any> {
    //TODO: use the injected http Service to make a get request to the Express endpoint and return the response.
    //the http service works similarly to fetch(). It may be useful to call .toPromise() on any responses.
    //update the return to instead return a Promise with the data from the Express server
    var final = this.http.get(this.expressBaseUrl + endpoint).toPromise();
    return final;
    //return Promise.resolve(final);
  }

  aboutMe():Promise<ProfileData> {
    //This line is sending a request to express, which returns a promise with some data. We're then parsing the data 
    return this.sendRequestToExpress('/me').then((data) => {
    return new ProfileData(data);
    });
  }

  searchFor(category:string, resource:string):Promise<ResourceData[]> {
    //TODO: identify the search endpoint in the express webserver (routes/index.js) and send the request to express.
    //Make sure you're encoding the resource with encodeURIComponent().
    //Depending on the category (artist, track, album), return an array of that type of data.
    //JavaScript's "map" function might be useful for this, but there are other ways of building the array.
    
    var encode = encodeURIComponent(resource);
    return this.sendRequestToExpress('/search/' + category + '/' + encode).then((data)=>{ 
      
      if(category == 'artist') {
        var result = data['artists']['items'].map((artist) => {
          return new ArtistData(artist);
        });

      }

      else if (category == 'track') {
        var result = data['tracks']['items'].map((track) => {
          return new TrackData(track);
        });

      }

      else if (category == 'album') {
        var result = data['albums']['items'].map((album) => {
            return new AlbumData(album);
        });

      }
      
      return result;

  });
}


  getArtist(artistId:string):Promise<ArtistData> {
    //TODO: use the artist endpoint to make a request to express.
    //Again, you may need to encode the artistId.
    var encode = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist/' + encode).then((data)=>{ 
        return new ArtistData(data);
      });


  }

  getRelatedArtists(artistId:string):Promise<ArtistData[]> {
    var encode = encodeURIComponent(artistId);
    return this.sendRequestToExpress('/artist-related-artists/' + encode ).then((data)=>{ 
      var result = data['artists'].map((artist) => {
        return new ArtistData(artist);
      });
      return result;
      });

  }

  getTopTracksForArtist(artistId:string):Promise<TrackData[]> {
    //TODO: use the top tracks endpoint to make a request to express.
    var encode = encodeURIComponent(artistId);
    // return this.sendRequestToExpress('/artist/' + encode + '/top-tracks').then((data)=>{ 
    return this.sendRequestToExpress('/artist-top-tracks/' + encode).then((data) => {
      var result = data['tracks'].map((track) => {
        return new TrackData(track);
      });
      return result;
      });
  }

  getAlbumsForArtist(artistId:string):Promise<AlbumData[]> {
    //TODO: use the albums for an artist endpoint to make a request to express.
    var encode = encodeURIComponent(artistId);
    // return this.sendRequestToExpress('/artists/' + encode + '/albums').then((data)=>{ 
    return this.sendRequestToExpress('/artist-albums/' + encode).then((data) => {
      var result = data['items'].map((album) => {
        return new AlbumData(album);
      });
      return result;
      });
  }

  getAlbum(albumId:string):Promise<AlbumData> {
    //TODO: use the album endpoint to make a request to express.
    var encode = encodeURIComponent(albumId);
    // return this.sendRequestToExpress('/albums/' + encode).then((data)=>{ 
    return this.sendRequestToExpress('/album/' + encode).then((data) => {
        return new AlbumData(data);
      });

  }

  getTracksForAlbum(albumId:string):Promise<TrackData[]> {
    //TODO: use the tracks for album endpoint to make a request to express.
    var encode = encodeURIComponent(albumId);
    // return this.sendRequestToExpress('/albums/' + encode + '/tracks').then((data)=>{ 
    return this.sendRequestToExpress('/album-tracks/' + encode).then((data) => {
      var result = data['items'].map((album) => {
        return new TrackData(album);
      });
      return result;
      });
  }

  getTrack(trackId:string):Promise<TrackData> {
    //TODO: use the track endpoint to make a request to express.
    var encode = encodeURIComponent(trackId);
    // return this.sendRequestToExpress('/tracks/' + encode).then((data)=>{ 
      return this.sendRequestToExpress('/track/' + encode).then((data)=>{ 
        return new TrackData(data);
      });
  }

  getAudioFeaturesForTrack(trackId:string):Promise<TrackFeature[]> {
    //TODO: use the audio features for track endpoint to make a request to express.
    var encode = encodeURIComponent(trackId);
    return this.sendRequestToExpress('/track-audio-features/' + encode).then((data) => {
      var result = [];
      result.push(new TrackFeature('danceability', data['danceability']));
      result.push(new TrackFeature('energy', data['energy']));
      result.push(new TrackFeature('speechiness', data['speechiness']));
      result.push(new TrackFeature('acousticness', data['acousticness']));
      result.push(new TrackFeature('instrumentalness', data['instrumentalness']));
      result.push(new TrackFeature('liveness', data['liveness']));
      result.push(new TrackFeature('valence', data['valence']));
      return result;
    });
  }
}
