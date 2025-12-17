import { ArchetypeID, SubNeedID } from '../types';

interface AnswerRecord {
  questionId: number;
  optionId: string;
  mapsTo?: SubNeedID;
}

// Mapping from CSV: Zodiac_Sign -> Mapped_Archetype
const ZODIAC_MAP: Record<string, ArchetypeID> = {
  'aries': ArchetypeID.Abundance,       // Fire -> Abundance Mover
  'leo': ArchetypeID.Abundance,         // Fire -> Abundance Mover
  
  'taurus': ArchetypeID.Protector,      // Earth -> Grounded Protector
  'virgo': ArchetypeID.Protector,       // Earth -> Grounded Protector
  'capricorn': ArchetypeID.Protector,   // Earth -> Grounded Protector
  
  'gemini': ArchetypeID.Intuitive,      // Air -> Intuitive Explorer
  'sagittarius': ArchetypeID.Intuitive, // Fire (mapped to Intuitive in CSV)
  'aquarius': ArchetypeID.Intuitive,    // Air -> Intuitive Explorer
  
  'cancer': ArchetypeID.Heart,          // Water -> Heart Aligner
  'scorpio': ArchetypeID.Heart,         // Water -> Heart Aligner
  
  'libra': ArchetypeID.Calm,            // Air (mapped to Calm in CSV)
  'pisces': ArchetypeID.Calm            // Water -> Calm Seeker
};

export const calculateArchetype = (answers: AnswerRecord[]): ArchetypeID => {
  // 1. Base Scoring (Questions 1-9)
  // Each answer gives +3 points (implied 1 count = 3 points in simple math, or just count occurrences)
  const scores: Record<string, number> = { A: 0, B: 0, C: 0, D: 0, E: 0 };
  
  // Only count first 8 personality questions (Q9 is Zodiac in logic, but Q9 in array is ID 9)
  // Note: Question IDs in constants are 1-based.
  answers.filter(a => a.questionId <= 9 && typeof a.optionId === 'string' && a.optionId.length === 1).forEach(a => {
    if (scores[a.optionId] !== undefined) {
      scores[a.optionId] += 3; // +3 points per standard answer
    }
  });

  // 2. Zodiac Bonus (Question 9 / ID 9 in constant list contains the zodiac value)
  const zodiacAnswer = answers.find(a => a.questionId === 9);
  if (zodiacAnswer && ZODIAC_MAP[zodiacAnswer.optionId]) {
    const boostedArchetype = ZODIAC_MAP[zodiacAnswer.optionId];
    if (scores[boostedArchetype] !== undefined) {
      scores[boostedArchetype] += 5; // +5 points bonus
    }
  }

  // 3. Find Winner
  let maxScore = -1;
  let winners: string[] = [];
  
  Object.entries(scores).forEach(([key, val]) => {
    if (val > maxScore) {
      maxScore = val;
      winners = [key];
    } else if (val === maxScore) {
      winners.push(key);
    }
  });

  // 4. Tie-breaker
  if (winners.length > 1) {
    // Priority 1: Zodiac Match (if the user's zodiac archetype is in the tie, it wins)
    if (zodiacAnswer && ZODIAC_MAP[zodiacAnswer.optionId]) {
      const zodiacArchetype = ZODIAC_MAP[zodiacAnswer.optionId];
      if (winners.includes(zodiacArchetype)) {
        return zodiacArchetype;
      }
    }

    // Priority 2: Question 3 (Stress Response)
    const q3Answer = answers.find(a => a.questionId === 3)?.optionId;
    if (q3Answer && winners.includes(q3Answer)) {
      return q3Answer as ArchetypeID;
    }
    
    // Priority 3: Question 1 (Base Emotion)
    const q1Answer = answers.find(a => a.questionId === 1)?.optionId;
    if (q1Answer && winners.includes(q1Answer)) {
      return q1Answer as ArchetypeID;
    }
  }

  return winners[0] as ArchetypeID;
};

export const calculateSubNeed = (answers: AnswerRecord[]): SubNeedID => {
  const q6 = answers.find(a => a.questionId === 6);
  const q7 = answers.find(a => a.questionId === 7);

  // Default
  if (!q6?.mapsTo || !q7?.mapsTo) return SubNeedID.Protection;

  // Rule: If same, select it.
  if (q6.mapsTo === q7.mapsTo) {
    return q6.mapsTo;
  }

  // Rule: If different, Q6 has 60% weight, Q7 has 40%. Q6 wins.
  return q6.mapsTo;
};