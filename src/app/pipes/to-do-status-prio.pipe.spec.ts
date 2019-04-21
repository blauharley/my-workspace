import { ToDoStatusPrioPipe } from './to-do-status-prio.pipe';

describe('ToDoStatusPrioPipe', () => {
  it('create an instance', () => {
    const pipe = new ToDoStatusPrioPipe();
    expect(pipe).toBeTruthy();
  });
});
