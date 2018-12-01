var $secretSanta = {},

    // Modify these 2 to the row star of item values
    PLAYER_INDEX_START = 5;
    WISHLIST_INDEX_START = 2;

$secretSanta.init = function () {

    var _ = LodashGS.load();

    var $this = this,
        $spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        $participants = $spreadsheet.getSheetByName('PARTICIPANTS'),
        $wishlist = $spreadsheet.getSheetByName('WISHLIST'),
        playersCount = $participants.getLastRow() - (PLAYER_INDEX_START - 1);

    /**
     * Start generating the gifter, giftee and the gift list
     */
    $this.startDrawLots = function () {

        var playerIndex = PLAYER_INDEX_START,
            mailList = [],
            giftees = $this.generateRandomList(playersCount, PLAYER_INDEX_START),
            gifts = $this.generateRandomList(playersCount, WISHLIST_INDEX_START),
            gifter, giftee, gift;

        for (var index in giftees) {

            gifter = {
                name: $participants.getRange('A' + playerIndex).getValue(),
                email: $participants.getRange('B' + playerIndex).getValue()
            }

            giftee = $participants.getRange('A' + giftees[index]).getValue();
            gift = $wishlist.getRange('A' + gifts[index]).getValue();

            if (gifter.name === giftee) {
                // restart the drawlots, we can't have the same gifter and giftee
                $this.startDrawLots();
                return;
            }

             mailList.push({
                gifter: gifter,
                giftee: giftee,
                gift: gift
            });

            playerIndex++;
        }

        $this.mailThemPeoplez(mailList);

    };

    /**
     * Generate a random list of numbers within rage of given offset
     */
    $this.generateRandomList = function (limit, offset) {

        var list = [],
            randomIndex;

        while(list.length < limit) {

            // Add the offset row
            randomIndex = Math.floor(Math.random() * limit) + offset;

            if (_.includes(list, randomIndex)) {
                // if random number generated is already listed,
                // generate a new number until all numbers in the list are unique
                continue;
            }

            list.push(randomIndex);
        }

        return list;
    };

    /**
     * Mail the participants of their giftee and the gift
     */
    $this.mailThemPeoplez = function (mailList) {

        var subject,
            body = 'Merry Christmas! See you at our partayyy!';

        _.forEach(mailList, function(data) {
            subject = 'Hi ' + data.gifter.name + ', you will gift ' + data.giftee
                + ' - "' + data.gift  + '".'

            Logger.log(subject);

            // Uncomment this when ready to run in prod :p
            //MailApp.sendEmail(data.gifter.email, subject, body);
        });
    };

    // Let us start the online drawlots!
    $this.startDrawLots();
};

function doGet() {
    $secretSanta.init();
}
