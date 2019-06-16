global.console.log = jest.fn();

describe('app', () => {
    it('loggs \"Hello app\"', () => {
        require('./index');
        expect(global.console.log).toHaveBeenCalledWith('Hello app');
    });
});
