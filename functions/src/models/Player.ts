import Score from "./Score";

interface Player {
  id: string;
  name: string;
  userId: string;
  email: string;
  scores: Score[];
  unlock: string[];
}

export default Player;
