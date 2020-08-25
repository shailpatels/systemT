
module.exports = {
    transform : {
        '.js' : 'jest-esm-transformer'
    },

    clearMocks : true,
    coverageDirectory : "coverage",

    testEnvironment : "jsdom"
};
