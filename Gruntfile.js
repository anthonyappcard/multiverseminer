module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		
		dataImport: {
			build: {
				src: 'assets/data/',
				dest: 'src/data/'
			}
		},
	
		clean: ["bin/"],

		requirejs : {
			compile : {
				options : {
 					generateSourceMaps: true,
					preserveLicenseComments: false,

					baseUrl  : "./src",
					out      : "bin/MultiverseMiner.min.js",
					optimize : 'uglify2',
					name     : 'main',

					uglify2 : {
						mangle : false
					},

					paths : {
						game           : 'game/game',
						gamecombatant  : 'game/combatant',
						gamegear       : 'game/gear',
						gameminer      : 'game/miner',
						gamenpc        : 'game/npc',
						gameplanet     : 'game/planet',
						gameplayer     : 'game/player',
						gamesettings   : 'game/settings',
						gamestatistics : 'game/statistics',
						gamestorage    : 'game/storage',
						gamefight      : 'game/fight',
						gamequest      : 'game/quest',

						ui             : 'ui/ui',
						uicomponent    : 'ui/controls/uiComponent',
						uifloating     : 'ui/controls/uiFloating',
						uiinventory    : 'ui/controls/uiInventory',
						uiselection    : 'ui/controls/uiSelection',
						uislot         : 'ui/controls/uiSlot',
						uistarfield    : 'ui/controls/uiStarfield',
						uiplanetscreen : 'ui/uiPlanetScreen',
						uitravelscreen : 'ui/uiTravelScreen',

						jquery      : 'external/jquery-2.1.1.min',
						jqueryui    : 'external/jquery-ui-1.10.4.custom',
                        widget      : 'external/jquery.ui.widget',
						jgrowl      : 'external/jquery.jgrowl.min',
						starfield   : 'external/starfield',
                        tooltipster : 'external/jquery.tooltipster.min',
                        custombox   : 'external/jquery.custombox',
                        joyride     : 'external/jquery.joyride-2.1',
                        noty        : 'external/jquery.noty.packaged',
                        toolbar     : 'external/jquery.toolbar',
                        contextmenu : 'external/jquery.ui-contextmenu',
                        ws          : 'external/jquery.WebSocket',
						simplemodal : 'external/jquery.simplemodal-1.4.4',
                        bulletin    : 'external/jquery.bulletin',
						qtip2		: 'external/jquery.qtip'
					}
				}
			}
		},

		cssmin : {
			combine : {
				files : {
					'bin/<%= pkg.name %>.min.css' : [
						'assets/css/*.css',
						'assets/fonts/overpass/*.css',
						'src/ui/controls/*.css',
						'src/external/*.css'
					]
				}
			}
		},

		copy : {
			main : {
				files : [
					{ cwd: 'www', src: '**/*', dest: 'bin', expand: true },
					{ cwd: 'src/external/images', src: '**/*', dest: 'bin/images', expand: true },
					{ cwd: 'assets/images', src: '**/*', dest: 'bin/assets/images', expand: true },
					{ cwd: 'assets/fonts/overpass/', src: '**/*.ttf', dest: 'bin/', expand: true },
					{ cwd: 'assets/fonts/overpass/', src: '**/*.svg', dest: 'bin/', expand: true },
					{ cwd: 'assets/fonts/overpass/', src: '**/*.woff', dest: 'bin/', expand: true },
					{ cwd: 'assets/sound', src: '**/*', dest: 'bin/assets/sound', expand: true }
				]
			}
		},
		
		dataExport: {
			build: {
				src: 'assets/data/',
				dest: 'export/'
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-clean');
	
	grunt.loadTasks("./src/build/");

	// Default task(s).
	grunt.registerTask('default', [
		'clean',
        'dataImport',
		'requirejs',
		'cssmin',
		'copy'
		//'dataExport'
	]);
};

