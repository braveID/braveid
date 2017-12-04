const key = '8DD3D47C1DFB6EA97EA7F6665C4FBA20';
// var steamids = '76561197996048272';

export const steam = {
getSteamInfo(steamids) {
    var serviceProfile = {};
    
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

            serviceProfile.nickname = combinedData.getPlayerSummaries.response.players[0].personaname
            serviceProfile.steamid = combinedData.getPlayerSummaries.response.players[0].steamid
            serviceProfile.url = combinedData.getPlayerSummaries.response.players[0].profileurl
            serviceProfile.avatar = combinedData.getPlayerSummaries.response.players[0].avatarfull
            serviceProfile.timecreated = combinedData.getPlayerSummaries.response.players[0].timecreated
            serviceProfile.last2weeksgames = combinedData.getRecentlyPlayedGames.response.games
            serviceProfile.accountLevel = combinedData.getPlayerSteamLevel.response.player_level
            serviceProfile.bans = combinedData.getPlayerBans.players[0]
            serviceProfile.accountAge = Math.floor(Math.abs(Math.round(new Date().getTime()/1000.0) - serviceProfile.timecreated) / 86400 / 365)
            serviceProfile.numberOfGamesOwned = combinedData.getPlayerGames.response.game_count
            serviceProfile.numberOfHoursPlayed = combinedData.getPlayerGames.response.games.reduce((a,b)=>{return a + b.playtime_forever},0)/60|0
        
        });
    
    return serviceProfile;
    
},

getServiceProfile() {
    return serviceProfile
    }
}