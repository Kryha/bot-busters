// TODO: delete
export interface ExtraInfo {
  experience: number;
  won: number;
  lost: number;
}

export interface Leaderboard {
  rank: number;
  score: number;
  address: string;
  avatar: string;
  name: string;
  extraInfo: ExtraInfo;
}

interface PlayerData {
  rank: number;
  score: number;
  address: string;
  avatar: string;
  name: string;
}

const createData = (data: PlayerData): Leaderboard => {
  return {
    ...data,
    extraInfo: {
      experience: 1,
      won: 4,
      lost: 2,
    },
  };
};

export const leaderboard = [
  createData({
    rank: 1,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "daisy",
  }),
  createData({
    rank: 2,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "fred",
  }),
  createData({
    rank: 3,
    score: 50,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "johan",
  }),
  createData({
    rank: 4,
    score: 5000,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "jan",
  }),
  createData({
    rank: 6,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "daisydaisydaisy",
  }),
  createData({
    rank: 7,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "miranda",
  }),
  createData({
    rank: 8,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "conner",
  }),
  createData({
    rank: 9,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "sally",
  }),
  createData({
    rank: 10,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "mary",
  }),
  createData({
    rank: 11,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "daisy",
  }),
  createData({
    rank: 12,
    score: 5,
    address: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT",
    avatar: "",
    name: "daisy",
  }),
];
