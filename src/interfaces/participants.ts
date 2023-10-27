export interface IParticipants {
    participants: string[];
    collectParticipants: (participants: (string | null)[]) => void;
  }
