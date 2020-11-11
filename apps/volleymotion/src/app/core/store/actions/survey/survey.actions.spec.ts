import * as fromSurvey from './survey.actions';

describe('loadSurveys', () => {
  it('should return an action', () => {
    expect(fromSurvey.loadSurveys().type).toBe('[Survey] Load Surveys');
  });
});
