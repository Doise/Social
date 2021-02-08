import { PORT, JWT_LIFE_TIME, JWT_SECRET, MONGODB_URI } from '../src/utils/config';
import { helloWorld } from '../src/index'

test('Test enviroment configurations', () => {
    expect(PORT).toBeDefined();
    expect(JWT_LIFE_TIME).toBeDefined();
    expect(JWT_SECRET).toBeDefined();
    expect(MONGODB_URI).toBeDefined();
})

test('Test index.ts', () => {
    expect(helloWorld('Doise')).toBe('Hello Doise');
})