export interface UserInfo {
  isClubMember: boolean;
  position:
    | 'Zuspieler'
    | 'Außenangreifer'
    | 'Diagonalspieler'
    | 'Libero'
    | 'Trainer'
    | 'Co-Trainer'
    | 'Physiotherapeut'
    | 'Andere Tätigkeit'
    | 'Keine Angabe';
}
