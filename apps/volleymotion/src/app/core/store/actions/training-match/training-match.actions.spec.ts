import * as fromTrainingMatch from './training-match.actions';

describe('loadTrainingMatchs', () => {
  it('should return an action', () => {
    expect(fromTrainingMatch.loadTrainingMatchs().type).toBe('[TrainingMatch] Load TrainingMatchs');
  });
});
