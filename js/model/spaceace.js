// Satellite quiz data
var satellites = {
    dsp: {
        id: 'dsp', // keep same as it's key
        acronym: "DSP",
        longName: "Defense Support Program",
        description: "Operated by 460th Space Wing at Buckley AFB, CO, outside Denver.",
        imgUrl: "images/DSP.png",
        questions: [
            'Which satellite uses infrared emissions to missle launches, spacecraft launches and nuclear explosions? (cheat: DSP)',
            '',
            ''
        ]
    }, 
    
    milstar: {
        id: 'milstar', // keep same as it's key
        acronym: "MILSTAR",
        longName: "Military Strategic and Tactical Relay",
        description: "Legacy communications satellite operated by 4 Space Operations Squadron (4 SOPS) at Schriever AFB, CO.",
        imgUrl: "images/Milstar.png",
        questions: [
            'Advanced Extreme High Frequency (AEHF) will be the follow-on to which commnunication satellite system? (cheat: MILSTAR)',
            'Which satellite provides hard to detect-and-intercept communications and to be survivable in Nuclear Warefare? (cheat: Milstar)',
            'Which satallite serves as a "switch board in space" providing secure, jam resistant, world-wide communication? (cheat: Milstar)'
        ]
    }, 
    
    aehf: {
        id: 'aehf', // keep same as it's key
        acronym: "AEHF",
        longName: "Advanced Extremely High Frequency",
        description: "The follow on system to the MILSTAR satellite operated by 4 Space Operations Squadron (4 SOPS) at Schriever AFB, CO.",
        imgUrl: "images/AEHF.png",
        questions: [
            'Which satellite is the follow-on to Milstar? (cheat: AEHF)',
            '',
            ''
        ]
    }, 
    
    navstar: {
        id: 'navstar', // keep same as it's key
        acronym: "Navstar GPS",
        longName: '"Navstar" Global Positioning System',
        description: "Operated by 2 SOPS at Schriever AFB, CO",
        imgUrl: "images/Navstar.png",
        questions: [
            'Which Space Operations Squadron (SOPS) operates the Global Positioning SystGPS satellite system? (cheat: navstar)',
            'Which satellite system aids in the tracking of targets and is used by precision guided munitions? (cheat: navstar)',
            'Which satellite system provides and location and time information in all weather conditions where there is an unobstructed line of sight? (cheat: navstar)'
        ]
    }, 
    
    wgs: {
        id: 'wgs', // keep same as it's key
        acronym: "WGS",
        longName: "Wideband Global SATCOM",
        description: "Operated by 3 SOPS at Schriever AFB, CO",
        imgUrl: "images/WGS.png",
        questions: [
            'Which satellite system will replace Defense Satellite Communications System (DCSC)? (cheat: wgs)',
            '',
            ''
        ]
    }, 
    
    dscs: {
        id: 'dscs', // keep same as it's key
        acronym: "DSCS",
        longName: "Defense Satellite Commnunications System",
        description: "Operated by 3 SOPS at Schriever AFB, CO. Will be replaced by the Wideband Global SATCOM system.",
        imgUrl: "images/DSCS.png",
        questions: [
            'Which communication satellite system is operated by Defense Information System Agency (DISA)? (cheat: DSCS)',
            'Which satellite system will be replaced by Wideband Global SATCOM? (cheat: DSCS)',
            ''
        ]
    }, 
    
    ufo: {
        id: 'ufo', // keep same as it's key
        acronym: "UFO",
        longName: "Ultra High Frequency Follow-On",
        description: "Operated by Naval Satellite Operations Center (NAVSOC) at Point Mugu, CA.",
        imgUrl: "images/UFO.png",
        questions: [
            'Which is a Navy satellite system provides communications between ships, subs, air, and ground? (cheat: UFO)',
            'Which Navy satellite system can connect to Milstar for joint communications? (cheat: UFO)',
            ''
        ]
    }, 
    
    muos: {
        id: 'muos', // keep same as it's key
        acronym: "MUOS",
        longName: "Mobile User Objective System",
        description: "Operated by Naval Satellite Operations Center at Point Mugu, CA. and will replace the legacy UFO Follow-On",
        imgUrl: "images/MUOS.png",
        questions: [
            'Which satellite system will be the follow-on system for UFO? (cheat: MUOS)',
            '',
            ''
        ]
    }, 
    
    noaa: {
        id: 'noaa', // keep same as it's key
        acronym: "NOAA",
        longName: "National Oceanic and Atmospheric Admnistration",
        description: "Operated by the National Oceanic and Atmospheric Administration and is their POES series of weather satellites.",
        imgUrl: "images/NOAA.png",
        questions: [
            'Which satellite system is used for weather imagery? (cheat: NOAA)',
            'Which weather satellite system is used primarily by National Weather service, military and FAA? (cheat: NOAA)',
            ''
        ]
    }, 
    
    sbirs: {
        id: 'sbirs', // keep same as it's key
        acronym: "SBIRS",
        longName: "Space-Based Infrared System",
        description: "SBIRS High will replace the Defense Support Program (DSP) satellites and is operated by 460th Space Wing at Buckley AFB, CO, outside Denver.",
        imgUrl: "images/SBIRS.png",
        questions: [
            'Which satellite system is used for missile warning and defense, surveilance, and tracking? (cheat: SBIRS)',
            '',
            ''
        ]
    }, 
    
    dmsp: {
        id: 'dmsp', // keep same as it's key
        acronym: "DMSP",
        longName: "Defense Meteorological Satellite Program",
        description: "Monitors meteorological, oceanographic, and solar-terrestrial physics for the National Oceanic and Atmospheric Administration.",
        imgUrl: "images/DMSP.png",
        questions: [
            'Which satellite system was created 5 decades ago for weather forecasting and cloud cover imagery? (cheat: DMSP)',
            '',
            ''
        ]
    }, 
    
    tsat: {
        id: 'tsat', // keep same as it's key
        acronym: "TSAT",
        longName: "Transformational Satellite Communications System",
        description: "Future Satellite System with No Operational Squadron. Secure, high-capicity global communications" +
                         " network serving the Department of Defense, NASA and the United States Intelligence Community.",
        imgUrl: "images/TSAT.png",
        questions: [
            'what satellite is called the tsat',
            '',
            ''
        ]
    }
};

// gets groups of satellites using satellites data structure
var getSats = function(val) {
    var nextSet = 0, sats = [], c = [],
        coordinates1 = ["coord0", "coord2", "coord4", "coord6", "coord8"],
        coordinates2 = ["coord1", "coord3", "coord5", "coord7", "coord9"];

    var group1 = function() {
        sats.push(satellites.dscs);
        sats.push(satellites.milstar);
        sats.push(satellites.navstar);
        sats.push(satellites.sbirs);
        sats.push(satellites.ufo);
        c = coordinates1;
    };

    var group2 = function() {
        sats.push(satellites.dsp);
        sats.push(satellites.dmsp);
        sats.push(satellites.aehf);
        sats.push(satellites.dscs);
        sats.push(satellites.wgs);
        c = coordinates2;
    };

    var group3 = function() {
        sats.push(satellites.wgs);
        sats.push(satellites.noaa);
        sats.push(satellites.tsat);
        sats.push(satellites.muos);
        sats.push(satellites.sbirs);
        c = coordinates1;
    };
    
    var satsToArray = function() {
    	var results = [];
    	
    	for (var x in satellites) {
			results.push(satellites[x]);
    	}
    	
    	return results;
    };
    
	var getSatCount = function() {
		var count = 0;
		
		for (x in satellites) {
			count++;
		}
		
		return count;
	};

    return {
        nextGroup: function() {
            val = val || 1;

            switch (val) {
                case 1:
                    group1();
                    break;
                case 2:
                    group2();
                    break;
                case 3:
                    group3();
                    break;
                default:
                    return null;
            }

            return { item: sats, coord: c };
        },

        // make this more dynamic based on parameter
        getGrouped: function() {
            var sgs = [];

            group1();
            var grp1 = sats;
            sgs.push({ item: grp1, coord: c });
            sats = [];

            group2();
            var grp2 = sats;
            sgs.push({ item: grp2, coord: c });
            sats = [];

            group3();
            var grp3 = sats;
            sgs.push({ item: grp3, coord: c });
            sats = [];

            return sgs;
        }, 
        
        getGroupedBy: function(val) {
        	val = val || 5;
        	
        	var sgs = [],
        		sats = satsToArray(),
        		nSats = sats.length,
        		grp = [],
        		c = Math.ceil(nSats / val);
        	
        	for (var i = 0; i < nSats; i++) {
        		for (var x = 0; x < c; x++) {
					grp.push({item: grp, coord: coordinates1});
        		}
        		
        		sgs.push(grp);
        		grp = [];
        	}
        	
        	return sgs;
        },
        
        getSatArray: function() {
			return satsToArray();
        }
    };
};
