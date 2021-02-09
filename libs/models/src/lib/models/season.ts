export interface Season {
  id: string;
  uid: string;
  name: string;
  goal: string;
  tags: [];
  matches: {
    won: number;
    lost: number;
    total: number;
  };
  traningParticipation: {
    current: number;
    max: number;
  };
}
