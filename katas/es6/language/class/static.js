// 24: class - static keyword
// To do: make all tests pass, leave the assert lines unchanged!

describe('inside a class you can use the static keyword', () => {

  describe('for methods', () => {
    class IntegrationTest {}
    class UnitTest {}
    it('a static method just has the prefix `static`', () => {
      class TestFactory {
        static makeTest() { return new UnitTest(); }
      }
      
      assert.ok(TestFactory.makeTest() instanceof UnitTest);
    });
  
    it('the method name can be dynamic/computed', () => {
      const makeTest = 'create' + 'Test';
      class TestFactory {
        static [makeTest]() { return new UnitTest; }
      }
      
      assert.ok(TestFactory.createTest() instanceof UnitTest);
    });
  });
  
  describe('for accessors', () => {
    it('a getter name can be static, just prefix it with `static`', () => {
      class UnitTest {
        static get testType() { return 'unit'; }
      }
      
      assert.equal(UnitTest.testType, 'unit');
    });
    
    it('even a getter name can be dynamic/computed at run time', () => {
      const type = 'testType';
      class IntegrationTest {
        static get [type]() { return 'integration'; }
      }
      
      assert.equal(IntegrationTest.testType, 'integration');
    });
  });
  
});