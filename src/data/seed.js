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

    var dt = new Date();
    var day = dt.getDate()-1; //yesterday
    var month = dt.getMonth()+1; //current month
    var year = dt.getFullYear();

    data.parks = [
        {
            name: 'Animal Kingdom',
            rides: [
                {
                    name: 'DINOSAUR',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:06'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Expedition Everest',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:06'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Kali River Rapids',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:06'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:06'), duration: getRandomWaitTime()}
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
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:38'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Haunted Mansion',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:38'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Space Mountain',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:38'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:38'), duration: getRandomWaitTime()}
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
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:13'), duration: getRandomWaitTime()}
                    ]

                },
                {
                    name: 'Mission: SPACE',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:13'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Test Track',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:13'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:13'), duration: getRandomWaitTime()}
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
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:56'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Star Tours',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:56'), duration: getRandomWaitTime()}
                    ]
                },
                {
                    name: 'Tower of Terror',
                    waitTimes:[
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 12:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 13:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 14:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 15:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 16:56'), duration: getRandomWaitTime()},
                        { dateTime: new Date(month + '/'+ day +'/' + year + ' 17:56'), duration: getRandomWaitTime()}
                    ]
                }
            ]    
        }
    ];

}(module.exports));