export interface IPlayer {
  name: string;
  points: number;
}

export interface ISection {
  [key: string]: IBlock[];
}

export interface IBlock {
  points: number;
  authorName: string | null;
  trackName: string | null;
  trackID: string | null;
  previewUrl: string | null;
  winner: string | null;
}

export interface Profile {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: {
    url: string;
    height: number;
    width: number;
  }[];
  product: string;
  type: string;
  uri: string;
  error?: {
    message: string;
    status: number;
  };
}

// Search type

export interface ISearch {
  tracks: Tracks;
  artists: Artists;
  albums: Albums;
  playlists: Playlists;
  shows: Shows;
  episodes: Episodes;
  audiobooks: Audiobooks;
}

export interface Tracks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item[];
}

export interface Item {
  album: Album;
  artists: Artist2[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds2;
  external_urls: ExternalUrls4;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: object;
  restrictions: Restrictions2;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Album {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions;
  type: string;
  uri: string;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: Artist[];
}

export interface ExternalUrls {
  spotify: string;
}

export interface Image {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions {
  reason: string;
}

export interface Copyright {
  text: string;
  type: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Artist {
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls2 {
  spotify: string;
}

export interface Artist2 {
  external_urls: ExternalUrls3;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image2[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls3 {
  spotify: string;
}

export interface Followers {
  href: string;
  total: number;
}

export interface Image2 {
  url: string;
  height: number;
  width: number;
}

export interface ExternalIds2 {
  isrc: string;
  ean: string;
  upc: string;
}

export interface ExternalUrls4 {
  spotify: string;
}

export interface Restrictions2 {
  reason: string;
}

export interface Artists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item2[];
}

export interface Item2 {
  external_urls: ExternalUrls5;
  followers: Followers2;
  genres: string[];
  href: string;
  id: string;
  images: Image3[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export interface ExternalUrls5 {
  spotify: string;
}

export interface Followers2 {
  href: string;
  total: number;
}

export interface Image3 {
  url: string;
  height: number;
  width: number;
}

export interface Albums {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item3[];
}

export interface Item3 {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls6;
  href: string;
  id: string;
  images: Image4[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restrictions3;
  type: string;
  uri: string;
  copyrights: Copyright2[];
  external_ids: ExternalIds3;
  genres: string[];
  label: string;
  popularity: number;
  album_group: string;
  artists: Artist3[];
}

export interface ExternalUrls6 {
  spotify: string;
}

export interface Image4 {
  url: string;
  height: number;
  width: number;
}

export interface Restrictions3 {
  reason: string;
}

export interface Copyright2 {
  text: string;
  type: string;
}

export interface ExternalIds3 {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Artist3 {
  external_urls: ExternalUrls7;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrls7 {
  spotify: string;
}

export interface Playlists {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item4[];
}

export interface Item4 {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls8;
  href: string;
  id: string;
  images: Image5[];
  name: string;
  owner: Owner;
  public: boolean;
  snapshot_id: string;
  tracks: Tracks2;
  type: string;
  uri: string;
}

export interface ExternalUrls8 {
  spotify: string;
}

export interface Image5 {
  url: string;
  height: number;
  width: number;
}

export interface Owner {
  external_urls: ExternalUrls9;
  followers: Followers3;
  href: string;
  id: string;
  type: string;
  uri: string;
  display_name: string;
}

export interface ExternalUrls9 {
  spotify: string;
}

export interface Followers3 {
  href: string;
  total: number;
}

export interface Tracks2 {
  href: string;
  total: number;
}

export interface Shows {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item5[];
}

export interface Item5 {
  available_markets: string[];
  copyrights: Copyright3[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: ExternalUrls10;
  href: string;
  id: string;
  images: Image6[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: string;
  uri: string;
  total_episodes: number;
}

export interface Copyright3 {
  text: string;
  type: string;
}

export interface ExternalUrls10 {
  spotify: string;
}

export interface Image6 {
  url: string;
  height: number;
  width: number;
}

export interface Episodes {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item6[];
}

export interface Item6 {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls11;
  href: string;
  id: string;
  images: Image7[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions: Restrictions4;
}

export interface ExternalUrls11 {
  spotify: string;
}

export interface Image7 {
  url: string;
  height: number;
  width: number;
}

export interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface Restrictions4 {
  reason: string;
}

export interface Audiobooks {
  href: string;
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
  items: Item7[];
}

export interface Item7 {
  authors: Author[];
  available_markets: string[];
  copyrights: Copyright4[];
  description: string;
  html_description: string;
  edition: string;
  explicit: boolean;
  external_urls: ExternalUrls12;
  href: string;
  id: string;
  images: Image8[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: Narrator[];
  publisher: string;
  type: string;
  uri: string;
  total_chapters: number;
}

export interface Author {
  name: string;
}

export interface Copyright4 {
  text: string;
  type: string;
}

export interface ExternalUrls12 {
  spotify: string;
}

export interface Image8 {
  url: string;
  height: number;
  width: number;
}

export interface Narrator {
  name: string;
}

//******************* */
