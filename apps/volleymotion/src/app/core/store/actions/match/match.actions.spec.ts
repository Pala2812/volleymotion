import * as fromMatch from './match.actions';

describe('loadMatchs', () => {
  it('should return an action', () => {
    expect(fromMatch.loadMatchs().type).toBe('[Match] Load Matchs');
  });
});
