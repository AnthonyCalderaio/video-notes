import { FileNameFromPathPipe } from './file-name-from-path.pipe';

describe('FileNameFromPathPipe', () => {
  it('create an instance', () => {
    const pipe = new FileNameFromPathPipe();
    expect(pipe).toBeTruthy();
  });
});
