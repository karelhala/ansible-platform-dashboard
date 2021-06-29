import store from '../../utilities/store';

describe('Redux store', () => {
  it('should create redux store', () => {
    const dashboardStore = store();
    const expectedState = {
      analyticsReducer: expect.any(Object),
      catalogReducer: expect.any(Object),
      hubReducer: expect.any(Object),
      notifications: []
    };
    expect(dashboardStore.dispatch).toBeInstanceOf(Function);
    expect(dashboardStore.getState).toBeInstanceOf(Function);
    expect(dashboardStore.getState()).toEqual(expectedState);
  });
});
