const { run: Roll, help } = require('../../commands/fun/roll');
const { client, message } = require('../../__mocks__/discord');

// let messageEmbed;
// jest.mock('discord.js', () => {
//     return { MessageEmbed: class {
//         // Silly wrapper to capture the instance
//         constructor() {
//             const { MessageEmbed } = require('../../__mocks__/discord');
//             messageEmbed = new MessageEmbed();
//             return messageEmbed;
//         }
//     } };
// });

// create a wrapper for this redundancy
const roll = (dice, sides) => {
    Roll(client, message, [dice, sides]);
};

// yeahp; this be my mid-day crisis
const she = it;

/**
 *  @type { jest.SpyInstance }
 */
let randomMock;
beforeEach(() => {
    randomMock = jest.spyOn(global.Math, 'random');
    randomMock.mockRestore
});

afterEach(() => {
    randomMock.mockRestore();
})

describe('Roll', () => {
    describe('run', () => {
        const tooFewMessage = "Can't roll non-existent die with/or non-existent sides";

        describe('nanMessage', () => {
            const nanMessage = "Please roll in an accepted format\n`yabe roll <# of dice> <# of sides per die>`";

            she('angry without a dice number', () => {
                roll([]);
                expect(message.reply).lastCalledWith(nanMessage);
            });

            she('angry without a sides number', () => {
                roll(1);
                expect(message.reply).lastCalledWith(nanMessage);
            });

            she('angry with a non-numeric dice number', () => {
                roll('dangis');
                expect(message.reply).lastCalledWith(nanMessage);
            });

            she('angry with a non-numeric sides number', () => {
                roll(1, 'dangus');
                expect(message.reply).lastCalledWith(nanMessage);
            });
        });

        describe('too many message', () => {
            const tooManyMessage = 'Please provide a valid amount of dice and sides. (no more than 15 die and/or 120 sides)';

            she('angry if dice is moar than 15', () => {
                roll(16, 1);
                expect(message.reply).lastCalledWith(tooManyMessage);
            });

            she('angry if sides moar than 120', () => {
                roll(1, 121);
                expect(message.reply).lastCalledWith(tooManyMessage);
            });
        });

        describe('too few message', () => {
            she('angry if dice 0', () => {
                roll(0, 1);
                expect(message.reply).lastCalledWith(tooFewMessage);
            });

            she('angry if dice under 0', () => {
                roll(-1, 1);
                expect(message.reply).lastCalledWith(tooFewMessage);
            });

            she('angry if sides 0', () => {
                roll(1, 0);
                expect(message.reply).lastCalledWith(tooFewMessage);
            });

            she('angry if sides under 0', () => {
                roll(1, -1);
                expect(message.reply).lastCalledWith(tooFewMessage);
            });
        });

        describe('channel message', () => {
            const output = {
                "author": null,
                "color": 3840,
                "description": "You rolled:  1, 2 and 3\nFor a total of: 6",
                "fields": [],
                "footer": null,
                "image": null,
                "thumbnail": null,
                "timestamp": null,
                "title": undefined,
                "type": undefined,
                "url": undefined

            };

            // Implicitly checks that the join + and is working properly
            // Should be inheriting the correct color from the client config mock
            she('has the right response', () => {
                randomMock
                    .mockReturnValueOnce(.1)
                    .mockReturnValueOnce(.4)
                    .mockReturnValueOnce(.8);
                roll(3, 3);
                const lastCall = message.channel.send.mock.calls[0];
                expect(lastCall).toMatchObject([output]);
            });
        });
    });

    describe('help', () => {
        
        she('likes it enabled', () => {
            expect(help.enabled).toEqual(true);
        });

        she("she doesn't hide the help", () => {
            expect(help.hideHelp).toEqual(false);
        });

        she('likes to have fun', () => {
            expect(help.type).toEqual('fun');
        });

        she('thinks her name is roll', () => {
            expect(help.name).toEqual('roll');
        });

        she('tells you about herself', () => {
            expect(help.description).toEqual('The `roll` command rolls a specified number of die with a specified number of sides.');
        });

        she('tells you how to use her', () => {
            expect(help.usage).toEqual('`yabe roll <number of die> <sides per die>`');
        });
    });
});
