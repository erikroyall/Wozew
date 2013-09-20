/*global module:false*/

module.exports = function(grunt) {

  "use strict";

  var itsbeen = " * "
    , st = new Date(1378438867382)
    , ct = new Date()
    , diff = {
      y: ct.getFullYear() - st.getFullYear(),
      m: ct.getMonth() - st.getMonth(),
      d: ct.getDate() - st.getDate()
    };

  itsbeen += "Project started before ";
  itsbeen += (diff.y === 0) ? "" : diff.y === 1 ? 1 + " year, " : ((diff.y < 0 ? 30 - Math.abs(diff.y) : diff.y) + " years") + " and "; 
  itsbeen += (diff.m === 0) ? "" : diff.m === 1 ? 1 + " month and " : ((diff.m < 0 ? 30 - Math.abs(diff.m) : diff.m) + " months") + " and "; 
  itsbeen += (diff.d === 0) ? "" : diff.d === 1 ? 1 + " day " : ((diff.d < 0 ? 30 - Math.abs(diff.d) : diff.d) + " days"); 
  itsbeen += "\n";

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON("package.json"),

    banner: "/*! \n * ========================= \n" +
      " * <%= pkg.title %> - v<%= pkg.version %>\n" +
      " * ========================= \n" + 
      " * <%= grunt.template.today(\"yyyy-mm-dd\") %>\n" +
      itsbeen +
      " * http://erikroyall.github.com/<%= pkg.name %>/\n" +
      " * Copyright (c) 2013 Erik Royall\n" +
      " * Licensed under <%= pkg.license %> (see LICENSE-MIT) \n */\n\r",

    concat: {
      options: {
        banner: "<%= banner %>",
        stripBanners: true
      },
      dist: {
        src: [
          "src/base.css",
          "src/grid.css"
        ],
        dest: "dist/<%= pkg.name %>.css"
      }
    },

    csslint: {
      options: {
        csslintrc: ".csslintrc"
      },
      strict: {
        options: {
          import: 2
        },
        src: ["<%= concat.dist.dest %>"]
      },
      lax: {
        options: {
          import: false
        },
        src: ["<%= concat.dist.dest %>"]
      }
    },

    cssmin: {
      add_banner: {
        files: {
          "dist/<%= pkg.name %>.min.css": ["<%= concat.dist.dest %>"]
        }
      }
    },

    watch: {
      csslintrc: {
        files: [".csslintrc"],
        tasks: ["concat", "csslint", "cssmin"]
      },

      gruntfile: {
        files: ["Gruntfile.js"],
        tasks: ["concat", "csslint", "cssmin"]
      },

      wozew: {
        files: "<%= concat.dist.dest %>",
        tasks: ["concat", "csslint", "cssmin"]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-csslint");
  grunt.loadNpmTasks("grunt-contrib-cssmin");

  // Default task.
  grunt.registerTask("default", ["concat", "csslint", "cssmin", "watch"]);
};
