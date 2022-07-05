export interface IComment {
    _id: string;
    username: string;
    text: string
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[]
}

export interface TrackState {
    tracks: ITrack[];
    error: string;
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    DELETE_TRACK = 'DELETE_TRACK',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksAction {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[]
}

interface FetchTracksErrorAction {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

interface DeleteTrackAction {
    type: TrackActionTypes.DELETE_TRACK;
    payload?: ITrack[]
}

export type TrackAction = FetchTracksAction | FetchTracksErrorAction | DeleteTrackAction