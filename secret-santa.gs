var $secretSanta = {};

$secretSanta.init = function () {

    var $this = this,
        $spreadsheet = SpreadsheetApp.getActiveSpreadsheet(),
        $codenames = $spreadsheet.getSheetByName('Codenames'),
        $players = $spreadsheet.getSheetByName('Participants'),
        playersCount = $players.getLastRow(),
        santaCodenames = [];

    /**
     * Draw lots of codenames and santa baby codenames
     * @return null
     */
    $this.startDrawLots = function () {

        var playerIndex = 1,
            santaName, santaBabyCodename, message,
            santaBabyCodenames = $this.getRandomCodenames(playersCount),
            mailList = [];

        for (var index in santaCodenames) {
            // Since this is 0-index array, subtract 1 to the playerIndex
            santaBabyCodename = santaBabyCodenames[playerIndex - 1];

            // We cannot allow secret santa and your santa baby to be the same
            // exit this process and re-do it so it will randomize again
            if (santaCodenames[index] === santaBabyCodename) {
                $this.startDrawLots();
                return ;
            }

            santaName = $players.getRange('A' + playerIndex).getValue();
            message = 'Hi ' + santaName + '! Your NEW codename is "' + santaCodenames[index] + '". '
                + 'Your Santa baby is "' + santaBabyCodename + '".';

            mailList.push({
                address: $players.getRange('B' + playerIndex).getValue(),
                body: message
            });

            playerIndex++;
        }

        // Send the email list
        $this.sendEmailList(mailList);
    };

    /**
     * Sends an email to all players with their codename and their santa baby
     * @param array mailList
     * @return null
     */
    $this.sendEmailList = function (mailList) {

        var i, $email,
            subject = 'Hohoho! Check who your santa baby is..';

        for (var i in mailList) {
            $email = mailList[i];
            //MailApp.sendEmail($email.address, subject, $email.body);
            Logger.log($email.body);
        }
    };

    /**
     * Retuns array list of random codenames
     * @param int limit
     * @return array
     */
    $this.getRandomCodenames = function(limit) {
        var list = [],
            randomIndex, name;

        while(list.length < limit) {
            randomIndex = Math.floor(Math.random() * limit) + 1;
            name = $codenames.getRange('A' + randomIndex).getValue();

            // this will ensure that no same name will be on the same list
            if(list.indexOf(name) > -1) {
                continue;
            }

            list.push(name);
        }

        return list;
    };

    santaCodenames = $this.getRandomCodenames(playersCount);
    // Let us start the online drawlots!
    $this.startDrawLots();
};

function doGet() {
    $secretSanta.init();
}
