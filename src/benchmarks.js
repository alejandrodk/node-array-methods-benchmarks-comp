const Benchmark = require("benchmark");
const colors = require("colors/safe");
const R = require("ramda");

function buildForEachSuite(array) {
  return new Benchmark.Suite("forEach", {
    minSamples: 100,
  })
    .add(colors.blue("[Array.forEach]"), function () {
      array.forEach((x) => {
        x.r = x.a + x.b;
      });
    })
    .add(colors.blue("[for of]"), function () {
      for (const obj of array) {
        obj.r = obj.a + obj.b;
      }
    })
    .add(colors.blue("[for <array.length, indexing]"), function () {
      for (let i = 0; i < array.length; ++i) {
        array[i].r = array[i].a + array[i].b;
      }
    })
    .add(colors.blue("[for <len, indexing]"), function () {
      const len = array.length;
      for (let i = 0; i < len; ++i) {
        array[i].r = array[i].a + array[i].b;
      }
    })
    .add(colors.blue("[for <array.length, tmp element]"), function () {
      for (let i = 0; i < array.length; ++i) {
        const x = array[i];
        x.r = x.a + x.b;
      }
    })
    .add(colors.blue("[for <len, tmp element]"), function () {
      const len = array.length;
      for (let i = 0; i < len; ++i) {
        const x = array[i];
        x.r = x.a + x.b;
      }
    })
    .add(colors.blue("[ranmda forEach]"), function () {
      R.forEach((x) => {
        x.r = x.a + x.b;
      }, array);
    });
}

function buildMapSuite(array) {
  return new Benchmark.Suite("map", {
    minSamples: 100,
  })
    .add(colors.blue("[Array.map]"), function () {
      return array.map((x) => x.a + x.b);
    })
    .add(colors.blue("[Array.map, destructuring]"), function () {
      return array.map(({ a, b }) => a + b);
    })
    .add(colors.blue("[for of]"), function () {
      const result = [];
      for (const obj of array) {
        result.push(obj.a + obj.b);
      }
      return result;
    })
    .add(colors.blue("[for of, destructuring]"), function () {
      const result = [];
      for (const { a, b } of array) {
        result.push(a + b);
      }
      return result;
    })
    .add(colors.blue("[for, init array]"), function () {
      const result = new Array(array.length);
      for (let i = 0; i < array.length; ++i) {
        result[i] = array[i].a + array[i].b;
      }
      return result;
    })
    .add(colors.blue("[ramda map]"), function () {
      return R.map(({ a, b }) => a + b, array);
    });
}

function buildReduceSuite(array) {
  return new Benchmark.Suite("reduce", {
    minSamples: 100,
  })
    .add(colors.blue("[Array.reduce]"), function () {
      return array.reduce((p, x) => p + x.a + x.b, 0);
    })
    .add(colors.blue("[Array.reduce, destructuring]"), function () {
      return array.reduce((p, { a, b }) => p + a + b, 0);
    })
    .add(colors.blue("[for of]"), function () {
      let result = 0;
      for (const { a, b } of array) {
        result += a + b;
      }
      return result;
    })
    .add(colors.blue("[for]"), function () {
      let result = 0;
      for (let i = 0; i < array.length; ++i) {
        result += array[i].a + array[i].b;
      }
      return result;
    })
    .add(colors.blue("[ranmda reduce]"), function () {
      return R.reduce((p, { a, b }) => p + a + b, 0, array);
    });
}

module.exports = {
  buildReduceSuite,
  buildForEachSuite,
  buildMapSuite,
};
