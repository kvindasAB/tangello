module.exports = function ( grunt ) {
  
  /** 
   * Load required Grunt tasks. These are installed based on the versions listed
   * in `package.json` when you do `npm install` in this directory.
   */
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');


  /**
   * This is the configuration object Grunt uses to give each plugin its 
   * instructions.
   */
  var taskConfig = {
    /**
     * We read in our `package.json` file so we can access the package name and
     * version. It's already there, so we don't repeat ourselves here.
     */
    pkg: grunt.file.readJSON("package.json"),

    /**
     * `recess` handles our LESS compilation and uglification automatically.
     * Only our `main.less` file is included in compilation; all other files
     * must be imported from this file.
     */
    less: {
      build: {
        src: [ '<%= app_files.less %>' ],
        dest: '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css',
        options: {
          compile: true,
          compress: false,
          noUnderscores: false,
          noIDs: false,
          zeroUnits: false
        }
      },
      compile: {
        src: [ '<%= less.build.dest %>' ],
        dest: '<%= less.build.dest %>',
        options: {
          compile: true,
          compress: true,
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
        '<%= app_files.js %>'
      ],
      test: [
        '<%= app_files.jsunit %>'
      ],
      gruntfile: [
        'Gruntfile.js'
      ],
      options: {
        curly: true,
        immed: true,
        newcap: true,
        noarg: true,
        sub: true,
        boss: true,
        eqnull: true
      },
      globals: {}
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
        base: '<%= build_dir %>/'
      },
      server: {
        options: {
          keepalive: false
        }
      },
      serversa: {
        options: {
          keepalive: true
        }
      },
      servercompilesa: {
        options: {
          base: '<%= compile_dir %>/',
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
        configFile: '<%= build_dir %>/karma-unit.conf.js',
        port: 9101,
        background: true
      },
      continuous: {
        configFile: '<%= build_dir %>/karma-unit.conf.js',
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
          configFile: "build/protractor-e2e.conf.js", // Target-specific config file
          args: {
              baseUrl: 'http://localhost:8100'
          }
        }
      }
    },

  };

  grunt.initConfig( grunt.util._.extend( taskConfig, userConfig ) );

  /**
   * The default task is to build and compile.
   */
  grunt.registerTask( 'default', [ 'build', 'compile' ] );

  /**
   * The `build` task gets your app ready to run for development and testing.
   */
  grunt.registerTask( 'build', [
    'clean', 'jshint', 'coffeelint', 'coffee', 'less:build',
    'concat:build_css', 'copy:build_app_assets', 'copy:build_vendor_assets',
    'copy:build_appjs', 'copy:build_vendorjs', 'copy:build_apptpl' , 'index:build',
    'testconfig:unit', 'karma:continuous'
  ]);

  /**
   * The `compile` task gets your app ready for deployment by concatenating and
   * minifying your code.
   */
  grunt.registerTask( 'compile', [
    'ngAnnotate', 'less:compile', 'copy:compile_assets', 'copy:compile_vendorjs', 'requirejs:compile', 'index:compile'
  ]);

  grunt.registerTask( 'test:unit', [
    'build'
  ]);

  grunt.registerTask( 'test:e2e', [
    'build', 'testconfig:e2e', 'connect:testserver', 'protractor:e2e'
  ]);


};
