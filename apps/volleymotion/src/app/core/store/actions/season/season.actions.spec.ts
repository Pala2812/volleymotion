import * as fromSeason from './season.actions';

describe('loadSeasons', () => {
  it('should return an action', () => {
    expect(fromSeason.loadSeasons().type).toBe('[Season] Load Seasons');
  });
});
