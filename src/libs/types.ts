import { Answer, Post, Product, Review, User } from "@prisma/client";

export interface IResponse {
  ok: boolean | undefined;
  error?: { message: string | any[] };
}

export interface IFormCommunityWrite {
  title: string;
  content: string;
}

export interface IResponseCommunityWrite extends IResponse {
  post?: { id: number };
}

interface AnswerWithUser {
  createdAt: string;
  content: string;
  id: number;
  user: User;
}

interface PostWithUser extends Post {
  user: {
    id: Number;
    name: string;
    avatar: string;
  };
  _count: { Answers: number; Wonderings: number };
  Answers: AnswerWithUser[];
}

export interface IResponsePostDetail extends IResponse {
  post?: PostWithUser;
  isAlreadyWonder: boolean;
}

export interface IFormCommunityAnswer {
  answer: string;
}

export interface IResponseAnswerData extends IResponse {}

interface PostWithRelation extends Post {
  _count: { Answers: number; Wonderings: number };
  user: { id: number; name: string };
}

export interface IResponseCommunityPostsAll extends IResponse {
  posts: PostWithRelation[];
}

export interface IResponseProfile extends IResponse {
  profile: User;
}

export interface IResponseReviews extends IResponse {
  reviews: ReviewWithCreateByUser[];
}

export interface ReviewWithCreateByUser extends Review {
  CreatedBy: { avatar: string | null; id: number; name: string };
}

export interface ProductWithCount extends Product {
  _count: { Records: number };
}

export interface globalProps {
  user: { user: User | undefined; isLoading: boolean };
}

export interface IcloudflareUrlSuccess extends IResponse {
  id?: string;
  uploadURL?: string;
}

export interface IcloudflareUploadResponse {
  result: {
    id: string;
    filename: string;
    uploaded: string;
    requireSignedURLs: boolean;
    variants: string[];
  } | null;
  success: boolean;
  errors: { code: number; message: string }[];
  messages: any[];
}

export interface IResponseLiveInput {
  result: Result;
  success: boolean;
  errors: any[];
  messages: any[];
}

interface Result {
  uid: string;
  rtmps: Rtmps;
  rtmpsPlayback: Rtmps;
  srt: Srt;
  srtPlayback: Srt;
  webRTC: WebRTC;
  webRTCPlayback: WebRTC;
  created: Date;
  modified: Date;
  meta: Meta;
  status: null;
  recording: Recording;
  deleteRecordingAfterDays: null;
}

interface Meta {
  name: string;
}

interface Recording {
  mode: string;
  timeoutSeconds: number;
  requireSignedURLs: boolean;
  allowedOrigins: null;
}

interface Rtmps {
  url: string;
  streamKey: string;
}

interface Srt {
  url: string;
  streamId: string;
  passphrase: string;
}

interface WebRTC {
  url: string;
}
