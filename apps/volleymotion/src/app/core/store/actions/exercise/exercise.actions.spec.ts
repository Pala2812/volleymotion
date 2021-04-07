import * as fromExercise from './exercise.actions';

describe('loadExercises', () => {
  it('should return an action', () => {
    expect(fromExercise.loadExercises().type).toBe('[Exercise] Load Exercises');
  });
});
