(function(data){

    // generates random wait times with the 
    // following constraints:
    //  - all values end with either 0 or 5 in the ones place
    //  - minimum value is 10 and maximum value is 120 minutes
    var getRandomWaitTime = function () {
        var 
            min = 10,
            max = 120;

        var result = (Math.random() * (max - min) + min);
        result = parseInt(result);

        var ones = (result + '');
        ones = parseInt(ones[ones.length - 1]);

        if (ones > 5) {
            result = result + (10 - ones);
        } else if (ones < 5 && ones >= 1) {
            result = result - ones + 5;
        }

        return result;
    };

    data.parks = [
        {
            name: 'Animal Kingdom',
            rides: [
                {
                    name: 'DINOSAUR',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Expedition Everest',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Kali River Rapids',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                }
            ]
        },
        {
            name: 'Magic Kingdom',
            rides: [
                {
                    name: 'Big Thunder Mountain',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Haunted Mansion',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Space Mountain',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
            ]   
        },
        {
            name: 'EPCOT',
            rides: [
                {
                    name: 'Maelstrom',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]

                },
                {
                    name: 'Mission: SPACE',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Test Track',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
            ]    
        },
        {
            name: 'Hollywood Studios',
            rides: [
                {
                    name: 'Rock \'n\' Roller Coaster',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Star Tours',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Tower of Terror',
                    waitTimes:[
                        //{ dateTime: new Date('01/01/2014 12:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 13:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 14:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 15:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 16:38:35'), duration: getRandomWaitTime()},
                        //{ dateTime: new Date('01/01/2014 17:38:35'), duration: getRandomWaitTime()}
                    ]
                }
            ]    
        }
    ];

}(module.exports));