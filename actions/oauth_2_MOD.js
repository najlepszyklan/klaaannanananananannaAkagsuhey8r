module.exports = {
  //---------------------------------------------------------------------
  // Action Name
  //
  // This is the name of the action displayed in the editor.
  //---------------------------------------------------------------------

  name: "Bot Oauth2 Application",

  //---------------------------------------------------------------------
  // Action Section
  //
  // This is the section the action will fall into.
  //---------------------------------------------------------------------

  section: "Bot Client Control",

  //---------------------------------------------------------------------
	// DBM Mods Manager Variables (Optional but nice to have!)
	//
	// These are variables that DBM Mods Manager uses to show information
	// about the mods for people to see in the list.
	//---------------------------------------------------------------------

	// Who made the mod (If not set, defaults to "DBM Mods")
	author: "MacieseszekMc",

	// The version of the mod (Defaults to 1.0.0)
	version: "1.0.0",

	// A short description to show on the mod line for this mod (Must be on a single line)
	short_description: "Change bot oauth2 application!!",

  // If it depends on any other mods by name, ex: WrexMODS if the mod uses something from WrexMods
  


  //---------------------------------------------------------------------
  // Action Subtitle
  //
  // This function generates the subtitle displayed next to the name.
  //---------------------------------------------------------------------

  subtitle: function(data) {
    const activities = [
      "Bot Public",
      "Bot Require Code Grant",
      "Description",
      "Flags",
	  "Name",
	  "Owner"
    ];

    const stats = ["Bot Public", "Bot Require Code Grant", "Description", "Flags", "Name", "Owner"];

    return `${stats[data.stat]}, ${activities[data.activity]} ${data.nameText}`;
  },

  //---------------------------------------------------------------------
  // Action Fields
  //
  // These are the fields for the action. These fields are customized
  // by creating elements with corresponding IDs in the HTML. These
  // are also the names of the fields stored in the action's JSON data.
  //---------------------------------------------------------------------

  fields: ["activity", "nameText", "url", "stat"],

  //---------------------------------------------------------------------
  // Command HTML
  //
  // This function returns a string containing the HTML used for
  // editting actions.
  //
  // The "isEvent" parameter will be true if this action is being used
  // for an event. Due to their nature, events lack certain information,
  // so edit the HTML to reflect this.
  //
  // The "data" parameter stores constants for select elements to use.
  // Each is an array: index 0 for commands, index 1 for events.
  // The names are: sendTargets, members, roles, channels,
  //                messages, servers, variables
  //---------------------------------------------------------------------

  html: function(isEvent, data) {
    return `
    <div id="mod-container">
					<div id="main-body">
						<div>
							<p>
								<u>Mod Info:</u><br>
								Created by MacieseszekMc!<br>
								Thanks to discord.js!<br><br>
							</p>
						</div>
						<div style="display: flex;">
							<div style="width: 50%; padding-right: 10px">
								Activity:<br>
								<select id="activity" class="round" style="width: 100%;">
									<option value="0">Bot Public</option>
									<option value="1">Bot Require Code Grant</option>
									<option value="2">Description</option>
									<option value="3">Flags</option>
									<option value="4">Name</option>
									<option value="5">Owner</option>									
								</select>
							</div>
						</div>
						<br>
						Activity Name:<br>
						<input id="nameText" class="round" type="text" style="width: 100%;"><br>
						<div id="urlArea" class="hidden">
							Twitch Stream URL:<br>
							<input id="url" class="round" type="text" autofocus="autofocus" placeholder='Only works with http://twitch.tv/ URLs'
							 style="width: 100%;">
						</div>
						<br>
						This mod requires the latest version of Discord.js<br>
						Installation tutorial: https://youtu.be/mrrtj5nlV58<br>
					</div>

				</div>
				<style>
					#mod-container {
						width: 570px;
						height: 359px;
						overflow-y: scroll;
					}

					#main-body {
						padding: 15px;
					}

					.action-input {
						margin: 0 !important;
						padding: 0 !important;
					}

					body {
						margin: 0;
					}

					.hidden {
						display: none;
					}
				</style>`;
  },

  //---------------------------------------------------------------------
  // Action Editor Init Code
  //
  // When the HTML is first applied to the action editor, this code
  // is also run. This helps add modifications or setup reactionary
  // functions for the DOM elements.
  //---------------------------------------------------------------------

  init: function() {
    const { glob, document } = this;

    let selector = document.getElementById("activity");
    let targetfield = document.getElementById("urlArea");

    if (selector[selector.selectedIndex].value === "3") {
      targetfield.classList.remove("hidden");
      alert("bengis");
    } else {
      targetfield.classList.add("hidden");
    }

    function showUrl() {
      if (selector[selector.selectedIndex].value === "3") {
        targetfield.classList.remove("hidden");
      } else {
        targetfield.classList.add("hidden");
      }
    }

    selector.onclick = () => showUrl();
  },

  //---------------------------------------------------------------------
  // Action Bot Function
  //
  // This is the function for the action within the Bot's Action class.
  // Keep in mind event calls won't have access to the "msg" parameter,
  // so be sure to provide checks for variable existance.
  //---------------------------------------------------------------------

  action: function(cache) {
    const botClient = this.getDBM().Bot.bot.user;
    const data = cache.actions[cache.index];

    const nameText = this.evalMessage(data.nameText, cache);
    const url = this.evalMessage(data.url, cache);

    const activity = parseInt(data.activity);
    const stat = parseInt(data.stat);

    let obj;

    let target;
    if (activity >= 0) {
      switch (activity) {
        case 0:
          target = "Bot Public";
          break;
        case 1:
          target = "Bot Require Code Grant";
          break;
        case 2:
          target = "Description";
          break;
        case 3:
          target = "Flags";
		  break;
		case 4:
          target = "Name";
		  break;
		case 4:
          target = "Owner";
          break;
      }
    }

    if (botClient) {
      if (nameText) {
        if (target === "Description") {
          obj = {
            game: {
              name: nameText,
              type: target,
              url: url
            },
            status: statustarget
          };
        } else {
          obj = {
            game: { name: nameText, type: target },
            status: statustarget
          };
        }
      }

      botClient
        .setPresence(obj)
        .then(
          function() {
            this.callNextAction(cache);
          }.bind(this)
        )
        .catch(err => console.log(err));
    } else {
      this.callNextAction(cache);
    }
  },

  //---------------------------------------------------------------------
  // Action Bot Mod
  //
  // Upon initialization of the bot, this code is run. Using the bot's
  // DBM namespace, one can add/modify existing functions if necessary.
  // In order to reduce conflictions between mods, be sure to alias
  // functions you wish to overwrite.
  //---------------------------------------------------------------------

  mod: function(DBM) {}
}; // End of module
