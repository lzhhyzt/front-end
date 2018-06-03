var assert = require('assert');
var expect = require('chai').expect
/**
 * describe 测试套件 test suite 表示一组相关的测试
 * it 测试用例 test case 表示一个单独的测试
 * assert 断言 表示对结果的预期
 */
describe('Array', function() {
    describe('#indexOf()', function() {
        it('should return -1 when the value is not present', function(){
            assert.equal(-1, [1,2,3].indexOf(4));
        });

        it('equal test', function(){
            expect(1+1).to.be.equal(2);
            expect(1+6).not.equal(5);
        });
    })
});