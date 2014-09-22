module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');


  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {

    /**
     * `recess` handles our LESS compilation and uglification automatically.
     * Only our `main.less` file is included in compilation; all other files
     * must be imported from this file.
     */
    less: {
      build: {
        src: [ 'app/less/app.less' ],
        dest: 'app/css/app.css',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      }
    },

    /**
     * `jshint` defines the rules of our linter as well as which files we
     * should check. This file, all javascript sources, and all our unit tests
     * are linted based on the policies listed in `options`. But we can also
     * specify exclusionary patterns by prefixing them with an exclamation
     * point (!); this is useful when code comes from a third party but is
     * nonetheless inside `src/`.
     */
    jshint: {
      src: [
        'app/**/*.js',
        '!app/vendor/**/*.js'
      ],
      test: [
        'e2e-tests/**/*.js'
      ],
      options: {
        globalstrict: true,
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true,
        globals: {
          'angular': false,
          'jquery': false,
          'jasmine': false,
          'describe': false,
          'it': false,
          'beforeEach': false,
          'afterEach': false,
          'module': false,
          'expect': false,
          'inject': false,
          'browser': false,
          'element': false,
          'by': false
        }
      }
    },

    /**
     * Connect is a http server provided by grunt.
     * server - http server started on watch
     * serversa - http server stand-alone
     * servercompilesa - http server stand-alone pointing to compile_dir
     * testserver - http server used for e2e testing
     */
    connect: {
      options: {
        port: 8000,
        base: 'app'
      },
      server: {
        options: {
          keepalive: false
        }
      },
      serverstandalone: {
        options: {
          keepalive: true
        }
      },
      testserver: {
        options: {
          port: 8100,
          keepalive: false
        }
      }
    },

    /**
     * The Karma configurations.
     */
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        port: 9101,
        background: true
      },
      continuous: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    },

    /**
     * Protractor configuration
     */
    protractor: {
      options: {
        configFile: "node_modules/grunt-protractor-runner/node_modules/protractor/referenceConf.js", // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          // Arguments passed to the command
        }
      },
      e2e: {
        options: {
          configFile: "e2e-tests/protractor-e2e.conf.js", // Target-specific config file
          args: {
              baseUrl: 'http://localhost:8100'
          }
        }
      }
    },

    watch: {
      scripts: {
        files: 'app/**/*.js',
        tasks: ['jshint']
      },
      less: {
        files: 'app/less/**/*.less',
        tasks: ['less']
      },
      karma: {
        files: 'app/**/*_test.js',
        tasks: ['karma:continuous']
      }
    }

  };

  grunt.initConfig( grunt.util._.extend( taskConfig ) );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'jshint', 'less', 'karma:continuous'
  ]);

  grunt.registerTask( 'test:unit', [
    'build'
  ]);

  grunt.registerTask( 'test:e2e', [
    'build', 'connect:testserver', 'protractor:e2e'
  ]);


};
