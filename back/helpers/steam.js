const key = '8DD3D47C1DFB6EA97EA7F6665C4FBA20';
// var steamids = '76561197996048272';

export const steam = {
getSteamInfo(steamids) {
    var serviceProfile = {};
    
    var getPlayerSummaries = fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key='+key+'&steamids='+steamids)
        .then(function(response) {
            return response.json()
        });

    var getRecentlyPlayedGames = fetch('http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key='+key+'&steamid='+steamids)
        .then(function(response) {
            return response.json()
        });

    var getPlayerBans = fetch('http://api.steampowered.com/ISteamUser/GetPlayerBans/v1/?key='+key+'&steamids='+steamids)
        .then(function(response) {
            return response.json()
        });

    var combinedData = {"getPlayerSummaries":{}, "getRecentlyPlayedGames":{}, "getPlayerBans":{}};
    Promise.all([getPlayerSummaries, getRecentlyPlayedGames, getPlayerBans])
        .then(function(values) {
            combinedData["getPlayerSummaries"] = values[0];
            combinedData["getRecentlyPlayedGames"] = values[1];
            combinedData["getPlayerBans"] = values[2];
            serviceProfile.steamProfile = combinedData.getPlayerSummaries.response.players[0]
            serviceProfile.last2weeksgames = combinedData.getRecentlyPlayedGames.response.games
            serviceProfile.steamBans = combinedData.getPlayerBans.players[0]
        });
    
    return serviceProfile;
    
},

getServiceProfile() {
    return serviceProfile
    }
}