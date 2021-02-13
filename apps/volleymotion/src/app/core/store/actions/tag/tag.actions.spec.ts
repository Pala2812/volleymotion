import * as fromTag from './tag.actions';

describe('loadTags', () => {
  it('should return an action', () => {
    expect(fromTag.loadTags().type).toBe('[Tag] Load Tags');
  });
});
