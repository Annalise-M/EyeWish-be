const pool = require('../lib/utils/pool');
const fs = require('fs');

describe('EyeWish routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });
  it('is a bullshit test', async() => {
    const thingy1 = true;
    const thingy2 = true;
        
    expect(thingy1).toEqual(thingy2);
  });
  
});
