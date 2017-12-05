const fetch = require('node-fetch')

const key = '8DD3D47C1DFB6EA97EA7F6665C4FBA20';
// var steamids = '76561197996048272';

module.exports = {
    getSteamInfo(steamids, callback) {
        var serviceProfile = {};
        
        var getPlayerSummaries = fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+key+'&steamids='+steamids)
            .then(function(response) {
                return response.json()
            });
    
        var getPlayerSummaries = fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+key+'&steamids='+steamids)
            .then(function(response) {
                return response.json()
            });

        var getPlayerSteamLevel = fetch('http://api.steampowered.com/IPlayerService/GetSteamLevel/v1/?key='+key+'&steamid='+steamids)
            .then(function(response) {
                return response.json()
            });

        var getPlayerGames = fetch('http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key='+key+'&steamid='+steamids+'&include_played_free_games=1')
            .then(function(response) {
                return response.json()
            });

        var getRecentlyPlayedGames = fetch('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key='+key+'&steamid='+steamids+'&count=2')
            .then(function(response) {
                return response.json()
            });

        var getPlayerBans = fetch('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key='+key+'&steamids='+steamids)
            .then(function(response) {
                return response.json()
            });

        var combinedData = {"getPlayerSummaries":{}, "getRecentlyPlayedGames":{}, "getPlayerBans":{}, "getPlayerGames":{}, "getPlayerSteamLevel":{}};
        Promise.all([getPlayerSummaries, getRecentlyPlayedGames, getPlayerBans, getPlayerGames, getPlayerSteamLevel])
            .then(function(values) {
                combinedData["getPlayerSummaries"] = values[0];
                combinedData["getRecentlyPlayedGames"] = values[1];
                combinedData["getPlayerBans"] = values[2];
                combinedData["getPlayerGames"] = values[3];
                combinedData["getPlayerSteamLevel"] = values[4];

                serviceProfile.steamInfo = combinedData.getPlayerSummaries.response.players[0]
                serviceProfile.steamInfo.timecreated = combinedData.getPlayerSummaries.response.players[0].timecreated
                serviceProfile.steamInfo.accountLevel = combinedData.getPlayerSteamLevel.response.player_level
                serviceProfile.steamInfo.accountAge = Math.floor(Math.abs(Math.round(new Date().getTime()/1000.0) - serviceProfile.steamInfo.timecreated) / 86400 / 365)
                serviceProfile.steamInfo.numberOfGamesOwned = combinedData.getPlayerGames.response.game_count
                serviceProfile.steamInfo.numberOfHoursPlayed = combinedData.getPlayerGames.response.games.reduce((a,b)=>{return a + b.playtime_forever},0)/60|0
                serviceProfile.last2weeksgames = [{
                                                    game_name: combinedData.getRecentlyPlayedGames.response.games[0].name,
                                                    game_photo: 'https://media.steampowered.com/steamcommunity/public/images/apps/' + combinedData.getRecentlyPlayedGames.response.games[0].appid + '/' + combinedData.getRecentlyPlayedGames.response.games[0].img_logo_url + '.jpg',
                                                    game_total_hours: combinedData.getRecentlyPlayedGames.response.games[0].playtime_forever / 60 | 0,
                                                    game_2wks_hours: combinedData.getRecentlyPlayedGames.response.games[0].playtime_2weeks / 60 | 0
                                                },
                                                {
                                                    game_name: combinedData.getRecentlyPlayedGames.response.games[1].name,
                                                    game_photo: 'https://media.steampowered.com/steamcommunity/public/images/apps/' + combinedData.getRecentlyPlayedGames.response.games[1].appid + '/' + combinedData.getRecentlyPlayedGames.response.games[1].img_logo_url + '.jpg',
                                                    game_total_hours: combinedData.getRecentlyPlayedGames.response.games[1].playtime_forever / 60 | 0,
                                                    game_2wks_hours: combinedData.getRecentlyPlayedGames.response.games[1].playtime_2weeks / 60 | 0
                                                }]
                serviceProfile.steamBans = combinedData.getPlayerBans.players[0]
                console.log('Fetched Steam information')
                callback(serviceProfile)
            
            });
    },

getServiceProfile() {
    return serviceProfile
    }
}