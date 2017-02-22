// config.js
'use strict';

exports.config = {

  directConnect: true,
  ignoreUncaughtExceptions: true,
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),
  //restartBrowserBetweenTests: true,
  capabilities: {
    'browserName': 'chrome'
  },
  specs: [
   'features/*.feature'
 ],

  cucumberOpts: {
    require: 'features/step_definitions/*.js',
    tags: false,
    format: ['json:results.json', 'pretty'],
    profile: false,
    'no-source': true
  },

  beforeLaunch: function() {
    setTimeout(function() {
        browser.driver.executeScript(function() {
            return {
                width: window.screen.availWidth,
                height: window.screen.availHeight
            };
        }).then(function(result) {
            browser.driver.manage().window().setSize(result.width, result.height);
        });
    });

  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  afterLaunch: function() {
    var reporter = require('cucumber-html-reporter');

    var options = {
          theme: 'bootstrap',
          jsonFile: 'results.json',
          output: 'cucumber_report.html',
          reportSuiteAsScenarios: true,
          launchReport: true,
          metadata: {
              "App Version":"0.0.1",
              "Test Environment": "STAGING",
              "Browser": "Chrome  54.0.2840.98",
              "Platform": "OSX",
              "Parallel": "Scenarios",
              "Executed": "Remote"
          }
      };

      reporter.generate(options);

  },


  // It is great for credentials that you can be to use on your project
  params: {
    valid_linkedin_account: {
      'username': 'valid_user@gmail.com',
      'password': 'valid_pass'
    },

    invalid_linkedin_account: {
      'username': 'invalid_user@gmail.com',
      'password': 'invalid_pass'
    },

  },
  // Choose browsers that will run the tests in parallel
  // multiCapabilities: [{
  //   'browserName': 'chrome'
  // }, {
  //   'browserName': 'firefox',
  // }]


}
