# secret-santa
An online "draw lots" system that uses Google Sheets to assign a random codename and a "baby" (giftee) to each participant for your group's Secret Santa.

An email message will be sent to each of one of the participant containing the his codename and his baby's codename.

This application is written in [Google Apps Script](https://developers.google.com/apps-script/).

# How to Use?
1. Open Google Sheets https://www.google.com/sheets/about/ and create a new spreasdsheet
2. On the new sheet, add list of participant names and their email address on the 1st and 2nd column respectively. *The email is needed in order for the the participants to receive the email message containing their codename and their assigned baby.*
3. On the bottom part of the screen, right-click on the sheet and rename it to "Participants" (without the quotes)
4. On the same spreasheet, add a new sheet, and rename it to "Codenames" (without the quotes)
5. On the "**Codenames**" sheet, list down the codenames. Make sure the number of codenames matches the number of participants
6. Please make sure that codenames are unique
7. Select `Tools` > `Script Editor...` on the menu
8. Open `secret-santa.gs` file in this repo and copy-paste the content on Google's Script Editor.
9. Run the script (click on the icon with the "play" icon)
10. Check your email to make sure you received the email message





